import json
import logging

from agents.crew.edtech_crew import run_edtech_crew
from documents.models import Document

from ..models import Option, Quiz, Question

logger = logging.getLogger(__name__)


def generate_quiz_for_document(
    user,
    document_id: str,
    num_questions: int = 5,
    difficulty: str = "MEDIUM",
    topic: str = None,
) -> Quiz:
    doc = Document.objects.get(id=document_id, user=user)

    result = run_edtech_crew(
        workflow="quiz_generation",
        user=user,
        document_id=document_id,
        content=topic or "",
        num_questions=num_questions,
        difficulty=difficulty,
        topic=topic,
    )
    response_text = result["quiz"]
    clean_json = response_text.replace("```json", "").replace("```", "").strip()
    quiz_payload = json.loads(clean_json)

    quiz = Quiz.objects.create(
        user=user,
        document=doc,
        title=quiz_payload.get("quiz_title", f"Quiz on {doc.title}"),
        difficulty=difficulty,
    )

    for q_data in quiz_payload.get("questions", []):
        question = Question.objects.create(
            quiz=quiz,
            text=q_data["question"],
            explanation=q_data.get("explanation", ""),
        )
        for opt_data in q_data.get("options", []):
            Option.objects.create(
                question=question,
                text=opt_data["text"],
                is_correct=opt_data["is_correct"],
            )

    return quiz
