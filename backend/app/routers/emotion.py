"""Feature routes."""
from fastapi import APIRouter

from ..dependencies.emotion import get_emotions

router = APIRouter()


@router.post("/emotion")
async def get_emotion(url: str):
    """Get emotions from video and audio."""
    emotions = get_emotions(url)
    return emotions
