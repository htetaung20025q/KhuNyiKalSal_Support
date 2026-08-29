---
name: auto-debug
description: >-
  Phase 8 of the SDLC Pipeline. Senior Staff Software Engineer, Debugging Specialist, and Production Reliability Engineer.
  Analyzes broken code, runtime exceptions, failing tests, or concurrency deadlocks across latest tech stacks
  (Python 3.12, PostgreSQL 16, SQLAlchemy 2.0 Async, Redis 7.2+, Flutter 3.22+), determines root cause, and applies minimal,
  safe, production-grade self-healing fixes while strictly preserving the original architecture, API contracts, and system scope.
  Triggered via `/debug`, `/auto-debug`, or natural language requests for fixing bugs.
---

# Auto Debugging & Self-Healing Engineering Engine

## SDLC Pipeline Integration
This skill represents **Phase 8 (Production Reliability & Self-Healing Debugging)** in the 10-phase SDLC engineering operating system:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Dependencies (from [Phase 7: `/test`](../test/SKILL.md)):** Ingests broken code, failing unit/integration tests, runtime stack traces, database deadlocks, or performance regression logs.
- **Downstream Handoffs:** Delivers minimal, targeted diffs and patches back to the codebase with zero regression before production deployment in [Phase 9: `/publish`](../publish/SKILL.md).

---

## When to Use
- When unit, integration, or concurrency test suites fail during `/test` or `/build`.
- When runtime exceptions (`500 Internal Server Error`, `IntegrityError`, `DeadlockDetected`) occur.
- When data drift, race conditions, or memory leaks are detected in Python 3.12, PostgreSQL 16, Redis 7.2, or Flutter 3.22+.
- When the user provides an error trace or runs `/debug` / `/auto-debug`.

---

## Command Format
```bash
/debug --code <path_or_snippet> --error <stack_trace_or_description> [options]
```

### Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--error` / `--issue` | `string` | **Yes** | Error message, stack trace, failed test log, or bug description. |
| `--code` / `--file` | `string` | No | File path or code snippet where the failure originated. |
| `--test` / `--repro` | `string` | No | Reproduction steps, test command, or expected vs. actual behavior. |
| `--severity` | `enum` | No | Failure impact: `low`, `medium`, `critical`. Default: `medium`. |

### Example Invocations
```bash
# Debug a database race condition / concurrency error in SQLAlchemy 2.0 Async
/debug --file "app/services/stock_service.py" --error "IntegrityError: duplicate key value violates unique constraint 'uq_stock_movement'"

# Debug an unhandled async timeout in telemetry gateway
/debug --file "app/api/v1/telemetry.py" --error "asyncio.exceptions.TimeoutError: Redis Stream buffer saturated during load test"
```

---

## Strict Debugging Rules

1. **Zero Redesign Principle**:
   - Do **NOT** change system architecture.
   - Do **NOT** add new unrelated features or rewrite modules.
   - Do **NOT** modify API contracts unless explicitly required to resolve the bug.
2. **Minimal & Targeted Patch**:
   - Identify the exact root cause and apply the smallest possible correct change.
   - Keep changes isolated to prevent regression.
3. **Preserve System Invariants**:
   - Maintain backward compatibility.
   - Preserve database integrity and transactional boundaries.
4. **Root Cause Analysis (No Hacky Workarounds)**:
   - Fix the underlying race condition, off-by-one error, or unhandled null state rather than masking it with broad `try/except Exception: pass` blocks.

---

## Debugging Methodology (7 Steps)

1. **Root Cause Analysis (RCA)**:
   - Identify exact failure line, exception type (logic bug, concurrency race condition, ORM/DB deadlock, schema mismatch, unhandled edge case).
2. **Impact & Blast Radius Analysis**:
   - Determine severity (`Low`, `Medium`, `Critical`), affected modules, and downstream data integrity risks.
3. **Fix Strategy Selection**:
   - Select one: `Minimal Patch Fix` (preferred), `Targeted Concurrency Correction`, `Safety Validation Fix`, or `Performance Hotfix`.
4. **Implementation Justification**:
   - Explain what will change, why the minimal fix is sufficient, and why no architecture redesign is necessary.
5. **Apply Corrected Code**:
   - Deliver complete, drop-in replacement code for the affected section or file.
6. **Regression Safety Check**:
   - Confirm existing API contracts remain intact, migrations are safe, and edge cases are covered.
7. **Complexity & Performance Review**:
   - Verify that the patch does not degrade Big-O time/space complexity or introduce memory leaks.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# Auto Debugging & Root Cause Analysis Report

## 1. Root Cause Analysis (RCA)
- **Error Signature:** `[Exception Class: Exact Message]`
- **Root Cause Category:** [Logic Bug | Concurrency Race | ORM Mapping | Deadlock | Network Timeout | Unhandled Null]
- **Fault Line & Context:** `[file_path.py:line_number]`
- **Failure Trigger:** [Explanation of what sequence of events or inputs triggered the fault]

---

