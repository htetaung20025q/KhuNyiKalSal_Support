---
name: design
description: >-
  Phase 4 of the SDLC Pipeline. Generates production-grade system architecture blueprints, data structure and algorithm decisions,
  database schemas, API contracts, caching/scalability strategies, and fault-tolerance mechanics for software systems
  using latest tech stacks (Python 3.12, FastAPI 0.111+, PostgreSQL 16, Redis 7.2+, Flutter 3.22+, Next.js 14+).
  Ingests requirements from `/ui-ux` (Phase 3) and `/proj-init` (Phase 2) and feeds blueprints into `/plan` (Phase 5).
  Triggered via `/design` or natural language requests for system design and engineering blueprints.
---

# Production-Grade System Design & Engineering Planning

## SDLC Pipeline Integration
This skill represents **Phase 4 (Technical Architecture & Engineering Blueprinting)** in the 10-phase engineering pipeline:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Integration (from [Phase 2: `/proj-init`](../proj-init/SKILL.md) & [Phase 3: `/ui-ux`](../ui-ux-promax/SKILL.md)):** Ingests analyzed domain entities, data flows, UI component data requirements, MVP scope, and prioritized feature list.
- **Downstream Handoff (to [Phase 5: `/plan`](../plan/SKILL.md)):** Supplies the technical blueprint (PostgreSQL 16 DDL schemas, REST/Protobuf contracts, Redis 7.2 stream topologies, and worker pools) to be decomposed into atomic, estimated developer tasks with strict DAG dependencies.

---

## When to Use
- When designing a new system or subsystem from scratch before writing code.
- When the user runs the `/design` command.
- When architectural decisions (Monolith vs. Microservices, SQL vs. NoSQL, Sync vs. Async) need formal evaluation.
- When designing backend-heavy, real-time, high-concurrency, or distributed systems.
- When concrete algorithms, data structures, caching layers, and database schemas must be established.

---

## Command Format
```bash
/design --project-name <name> --type <system_type> [options]
```

### Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--project-name` / `--name` | `string` | **Yes** | Name of the system or subsystem. |
| `--type` | `enum` | **Yes** | System topology: `backend`, `distributed`, `mobile`, `ai`, `fullstack`. |
| `--scale` | `enum` | No | Expected workload: `small` (1k-10k DAU), `medium` (10k-100k DAU), `large` (100k-1M DAU), `enterprise` (>1M DAU). Default: `medium`. |
| `--constraints` | `string` | No | Hardware, network, or cost constraints (e.g., `low-bandwidth`, `offline-first`, `low-compute`, `<50ms-p99`). |
| `--tech-stack` | `string` | No | Preferred base frameworks (e.g., `FastAPI, Flutter, PostgreSQL, Redis`). Default: `FastAPI + PostgreSQL + Redis`. |
| `--latency-target` | `string` | No | Target Service Level Objective (e.g., `<200ms p95`, `<50ms p99`). |
| `--users-estimate` | `string` | No | Target concurrent or active user count. |

### Example Invocations
```bash
# Real-time backend tracking system
/design --project-name "FleetTracker" --type distributed --scale large --latency-target "<100ms" --constraints "low-bandwidth mobile telemetry"

# High-throughput transactional backend
/design --project-name "PaymentLedger" --type backend --scale enterprise --constraints "strict-acid, zero-loss"
```

---

## Required Engineering Concepts

1. **System Architecture Topology**
   - Justify architectural style (Modular Monolith, Event-Driven Architecture, Microservices, CQRS).
   - Enforce Layered Domain Architecture: `Controller/API Layer` &rarr; `Application/Service Layer` &rarr; `Domain Model` &rarr; `Repository/Data Access Layer`.
   - Separate ingestion pipelines (write paths) from analytical/query pipelines (read paths).

2. **Data Structures & Algorithms (Big-O Rigor)**
   - Select explicit data structures for stateful in-memory operations (e.g., Hash Tables, Sorted Sets / SkipLists, Ring Buffers, Trie, QuadTree / Geohash, Priority Queues).
   - State explicit computational complexity: Time Complexity ($O(1)$, $O(\log N)$, $O(N)$) and Space Complexity.
   - Design indexing and lookup algorithms to eliminate $O(N)$ table scans or hot-spot locks.

