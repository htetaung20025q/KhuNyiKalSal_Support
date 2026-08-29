---
name: test
description: >-
  Phase 7 of the SDLC Pipeline. Senior QA Engineer, Test Automation Architect, and Production Reliability Validator.
  Designs, generates, and executes comprehensive unit, integration, end-to-end, negative, performance, and chaos reliability test suites
  using latest testing frameworks (Pytest 8.2+, pytest-asyncio 0.23+, httpx 0.27+, Python 3.12, Flutter test 3.22+)
  for implemented code from `/build` or fixed code from `/debug`. Enforces production quality gates before deployment.
  Triggered via `/test`, `/qa`, or natural language requests for test generation and quality validation.
---

# Production Testing & Quality Assurance Engine

## SDLC Pipeline Integration
This skill represents **Phase 7 (Production Testing & Quality Assurance Validation)** in the 10-phase SDLC engineering pipeline:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Dependencies:**
  - **From [Phase 4: `/design`](../system-design/SKILL.md):** Ingests API contracts, DDL constraints, idempotency rules, and latency SLOs.
  - **From [Phase 6: `/build`](../code-generation/SKILL.md):** Ingests implemented code files, models, services, and routers.
- **Downstream Handoff (to [Phase 8: `/debug`](../auto-debug/SKILL.md)):** If test execution produces failures, race condition errors, or latency regressions, outputs hand off directly to the Self-Healing Debugging Engine with detailed reproduction traces.

---

## Modern Tech Stack & Testing Frameworks (Latest Versions)

- **Test Framework:** `pytest 8.2+` with `pytest-asyncio 0.23+` (`asyncio_mode = "auto"`).
- **HTTP & API Mocking:** `httpx 0.27+` (`AsyncClient(transport=ASGITransport(app=app))`), `respx 0.21+`.
- **Database Isolation:** PostgreSQL 16 test transactions with auto-rollback or SQLite in-memory with `aiosqlite 0.20+`.
- **Load & Concurrency:** `asyncio.gather` parallel stress worker harness, `locust 2.29+`.
- **Mobile Testing:** Flutter test runner (`flutter test`, `flutter_test`, `integration_test` in Flutter 3.22+).

---

## When to Use
- When validating newly implemented code from `/build` prior to release.
- When generating comprehensive unit, integration, and concurrency test suites.
- When performing negative scenario testing (malformed inputs, unauthorized access, boundary violations).
- When benchmarking performance under load or injecting chaos/network failure conditions.
- When the user runs `/test` or `/qa`.

---

## Command Format
```bash
/test --project-name <name> --target <file_or_endpoint_or_module> [options]
```

### Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--project-name` / `--name` | `string` | **Yes** | Name of the project or subsystem. |
| `--target` / `--scope` | `string` | **Yes** | Target file, endpoint, module, or test scope (e.g., `app/services/stock_service.py`, `POST /api/v1/telemetry`). |
| `--type` | `enum` | No | Test focus: `all` (default), `unit`, `integration`, `e2e`, `concurrency`, `performance`, `reliability`. |
| `--concurrency` | `integer` | No | Simulated concurrent users for concurrency/stress tests (e.g., `50`, `100`). |
| `--framework` | `string` | No | Test runner framework (`pytest` 8.2+, `flutter_test`). Default: `pytest`. |

### Example Invocations
```bash
# Validate stock adjustment service concurrency & negative paths
/test --project-name "Logistic" --target "app/services/stock_service.py" --type concurrency --concurrency 50

# Generate full test suite for real-time telemetry API
/test --project-name "FleetTracker" --target "app/api/v1/telemetry.py" --type all
```

---

## Strict Testing Rules

1. **Zero Code Modification Principle**:
   - Do **NOT** modify production code files.
   - Do **NOT** redesign the system or add new application features.
   - Strictly generate tests, fixtures, mocks, and validation suites.
2. **Failure-First Mindset**:
   - Think like a Google QA + SRE engineer.
   - Focus on failure scenarios, network timeouts, race conditions, and boundary violations, not just happy paths.
   - Assume the system **WILL** experience high concurrency and network drops in production.
3. **Deterministic & Isolated Tests**:
   - Tests must run independently with isolated database fixtures (`sqlite:///:memory:` or transactional rollback per test).
   - Zero state leakage between test cases.
4. **Actionable Assertions**:
   - Assert exact error codes (`409 CONFLICT`, `422 UNPROCESSABLE_ENTITY`, `INSUFFICIENT_STOCK`) and data invariants rather than generic `assert response.status_code != 200`.

---

## Testing Scope (6 Pillars)

