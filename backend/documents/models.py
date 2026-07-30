from django.db import models
from django.conf import settings
import uuid

class Document(models.Model):
    class Status(models.TextChoices):
        UPLOADED = "UPLOADED", "Uploaded"
        PROCESSING = "PROCESSING", "Processing"
        READY = "READY", "Ready"
        FAILED = "FAILED", "Failed"
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="docuemnts",
    )
    title = models.CharField(max_length=255)
    file_key = models.CharField(
        max_length=512, help_text="MinIO object storage path/key."
    )
    file_size_bytes = models.BigIntegerField(null=True, blank=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.UPLOADED
    )
    error_message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.user.username}) - {self.status}"