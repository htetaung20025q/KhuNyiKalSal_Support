---
trigger: model_decision
description: Offline-first architecture, local caching, and synchronization guidelines.
---

# Offline-First & Low-Bandwidth Architecture

## 1. Offline Storage & Caching
- **Client Cache**: Use IndexedDB / LocalStorage for web or SQLite (`sqflite`) / Hive for Flutter mobile.
- **Optimistic UI Updates**: Immediately update local UI on user action, enqueue mutations into an outgoing queue, and reconcile with the backend in the background.

## 2. Conflict Resolution & Sync Strategies
- **Last-Write-Wins (LWW) with Timestamps**: For simple independent updates.
- **CRDT / Operational Transformation**: For collaborative or concurrent entity modifications.
- **Idempotent Sync Endpoints**: Backend sync endpoints must accept mutation batches with client UUIDs to prevent duplicate processing.
