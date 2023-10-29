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


def get_emotion_data(bucket_name: str, remote_storage_path: str):
    # submit job
    path = get_file(bucket_name, remote_storage_path)
    job = client.submit_job([], configs, files=[path])
    job.await_complete()

    # get results
    preds = job.get_predictions()
    preds = preds[0]  # only one file
    preds = preds["results"]["predictions"][0]["models"]  # results for all configs

    def get_preds(config_preds):  # get predictions for a config
        return config_preds["grouped_predictions"][0]["predictions"]

    face_preds = get_preds(preds["face"])
    pro_preds = get_preds(preds["prosody"])
    lang_preds = get_preds(preds["language"])

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
