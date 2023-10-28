"""Dependencies for items endpoints."""
import os

from firebase import get_file
from hume import HumeBatchClient
from hume.models.config import FacemeshConfig, ProsodyConfig
from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

client = HumeBatchClient(os.getenv("HUME_API_KEY"))
configs = [FacemeshConfig(), ProsodyConfig()]


def get_emotion_data(bucket_name: str, remote_storage_path: str):
    path = get_file(bucket_name, remote_storage_path)
    job = client.submit_job([], configs, files=[path])
    job.await_complete()
    result = job.get_predictions()[0]
    transcript, data = result
    # TODO: process JSON to get
    # 1) transcript to pass to GPT-4 and
    # 2) raw emotion data to pass to frontend
    return transcript, data


def process_transcript(transcript):
    model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), model="gpt-4", temperature=0.7)
    template = "You are a helpful assistant that analyzes an interview answer and provides feedback."
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template = "{text}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
    return model(chat_prompt.format_prompt(text=transcript).to_messages())["content"]
