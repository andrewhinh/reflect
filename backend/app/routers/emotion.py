"""Feature routes."""
from fastapi import APIRouter

from ..dependencies.emotion import get_emotion_data

router = APIRouter()


@router.post("/emotion")
async def get_emotion(bucket_name: str, remote_storage_path: str):
    """Get emotions from video and audio."""
    return get_emotion_data(bucket_name, remote_storage_path)
