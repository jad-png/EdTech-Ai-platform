# EdTech AI Platform

EdTech AI Platform is a backend-first AI learning system for ingesting educational documents, generating quizzes from their content, and tracking learner performance. The current backend already supports the main workflow from document upload to quiz generation and assessment.

## What is implemented

The project currently includes:

- JWT-based authentication with user registration and profile endpoints
- Role-aware user accounts for learners and administrators
- Document upload and storage through MinIO
- PDF extraction, chunking, embedding generation, and semantic retrieval with pgvector
- AI-generated quizzes based on document context
- CrewAI orchestration for Chat/RAG responses and quiz generation
- Quiz attempt creation, answer submission, automatic grading, and learning analytics
- Docker-based local infrastructure for PostgreSQL and MinIO

## Tech stack

- Python and Django
- Django REST Framework
- djangorestframework-simplejwt
- PostgreSQL with pgvector
- MinIO for object storage
- Docker Compose for local services
- CrewAI with a shared Gemini-backed LLM abstraction

## Project structure

- [backend/](backend) contains the Django project and service configuration
- [backend/core/](backend/core) contains settings, routing, and shared storage helpers
- [backend/users/](backend/users) handles authentication and user profile APIs
- [backend/documents/](backend/documents) handles document upload, PDF processing, and retrieval
- [backend/quizzes/](backend/quizzes) handles quiz generation, persistence, submission, grading, and analytics
- [backend/chat/](backend/chat) handles conversations and Chat/RAG responses
- [backend/agents/](backend/agents) contains CrewAI orchestration, task definitions, and thin tool adapters
- [backend/shared/](backend/shared) contains reusable LLM, memory, and retrieval infrastructure

## Main API endpoints

- Authentication: `/api/auth/token/`, `/api/auth/token/refresh/`
- Users: `/api/users/register/`, `/api/users/me/`
- Documents: `/api/documents/`, `/api/documents/<uuid>/`
- Quizzes: `/api/quizzes/`, `/api/quizzes/generate/`, `/api/quizzes/<uuid>/start/`, `/api/quizzes/attempts/<uuid>/submit/`, `/api/quizzes/analytics/`
- Chat: `/api/chat/`, `/api/chat/<conversation_id>/messages/`

## CrewAI workflows

`agents/crew/edtech_crew.py` exposes explicit workflows through `run_edtech_crew()`:

- `chat`: shared retrieval → Pedagogical Agent → shared LLM → answer and sources
- `quiz_generation`: shared retrieval → Generator Agent → shared LLM → generated quiz JSON and sources

Retrieval remains owned by `shared/retrieval/`, LLM access remains behind `shared/llm/`, and quiz persistence remains in `quizzes/services/generator.py`.

## Quick start

1. Enter the backend folder: `cd backend`
2. Create and activate a Python virtual environment
3. Install dependencies: `pip install -r requirements.txt`
4. Copy [backend/.env.example](backend/.env.example) to [backend/.env](backend/.env) and adjust the values as needed
5. Start the services: `docker compose up -d`
6. Run migrations: `python manage.py migrate`
7. Start the development server: `python manage.py runserver 0.0.0.0:8000`

## Services

- PostgreSQL runs on port `5433` in this workspace to avoid a local conflict with port `5432`
- MinIO serves the object storage API on port `9000` and the console on port `9001`

## Status

The project is now beyond the initial scaffold and supports a working backend flow for document ingestion, semantic retrieval, and AI-assisted quiz creation and evaluation.
