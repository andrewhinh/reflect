"""Dependencies for emotion data extraction endpoint."""
import os

from hume import HumeBatchClient
from hume.models.config import (
    FaceConfig,  # for facial expression -> emotion analysis
    LanguageConfig,  # for text -> emotion analysis
    ProsodyConfig,  # for audio -> emotion analysis
)

from app.dependencies.firebase import get_file

client = HumeBatchClient(os.getenv("HUME_API_KEY"))
configs = [
    FaceConfig(),
    LanguageConfig(granularity="sentence"),
    ProsodyConfig(granularity="sentence"),
]
config1 = [FaceConfig()]
config2 = [
    LanguageConfig(granularity="sentence"),
]
config3 = [
    ProsodyConfig(granularity="sentence"),
]


def get_emotion_data(bucket_name: str, remote_storage_path: str):
    # submit job

    print(bucket_name)
    print(remote_storage_path)
    path = get_file(bucket_name, remote_storage_path)
    print(path)
    job1 = client.submit_job([], config1, files=[path])
    job2 = client.submit_job([], config2, files=[path])
    job3 = client.submit_job([], config3, files=[path])

    job1.await_complete()
    job2.await_complete()
    job3.await_complete()

    face_preds = []
    pro_preds = []
    lang_preds = []

    try:
        face_preds = job1.get_predictions()[0]["results"]["predictions"][0]["models"]["face"]["grouped_predictions"][0][
            "predictions"
        ]
    except Exception:
        print("Missing face")

    try:
        pro_preds = job2.get_predictions()[0]["results"]["predictions"][0]["models"]["language"]["grouped_predictions"][
            0
        ]["predictions"]
    except Exception:
        print("Missing words")

    try:
        lang_preds = job3.get_predictions()[0]["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][
            0
        ]["predictions"]
    except Exception:
        print("Missing sounds")

    # format results
    frame_face_results, pro_results, lang_results = (
        [],
        [],
        [],
    )  # formatted results for each config

    def get_emotion(pred):  # get most likely emotion
        most_likely = max(pred["emotions"], key=lambda x: x["score"])
        return most_likely["name"], most_likely["score"]

    def create_speech_entry(pred):  # create entry for a sentence
        text = pred["text"]
        time_range = pred["time"]
        time_begin = time_range["begin"]
        time_end = time_range["end"]
        emotion, emotion_score = get_emotion(pred)
        return {
            "text": text,
            "time_begin": time_begin,
            "time_end": time_end,
            "emotion": emotion,
            "emotion_score": emotion_score,
        }

    for pred in face_preds:  # for each frame
        time_stamp = pred["time"]
        emotion, emotion_score = get_emotion(pred)
        frame_face_results.append(
            {
                "time_stamp": time_stamp,
                "emotion": emotion,
                "emotion_score": emotion_score,
            }
        )
    for pred in pro_preds:  # for each sentence
        pro_results.append(create_speech_entry(pred))
    for pred in lang_preds:  # for each sentence
        lang_results.append(create_speech_entry(pred))

    # convert face results to per sentence
    # for each sentence, get all frames that are within the time range
    # and take the average of the emotion scores
    face_results = []
    for pred in pro_results:
        time_begin = pred["time_begin"]
        time_end = pred["time_end"]
        emotion = pred["emotion"]
        emotion_score = pred["emotion_score"]
        frames = [frame for frame in frame_face_results if time_begin <= frame["time_stamp"] <= time_end]
        emotion_scores = [frame["emotion_score"] for frame in frames]
        emotion_score = sum(emotion_scores) / len(emotion_scores)
        face_results.append(
            {
                "text": pred["text"],
                "time_begin": time_begin,
                "time_end": time_end,
                "emotion": emotion,
                "emotion_score": emotion_score,
            }
        )

    # combine all results into one dict
    result = {
        "face": face_results,
        "prosody": pro_results,
        "language": lang_results,
    }

    # delete file for privacy
    os.remove(path)

    # return results
    return result
