---
name: requirement-analysis
description: >-
  Phase 1 of the SDLC Pipeline. Performs deep engineering-level requirement analysis and system understanding
  on raw user inputs or brainstormed concepts from `/brainstorm` (Phase 0). Acts as a Senior Staff Systems Analyst
  to extract hidden complexity, classify system type, model domain entities, trace data flow, identify concurrency/consistency
  challenges, analyze Big-O algorithmic requirements, and surface ambiguities before design or planning begins.
  Feeds directly into `/proj-init` (Phase 2), `/ui-ux` (Phase 3), and `/design` (Phase 4). Triggered via `/analyze` or natural language.
---

# Engineering Requirement Analysis & System Understanding (Deep Review)

## SDLC Pipeline Integration
This skill represents **Phase 1 (Intelligence & Requirement Analysis)** in the 10-phase engineering pipeline, executing immediately after solution exploration in Phase 0:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Dependencies (from [Phase 0: `/brainstorm`](../brainstorm/SKILL.md)):** Ingests raw user requirements or brainstormed technical approaches.
- **Downstream Handoffs:**
  - **Phase 2 ([`/proj-init`](../proj-init/SKILL.md)):** Feeds extracted functional requirements, personas, and entities directly into user stories, MVP scope, and product backlogs.
  - **Phase 3 ([`/ui-ux`](../ui-ux-promax/SKILL.md)):** Supplies domain workflows and entity states for wireframing and design token specification.
  - **Phase 4 ([`/design`](../system-design/SKILL.md)):** Supplies data flow, non-functional SLAs, entity relationships, and hidden complexity considerations to engineer DDL schemas and API contracts.

---

## When to Use
- When user provides a new idea, feature request, or raw problem statement.
- When requirements are unclear, incomplete, or informal.
- After running `/brainstorm` to deeply analyze the selected technical direction.
- When translating a business idea into deep technical system understanding.
- When the user runs `/analyze`.

---

## Command Format
```bash
/analyze --project-name <name> --input <raw_problem_statement_or_brainstorm_summary> [options]
```

### Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--project-name` / `--name` | `string` | **Yes** | Name of the project or subsystem. |
| `--input` / `--problem` | `string` | **Yes** | Raw user requirement, idea description, or output summary from `/brainstorm`. |
| `--domain` | `enum` | No | System domain: `backend`, `mobile`, `ai`, `distributed`, `fullstack`. |
| `--scale` | `enum` | No | Target workload: `small` (1k-10k DAU), `medium` (10k-100k DAU), `large` (100k-1M DAU), `enterprise` (>1M DAU). |
| `--constraints` | `string` | No | Operational constraints (e.g., `offline-first`, `low-bandwidth`, `low-compute`, `compliance-hipaa`). |
| `--tech-stack` | `string` | No | Any user-specified tech stack preferences. |
| `--priority-focus` | `enum` | No | Core optimization lens: `speed`, `cost`, `scalability`, `simplicity`. Default: `scalability`. |

---

## Required Engineering Concepts (Staff Analyst Rigor)

1. **Problem Reinterpretation & Intent Translation**
   - Translate colloquial or business descriptions into rigorous engineering problem statements.
   - Extract hidden technical complexity behind seemingly simple user requests.

2. **System Type Classification**
   - Classify the architecture into its true engineering category:
     - **CRUD System:** Direct synchronous state mutations, standard relational read/write.
     - **Real-Time System:** Low-latency push/pull telemetry, sub-second SLAs.
     - **Event-Driven System:** Asynchronous pub/sub, decoupled producers and consumers.
     - **Distributed System:** Multi-node consensus, network partition resilience, replication lag.
     - **Time-Series System:** Append-only high-frequency geospatial or telemetry ingestion.
     - **AI / ML System:** Asynchronous inference queues, model context latency, embedding vector searches.
     - **Hybrid System:** Combination of multiple archetypes.

3. **Requirement Extraction (Explicit & Implicit)**
   - **Functional Requirements (FR):** Verifiable capabilities the system must perform.
   - **Non-Functional Requirements (NFR):** Latency SLAs, throughput, availability, consistency model (Strong vs. Eventual), and offline synchronization behavior.

4. **Entity & Domain Modeling**
   - Identify domain entities, attributes, states, and relational cardinality (1-1, 1-N, M-N).

5. **Data Flow Mapping**
   - Trace data progression through 4 lifecycle stages: `Input` &rarr; `Processing` &rarr; `Storage` &rarr; `Output`.

6. **Hidden Engineering Problems & Bottlenecks**
   - Uncover lock contention, scaling hot-spots, concurrency race conditions, network partition hazards, and data drift.

7. **Algorithmic & Data Structure Considerations**
   - Big-O time and space complexity analysis for stateful lookups, sorting, queueing, and indexing.

