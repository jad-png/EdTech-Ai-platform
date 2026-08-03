import io
import logging

from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from django.conf import settings
from core.storage import get_s3_client
from .models import Document, DocumentChunk

_embedding_model = None
logger = logging.getLogger(__name__)

def get_embedding_model():
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
    return _embedding_model


def chunk_text(text: str, chunk_size: int = 500, chunk_overlap: int = 50):
    chunks = []
    start = 0
    text_len = len(text)

    while start < text_len:
        end = start + chunk_size
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        start += chunk_size - chunk_overlap

    return chunks


def process_document_pipeline(document_id: str):
    """Pipeline: Fetch from MinIO -> Extract Text -> Chunk -> Generate Embeddings -> Save to PostgreSQL (pgvector)"""
    doc = None
    try:
        doc = Document.objects.get(id=document_id)
        doc.status = Document.Status.PROCESSING
        doc.save(update_fields=["status"])

        s3 = get_s3_client()
        response = s3.get_object(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=doc.file_key
        )
        file_bytes = response["Body"].read()

        pdf_file = io.BytesIO(file_bytes)
        reader = PdfReader(pdf_file)

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