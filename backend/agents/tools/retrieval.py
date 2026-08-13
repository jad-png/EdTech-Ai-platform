import json
from typing import Any

from crewai.tools import tool

from shared.retrieval import search_similar_chunks


def build_retrieval_tool(document_id: str | None, user) -> tuple[Any, list[dict[str, Any]]]:
    """Create the smallest CrewAI wrapper around the existing retrieval service."""
    sources: list[dict[str, Any]] = []

    @tool("search_similar_chunks")
    def search_tool(query_text: str) -> str:
        """Search the current conversation document for relevant chunks."""
        if not document_id:
            sources.clear()
            return "No document context is available."

        sources[:] = search_similar_chunks(
            document_id=document_id,
            query_text=query_text,
            top_k=5,
            user=user,
        )
        return json.dumps(
            [{"content": source["content"], "metadata": source} for source in sources],
            ensure_ascii=False,
        )

    return search_tool, sources
