---
name: code-generation
description: >-
  Phase 6 of the SDLC Pipeline. Senior Staff Software Engineer and Production Code Generation Engine.
  Converts `/design` blueprints, `/plan` sprint DAG tasks, or single engineering tasks into clean, scalable,
  layered production-grade code using latest tech stack versions (Python 3.12, FastAPI 0.111+, Pydantic v2, SQLAlchemy 2.0 async, Flutter 3.22+, Next.js 14+ App Router).
  Triggered via `/build`, `/code`, or natural language requests for code generation.
---

# Production Code Generation Engine

## SDLC Pipeline Integration
This skill represents **Phase 6 (Production Code Generation & Implementation)** in the 10-phase engineering pipeline:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Dependencies:**
  - **From [Phase 4: `/design`](../system-design/SKILL.md):** Ingests database DDL schemas, API contracts, in-memory data structures, caching layers, and security policies.
  - **From [Phase 5: `/plan`](../plan/SKILL.md):** Ingests the task Direct Acyclic Graph (DAG), atomic task IDs (T-01, T-02), file paths, and dependency sequences.
- **Downstream Handoff (to [Phase 7: `/test`](../test/SKILL.md)):** Delivers clean, tested code ready for unit, integration, concurrency, and chaos validation.

---

## Modern Tech Stack Standards (Latest Versions)

All generated code must adhere to current production LTS / stable standards:
- **Backend:** Python `3.12+` / FastAPI `0.111+` / Pydantic `v2.7+` (strict type models, `model_config = ConfigDict(from_attributes=True)`).
- **ORM / Persistence:** SQLAlchemy `2.0+` async syntax (`AsyncSession`, `select()`, typed `Mapped[...]` and `mapped_column(...)`, Alembic `1.13+`).
- **Database & Cache:** PostgreSQL `16` (PostGIS 3.4) & Redis `7.2+` (Redis Streams with consumer groups, Redis Geo).
- **Web Frontend:** Next.js `14+` / `15` (App Router, React Server Components), TypeScript `5.4+`, TailwindCSS `v3.4+` or Vanilla Modern CSS with CSS custom properties.
- **Mobile Frontend:** Flutter `3.22+` / Dart `3.4+` (Material 3 theme, Riverpod `2.5+` / BLoC `8.1+`, `sqflite` / `hive_flutter` offline storage).

---

## When to Use
- When implementing production code from a completed `/design` blueprint or `/plan` sprint plan.
- When generating clean, modular code for a specific DAG task.
- When the user runs `/build` or `/code`.

---

## Command Format
```bash
/build --project-name <name> --task <task_id_or_description> [options]
```

### Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--project-name` / `--name` | `string` | **Yes** | Name of the project or subsystem. |
| `--task` / `--scope` | `string` | **Yes** | Task ID (e.g. `T-02`), feature name, or scope to implement. |
| `--design` | `string` | No | Reference to `/design` blueprint or DDL specifications. |
| `--plan` | `string` | No | Reference to `/plan` DAG or sprint table. |
| `--stack` | `string` | No | Target framework (e.g. `fastapi`, `flutter`, `nextjs`). |

---

## Strict Implementation Rules

1. **Zero Redesign Principle**:
   - Follow the given `/design` architecture and `/plan` DAG strictly.
   - Do **NOT** invent new features, extra endpoints, or unnecessary abstraction modules.
2. **Layered Architecture Compliance**:
   - `API / Controller Layer` &rarr; Request validation, routing, HTTP status codes, error mapping.
   - `Service / Business Logic Layer` &rarr; Core business invariants, transaction coordination.
   - `Repository / Data Access Layer` &rarr; Direct SQL/ORM operations, query optimization, connection pooling.
   - `Core / Utilities` &rarr; Configuration, security, logging, exceptions.
3. **Pydantic v2 & Modern Typing**:
   - Use Pydantic v2 syntax (`field_validator`, `model_validator(mode='before')`).
   - Use Python 3.12 union syntax (`int | None` instead of `Optional[int]`).