8. **Constraints & Environment Realities**
   - Device hardware limits, battery drain, intermittent 2G/3G mobile networks (Myanmar / emerging market context), and operational costs.

9. **Risk Analysis & Ambiguity Detection**
   - Populate structured risk table with failure modes and analytical mitigations.
   - Surface all unanswered questions, conflicting requirements, and unverified assumptions.

---

## Strict Analysis Rules (Zero Premature Design)

- **DO NOT** propose specific system architectures (Monolith vs. Microservices) &mdash; that belongs in `/design`.
- **DO NOT** write DDL schemas, API endpoint contracts, or framework code &mdash; that belongs in `/design`.
- **DO NOT** create sprint plans, task breakdowns, or backlogs &mdash; that belongs in `/proj-init` and `/plan`.
- **DO NOT** make final stack or infrastructure choices.
- **DO** focus strictly on deep engineering analysis, requirements extraction, hidden complexity, and risk surfacing.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# Engineering Deep Analysis Report: [Project Name]

## 1. Problem Reinterpretation
- **Raw Input:** "[Exact user prompt / input]"
- **Interpreted Engineering Problem:** [Technical translation of the core challenge]
- **Core Intent & Objectives:** [Quantifiable system goals]
- **Hidden Complexity:** [Subtle technical hurdles not obvious in raw prompt]

---

## 2. System Type Classification
- **Primary Classification:** [CRUD | Real-time | Event-driven | Distributed | Time-series | AI | Hybrid]
- **Classification Justification:** [Why the system matches this engineering archetype]

---

## 3. Functional Requirements (FR)
- **FR-01 (Explicit):** [Direct requirement stated in prompt]
- **FR-02 (Implicit / Hidden):** [Derived requirement necessary for system viability]
- **FR-03 (Implicit / Hidden):** [Derived requirement necessary for system viability]
- **FR-04 (Implicit / Hidden):** [Derived requirement necessary for system viability]

---

## 4. Non-Functional Requirements (NFR)
- **Latency SLOs:** [Target response times, e.g., Ingestion p99 < 50ms, Read p95 < 200ms]
- **Scalability & Throughput:** [Target concurrent users, write ops/sec, read ops/sec]
- **Availability & Uptime:** [Target SLA, e.g., 99.9% availability]
- **Consistency Model:** [Strong Consistency vs. Eventual Consistency vs. Causal Consistency]
- **Offline Resilience:** [Local cache requirements, mutation queueing, delta sync behavior]
- **Security & Identity:** [Authentication standard, role-based access control, encryption in transit & rest]

---

## 5. Entity Analysis & Domain Modeling

| Entity | Description | Key Attributes | Relational Cardinality |
| :--- | :--- | :--- | :--- |
| **[Entity 1]** | [Role in domain] | `id`, `status`, `created_at`, `...` | 1-to-Many with Entity 2 |
| **[Entity 2]** | [Role in domain] | `id`, `parent_id`, `...` | Belongs to Entity 1 |

---

## 6. Data Flow Analysis
1. **Input (Ingress):** [How data enters the system, sensors, payload formats, client triggers]
2. **Processing (Validation & Logic):** [Transformation, deduplication, business invariant checks]
3. **Storage (Persistence):** [Transactional writes, time-series indexing, local offline store]
4. **Output (Egress & Notification):** [Client updates, push events, downstream consumer dispatches]

---

## 7. Hidden Engineering Complexity & Bottlenecks
- **Concurrency & Locking Contention:** [Where multiple writes can conflict or cause race conditions]
- **Scaling Hot-Spots:** [Which component will degrade first under 10x traffic spike]
- **Network Degradation Hazards:** [Failure modes under packet loss, jitter, or offline dead zones]
- **Data Drift & Divergence:** [Risks of local client state diverging from server source of truth]

---

## 8. Algorithmic & Data Structure Considerations
- **Core Operations:** [e.g., Spatial Proximity Search, Ingestion Buffering, State Transition Checks]
- **Data Structure Implications:** [e.g., Geohash SkipLists, Bounded Circular Queues, B-Trees]
- **Algorithmic Complexity (Big-O):**
  - Ingestion Write: Target $O(1)$ or $O(\log N)$.
  - Proximity / Range Query: Target $O(M + \log N)$.

---

## 9. Constraints Analysis
- **Device & Hardware Constraints:** [e.g., Low RAM mobile terminals, background GPS battery limits]
- **Network & Connectivity Constraints:** [e.g., Intermittent 2G/3G connectivity in transit zones]
- **Cost & Operational Constraints:** [e.g., Infrastructure budget limits, lean engineering team]
- **Real-World Environment Realities:** [e.g., GPS drift in urban canyons, physical warehouse obstacles]

---

## 10. Risk Analysis Matrix

