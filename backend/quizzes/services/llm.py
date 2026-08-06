import logging

from django.conf import settings
from google import genai

logger = logging.getLogger(__name__)

DEFAULT_MODEL = "gemini-1.5-flash"


def _get_client() -> genai.Client:
    return genai.Client(api_key=settings.GEMINI_API_KEY)


def generate_content(prompt: str, model: str = DEFAULT_MODEL) -> str:
    client = _get_client()
    response = client.models.generate_content(model=model, contents=prompt)
    return response.text or ""