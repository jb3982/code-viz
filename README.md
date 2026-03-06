# Code-Viz

Code-Viz is a web-based tool that visualizes how code works internally.  
The goal of the project is to help students and developers understand program execution through visual representations of code structure and behavior.

The system analyzes code and produces:

- Abstract Syntax Trees (AST)
- Control Flow Graphs (CFG)
- Execution traces (planned)

The project is currently focused on **Python**, but the architecture is designed to support multiple programming languages in the future.

---

# Project Goals

Understanding algorithms and program execution can be difficult when looking only at source code.

Code-Viz aims to:

- Visualize how code is parsed and structured
- Show how execution flows through loops, recursion, and branches
- Help learners understand algorithm behavior step-by-step

---

# Current Features

- FastAPI backend for code analysis
- React + TypeScript frontend
- Python AST parsing
- API endpoint to analyze submitted code
- Frontend communication with backend

---

# Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Python
- FastAPI

### Planned
- AST visualization
- Control Flow Graph generation
- Dynamic execution tracing

---

# Project Structure
```
code-viz/
│
├── backend/
│ └── app/
│ └── main.py
│
├── frontend/
│ ├── src/
│ │ ├── App.tsx
│ │ └── main.tsx
│ └── index.html
│
└── README.md
```

---


# Running the Project Locally

## Backend

Create virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```
Install dependencies:
```bash
pip install fastapi uvicorn
```

Run the backend server:

```bash
uvicorn app.main:app --reload
```

The API will run at: ```http://127.0.0.1:8000```

## Frontend
Navigate to the frontend directory:
```bash 
cd frontend
```

Install dependencies:
```bash 
npm install
```

Start the development server:
```bash 
npm run dev
```

The frontend will run at: ```http://localhost:5173```