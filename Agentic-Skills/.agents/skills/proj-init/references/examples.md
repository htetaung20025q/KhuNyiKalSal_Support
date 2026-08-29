# Reference Examples: Agile Project Initialization (CLI Command)

---

## Example 1: Logistic Backend Service

### Command Invocation
```bash
/proj-init --project-name Logistic --type backend
```

### Generated Output

### Project Overview
- **Name:** Logistic
- **Type:** Backend
- **Stack:** FastAPI (Python), PostgreSQL, SQLAlchemy 2.0, Alembic
- **Description:** A high-performance, modular logistics backend API providing inventory management, stock tracking, and warehouse dispatch orchestration.
- **Target Users:** Warehouse managers, inventory clerks, logistics dispatchers.

### MVP Scope
- **Core Features:**
  - Inventory item registration and SKU management.
  - Real-time stock quantity tracking (inflow / outflow).
  - Basic order dispatch status updates.
- **Out of Scope (Post-MVP):**
  - Automated route optimization.
  - Multi-warehouse automated freight bidding.
  - Barcode / RFID scanner hardware SDK integrations.

### User Personas

#### Persona 1: Ko Zaw (Warehouse Clerk)
- **Role:** Inventory & Stock Operator
- **Needs:** Fast, low-latency API to update stock count and log receipt of shipments without manual spreadsheets.

#### Persona 2: Daw Nu (Logistics Manager)
- **Role:** Operations Supervisor
- **Needs:** Real-time visibility into stock availability and low-stock alerts across storage zones.

### User Stories
- **US-01:** As a warehouse staff, I want to track stock so that I can manage inventory efficiently.
- **US-02:** As a warehouse clerk, I want to record incoming shipments via API so that inventory counts update automatically.
- **US-03:** As a manager, I want to query current SKU stock levels so that I can prevent stockouts.

### Product Backlog

| ID | Feature | Priority | Description | Acceptance Criteria |
|:---|:--------|:---------|:------------|:--------------------|
| 1  | Item & SKU Management | High | CRUD operations for inventory items | Create/Read/Update/Delete item with unique SKU code |
| 2  | Stock In/Out Tracking | High | Endpoint to increment/decrement inventory | Atomic transaction ensures no race conditions on stock |
| 3  | Low-Stock Thresholds | Medium | Query items below defined threshold | Returns list of items where `quantity <= min_threshold` |
| 4  | Dispatch Order Status | Medium | Update status of dispatch batches | Status changes from `Pending` -> `Dispatched` -> `Delivered` |
| 5  | Audit Log Export | Low | CSV export of stock movements | Generates timestamped audit log of all balance changes |

### Sprint Plan

#### Sprint 0 (Setup & Architecture)
- [ ] Initialize repository with FastAPI project template.
- [ ] Configure PostgreSQL database connection and Alembic migration pipeline.
- [ ] Define environment configuration (`config.py`) using Pydantic Settings.
- [ ] Setup Docker Compose for local PostgreSQL and Redis instance.
- [ ] Setup `pytest`, `ruff`, and pre-commit hooks.

#### Sprint 1 (Core Inventory API Development)
- [ ] Build `Item` and `StockMovement` database models.
- [ ] Implement `POST /api/v1/items` and `GET /api/v1/items/{sku}` endpoints.
- [ ] Implement `POST /api/v1/inventory/adjust` transaction endpoint for stock in/out.
- [ ] Write unit & integration tests for concurrency and stock calculations.
- [ ] Generate OpenAPI/Swagger documentation.

### Folder Structure
```text
logistic/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── health.py
│   │   │       │   ├── inventory.py
│   │   │       │   └── items.py
│   │   │       └── router.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── crud/
│   │   │   ├── crud_inventory.py
│   │   │   └── crud_item.py
│   │   ├── models/
│   │   │   ├── item.py
│   │   │   └── stock_movement.py
│   │   ├── schemas/
│   │   │   ├── inventory.py
│   │   │   └── item.py
│   │   └── main.py
│   ├── alembic/
│   ├── tests/
│   │   ├── test_inventory.py
│   │   └── test_items.py
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── requirements.txt
└── docs/
    └── api_spec.md
```

