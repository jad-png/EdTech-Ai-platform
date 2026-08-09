from django.shortcuts import get_object_or_404

from shared.llm import get_default_llm_client
from shared.memory import (
    build_conversation_context,
    save_assistant_message,
    save_user_message,
)
from shared.retrieval import search_similar_chunks

from ..models import Conversation


def send_message(user, conversation_id, content: str) -> dict:
    conversation = get_object_or_404(
        Conversation.objects.select_related("document"),
        id=conversation_id,
        user=user,
    )

    save_user_message(conversation, content)
    history = build_conversation_context(conversation)
    sources = []

    if conversation.document_id:
        sources = search_similar_chunks(
            document_id=str(conversation.document_id),
            query_text=content,
            top_k=5,
            user=user,
        )

    retrieved_context = "\n\n".join(source["content"] for source in sources)
    prompt = f"""You are a helpful educational assistant. Answer the user's question clearly and concisely.

Conversation history:
{history or "(No previous messages)"}

Retrieved context:
{retrieved_context or "(No document context available)"}

Current question:
{content}

Use the retrieved context when it is available. If it is not available, answer from general knowledge and be transparent when uncertain.
"""

    answer = get_default_llm_client().generate_text(prompt)
    save_assistant_message(conversation, answer)
    conversation.save(update_fields=("updated_at",))

    return {"answer": answer, "sources": sources}
