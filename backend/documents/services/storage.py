from django.conf import settings

from core.storage import get_s3_client


def fetch_document_file_bytes(file_key: str) -> bytes:
    s3 = get_s3_client()
    response = s3.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_key)
    return response["Body"].read()
