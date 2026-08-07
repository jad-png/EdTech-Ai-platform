from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Quiz, QuizAttempt
from .serializers import (
    QuizSerializer,
    QuizGenerateSerializer,
    QuizSubmitSerializer,
    QuizAttemptDetailSerializer,
)
from .services import (
    generate_quiz_for_document,
    start_quiz_attempt,
    submit_and_grade_attempt,
    get_user_learning_analytics,
)

class QuizGenerateView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = QuizGenerateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        quiz = generate_quiz_for_document(
            user=request.user,
            document_id=str(serializer.validated_data["document_id"]),
            num_questions=serializer.validated_data["num_questions"],
            difficulty=serializer.validated_data["difficulty"],
            topic=serializer.validated_data.get("topic"),
        )

        return Response(QuizSerializer(quiz).data, status=status.HTTP_201_CREATED)


class QuizListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = QuizSerializer

    def get_queryset(self):
        return Quiz.objects.filter(user=self.request.user)
    
class QuizStartAttemptView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, quiz_id):
        attempt = start_quiz_attempt(user=request.user, quiz_id=quiz_id)
        return Response(QuizAttemptDetailSerializer(attempt).data, status=status.HTTP_201_CREATED)


class QuizSubmitAttemptView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, attempt_id):
        serializer = QuizSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        attempt = submit_and_grade_attempt(
            user=request.user,
            attempt_id=attempt_id,
            submitted_answers=serializer.validated_data["answers"],
        )
        return Response(QuizAttemptDetailSerializer(attempt).data, status=status.HTTP_200_OK)


class QuizAnalyticsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        analytics_data = get_user_learning_analytics(user=request.user)
        return Response(analytics_data, status=status.HTTP_200_OK)


class QuizAttemptHistoryView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = QuizAttemptDetailSerializer

    def get_queryset(self):
        return QuizAttempt.objects.filter(user=self.request.user)