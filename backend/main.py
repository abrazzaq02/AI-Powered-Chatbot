import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import Base, engine
import models  # noqa: F401 — ensures models are registered before create_all
import auth
import chat
import files
import settings_routes

load_dotenv()

Base.metadata.create_all(bind=engine)

# Comma-separated list, or "*" to allow any origin (default: local dev + any host,
# handy when the app is served from a preview/proxy URL).
_origins = os.getenv("ALLOWED_ORIGINS", "*").strip()
ALLOW_ALL = _origins == "*"
ORIGINS = ["*"] if ALLOW_ALL else [o.strip() for o in _origins.split(",") if o.strip()]

app = FastAPI(title="NeuroChat AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=not ALLOW_ALL,
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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=bool(os.getenv("RELOAD", "")),
    )
