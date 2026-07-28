import os

from crewai import LLM
from dotenv import load_dotenv

load_dotenv()


def build_llm() -> LLM:
    """Initialize a base CrewAI LLM instance from environment variables."""
    provider = os.getenv("CREWAI_PROVIDER", "").strip().lower()
    model = os.getenv("CREWAI_MODEL", "").strip()
    temperature = float(os.getenv("CREWAI_TEMPERATURE", "0.2"))

    if not provider:
        raise RuntimeError(
            "CREWAI_PROVIDER is required. Set it to 'gemini' or 'groq'."
        )

    if provider == "gemini":
        api_key = os.getenv("GEMINI_API_KEY", "").strip()
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY is required when CREWAI_PROVIDER=gemini.")
        resolved_model = model or "gemini/gemini-2.5-flash"
    elif provider == "groq":
        api_key = os.getenv("GROQ_API_KEY", "").strip()
        if not api_key:
            raise RuntimeError("GROQ_API_KEY is required when CREWAI_PROVIDER=groq.")
        resolved_model = model or "groq/llama-3.3-70b-versatile"
    else:
        raise RuntimeError("Unsupported CREWAI_PROVIDER. Use 'gemini' or 'groq'.")

    return LLM(model=resolved_model, api_key=api_key, temperature=temperature)
