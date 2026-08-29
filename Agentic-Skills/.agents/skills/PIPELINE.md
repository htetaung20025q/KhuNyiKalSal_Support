# AI Software Engineering Operating System (SDLC OS v2)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                 AI SOFTWARE ENGINEERING OPERATING SYSTEM (SDLC OS v2)                                                  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

                                             ┌──────────────────────────────────────────────┐
                                             │        SDLC CONTROL PLANE (BRAIN)            │
                                             │  - Phase Routing Engine                      │
                                             │  - State Tracker (Artifact System)           │
                                             │  - Validation & Retry Engine                 │
                                             │  - Rollback Manager                          │
                                             └──────────────────────────────────────────────┘
                                                               │
                                                               ▼

  [ /brainstorm ] → [ /analyze ] → [ /proj-init ] → [ /ui-ux ] → [ /design ] → [ /plan ] → [ /build ] → [ /test ] → [ /debug ] → [ /publish ]
       │                │               │              │             │             │            │           │            │             │
       ▼                ▼               ▼              ▼             ▼             ▼            ▼           ▼            ▼             ▼

  Solution        Requirement     Product Scope  UI/UX ProMax  System Design Execution Plan Code Engine QA / SRE     Self-Healing  Universal
  Architect       Analyst         Manager        Architect     Architect     Manager        Engineer    Validator    SRE Agent     DevOps
```

---

## ⚡ Modern Production Tech Stack Standards (Latest Versions)

All skills across SDLC OS v2 are configured to default to current enterprise LTS and stable releases:

| Layer | Recommended Technology | Current Stable / LTS Version | Modern Features Utilized |
| :--- | :--- | :---: | :--- |
| **Backend Runtime** | **Python** | `3.12+` | `int \| None` union typing, optimized asyncio event loop, `structlog`. |
| **Web Framework** | **FastAPI** | `0.111+` | Async lifespan handlers, dependency injection, automatic OpenAPI 3.1. |
| **Data Validation** | **Pydantic** | `v2.7+` | Rust-backed `core`, `model_validator`, `ConfigDict(from_attributes=True)`. |
| **Database ORM** | **SQLAlchemy** | `2.0+` | Full async `AsyncSession`, `select()`, typed `Mapped[...]` & `mapped_column`. |
| **Primary Database** | **PostgreSQL** | `16.x` | Logical replication, PostGIS 3.4, sub-millisecond B-Tree seeks, `SELECT FOR UPDATE`. |
| **In-Memory Cache** | **Redis** | `7.2+` | Redis Streams consumer groups, spatial Redis Geo, persistent AOF/RDB. |
| **Mobile Frontend** | **Flutter / Dart** | `3.22+` / `3.4+` | Material 3 themes, Riverpod 2.5+, offline SQLite (`sqflite`) / Hive sync. |
| **Web Frontend** | **Next.js / React** | `14+` / `18.3` | App Router, Server Actions, TypeScript 5.4+, Vanilla CSS / Tailwind 3.4+. |
| **Test Automation** | **Pytest / httpx** | `8.2+` / `0.27+` | `pytest-asyncio` auto mode, `respx`, parallel 50-worker stress testing. |
| **Containers & Cloud**| **Docker / Nginx** | `27+` / `1.26+` | Multi-stage `python:3.12-slim`, non-root user, HTTP/2, TLS 1.3, Kubernetes 1.30+. |

---

## 1. Complete 10-Stage SDLC Skill Lifecycle

| Phase | Slash Command | Primary Skill File | Persona & Responsibilities |
| :---: | :--- | :--- | :--- |
| **0** | `/brainstorm` | [brainstorm/SKILL.md](./brainstorm/SKILL.md) | **Solution Architect**: Explores 3 distinct architectural options (MVP, Scalable, Advanced) & Big-O trade-offs. |
| **1** | `/analyze` | [analyze/SKILL.md](./analyze/SKILL.md) | **Requirement Analyst**: Extracts hidden technical complexity, classifies system type, models domain entities & data flow. |
| **2** | `/proj-init` | [proj-init/SKILL.md](./proj-init/SKILL.md) | **Product Scope Manager**: Defines lean MVP boundaries, user personas, standard user stories, and prioritized backlog. |
| **3** | `/ui-ux` | [ui-ux-promax/SKILL.md](./ui-ux-promax/SKILL.md) | **UI/UX ProMax Architect**: Designs world-class design systems, glassmorphic themes, micro-animations, 5-state resilience & WCAG AAA accessibility. |
| **4** | `/design` | [system-design/SKILL.md](./system-design/SKILL.md) | **System Design Architect**: Produces PostgreSQL DDL schemas, API contracts, in-memory stream buffers, and circuit breakers. |
| **5** | `/plan` | [plan/SKILL.md](./plan/SKILL.md) | **Execution Plan Manager**: Decomposes blueprints into atomic tasks (< 2 days), effort matrix, and Directed Acyclic Graph (DAG). |
| **6** | `/build` | [code-generation/SKILL.md](./code-generation/SKILL.md) | **Code Engine Engineer**: Implements clean, scalable, layered production code (API/Service/Repo/Models) along the DAG path. |
| **7** | `/test` | [test/SKILL.md](./test/SKILL.md) | **QA & Reliability Validator**: Generates and executes unit, integration, concurrency (50+ workers), negative, and chaos tests. |
| **8** | `/debug` | [auto-debug/SKILL.md](./auto-debug/SKILL.md) | **Self-Healing SRE Agent**: Performs Root Cause Analysis (RCA) and applies minimal targeted patches with zero redesign. |
| **9** | `/publish` | [publish/SKILL.md](./publish/SKILL.md) | **Universal DevOps Generator**: Generates cloud manifests across Railway, Docker, Render, VPS (Ubuntu/Nginx), AWS, and Kubernetes. |

---

## 2. End-to-End Command Cheat Sheet

```bash
# Phase 0: Solution Exploration
/brainstorm --project-name FleetTracker --problem "Real-time delivery location tracking for 10k drivers" --domain distributed

# Phase 1: Deep Requirement Analysis
/analyze --project-name FleetTracker --input "Build a scalable real-time fleet telemetry ingest and tracking service using Redis Streams, FastAPI, and PostgreSQL with offline-first mobile sync"

# Phase 2: Agile Scoping & Backlog Generation
/proj-init --project-name FleetTracker --type backend --stack "fastapi, redis, flutter" --constraints "offline-first, low-bandwidth"

# Phase 3: UI/UX ProMax Design System
/ui-ux --project-name FleetTracker --platform fullstack --theme dark --constraints "offline-first, touch-friendly"

# Phase 4: Production System Design
/design --project-name FleetTracker --type distributed --scale large --latency-target "<100ms"

# Phase 5: Sprint Planning & DAG Task Decomposition
/plan --project-name FleetTracker --backlog "Item catalog, telemetry adjustments, alerts" --team-size 2

# Phase 6: Production Code Generation
/build --project-name FleetTracker --task "T-02: Implement atomic stock adjustment service with row locking"

# Phase 7: Production QA & Concurrency Validation
/test --project-name FleetTracker --target "app/services/stock_service.py" --type concurrency --concurrency 50

# Phase 8: Auto Debugging & Self-Healing
/debug --file "app/services/stock_service.py" --error "IntegrityError: duplicate key value violates unique constraint"

# Phase 9: Multi-Platform Deployment & DevOps Publishing
/publish --platform railway --project-name "FleetTracker" --port 8000 --db "postgresql, redis"
```
