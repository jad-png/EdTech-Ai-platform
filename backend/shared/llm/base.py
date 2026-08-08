from __future__ import annotations

from abc import ABC, abstractmethod
from collections.abc import Iterator
from typing import Protocol, Any


class LLMClient(ABC):
    @abstractmethod
    def generate_text(self, prompt: str, model: str | None = None) -> str:
        raise NotImplementedError

    @abstractmethod
    def generate_structured(self, prompt: str, model: str | None = None) -> str:
        raise NotImplementedError

    @abstractmethod
    def stream_text(self, prompt: str, model: str | None = None) -> Iterator[str]:
        raise NotImplementedError
