---
name: agile-plan-engineering
description: >-
  Phase 5 of the SDLC Pipeline. Transforms a project backlog and system design into an engineering-grade sprint execution plan
  incorporating atomic task decomposition, dependency mapping, Low/Medium/High effort estimation, performance bottlenecks,
  scalability risks, resource allocation, and environment constraints for latest tech stacks
  (Python 3.12, FastAPI 0.111+, PostgreSQL 16, Redis 7.2+, Flutter 3.22+, Next.js 14+).
  Ingests design blueprints from `/design` (Phase 4) and UI layouts from `/ui-ux` (Phase 3). Triggered via `/plan` or natural language.
---

# Agile Project Planning with Engineering Principles

## SDLC Pipeline Integration
This skill represents **Phase 5 (Engineering Sprint Execution Planning)** in the 10-phase engineering pipeline:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Integration:**
  - **From [Phase 2: `/proj-init`](../proj-init/SKILL.md) & [Phase 3: `/ui-ux`](../ui-ux-promax/SKILL.md):** Ingests prioritized backlog, user stories, and UI wireframes.
  - **From [Phase 4: `/design`](../system-design/SKILL.md):** Ingests the technical design blueprint (PostgreSQL 16 DDL, API contracts, Big-O algorithm choices, and worker queues) to decompose concrete, actionable engineering tasks.
- **Downstream Handoff (to [Phase 6: `/build`](../code-generation/SKILL.md)):** Delivers atomic, estimated developer tasks with 100% acyclic DAG sequences.

---

## When to Use
- When planning execution sprints for an established product backlog.
- When the user runs the `/plan` command.
- When transitioning from product requirements (PRDs/User Stories) to concrete engineering tasks.
- When evaluating architectural dependencies, performance bottlenecks, and resource constraints before starting a development cycle.

---

## Command Format
```bash
/plan --project-name <name> [options]
```

### Supported Flags & Parameters
- `--project-name <string>` (**Required**): Name of the project or subsystem.
- `--backlog <string|file>` (**Required**): Raw feature list, user stories, or backlog file path (typically from [`/proj-init`](../proj-init/SKILL.md)).
- `--sprint-duration <duration>` (Optional, default: `2 weeks`): Length of each sprint cycle.
- `--team-size <number>` (Optional, default: `2-3 engineers`): Number of active software engineers.
- `--constraints <string>` (Optional, default: `standard web/mobile`): Infrastructure, network, or latency constraints (e.g., `low-bandwidth`, `offline-first`, `high-throughput`).

---

## Inputs
- **`project_name`** (string, required): Identifier for the system under development.
- **`backlog`** (list/text, required): Product backlog items or feature specifications to decompose.
- **`sprint_duration`** (string, optional): Sprint cadence (e.g., 1 week, 2 weeks).
- **`team_size`** (integer, optional): Available engineering headcount for capacity planning.
- **`constraints`** (string, optional): Environmental, hardware, or network operating constraints.

---

## Outputs
- **Architecture Notes**: Concrete decisions covering backend, frontend, database, and API design (synthesized from `/design`).
- **Task Breakdown & Decomposition**: Atomic, developer-executable engineering tasks.
- **Effort Estimation**: Low / Medium / High classifications based on technical complexity and risk.
- **Dependency Graph**: Explicit directional mapping of blocking tasks (`Task B -> Task A`).
- **Sprint Plan**: Sequenced sprint tables (Sprint 1, Sprint 2) with assigned owners and dependencies.
- **Performance & Scalability Considerations**: Identified bottlenecks, indexing strategies, caching, and risk mitigations.
- **Timeline & Milestones**: Checkpoint deliverables tied to sprint completion dates.

---

## Required Engineering Concepts

1. **System Design Awareness**
   - Enforce clean separation between API boundary, business logic domain, and data access layers.
   - Design RESTful endpoints adhering to idempotent HTTP verbs (`GET`, `PUT`, `DELETE`) and predictable status codes.
   - Define concrete database entities, foreign keys, indexing strategies, and transactional boundaries.

2. **Atomic Task Decomposition**
   - Break epics down into fine-grained tasks that a single engineer can implement and verify in < 2 days.
   - Strictly prohibit vague placeholders (e.g., "Build system", "Implement backend", "Handle logic").
   - Every task must name the specific file, module, endpoint, schema, or UI component being modified.

3. **Effort Estimation Matrix**
   - **Low**: Straightforward CRUD endpoint, UI layout, unit test suite, or config change (0.5 – 1 day).
   - **Medium**: Multi-table database migration, state management workflow, third-party service integration (1 – 3 days).
   - **High**: Distributed state, concurrency/locking mechanisms, offline sync engines, security/auth primitives (> 3 days).

