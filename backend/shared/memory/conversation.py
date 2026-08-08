from __future__ import annotations

from collections.abc import Iterable
from typing import Any


def get_conversation_messages(conversation, limit: int | None = None):
    messages = conversation.messages.all().order_by("created_at")
    if limit is not None:
        messages = messages[-limit:]
    return list(messages)


def build_conversation_context(conversation, limit: int = 20) -> str:
    messages = get_conversation_messages(conversation, limit=limit)
    lines = []
    for message in messages:
        lines.append(f"{message.role}: {message.content}")
    return "\n".join(lines)


def save_user_message(conversation, content: str, **kwargs: Any):
    return conversation.messages.create(role="USER", content=content, **kwargs)


def save_assistant_message(conversation, content: str, **kwargs: Any):
    return conversation.messages.create(role="ASSISTANT", content=content, **kwargs)
