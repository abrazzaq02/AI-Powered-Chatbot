# AI Powered Chatbot

A complete AI SaaS-style chat web app: **React (Vite + Tailwind)** frontend, **FastAPI** backend, JWT auth, SQLite database, and AI replies from either a **local model via Ollama** or **any OpenAI-compatible API**.

```
React 18 + Vite + Tailwind  ──/api──▶  FastAPI + SQLAlchemy  ──▶  Ollama  or  OpenAI-compatible API
        (port 5173)                        (port 8000)                (local)        (hosted)
```

---

## Quick start

One command sets up both halves and runs them together:

```bash
./dev.sh
```

Then open **http://localhost:5173** and sign up.

It creates the Python venv, installs backend + frontend dependencies, copies `backend/.env.example` → `backend/.env`, and starts FastAPI on `:8000` and Vite on `:5173`.

<details>
<summary>Manual setup (if you'd rather run the steps yourself)</summary>

**Backend**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # then set SECRET_KEY to something random
uvicorn main:app --reload --port 8000
```

API at `http://localhost:8000`, interactive docs at `http://localhost:8000/docs`.
The SQLite file (`neurochat.db`) and the `uploads/` folder are created on first run.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

App at `http://localhost:5173`. The Vite dev server proxies `/api` → `http://127.0.0.1:8000`, so the frontend and API share one origin — no CORS config and no hardcoded backend URL in the client.

</details>

### Docker

```bash
SECRET_KEY=$(python -c "import secrets;print(secrets.token_urlsafe(48))") docker compose up --build
```

App at **http://localhost:3000** (nginx serves the built frontend and proxies `/api` to the backend container).

---

## Connecting an AI model

The app works immediately without a model — chat, history, and uploads all function and the assistant returns a clearly-labeled demo reply. To get real answers, pick one option in `backend/.env`:

**Option A — local models with [Ollama](https://ollama.com) (default, free, offline)**

```bash
ollama pull llama3.2
ollama serve
```

```ini
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

**Option B — any OpenAI-compatible API** (OpenAI, Groq, Together, OpenRouter, LM Studio, vLLM…). Takes priority when `OPENAI_API_KEY` is set:

```ini
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

Both paths stream token-by-token to the browser over SSE.

---

## Features

- **Auth** — signup / login with JWT + bcrypt hashing, protected routes, auto-logout on token expiry
- **Profile** — edit name/username, change password, delete account
- **Chat** — create / rename / delete / pin / search chats, multi-turn context memory, real streaming replies, stop generating, regenerate
- **Rich output** — Markdown rendering, syntax-highlighted code blocks, copy message
- **Documents** — upload PDF / DOCX / TXT, text is extracted and fed to the model so you can ask questions about it
- **Voice** — speech-to-text input and optional read-aloud replies via the Web Speech API (Chrome/Edge, no backend needed)
- **Dashboard** — live stats: total chats, messages sent, AI responses, documents uploaded, last login
- **Settings** — theme, font size, model selector, language, export chats to JSON, delete history
- **UI** — dark / light / system theme, landing page (hero, features, pricing, testimonials), responsive layout, glassmorphism, typing indicator, skeleton loaders, custom 404

### Known limitations

- "Forgot password" returns a generic success response but doesn't send an email — wire in SendGrid/SES to make it real.
- Chat export produces JSON (not PDF/Markdown) to keep dependencies light.
- Uploads are stored on local disk, which is fine for a single instance.

---

## API reference

All routes are prefixed with `/api`. Everything except signup/login/health requires `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Liveness check |
| `POST` | `/auth/signup` | Create account → returns JWT + user |
| `POST` | `/auth/login` | Log in → returns JWT + user |
| `POST` | `/auth/forgot-password` | Stubbed password-reset request |
| `GET` | `/auth/me` | Current user |
| `PUT` | `/auth/me` | Update name / username / avatar |
| `POST` | `/auth/change-password` | Change password |
| `DELETE` | `/auth/me` | Delete account and all data |
| `GET` | `/chats` | List chats (pinned first) |
| `POST` | `/chats` | Create a chat |
| `GET` | `/chats/{id}/messages` | Messages in a chat |
| `PUT` | `/chats/{id}/rename` | Rename a chat |
| `PUT` | `/chats/{id}/pin` | Toggle pin |
| `DELETE` | `/chats/{id}` | Delete a chat |
| `POST` | `/chats/send` | Send a message → **SSE stream** of the reply |
| `POST` | `/files/upload` | Upload PDF/DOCX/TXT and extract its text |
| `GET` | `/files/chat/{id}` | Files attached to a chat |
| `GET` `/` `PUT` | `/settings` | Read / update user settings |
| `GET` | `/dashboard/stats` | Dashboard counters |

`POST /api/chats/send` responds with `text/event-stream`:

```
data: {"type": "meta",  "chat_id": 12}
data: {"type": "chunk", "content": "Hello"}
data: {"type": "done"}
```

---

## Configuration

`backend/.env` (see `backend/.env.example`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `SECRET_KEY` | dev placeholder | JWT signing key — **change this** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` | Token lifetime |
| `DATABASE_URL` | `sqlite:///./neurochat.db` | Any SQLAlchemy URL |
| `ALLOWED_ORIGINS` | `*` | Comma-separated CORS origins |
| `OLLAMA_URL` / `OLLAMA_MODEL` | `localhost:11434` / `llama3.2` | Local model |
| `OPENAI_API_KEY` / `OPENAI_BASE_URL` / `OPENAI_MODEL` | unset | Hosted model (wins if set) |

`frontend/.env` (see `frontend/.env.example`) is optional — set `VITE_API_URL` only when the API is served from a different origin than the app.

---

## Project structure

```
AI-Powered-Chatbot/
├── dev.sh                      # one-command local dev (backend + frontend)
├── docker-compose.yml
├── backend/
│   ├── main.py                 # FastAPI app, CORS, router wiring
│   ├── database.py             # SQLAlchemy engine/session
│   ├── models.py               # User, ChatSession, Message, UploadedFile, UserSettings
│   ├── schemas.py              # Pydantic request/response models
│   ├── auth.py                 # Signup, login, JWT, bcrypt, profile
│   ├── chat.py                 # Chat CRUD + streaming replies (Ollama / OpenAI-compatible)
│   ├── files.py                # Upload + PDF/DOCX/TXT text extraction
│   ├── settings_routes.py      # Settings + dashboard stats
│   ├── Dockerfile
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/              # Landing, Login, Signup, Dashboard, Chat, Settings, Profile, NotFound
    │   ├── components/         # Navbar, Sidebar, Message, FileUpload, VoiceInput, Loader, ProtectedRoute
    │   ├── context/            # AuthContext, ThemeContext
    │   ├── api/axios.js        # API client (relative /api base + auth interceptor)
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js          # dev server + /api proxy
    ├── nginx.conf              # production SPA + API proxy
    ├── Dockerfile
    └── package.json
```

---

## Production notes

- Set a strong `SECRET_KEY` and a specific `ALLOWED_ORIGINS` (never `*` with credentials).
- Swap SQLite → PostgreSQL via `DATABASE_URL`; add Alembic if you want versioned migrations.
- Add a transactional email provider to make password reset real.
- Rate-limit `/api/auth/*`.
- Move uploads to S3/GCS for multi-instance deployments.
- Terminate HTTPS at nginx/Caddy in front of both services.
