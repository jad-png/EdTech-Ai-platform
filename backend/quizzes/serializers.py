from rest_framework import serializers
from .models import Quiz, Question, Option


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ("id", "text", "is_correct")


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ("id", "text", "explanation", "options")


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ("id", "document", "title", "difficulty", "questions", "created_at")


class QuizGenerateSerializer(serializers.Serializer):
    document_id = serializers.UUIDField()
    num_questions = serializers.IntegerField(default=5, min_value=1, max_value=15)
    difficulty = serializers.ChoiceField(choices=Quiz.Difficulty.choices, default=Quiz.Difficulty.MEDIUM)
    topic = serializers.CharField(required=False, allow_blank=True, default="")