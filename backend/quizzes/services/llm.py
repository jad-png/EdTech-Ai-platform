from shared.llm import DEFAULT_MODEL, GeminiLLMClient, get_default_llm_client


def generate_content(prompt: str, model: str = DEFAULT_MODEL) -> str:
    client = get_default_llm_client()
    return client.generate_text(prompt, model=model)