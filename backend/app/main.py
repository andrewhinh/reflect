"""Main application and routing logic for the API."""
import json
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials, initialize_app

load_dotenv()

initialize_app(
    credentials.Certificate(json.loads(os.getenv("FIREBASE_JSON"))),
)


from app.routers import emotion, question


app = FastAPI()
app.include_router(emotion.router)
app.include_router(question.router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Paths
@app.get("/")
async def read_root() -> dict[str, str]:
    """Read root.

    Returns
    -------
    dict[str, str]
        Message
    """
    return {"message": "API"}