## 2. Blast Radius & Risk Assessment
- **Severity Level:** [Low | Medium | Critical]
- **Affected Components:** [List of dependent files/functions]
- **Data Integrity Risk:** [e.g. Risk of negative stock balance or inconsistent cache]

---

## 3. Minimal Fix Strategy
- **Strategy Selected:** [Minimal Patch Fix / Concurrency Lock / Validation Boundary]
- **Justification:** [Why this fix solves the root cause without architectural changes]

---

## 4. Code Patch

### File: `[file_path.py]`

```python
# Complete drop-in replacement or patch snippet using modern syntax
```

---

## 5. Verification & Regression Plan
- **Verification Test Command:** `pytest tests/concurrency/test_[module].py -v`
- **Expected Result:** [e.g. 50 parallel requests pass with zero race condition divergence]
- **Contract Integrity:** [Verified all existing request/response schemas unchanged]

---

## 6. Algorithmic Complexity & Health Impact
- **Time Complexity:** Unchanged at $O(1)$ / $O(\log N)$.
- **Space Complexity:** $O(1)$ memory overhead.
- **Resource Footprint:** Zero additional database roundtrips.
```

---

## Reference Example 1: Race Condition Patch (Concurrency)

### Injected Error
```text
IntegrityError: stock_levels quantity fell below zero (-3) under concurrent load
```

### Generated Fix

# Auto Debugging & Root Cause Analysis Report: Logistic

## 1. Root Cause Analysis (RCA)
- **Error Signature:** `IntegrityError: stock quantity negative`
- **Root Cause Category:** Concurrency Race Condition (Missing Row-Level Lock).
- **Fault Line:** `app/services/stock_service.py:32`
- **Trigger:** Multiple concurrent async coroutines read the same stock record simultaneously before any could commit the decremented value, leading to race-condition overdrafts.

---

## 2. Minimal Fix Strategy
- **Selected Fix:** Upgrade repository query from `select(StockLevel)` to `select(StockLevel).with_for_update()` in PostgreSQL 16 via SQLAlchemy 2.0 Async.

---

## 3. Code Patch

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
        """Acquire pessimistic row-level write lock (SELECT FOR UPDATE) to prevent race conditions."""
        stmt = (
            select(StockLevel)
            .where(StockLevel.warehouse_id == warehouse_id, StockLevel.item_sku == item_sku)
            .with_for_update()
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
```

---

## 4. Verification & Regression Plan
- Run concurrency suite: `pytest tests/concurrency/test_stock_concurrency.py -v`.
- **Verdict:** All 20 parallel threads execute safely without negative balances.

---

## Reference Example 2: Async Timeout Recovery (Redis Stream Saturation)

### Injected Error
```text
asyncio.exceptions.TimeoutError: Redis Stream 'telemetry_stream' XADD timed out after 5s during peak ingestion load (4,200 pings/sec)
```

### Generated Fix

# Auto Debugging & Root Cause Analysis Report: FleetTracker

## 1. Root Cause Analysis (RCA)
- **Error Signature:** `asyncio.exceptions.TimeoutError` on Redis `XADD`
- **Root Cause Category:** **Network I/O Timeout (Connection Pool Exhaustion)**
- **Fault Line:** `app/services/telemetry_ingest.py:48`
- **Trigger:** Under peak traffic, all Redis 7.2 connection pool slots (default `max_connections=10`) were occupied by slow `XREADGROUP` consumers, causing `XADD` writes to queue up and exceed the 5-second timeout.

---

## 2. Blast Radius & Risk Assessment
- **Severity Level:** Critical (Telemetry data loss during peak hours)
- **Affected Components:** `telemetry_ingest.py`, `app/core/redis_client.py`
- **Data Integrity Risk:** Driver GPS pings dropped silently during timeout — no client retry triggered

---

## 3. Minimal Fix Strategy
- **Strategy Selected:** Increase Redis connection pool size and add bounded retry with exponential backoff on `XADD` timeout.
- **Justification:** Root cause is pool exhaustion under load, not Redis server failure. Increasing pool from 10 → 50 and adding a 3-retry backoff eliminates the bottleneck without architecture changes.

---

## 4. Code Patch

### File: `app/core/redis_client.py`
```python
import redis.asyncio as aioredis
from app.core.config import settings

async def get_redis_pool() -> aioredis.Redis:
    """Create Redis 7.2 connection pool with production-grade sizing."""
    return aioredis.from_url(
        settings.REDIS_URL,
        max_connections=50,           # Was: 10 (too low for peak load)
        socket_timeout=10,            # Was: 5s (insufficient for burst)
        socket_connect_timeout=5,
        retry_on_timeout=True,        # Auto-retry on transient timeouts
        decode_responses=False,
    )
```

