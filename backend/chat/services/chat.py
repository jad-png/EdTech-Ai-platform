from django.shortcuts import get_object_or_404

from shared.memory import (
    build_conversation_context,
    save_assistant_message,
    save_user_message,
)

from agents.crew.edtech_crew import run_edtech_crew
from ..models import Conversation


def send_message(user, conversation_id, content: str) -> dict:
    conversation = get_object_or_404(
        Conversation.objects.select_related("document"),
        id=conversation_id,
        user=user,
    )

    save_user_message(conversation, content)
    history = build_conversation_context(conversation)
    result = run_edtech_crew(
        user=user,
        document_id=str(conversation.document_id) if conversation.document_id else None,
        content=content,
        history=history,
    )
    answer = result["answer"]
    save_assistant_message(conversation, answer)
    conversation.save(update_fields=("updated_at",))

    return result
