#  AI Powered Chatbot

A complete AI SaaS-style chat web app: React (Vite + Tailwind) frontend, FastAPI backend, JWT auth, SQLite database, and local LLM chat via **Ollama**.

## What's actually implemented

- ✅ Signup / Login with JWT, bcrypt password hashing, protected routes, auto-logout on token expiry
- ✅ Profile: edit name/username, change password, delete account
- ✅ Chat: create/rename/delete/pin chats, search chats, multi-turn context memory, **real streaming** responses
- ✅ Markdown rendering + syntax-highlighted code blocks, copy message, regenerate, stop generating
- ✅ File upload (PDF / DOCX / TXT) with text extraction, ask questions about uploaded docs
- ✅ Voice input (browser Speech-to-Text) and optional "read replies aloud" (Text-to-Speech) — no backend needed for these, uses the Web Speech API (Chrome/Edge)
- ✅ Dashboard with live stats (total chats, messages sent, AI responses, documents uploaded, last login)
- ✅ Settings: theme, font size, AI model selector, language, export chats to JSON, delete history
- ✅ Dark / Light / System theme
- ✅ Landing page: hero, features, pricing, testimonials, footer
- ✅ Responsive layout, glassmorphism cards, animations, typing indicator, skeleton loaders, custom 404

## What's stubbed / needs your setup

- **AI replies require Ollama running locally.** If Ollama isn't reachable, the chat still works end-to-end but returns a clearly-labeled demo message telling you how to start Ollama — so you can test the whole UI immediately.
- "Forgot password" returns a generic success message but doesn't actually send an email (would need an email provider like SendGrid/SES wired in).
- Chat export currently exports to JSON (not PDF/Markdown) to keep dependencies light — easy to extend.

---

## 1. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then edit SECRET_KEY to something random

uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`. Interactive API docs at `http://localhost:8000/docs`.

The SQLite database file (`neurochat.db`) and an `uploads/` folder are created automatically on first run.

## 2. Set up Ollama (for real AI responses)

```bash
# Install from https://ollama.com
ollama pull llama3.2
ollama serve      # usually starts automatically after install
```

The backend expects Ollama at `http://localhost:11434` (change via `OLLAMA_URL` in `.env` if needed).

## 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and talks to the backend at `http://localhost:8000/api`.

## 4. Try it

1. Open `http://localhost:5173`
2. Sign up for an account
3. Start a new chat and send a message
4. Upload a PDF/DOCX/TXT and ask a question about it
5. Click the mic icon to try voice input (Chrome/Edge)
6. Check Dashboard and Settings pages

---

## Project structure

```
neurochat-ai/
├── backend/
│   ├── main.py            # FastAPI app entry point
│   ├── database.py        # SQLAlchemy engine/session
│   ├── models.py          # User, ChatSession, Message, UploadedFile, UserSettings
│   ├── schemas.py         # Pydantic request/response models
│   ├── auth.py            # Signup, login, JWT, profile, password
│   ├── chat.py            # Chat CRUD + streaming AI responses (Ollama)
│   ├── files.py           # File upload + text extraction
│   ├── settings_routes.py # Settings + dashboard stats
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/          # Landing, Login, Signup, Dashboard, Chat, Settings, Profile, NotFound
    │   ├── components/     # Navbar, Sidebar, Message, FileUpload, VoiceInput, Loader, ProtectedRoute
    │   ├── context/        # AuthContext, ThemeContext
    │   ├── api/axios.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Next steps to make it production-ready

- Swap SQLite → PostgreSQL (`DATABASE_URL` in `.env`; models already use SQLAlchemy so this is a one-line change plus running `alembic` migrations if you want versioned migrations)
- Add a real transactional email provider for password reset
- Add rate limiting on `/api/auth/*` endpoints
- Move file uploads to S3/GCS instead of local disk for multi-instance deployments
- Add HTTPS + a proper reverse proxy (nginx/Caddy) in front of both services
- Containerize with Docker Compose (one service each for backend, frontend, and optionally Ollama)
