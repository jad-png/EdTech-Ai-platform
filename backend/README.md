# Backend

This folder contains the Django REST Framework backend for the EdTech AI platform.

## Implemented features

The backend currently supports:

- JWT authentication with token issuance and refresh
- User registration and profile management
- Document upload to MinIO and storage metadata retrieval
- PDF extraction, chunking, embedding generation, and pgvector-backed retrieval
- AI quiz generation from document context
- Quiz attempt submission, automatic grading, and learning analytics

## Docker

A development Dockerfile is provided at [Dockerfile](Dockerfile).

When the backend container starts, it waits for PostgreSQL, runs Django migrations, and then launches the server. A fresh database volume created after `docker compose down -v` will be initialized automatically on the next start.

### Build

```bash
cd backend
docker build -t edtech-backend .
```

### Run

```bash
cd backend
docker run --rm -it -p 8000:8000 --env-file .env edtech-backend
```

This starts Django on `0.0.0.0:8000` and prints server logs directly to the container output.

## Development notes

- Use `docker compose up -d` to run PostgreSQL and MinIO locally.
- PostgreSQL listens on host port `5433` in this workspace to avoid conflicts with a local database already using `5432`.
- MinIO exposes the API on port `9000` and the web console on port `9001`.
- The Docker image also runs `python -m compileall -q .` during the build step.
