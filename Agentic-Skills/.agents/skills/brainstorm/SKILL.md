---
name: brainstorm
description: >-
  Phase 0 of the SDLC Pipeline. Generates high-quality engineering ideas and solution options for a problem before design
  or planning begins. Explores multiple approaches (MVP, Scalable, Advanced), compares architectural trade-offs, evaluates
  algorithms/data structures with Big-O complexity, and recommends the optimal path using latest tech stacks
  (Python 3.12, FastAPI 0.111+, PostgreSQL 16, Redis 7.2+, Flutter 3.22+, Next.js 14+). Hands off to `/analyze` (Phase 1).
  Triggered via `/brainstorm` or natural language requests for technical options and trade-offs.
---

# Engineering Brainstorming & Solution Exploration (Production Grade)

## SDLC Pipeline Integration
This skill represents **Phase 0 (Ideation & Solution Exploration)** in the 10-phase engineering pipeline:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Dependencies:** None (Entry point for new problems, unclear requirements, or technical explorations).
- **Downstream Handoffs:**
  - **Phase 1 ([`/analyze`](../analyze/SKILL.md)):** Passes the selected technical solution and architectural direction to perform deep functional/non-functional requirement extraction, domain entity modeling, data flow mapping, and ambiguity detection.
  - **Phase 2 ([`/proj-init`](../proj-init/SKILL.md)):** Downstream scoping into user stories and backlog.

---

## When to Use
- When requirements are high-level, ambiguous, or incomplete.
- When multiple technical solution paths exist and need formal comparison.
- When evaluating architectural patterns (Monolith vs. Microservices vs. Event-Driven, Polling vs. WebSockets vs. SSE, Sync vs. Async).
- When selecting optimal algorithms and data structures before writing code.
- When the user asks "how can we build this?", "what are our options?", or runs `/brainstorm`.

---

## Command Format
```bash
/brainstorm --project-name <name> --problem <description> [options]
```

### Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--project-name` / `--name` | `string` | **Yes** | Name of the project, subsystem, or feature. |
| `--problem` | `string` | **Yes** | Concise description of the engineering problem or system to explore. |
| `--domain` | `enum` | No | System domain: `backend`, `mobile`, `ai`, `distributed`, `fullstack`. |
| `--scale` | `enum` | No | Expected workload: `small` (1k-10k DAU), `medium` (10k-100k DAU), `large` (100k-1M DAU), `enterprise` (>1M DAU). |
| `--constraints` | `string` | No | Operational constraints (e.g., `low-bandwidth`, `offline-first`, `low-compute`, `<50ms-latency`). |
| `--priority` | `enum` | No | Optimization goal: `speed` (time-to-market), `scalability`, `cost`, `simplicity`. Default: `scalability`. |
| `--tech-stack` | `string` | No | Preferred base frameworks if pre-decided (e.g., `FastAPI, Flutter, PostgreSQL`). |

### Example Invocations
```bash
# Real-time delivery tracking exploration
/brainstorm --project-name "FleetTracker" --problem "Real-time delivery location tracking for 10k concurrent drivers" --domain distributed --scale large --constraints "low-bandwidth mobile telemetry"

# Offline document sync exploration
/brainstorm --project-name "DocuSync" --problem "Bidirectional conflict-free document synchronization between mobile and web" --domain fullstack --priority simplicity --constraints "offline-first"
```

---

## Required Engineering Concepts

1. **Problem Decomposition**
   - Break the overarching problem into isolated sub-problems (Ingestion, Processing, Storage, Delivery/Query).
   - Identify system boundaries and external integration contracts.

2. **Multi-Path Solution Exploration (Mandatory 3 Approaches)**
   - **Approach 1 (Simple / MVP Solution):** Minimal operational complexity, fast time-to-market, single data store, monolithic/REST architecture.
   - **Approach 2 (Scalable Production Solution):** Decoupled layers, asynchronous queues/caching, partitioned relational/NoSQL storage, production-grade reliability.
   - **Approach 3 (Advanced / High-Performance Solution):** Distributed event streaming, in-memory geospatial/spatial index engines, CQRS, multi-region or sharded persistence.

3. **Architecture Options & Trade-offs**
   - Monolithic vs. Microservices vs. Modular Monolith.
   - REST Polling vs. Server-Sent Events (SSE) vs. WebSockets vs. gRPC / Protocol Buffers.
   - Synchronous blocking execution vs. Asynchronous event-driven pipelines.

