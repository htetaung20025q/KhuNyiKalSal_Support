# Antigravity SDLC OS v2 &mdash; AI Software Engineering Operating System

> **Production-Grade, Multi-Agent Software Development Lifecycle (SDLC) Framework for Antigravity & AI Coding Agents.**

[![Antigravity](https://img.shields.io/badge/Antigravity-2.0-blue.svg)](https://deepmind.google/technologies/gemini/)
[![SDLC](https://img.shields.io/badge/SDLC_OS-v2.0-brightgreen.svg)](.agents/skills/PIPELINE.md)
[![UI/UX ProMax](https://img.shields.io/badge/UI%2FUX-ProMax-ff69b4.svg)](.agents/skills/ui-ux-promax/SKILL.md)
[![Tests](https://img.shields.io/badge/Tests-14%20Passing-success.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-purple.svg)](#)

---

## 🏛️ System Architecture

Antigravity **SDLC OS v2** transforms standard LLM coding chats into an **enterprise-grade, multi-agent Software Development Lifecycle Operating System**. It incorporates an **orchestration control plane (Brain)**, **10 specialized phase agents**, and an automated **Execution Validation Gate System**.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 AI SOFTWARE ENGINEERING OPERATING SYSTEM (SDLC OS v2)                                  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

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


                                             ┌──────────────────────────────────────────────┐
                                             │     EXECUTION VALIDATION GATE SYSTEM         │
                                             │  - Schema Validation                         │
                                             │  - Complexity Check (Big-O)                 │
                                             │  - Risk Scoring                             │
                                             │  - Dependency Verification                   │
                                             │  - Output Completeness Check                 │
                                             └──────────────────────────────────────────────┘
```

---

## ⚡ Modern Production Tech Stack Standards (Latest Versions)

All skills across SDLC OS v2 default to current enterprise LTS and stable releases:

| Layer | Recommended Technology | Current Stable / LTS Version | Modern Features Utilized |
| :--- | :--- | :---: | :--- |
| **Backend Runtime** | **Python** | `3.12+` | `int \| None` union typing, optimized asyncio event loop, `structlog`. |
| **Web Framework** | **FastAPI** | `0.111+` | Async lifespan handlers, dependency injection, automatic OpenAPI 3.1. |
| **Data Validation** | **Pydantic** | `v2.7+` | Rust-backed `core`, `model_validator`, `ConfigDict(from_attributes=True)`. |
| **Database ORM** | **SQLAlchemy** | `2.0+` | Full async `AsyncSession`, `select()`, typed `Mapped[...]` & `mapped_column`. |
| **Primary Database** | **PostgreSQL** | `16.x` | Logical replication, PostGIS 3.4, sub-millisecond B-Tree seeks, `SELECT FOR UPDATE`. |
| **In-Memory Cache** | **Redis** | `7.2+` | Redis Streams consumer groups, spatial Redis Geo, persistent AOF/RDB. |
| **Mobile Frontend** | **Flutter / Dart** | `3.22+` / `3.4+` | Material 3 themes, Riverpod 2.5+, offline SQLite (`sqflite`) / Hive sync. |
| **Web Frontend** | **Next.js / React** | `14+` / `18.3` / `19.x` | Functional components, Server Actions, Tailwind CSS 4.x / 3.4+. |
| **Test Automation** | **Pytest / httpx** | `8.2+` / `0.27+` | `pytest-asyncio` auto mode, `respx`, parallel 50-worker stress testing. |
| **Containers & Cloud**| **Docker / Nginx** | `27+` / `1.26+` | Multi-stage `python:3.12-slim`, non-root user, HTTP/2, TLS 1.3, Kubernetes 1.30+. |

---

## 🚀 Quick Start with `engine.py`

The repository includes a standalone CLI and automation toolkit: [`engine.py`](engine.py).

### 1. View Registered Skills & Control Plane
```bash
python3 engine.py list
python3 engine.py pipeline
```

### 2. Fetch Skill Presets & Copy-Paste Commands
```bash
# Emergency SOS & Disaster Response presets
python3 engine.py /brainstorm preset
python3 engine.py /ui-ux preset
python3 engine.py /design preset
```

### 3. Generate Agent Prompts
```bash
python3 engine.py prompt /proj-init --project-name "SOSApp" --type fullstack --stack "fastapi, react"
```

### 4. Scaffold Starter Templates (10 Phases)
```bash
python3 engine.py template design --output design_blueprint.md --project-name "MyService"
```

### 5. Run 10-Point Gatekeeper Validation Gate
```bash
python3 engine.py validate --phase design --file design_blueprint.md
# CI/CD machine-readable JSON output:
python3 engine.py validate --phase design --file design_blueprint.md --json
```

### 6. Audit Workspace SDLC Health & Customization
```bash
python3 engine.py audit
```

### 7. Run Verification Test Suite
```bash
python3 -m unittest discover -s tests -p "test_*.py" -v
```

---

## 📂 Customization Architecture (`.agents/`)

- `.agents/skills/`: 10 specialized phase skills with progressive disclosure.
- `.agents/rules/`:
  - `code-standards.md`: Python 3.12, FastAPI, React 19, layered architecture.
  - `security-and-resilience.md`: 5-state UI resilience, TLS 1.3, JWT auth.
  - `offline-first.md`: Client caching, optimistic UI, conflict resolution.
- `.agents/skills.json` & `.agents/plugins.json`: Antigravity registry configurations.
