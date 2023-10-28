"""Feature routes."""
from fastapi import APIRouter

from ..dependencies.emotion import get_emotion_data, process_transcript

router = APIRouter()


@router.post("/emotion")
async def get_emotion(bucket_name: str, remote_storage_path: str):
    """Get emotions from video and audio."""
    transcript, data = get_emotion_data(bucket_name, remote_storage_path)
    report = process_transcript(transcript)
    return {
        "data": data,
        "report": report,
    }