4. **Dependency Mapping & Graph Validation**
   - Enforce directed acyclic graph (DAG) execution order: Database Schema &rarr; Data Access Layer &rarr; API Route &rarr; Frontend Client &rarr; E2E Verification.
   - Highlight blocking paths to eliminate idle time during sprints.

5. **Scalability & Concurrency Considerations**
   - Identify write-heavy vs. read-heavy endpoints.
   - Specify optimistic locking or database row-level locking for stateful transactions.
   - Highlight data partitioning, connection pooling, and payload minimization strategies.

6. **Performance & Bottleneck Awareness**
   - Identify query N+1 hazards and require explicit SQL joins or prefetching.
   - Specify indexing requirements on foreign keys and frequently filtered columns.
   - Design lightweight payload schemas (omitting large blobs from list endpoints).

7. **Resource Allocation & Capacity Planning**
   - Balance task distribution according to `team_size` without creating single-point-of-failure dependencies on one developer.
   - Limit work-in-progress (WIP) per sprint to match realistic engineering velocity.

8. **Environment Constraints & Resilience**
   - Optimize for low-bandwidth, intermittent 2G/3G connectivity (Myanmar/emerging markets context).
   - Implement local SQLite/Hive caching, optimistic client updates, retry queues with exponential backoff, and compact JSON serialization.

---

## Steps

1. **Validate Backlog**: Ingest backlog items from [`/proj-init`](../proj-init/SKILL.md), check completeness, and resolve ambiguous requirements.
2. **Analyze System Components**: Cross-reference architecture decisions from [`/design`](../system-design/SKILL.md) (services, data stores, external APIs, UI layers).
3. **Break Features into Engineering Tasks**: Decompose each user story into atomic, testable engineering tasks.
4. **Estimate Effort**: Assign `Low`, `Medium`, or `High` complexity to each task based on technical risk.
5. **Map Dependencies**: Build the directional dependency graph (`Task Y depends on Task X`).
6. **Assign Tasks**: Distribute tasks across team roles (e.g., Backend Dev, Frontend Dev, Fullstack Dev).
7. **Create Sprint Plan**: Schedule tasks into Sprint 1 (Core Foundations + Critical Path) and Sprint 2 (Dependent Features + Polish).
8. **Define Architecture Considerations**: Document explicit stack, API contract guidelines, and DB schema rules.
9. **Identify Performance Risks**: Document bottlenecks, indexing mandates, and caching strategies.
10. **Generate Timeline & Milestones**: Establish target delivery milestones and validation checkpoints.

---

## Rules

- Must adhere to Agile SDLC principles while enforcing strict engineering rigor.
- Every task must have an exact description of *what* is built, *where* it lives, and *how* it is verified.
- Never allow cyclical or dangling dependencies.
- Ensure high-priority, blocking infrastructure tasks are placed in Sprint 1.
- Optimize all API and data models for small team maintainability and low-bandwidth resilience.
- Output must be clean, structured markdown matching the exact output template without conversational fluff.

---

## Output Template

```markdown
# Engineering Project Plan: [Project Name]

## 1. Project Overview
- **Project Name:** [Name]
- **Target Architecture:** [e.g., FastAPI REST Backend + Flutter Mobile Client + PostgreSQL]
- **Sprint Cadence:** [e.g., 2 Weeks]
- **Team Allocation:** [e.g., 1 Backend Engineer, 1 Frontend Engineer]
- **Operating Constraints:** [e.g., Low-bandwidth resilience, offline-first local cache]

---

## 2. Architecture Notes
- **Backend Service:** [Framework, architecture pattern, e.g., FastAPI with Clean Architecture / Repository Pattern]
- **Frontend Client:** [Framework, state management, e.g., Flutter with BLoC pattern]
- **Database & Persistence:** [Data store, ORM, migration tool, e.g., PostgreSQL 16, SQLAlchemy 2.0 Async, Alembic 1.13+]
- **API Design Standards:** [REST JSON standard, authentication scheme, pagination type, error response format]

---

## 3. Sprint Plan

### Sprint 1: Foundation & Core Transactional Path
| ID | Task Description | Effort | Owner | Dependency |
|:---|:-----------------|:-------|:------|:-----------|
| T-01 | Setup DB schemas and Alembic migrations for core entities | Medium | Backend Eng | None |
| T-02 | Implement repository CRUD layer and atomic transaction logic | Medium | Backend Eng | T-01 |
| T-03 | Implement REST API endpoints with Pydantic validation schemas | Low | Backend Eng | T-02 |
| T-04 | Setup frontend local storage and API network client with retry logic | Medium | Frontend Eng | None |
| T-05 | Build primary UI view and integrate with API endpoints | Medium | Frontend Eng | T-03, T-04 |

### Sprint 2: Secondary Workflows, Optimization & Resiliency
| ID | Task Description | Effort | Owner | Dependency |
|:---|:-----------------|:-------|:------|:-----------|
| T-06 | Implement background worker queue for notifications / async jobs | High | Backend Eng | T-02 |
| T-07 | Implement offline mutation queue and local DB cache sync | High | Frontend Eng | T-04 |
| T-08 | Add composite DB indexes and optimize read queries | Low | Backend Eng | T-01, T-02 |
| T-09 | End-to-end integration testing and automated regression suite | Medium | Fullstack Eng | T-05, T-07 |

---

## 4. Dependency Graph
```text
[T-01: DB Schemas] ───────► [T-02: CRUD & Logic] ───────► [T-03: REST Endpoints] ───┐
                                      │                                              │
                                      └────────► [T-06: Async Worker]                ▼