4. **Performance & Concurrency Awareness**:
   - Eliminate SQL N+1 hazards with explicit joins (`selectinload`, `joinedload`).
   - Enforce database row locks (`SELECT FOR UPDATE`) for concurrent mutating transactions.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# Implementation Summary: [Project Name] - [Task ID / Scope]

## 1. Implementation Scope & Summary
- **Target Task:** [Task ID and Description]
- **Implemented Scope:** [Exact functional capabilities implemented]
- **Tech Stack & Versions:** [Python 3.12, FastAPI 0.111+, SQLAlchemy 2.0 Async, PostgreSQL 16, Redis 7.2]

---

## 2. File Structure
```text
app/
├── api/
│   ├── v1/
│   │   └── [router_file].py
│   └── dependencies.py
├── services/
│   └── [service_file].py
├── repositories/
│   └── [repo_file].py
├── models/
│   ├── domain/
│   ├── orm/
│   └── schemas/
├── core/
│   ├── config.py
│   ├── exceptions.py
│   └── logging.py
└── main.py
```

---

## 3. Code Implementation

### File: `app/models/orm/inventory.py` (SQLAlchemy 2.0 Async Mapped)
```python
import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, UniqueConstraint, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class StockLevel(Base):
    __tablename__ = "stock_levels"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    warehouse_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False, index=True)
    item_sku: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    version_id: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    __table_args__ = (
        UniqueConstraint("warehouse_id", "item_sku", name="uq_warehouse_sku"),
        Index("idx_stock_levels_warehouse_sku", "warehouse_id", "item_sku"),
    )
```

### File: `app/models/schemas/inventory.py` (Pydantic v2)
```python
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict

class StockAdjustmentRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    warehouse_id: UUID = Field(..., description="Target warehouse UUID")
    item_sku: str = Field(..., min_length=3, max_length=64, description="Unique product SKU")
    delta: int = Field(..., description="Quantity delta (positive for restock, negative for deduction)")
    reason: str = Field(..., min_length=3, max_length=255, description="Audit reason for stock change")

class StockAdjustmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    item_sku: str
    warehouse_id: UUID
    new_quantity: int
    version_id: int
```

### File: `app/repositories/stock_repository.py`
```python
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.orm.inventory import StockLevel

class StockRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_sku_for_update(self, warehouse_id: UUID, item_sku: str) -> StockLevel | None:
        """Fetch stock record with row-level write lock (SELECT FOR UPDATE in PostgreSQL 16)."""
        stmt = (
            select(StockLevel)
            .where(StockLevel.warehouse_id == warehouse_id, StockLevel.item_sku == item_sku)
            .with_for_update()
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def save(self, stock: StockLevel) -> StockLevel:
        self.session.add(stock)
        await self.session.flush()
        return stock
```

### File: `app/services/stock_service.py`
```python
import structlog
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.stock_repository import StockRepository
from app.core.exceptions import ItemNotFoundException, InsufficientStockException

logger = structlog.get_logger()

class StockAdjustmentService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.repo = StockRepository(session)

    async def adjust_stock(self, warehouse_id: UUID, item_sku: str, delta: int, reason: str) -> int:
        """Atomically adjust stock level under a row lock."""
        log = logger.bind(warehouse_id=str(warehouse_id), item_sku=item_sku, delta=delta, reason=reason)
        log.info("starting_stock_adjustment")

        stock = await self.repo.get_by_sku_for_update(warehouse_id, item_sku)
        if not stock:
            log.warn("stock_record_missing")
            raise ItemNotFoundException(item_sku)

        new_quantity = stock.quantity + delta
        if new_quantity < 0:
            log.warn("stock_insufficient", current=stock.quantity, requested_reduction=abs(delta))
            raise InsufficientStockException(item_sku=item_sku, requested=abs(delta), available=stock.quantity)

        stock.quantity = new_quantity
        stock.version_id += 1
        await self.repo.save(stock)
        await self.session.commit()

        log.info("stock_adjusted_successfully", new_quantity=new_quantity, version=stock.version_id)
        return new_quantity
```

---

## 4. Algorithmic Complexity & Concurrency
- **Row Lock Acquisition:** $O(\log N)$ B-Tree index seek on `(warehouse_id, item_sku)` in PostgreSQL 16.
- **In-Memory Adjustment:** $O(1)$ arithmetic computation.
- **Lock Release:** $O(1)$ on transaction commit.

