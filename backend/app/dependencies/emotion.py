"""Dependencies for items endpoints."""
import os

from firebase import get_file
from hume import HumeBatchClient
from hume.models.config import FacemeshConfig, ProsodyConfig


client = HumeBatchClient(os.getenv("HUME_API_KEY"))
configs = [FacemeshConfig(), ProsodyConfig()]


def get_emotion_data(bucket_name: str, remote_storage_path: str):
    path = get_file(bucket_name, remote_storage_path)
    job = client.submit_job([], configs, files=[path])
    job.await_complete()
    result = job.get_predictions()[0]
    print(result)
    return result
