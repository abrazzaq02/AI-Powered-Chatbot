import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, field_validator


# ---------- Auth ----------
class SignupRequest(BaseModel):
    name: str
    username: str
    email: EmailStr
    password: str
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v, info):
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v

    @field_validator("password")
    @classmethod
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None
    avatar_url: Optional[str] = None


class UserOut(BaseModel):
    id: int
    name: str
    username: str
    email: str
    avatar_url: Optional[str] = None
    created_at: datetime.datetime
    last_login: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True


Token.model_rebuild()


# ---------- Chat ----------
class ChatCreate(BaseModel):
    title: Optional[str] = "New Chat"


class ChatRename(BaseModel):
    title: str


class ChatOut(BaseModel):
    id: int
    title: str
    pinned: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True


class MessageOut(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class SendMessageRequest(BaseModel):
    chat_id: Optional[int] = None
    content: str


# ---------- Settings ----------
class SettingsUpdate(BaseModel):
    theme: Optional[str] = None
    ai_model: Optional[str] = None
    font_size: Optional[str] = None
    language: Optional[str] = None


class SettingsOut(BaseModel):
    theme: str
    ai_model: str
    font_size: str
    language: str

    class Config:
        from_attributes = True


# ---------- Dashboard ----------
class DashboardStats(BaseModel):
    total_chats: int
    messages_sent: int
    ai_responses: int
    documents_uploaded: int
    last_login: Optional[datetime.datetime] = None