| Identified Risk | Risk Type | Impact | Technical Root Cause | Mitigation Strategy (Analysis Level) |
| :--- | :--- | :--- | :--- | :--- |
| **[Risk 1: e.g., Database write lock saturation]** | Technical | High | High-frequency synchronous inserts exhaust connection pool | Asynchronous write decoupling & micro-batching |
| **[Risk 2: e.g., Telemetry packet loss]** | Data | High | Unstable cellular coverage causes dropped requests | Client-side persistent mutation queue with retry |
| **[Risk 3: e.g., Thundering herd reconnect]** | Infrastructure | Medium | Reconnecting mobile fleet hammers server simultaneously | Randomized exponential backoff jitter |

---

## 11. Missing Requirements & Clarification Questions
- [ ] **Critical Question 1:** [Ambiguity regarding scale, update frequency, or operational invariants]
- [ ] **Critical Question 2:** [Ambiguity regarding offline conflict resolution rules]
- [ ] **Critical Question 3:** [Ambiguity regarding regulatory compliance or data retention]

---

## 12. Engineering Verdict
- **System Complexity Class:** [Simple System | Medium System | Complex System | Distributed System Class]
- **Core Architectural Hurdle:** [The single hardest engineering challenge to solve]
- **Next Pipeline Recommendation:**
  - Proceed to **Phase 2 ([`/proj-init`](../proj-init/SKILL.md))** to build the product backlog and user stories based on these analyzed entities and requirements.
  - Or proceed directly to **Phase 4 ([`/design`](../system-design/SKILL.md))** to engineer the technical blueprint and schemas.
