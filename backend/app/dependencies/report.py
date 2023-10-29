"""Dependencies for emotion data report endpoint."""
import os

from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)


def generate_report(emotion_data):
    # set up model and prompt template
    model = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), model="gpt-4", temperature=0.7)  # initialize model
    template = """
        You are a helpful assistant that analyzes an interview answer (separated per sentence)
        and gives feedback on the emotions expressed by the me, the interviwee. For applicable questions,
        If I didn't follow the STAR (STAR method is an interview technique that gives you a straightforward
        format you can use to tell a story by laying out the Situation, Task, Action, and Result) method,
        make sure to give me tips on how to follow the STAR method. Also, if my responses sound unnatural,
        make sure to remind me to not to force myself to be natural, and remind me to not feel stressed out
        if my response sounds stressed.

        The format of an answer is as follows:
        Text: a sentence from my answer
        Face emotion: the emotion detected from my face
        Prosody emotion: the emotion detected from my voice
        Language emotion: the emotion detected from my answer

        The above will be repeated for each sentence in my answer.

        Using the entire answer, give feedback on:
        1. What the interviewee did well
        2. How the interviewee can improve what they said
        3. How the interviewee can improve the way they said their answer
        4. How the interviewee can improve the facial expressions they made while answering
        The improvement suggestions should be directed towards making the
        interviewee appear more intelligent, confident, and professional.
        Use the above numbered list as the format of your feedback.
    """  # system prompt
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template = "{text}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])

    # format data to be used in prompt template
    formatted_data = ""
    face_data, pro_data, lang_data = (
        emotion_data["face"],
        emotion_data["prosody"],
        emotion_data["language"],
    )
    for face, pro, lang in zip(face_data, pro_data, lang_data):
        text = lang["text"]

        face_emotion = face["emotion"]
        pro_emotion = pro["emotion"]
        lang_emotion = lang["emotion"]

        face_emotion_score = face["emotion_score"]
        pro_emotion_score = pro["emotion_score"]
        lang_emotion_score = lang["emotion_score"]

        formatted_data += (
            f"Text: {text}\n"
            f"Face emotion: {face_emotion} ({face_emotion_score})\n"
            f"Prosody emotion: {pro_emotion} ({pro_emotion_score})\n"
            f"Language emotion: {lang_emotion} ({lang_emotion_score})\n\n\n"
        )

    return model(chat_prompt.format_prompt(text=formatted_data).to_messages()).content