3. **Database & Storage Engineering**
   - Justify Relational (PostgreSQL/MySQL) vs. Document/NoSQL (MongoDB) vs. Key-Value/In-Memory (Redis) vs. Time-Series (TimescaleDB).
   - Design normalized schemas with foreign keys, composite B-Tree indexes, partial indexes, and partitioning keys.
   - Explicitly define transactional isolation levels (Read Committed, Repeatable Read, Serializable) and locking mechanics (`SELECT FOR UPDATE` vs. Optimistic Version Checks).

4. **API Design Standards**
   - RESTful conventions with semantic HTTP status codes (`200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500`).
   - Implement **Idempotency Keys** (`Idempotency-Key: <UUID>`) for non-idempotent state mutations (`POST`, `PATCH`).
   - Enforce Keyset / Cursor Pagination (`?cursor=<opaque_token>&limit=50`) over offset-based pagination to avoid deep-paging performance degradation.

5. **Scalability & Load Balancing**
   - Horizontal stateless service scaling behind Layer 7 Reverse Proxies (Nginx / Envoy / ALB).
   - Caching topology: Client-side HTTP caching &rarr; Edge CDN &rarr; Redis Read-Through / Cache-Aside &rarr; Database Read Replicas.
   - Database read/write splitting and horizontal sharding strategies.

6. **Performance & Latency Engineering**
   - CPU vs. I/O Bound optimization: Asynchronous non-blocking I/O (`asyncio`, Event Loops) for network calls.
   - Connection Pooling for databases (PgBouncer, SQLAlchemy pool size) and HTTP keep-alive connections.
   - Payload compression (Brotli/Gzip) and sparse field filtering (`?fields=id,name,status`).

7. **Reliability, Fault Tolerance & Resilience**
   - **Retry Mechanism**: Exponential backoff with full jitter to avoid the thundering herd problem.
   - **Circuit Breaker**: Open/Half-Open/Closed states with fast fallback on downstream dependency failures.
   - **Dead Letter Queues (DLQ)**: Quarantine malformed or unprocessable payloads after max retry attempts.

8. **Data Flow & Telemetry**
   - Trace end-to-end request lifecycle from ingress gateway to database write.
   - Asynchronous offloading for non-critical path operations (emails, webhooks, search indexing) via background task queues (Redis Streams, Celery, RabbitMQ).

---

## Execution Workflow

1. **Scope & SLA Framing**: Analyze system type, scale, constraints, latency targets, and throughput requirements.
2. **Architecture Topology Selection**: Select the appropriate system style and define component boundaries.
3. **Data Model & Schema Engineering**: Design relational tables/collections, foreign keys, and indexes.
4. **API Interface Specification**: Formulate REST/Event endpoints, request/response structures, and error codes.
5. **Algorithmic & Data Structure Selection**: Choose in-memory data structures and define Big-O complexity for core operations.
6. **Performance & Caching Strategy**: Map cache layers, async offloading points, and query optimizations.
7. **Scalability & Partitioning Plan**: Define horizontal scaling, read replicas, and sharding/partitioning thresholds.
8. **Reliability & Security Formulation**: Establish retry budgets, circuit breakers, idempotency, auth (JWT/OAuth2/RBAC), and encryption.
9. **Trade-off Analysis**: Document architectural compromises and explain *why* alternatives were rejected.
10. **Execution Tasks**: Break design into a sequenced 5-step engineering execution roadmap.
11. **Next Phase Recommendation**: Provide direct transition guidance to execute **Phase 5 ([`/plan`](../plan/SKILL.md))** to generate the engineering sprint task breakdown.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# System Design Blueprint: [Project Name]

## 1. Problem Definition
- **Core Problem:** [Concise statement of the business/technical problem]
- **System Objective:** [Target functional capabilities, throughput, and SLAs]
- **Target Metrics:** [Latency target e.g. p95 < 150ms, Availability target e.g. 99.9%, Scale target]

