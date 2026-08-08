from __future__ import annotations

from typing import Any

from pgvector.django import CosineDistance

from documents.models import DocumentChunk
from documents.services.ingestion.embeddings import get_embedding_model

DEFAULT_QUERY_PROMPT = "Main concepts, summary, key takeaways, and definitions"


def search_similar_chunks(
    document_id: str,
    query_text: str | None = None,
    top_k: int = 5,
    user=None,
) -> list[dict[str, Any]]:
    model = get_embedding_model()
    search_prompt = query_text if query_text else DEFAULT_QUERY_PROMPT
    query_vector = model.encode(search_prompt).tolist()

    queryset = DocumentChunk.objects.filter(document_id=document_id)
    if user is not None:
        queryset = queryset.filter(document__user=user)

    chunks = (
        queryset.annotate(distance=CosineDistance("embedding", query_vector))
        .order_by("distance")[:top_k]
    )

    return [
        {
            "id": str(chunk.id),
            "document_id": str(chunk.document_id),
            "content": chunk.content,
            "page_number": chunk.page_number,
            "chunk_index": chunk.chunk_index,
            "score": float(chunk.distance),
        }
        for chunk in chunks
    ]


def get_relevant_context(
    document_id: str,
    query_text: str | None = None,
    top_k: int = 5,
    user=None,
) -> str:
    chunks = search_similar_chunks(
        document_id=document_id,
        query_text=query_text,
        top_k=top_k,
        user=user,
    )
    if not chunks:
        return ""

    return "\n\n".join(chunk["content"] for chunk in chunks)
