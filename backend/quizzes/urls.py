from django.urls import path
from .views import QuizGenerateView, QuizListView

urlpatterns = [
    path("", QuizListView.as_view(), name="quiz_list"),
    path("generate/", QuizGenerateView.as_view(), name="quiz_generate"),
]