from __future__ import annotations

from typing import Any

from django.apps import apps
from pgvector.django import CosineDistance

from documents.services.ingestion.embeddings import get_embedding_model
from .base import RetrievalService, RetrievedChunk

DEFAULT_QUERY_PROMPT = "Main concepts, summary, key takeaways, and definitions"


def _get_document_chunk_model():
    return apps.get_model("documents", "DocumentChunk")


class PgvectorDocumentChunkAdapter:
    def search(
        self,
        query_vector: list[float],
        document_id: str,
        top_k: int,
        user=None,
    ) -> list[RetrievedChunk]:
        document_chunk_model = _get_document_chunk_model()
        queryset = document_chunk_model.objects.filter(document_id=document_id)
        if user is not None:
            queryset = queryset.filter(document__user=user)

        chunks = (
            queryset.annotate(distance=CosineDistance("embedding", query_vector))
            .order_by("distance")[:top_k]
        )

        return [
            RetrievedChunk(
                id=str(chunk.id),
                document_id=str(chunk.document_id),
                content=chunk.content,
                page_number=chunk.page_number,
                chunk_index=chunk.chunk_index,
                score=float(chunk.distance),
            )
            for chunk in chunks
        ]


class PgvectorRetrievalService(RetrievalService):
    def __init__(self, adapter: PgvectorDocumentChunkAdapter | None = None) -> None:
        self._adapter = adapter or PgvectorDocumentChunkAdapter()

    def search_similar_chunks(
        self,
        document_id: str,
        query_text: str | None = None,
        top_k: int = 5,
        user=None,
    ) -> list[RetrievedChunk]:
        model = get_embedding_model()
        search_prompt = query_text if query_text else DEFAULT_QUERY_PROMPT
        query_vector = model.encode(search_prompt).tolist()
        return self._adapter.search(
            query_vector=query_vector,
            document_id=document_id,
            top_k=top_k,
            user=user,
        )

    def get_relevant_context(
        self,
        document_id: str,
        query_text: str | None = None,
        top_k: int = 5,
        user=None,
    ) -> str:
        chunks = self.search_similar_chunks(
            document_id=document_id,
            query_text=query_text,
            top_k=top_k,
            user=user,
        )
        if not chunks:
            return ""

        return "\n\n".join(chunk.content for chunk in chunks)


def _get_default_service() -> PgvectorRetrievalService:
    return PgvectorRetrievalService()


def search_similar_chunks(
    document_id: str,
    query_text: str | None = None,
    top_k: int = 5,
    user=None,
) -> list[dict[str, Any]]:
    chunks = _get_default_service().search_similar_chunks(
        document_id=document_id,
        query_text=query_text,
        top_k=top_k,
        user=user,
    )
    return [chunk.to_dict() for chunk in chunks]


def get_relevant_context(
    document_id: str,
    query_text: str | None = None,
    top_k: int = 5,
    user=None,
) -> str:
    return _get_default_service().get_relevant_context(
        document_id=document_id,
        query_text=query_text,
        top_k=top_k,
        user=user,
    )
