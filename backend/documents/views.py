from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from .models import Document
from .serializers import DocumentSerializer, DocumentUploadSerializer
from core.storage import upload_file_to_minio, delete_file_from_minio


class DocumentListUploadView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return DocumentUploadSerializer
        return DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = DocumentUploadSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        uploaded_file = serializer.validated_data["file"]
        object_key = f"users/{request.user.id}/{uploaded_file.name}"

        upload_file_to_minio(uploaded_file, object_key)

        doc = Document.objects.create(
            user=request.user,
            title=uploaded_file.name,
            file_key=object_key,
            file_size_bytes=uploaded_file.size,
            status=Document.Status.UPLOADED,
        )

        return Response(
            DocumentSerializer(doc).data, status=status.HTTP_201_CREATED
        )


class DocumentDetailView(generics.RetrieveDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)

    def perform_destroy(self, instance):
        delete_file_from_minio(instance.file_key)
        instance.delete()