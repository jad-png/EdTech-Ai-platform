from rest_framework import serializers

from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ("id", "role", "content", "created_at")
        read_only_fields = fields


class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ("id", "document", "created_at", "updated_at", "messages")
        read_only_fields = ("id", "created_at", "updated_at", "messages")

    def validate_document(self, document):
        if document is not None and document.user_id != self.context["request"].user.id:
            raise serializers.ValidationError("You do not have access to this document.")
        return document


class MessageCreateSerializer(serializers.Serializer):
    content = serializers.CharField(allow_blank=False, trim_whitespace=True)