4. **Algorithm & Data Structure Evaluation (Big-O Rigor)**
   - Compare concrete data structures (e.g., Hash Maps vs. SkipLists vs. Ring Buffers vs. Geohash/QuadTrees vs. B-Trees).
   - State explicit computational complexity: Time Complexity ($O(1)$, $O(\log N)$, $O(N)$) and Space Complexity.

5. **System Design Patterns**
   - Cache-Aside / Write-Through caching (Redis / Memcached).
   - Message Queuing & Streaming (Redis Streams / RabbitMQ / Kafka).
   - Rate Limiting (Token Bucket / Leaky Bucket / Sliding Window).
   - Idempotency & Concurrency Control (Optimistic versioning vs. Pessimistic row locking).

6. **Environment & Constraint Engineering**
   - Resilience against intermittent cellular connections (Myanmar / emerging market low-bandwidth context).
   - Local offline databases (SQLite / Hive), batch compression, and delta-only synchronizations.

7. **Risk & Failure Modeling**
   - Identify single points of failure (SPOF), lock contention, thundering herd scenarios, and network partition failure modes.

---

## Steps

1. **Decompose Problem**: Break the user problem statement into functional sub-components.
2. **Identify Constraints**: Synthesize technical, infrastructure, business, and network constraints.
3. **Formulate Approach 1 (Simple / MVP)**: Design a lean, rapid-delivery solution.
4. **Formulate Approach 2 (Scalable Production)**: Design a balanced, decoupled production architecture.
5. **Formulate Approach 3 (Advanced / High-Performance)**: Design a distributed, ultra-low-latency architecture.
6. **Build Architecture Comparison Table**: Compare Complexity, Scalability, Cost, and Maintainability across all 3 approaches.
7. **Evaluate Algorithms & Data Structures**: Select candidate data structures with Big-O analysis.
8. **Synthesize Recommended Solution**: Select the optimal path, explain *why*, and list accepted trade-offs.
9. **Analyze System Design Considerations**: Document scalability, fault tolerance, caching, and data flow.
10. **Analyze Risks & Mitigations**: Build a risk-impact-mitigation matrix.
11. **Recommend Next SDLC Step**: Direct the pipeline to **Phase 1 ([`/analyze`](../analyze/SKILL.md))** for deep engineering requirement extraction and domain modeling.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# Engineering Brainstorming & Solution Exploration: [Project Name]

## 1. Problem Summary
- **Problem Statement:** [Clear, precise definition of the engineering challenge]
- **Core Objectives:**
  - [Objective 1: Functional capability]
  - [Objective 2: Non-functional SLA, throughput, latency]
- **System Boundaries:** [What is inside scope vs. external dependencies]

---

## 2. Key Constraints
- **Technical Constraints:** [e.g., Stateless API requirement, max latency < 100ms]
- **Environment & Network Constraints:** [e.g., Unstable 2G/3G mobile networks, offline-first operation]
- **Business & Operational Constraints:** [e.g., 2-engineer team, cloud infrastructure budget limits]

---

## 3. Solution Approaches

### Approach 1: Simple / MVP Solution
- **Description:** [Concise description of the minimal viable approach]
- **Architecture Pattern:** [e.g., Monolithic FastAPI REST API + Single PostgreSQL Database with Short Polling]
- **Data Flow:** [Client ➔ REST Endpoint ➔ Direct SQL Query ➔ Client Response]
- **Pros:**
  - Fast implementation time (< 1 week).
  - Zero additional infrastructure dependencies (no Redis, no Kafka).
  - Simple local debugging and unit testing.
- **Cons:**
  - High database CPU contention under concurrent polling.
  - High network bandwidth overhead from repetitive JSON payloads.

### Approach 2: Scalable Production Solution (Recommended Baseline)
- **Description:** [Production-ready architecture balancing complexity and scale]
- **Architecture Pattern:** [e.g., Decoupled FastAPI Backend + Redis Streams Ingestion Buffer + PostgreSQL Storage + Server-Sent Events (SSE) Broadcast]
- **Data Flow:** [Client Ingest ➔ Redis Stream ➔ Batch Worker ➔ PostgreSQL & Redis Cache ➔ SSE Push to Clients]
- **Pros:**
  - Eliminates DB write bottlenecks via in-memory stream buffering.
  - Efficient push updates without client polling overhead.
  - Independent scaling of ingestion and query services.