---

## 5. Next Steps
- Run `/test --target app/services/stock_service.py --type concurrency` to validate concurrency resilience.
```

---

## Reference Example 2: Flutter 3.22+ Mobile Client (Offline-First Barcode Scanner)

### Command Invocation
```bash
/build --project-name "Logistic" --task "T-05: Implement barcode scanner screen with optimistic local update and background HTTP sync" --stack flutter
```

### Generated Output

# Implementation Summary: Logistic - T-05 (Flutter Barcode Scanner)

## 1. Implementation Scope & Summary
- **Target Task:** T-05: Barcode scanner with offline-first optimistic stock adjustments
- **Implemented Scope:** Scanner screen, local Hive cache, background HTTP sync with retry queue
- **Tech Stack & Versions:** Flutter 3.22+, Dart 3.4+, Riverpod 2.5+, Dio 5.4+, Hive Flutter 2.1+

---

## 2. File Structure
```text
lib/
├── features/
│   └── scanner/
│       ├── presentation/
│       │   └── scanner_screen.dart
│       ├── data/
│       │   ├── scanner_repository.dart
│       │   └── local_cache.dart
│       └── domain/
│           └── scan_event.dart
├── core/
│   ├── network/
│   │   └── api_client.dart
│   └── providers.dart
└── main.dart
```

---

## 3. Code Implementation

### File: `lib/features/scanner/domain/scan_event.dart`
```dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'scan_event.freezed.dart';
part 'scan_event.g.dart';

@freezed
class ScanEvent with _$ScanEvent {
  const factory ScanEvent({
    required String id,
    required String itemSku,
    required String warehouseId,
    required int delta,
    required String reason,
    required DateTime scannedAt,
    @Default(false) bool synced,
  }) = _ScanEvent;

  factory ScanEvent.fromJson(Map<String, dynamic> json) => _$ScanEventFromJson(json);
}
```

### File: `lib/features/scanner/data/local_cache.dart`
```dart
import 'package:hive_flutter/hive_flutter.dart';
import '../domain/scan_event.dart';

class ScanLocalCache {
  static const _boxName = 'pending_scans';

  Future<Box<Map>> _openBox() async => Hive.openBox<Map>(_boxName);

  /// Queue a scan event locally for offline-first sync
  Future<void> enqueue(ScanEvent event) async {
    final box = await _openBox();
    await box.put(event.id, event.toJson());
  }

  /// Get all unsynced events (FIFO order)
  Future<List<ScanEvent>> getPending() async {
    final box = await _openBox();
    return box.values
        .map((json) => ScanEvent.fromJson(Map<String, dynamic>.from(json)))
        .where((e) => !e.synced)
        .toList()
      ..sort((a, b) => a.scannedAt.compareTo(b.scannedAt));
  }

  /// Mark event as synced after successful HTTP push
  Future<void> markSynced(String eventId) async {
    final box = await _openBox();
    final json = box.get(eventId);
    if (json != null) {
      json['synced'] = true;
      await box.put(eventId, json);
    }
  }
}
```

### File: `lib/features/scanner/data/scanner_repository.dart`
```dart
import 'package:dio/dio.dart';
import '../domain/scan_event.dart';
import 'local_cache.dart';

class ScannerRepository {
  final Dio _dio;
  final ScanLocalCache _cache;

  ScannerRepository(this._dio, this._cache);

