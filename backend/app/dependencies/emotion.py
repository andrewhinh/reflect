"""Dependencies for items endpoints."""
import os

from hume import HumeBatchClient
from hume.models.config import FaceConfig
from hume.models.config import ProsodyConfig

client = HumeBatchClient(os.getenv("HUME_API_KEY"))
configs = [FaceConfig(identify_faces=True), ProsodyConfig()]


def get_emotions(url: str):
    job = client.submit_job([url], configs)
    job.await_complete()
    result = job.get_predictions()[0]
    return result
