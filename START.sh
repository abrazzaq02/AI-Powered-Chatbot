#!/bin/bash
# Quick start script for AI Powered Chatbot

echo "🚀 Starting AI Powered Chatbot..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Backend Setup ===${NC}"
cd backend

# Check if venv exists
if [ ! -d "venv" ]; then
  echo -e "${YELLOW}Creating virtual environment...${NC}"
  python3 -m venv venv
fi

# Activate venv
echo -e "${YELLOW}Activating virtual environment...${NC}"
source venv/bin/activate

# Install requirements
echo -e "${YELLOW}Installing dependencies...${NC}"
pip install -r requirements.txt > /dev/null 2>&1

# Check if .env exists
if [ ! -f ".env" ]; then
  echo -e "${YELLOW}Creating .env file...${NC}"
  cp .env.example .env
fi

echo -e "${GREEN}✅ Backend ready!${NC}"
echo -e "${BLUE}Starting FastAPI server on port 8000...${NC}"
echo -e "${YELLOW}📚 API Docs: http://localhost:8000/docs${NC}"
echo ""

# Start backend
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

echo ""
echo -e "${BLUE}=== Frontend Setup ===${NC}"
cd ../frontend

echo -e "${YELLOW}Installing npm dependencies...${NC}"
npm install > /dev/null 2>&1

echo -e "${GREEN}✅ Frontend ready!${NC}"
echo -e "${BLUE}Starting Vite dev server on port 5173...${NC}"
echo -e "${YELLOW}🌐 Open: http://localhost:5173${NC}"
echo ""

# Start frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Both servers running!${NC}"
echo -e "${YELLOW}⚠️  Remember to start Ollama in another terminal:${NC}"
echo -e "${YELLOW}   ollama serve${NC}"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop all servers${NC}"

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
