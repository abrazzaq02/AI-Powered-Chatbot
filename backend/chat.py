import os
import json
import datetime
import requests
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from database import get_db, SessionLocal
import models
import schemas
from auth import get_current_user

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

# Optional OpenAI-compatible provider (OpenAI, Groq, Together, OpenRouter,
# LM Studio, vLLM...). When OPENAI_API_KEY is set it takes priority over Ollama.
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

router = APIRouter(prefix="/api/chats", tags=["chat"])


# ---------- Chat session CRUD ----------
@router.get("", response_model=List[schemas.ChatOut])
def list_chats(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    chats = (
        db.query(models.ChatSession)
        .filter(models.ChatSession.user_id == user.id)
        .order_by(models.ChatSession.pinned.desc(), models.ChatSession.updated_at.desc())
        .all()
    )
    return chats


@router.post("", response_model=schemas.ChatOut)
def create_chat(payload: schemas.ChatCreate, db: Session = Depends(get_db),
                 user: models.User = Depends(get_current_user)):
    chat = models.ChatSession(title=payload.title or "New Chat", user_id=user.id)
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat


@router.get("/{chat_id}/messages", response_model=List[schemas.MessageOut])
def get_messages(chat_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    chat = _get_owned_chat(db, chat_id, user)
    return chat.messages


@router.put("/{chat_id}/rename", response_model=schemas.ChatOut)
def rename_chat(chat_id: int, payload: schemas.ChatRename, db: Session = Depends(get_db),
                 user: models.User = Depends(get_current_user)):
    chat = _get_owned_chat(db, chat_id, user)
    chat.title = payload.title
    db.commit()
    db.refresh(chat)
    return chat


@router.put("/{chat_id}/pin", response_model=schemas.ChatOut)
def toggle_pin(chat_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    chat = _get_owned_chat(db, chat_id, user)
    chat.pinned = not chat.pinned
    db.commit()
    db.refresh(chat)
    return chat


@router.delete("/{chat_id}")
def delete_chat(chat_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    chat = _get_owned_chat(db, chat_id, user)
    db.delete(chat)
    db.commit()
    return {"message": "Chat deleted"}


def _get_owned_chat(db: Session, chat_id: int, user: models.User) -> models.ChatSession:
    chat = db.query(models.ChatSession).filter(
        models.ChatSession.id == chat_id, models.ChatSession.user_id == user.id
    ).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat


# ---------- Messaging / AI ----------
FALLBACK_NOTICE = (
    "⚠️ No AI backend is reachable right now, so here's a demo reply. "
    "Everything else (accounts, chats, history, uploads) is working normally.\n\n"
    "**Option A — run a model locally with Ollama:**\n"
    "1. Install Ollama from https://ollama.com\n"
    "2. Run `ollama pull llama3.2`\n"
    "3. Make sure `ollama serve` is running\n\n"
    "**Option B — use a hosted OpenAI-compatible API:**\n"
    "Set `OPENAI_API_KEY` (and optionally `OPENAI_BASE_URL` / `OPENAI_MODEL`) "
    "in `backend/.env`, then restart the backend.\n\n"
    "Once either is set up, just send another message here."
)


def build_context(chat: models.ChatSession) -> list:
    history = []
    for m in chat.messages[-20:]:
        history.append({"role": m.role, "content": m.content})

    doc_context = ""
    for f in chat.files:
        if f.extracted_text:
            doc_context += f"\n\n[Content from uploaded file '{f.filename}']:\n{f.extracted_text[:4000]}"
    if doc_context:
        history.insert(0, {
            "role": "system",
            "content": "The user has uploaded document(s). Use this content to answer questions when relevant:" + doc_context
        })
    return history


def stream_openai(messages: list, model: str):
    """Yields text chunks from any OpenAI-compatible /chat/completions endpoint."""
    resp = requests.post(
        f"{OPENAI_BASE_URL}/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
        },
        json={"model": model, "messages": messages, "stream": True},
        stream=True,
        timeout=60,
    )
    resp.raise_for_status()
    for raw in resp.iter_lines():
        if not raw:
            continue
        line = raw.decode("utf-8") if isinstance(raw, bytes) else raw
        if not line.startswith("data: "):
            continue
        data = line[6:].strip()
        if data == "[DONE]":
            break
        try:
            delta = json.loads(data)["choices"][0].get("delta", {})
        except (ValueError, KeyError, IndexError):
            continue
        chunk = delta.get("content") or ""
        if chunk:
            yield chunk


def stream_ollama(messages: list, model: str):
    """Yields text chunks from Ollama's /api/chat streaming endpoint.
    Falls back to a single canned message if Ollama isn't reachable."""
    try:
        resp = requests.post(
            f"{OLLAMA_URL}/api/chat",
            json={"model": model, "messages": messages, "stream": True},
            stream=True,
            timeout=10,
        )
        resp.raise_for_status()
        got_any = False
        for line in resp.iter_lines():
            if not line:
                continue
            data = json.loads(line)
            chunk = data.get("message", {}).get("content", "")
            if chunk:
                got_any = True
                yield chunk
            if data.get("done"):
                break
        if not got_any:
            yield FALLBACK_NOTICE
    except Exception:
        yield FALLBACK_NOTICE


def generate_reply(messages: list, model: str):
    """Pick the configured provider, and degrade gracefully to a helpful
    demo message if none is reachable (so the UI is always testable)."""
    if OPENAI_API_KEY:
        try:
            produced = False
            for chunk in stream_openai(messages, OPENAI_MODEL):
                produced = True
                yield chunk
            if produced:
                return
        except Exception:
            pass  # fall through to Ollama / demo reply

    produced = False
    for chunk in stream_ollama(messages, model):
        if chunk == FALLBACK_NOTICE:
            break
        produced = True
        yield chunk
    if not produced:
        yield FALLBACK_NOTICE


@router.post("/send")
def send_message(payload: schemas.SendMessageRequest, db: Session = Depends(get_db),
                  user: models.User = Depends(get_current_user)):
    # Get or create chat
    if payload.chat_id:
        chat = _get_owned_chat(db, payload.chat_id, user)
    else:
        title = payload.content[:40] + ("..." if len(payload.content) > 40 else "")
        chat = models.ChatSession(title=title or "New Chat", user_id=user.id)
        db.add(chat)
        db.commit()
        db.refresh(chat)

    user_msg = models.Message(role="user", content=payload.content, chat_id=chat.id)
    db.add(user_msg)
    chat.updated_at = datetime.datetime.utcnow()
    db.commit()

    settings = db.query(models.UserSettings).filter(models.UserSettings.user_id == user.id).first()
    model = settings.ai_model if settings else DEFAULT_MODEL

    context = build_context(chat)
    chat_id = chat.id

    def event_stream():
        full_reply = ""
        yield f"data: {json.dumps({'type': 'meta', 'chat_id': chat_id})}\n\n"
        for chunk in generate_reply(context, model):
            full_reply += chunk
            yield f"data: {json.dumps({'type': 'chunk', 'content': chunk})}\n\n"

        # Fresh session: the request-scoped one closes once this
        # response starts streaming back to the client.
        stream_db = SessionLocal()
        try:
            assistant_msg = models.Message(role="assistant", content=full_reply, chat_id=chat_id)
            stream_db.add(assistant_msg)
            stream_chat = stream_db.query(models.ChatSession).get(chat_id)
            if stream_chat:
                stream_chat.updated_at = datetime.datetime.utcnow()
            stream_db.commit()
        finally:
            stream_db.close()

        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            # disable proxy buffering (nginx / vite proxy) so chunks arrive live
            "X-Accel-Buffering": "no",
        },
    )
