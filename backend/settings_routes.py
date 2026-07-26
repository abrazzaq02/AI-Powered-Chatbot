from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api", tags=["settings"])


@router.get("/settings", response_model=schemas.SettingsOut)
def get_settings(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    s = db.query(models.UserSettings).filter(models.UserSettings.user_id == user.id).first()
    if not s:
        s = models.UserSettings(user_id=user.id)
        db.add(s)
        db.commit()
        db.refresh(s)
    return s


@router.put("/settings", response_model=schemas.SettingsOut)
def update_settings(payload: schemas.SettingsUpdate, db: Session = Depends(get_db),
                     user: models.User = Depends(get_current_user)):
    s = db.query(models.UserSettings).filter(models.UserSettings.user_id == user.id).first()
    if not s:
        s = models.UserSettings(user_id=user.id)
        db.add(s)

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(s, field, value)

    db.commit()
    db.refresh(s)
    return s


@router.get("/dashboard/stats", response_model=schemas.DashboardStats)
def dashboard_stats(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    chats = db.query(models.ChatSession).filter(models.ChatSession.user_id == user.id).all()
    chat_ids = [c.id for c in chats]

    total_chats = len(chats)
    messages_sent = db.query(models.Message).filter(
        models.Message.chat_id.in_(chat_ids), models.Message.role == "user"
    ).count() if chat_ids else 0
    ai_responses = db.query(models.Message).filter(
        models.Message.chat_id.in_(chat_ids), models.Message.role == "assistant"
    ).count() if chat_ids else 0
    documents_uploaded = db.query(models.UploadedFile).filter(
        models.UploadedFile.user_id == user.id
    ).count()

    return schemas.DashboardStats(
        total_chats=total_chats,
        messages_sent=messages_sent,
        ai_responses=ai_responses,
        documents_uploaded=documents_uploaded,
        last_login=user.last_login,
    )