### File: `app/services/telemetry_ingest.py`
```python
import asyncio
import structlog
import redis.asyncio as aioredis
from redis.exceptions import TimeoutError as RedisTimeout

logger = structlog.get_logger()

async def buffer_ping_to_stream(redis: aioredis.Redis, ping: dict) -> str:
    """Append telemetry ping to Redis Stream with bounded retry and backoff."""
    for attempt in range(3):
        try:
            stream_id = await redis.xadd(
                "telemetry_stream",
                ping,
                maxlen=100_000,
            )
            return stream_id
        except RedisTimeout:
            wait = 0.1 * (2 ** attempt)  # 100ms, 200ms, 400ms
            logger.warn("redis_xadd_timeout_retry", attempt=attempt + 1, backoff_ms=wait * 1000)
            await asyncio.sleep(wait)
    raise RedisTimeout("XADD failed after 3 retries — Redis pool likely saturated")
```

---

## 5. Verification & Regression Plan
- Run: `pytest tests/performance/test_telemetry_throughput.py -v --concurrency 100`
- **Expected:** Zero `TimeoutError` under 5,000 pings/sec sustained load.

---

## Reference Example 3: Deadlock Resolution (PostgreSQL Multi-Table Transaction)

### Injected Error
```text
sqlalchemy.exc.OperationalError: (psycopg.errors.DeadlockDetected) deadlock detected
DETAIL: Process 4821 waits for ShareLock on transaction 98712; blocked by process 4823.
Process 4823 waits for ShareLock on transaction 98710; blocked by process 4821.
```

### Generated Fix

# Auto Debugging & Root Cause Analysis Report: PayLedger

## 1. Root Cause Analysis (RCA)
- **Error Signature:** `DeadlockDetected` in PostgreSQL 16
- **Root Cause Category:** **Database Deadlock (Inconsistent Lock Ordering)**
- **Fault Line:** `app/services/transfer_service.py:62`
- **Trigger:** Two concurrent fund transfer transactions lock accounts in opposite order. Transaction A locks Account #101 then requests Account #202. Transaction B locks Account #202 then requests Account #101. PostgreSQL detects the circular wait and aborts one.

---

## 2. Minimal Fix Strategy
- **Strategy Selected:** Enforce canonical lock ordering — always lock accounts by ascending `account_id` regardless of debit/credit direction.
- **Justification:** Consistent lock ordering eliminates circular wait dependency without changing transaction isolation or architecture.

---

## 3. Code Patch

### File: `app/services/transfer_service.py`
```python
from decimal import Decimal
from uuid import UUID
from app.core.exceptions import InsufficientFundsException

async def transfer_funds(
    self, from_account_id: UUID, to_account_id: UUID, amount: Decimal, reason: str
) -> dict:
    """Execute double-entry fund transfer with deadlock-safe canonical lock ordering."""
    # CRITICAL FIX: Always lock accounts in ascending UUID order to prevent deadlocks
    first_id, second_id = sorted([from_account_id, to_account_id])

    async with self.session.begin():
        first_acct = await self.repo.get_account_for_update(first_id)
        second_acct = await self.repo.get_account_for_update(second_id)

        # Map back to debit/credit roles
        debit_acct = first_acct if first_id == from_account_id else second_acct
        credit_acct = second_acct if second_id == to_account_id else first_acct

        if debit_acct.balance < amount:
            raise InsufficientFundsException(debit_acct.id, amount, debit_acct.balance)

        debit_acct.balance -= amount
        credit_acct.balance += amount
        debit_acct.version_id += 1
        credit_acct.version_id += 1
```

---

## 4. Verification & Regression Plan
- Run: `pytest tests/concurrency/test_transfer_deadlock.py -v` (50 bidirectional transfers between same 2 accounts)
- **Expected:** Zero `DeadlockDetected` exceptions, all transfers complete with balanced ledger.

---

## Reference Example 4: Alembic Migration Failure Recovery

### Injected Error
```text
alembic.util.exc.CommandError: Can't locate revision identified by 'a3f8b2c1d4e5'
FAILED: Target database is not up to date.
```

### Generated Fix

# Auto Debugging & Root Cause Analysis Report: LogisticInventory

## 1. Root Cause Analysis (RCA)
- **Error Signature:** `CommandError: Can't locate revision`
- **Root Cause Category:** **Schema Migration Drift (Missing Intermediate Revision)**
- **Fault Line:** `alembic/versions/` directory
- **Trigger:** A developer ran `alembic revision --autogenerate` locally, committed the migration file but didn't push the intermediate revision that it depends on. The `down_revision` pointer references a non-existent parent migration.

---

## 2. Minimal Fix Strategy
- **Strategy Selected:** Stamp the database to current actual state, then merge migration heads.
- **Justification:** The database schema is correct — only the Alembic tracking table is out of sync. No DDL changes needed.

---

## 3. Recovery Steps
```bash
# Step 1: Check current heads
alembic heads

# Step 2: Check actual database revision
alembic current

# Step 3: If multiple heads exist, merge them
alembic merge heads -m "merge_diverged_revisions"

# Step 4: Stamp database to actual current state (no DDL executed)
alembic stamp head

# Step 5: Verify clean state
alembic check
```

---

## 4. Prevention Rule
- Add to CI/CD pipeline: `alembic check` must pass with zero drift before merge is allowed.
- Enforce single-head policy: `alembic heads` must return exactly 1 revision.

