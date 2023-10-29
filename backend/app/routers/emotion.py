"""Feature routes."""
from fastapi import APIRouter

from app.dependencies.emotion import get_emotion_data
from app.dependencies.report import generate_report

router = APIRouter()


@router.post("/emotion")
def get_emotion(bucket_name: str, remote_storage_path: str, question: str):
    """Get emotions from video and audio."""
    emotion_data = get_emotion_data(bucket_name, remote_storage_path)
    report = generate_report(emotion_data, question)
    return {
        "data": emotion_data,
        "report": report,
    }