### Initial Tasks
- [ ] Initialize git repository.
- [ ] Setup FastAPI virtual environment and install dependencies (`fastapi`, `uvicorn`, `sqlalchemy`, `alembic`, `psycopg2-binary`).
- [ ] Define initial database schema and migration script for items and stock movements.
- [ ] Implement and verify `/api/v1/health` endpoint.

---

## Example 2: Emergency SOS Mobile App

### Command Invocation
```bash
/proj-init --project-name SOSApp --type mobile --stack flutter --constraints offline-first
```

### Generated Output

### Project Overview
- **Name:** SOSApp
- **Type:** Mobile (Cross-Platform)
- **Stack:** Flutter (Dart), Hive (Local DB), Geolocator, FastAPI Backend (Python)
- **Constraints:** Offline-first, intermittent 2G/3G low-bandwidth resilience, SMS fallback.
- **Description:** A fast-trigger emergency alert mobile application designed for low-connectivity environments, enabling users to send distress alerts and location data with instant SMS fallback and local caching.
- **Target Users:** General citizens, commuters, volunteer community responders.

### MVP Scope
- **Core Features:**
  - One-tap SOS trigger with SMS/HTTP auto-fallback.
  - GPS coordinate capture and offline queueing in Hive DB.
  - Emergency contact broadcast.
- **Out of Scope (Post-MVP):**
  - Live video/audio streaming.
  - VoIP direct dispatch.
  - Wearable device hardware integration.

### User Personas

#### Persona 1: Ko Aung (Citizen)
- **Role:** Daily Commuter
- **Needs:** Instant, one-tap way to send emergency alert even when cellular data is disconnected.

#### Persona 2: Daw Hla (First Responder)
- **Role:** Volunteer Rescue Worker
- **Needs:** Clear, immediate distress notification with caller GPS location.

### User Stories
- **US-01:** As a citizen, I want to trigger an SOS alert with a single button press so that I can request urgent help.
- **US-02:** As a citizen, I want my alert to send via SMS if internet data fails so that my alert is never lost.
- **US-03:** As a responder, I want to receive alert coordinates so that I can locate the user quickly.

### Product Backlog

| ID | Feature | Priority | Description | Acceptance Criteria |
|:---|:--------|:---------|:------------|:--------------------|
| 1  | One-Tap SOS Button | High | High-visibility emergency trigger | Initiates alert payload within <500ms of tap |
| 2  | GPS Location Capture | High | Retrieve device lat/long coordinates | Obtains coordinates with <20m accuracy |
| 3  | Offline Queue & SMS Fallback | High | Store locally and switch to SMS if offline | Auto-triggers SMS if network ping fails |
| 4  | Responder Push Notification | Medium | Dispatch alert to nearby volunteers | Responders receive notification within <3s |
| 5  | Alert History Log | Low | Local log of triggered alerts | Viewable offline in app history view |

### Sprint Plan

#### Sprint 0 (Setup & Scaffolding)
- [ ] Create Flutter workspace with clean architecture.
- [ ] Configure Hive local database and encryption adapters.
- [ ] Setup FastAPI backend repository for alert ingest.
- [ ] Configure Android and iOS permissions for Background Location and SMS.

#### Sprint 1 (Core SOS Trigger & Offline Pipeline)
- [ ] **Frontend:** Build high-contrast emergency SOS home screen with animated button.
- [ ] **Frontend:** Implement location capture service using `geolocator`.
- [ ] **Frontend:** Implement offline sync service using Hive + SMS fallback logic.
- [ ] **Backend:** Implement `POST /api/v1/alerts` ingestion endpoint in FastAPI.
- [ ] **Integration:** Test end-to-end trigger in simulated airplane mode and verify SMS fallback.

### Folder Structure
```text
sosapp/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/alerts.py
│   │   ├── core/config.py
│   │   ├── models/alert.py
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── lib/
│   │   ├── core/
│   │   │   ├── network/
│   │   │   ├── offline/
│   │   │   └── theme/
│   │   ├── models/alert_model.dart
│   │   ├── providers/sos_provider.dart
│   │   ├── screens/sos_screen.dart
│   │   └── main.dart
│   └── pubspec.yaml
└── docs/
```

### Initial Tasks
- [ ] Setup Flutter project with `provider`, `hive`, and `geolocator`.
- [ ] Configure location permissions in AndroidManifest.xml and Info.plist.
- [ ] Scaffold backend alert endpoint in FastAPI.
- [ ] Implement Hive local cache model for alerts.
