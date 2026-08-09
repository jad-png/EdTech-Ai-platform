from django.urls import path

from .views import (
    ConversationDetailView,
    ConversationListCreateView,
    ConversationMessageView,
)

urlpatterns = [
    path("", ConversationListCreateView.as_view(), name="conversation_list_create"),
    path(
        "<uuid:conversation_id>/messages/",
        ConversationMessageView.as_view(),
        name="conversation_messages",
    ),
    path(
        "<uuid:pk>/",
        ConversationDetailView.as_view(),
        name="conversation_detail",
    ),
]