```

---

## Reference Example: Delivery Tracking System

### Command Invocation
```bash
/analyze --project-name "FleetTracker" --input "Build a logistic tracking system for delivery drivers with real-time updates and low data usage" --domain distributed --constraints "offline-first, low-bandwidth"
```

### Generated Output

# Engineering Deep Analysis Report: FleetTracker

## 1. Problem Reinterpretation
- **Raw Input:** "Build a logistic tracking system for delivery drivers with real-time updates and low data usage"
- **Interpreted Engineering Problem:** Design a high-throughput geospatial telemetry ingestion engine capable of absorbing high-frequency coordinates from bandwidth-constrained mobile devices over intermittent cellular connections, maintaining an in-memory spatial index of active fleet members, and broadcasting live location coordinates to customer clients with sub-second latency.
- **Core Intent & Objectives:** Provide real-time delivery transparency, calculate live ETAs, and track driver status without draining mobile battery or exceeding a 5MB/day mobile data budget.
- **Hidden Complexity:** Managing out-of-order GPS packet arrival, handling GPS drift while vehicles are stationary at traffic lights, and maintaining continuous delivery state across offline warehouse dead zones.

---

## 2. System Type Classification
- **Primary Classification:** **Distributed Real-Time / Time-Series Hybrid System**
- **Classification Justification:** Ingests high-frequency time-series GPS points (telemetry), requires real-time pub/sub distribution to end-user clients, and must handle distributed state mutations across disconnected mobile clients.

---

## 3. Functional Requirements (FR)
- **FR-01 (Explicit):** Driver mobile application must capture and transmit GPS coordinates (lat, lng, speed, heading, timestamp) at regular intervals (3–5 seconds).
- **FR-02 (Implicit):** System must evaluate geofence proximity (e.g., driver within 500m of delivery address) and trigger customer arrival events.
- **FR-03 (Implicit):** Driver mobile app must buffer unACKed telemetry locally in SQLite/Hive during network loss and sync in compressed batches on reconnection.
- **FR-04 (Implicit):** Server must deduplicate incoming pings based on `(vehicle_id, timestamp)` to prevent duplicate writes during network retries.
- **FR-05 (Explicit):** Customer tracking client must render live vehicle icon movement with smoothed route interpolation.

---

## 4. Non-Functional Requirements (NFR)
- **Latency SLOs:** Telemetry ingestion write p99 < 50ms; Live customer map update latency < 200ms.
- **Scalability & Throughput:** Support 10,000 active concurrent drivers emitting ~2,500 pings/sec (216 million data points/day).
- **Availability & Uptime:** 99.9% uptime SLA for live tracking APIs; 99.99% durability for delivery audit records.
- **Consistency Model:** **Eventual Consistency** for historical location logs; **Linearizable In-Memory State** for active driver coordinates.
- **Offline Resilience:** Zero data loss during 30-minute cellular outages; mobile client must queue up to 2,000 telemetry points offline.
- **Security & Identity:** Mutual TLS / JWT authentication for driver app; driver GPS obfuscated outside active shift hours.

---

## 5. Entity Analysis & Domain Modeling

| Entity | Description | Key Attributes | Relational Cardinality |
| :--- | :--- | :--- | :--- |
| **Driver** | Field delivery personnel | `id`, `name`, `phone`, `status`, `active_vehicle_id` | 1-to-1 with Vehicle; 1-to-Many with Shipments |
| **Vehicle** | Transport unit assigned to driver | `id`, `license_plate`, `vehicle_type`, `status` | 1-to-1 with Driver |
| **Shipment** | Consignment parcel to be delivered | `id`, `tracking_number`, `status`, `dest_lat`, `dest_lng` | Belongs to Customer & Driver |
| **TelemetryPoint** | Discrete geospatial time-series ping | `id`, `vehicle_id`, `lat`, `lng`, `speed`, `heading`, `recorded_at` | Belongs to Vehicle |
| **DeliveryEvent** | State transition milestone record | `id`, `shipment_id`, `event_type`, `timestamp`, `proof_data` | Belongs to Shipment |

---

## 6. Data Flow Analysis
1. **Input (Ingress):** Driver GPS sensor &rarr; Mobile background daemon &rarr; Binary/Protobuf HTTP/2 POST &rarr; Ingestion Gateway.
2. **Processing:** Gateway authenticates JWT &rarr; validates timestamp window &rarr; deduplicates &rarr; updates spatial proximity index.
3. **Storage:** Stream buffer holds active telemetry &rarr; asynchronous micro-batch worker persists historical points to partitioned database.
4. **Output (Egress):** Customer client connects via Server-Sent Events (SSE) &rarr; Gateway pushes real-time coordinate delta.

---

## 7. Hidden Engineering Complexity & Bottlenecks
- **Database Write Contention:** 2,500 synchronous database inserts/sec will saturate PostgreSQL connection pool and disk IOPS.
- **Stationary GPS Jitter:** Vehicles waiting at red lights emit noisy, drifting coordinates causing map icon jitter and false geofence triggers.
- **Offline Data Bursts:** 500 drivers exiting a dead zone simultaneously will cause a thundering herd ingestion spike.
- **State Divergence:** Customer tracking UI receiving delayed or out-of-order pings could display vehicles jumping backwards in time.

---

## 8. Algorithmic & Data Structure Considerations
- **Spatial Proximity Indexing:** In-memory Geohash Sorted Sets ($O(\log N + M)$) to calculate nearby drivers and geofence intersections in $< 5\text{ms}$.
- **Bounded Stream Buffering:** Circular memory buffer / Radix Tree listpack with $O(1)$ append complexity to absorb peak write spikes.
- **Dead Reckoning & Kalman Filtering:** Client-side interpolation algorithm to smooth GPS jitter and calculate accurate ETAs.

---

## 9. Constraints Analysis
- **Device & Battery Constraints:** Continuous GPS querying drains mobile battery rapidly; requires adaptive polling based on accelerometer speed.
- **Network Constraints:** 2G/3G mobile connections have high latency and frequent packet loss; JSON headers waste cellular bandwidth.
- **Cost Constraints:** Storing 200M+ pings/month requires aggressive automated table partitioning and 90-day cold archival.

---

## 10. Risk Analysis Matrix

| Identified Risk | Risk Type | Impact | Technical Root Cause | Mitigation Strategy (Analysis Level) |
| :--- | :--- | :--- | :--- | :--- |
| **Database IOPS Saturation** | Technical | High | High-frequency unbuffered disk writes | Decouple ingestion via in-memory stream buffer |
| **Telemetry Loss in Dead Zones** | Data | High | Network drops during transit | Persistent local SQLite queue with atomic replay |
| **Thundering Herd on Reconnect** | Infrastructure | Medium | Simultaneous sync bursts from reconnecting fleet | Client-side randomized backoff jitter |
| **Privacy Violation Claims** | Legal / Security | High | Continuous tracking during driver off-hours | Geolocation tracking strictly tied to active shift toggle |

---

## 11. Missing Requirements & Clarification Questions
- [ ] **Q1:** What is the required SLA for customer ETA updates (real-time continuous vs. periodic every 30 seconds)?
- [ ] **Q2:** Are drivers required to collect recipient digital signatures, photos, or OTP codes on delivery completion?
- [ ] **Q3:** Does the platform need to support multi-tenant isolation for third-party courier partner companies?

---

## 12. Engineering Verdict
- **System Complexity Class:** **Distributed System Class**
- **Core Architectural Hurdle:** Decoupling 2,500 write operations/sec from the persistence layer while maintaining real-time sub-200ms push latency to customers over mobile networks.
- **Next Pipeline Recommendation:**
  - Run `/proj-init --project-name FleetTracker --type backend --stack "fastapi, redis, flutter" --constraints "offline-first, low-bandwidth"` to build the MVP scope and product backlog.
  - Or proceed to `/design --project-name FleetTracker --type distributed --scale large` to construct the production DDL schemas and API contracts.