[T-04: Network Client] ────────────────────────────────────────────────────────► [T-05: Primary UI View]
         │                                                                           │
         └────────► [T-07: Offline Sync] ────────────────────────────────────────────┴──► [T-09: E2E Integration]
```

- `T-02` (CRUD & Logic) requires `T-01` (DB Schema)
- `T-03` (API Endpoints) requires `T-02` (CRUD & Logic)
- `T-05` (Primary UI View) requires `T-03` (API Endpoints) and `T-04` (Network Client)
- `T-07` (Offline Sync) requires `T-04` (Network Client)
- `T-09` (E2E Integration) requires `T-05` and `T-07`

---

## 5. Performance Considerations
- **Potential Bottlenecks:**
  - High concurrency lock contention during bulk transaction updates.
  - Slow response times on list endpoints caused by unindexed foreign key lookups.
- **Optimization Strategy:**
  - Apply composite B-Tree indexes on `(tenant_id, status, created_at)` columns.
  - Implement keyset (cursor-based) pagination instead of `OFFSET / LIMIT` for large datasets.
  - Compress JSON payloads with Gzip/Brotli to reduce network transfer size over mobile connections.

---

## 6. Scalability & Resilience Notes
- **Components Likely to Scale:**
  - Read-heavy inventory query endpoints (target for Redis read-through caching).
  - Outbound notification and event dispatch services (target for Celery / Redis Streams).
- **Technical Risk Areas:**
  - Intermittent network disconnections causing duplicate client submissions &rarr; Mitigated using client-generated `Idempotency-Key` headers.
  - Database connection pool exhaustion under load &rarr; Mitigated via PgBouncer connection pooling.

---

## 7. Timeline & Milestones
- **Milestone 1 (End of Sprint 1):** Core transactional API and primary UI view fully integrated with unit tests passing.
- **Milestone 2 (End of Sprint 2):** Offline mutation queue, background workers, and automated end-to-end test suite complete.
```

---

## Example Execution

### Invocation Command
```bash
/plan --project-name "Logistic Inventory System" --backlog "Item catalog, stock adjustment transactions, low-stock alerts, warehouse dispatch logging" --team-size 2 --constraints "low-bandwidth mobile warehouse terminals"
```

### Generated Output

# Engineering Project Plan: Logistic Inventory System

## 1. Project Overview
- **Project Name:** Logistic Inventory System
- **Target Architecture:** FastAPI (Python 3.12+) + PostgreSQL 16 + Flutter 3.22+ Mobile Terminal (Android)
- **Sprint Cadence:** 2 Weeks per Sprint
- **Team Allocation:** 1 Backend Engineer, 1 Mobile/Frontend Engineer
- **Operating Constraints:** Low-bandwidth 3G network in warehouse facilities; offline-first barcode scan queueing.

---

## 2. Architecture Notes
- **Backend Architecture:** FastAPI with asynchronous SQLAlchemy 2.0 using the Repository & Unit-of-Work pattern for atomic transaction isolation.
- **Frontend Architecture:** Flutter with BLoC state management and local Hive Key-Value database for offline operation buffering.
- **Database & Persistence:** PostgreSQL 16 with strict foreign key constraints, `SELECT ... FOR UPDATE` row-level locking on inventory increments/decrements, and Alembic 1.13+ migrations.
- **API Design Standards:** RESTful JSON endpoints; standard envelope with `data`, `error`, and `meta` fields; cursor pagination (`?cursor=...&limit=50`); `Idempotency-Key` header enforcement on `POST /api/v1/inventory/adjustments`.