1. **Unit Tests**: Function-level boundary validation, domain invariant enforcement, mock repository testing.
2. **Integration Tests**: Service + Database interaction, transactional rollback verification, API schema validation.
3. **End-to-End (E2E) Tests**: Full request lifecycle (`Client` &rarr; `API Route` &rarr; `Service` &rarr; `DB Commit` &rarr; `Response`).
4. **Negative Test Cases**: Malformed JSON, missing mandatory headers (`Idempotency-Key`), negative quantities, unauthorized tokens.
5. **Performance & Concurrency Tests**: Race condition detection (e.g., 50 parallel requests competing for 1 inventory item), p95 latency benchmarks.
6. **Chaos & Reliability Tests**: Database disconnection recovery, simulated packet loss, retry logic validation with exponential backoff.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# Production Testing & Quality Assurance Report: [Project Name]

## 1. Testing Strategy Overview
- **Target Module / Scope:** [Path to file or API route]
- **Included Testing Levels:** [Unit | Integration | E2E | Concurrency | Negative | Chaos]
- **Target SLA & Constraints:** [e.g., Latency < 100ms p95, Zero data race divergence under 50 concurrent requests]

---

## 2. Unit Tests

### File: `tests/unit/test_[module].py`

```python
# Comprehensive unit tests with mocks and boundary tests (pytest 8.2+)
```

---

## 3. Integration Tests

### File: `tests/integration/test_[module]_api.py`

```python
# Async integration tests with real/test database fixtures and httpx 0.27+
```

---

## 4. Concurrency & Race Condition Tests

### File: `tests/concurrency/test_[module]_concurrency.py`

```python
# Parallel worker simulation verifying row locking and state consistency
```

---

## 5. Negative Test Scenarios Matrix

| Scenario ID | Test Condition | Injected Input | Expected HTTP Code | Expected Error Code |
| :--- | :--- | :--- | :--- | :--- |
| **NEG-01** | Missing Idempotency Key | Header omitted on POST | `400 Bad Request` | `MISSING_IDEMPOTENCY_KEY` |
| **NEG-02** | Negative Inventory Adjustment | `delta: -100` when stock is 10 | `409 Conflict` | `INSUFFICIENT_STOCK` |
| **NEG-03** | Malformed Coordinates | `lat: 95.0` (out of range) | `422 Unprocessable` | `INVALID_COORDINATES` |

---

## 6. Performance Test Plan & Benchmarks
- **Concurrency Model:** [e.g., 50 simultaneous asynchronous workers]
- **Expected Latency Thresholds:** Ingestion p95 < 50ms, Read p95 < 100ms.
- **Bottlenecks to Observe:** Database connection pool starvation, row lock lock-wait timeouts.

---

## 7. Reliability & Chaos Scenarios
- **Scenario A (Database Timeout Injection):** Simulate database socket disconnect midway through transaction &rarr; Verify rollback and clean 503 response.
- **Scenario B (Idempotency Replay):** Re-submit exact same `Idempotency-Key` twice concurrently &rarr; Verify exactly one database mutation.

---

## 8. Coverage & Risk Analysis
- **Covered Paths:** [Core transactional path, row lock acquisition, boundary validations, negative scenarios]
- **Uncovered / Out-of-Scope Risks:** [Third-party SMS gateway outage simulation]
- **Residual Risk Level:** [Low | Medium | High]

---

## 9. Quality Verdict
- **Verdict:** **[ PASS | FAIL | NEEDS FIXES ]**
- **Action Plan:**
  - If **PASS**: Ready for deployment / merge.
  - If **FAIL**: Automatically routes to **Phase 8 ([`/debug`](../auto-debug/SKILL.md))** with failure logs.
```

---

## Reference Example: Stock Adjustment Concurrency & QA Suite

### Command Invocation
```bash
/test --project-name "Logistic" --target "app/services/stock_service.py" --type concurrency
```

### Generated Output

# Production Testing & Quality Assurance Report: Logistic

## 1. Testing Strategy Overview
- **Target Module:** `app/services/stock_service.py` & `app/repositories/stock_repository.py`
- **Included Testing Levels:** Unit, Async Integration, Concurrency (50 workers), Negative paths.
- **Target Invariant:** Inventory balance must **NEVER** drop below zero under high-concurrency race conditions.

---

## 2. Unit Tests

### File: `tests/unit/test_stock_service.py`

```python
import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from app.services.stock_service import StockAdjustmentService
from app.models.orm.inventory import StockLevel
from app.core.exceptions import InsufficientStockException, ItemNotFoundException

