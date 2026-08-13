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
    *, user, document_id: str | None, content: str, history: str
) -> dict[str, Any]:
    """Run the first Chat -> RAG -> pedagogical CrewAI vertical slice."""
    from crewai import Agent, Crew, Process, Task

    from agents.tools import build_retrieval_tool

    retrieval_tool, sources = build_retrieval_tool(document_id, user)
    retrieved_context = retrieval_tool.run(query_text=content)
    llm = _build_shared_llm()

    pedagogical_agent = Agent(
        role="Pedagogical Agent",
        goal="Write a clear, concise, educational answer using history and retrieved context.",
        backstory="You explain concepts accurately and transparently when context is missing.",
        llm=llm,
        allow_delegation=False,
        verbose=False,
    )

    answer_task = Task(
        description=(
            "Generate the final educational answer for {request}.\n"
            "Conversation history:\n{history}\n"
            "Retrieved context:\n{retrieved_context}\n"
            "Answer only the user."
        ),
        expected_output="The final educational answer.",
        agent=pedagogical_agent,
    )

    result = Crew(
        agents=[pedagogical_agent],
        tasks=[answer_task],
        process=Process.sequential,
        verbose=False,
    ).kickoff(
        inputs={
            "request": content,
            "history": history or "(No previous messages)",
            "retrieved_context": retrieved_context,
        }
    )

    return {"answer": result.raw, "sources": sources}
