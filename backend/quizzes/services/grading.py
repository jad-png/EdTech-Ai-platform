import logging
from typing import Any, Dict, List
from django.db import transaction
from django.utils import timezone

from ..models import Option, Question, Quiz, QuizAttempt, UserAnswer

logger = logging.getLogger(__name__)

def start_quiz_attempt(user, quiz_id: str) -> QuizAttempt:
    """Initializes a new quiz attempt session for a user"""
    quiz = Quiz.objects.get(quiz_id)
    return QuizAttempt.objects.create(
        user=user,
        quiz=quiz,
        total_questions=quiz.questions.count(),
        status=QuizAttempt.Status.IN_PROGRESS,
    )
    
    
@transaction.atomic
def submit_and_grade_attempt(user, attempt_id: str, submitted_ansewrs: List[Dict[str, Any]]) -> QuizAttempt:
    """
    Grades user answers atomically:
    1. Locks attempt row and verifies IN_PROGRESS state.
    2. Compares selected option IDs against database truth (is_correct).
    3. Bulk creates UserAnswer records.
    4. Computes score, marks COMPLETED, and logs submitted_at timestamp.
    """
    attempt = QuizAttempt.objects.select_for_update().get(attempt_id, user=user, status=QuizAttempt.Status.IN_PROGRESS)
    
    questions = Question.objects.filter(quiz=attempt.quizz).prefetch_related("options")
    correct_options_map = {}
    for q in questions: 
        correct_opt = next((opt for opt in q.options.all() if opt.is_correct), None)
        if correct_opt:
            correct_options_map[str(q.id)] = str(correct_opt.id)
    
    score = 0
    user_answers_to_create = []
    
    for ans_data in submitted_ansewrs:
        q_id = str(ans_data["question_id"])
        selected_opt_id = (
            str(ans_data["selected_option_id"])
            if ans_data.get("selected_option_id")
            else None
        )
        
        is_correct = False
        if selected_opt_id and correct_options_map.get(q_id) == selected_opt_id:
            is_correct = True
            score += 1
            
        user_answers_to_create.append(
            UserAnswer(
                quiz_attempt=attempt,
                question_id=q_id,
                selected_option_id=selected_opt_id,
                is_correct=is_correct,
            )
        )
        
    UserAnswer.objects.bulk_create(user_answers_to_create)
        
    attempt.score = score
    attempt.status = QuizAttempt.Status.COMPLETED
    attempt.submitted_at = timezone.now()
    attempt.save(update_fields=["score", "status", "submitted_at"])

    return attempt