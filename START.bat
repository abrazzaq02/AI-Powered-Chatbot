@echo off
REM Quick start script for AI Powered Chatbot (Windows)

echo.
echo ========================================
echo   AI Powered Chatbot - Quick Start
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd backend

if not exist "venv" (
  echo Creating virtual environment...
  python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt >nul 2>&1

if not exist ".env" (
  echo Creating .env file...
  copy .env.example .env >nul 2>&1
)

echo.
echo [2/4] Backend ready! Starting server on port 8000...
echo API Docs: http://localhost:8000/docs
echo.

start "Backend" cmd /k "uvicorn main:app --reload --port 8000"

echo.
echo [3/4] Setting up Frontend...
cd ..
cd frontend

echo Installing npm dependencies...
call npm install >nul 2>&1

echo.
echo [4/4] Frontend ready! Starting dev server on port 5173...
echo Open: http://localhost:5173
echo.

start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Both servers running!
echo   Remember to start Ollama:
echo   ollama serve
echo ========================================
echo.
pause