---

## 2. System Overview
- **High-Level Summary:** [2-3 sentence overview of the architecture and workflow]
- **Core Components:**
  - **Component A:** [Role and responsibility]
  - **Component B:** [Role and responsibility]

---

## 3. Architecture Design
- **Architectural Style:** [e.g., Event-Driven Modular Monolith / Microservices]
- **Component Breakdown:**
  - **Ingress / Gateway Layer:** [Reverse proxy, rate limiter, SSL termination]
  - **Application Service Layer:** [Domain services and business logic engines]
  - **Persistence & Caching Layer:** [Primary relational DB + Redis cache]
  - **Asynchronous Worker Layer:** [Message queue and consumer workers]

### Architecture Diagram
```text
[Client / Mobile / Web]
        │ (HTTPS / TLS 1.3)
        ▼
[Reverse Proxy / API Gateway (Nginx / Envoy)]
        │
        ├──► [Auth & Rate Limiting Filter]
        │
        ▼
[Application Service (FastAPI / Node)] ◄──► [Cache Layer (Redis)]
        │                                             │
        ├── (Sync Writes)                             ├── (Pub/Sub / Streams)
        ▼                                             ▼
[Primary Database (PostgreSQL)]              [Worker Queue (Celery / Kafka)]
        │ (Async Replication)                         │
        ▼                                             ▼
[Read Replica DB]                            [Background Consumers]
```

---

## 4. Data Model Design

### Entities & Relationships
- **Entity 1:** [Attributes and role]
- **Entity 2:** [Attributes and role]

### Database Schema (DDL / Structure)
```sql
CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    status VARCHAR(32) NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}',
    version_id INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing Strategy
CREATE INDEX idx_entities_tenant_status ON entities(tenant_id, status);
CREATE INDEX idx_entities_created_at_desc ON entities(created_at DESC);
```

---

## 5. API Design & Contracts

### Endpoints
- `POST /api/v1/resources`
  - **Headers:** `Idempotency-Key: <UUID>`, `Authorization: Bearer <JWT>`
  - **Payload:** `{ "field": "value" }`
  - **Response:** `201 Created` with entity envelope.
- `GET /api/v1/resources`
  - **Params:** `?cursor=<token>&limit=50&status=active`
  - **Response:** `200 OK` with items list and next cursor.
- `GET /api/v1/resources/{id}`
  - **Response:** `200 OK` (cached) or `404 Not Found`.

### API Principles & Constraints
- **Idempotency:** Enforced on all mutating operations via unique keys cached in Redis for 24h.
- **Pagination:** Keyset / cursor-based pagination using `(created_at, id)` tuple to guarantee stable $O(1)$ reads.
- **Error Standard:** RFC 7807 Problem Details envelope (`type`, `title`, `status`, `detail`, `instance`).

---

## 6. Algorithm & Data Structure Decisions

| Operation | Chosen Data Structure / Algorithm | Time Complexity | Space Complexity | Engineering Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **[Operation Name]** | [e.g., Redis Sorted Set (ZSET) / SkipList] | $O(\log N + M)$ | $O(N)$ | [Why this was selected over alternatives] |
| **[Operation Name]** | [e.g., Geohash Grid / QuadTree] | $O(1)$ lookup | $O(K \times N)$ | [Why this was selected over alternatives] |

---

## 7. Performance Strategy
- **Identified Bottlenecks:**
  - [Bottleneck 1 and mitigation]
  - [Bottleneck 2 and mitigation]
- **Caching Strategy:**
  - **Cache Pattern:** Cache-Aside with Write-Invalidate on mutation.
  - **TTL Policy:** Short TTL (60s) for volatile lists, long TTL (24h) for reference data.
- **Async Execution Points:**
  - Heavy compute, notifications, and analytics logging offloaded to background message broker.

---

## 8. Scalability Plan
- **Stateless Service Scaling:** Auto-scale API containers horizontally when CPU > 70% or active connections > 500.
- **Database Scaling:** Separate OLTP master for writes; route read queries to PostgreSQL Read Replicas via connection pooler.
- **Data Partitioning:** Partition historical ledger/log tables by range (`created_at` monthly partitions).