---

## 3. Sprint Plan

### Sprint 1: Foundation & Core Stock Adjustment Engine
| ID | Task Description | Effort | Owner | Dependency |
|:---|:-----------------|:-------|:------|:-----------|
| T-01 | Create PostgreSQL schema for `items`, `warehouses`, and `stock_levels` with unique composite index on `(warehouse_id, item_sku)` | Low | Backend Eng | None |
| T-02 | Implement atomic stock adjustment service with `SELECT FOR UPDATE` pessimistic concurrency control in SQLAlchemy | Medium | Backend Eng | T-01 |
| T-03 | Build REST API endpoints `POST /api/v1/inventory/adjustments` and `GET /api/v1/items/{sku}/stock` with Pydantic v2 schemas | Low | Backend Eng | T-02 |
| T-04 | Setup Flutter client project with Dio HTTP client, offline Hive cache store, and global error interceptor | Medium | Mobile Eng | None |
| T-05 | Implement barcode scanner screen in Flutter with immediate local optimistic count update and background HTTP dispatch | Medium | Mobile Eng | T-03, T-04 |

### Sprint 2: Alerts, Offline Queue & Dispatch Tracking
| ID | Task Description | Effort | Owner | Dependency |
|:---|:-----------------|:-------|:------|:-----------|
| T-06 | Implement scheduled low-stock threshold evaluator and webhook notification service | Medium | Backend Eng | T-02 |
| T-07 | Implement persistent offline mutation sync manager in Flutter to retry failed requests on network reconnection | High | Mobile Eng | T-04 |
| T-08 | Add database partial indexes on `stock_levels WHERE quantity <= min_threshold` to accelerate alert queries | Low | Backend Eng | T-01 |
| T-09 | End-to-end integration test suite simulating 50 concurrent adjustments on a single SKU to verify zero stock divergence | Medium | Backend Eng | T-02, T-03 |

---

## 4. Dependency Graph
```text
[T-01: DB Schemas & Indexes] ──► [T-02: Atomic Adjustment Logic] ──► [T-03: Stock REST API] ──┐
                                            │                                                  │
                                            ├───────────────────► [T-06: Alert Evaluator]      ▼
[T-04: Flutter Dio & Hive] ─────────────────────────────────────────────────────────────► [T-05: Scanner UI & Sync]
         │                                                                                     │
         └────────► [T-07: Offline Sync Manager] ──────────────────────────────────────────────┴──► [T-09: Concurrency Test Suite]
```

- `T-02` (Atomic Adjustment Logic) blocks `T-03` (API Endpoints) and `T-06` (Alert Evaluator).
- `T-03` (Stock REST API) and `T-04` (Flutter Client Setup) block `T-05` (Scanner UI).
- `T-07` (Offline Sync Manager) depends on `T-04` (Flutter Client Setup).
- `T-09` (Concurrency Verification) depends on `T-02`, `T-03`, and `T-05`.

---

## 5. Performance Considerations
- **Potential Bottlenecks:**
  - Row locking contention when multiple warehouse workers adjust the same SKU simultaneously.
  - Network timeout and packet retransmission over degraded 3G warehouse Wi-Fi.
- **Optimization Strategy:**
  - Use short-lived transactions (< 50ms) for row locks; calculate deltas in memory prior to opening the DB transaction.
  - Implement Gzip response compression and strip verbose metadata from mobile payloads to keep payload size < 2KB per request.
  - Place a composite index on `stock_movements (item_id, created_at DESC)` for sub-millisecond stock ledger lookups.

---

## 6. Scalability & Resilience Notes
- **Components Likely to Scale:**
  - Stock query endpoints during peak warehouse intake hours (scale via PostgreSQL read replicas).
  - Offline mutation queue ingestion during shift handovers.
- **Technical Risk Areas:**
  - Duplicate adjustments submitted when network drops midway through request &rarr; Mitigated via client-generated UUID `Idempotency-Key` stored in Redis with a 24-hour TTL.
  - Data drift between mobile local cache and PostgreSQL master &rarr; Mitigated via version vectors (`version_id`) on all inventory records.

---

## 7. Timeline & Milestones
- **Milestone 1 (End of Sprint 1):** Verified atomic stock adjustment API with row locking; functional mobile scanning terminal updating live stock over HTTP.
- **Milestone 2 (End of Sprint 2):** Resilient offline sync manager verified under simulated airplane mode; low-stock automated alerts operating; concurrency test suite passing with 0 race conditions.
