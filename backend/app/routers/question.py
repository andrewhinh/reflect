"""Feature routes."""
from fastapi import APIRouter

from app.dependencies.question import get_rand_question

router = APIRouter()


# this route, given a soft skill question category,
# return a random question that'a a part of that category
@router.post("/question")
async def question(question_category: str):
    """Get emotions from video and audio."""
    print(question_category)
    question = get_rand_question(question_category)
    print(question)
    return {
        "question": question,
    }