---

## 9. Reliability & Failure Handling
- **Retry Policy:** Max 3 retries with Exponential Backoff (`base_delay * 2^attempt + jitter`).
- **Circuit Breaker:** Trip circuit breaker when downstream failure rate exceeds 50% over a 10s rolling window.
- **Graceful Degradation:** Serve stale cached data or degraded response if secondary search/enrichment services fail.

---

## 10. Security & Compliance
- **Authentication & Identity:** Stateless JWT tokens signed with RS256; short-lived access token (15 min) + secure HttpOnly refresh token.
- **Authorization:** Role-Based Access Control (RBAC) enforced at the API Gateway / Middleware layer.
- **Data Protection:** TLS 1.3 in transit; AES-256 encryption at rest; sensitive fields masked in logs.

---

## 11. Technology Stack Recommendations
- **Backend Framework:** [e.g., FastAPI (Python 3.12+)]
- **Primary Database:** [e.g., PostgreSQL 16 with PostGIS 3.4]
- **In-Memory Cache & Message Broker:** [e.g., Redis 7.2+ (Streams + Geo)]
- **Worker Queue:** [e.g., Celery / ARQ / Redis Streams]
- **Reverse Proxy:** [e.g., Nginx 1.26+ / Traefik / Envoy]

---

## 12. Trade-offs Analysis
- **Decision 1: [Choice Made] vs. [Alternative Rejected]**
  - *Rationale:* [Why chosen]
  - *Trade-off:* [What complexity/cost is accepted]
- **Decision 2: [Choice Made] vs. [Alternative Rejected]**
  - *Rationale:* [Why chosen]
  - *Trade-off:* [What complexity/cost is accepted]

---

## 13. Execution Plan (Engineering Tasks)
- [ ] **Step 1 (Architecture & Setup):** Scaffold repository structure, Docker Compose environment, and linting/formatting pipelines.
- [ ] **Step 2 (Database & Persistence):** Implement DDL schema, foreign keys, indexes, and initial Alembic migration.
- [ ] **Step 3 (Core Service Logic & Algorithms):** Implement domain entities, repository pattern, and chosen data structures.
- [ ] **Step 4 (API & Cache Layer):** Build REST endpoints, validation schemas, idempotency middleware, and Redis cache-aside decorators.
- [ ] **Step 5 (Resilience & Verification):** Implement circuit breakers, background worker consumers, and run load tests verifying latency targets.

---

### Recommended Next Steps in Pipeline
- Run `/plan --project-name <name> --backlog <backlog>` to generate the engineering sprint plan with atomic tasks, effort estimates, and DAG dependency graph based on this blueprint (Phase 5).
```

---

## Reference Example: Real-time Logistic Tracking System

### Command Invocation
```bash
/design --project-name "Real-time Logistic Tracking System" --type distributed --scale large --latency-target "<100ms" --constraints "low-bandwidth mobile telemetry, high-frequency GPS pings"
```

### Generated Output

# System Design Blueprint: Real-time Logistic Tracking System

## 1. Problem Definition
- **Core Problem:** Thousands of delivery vehicles emit high-frequency GPS coordinate pings (1 ping / 3 seconds) over unstable cellular networks, causing high ingestion load, telemetry drift, and read contention when clients track deliveries in real time.
- **System Objective:** Ingest 50,000 GPS pings/sec with < 50ms latency, maintain real-time vehicle proximity index, and deliver live route updates to customer mobile apps with < 100ms end-to-end latency.
- **Target Metrics:** Ingestion p99 < 50ms; Query latency p95 < 80ms; Availability: 99.99%.

---

## 2. System Overview
- **High-Level Summary:** An event-driven telemetry pipeline decoupling high-throughput GPS ingestion via Redis Streams from transactional persistence in PostgreSQL/PostGIS. Real-time driver proximity lookups are served directly from in-memory Redis Geospatial indexes.
- **Core Components:**
  - **Telemetry Ingestion Gateway:** Lightweight async receiver validating and buffering driver pings.
  - **Spatial Proximity Engine:** In-memory Geospatial index tracking latest driver coordinates.
  - **Batch Persistence Worker:** Flushes buffered location batches to PostgreSQL in bulk.
  - **Tracking & Dispatch API:** Serves customer location queries and calculates route ETAs.

---

## 3. Architecture Design
- **Architectural Style:** Event-Driven Ingestion Pipeline with CQRS (Command Query Responsibility Segregation).

### Architecture Diagram
```text
[Driver Mobile App] (Flutter)
        │ (HTTPS / Compact Protocol Buffers over TLS)
        ▼
