# Backend

This folder contains the Django REST Framework backend for the EdTech AI platform.

## Docker

A development Dockerfile is provided at [Dockerfile](Dockerfile).

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

## Notes

- Use `docker compose up -d` to run PostgreSQL and MinIO locally.
- The backend currently uses host port `5433` for PostgreSQL to avoid conflicts with a local database already using `5432`.
- If you need Python bytecode compilation logs specifically, the Dockerfile already runs `python -m compileall -q .` during the image build step.