@pytest.mark.asyncio
async def test_adjust_stock_success():
    session = AsyncMock()
    service = StockAdjustmentService(session)
    
    mock_stock = StockLevel(id=uuid4(), warehouse_id=uuid4(), item_sku="SKU-100", quantity=50, version_id=1)
    service.repo.get_by_sku_for_update = AsyncMock(return_value=mock_stock)
    service.repo.save = AsyncMock(return_value=mock_stock)

    new_qty = await service.adjust_stock(mock_stock.warehouse_id, "SKU-100", delta=-10, reason="Dispatch")
    
    assert new_qty == 40
    assert mock_stock.quantity == 40
    assert mock_stock.version_id == 2
    session.commit.assert_awaited_once()

@pytest.mark.asyncio
async def test_adjust_stock_insufficient_raises_exception():
    session = AsyncMock()
    service = StockAdjustmentService(session)
    
    mock_stock = StockLevel(id=uuid4(), warehouse_id=uuid4(), item_sku="SKU-100", quantity=5, version_id=1)
    service.repo.get_by_sku_for_update = AsyncMock(return_value=mock_stock)

    with pytest.raises(InsufficientStockException) as exc_info:
        await service.adjust_stock(mock_stock.warehouse_id, "SKU-100", delta=-10, reason="Dispatch")
    
    assert exc_info.value.status_code == 409
    assert exc_info.value.detail["error_code"] == "INSUFFICIENT_STOCK"
    session.commit.assert_not_awaited()
```

---

## 3. Concurrency & Race Condition Tests

### File: `tests/concurrency/test_stock_concurrency.py`

```python
import pytest
import asyncio
from uuid import uuid4
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.stock_service import StockAdjustmentService
from app.models.orm.inventory import StockLevel
from app.core.exceptions import InsufficientStockException

@pytest.mark.asyncio
async def test_parallel_stock_decrements_prevent_negative_balance(async_session_factory):
    """Simulate 20 concurrent workers trying to decrement 1 unit each from an initial balance of 5.
    
    Exactly 5 requests must succeed; 15 requests must fail with InsufficientStockException.
    Final stock balance must be exactly 0.
    """
    warehouse_id = uuid4()
    sku = "SKU-STRESS-01"

    # Setup initial stock of 5 units
    async with async_session_factory() as session:
        stock = StockLevel(warehouse_id=warehouse_id, item_sku=sku, quantity=5, version_id=1)
        session.add(stock)
        await session.commit()

    async def worker_attempt():
        async with async_session_factory() as session:
            service = StockAdjustmentService(session)
            try:
                return await service.adjust_stock(warehouse_id, sku, delta=-1, reason="Flash Sale")
            except InsufficientStockException:
                return "INSUFFICIENT"

    # Execute 20 concurrent adjustment tasks
    results = await asyncio.gather(*[worker_attempt() for _ in range(20)])
    
    success_count = len([r for r in results if isinstance(r, int)])
    insufficient_count = len([r for r in results if r == "INSUFFICIENT"])

    assert success_count == 5, f"Expected 5 successes, got {success_count}"
    assert insufficient_count == 15, f"Expected 15 rejections, got {insufficient_count}"

    # Verify final persistent database state
    async with async_session_factory() as session:
        service = StockAdjustmentService(session)
        final_stock = await service.repo.get_by_sku_for_update(warehouse_id, sku)
        assert final_stock.quantity == 0, f"Expected final balance 0, got {final_stock.quantity}"
