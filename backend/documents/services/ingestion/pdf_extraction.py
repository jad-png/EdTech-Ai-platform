import io

from pypdf import PdfReader


def load_pdf_reader(file_bytes: bytes):
    return PdfReader(io.BytesIO(file_bytes))
