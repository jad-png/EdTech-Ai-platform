import logging
from django.db.models import Count, Q

from ..models import QuizAttempt, UserAnswer

logger = logging.getLogger(__name__)

def get_user_learning_analytics(user) -> dict:
    """
    Computes aggregated performance metrics across all completed quiz attempts.
    """
    completed_attempts = QuizAttempt.objects.filter(
        user=user, status=QuizAttempt.Status.COMPLETED
    )
    
    total_attempts = completed_attempts.count()
    
    if total_attempts == 0:
        return {
            "total_attempts": 0,
            "average_score_percentage": 0.0,
            "best_score_percentage": 0.0,
            "worst_score_percentage": 0.0,
            "total_questions_answered": 0,
            "total_correct": 0,
            "total_incorrect": 0,
        }
        
    attempt_percentages = [att.percentage for att in completed_attempts]
    avg_percentage = sum(attempt_percentages) / len(attempt_percentages)
    best_percentage = max(attempt_percentages)
    worst_percentage = min(attempt_percentages)
    
    answers_stats =  UserAnswer.objects.filter(
        quiz_attempt__user=user,
        quiz_attempt__status=QuizAttempt.Status.COMPLETED
    ).aggregate(
        total_answered=Count("id"),
        total_correct=Count("id", filter=Q(is_correct=True)),
        total_incorrect=Count("id", filter=Q(is_correct=False)),
    )
    
    return {
        "total_attempts": total_attempts,
        "average_score_percentage": round(avg_percentage, 2),
        "best_score_percentage": round(best_percentage, 2),
        "worst_score_percentage": round(worst_percentage, 2),
        "total_questions_answered": answers_stats["total_answered"] or 0,
        "total_correct": answers_stats["total_correct"] or 0,
        "total_incorrect": answers_stats["total_incorrect"] or 0,
    }