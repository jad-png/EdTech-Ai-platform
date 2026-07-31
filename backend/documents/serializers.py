from rest_framework import serializers
from .models import Document

MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024  # 50 MB limit


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            "id",
            "title",
            "file_size_bytes",
            "status",
            "error_message",
            "created_at",
        )
        read_only_fields = (
            "id",
            "file_size_bytes",
            "status",
            "error_message",
            "created_at",
        )


class DocumentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    def validate_file(self, value):
        if not value.name.lower().endswith(".pdf"):
            raise serializers.ValidationError("Only PDF files are allowed.")
        if value.size > MAX_FILE_SIZE_BYTES:
            raise serializers.ValidationError(
                "File size exceeds the 50 MB limit."
            )
        return value

    def validate(self, attrs):
        user = self.context["request"].user
        uploaded_file = attrs["file"]

        current_doc_count = user.documents.count()
        if current_doc_count >= user.max_documents:
            raise serializers.ValidationError(
                f"Document quota reached ({user.max_documents} max)."
            )

        total_storage_used = (
            sum(
                doc.file_size_bytes
                for doc in user.documents.all()
                if doc.file_size_bytes
            )
            + uploaded_file.size
        )
        max_storage_bytes = user.max_storage_mb * 1024 * 1024
        if total_storage_used > max_storage_bytes:
            raise serializers.ValidationError(
                f"Storage quota exceeded ({user.max_storage_mb} MB max)."
            )

        return attrs


class DocumentUploadResponseSerializer(serializers.Serializer):
    """Structured response returned after a document upload attempt."""

    success = serializers.BooleanField()
    message = serializers.CharField()
    document = DocumentSerializer()
    storage = serializers.DictField()