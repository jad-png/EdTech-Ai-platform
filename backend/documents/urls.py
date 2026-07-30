from django.urls import path
from .views import DocumentListUploadView, DocumentDetailView

urlpatterns = [
    path("", DocumentListUploadView.as_view(), name="document_list_upload"),
    path("<uuid:pk>/", DocumentDetailView.as_view(), name="document_detail"),
]