- **Cons:**
  - Introduces Redis as a stateful infrastructure dependency.
  - Eventual consistency delay (~200ms) between write and disk persistence.

### Approach 3: Advanced / High-Performance Solution
- **Description:** [Distributed, high-throughput architecture for extreme scale]
- **Architecture Pattern:** [e.g., Microservices + Kafka Distributed Log + Redis Cluster (Geospatial) + TimescaleDB Partitioning + WebSockets with Protobuf]
- **Data Flow:** [Client Binary Protobuf ➔ Edge Load Balancer ➔ Ingestion Gateway ➔ Kafka Topic ➔ In-Memory Spatial Cluster ➔ WebSocket Hub]
- **Pros:**
  - Handles 100,000+ events/sec with sub-20ms p99 latency.
  - Zero JSON parsing overhead over mobile networks.
  - Linear horizontal sharding across multi-node clusters.
- **Cons:**
  - High operational complexity and infrastructure maintenance cost.
  - Overkill for small to medium scale teams.

---

## 4. Architecture Comparison Table

| Metric | Approach 1 (Simple / MVP) | Approach 2 (Scalable Production) | Approach 3 (Advanced / Distributed) |
| :--- | :--- | :--- | :--- |
| **Implementation Complexity** | Low (1–2 days) | Medium (1–2 weeks) | High (4–6 weeks) |
| **Scalability Limit** | ~1,000 concurrent users | ~50,000 concurrent users | >500,000 concurrent users |
| **Infrastructure Cost** | Minimal ($) | Moderate ($$) | High ($$$$) |
| **Operational Maintenance** | Very Low | Low – Medium | High (Dedicated DevOps) |
| **Bandwidth Efficiency** | Low (Heavy Polling) | High (SSE Push) | Maximum (Binary Protobuf) |

---

## 5. Algorithm & Data Structure Options

### Option A: [Primary In-Memory Data Structure / Algorithm]
- **Data Structure:** [e.g., Redis Geospatial Index (ZSET with Geohash 52-bit integer)]
- **Algorithmic Complexity:**
  - Lookup: $O(N + \log M)$ where $N$ is elements in radius and $M$ is total entries.
  - Insert / Update: $O(\log M)$.
- **Engineering Rationale:** [Why optimal for this operation]

### Option B: [Secondary In-Memory / Persistence Data Structure]
- **Data Structure:** [e.g., Bounded Circular Buffer (Ring Buffer) / Queue]
- **Algorithmic Complexity:**
  - Enqueue / Dequeue: $O(1)$.
  - Space Complexity: $O(K)$ fixed memory allocation.
- **Engineering Rationale:** [Why optimal for this operation]

---

## 6. Recommended Solution & Engineering Rationale
- **Selected Approach:** [e.g., Approach 2: Scalable Production Solution]
- **Why It Is Best:** [Justification balancing team capacity, latency targets, and scalability ceiling]
- **Accepted Trade-offs:** [Explicit technical compromises accepted, e.g., eventual consistency in exchange for 10x throughput]

---

## 7. System Design Considerations
- **Scalability Strategy:** [Horizontal scaling of API workers, Redis Cluster sharding]
- **Performance Optimization:** [In-memory caching, Protobuf/Gzip payload compression, connection pooling]
- **Failure Handling:** [Circuit breaker on cache failure, client-side SQLite offline buffer]
- **Data Flow Design:** [Decoupled ingest pipeline with asynchronous database batching]

---

## 8. Technical Risks & Mitigation Matrix

| Identified Risk | Severity | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **[Risk 1: e.g., Database write lock saturation]** | High | API latency spike & dropped pings | Decouple writes via Redis Streams queue with bulk micro-batching. |
| **[Risk 2: e.g., Mobile network disconnection]** | High | Telemetry loss during dead zones | Client-side SQLite queue with automatic retry & exponential backoff. |
| **[Risk 3: e.g., Thundering herd on reconnect]** | Medium | Gateway CPU spike | Randomized jitter on client reconnect attempts. |

---

