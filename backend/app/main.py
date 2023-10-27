"""Main application and routing logic for the API."""
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from .internal import admin
from .routers import items, users


app = FastAPI()
app.include_router(users.router)
app.include_router(items.router)
app.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"],
)

# CORS
origins = [
    "http://localhost:5173",
    "https://localhost:5173",
]
allow_origin_regex = r"https://project-.*\.pages\.dev"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=allow_origin_regex,
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
