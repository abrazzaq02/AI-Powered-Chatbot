# 🚀 AI Powered Chatbot - Complete Setup Guide

A full-stack AI SaaS chatbot with React frontend, FastAPI backend, JWT auth, SQLite DB, and local Ollama AI.

## Prerequisites

- **Python 3.9+** - [Download](https://www.python.org/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **Ollama** - [Download](https://ollama.com) (for AI responses)

---

## ⚙️ Backend Setup

### Step 1: Create Virtual Environment

```bash
cd backend
python -m venv venv
```

**Activate venv:**
- **macOS/Linux:** `source venv/bin/activate`
- **Windows:** `venv\Scripts\activate`

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment

The `.env` file is already created with defaults. Edit if needed:

```bash
# .env file is ready to use
# For production, change SECRET_KEY to a random string
```

### Step 4: Start Backend Server

```bash
uvicorn main:app --reload --port 8000
```

✅ Backend running at: **http://localhost:8000**
📚 API Docs: **http://localhost:8000/docs**

---

## 🤖 Setup Ollama (For Real AI Responses)

Open a **new terminal** and run:

```bash
# Install Ollama from https://ollama.com first

# Pull the AI model
ollama pull llama3.2

# Start Ollama service
ollama serve
```

✅ Ollama running at: **http://localhost:11434**

> **Note:** If Ollama isn't running, the chatbot still works but returns demo messages.

---

## 🎨 Frontend Setup

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

---

## ✅ Testing the App

1. Open **http://localhost:5173** in your browser
2. Sign up for a new account
3. Create a new chat
4. Send a message (should get AI response if Ollama is running)
5. Try uploading a PDF/DOCX/TXT file
6. Test voice input (Chrome/Edge only)
7. Check Dashboard for stats
8. Update Settings

---

## 📦 Backend Structure

```
backend/
├── main.py                # FastAPI app entry point
├── database.py            # SQLAlchemy setup
├── models.py              # Database models
├── schemas.py             # Pydantic validators
├── auth.py                # JWT authentication
├── chat.py                # Chat & AI streaming
├── files.py               # File upload & text extraction
├── settings_routes.py     # Settings & dashboard
├── requirements.txt       # Python dependencies
├── .env                   # Environment config (created)
├── .env.example           # Template for .env
└── uploads/               # File uploads (auto-created)
```

---

## 🎯 Key API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user
- `PUT /api/auth/me` - Update profile
- `POST /api/auth/change-password` - Change password
- `DELETE /api/auth/me` - Delete account

### Chats
- `GET /api/chats` - List chats
- `POST /api/chats` - Create chat
- `GET /api/chats/{id}/messages` - Get messages
- `POST /api/chats/send` - Send message (streaming)
- `PUT /api/chats/{id}/rename` - Rename chat
- `PUT /api/chats/{id}/pin` - Pin/unpin chat
- `DELETE /api/chats/{id}` - Delete chat

### Files
- `POST /api/files/upload` - Upload document
- `GET /api/files/chat/{id}` - List chat files

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings
- `GET /api/dashboard/stats` - Dashboard stats
- `POST /api/settings/export-chats` - Export chats
- `DELETE /api/settings/delete-history` - Delete history

---

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'files'"
✅ Fixed! File exists at `backend/files.py`

### Backend won't start
```bash
# Make sure you activated venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend can't reach backend
✅ Ensure backend is running on port 8000
✅ Check CORS in `backend/main.py` allows `http://localhost:5173`

### "Can't reach Ollama"
✅ Run `ollama serve` in a separate terminal
✅ Check `http://localhost:11434` is accessible
✅ App still works without Ollama, returns demo messages

### Database errors
```bash
# Delete old database
rm backend/neurochat.db

# Restart backend to recreate
uvicorn main:app --reload --port 8000
```

---

## 📝 Environment Variables

```env
# Security
SECRET_KEY=your-secret-key-here

# Database
DATABASE_URL=sqlite:///./neurochat.db

# AI Model
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2

# JWT
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

---

## 🚀 Quick Start Commands

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn main:app --reload --port 8000

# Terminal 2: Ollama (optional but recommended)
ollama serve

# Terminal 3: Frontend
cd frontend
npm run dev
```

Then open: **http://localhost:5173** 🎉

---

## 💡 Features

✅ JWT Authentication with bcrypt  
✅ Real-time AI streaming responses  
✅ Chat management (create, rename, delete, pin)  
✅ File upload with text extraction (PDF, DOCX, TXT)  
✅ Voice input (Web Speech API)  
✅ Dark/Light/System themes  
✅ Dashboard with live stats  
✅ Settings management  
✅ Export chats to JSON  
✅ Responsive design  

---

## 📚 Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Auth:** JWT + bcrypt
- **AI:** Ollama (local LLM)
- **File Processing:** PyPDF, python-docx

---

**Happy Chatting! 🎉**
