#!/usr/bin/env bash
# Start backend + frontend together for local development.
#   ./dev.sh
# Backend: http://localhost:8000 (docs at /docs)   Frontend: http://localhost:5173
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

PYTHON="${PYTHON:-python3}"

# ---- backend ----
if [ ! -d backend/.venv ]; then
  echo "==> Creating Python virtualenv (backend/.venv)"
  "$PYTHON" -m venv backend/.venv
fi
echo "==> Installing backend dependencies"
backend/.venv/bin/pip install -q --upgrade pip
backend/.venv/bin/pip install -q -r backend/requirements.txt

if [ ! -f backend/.env ]; then
  echo "==> Creating backend/.env from .env.example"
  cp backend/.env.example backend/.env
fi

# ---- frontend ----
if [ ! -d frontend/node_modules ]; then
  echo "==> Installing frontend dependencies"
  (cd frontend && npm install)
fi

cleanup() { echo; echo "==> Shutting down"; kill 0 2>/dev/null || true; }
trap cleanup EXIT INT TERM

echo "==> Starting backend on http://localhost:8000"
(cd backend && ./.venv/bin/uvicorn main:app --reload --host 0.0.0.0 --port 8000) &

echo "==> Starting frontend on http://localhost:5173"
(cd frontend && npm run dev) &

wait
