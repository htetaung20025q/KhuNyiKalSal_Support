---
trigger: always_on
description: Production-grade coding standards and architectural discipline across all languages and frameworks.
---

# Enterprise Production Code Standards

When writing, refactoring, or generating code, always adhere to these production standards:

## 1. Modern LTS Language & Framework Defaults
- **Python 3.12+**: Use PEP 604 type unions (`int | None`), typed dictionary models, `asyncio` lifespan handlers, and structured logging (`structlog`).
- **FastAPI 0.111+**: Typed response models (`response_model=...`), strict status codes, centralized exception handlers, async dependencies.
- **PostgreSQL 16+ & SQLAlchemy 2.0+**: Full async (`AsyncSession`), explicit `select()`, typed `Mapped[...]`, indexed foreign keys.
- **Redis 7.2+**: Redis Streams consumer groups, expiration TTL on cache entries, idempotent message ACKs.
- **React 18.3+ / 19.x & Vite**: Functional components with hooks, strict prop types / TypeScript, Tailwind CSS / modern CSS variables.
- **Flutter 3.22+**: Material 3 theming, Riverpod / Bloc state management, offline-first SQLite synchronization.

## 2. Layered Architecture Separation
Ensure strict separation of concerns across layers:
- **API / Controller Layer**: Validates request parameters and headers, delegates business logic to services, formats responses.
- **Service Layer**: Pure business logic, transaction boundaries, orchestration, caching, domain rules.
- **Repository / Data Access Layer**: Database queries, ORM mapping, atomic transactional operations with explicit row locking (`SELECT FOR UPDATE`) where concurrency demands.
- **Model / Entity Layer**: Data validation, schemas, immutable DTOs.

## 3. Resilience & Defensive Programming
- Never swallow exceptions silently. Log with structured context (`user_id`, `request_id`, `trace_id`).
- Always implement timeouts on external network requests, database connections, and cache queries.
- Ensure idempotent execution for transactional workflows using UUID idempotency keys.
