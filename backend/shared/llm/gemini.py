from __future__ import annotations

import logging
from collections.abc import Iterator

from django.conf import settings
from google import genai

from .base import LLMClient

logger = logging.getLogger(__name__)

DEFAULT_MODEL = "gemini-2.5-flash"


class GeminiLLMClient(LLMClient):
    def __init__(self, api_key: str | None = None) -> None:
        self._api_key = api_key or settings.GEMINI_API_KEY

    def _get_client(self) -> genai.Client:
        return genai.Client(api_key=self._api_key)

    def generate_text(self, prompt: str, model: str | None = None) -> str:
        client = self._get_client()
        response = client.models.generate_content(
            model=model or DEFAULT_MODEL,
            contents=prompt,
        )
        return response.text or ""

    def generate_structured(self, prompt: str, model: str | None = None) -> str:
        return self.generate_text(prompt, model=model)

    def stream_text(self, prompt: str, model: str | None = None) -> Iterator[str]:
        client = self._get_client()
        response = client.models.generate_content_stream(
            model=model or DEFAULT_MODEL,
            contents=prompt,
        )
        for chunk in response:
            if chunk.text:
                yield chunk.text


def get_default_llm_client() -> GeminiLLMClient:
    return GeminiLLMClient()
