from typing import List, Dict, Any
from pgvector.django import CosineDistance
from ...models import DocumentChunk
from ..ingestion.embeddings import get_embedding_model

def search_similar_chunks(document_id: str, query_text: str = None, top_k: int = 5,) -> List[Dict[str, Any]]:
    """
    Internal vector search logic using pgvector.
    Returns plain Python dictionaries to avoid leaking Django ORM models across domains.
    """
    model = get_embedding_model()
    search_prompt = (
        query_text
        if query_text
        else "Main concepts, summary, key takeaways, and definitions"
    ) 
    
    query_vector = model.encode(search_prompt).tolist()
    
    chunks = (
        DocumentChunk.objects.filter(document_id=document_id)
        .annotate(distance=CosineDistance("embedding", query_vector))
        .order_by("distance")[:top_k]
    )
    
    return [
        {
            "id": str(chunk.id),
            "content": chunk.content,
            "page_number": chunk.page_number,
            "chunk_index": chunk.chunk_index,
            "score": float(chunk.distance),
        }
        for chunk in chunks
    ]
    
def get_relevant_context(
    document_id: str,
    query_text: str = None,
    top_k: int = 5,
) -> str:
    """
    High-level context retriever.
    Converts retrieved vector chunks into a unified string context block
    ready for LLM prompt injection.
    """
    chunks = search_similar_chunks(
        document_id=document_id, query_text=query_text, top_k=top_k
    )
    if not chunks:
        return ""

    return "\n\n".join([chunk["content"] for chunk in chunks])
    
    