## 9. Recommended Next Steps in Pipeline
- **Proceed to Phase 1 (Requirement Analysis):** Run `/analyze --project-name <name> --input "<chosen approach summary>"` to extract detailed functional requirements, entities, and data flows.
- **Direct to Scoping:** Run `/proj-init --project-name <name> --type <type>` to generate the MVP scope, user stories, and product backlog.
```

---

## Reference Example: Real-time Delivery Tracking System

### Command Invocation
```bash
/brainstorm --project-name "FleetTracker" --problem "Real-time delivery location tracking for 10,000 active drivers and customer tracking web/mobile apps" --domain distributed --scale large --constraints "low-bandwidth mobile telemetry, battery preservation"
```

### Generated Output

# Engineering Brainstorming & Solution Exploration: FleetTracker

## 1. Problem Summary
- **Problem Statement:** Ingest high-frequency GPS coordinate updates from 10,000 delivery drivers every 3–5 seconds and broadcast live delivery locations and ETAs to customer mobile/web applications with sub-second latency over unstable mobile connections.
- **Core Objectives:**
  - High-throughput write ingestion: 2,000 to 3,500 GPS updates/second.
  - Low-latency query/push: Customer live tracking map update latency < 200ms.
  - Minimal mobile data usage: Bandwidth budget < 5MB per driver per 8-hour shift.
- **System Boundaries:** Mobile Driver Telemetry App, Fleet Ingestion Gateway, Spatial State Store, Customer Tracking Web/Mobile Clients.

---

## 2. Key Constraints
- **Technical Constraints:** End-to-end telemetry propagation latency < 500ms; zero data loss for delivery audit history.
- **Environment & Network Constraints:** Intermittent 2G/3G connectivity in suburban delivery routes; high battery drain from continuous GPS/radio transmissions.
- **Operational Constraints:** 2-person engineering team; self-hosted open-source components preferred over managed cloud lock-in.

---

## 3. Solution Approaches

### Approach 1: Simple / MVP Solution (HTTP REST Polling)
- **Description:** Mobile drivers send HTTP `POST` requests every 3 seconds to a FastAPI backend that writes directly to PostgreSQL. Customer apps poll `GET /api/v1/tracking/{id}` every 3 seconds.
- **Architecture:** Monolithic FastAPI + PostgreSQL with B-Tree indexes.
- **Pros:**
  - Extremely fast to build (2 days).
  - Standard REST primitives with no additional infrastructure to deploy.
- **Cons:**
  - 3,000 HTTP handshakes/sec exhausts PostgreSQL connection limits ($O(N)$ write saturation).
  - Customer polling generates 90% redundant queries when driver is stationary in traffic.
  - High mobile battery and data consumption from repetitive TLS handshakes and JSON headers.

### Approach 2: Scalable Production Solution (Redis Streams + SSE Push) &mdash; **RECOMMENDED**
- **Description:** Drivers send compact binary/compressed JSON packets over persistent HTTP/2 connections. Ingestion Gateway appends pings to Redis Streams and updates a Redis Geospatial index ($O(1)$). Customer clients subscribe to Server-Sent Events (SSE) channels for live map movements. A background worker micro-batches historical points to PostgreSQL every 1 second.
- **Architecture:** FastAPI Async Gateway + Redis 7.2+ (Streams & Geo Index) + PostgreSQL 16 + ARQ Bulk Flusher + SSE Push.
- **Pros:**
  - Readily handles 20,000 pings/sec with < 5ms in-memory ingestion latency.
  - SSE push eliminates customer polling traffic by 85%.
  - Bulk database inserts reduce PostgreSQL disk I/O transactions by 99%.
- **Cons:**
  - Redis memory must be dimensioned to hold active driver coordinates (approx. 50MB for 10k drivers).
  - Requires handling SSE client reconnection logic.

### Approach 3: Advanced / Distributed Solution (Kafka + WebSockets + Protobuf)
- **Description:** Drivers stream compact Protocol Buffer packets over bidirectional WebSockets to an Envoy Gateway that routes messages into Apache Kafka. Apache Flink calculates real-time map-matching and ETA calculations, pushing updates to a distributed WebSocket cluster.
- **Architecture:** Envoy Gateway + Kafka + Apache Flink + Redis Cluster + Distributed WebSocket Gateway + TimescaleDB.
- **Pros:**
  - Infinite horizontal scaling (> 500,000 drivers).
  - Protobuf reduces cellular packet size to < 60 bytes per ping.
  - Real-time stream processing enables complex anomaly detection and speed alerts.
- **Cons:**
  - Excessive operational overhead (ZooKeeper/KRaft, Kafka, Flink cluster maintenance).
  - Unnecessary infrastructure cost for a 10,000 driver workload.

---

## 4. Architecture Comparison Table

| Metric | Approach 1 (REST Polling) | Approach 2 (Redis Streams + SSE) | Approach 3 (Kafka + WebSockets + Flink) |
| :--- | :--- | :--- | :--- |
| **Implementation Complexity** | Low (2 days) | Medium (1.5 weeks) | High (6 weeks) |
| **Max Ingestion Throughput** | ~500 pings/sec | ~25,000 pings/sec | >200,000 pings/sec |
| **Client Battery & Data Usage** | High (Heavy polling) | Low (Push-only on delta) | Minimal (Binary Protobuf) |
| **Infrastructure Cost** | Low ($30/mo single VPS) | Moderate ($120/mo Redis+VPS) | High ($800+/mo cluster) |
| **Operational Overhead** | Near Zero | Minimal (Standard Redis) | Significant (Cluster ops) |

---

## 5. Algorithm & Data Structure Options

### Option A: Driver Spatial State & Proximity Lookups
- **Chosen Data Structure:** **Redis Geospatial Sorted Set (`GEOADD`, `GEORADIUSBYMEMBER`)**
- **Underlying Structure:** 52-bit Geohash integer mapped inside a SkipList.
- **Algorithmic Complexity:**
  - Ingestion Write: $O(\log N)$ where $N$ is active drivers.
  - Radius Query: $O(M + \log N)$ where $M$ is drivers in radius.
- **Engineering Rationale:** Sub-millisecond in-memory lookups without disk scans; native support for distance calculations.

### Option B: High-Throughput Ingestion Buffer
- **Chosen Data Structure:** **Redis Stream (Radix Tree with Listpacks)**
- **Algorithmic Complexity:**
  - Append (`XADD`): $O(1)$.
  - Range Read (`XREADGROUP`): $O(K)$ where $K$ is batch size.
- **Engineering Rationale:** Bounded memory structure providing at-least-once consumer group processing to prevent DB write lock contention.

---

## 6. Recommended Solution & Engineering Rationale
- **Selected Approach:** **Approach 2 (Redis Streams + SSE Push + FastAPI + PostgreSQL)**
- **Why It Is Best:** It completely eliminates the database I/O bottleneck, provides sub-100ms real-time map updates to customers via SSE, and operates comfortably within the skills and budget of a 2-engineer team.
- **Accepted Trade-offs:** Historical GPS track logs have an eventual consistency delay of up to 1 second before appearing in PostgreSQL reports, which is completely acceptable for real-time delivery tracking.

---

## 7. System Design Considerations
- **Scalability:** FastAPI async workers scale horizontally behind Nginx; Redis memory is bounded using `XADD ... MAXLEN ~ 100000`.
- **Performance:** SSE push only fires when a driver has moved $> 10$ meters or $> 10$ seconds have elapsed, reducing network noise.
- **Failure Handling:** Driver mobile app implements a local SQLite ring buffer storing up to 1,000 pings when mobile internet drops, flushing via gzip batch on reconnection.

---

## 8. Technical Risks & Mitigation Matrix

| Identified Risk | Severity | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Redis Server Crash** | High | Ingestion outage | Redis AOF persistence enabled (`appendfsync everysec`) + automatic replica failover. |
| **Mobile Dead Zones** | High | Missing route segments | Driver app stores unACKed pings in local SQLite; sends batch payload upon reconnection. |
| **Cellular Data Drain** | Medium | Driver complaints | Implement distance delta thresholding (no pings emitted if vehicle speed < 1 km/h). |

---

## 9. Recommended Next Steps in Pipeline
- **Step 1 (Requirement Analysis):** Run `/analyze --project-name FleetTracker --input "Build a scalable real-time fleet telemetry ingest and tracking service using Redis Streams, FastAPI, and PostgreSQL with offline-first mobile sync"` to perform deep requirement extraction and domain modeling.
- **Step 2 (Scoping & Backlog):** Run `/proj-init --project-name FleetTracker --type backend --stack "fastapi, redis, flutter" --constraints "offline-first, low-bandwidth"`.
