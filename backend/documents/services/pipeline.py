import logging

from ..models import Document, DocumentChunk
from .chunking import chunk_text
from .embeddings import get_embedding_model
from .pdf_extraction import load_pdf_reader
from .storage import fetch_document_file_bytes


logger = logging.getLogger(__name__)


def process_document_pipeline(document_id: str):
    """Pipeline: Fetch from MinIO -> Extract Text -> Chunk -> Generate Embeddings -> Save to PostgreSQL (pgvector)"""
    doc = None
    try:
        doc = Document.objects.get(id=document_id)
        doc.status = Document.Status.PROCESSING
        doc.save(update_fields=["status"])

        file_bytes = fetch_document_file_bytes(doc.file_key)
        reader = load_pdf_reader(file_bytes)

        doc.page_count = len(reader.pages)
        doc.save(update_fields=["page_count"])

        doc.chunks.all().delete()

        model = get_embedding_model()
        chunk_counter = 0
        chunks_to_create = []

        for page_num, page in enumerate(reader.pages, start=1):
            page_text = page.extract_text() or ""
            chunks = chunk_text(page_text)

            for chunk in chunks:
                embedding_vector = model.encode(chunk).tolist()

                chunks_to_create.append(
                    DocumentChunk(
                        document=doc,
                        content=chunk,
                        page_number=page_num,
                        chunk_index=chunk_counter,
                        embedding=embedding_vector,
                    )
                )
                chunk_counter += 1

        if chunks_to_create:
            DocumentChunk.objects.bulk_create(chunks_to_create)

        doc.status = Document.Status.READY
        doc.save(update_fields=["status"])

    except Exception as e:
        logger.exception("Document processing failed for document_id=%s", document_id)
        if doc is not None:
            doc.status = Document.Status.FAILED
            doc.error_message = str(e)
            doc.save(update_fields=["status", "error_message"])
        raise
