from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Quiz
from .serializers import QuizSerializer, QuizGenerateSerializer
from .services.generator import generate_quiz_for_document


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