from __future__ import annotations

from typing import Any

from shared.llm import get_default_llm_client


def _build_shared_llm():
    from crewai.llms.base_llm import BaseLLM
    from pydantic import PrivateAttr

    class SharedLLM(BaseLLM):
        """CrewAI adapter that delegates generation to shared.llm."""

        llm_type: str = "shared"
        _client: Any = PrivateAttr()

        def __init__(self, client=None, **kwargs):
            super().__init__(model="shared", provider="shared", **kwargs)
            self._client = client or get_default_llm_client()

        def call(self, messages, **kwargs) -> str:
            if isinstance(messages, str):
                prompt = messages
            else:
                prompt = "\n".join(
                    f"{message.get('role', 'user')}: {message.get('content', '')}"
                    for message in messages
                )
            return self._client.generate_text(prompt)

    return SharedLLM()


def run_edtech_crew(
    *,
    workflow: str = "chat",
    user,
    document_id: str | None,
    content: str,
    history: str = "",
    num_questions: int = 5,
    difficulty: str = "MEDIUM",
    topic: str | None = None,
) -> dict[str, Any]:
    if workflow not in {"chat", "quiz_generation"}:
        raise ValueError(f"Unsupported CrewAI workflow: {workflow}")

    from crewai import Agent, Crew, Process
    from agents.tools import build_retrieval_tool

    retrieval_tool, sources = build_retrieval_tool(document_id, user)
    retrieved_context = retrieval_tool.run(query_text=topic or content)
    llm = _build_shared_llm()

    
    if workflow == "chat":
        from agents.tasks.pedagogical import build_pedagogical_task

        agent = Agent(
            role="Pedagogical Agent",
            goal="Write a clear, concise, educational answer using history and retrieved context.",
            backstory="You explain concepts accurately and transparently when context is missing.",
            llm=llm,
            allow_delegation=False,
            verbose=False,
        )
        task = build_pedagogical_task(agent)
        inputs = {
            "request": content,
            "history": history or "(No previous messages)",
            "retrieved_context": retrieved_context,
        }
        result_key = "answer"
    else:
        from agents.tasks.generator import build_generator_task

        agent = Agent(
            role="Generator Agent",
            goal="Generate structured quiz content from retrieved educational context.",
            backstory="You generate valid quiz JSON without managing persistence or domain models.",
            llm=llm,
            allow_delegation=False,
            verbose=False,
        )
        task = build_generator_task(agent)
        inputs = {
            "retrieved_context": retrieved_context,
            "num_questions": num_questions,
            "difficulty": difficulty,
            "topic": topic or content,
        }
        result_key = "quiz"

    result = Crew(
        agents=[agent],
        tasks=[task],
        process=Process.sequential,
        verbose=False,
    ).kickoff(inputs=inputs)

    return {result_key: result.raw, "sources": sources}
