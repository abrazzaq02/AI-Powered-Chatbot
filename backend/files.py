import os
import uuid
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api/files", tags=["files"])

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXT = {".pdf", ".docx", ".txt"}


def extract_text(path: str, ext: str) -> str:
    try:
        if ext == ".txt":
            with open(path, "r", errors="ignore") as f:
                return f.read()
        elif ext == ".pdf":
            from pypdf import PdfReader
            reader = PdfReader(path)
            return "\n".join(page.extract_text() or "" for page in reader.pages)
        elif ext == ".docx":
            import docx
            doc = docx.Document(path)
            return "\n".join(p.text for p in doc.paragraphs)
    except Exception as e:
        return f"[Could not extract text: {e}]"
    return ""


@router.post("/upload")
async def upload_file(
    chat_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    chat = db.query(models.ChatSession).filter(
        models.ChatSession.id == chat_id, models.ChatSession.user_id == user.id
    ).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Only PDF, DOCX, and TXT files are supported")

    saved_name = f"{uuid.uuid4().hex}{ext}"
    saved_path = os.path.join(UPLOAD_DIR, saved_name)
    contents = await file.read()
    with open(saved_path, "wb") as f:
        f.write(contents)

    text = extract_text(saved_path, ext)

    record = models.UploadedFile(
        filename=file.filename,
        filetype=ext.replace(".", ""),
        extracted_text=text,
        chat_id=chat_id,
        user_id=user.id,
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "id": record.id,
        "filename": record.filename,
        "filetype": record.filetype,
        "preview": (text or "")[:300],
    }


@router.get("/chat/{chat_id}")
def list_chat_files(chat_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    files = db.query(models.UploadedFile).filter(
        models.UploadedFile.chat_id == chat_id, models.UploadedFile.user_id == user.id
    ).all()
    return [{"id": f.id, "filename": f.filename, "filetype": f.filetype} for f in files]
