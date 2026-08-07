from rest_framework import serializers
from .models import Quiz, Question, Option, QuizAttempt, UserAnswer



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
    
class AnswerSubmissionSerializer(serializers.Serializer):
    question_id = serializers.UUIDField()
    selected_option_id = serializers.UUIDField(required=False, allow_null=True)


class QuizSubmitSerializer(serializers.Serializer):
    answers = AnswerSubmissionSerializer(many=True)


class UserAnswerResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ("question", "selected_option", "is_correct")


class QuizAttemptDetailSerializer(serializers.ModelSerializer):
    percentage = serializers.ReadOnlyField()
    duration_seconds = serializers.ReadOnlyField()
    user_answers = UserAnswerResultSerializer(many=True, read_only=True)

    class Meta:
        model = QuizAttempt
        fields = (
            "id",
            "quiz",
            "score",
            "total_questions",
            "percentage",
            "status",
            "duration_seconds",
            "started_at",
            "submitted_at",
            "user_answers",
        )