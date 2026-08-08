from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class RetrievedChunk:
    id: str
    document_id: str
    content: str
    page_number: int
    chunk_index: int
    score: float

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "document_id": self.document_id,
            "content": self.content,
            "page_number": self.page_number,
            "chunk_index": self.chunk_index,
            "score": self.score,
        }


class RetrievalService(ABC):
    @abstractmethod
    def search_similar_chunks(
        self,
        document_id: str,
        query_text: str | None = None,
        top_k: int = 5,
        user=None,
    ) -> list[RetrievedChunk]:
        raise NotImplementedError

    @abstractmethod
    def get_relevant_context(
        self,
        document_id: str,
        query_text: str | None = None,
        top_k: int = 5,
        user=None,
    ) -> str:
        raise NotImplementedError
