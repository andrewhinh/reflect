"""Dependencies for items endpoints."""
import os

import openai

openai.api_key = os.getenv("OPENAI_API_KEY")


async def audio_to_text():
    audio_file = open("/Users/ryanlee/Desktop/Repos/aurora/backend/test_files/test_audio.mp3", "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    return transcript["text"]


if __name__ == "__main__":
    print(audio_to_text())
