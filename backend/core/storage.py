import boto3
from django.conf import settings
from botocore.exceptions import BotoCoreError, ClientError

def get_s3_client():
    return boto3.client(
        "s3",
        endpoint_url=settings.AWS_S3_ENDPOINT_URL,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
        use_ssl=settings.AWS_S3_USE_SSL,
    )
    
def ensure_bucket_exists():
    s3_client = get_s3_client()
    bucket_name = settings.AWS_STORAGE_BUCKET_NAME
    try:
        s3_client.head_bucket(Bucket=bucket_name)
    except ClientError:
        s3_client.create_bucket(Bucket=bucket_name)

def upload_file_to_minio(file_obj, object_key: str) -> str:
    ensure_bucket_exists()
    s3_client = get_s3_client()
    s3_client.upload_fileobj(
        file_obj,
        settings.AWS_STORAGE_BUCKET_NAME,
        object_key,
        ExtraArgs={"ContentType": "application/pdf"},
    )
    return object_key

def delete_file_from_minio(object_key: str):
    s3_client = get_s3_client
    s3_client.delete_object(
        Bucket=settings.AWS_STORAGE_BUCKET_NAME, key=object_key
    )
    
def get_object_storage_client():
    """Return a boto3 S3 client configured for MinIO/local object storage."""
    return boto3.client(
        "s3",
        endpoint_url=settings.AWS_S3_ENDPOINT_URL,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
        use_ssl=settings.AWS_S3_USE_SSL,
    )
