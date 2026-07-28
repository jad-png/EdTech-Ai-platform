# EdTech AI Platform

Backend-first EdTech platform for AI-assisted learning, content processing, and assessment workflows. The current repository state is an initial backend scaffold focused on Django REST Framework, JWT authentication, CrewAI orchestration, PostgreSQL with pgvector, and MinIO-backed object storage.

## What I am building

This project is being set up as an AI-powered education backend that will eventually support:

- document ingestion and storage for learning materials,
- quiz generation and assessment flows,
- user authentication and role-based access,
- CrewAI-driven agent workflows for education automation,
- vector-enabled storage for retrieval and future AI search features.

## Current scope

At the moment, the repository contains the backend foundation only. The codebase is structured so the next implementation steps can focus on API logic, domain models, and AI workflows without reworking the infrastructure layer.

## Backend stack

- Python and Django
- Django REST Framework
- djangorestframework-simplejwt for JWT auth
- CrewAI and crewai-tools for multi-agent orchestration
- PostgreSQL with pgvector
- MinIO for local S3-compatible object storage
- Docker Compose for local infrastructure

## Project layout

- [backend/](backend) contains the Django project and service configuration.
- [backend/core/](backend/core) contains the Django settings, URL routing, and storage helper.
- [backend/users/](backend/users) is reserved for authentication and user-facing API endpoints.
- [backend/documents/](backend/documents) is reserved for file ingestion and document workflows.
- [backend/quizzes/](backend/quizzes) is reserved for quiz generation and evaluation workflows.
- [backend/agents/](backend/agents) contains CrewAI bootstrap and future agent/task/tool modules.

## Local development

The backend is intended to run on the host machine while PostgreSQL and MinIO run in Docker.

1. Create and activate the Python virtual environment inside [backend/](backend).
2. Install dependencies from [backend/requirements.txt](backend/requirements.txt).
3. Copy [backend/.env.example](backend/.env.example) to [backend/.env](backend/.env) and adjust values if needed.
4. Start infrastructure with `docker compose up -d` from [backend/](backend).
5. Run migrations with `python manage.py migrate` from [backend/](backend).
6. Start the dev server with `python manage.py runserver 0.0.0.0:8000` from [backend/](backend).

## Services

- PostgreSQL listens on host port 5433 in this workspace because 5432 was already in use locally.
- MinIO serves the object storage API on port 9000 and the web console on port 9001.

## Environment

The backend configuration is driven by environment variables for Django, Postgres, MinIO, JWT timing, and LLM provider keys. See [backend/.env.example](backend/.env.example) for the complete list.

## Roadmap

- Add API endpoints for user registration and login.
- Implement document upload and retrieval flows.
- Build quiz creation and grading endpoints.
- Add CrewAI agents for tutoring, content generation, and workflow automation.
- Introduce tests and deployment-ready settings splits once core behavior is in place.

## Status

The project is in early backend initialization. Infrastructure and baseline Django configuration are in place, and the next work will be core application logic.
