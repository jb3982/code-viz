from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ast

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
def analyze_code(request: CodeRequest):
    try:
        tree = ast.parse(request.code)
        top_lvl_nodes = [type(node).__name__ for node in tree.body]
        return {
            "ok": True,
            "message": "Code parsed successfully",
            "top_level_nodes": top_lvl_nodes,
            "node_count": len(top_lvl_nodes)
        }
    except SyntaxError as e:
        return {
            "ok": False,
            "message": f"Syntax error",
            "error": str(e),
            "line": e.lineno,
            "offset": e.offset
        }