  /// Optimistic local-first scan: cache immediately, sync in background
  Future<void> submitScan(ScanEvent event) async {
    // Step 1: Write to local Hive cache immediately (< 1ms)
    await _cache.enqueue(event);

    // Step 2: Attempt background HTTP push with 3-retry exponential backoff
    for (int attempt = 0; attempt < 3; attempt++) {
      try {
        await _dio.post(
          '/api/v1/inventory/adjustments',
          data: event.toJson(),
          options: Options(headers: {'Idempotency-Key': event.id}),
        );
        await _cache.markSynced(event.id);
        return;
      } on DioException catch (_) {
        await Future.delayed(Duration(milliseconds: 200 * (1 << attempt)));
      }
    }
    // Event remains in local cache for next sync cycle
  }
}
```

---

## Reference Example 3: Next.js 14+ App Router (Server Component Dashboard)

### Command Invocation
```bash
/build --project-name "FleetTracker" --task "T-04: Implement real-time fleet dashboard with server components and SSE live updates" --stack nextjs
```

### Generated Output

# Implementation Summary: FleetTracker - T-04 (Next.js Dashboard)

## 1. Implementation Scope & Summary
- **Target Task:** T-04: Real-time fleet dashboard with Server Components + SSE
- **Implemented Scope:** Server-rendered vehicle list, client-side SSE live map, TypeScript API client
- **Tech Stack & Versions:** Next.js 14+ (App Router), TypeScript 5.4+, React 18.3, Vanilla CSS with custom properties

---

## 2. File Structure
```text
app/
├── dashboard/
│   ├── page.tsx          (Server Component — fleet list)
│   ├── live-map.tsx      (Client Component — SSE live updates)
│   └── dashboard.module.css
├── api/
│   └── tracking/
│       └── stream/
│           └── route.ts  (SSE endpoint)
├── lib/
│   ├── api-client.ts
│   └── types.ts
├── layout.tsx
└── globals.css
```

---

## 3. Code Implementation

### File: `app/lib/types.ts`
```typescript
export interface VehiclePosition {
  vehicleId: string;
  driverName: string;
  lat: number;
  lng: number;
  speedKmh: number;
  lastUpdated: string;
  status: 'active' | 'idle' | 'offline';
}
```

### File: `app/dashboard/page.tsx` (React Server Component)
```tsx
import { VehiclePosition } from '@/app/lib/types';
import LiveMap from './live-map';
import styles from './dashboard.module.css';

async function getActiveVehicles(): Promise<VehiclePosition[]> {
  const res = await fetch(`${process.env.API_URL}/api/v1/tracking/vehicles`, {
    next: { revalidate: 30 },  // ISR: revalidate every 30 seconds
  });
  if (!res.ok) throw new Error('Failed to fetch vehicles');
  return res.json();
}

export default async function DashboardPage() {
  const vehicles = await getActiveVehicles();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Fleet Dashboard</h1>
      <div className={styles.grid}>
        <section className={styles.vehicleList}>
          <h2>Active Vehicles ({vehicles.length})</h2>
          {vehicles.map((v) => (
            <div key={v.vehicleId} className={styles.vehicleCard}>
              <span className={styles.driverName}>{v.driverName}</span>
              <span className={styles.speed}>{v.speedKmh} km/h</span>
              <span className={`${styles.status} ${styles[v.status]}`}>
                {v.status}
              </span>
            </div>
          ))}
        </section>
        <section className={styles.mapSection}>
          <LiveMap initialVehicles={vehicles} />
        </section>
      </div>
    </main>
  );
}
```

### File: `app/dashboard/live-map.tsx` (Client Component with SSE)
```tsx
'use client';

import { useEffect, useState } from 'react';
import type { VehiclePosition } from '@/app/lib/types';

interface Props {
  initialVehicles: VehiclePosition[];
}

export default function LiveMap({ initialVehicles }: Props) {
  const [vehicles, setVehicles] = useState<VehiclePosition[]>(initialVehicles);

  useEffect(() => {
    const eventSource = new EventSource('/api/tracking/stream');

    eventSource.onmessage = (event) => {
      const update: VehiclePosition = JSON.parse(event.data);
      setVehicles((prev) =>
        prev.map((v) => (v.vehicleId === update.vehicleId ? update : v))
      );
    };

    eventSource.onerror = () => {
      eventSource.close();
      // Auto-reconnect after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', background: 'var(--bg-surface)' }}>
      {vehicles.map((v) => (
        <div
          key={v.vehicleId}
          title={`${v.driverName} — ${v.speedKmh} km/h`}
          style={{
            position: 'absolute',
            left: `${((v.lng + 180) / 360) * 100}%`,
            top: `${((90 - v.lat) / 180) * 100}%`,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: v.status === 'active' ? 'var(--color-success)' : 'var(--color-muted)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      ))}
    </div>
  );
}
```

