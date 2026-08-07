from django.urls import path
from .views import (
    QuizGenerateView,
    QuizListView,
    QuizStartAttemptView,
    QuizSubmitAttemptView,
    QuizAnalyticsView,
    QuizAttemptHistoryView,
)

urlpatterns = [
    path("", QuizListView.as_view(), name="quiz_list"),
    path("generate/", QuizGenerateView.as_view(), name="quiz_generate"),
    path("<uuid:quiz_id>/start/", QuizStartAttemptView.as_view(), name="quiz_start"),
    path("attempts/<uuid:attempt_id>/submit/", QuizSubmitAttemptView.as_view(), name="quiz_submit"),
    path("attempts/", QuizAttemptHistoryView.as_view(), name="quiz_history"),
    path("analytics/", QuizAnalyticsView.as_view(), name="quiz_analytics"),
]