[Ingress Load Balancer (Envoy Proxy)]
        │
        ▼
[Telemetry Ingestion Service (FastAPI Async)]
        │
        ├──► [Write latest coordinates] ──► [Redis Geo Index (GEOADD)]
        │
        └──► [Publish raw event] ─────────► [Redis Stream: 'telemetry_stream']
                                                    │
                                                    ▼
                                      [Batch Flusher Worker (Python / ARQ)]
                                                    │ (Bulk Insert every 500ms)
                                                    ▼
                                      [PostgreSQL 16 + PostGIS 3.4 Store]
                                                    ▲
                                                    │ (Read Queries)
[Customer Mobile App] ──► [Tracking API Service] ───┘
```

---

## 4. Data Model Design

### Entities & Relationships
- `Vehicle`: Vehicle metadata, driver assignment, vehicle type.
- `TelemetryLog`: Historical time-series geospatial points (`latitude`, `longitude`, `speed`, `heading`, `recorded_at`).
- `Shipment`: Active delivery order associated with vehicle and customer.

### Database Schema (DDL)
```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL,
    license_plate VARCHAR(32) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE telemetry_logs (
    id BIGSERIAL,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id),
    location GEOMETRY(Point, 4326) NOT NULL,
    speed_kmh NUMERIC(5, 2),
    heading_deg SMALLINT,
    battery_level SMALLINT,
    recorded_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, recorded_at)
) PARTITION BY RANGE (recorded_at);