```

---

## 4. Negative Test Scenarios Matrix

| Scenario ID | Test Condition | Injected Input | Expected HTTP Code | Expected Error Code |
| :--- | :--- | :--- | :--- | :--- |
| **NEG-01** | Item SKU Not Found | `item_sku: "NON-EXISTENT"` | `404 Not Found` | `ITEM_NOT_FOUND` |
| **NEG-02** | Stock Decrement Exceeds Balance | `quantity: 5`, `delta: -6` | `409 Conflict` | `INSUFFICIENT_STOCK` |
| **NEG-03** | Missing Warehouse UUID | `warehouse_id: None` | `422 Unprocessable` | `VALIDATION_ERROR` |

---

## 5. Quality Verdict
- **Verdict:** **PASS**
- **Summary:** Concurrency row locking (`SELECT FOR UPDATE`) fully verified under 20 parallel threads; zero stock divergence; 100% negative path coverage.

---

## Reference Example 2: Flutter 3.22+ Widget & Integration Testing

### Command Invocation
```bash
/test --project-name "Logistic" --target "lib/features/scanner/data/scanner_repository.dart" --type all --framework flutter_test
```

### Generated Output

# Production Testing & Quality Assurance Report: Logistic (Flutter)

## 1. Testing Strategy Overview
- **Target Module:** `lib/features/scanner/data/scanner_repository.dart` & `local_cache.dart`
- **Included Testing Levels:** Unit (Mock Dio), Widget (Scanner Screen), Integration (Offline Queue Sync)
- **Target Invariant:** Scanned events must persist locally immediately and sync to API with exactly-once delivery via Idempotency-Key.

---

## 2. Unit Tests (Repository Layer)

### File: `test/unit/test_scanner_repository_test.dart`

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:dio/dio.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:logistic/features/scanner/data/scanner_repository.dart';
import 'package:logistic/features/scanner/data/local_cache.dart';
import 'package:logistic/features/scanner/domain/scan_event.dart';

@GenerateMocks([Dio, ScanLocalCache])
import 'test_scanner_repository_test.mocks.dart';

void main() {
  late MockDio mockDio;
  late MockScanLocalCache mockCache;
  late ScannerRepository repository;

  setUp(() {
    mockDio = MockDio();
    mockCache = MockScanLocalCache();
    repository = ScannerRepository(mockDio, mockCache);
  });

  group('ScannerRepository.submitScan', () {
    final testEvent = ScanEvent(
      id: 'scan-uuid-001',
      itemSku: 'SKU-BARCODE-42',
      warehouseId: 'wh-uuid-001',
      delta: -1,
      reason: 'Dispatch',
      scannedAt: DateTime.now(),
    );

    test('should cache locally BEFORE attempting HTTP push', () async {
      when(mockCache.enqueue(testEvent)).thenAnswer((_) async {});
      when(mockDio.post(any, data: anyNamed('data'), options: anyNamed('options')))
          .thenAnswer((_) async => Response(
                data: {'status': 'ok'},
                statusCode: 201,
                requestOptions: RequestOptions(),
              ));
      when(mockCache.markSynced(testEvent.id)).thenAnswer((_) async {});

      await repository.submitScan(testEvent);

      // Verify local cache is called FIRST (offline-first guarantee)
      verifyInOrder([
        mockCache.enqueue(testEvent),
        mockDio.post(any, data: anyNamed('data'), options: anyNamed('options')),
        mockCache.markSynced(testEvent.id),
      ]);
    });

    test('should retry 3 times with backoff on network failure', () async {
      when(mockCache.enqueue(testEvent)).thenAnswer((_) async {});
      when(mockDio.post(any, data: anyNamed('data'), options: anyNamed('options')))
          .thenThrow(DioException(
            type: DioExceptionType.connectionTimeout,
            requestOptions: RequestOptions(),
          ));

      await repository.submitScan(testEvent);

      // Should attempt 3 times then give up (event stays in cache)
      verify(mockDio.post(any, data: anyNamed('data'), options: anyNamed('options')))
          .called(3);
      verifyNever(mockCache.markSynced(any));
    });

    test('should send Idempotency-Key header matching event ID', () async {
      when(mockCache.enqueue(testEvent)).thenAnswer((_) async {});
      when(mockCache.markSynced(testEvent.id)).thenAnswer((_) async {});
      when(mockDio.post(any, data: anyNamed('data'), options: anyNamed('options')))
          .thenAnswer((_) async => Response(
                data: {'status': 'ok'},
                statusCode: 201,
                requestOptions: RequestOptions(),
              ));

      await repository.submitScan(testEvent);

      final captured = verify(mockDio.post(
        any,
        data: anyNamed('data'),
        options: captureAnyNamed('options'),
      )).captured.single as Options;

      expect(captured.headers?['Idempotency-Key'], equals('scan-uuid-001'));
    });
  });
}
```

---

## 3. Widget Tests (Scanner Screen UI)

### File: `test/widget/test_scanner_screen_test.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:logistic/features/scanner/presentation/scanner_screen.dart';

void main() {
  group('ScannerScreen Widget Tests', () {
    testWidgets('should display scan button and empty state initially', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(home: ScannerScreen()),
      );

      expect(find.text('Scan Barcode'), findsOneWidget);
      expect(find.byIcon(Icons.qr_code_scanner), findsOneWidget);
      expect(find.text('No scans yet'), findsOneWidget);
    });

    testWidgets('should show success snackbar after scan submission', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(home: ScannerScreen()),
      );

      await tester.tap(find.text('Scan Barcode'));
      await tester.pumpAndSettle();

      expect(find.byType(SnackBar), findsOneWidget);
    });

    testWidgets('should display offline indicator when network unavailable', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(home: ScannerScreen()),
      );

      // Verify offline badge is displayed
      expect(find.byIcon(Icons.cloud_off), findsOneWidget);
      expect(find.text('Offline — scans queued locally'), findsOneWidget);
    });
  });
}
```

---

## 4. Quality Verdict
- **Verdict:** **PASS**
- **Summary:** Offline-first local cache integrity verified; Idempotency-Key exactly matches event UUID; 3-retry backoff confirmed; widget renders all 5 states (Default, Loading, Empty, Error, Success).

