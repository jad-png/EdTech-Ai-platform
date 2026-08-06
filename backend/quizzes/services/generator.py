import json
import logging

from documents.models import Document
from documents.services.retrieval import get_relevant_context
from ..models import Quiz, Question, Option
from .llm import generate_content

logger = logging.getLogger(__name__)

def generate_quiz_for_document(user, document_id: str, num_questions: int = 5, difficulty: str = "MEDIUM", topic: str = None,) -> Quiz:
    
    doc = Document.objects.get(id=document_id, user=user)
    
    context_text = get_relevant_context(document_id=document_id, query_text=topic, top_k=5)
    
    if not context_text:
        raise ValueError("No processed context found for this document.")
    
    prompt = f"""
    You are an expert AI quiz generator. Generate a structured JSON quiz based ONLY on the context below.

    Context:
    {context_text}

    Requirements:
    - Number of questions: {num_questions}
    - Difficulty level: {difficulty}
    - Output format: STRICT JSON ONLY with no markdown formatting.

    JSON Schema:
    {{
      "quiz_title": "Title based on context",
      "questions": [
        {{
          "question": "Question text?",
          "explanation": "Why the correct option is right",
          "options": [
            {{"text": "Option A", "is_correct": true}},
            {{"text": "Option B", "is_correct": false}},
            {{"text": "Option C", "is_correct": false}},
            {{"text": "Option D", "is_correct": false}}
          ]
        }}
      ]
    }}
    """

    response_text = generate_content(prompt)
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