-- Spatial & Time Indexes
CREATE INDEX idx_telemetry_spatial ON telemetry_logs USING GIST(location);
CREATE INDEX idx_telemetry_vehicle_time ON telemetry_logs (vehicle_id, recorded_at DESC);
```

---

## 5. API Design & Contracts

### Endpoints
- `POST /api/v1/telemetry/pings` (Driver Ingestion)
  - **Headers:** `Authorization: Bearer <JWT>`, `Content-Type: application/x-protobuf`
  - **Payload:** `{"vehicle_id": "...", "lat": 16.8409, "lng": 96.1735, "speed": 42.5, "ts": 1724800000}`
  - **Response:** `202 Accepted` `{ "status": "queued" }`
- `GET /api/v1/tracking/{shipment_id}/live` (Customer Live View)
  - **Response:** `200 OK` `{ "vehicle_id": "...", "current_lat": 16.8409, "current_lng": 96.1735, "eta_minutes": 12, "last_updated": 1724800002 }`

### Principles & Optimization
- **Payload Format:** Drivers transmit compact Protocol Buffers (protobuf) payloads (< 100 bytes per ping) instead of heavy JSON to save bandwidth in low-connectivity areas.
- **Idempotency:** Pings deduplicated by `(vehicle_id, recorded_at)` timestamp in Redis prior to queuing.

---

## 6. Algorithm & Data Structure Decisions

| Operation | Chosen Data Structure / Algorithm | Time Complexity | Space Complexity | Engineering Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Real-time Vehicle Proximity Query** | Redis Geospatial Index (`GEOADD` / `GEORADIUS`) based on **Geohash & 52-bit Sorted Set Integer (SkipList)** | $O(N + \log M)$ | $O(V)$ where $V$ is active vehicle count | Provides sub-5ms proximity radius queries for nearest driver lookup without hitting the disk database. |
| **Telemetry Ingestion Buffering** | **Redis Stream** with consumer groups | $O(1)$ append | $O(B)$ bounded stream buffer | Prevents database write-lock saturation during traffic spikes; provides reliable at-least-once processing. |
| **Time-Series Historical Storage** | **Range-Partitioned PostgreSQL Tables (Monthly)** | $O(\log P)$ index seek | $O(T)$ | Enables instantaneous pruning of historical logs (`DROP PARTITION`) without vacuum degradation. |

---

## 7. Performance Strategy
- **Ingestion Decoupling:** Ingestion API writes only to Redis in-memory stream ($O(1)$, < 2ms) and returns `202 Accepted` immediately.
- **Batch DB Flushing:** Background workers read up to 1,000 pings from Redis Stream and execute a single `COPY` / multi-row `INSERT` to PostgreSQL every 500ms, reducing DB transactions by 99.8%.
- **Low-Bandwidth Compression:** Mobile driver apps batch offline pings into a single Gzip compressed Protobuf payload when entering dead zones.

---

## 8. Scalability Plan
- **Ingestion Layer:** Stateless FastAPI containers horizontally scaled across multiple nodes with round-robin DNS / Envoy.
- **Redis Cluster:** Sharded Redis Cluster based on `vehicle_id` hash tags (`{vehicle_id}`) to ensure co-location of single-vehicle streams and metadata.
- **PostgreSQL Partitioning:** Monthly table partitioning with automated table creation via `pg_partman`.

---

## 9. Reliability & Failure Handling
- **Dead-Letter Queue (DLQ):** Malformed telemetry pings pushed to `telemetry_dlq` stream for forensic inspection after 3 failed parsing attempts.
- **Client Offline Buffer:** Driver Flutter app stores up to 2,000 pings in local SQLite database when cellular connection drops, synchronizing automatically upon reconnection.
- **Circuit Breaker:** If Redis connection saturates, Ingestion Gateway fails over to local memory buffer ring before returning `503 Service Unavailable`.

---

## 10. Security & Compliance
- **Transport Security:** Strict TLS 1.3 with certificate pinning on mobile clients.
- **Authentication:** mTLS (Mutual TLS) for fleet hardware IoT units; JWT Bearer tokens for mobile app drivers.
- **Data Protection:** Driver home/private locations obfuscated outside active shift hours.

---

## 11. Technology Recommendations
- **Backend Services:** FastAPI (Python 3.12+ / AsyncIO)
- **High-Throughput Buffer:** Redis 7.2+ (Redis Streams + Redis Geo)
- **Primary Database:** PostgreSQL 16 with PostGIS 3.4 extension
- **Task Runner:** ARQ (Async Redis Queue) / Celery
- **Client Telemetry SDK:** Flutter 3.22+ (Dart 3.4+) with `sqflite` offline buffer

---

## 12. Trade-offs Analysis
- **Decision: Redis Streams Buffer vs. Direct PostgreSQL Insert**
  - *Rationale:* Direct inserts at 50,000 pings/sec would exhaust PostgreSQL connection and IOPS capacity.
  - *Trade-off:* Introduces ~500ms eventual consistency for historical audit logs, while live queries are served immediately from Redis.
- **Decision: Protobuf over JSON for Telemetry Ingress**
  - *Rationale:* Reduces mobile network data usage by 75% and speeds up parsing.
  - *Trade-off:* Requires shared schema compilation (`.proto`) across mobile and backend repositories.

---

## 13. Execution Plan (Engineering Tasks)
- [ ] **Step 1 (Architecture & Setup):** Scaffold repository structure, Docker Compose environment, and linting/formatting pipelines.
- [ ] **Step 2 (Database & Persistence):** Implement DDL schema, foreign keys, indexes, and initial Alembic migration.
- [ ] **Step 3 (Core Service Logic & Algorithms):** Implement domain entities, repository pattern, and chosen data structures.
- [ ] **Step 4 (API & Cache Layer):** Build REST endpoints, validation schemas, idempotency middleware, and Redis cache-aside decorators.
- [ ] **Step 5 (Resilience & Verification):** Implement circuit breakers, background worker consumers, and run load tests verifying latency targets.
