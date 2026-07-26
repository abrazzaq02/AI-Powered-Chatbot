from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
import models  # noqa: F401 — ensures models are registered before create_all
import auth
import chat
import files
import settings_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="NeuroChat AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(files.router)
app.include_router(settings_routes.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
