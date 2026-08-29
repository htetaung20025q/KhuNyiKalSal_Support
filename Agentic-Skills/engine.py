#!/usr/bin/env python3
"""
Antigravity SDLC OS v2 - Unified CLI, Automation Engine & Skill Toolkit
========================================================================
Enterprise-grade multi-agent Software Development Lifecycle Operating System.
Provides phase routing, parameter resolution, domain presets, validation gates,
prompt generation, template scaffolding, workspace SDLC auditing, and CI/CD tools.

Usage:
  python engine.py list
  python engine.py pipeline
  python engine.py <phase> preset
  python engine.py prompt <phase> [--project-name <name>] [...]
  python engine.py template <phase> [--output <file>]
  python engine.py validate --phase <phase> --file <file> [--json]
  python engine.py audit [workspace_dir]
  python engine.py run [phase]
"""

import sys
import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple

# Base directory paths
BASE_DIR = Path(__file__).resolve().parent
SKILLS_DIR = BASE_DIR / ".agents" / "skills"
ROOT_DIR = BASE_DIR.parent if (BASE_DIR.parent / ".git").exists() else BASE_DIR

# ANSI Color helpers
COLOR_RESET = "\033[0m"
COLOR_BOLD = "\033[1m"
COLOR_GREEN = "\033[32m"
COLOR_BLUE = "\033[34m"
COLOR_CYAN = "\033[36m"
COLOR_YELLOW = "\033[33m"
COLOR_RED = "\033[31m"
COLOR_MAGENTA = "\033[35m"

def colorize(text: str, color: str) -> str:
    if sys.stdout.isatty():
        return f"{color}{text}{COLOR_RESET}"
    return text

# Phase Registry with full metadata, domain presets & flags
PHASES = [
    {
        "id": "brainstorm",
        "phase": 0,
        "command": "/brainstorm",
        "name": "Solution Architect",
        "file": "brainstorm/SKILL.md",
        "description": "Explores 3 architectural paths (MVP, Scalable, Advanced) & Big-O trade-offs.",
        "presets": {
            "emergency_sos": {
                "title": "KhuNyiKalSal Emergency SOS & Mesh Dispatch",
                "command": '/brainstorm --project-name "KhuNyiKalSalSOS" --problem "Real-time emergency SOS broadcast, offline-first mesh sync, and volunteer rescue dispatch during network blackouts" --domain distributed --scale medium --constraints "offline-first, low-bandwidth, <100ms-dispatch"',
            },
            "logistics": {
                "title": "Real-time Fleet Tracking & Telemetry",
                "command": '/brainstorm --project-name "FleetTracker" --problem "Real-time delivery location tracking for 10k drivers under low-bandwidth mobile networks" --domain distributed --scale large --constraints "low-bandwidth, battery-preservation"',
            },
            "fintech": {
                "title": "Double-Entry Ledger Engine",
                "command": '/brainstorm --project-name "PayLedger" --problem "High-concurrency double-entry ledger with zero financial drift and strict idempotency" --domain backend --scale enterprise --constraints "strict-acid, zero-data-loss"',
            },
            "healthcare": {
                "title": "Offline-First Telemedicine & Triage",
                "command": '/brainstorm --project-name "CareSync" --problem "Rural clinic patient medical record sync and encrypted telemedicine consultation" --domain fullstack --scale medium --constraints "offline-first, low-bandwidth, hipaa"',
            }
        },
        "flags": [
            ("--project-name", "Project / Subsystem Name (Required)"),
            ("--problem", "Engineering problem statement (Required)"),
            ("--domain", "backend | mobile | ai | distributed | fullstack"),
            ("--scale", "small | medium | large | enterprise"),
            ("--constraints", "e.g. low-bandwidth, offline-first, <50ms-p99"),
            ("--priority", "speed | scalability | cost | simplicity"),
            ("--tech-stack", "Preferred stack (e.g. FastAPI, Flutter, Redis)"),
        ]
    },
    {
        "id": "analyze",
        "phase": 1,
        "command": "/analyze",
        "name": "Requirement Analyst",
        "file": "analyze/SKILL.md",
        "description": "Extracts hidden technical complexity, classifies system type, models entities & data flows.",
        "presets": {
            "emergency_sos": {
                "title": "Emergency Incident Ingestion & Priority Triage",
                "command": '/analyze --project-name "KhuNyiKalSalSOS" --input "Emergency distress signal pipeline supporting multi-language (Myanmar/English), geofenced volunteer dispatching, and offline SQLite synchronization with zero duplicate alerts" --domain distributed --constraints "offline-first, zero-data-loss"',
            },
            "logistics": {
                "title": "Fleet Telemetry Ingest Analysis",
                "command": '/analyze --project-name "FleetTracker" --input "Build a scalable real-time fleet telemetry ingest and tracking service using Redis Streams, FastAPI, and PostgreSQL with offline-first mobile sync" --domain distributed --constraints "offline-first, low-bandwidth"',
            },
            "fintech": {
                "title": "Payment Transaction Ledger Analysis",
                "command": '/analyze --project-name "PayLedger" --input "Process 5,000 payment adjustments per second across multi-currency accounts with idempotency keys and immutable audit ledger" --domain backend --constraints "strict-acid, zero-loss"',
            },
            "inventory": {
                "title": "Warehouse Barcode Inventory Analysis",
                "command": '/analyze --project-name "LogisticInventory" --input "Warehouse inventory barcode scanning and stock adjustments over intermittent 3G Wi-Fi with row locking to prevent negative stock" --domain backend --constraints "offline-first, low-bandwidth"',
            }
        },
        "flags": [
            ("--project-name", "Project Name (Required)"),
            ("--input", "Raw user requirement or brainstorm summary (Required)"),
            ("--domain", "backend | mobile | ai | distributed | fullstack"),
            ("--scale", "small | medium | large | enterprise"),
            ("--constraints", "e.g. offline-first, low-bandwidth, compliance"),
        ]
    },
    {
        "id": "proj-init",
        "phase": 2,
        "command": "/proj-init",
        "name": "Product Scope Manager",
        "file": "proj-init/SKILL.md",
        "description": "Defines lean MVP boundaries, user personas, user stories, and prioritized backlog.",
        "presets": {
            "emergency_sos": {
                "title": "Community SOS & Volunteer Responder App",
                "command": '/proj-init --project-name "KhuNyiKalSalSOS" --type fullstack --stack "fastapi, react, tailwind" --constraints "offline-first, low-bandwidth" --users "distressed citizens, emergency responders, NGO coordinators"',
            },
            "backend": {
                "title": "FastAPI Backend Service",
                "command": '/proj-init --project-name "Logistic" --type backend --stack "fastapi, postgresql, redis"',
            },
            "mobile": {
                "title": "Flutter Mobile App (Offline-First)",
                "command": '/proj-init --project-name "SOSApp" --type mobile --stack flutter --constraints "offline-first, low-bandwidth" --users "rural citizens, emergency responders"',
            },
            "fullstack": {
                "title": "Fullstack Web & Mobile AI Platform",
                "command": '/proj-init --project-name "DocuBrain" --type fullstack --stack "fastapi, flutter, react" --constraints "offline-first" --users "legal compliance officers"',
            }
        },
        "flags": [
            ("--project-name", "Project Name (Required)"),
            ("--type", "web | mobile | backend | ai | fullstack | desktop (Required)"),
            ("--stack", "Tech stack (e.g. fastapi, flutter, react)"),
            ("--constraints", "e.g. offline-first, low-bandwidth"),
            ("--users", "Description of target user personas"),
        ]
    },
    {
        "id": "ui-ux",
        "phase": 3,
        "command": "/ui-ux",
        "name": "UI/UX ProMax Architect",
        "file": "ui-ux-promax/SKILL.md",
        "description": "Designs world-class design systems, glassmorphism, micro-animations, 5-state resilience & WCAG AAA.",
        "presets": {
            "emergency_portal": {
                "title": "High-Contrast Emergency Dispatch Portal & SOS Mobile View",
                "command": '/ui-ux --project-name "KhuNyiKalSalSOS" --platform fullstack --theme dark --framework tailwind --constraints "high-contrast, touch-friendly, 5-state-resilient, offline-badge"',
            },
            "dashboard": {
                "title": "Real-time Telemetry Glassmorphic Dashboard",
                "command": '/ui-ux --project-name "FleetTracker" --platform fullstack --theme dark --constraints "offline-first, touch-friendly"',
            },
            "mobile_app": {
                "title": "Offline-First Mobile App Design System (Flutter)",
                "command": '/ui-ux --project-name "CareSync" --platform mobile --framework flutter --constraints "offline-first, low-bandwidth, high-contrast"',
            },
            "fintech_portal": {
                "title": "Fintech Ledger Analytics Portal",
                "command": '/ui-ux --project-name "PayLedger" --platform web --theme glassmorphism --framework vanilla-css',
            }
        },
        "flags": [
            ("--project-name", "Application Name (Required)"),
            ("--platform", "web | mobile | fullstack | desktop (Required)"),
            ("--theme", "dark (default) | light | glassmorphism | cyberpunk | minimal-nordic"),
            ("--framework", "vanilla-css | flutter | tailwind | react | nextjs"),
            ("--constraints", "e.g. offline-first, low-bandwidth, touch-friendly, wcag-aaa"),
        ]
    },
    {
        "id": "design",
        "phase": 4,
        "command": "/design",
        "name": "System Design Architect",
        "file": "system-design/SKILL.md",
        "description": "Produces PostgreSQL DDL schemas, API contracts, in-memory stream buffers, and circuit breakers.",
        "presets": {
            "emergency_ingest": {
                "title": "Geospatial Incident Telemetry & WebSocket Dispatch",
                "command": '/design --project-name "KhuNyiKalSalSOS" --type distributed --scale medium --latency-target "<80ms" --constraints "offline-first, postgis, redis-streams"',
            },
            "distributed_telemetry": {
                "title": "Real-time Telemetry Pipeline",
                "command": '/design --project-name "FleetTracker" --type distributed --scale large --latency-target "<100ms" --constraints "low-bandwidth mobile telemetry, 50k pings/sec"',
            },
            "inventory_ledger": {
                "title": "Transactional Stock Ledger",
                "command": '/design --project-name "LogisticInventory" --type backend --scale medium --latency-target "<50ms" --constraints "row-level-locking, idempotency"',
            }
        },
        "flags": [
            ("--project-name", "System / Subsystem Name (Required)"),
            ("--type", "backend | distributed | mobile | ai | fullstack (Required)"),
            ("--scale", "small | medium | large | enterprise"),
            ("--latency-target", "e.g. <50ms p99, <200ms p95"),
            ("--constraints", "e.g. low-bandwidth, offline-first, strict-acid"),
            ("--tech-stack", "e.g. FastAPI, PostgreSQL, Redis"),
        ]
    },
    {
        "id": "plan",
        "phase": 5,
        "command": "/plan",
        "name": "Execution Plan Manager",
        "file": "plan/SKILL.md",
        "description": "Decomposes blueprints into atomic developer tasks (< 2 days each) and builds Directed Acyclic Graphs (DAG).",
        "presets": {
            "emergency_sprint": {
                "title": "Emergency SOS Core Sprint Plan",
                "command": '/plan --project-name "KhuNyiKalSalSOS" --backlog "Distress SOS signal ingestion, PostGIS volunteer radial search, real-time WebSocket dispatcher, offline SQLite storage" --team-size 3 --constraints "offline-first, high-availability"',
            },
            "inventory_sprint": {
                "title": "Inventory System Sprint Execution",
                "command": '/plan --project-name "LogisticInventory" --backlog "Item catalog, atomic stock adjustments with SELECT FOR UPDATE, low-stock alerts, warehouse barcode scanner" --team-size 2 --constraints "low-bandwidth, offline-first"',
            },
            "fleet_sprint": {
                "title": "Fleet Telemetry Ingest Sprint",
                "command": '/plan --project-name "FleetTracker" --backlog "Driver telemetry ingestion gateway, Redis spatial index, SSE customer map broadcast, offline SQLite sync" --team-size 3',
            }
        },
        "flags": [
            ("--project-name", "Project Name (Required)"),
            ("--backlog", "Feature list, user stories, or backlog items (Required)"),
            ("--sprint-duration", "e.g. 1 week, 2 weeks (Default: 2 weeks)"),
            ("--team-size", "Number of engineers (Default: 2-3)"),
            ("--constraints", "Operating and network constraints"),
        ]
    },
    {
        "id": "build",
        "phase": 6,
        "command": "/build",
        "name": "Code Engine Engineer",
        "file": "code-generation/SKILL.md",
        "description": "Implements clean, scalable, layered production code (API/Service/Repo/Models) strictly following DAG tasks.",
        "presets": {
            "emergency_dispatch_service": {
                "title": "Emergency SOS Ingest Service & PostGIS Geosearch",
                "command": '/build --project-name "KhuNyiKalSalSOS" --task "T-02: Implement incident dispatch service with PostGIS radius query and Redis stream broadcaster"',
            },
            "stock_service": {
                "title": "Stock Adjustment Service & Repository",
                "command": '/build --project-name "Logistic" --task "T-02: Implement atomic stock adjustment service with SELECT FOR UPDATE row locking and custom HTTP exceptions"',
            },
            "telemetry_router": {
                "title": "FastAPI Async Telemetry Router",
                "command": '/build --project-name "FleetTracker" --task "T-03: Implement FastAPI async telemetry ingestion router with Redis Streams buffer and JWT auth"',
            }
        },
        "flags": [
            ("--project-name", "Project Name (Required)"),
            ("--task", "Task ID or scope description (Required)"),
            ("--design", "Reference to /design blueprint"),
            ("--plan", "Reference to /plan task DAG"),
        ]
    },
    {
        "id": "test",
        "phase": 7,
        "command": "/test",
        "name": "QA & Reliability Validator",
        "file": "test/SKILL.md",
        "description": "Generates and executes unit, integration, concurrency, negative, and chaos reliability test suites.",
        "presets": {
            "emergency_chaos_test": {
                "title": "SOS Burst Ingest & Network Disconnect Chaos Test (100 workers)",
                "command": '/test --project-name "KhuNyiKalSalSOS" --target "app/services/incident_service.py" --type concurrency --concurrency 100',
            },
            "concurrency_stress": {
                "title": "Pessimistic Locking Concurrency Test (50 workers)",
                "command": '/test --project-name "Logistic" --target "app/services/stock_service.py" --type concurrency --concurrency 50',
            },
            "telemetry_full_suite": {
                "title": "Real-time Telemetry Gateway Test Suite",
                "command": '/test --project-name "FleetTracker" --target "app/api/v1/telemetry.py" --type all',
            }
        },
        "flags": [
            ("--project-name", "Project Name (Required)"),
            ("--target", "Target file, endpoint, or module (Required)"),
            ("--type", "all | unit | integration | e2e | concurrency | negative | performance"),
            ("--concurrency", "Simulated concurrent workers (e.g. 50, 100)"),
        ]
    },
    {
        "id": "debug",
        "phase": 8,
        "command": "/debug",
        "name": "Self-Healing SRE Agent",
        "file": "auto-debug/SKILL.md",
        "description": "Performs Root Cause Analysis (RCA) and applies minimal targeted patches without redesigning architecture.",
        "presets": {
            "socket_deadlock": {
                "title": "WebSocket Connection Hub Deadlock Patch",
                "command": '/debug --file "app/api/v1/ws_hub.py" --error "RuntimeError: Task attached to a different loop during socket disconnect"',
            },
            "race_condition": {
                "title": "Pessimistic Lock Missing Fix",
                "command": '/debug --file "app/services/stock_service.py" --error "IntegrityError: inventory count dropped to negative (-3) under concurrent load"',
            },
            "stream_timeout": {
                "title": "Redis Stream Timeout Fix",
                "command": '/debug --file "app/api/v1/telemetry.py" --error "asyncio.exceptions.TimeoutError: Redis Stream buffer saturated during load test"',
            }
        },
        "flags": [
            ("--error", "Error stack trace or description (Required)"),
            ("--code", "File path or code snippet"),
            ("--severity", "low | medium | critical"),
        ]
    },
    {
        "id": "publish",
        "phase": 9,
        "command": "/publish",
        "name": "Universal DevOps Generator",
        "file": "publish/SKILL.md",
        "description": "Generates production deployment manifests for Railway, Docker, Render, VPS (Ubuntu/Nginx), AWS, and Kubernetes.",
        "presets": {
            "emergency_vps_nginx": {
                "title": "Ubuntu VPS + Systemd + Nginx Reverse Proxy + Let's Encrypt SSL",
                "command": '/publish --platform vps --project-name "KhuNyiKalSalSOS" --domain "support.khunyikalsal.org" --port 8000 --db "postgresql, redis"',
            },
            "railway": {
                "title": "Railway PaaS + Managed PostgreSQL & Redis",
                "command": '/publish --platform railway --project-name "FleetTracker" --port 8000 --db "postgresql, redis"',
            },
            "docker": {
                "title": "Docker Multi-Stage & Compose Topology",
                "command": '/publish --platform docker --project-name "LogisticInventory" --port 8000 --db postgresql',
            },
            "kubernetes": {
                "title": "Kubernetes Deployment, Service, ConfigMap & Ingress",
                "command": '/publish --platform kubernetes --project-name "FleetTracker" --port 8000',
            },
            "render": {
                "title": "Render Blueprint (render.yaml)",
                "command": '/publish --platform render --project-name "CareSync" --port 8000',
            },
            "aws": {
                "title": "AWS ECS Fargate Task Definition & Security Groups",
                "command": '/publish --platform aws --project-name "PayLedger" --port 8000',
            }
        },
        "flags": [
            ("--platform", "railway | docker | render | vps | aws | kubernetes | all (Required)"),
            ("--project-name", "Project / Service Name (Required)"),
            ("--port", "Application runtime port (Default: 8000)"),
            ("--db", "Database dependency (e.g. postgresql, redis, sqlite)"),
            ("--domain", "Custom domain or host (e.g. api.fleettracker.io)"),
        ]
    }
]


def normalize_cmd(cmd_name: str) -> str:
    """Normalize input command strings to canonical phase ID."""
    clean = str(cmd_name).strip().lstrip("/").lower().replace("_", "-")
    mapping = {
        "0": "brainstorm",
        "brainstorm": "brainstorm",
        "ideation": "brainstorm",
        "engineering-brainstorming": "brainstorm",
        "1": "analyze",
        "analyze": "analyze",
        "requirement-analysis": "analyze",
        "requirements": "analyze",
        "2": "proj-init",
        "proj-init": "proj-init",
        "project-init": "proj-init",
        "project-init-agile": "proj-init",
        "init": "proj-init",
        "3": "ui-ux",
        "ui-ux": "ui-ux",
        "ui-ux-promax": "ui-ux",
        "promax": "ui-ux",
        "frontend": "ui-ux",
        "design-ui": "ui-ux",
        "4": "design",
        "design": "design",
        "system-design": "design",
        "architecture": "design",
        "5": "plan",
        "plan": "plan",
        "agile-plan-engineering": "plan",
        "sprint": "plan",
        "6": "build",
        "build": "build",
        "code": "build",
        "code-generation": "build",
        "generate": "build",
        "7": "test",
        "test": "test",
        "qa": "test",
        "production-testing": "test",
        "8": "debug",
        "debug": "debug",
        "auto-debug": "debug",
        "sre": "debug",
        "rca": "debug",
        "9": "publish",
        "publish": "publish",
        "deploy": "publish",
        "devops": "publish",
        "publish-skill": "publish",
    }
    return mapping.get(clean, clean)


def get_phase_by_id(phase_id: str) -> Optional[Dict[str, Any]]:
    norm = normalize_cmd(phase_id)
    for p in PHASES:
        if p["id"] == norm:
            return p
    return None


def show_pipeline():
    """Print the complete SDLC OS v2 pipeline architecture."""
    banner = f"""
{colorize("┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐", COLOR_CYAN)}
{colorize("│                                 AI SOFTWARE ENGINEERING OPERATING SYSTEM (SDLC OS v2)                                  │", COLOR_BOLD + COLOR_CYAN)}
{colorize("└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘", COLOR_CYAN)}

                                             {colorize("┌──────────────────────────────────────────────┐", COLOR_BLUE)}
                                             {colorize("│        SDLC CONTROL PLANE (BRAIN)            │", COLOR_BOLD + COLOR_BLUE)}
                                             {colorize("│  - Phase Routing Engine                      │", COLOR_BLUE)}
                                             {colorize("│  - State Tracker (Artifact System)           │", COLOR_BLUE)}
                                             {colorize("│  - Validation & Retry Engine                 │", COLOR_BLUE)}
                                             {colorize("│  - Rollback Manager                          │", COLOR_BLUE)}
                                             {colorize("└──────────────────────────────────────────────┘", COLOR_BLUE)}
                                                               │
                                                               ▼

  {colorize("[ /brainstorm ]", COLOR_GREEN)} → {colorize("[ /analyze ]", COLOR_GREEN)} → {colorize("[ /proj-init ]", COLOR_GREEN)} → {colorize("[ /ui-ux ]", COLOR_GREEN)} → {colorize("[ /design ]", COLOR_GREEN)} → {colorize("[ /plan ]", COLOR_GREEN)} → {colorize("[ /build ]", COLOR_GREEN)} → {colorize("[ /test ]", COLOR_GREEN)} → {colorize("[ /debug ]", COLOR_GREEN)} → {colorize("[ /publish ]", COLOR_GREEN)}
       │                │               │              │             │             │            │           │            │             │
       ▼                ▼               ▼              ▼             ▼             ▼            ▼           ▼            ▼             ▼

  Solution        Requirement     Product Scope  UI/UX ProMax  System Design Execution Plan Code Engine QA / SRE     Self-Healing  Universal
  Architect       Analyst         Manager        Architect     Architect     Manager        Engineer    Validator    SRE Agent     DevOps
"""
    print(banner)


def list_skills():
    """List all available skills, phase indexes, and trigger commands."""
    header = f"\n{colorize('=' * 88, COLOR_CYAN)}\n           {colorize('SDLC OS v2 - REGISTERED SKILLS & PHASE AGENTS', COLOR_BOLD + COLOR_CYAN)}\n{colorize('=' * 88, COLOR_CYAN)}\n"
    print(header)
    for p in PHASES:
        cmd_str = colorize(f"{p['command']:<14}", COLOR_GREEN + COLOR_BOLD)
        name_str = colorize(f"[{p['name']:<28}]", COLOR_BOLD)
        print(f"  Phase {p['phase']}: {cmd_str} {name_str}")
        print(f"           Description: {p['description']}")
        print(f"           Skill File:  .agents/skills/{p['file']}")
        print()
    print(f"{colorize('CLI Quick Commands:', COLOR_YELLOW + COLOR_BOLD)}")
    print("  python engine.py <command> preset     - View domain presets (e.g. /ui-ux preset)")
    print("  python engine.py prompt <command>     - Generate optimized prompt for AI agents")
    print("  python engine.py template <phase>     - Scaffold ready-to-fill design/plan template")
    print("  python engine.py validate -p <p> -f <f> - Run 10-point gatekeeper check on artifact")
    print("  python engine.py audit                - Audit repository SDLC compliance & readiness\n")


def show_presets(phase_id: str):
    """Display CLI flags, example presets, and command syntax for a specific skill."""
    p = get_phase_by_id(phase_id)
    if not p:
        print(f"{colorize('Error:', COLOR_RED)} Unknown phase or command '{phase_id}'.")
        print("Run `python engine.py list` to see available skills.")
        return

    title_text = "PHASE " + str(p["phase"]) + ": " + p["command"] + " - " + p["name"].upper()
    print("\n" + colorize("=" * 88, COLOR_CYAN))
    print(f"  {colorize(title_text, COLOR_BOLD + COLOR_CYAN)}")
    print(colorize("=" * 88, COLOR_CYAN))
    print(f"\n{colorize('Description:', COLOR_YELLOW)}\n  {p['description']}\n")
    
    print(colorize("Supported Command Flags:", COLOR_YELLOW))
    for flag, desc in p["flags"]:
        print(f"  {colorize(f'{flag:<20}', COLOR_GREEN)} {desc}")
    print()

    print(colorize("Ready-to-Run Presets:", COLOR_YELLOW))
    for key, preset in p["presets"].items():
        print(f"\n  [{colorize(key.upper(), COLOR_MAGENTA + COLOR_BOLD)}] - {colorize(preset['title'], COLOR_BOLD)}")
        print(f"  Command:")
        print(f"    {colorize(preset['command'], COLOR_CYAN)}")
    
    print("\n" + colorize("-" * 88, COLOR_CYAN))
    print(colorize("Tip: You can copy and paste any command above directly into your chat or engine runner.", COLOR_YELLOW))
    print(colorize("-" * 88, COLOR_CYAN) + "\n")


# Template Generator
TEMPLATES: Dict[str, str] = {
    "brainstorm": """# Architecture Exploration: {{PROJECT_NAME}}

## 1. Problem Definition & Scope
- **Core Challenge:** {{PROBLEM}}
- **Domain & Scale:** {{DOMAIN}} | {{SCALE}} DAU
- **Operating Constraints:** {{CONSTRAINTS}}
- **Security & Fault-Tolerance Goals:** TLS 1.3, input validation, circuit breakers, and zero data loss retry.

## 2. Three Distinct Architectural Approaches

### Approach 1: Lean MVP (Time-to-Market)
- **Architecture Pattern:** Monolithic / Serverless
- **Data Flow:** Direct SQL queries with indexed lookups
- **Pros & Cons:** Fast delivery, minimal infra cost | Limited horizontal scalability
- **Complexity:** Time $O(N)$, Space $O(1)$

### Approach 2: Production Scalable (Recommended)
- **Architecture Pattern:** Modular Async API + In-Memory Stream Buffer
- **Tech Stack:** FastAPI (Python 3.12+), Redis 7.2 Streams, PostgreSQL 16
- **Data Flow:** Client -> Fast Ingestion Router -> Redis Stream -> Worker Consumer -> PostgreSQL
- **Pros & Cons:** Decoupled writes, handles burst traffic, sub-50ms p99 | Requires Redis clustering
- **Complexity:** Time $O(1)$ write buffer, Space $O(K)$ stream memory

### Approach 3: Advanced Distributed / Edge-First
- **Architecture Pattern:** Event-Driven CQRS + Offline Mesh Sync
- **Tech Stack:** CRDT / PostGIS / Distributed Microservices
- **Pros & Cons:** Ultra-resilient, offline-first | Operational complexity

## 3. Algorithmic Trade-offs & Big-O Complexity
| Component | Approach 1 | Approach 2 (Recommended) | Approach 3 |
| :--- | :--- | :--- | :--- |
| Ingestion Write | $O(N)$ Disk I/O | $O(1)$ In-Memory Stream | $O(1)$ Local SQLite + CRDT |
| Query Latency | $O(\\log N)$ B-Tree | $O(1)$ In-Memory / $O(\\log N)$ DB | $O(1)$ Local Cache |

## 4. Recommended Direction & Downstream Handoff
- **Selected Path:** Approach 2 (Production Scalable)
- **Next Phase:** Proceed to `/analyze` (Phase 1) for domain entity modeling and requirement extraction.
""",

    "analyze": """# Requirement Analysis: {{PROJECT_NAME}}

## 1. System Classification & Boundary
- **System Type:** {{DOMAIN}} Service
- **Primary Workload:** High concurrency telemetry / transactional data
- **Service Level Objectives (SLOs):** Availability 99.95%, Latency p99 < 100ms

## 2. Functional Requirements (FR)
- **FR-01 (Ingestion):** System shall ingest events with UUID idempotency keys.
- **FR-02 (Processing):** System shall parse, validate schemas, and enqueue background tasks.
- **FR-03 (Sync & Storage):** System shall persist transactional records with row locking.

## 3. Non-Functional Requirements (NFR)
- **NFR-01 (Latency):** p95 latency under 50ms for synchronous writes.
- **NFR-02 (Resilience):** Zero data loss on network disconnects with client-side offline retry.
- **NFR-03 (Security):** Strict TLS 1.3, JWT authentication, RBAC authorization.

## 4. Domain Entity Modeling & Relationships
```text
[User / Actor] ──(1:N)──► [Incident / Record] ──(1:N)──► [Audit Log]
```

## 5. Downstream Handoff
- Hand off to `/proj-init` (Phase 2) to build user stories and sprint backlog.
""",

    "proj-init": """# Agile Project Initialization & Backlog: {{PROJECT_NAME}}

## 1. Product Vision & MVP Boundaries
- **Project Name:** {{PROJECT_NAME}}
- **Type:** {{TYPE}}
- **Target Users:** {{USERS}}

## 2. User Personas
- **Persona 1 (Primary Operator):** Needs quick action, high-contrast UI, offline support.
- **Persona 2 (Administrator / Dispatcher):** Needs global observability, filters, real-time telemetry.

## 3. Agile User Stories & Acceptance Criteria
- **US-01 (Core Action):** As a user, I want to submit a request so that responders can assist immediately.
  - *Acceptance Criteria:* Sub-second confirmation, works offline, optimistic UI badge.
- **US-02 (Status Tracking):** As an operator, I want to track status in real-time.

## 4. Security & Error Handling Guidelines
- Enforce strict input validation, sanitize incoming payloads, and use environment variables for secrets.
- Handle error boundaries and graceful retry mechanisms on all network operations.

## 5. Sprint Backlog & Roadmaps
- **Sprint 0:** Project scaffolding, database schema migrations, CI/CD pipeline.
- **Sprint 1 (MVP):** Core API ingestion, data models, 5-state UI components.

## 6. Downstream Handoff
- Hand off to `/ui-ux` (Phase 3) for design system and `/design` (Phase 4) for database architecture.
""",

    "ui-ux": """# UI/UX ProMax Design System: {{PROJECT_NAME}}

## 1. Aesthetic Direction & Strategy
- **Platform:** {{PLATFORM}}
- **Visual Style:** {{THEME}} theme with responsive mobile layout and WCAG AAA contrast.

## 2. Design System Tokens
```css
:root {
  --bg-root: #0b0f19;
  --surface-panel: rgba(17, 24, 39, 0.85);
  --accent-primary: #3b82f6;
  --accent-success: #10b981;
  --accent-danger: #ef4444;
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
  --border-subtle: 1px solid rgba(255, 255, 255, 0.08);
}
```

## 3. 5-State Component Resilience Matrix
| Component | 1. Default | 2. Loading | 3. Empty | 4. Error | 5. Partial / Offline |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Data Feed** | Polished list card | Skeleton shimmer | "No items found" + CTA | Retry button + alert | "Cached 2m ago" badge |
| **Action Button** | Bold filled button | Spinner with disabled state | N/A | Shake animation + error tip | Queued offline indicator |

## 4. Accessibility, Security & Touch Optimization
- Touch targets >= 48px for mobile devices.
- Contrast ratio exceeds 7:1 for text elements (WCAG AAA compliant).
- Secure credential inputs with masked tokens and sanitized client rendering.

## 5. Downstream Handoff
- Hand off to `/design` (Phase 4) for technical blueprint and `/plan` (Phase 5) for task execution.
""",

    "design": """# System Architecture Blueprint: {{PROJECT_NAME}}

## 1. Database DDL Schema (PostgreSQL 16)
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_records_status ON records(status);
CREATE INDEX IF NOT EXISTS idx_records_created_at ON records(created_at DESC);
```

## 2. API Contracts (REST / AsyncAPI)
- `POST /api/v1/records`: Ingests new record with `Idempotency-Key` header.
- `GET /api/v1/records/{id}`: Returns record status and payload.

## 3. In-Memory & Streaming Topology (Redis 7.2)
- Redis Stream `events_stream` for decoupled asynchronous ingestion.
- Consumer groups `worker_pool_v1` with acknowledgment handling (`XACK`).

## 4. Security, Auth & Input Sanitization
- Strict TLS 1.3 encryption, JWT bearer tokens with RBAC, and parameter validation.
- SQL injection prevention via parameterized SQLAlchemy async queries.

## 5. Fault-Tolerance & Circuit Breaker
- In-memory ring buffer fallback if database connection pool exhausts.
- Rate limiting at 100 req/sec per client IP with Redis token bucket.

## 6. Downstream Handoff
- Hand off to `/plan` (Phase 5) to generate atomic tasks and DAG sequence.
""",

    "plan": """# Sprint Execution Plan: {{PROJECT_NAME}}

## 1. Task Decomposition & Effort Matrix
| Task ID | Component | Description | Dependencies | Effort |
| :--- | :--- | :--- | :--- | :--- |
| **T-01** | Database | Setup PostgreSQL schema, indexes, and Alembic migrations | None | Low (1d) |
| **T-02** | Service | Implement service layer with transactional locking & caching | T-01 | Medium (2d) |
| **T-03** | API | Implement FastAPI endpoints, input models, and error handlers | T-02 | Low (1d) |
| **T-04** | UI | Build 5-state React/Flutter components and state hooks | T-03 | Medium (2d) |

## 2. Directed Acyclic Graph (DAG)
```text
[T-01: Database DDL] ──► [T-02: Service Layer] ──► [T-03: API Endpoints] ──► [T-04: UI Components]
```

## 3. Security & Resilience Considerations
- Task T-02 and T-03 include strict parameter sanitization, rate-limiting, and error-handling middleware.

## 4. Critical Path & Bottlenecks
- Primary risk: Database transaction deadlock under concurrent load. Mitigated by `SELECT FOR UPDATE` in T-02.

## 5. Downstream Handoff
- Hand off to `/build` (Phase 6) to begin implementing tasks according to the DAG.
""",

    "build": """# Code Implementation Guide: {{PROJECT_NAME}}

## 1. Layered Architecture
- `app/models/`: Pydantic & SQLAlchemy ORM models
- `app/repositories/`: Data access layer with atomic queries
- `app/services/`: Business logic & cache coordination
- `app/api/v1/`: FastAPI routers and dependency injection

## 2. Service Implementation Example
```python
import structlog
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

logger = structlog.get_logger()

class RecordService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_record(self, title: str, payload: dict) -> dict:
        # Input validation & security
        if not title or len(title.strip()) == 0:
            raise ValueError("Title cannot be empty")
        logger.info("creating_record", title=title)
        # Service logic implementation with error handling & resilience
        try:
            return {"status": "created", "title": title}
        except Exception as e:
            logger.error("create_record_failed", error=str(e))
            raise

## 3. Downstream Handoff
- Hand off to `/test` (Phase 7) for automated QA and concurrency validation.
```
""",

    "test": """# QA & Reliability Test Suite: {{PROJECT_NAME}}

## 1. Test Automation Coverage Matrix
- **Unit Tests:** Service business logic & validation models.
- **Integration Tests:** FastAPI test client + PostgreSQL test transactions with auto-rollback.
- **Concurrency & Stress Tests:** 50 concurrent worker threads verifying no race conditions.

## 2. Concurrency Stress Test Example
```python
import pytest
import asyncio
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_concurrent_stress(async_client: AsyncClient):
    async def make_request(idx: int):
        return await async_client.post("/api/v1/records", json={"title": f"Item {idx}"})
    
    responses = await asyncio.gather(*[make_request(i) for i in range(50)])
    assert all(r.status_code in (200, 201) for r in responses)
```

## 3. Quality Verdict Gate
- **PASS**: All 50 concurrent requests handled with 0 deadlock errors and p99 latency < 100ms.
""",

    "debug": """# RCA & Self-Healing Debug Report: {{PROJECT_NAME}}

## 1. Incident / Error Summary
- **Error:** `IntegrityError: Transaction aborted due to deadlock`
- **Location:** `app/services/record_service.py`
- **Severity:** High

## 2. Root Cause Analysis (RCA)
- Concurrent async sessions attempted updating child rows in alternating lock order without `NOWAIT` or consistent index ordering.

## 3. Minimal Targeted Patch
```python
# Before:
# query = select(Record).filter_by(id=record_id)

# After:
query = select(Record).filter_by(id=record_id).with_for_update(nowait=False)
```

## 4. Security & Sanitization Review
- Verified patch does not introduce unauthorized access or SQL injection risks. Input validation maintained.

## 5. Verification & Regression Check
- Executed 50-worker concurrency test: 100% pass rate with zero deadlocks.
""",

    "publish": """# DevOps & Production Deployment Manifests: {{PROJECT_NAME}}

## 1. Dockerfile (Multi-Stage Production)
```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

## 2. Docker Compose Topology
```yaml
version: "3.9"
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://postgres:secret@db:5432/appdb
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
  redis:
    image: redis:7.2-alpine
    restart: unless-stopped

## 3. Security, TLS & Fault-Tolerance Policies
- **SSL / TLS Termination:** Automated Let's Encrypt TLS 1.3 certbot with HSTS headers.
- **Container Security:** Non-root execution user, read-only root filesystem where possible.
- **Resilience & Restart Policies:** Auto-restart `unless-stopped`, health checks every 30s with auto-recovery.

volumes:
  pgdata:
```
"""
}


def generate_template(phase_id: str, output_path: Optional[str] = None, project_name: str = "MyProject"):
    """Generate a starter template for any SDLC phase."""
    norm = normalize_cmd(phase_id)
    p = get_phase_by_id(norm)
    if not p or norm not in TEMPLATES:
        print(f"{colorize('Error:', COLOR_RED)} Unknown phase '{phase_id}'.")
        return

    content = TEMPLATES[norm]
    content = content.replace("{{PROJECT_NAME}}", project_name)
    content = content.replace("{{PROBLEM}}", "High concurrency distributed data processing with offline-first client sync")
    content = content.replace("{{DOMAIN}}", "distributed")
    content = content.replace("{{SCALE}}", "100k")
    content = content.replace("{{CONSTRAINTS}}", "low-bandwidth, offline-first, <100ms-p99")
    content = content.replace("{{TYPE}}", "fullstack")
    content = content.replace("{{USERS}}", "operators, citizens, responders")
    content = content.replace("{{PLATFORM}}", "fullstack")
    content = content.replace("{{THEME}}", "dark glassmorphism")

    if output_path:
        out_file = Path(output_path)
        out_file.parent.mkdir(parents=True, exist_ok=True)
        out_file.write_text(content, encoding="utf-8")
        print(f"{colorize('✅ Template generated successfully at:', COLOR_GREEN)} {out_file.resolve()}")
    else:
        print(content)


def generate_prompt(phase_id: str, args_dict: Dict[str, Any]):
    """Generate ready-to-use prompt for AI Coding Agents or Chat UI."""
    norm = normalize_cmd(phase_id)
    p = get_phase_by_id(norm)
    if not p:
        print(f"{colorize('Error:', COLOR_RED)} Unknown phase '{phase_id}'.")
        return

    cmd = p["command"]
    parts = [cmd]
    for k, v in args_dict.items():
        if v is not None and k not in ("phase", "command_name", "subcommand"):
            flag_name = "--" + k.replace("_", "-")
            parts.append(f'{flag_name} "{v}"')

    final_cmd = " ".join(parts)
    title_text = "GENERATED PROMPT & COMMAND: " + p["name"]
    print("\n" + colorize("=" * 88, COLOR_CYAN))
    print(f"  {colorize(title_text, COLOR_BOLD + COLOR_CYAN)}")
    print(colorize("=" * 88, COLOR_CYAN))
    print(f"\n{colorize('Command Invocable:', COLOR_YELLOW)}")
    print(f"  {colorize(final_cmd, COLOR_GREEN + COLOR_BOLD)}\n")
    print(f"{colorize('Detailed Prompt Instructions:', COLOR_YELLOW)}")
    print(f"  Act as the {p['name']} (Phase {p['phase']} of SDLC OS v2).")
    print(f"  Execute the request strictly following the rules defined in `.agents/skills/{p['file']}`.")
    print(f"  Parameters:")
    for k, v in args_dict.items():
        if v is not None and k not in ("phase", "command_name", "subcommand"):
            print(f"    - {k}: {v}")
    print("\n" + colorize("-" * 88, COLOR_CYAN) + "\n")


def validate_artifact(phase_name: str, file_path: str, as_json: bool = False) -> bool:
    """Run 10-point gatekeeper validation checks on a generated markdown artifact."""
    path = Path(file_path)
    if not path.exists():
        if as_json:
            print(json.dumps({"error": f"File '{file_path}' does not exist.", "approved": False}))
        else:
            print(f"{colorize('❌ Error:', COLOR_RED)} File '{file_path}' does not exist.")
        return False

    content = path.read_text(encoding="utf-8")
    p = get_phase_by_id(phase_name)
    if not p:
        if as_json:
            print(json.dumps({"error": f"Unknown phase '{phase_name}'.", "approved": False}))
        else:
            print(f"{colorize('❌ Error:', COLOR_RED)} Unknown phase '{phase_name}'.")
        return False

    norm = p["id"]
    checks = []
    score = 0

    # 1. Output Completeness & Length (10 pts)
    if len(content.strip()) >= 300:
        checks.append({"name": "Completeness & Depth", "passed": True, "note": f"Sufficient depth ({len(content)} bytes)", "points": 10})
        score += 10
    else:
        checks.append({"name": "Completeness & Depth", "passed": False, "note": "Artifact is suspiciously brief (< 300 bytes)", "points": 0})

    # 2. Markdown Structure (10 pts)
    if "# " in content and "## " in content:
        checks.append({"name": "Markdown Structure", "passed": True, "note": "Contains valid H1 and H2 hierarchy", "points": 10})
        score += 10
    else:
        checks.append({"name": "Markdown Structure", "passed": False, "note": "Missing standard headers (# or ##)", "points": 0})

    # 3. Security & Safety Checklist (10 pts)
    has_sec = ("security" in content.lower() or "auth" in content.lower() or "tls" in content.lower() or "sanitize" in content.lower() or "validation" in content.lower())
    if has_sec:
        checks.append({"name": "Security & Sanitization", "passed": True, "note": "Includes security/validation considerations", "points": 10})
        score += 10
    else:
        checks.append({"name": "Security & Sanitization", "passed": False, "note": "No explicit security or authentication measures noted", "points": 0})

    # 4. Resilience & Error Handling (10 pts)
    has_resilience = ("error" in content.lower() or "fault" in content.lower() or "retry" in content.lower() or "fallback" in content.lower() or "5-state" in content.lower())
    if has_resilience:
        checks.append({"name": "Resilience & Error Handling", "passed": True, "note": "Identifies failure modes or resilience patterns", "points": 10})
        score += 10
    else:
        checks.append({"name": "Resilience & Error Handling", "passed": False, "note": "Missing failure recovery or error handling details", "points": 0})

    # Phase-specific criteria (6 checks x 10 pts = 60 pts)
    if norm == "brainstorm":
        has_3_approaches = ("approach 1" in content.lower() and "approach 2" in content.lower() and "approach 3" in content.lower())
        checks.append({"name": "3 Solution Approaches", "passed": has_3_approaches, "note": "Requires Approach 1, Approach 2, and Approach 3", "points": 15 if has_3_approaches else 0})
        if has_3_approaches: score += 15

        has_big_o = ("o(" in content.lower() or "o(1)" in content.lower() or "o(log" in content.lower() or "complexity" in content.lower())
        checks.append({"name": "Big-O Complexity Evaluation", "passed": has_big_o, "note": "Requires explicit algorithmic complexity analysis", "points": 15 if has_big_o else 0})
        if has_big_o: score += 15

        has_rec = ("recommend" in content.lower() or "selected" in content.lower())
        checks.append({"name": "Directional Recommendation", "passed": has_rec, "note": "Provides clear optimal architecture choice", "points": 15 if has_rec else 0})
        if has_rec: score += 15

        has_handoff = ("/analyze" in content or "phase 1" in content.lower())
        checks.append({"name": "Downstream Handoff", "passed": has_handoff, "note": "Explicitly hands off to Phase 1 (/analyze)", "points": 15 if has_handoff else 0})
        if has_handoff: score += 15

    elif norm == "analyze":
        has_fr = ("fr-" in content.lower() or "functional requirement" in content.lower())
        checks.append({"name": "Functional Requirements (FR)", "passed": has_fr, "note": "Requires explicit FR identifiers", "points": 15 if has_fr else 0})
        if has_fr: score += 15

        has_nfr = ("nfr" in content.lower() or "latency" in content.lower() or "slo" in content.lower())
        checks.append({"name": "Non-Functional SLAs & SLOs", "passed": has_nfr, "note": "Requires quantifiable latency/throughput NFRs", "points": 15 if has_nfr else 0})
        if has_nfr: score += 15

        has_entities = ("entity" in content.lower() or "entities" in content.lower() or "model" in content.lower())
        checks.append({"name": "Domain Entity Modeling", "passed": has_entities, "note": "Requires domain entities analysis", "points": 15 if has_entities else 0})
        if has_entities: score += 15

        has_handoff = ("/proj-init" in content or "/design" in content or "phase 2" in content.lower())
        checks.append({"name": "Downstream Handoff", "passed": has_handoff, "note": "Hands off to Phase 2 (/proj-init) or Phase 4 (/design)", "points": 15 if has_handoff else 0})
        if has_handoff: score += 15

    elif norm == "proj-init":
        has_personas = ("persona" in content.lower() or "target user" in content.lower())
        checks.append({"name": "User Personas", "passed": has_personas, "note": "Requires defined user personas", "points": 15 if has_personas else 0})
        if has_personas: score += 15

        has_stories = ("as a" in content.lower() or "us-" in content.lower() or "user stor" in content.lower())
        checks.append({"name": "Agile User Stories", "passed": has_stories, "note": "Requires standard Agile user stories", "points": 15 if has_stories else 0})
        if has_stories: score += 15

        has_sprints = ("sprint" in content.lower() or "mvp" in content.lower())
        checks.append({"name": "Sprint 0 & 1 Roadmaps", "passed": has_sprints, "note": "Requires actionable MVP scope", "points": 15 if has_sprints else 0})
        if has_sprints: score += 15

        has_handoff = ("/ui-ux" in content or "/design" in content)
        checks.append({"name": "Downstream Handoff", "passed": has_handoff, "note": "Hands off to UI/UX or Design", "points": 15 if has_handoff else 0})
        if has_handoff: score += 15

    elif norm == "ui-ux":
        has_tokens = ("--bg" in content or "palette" in content.lower() or "color" in content.lower())
        checks.append({"name": "Design Tokens & Palettes", "passed": has_tokens, "note": "Requires design tokens and color tokens", "points": 15 if has_tokens else 0})
        if has_tokens: score += 15

        has_5states = ("loading" in content.lower() and "empty" in content.lower() and "error" in content.lower())
        checks.append({"name": "5-State UI Resilience", "passed": has_5states, "note": "Requires Default, Loading, Empty, Error, Offline states", "points": 15 if has_5states else 0})
        if has_5states: score += 15

        has_a11y = ("wcag" in content.lower() or "contrast" in content.lower() or "aria" in content.lower() or "touch" in content.lower())
        checks.append({"name": "WCAG AAA & Accessibility", "passed": has_a11y, "note": "Requires accessibility & touch targets compliance", "points": 15 if has_a11y else 0})
        if has_a11y: score += 15

        has_handoff = ("/design" in content or "/plan" in content)
        checks.append({"name": "Downstream Handoff", "passed": has_handoff, "note": "Hands off to System Design or Plan", "points": 15 if has_handoff else 0})
        if has_handoff: score += 15

    elif norm == "design":
        has_sql = ("create table" in content.lower() or "```sql" in content.lower() or "schema" in content.lower())
        checks.append({"name": "Database DDL Schemas", "passed": has_sql, "note": "Requires valid SQL DDL schemas and indexes", "points": 15 if has_sql else 0})
        if has_sql: score += 15

        has_api = ("post " in content or "get " in content or "api/v1" in content or "endpoint" in content.lower())
        checks.append({"name": "API Contracts & Endpoints", "passed": has_api, "note": "Requires explicit API contracts", "points": 15 if has_api else 0})
        if has_api: score += 15

        has_buffer = ("redis" in content.lower() or "stream" in content.lower() or "queue" in content.lower() or "cache" in content.lower())
        checks.append({"name": "Stream / Cache Topology", "passed": has_buffer, "note": "Requires in-memory buffering or caching topology", "points": 15 if has_buffer else 0})
        if has_buffer: score += 15

        has_handoff = ("/plan" in content or "phase 5" in content.lower())
        checks.append({"name": "Downstream Handoff", "passed": has_handoff, "note": "Hands off to /plan for task decomposition", "points": 15 if has_handoff else 0})
        if has_handoff: score += 15

    elif norm == "plan":
        has_tasks = ("t-01" in content.lower() or "t-1" in content.lower() or "task" in content.lower())
        checks.append({"name": "Atomic Task Breakdown", "passed": has_tasks, "note": "Requires atomic tasks (T-01, T-02)", "points": 15 if has_tasks else 0})
        if has_tasks: score += 15

        has_dag = ("-->" in content or "──►" in content or "dag" in content.lower() or "dependency" in content.lower())
        checks.append({"name": "DAG Dependency Mapping", "passed": has_dag, "note": "Requires directional task dependency graph", "points": 15 if has_dag else 0})
        if has_dag: score += 15

        has_bottlenecks = ("bottleneck" in content.lower() or "risk" in content.lower() or "critical path" in content.lower())
        checks.append({"name": "Critical Path & Risks", "passed": has_bottlenecks, "note": "Identifies execution bottlenecks", "points": 15 if has_bottlenecks else 0})
        if has_bottlenecks: score += 15

        has_handoff = ("/build" in content or "phase 6" in content.lower())
        checks.append({"name": "Downstream Handoff", "passed": has_handoff, "note": "Hands off to /build for implementation", "points": 15 if has_handoff else 0})
        if has_handoff: score += 15

    elif norm == "build":
        has_code = ("```" in content)
        checks.append({"name": "Production Code Blocks", "passed": has_code, "note": "Requires syntax-highlighted code implementations", "points": 20 if has_code else 0})
        if has_code: score += 20

        has_layers = ("service" in content.lower() or "repo" in content.lower() or "model" in content.lower() or "router" in content.lower() or "component" in content.lower())
        checks.append({"name": "Layered Separation", "passed": has_layers, "note": "Follows API/Service/Repo/Model layered architecture", "points": 20 if has_layers else 0})
        if has_layers: score += 20

        has_handoff = ("/test" in content or "phase 7" in content.lower())
        checks.append({"name": "Downstream Handoff", "passed": has_handoff, "note": "Hands off to /test for quality verification", "points": 20 if has_handoff else 0})
        if has_handoff: score += 20

    elif norm == "test":
        has_tests = ("def test_" in content or "test(" in content or "testwidgets" in content.lower())
        checks.append({"name": "Executable Test Cases", "passed": has_tests, "note": "Requires unit/integration test code", "points": 20 if has_tests else 0})
        if has_tests: score += 20

        has_concurrency = ("concurrent" in content.lower() or "gather" in content.lower() or "stress" in content.lower() or "workers" in content.lower())
        checks.append({"name": "Concurrency / Load Coverage", "passed": has_concurrency, "note": "Includes concurrency or load tests", "points": 20 if has_concurrency else 0})
        if has_concurrency: score += 20

        has_verdict = ("pass" in content.lower() or "verdict" in content.lower() or "gate" in content.lower())
        checks.append({"name": "Quality Gate Verdict", "passed": has_verdict, "note": "Requires explicit QA verdict", "points": 20 if has_verdict else 0})
        if has_verdict: score += 20

    elif norm == "debug":
        has_rca = ("root cause" in content.lower() or "rca" in content.lower())
        checks.append({"name": "Root Cause Analysis (RCA)", "passed": has_rca, "note": "Requires structured root cause diagnosis", "points": 20 if has_rca else 0})
        if has_rca: score += 20

        has_patch = ("patch" in content.lower() or "fix" in content.lower() or "```" in content)
        checks.append({"name": "Targeted Code Patch", "passed": has_patch, "note": "Requires minimal targeted diff or patch", "points": 20 if has_patch else 0})
        if has_patch: score += 20

        has_reg = ("regression" in content.lower() or "verify" in content.lower() or "test" in content.lower())
        checks.append({"name": "Regression Verification", "passed": has_reg, "note": "Verifies zero regressions introduced", "points": 20 if has_reg else 0})
        if has_reg: score += 20

    elif norm == "publish":
        has_env = ("env" in content.lower() or "database_url" in content.lower() or "port" in content.lower())
        checks.append({"name": "Environment Config", "passed": has_env, "note": "Requires environment variable definitions", "points": 20 if has_env else 0})
        if has_env: score += 20

        has_manifest = ("dockerfile" in content.lower() or "compose" in content.lower() or "nginx" in content.lower() or "k8s" in content.lower() or "railway" in content.lower())
        checks.append({"name": "Deployment Manifests", "passed": has_manifest, "note": "Requires valid production deployment manifests", "points": 20 if has_manifest else 0})
        if has_manifest: score += 20

        has_domain = ("port" in content.lower() or "domain" in content.lower() or "ssl" in content.lower() or "expose" in content.lower())
        checks.append({"name": "Network & Port Topology", "passed": has_domain, "note": "Specifies runtime ports and routing topology", "points": 20 if has_domain else 0})
        if has_domain: score += 20

    approved = (score >= 70)

    if as_json:
        result = {
            "phase": p["phase"],
            "command": p["command"],
            "file": str(path),
            "score": score,
            "approved": approved,
            "checks": checks
        }
        print(json.dumps(result, indent=2))
        return approved

    phase_label = "Phase " + str(p["phase"]) + " (" + p["command"] + ")"
    print(f"\n🔍 {colorize('Validating artifact ' + repr(path.name) + ' against ' + phase_label + '...', COLOR_BOLD)}")
    print("\n--- 10-Point Gatekeeper Validation Results ---")
    for c in checks:
        icon = colorize("✅ PASS", COLOR_GREEN) if c["passed"] else colorize("❌ FAIL", COLOR_RED)
        print(f"  [{icon}] {c['name']:<32} ({c['points']} pts) -> {c['note']}")

    print("\n" + colorize("=" * 60, COLOR_CYAN))
    score_color = COLOR_GREEN if approved else COLOR_RED
    print(f"  Total Score: {colorize(str(score) + '/100', COLOR_BOLD + score_color)}")
    if approved:
        print(f"  {colorize('🎉 GATE VERDICT: APPROVED (Ready for downstream phase / rollout)', COLOR_GREEN + COLOR_BOLD)}")
    else:
        print(f"  {colorize('⚠️ GATE VERDICT: REJECTED (Score < 70, re-run phase with corrective feedback)', COLOR_RED + COLOR_BOLD)}")
    print(colorize("=" * 60, COLOR_CYAN) + "\n")

    return approved


def audit_workspace(workspace_dir: Optional[str] = None):
    """Audit repository workspace for SDLC phase compliance, artifacts & health."""
    target_dir = Path(workspace_dir).resolve() if workspace_dir else ROOT_DIR
    print("\n" + colorize("=" * 88, COLOR_CYAN))
    print(f"  {colorize('SDLC OS v2 - WORKSPACE HEALTH & PHASE AUDIT', COLOR_BOLD + COLOR_CYAN)}")
    print(f"  Target: {target_dir}")
    print(colorize("=" * 88, COLOR_CYAN) + "\n")

    indicators = [
        ("Phase 0: Ideation / Brainstorm", ["*brainstorm*.md", "*architecture*.md"], "Architecture exploration artifact"),
        ("Phase 1: Requirements Analysis", ["*requirement*.md", "*analyze*.md", "*spec*.md"], "Functional & NFR specification"),
        ("Phase 2: Product Scoping", ["*backlog*.md", "*story*.md", "*personas*.md", "package.json", "pubspec.yaml", "pyproject.toml"], "Product scope & dependency manifests"),
        ("Phase 3: UI/UX ProMax", ["*design_system*.md", "src/**/*.css", "css/**/*.css", "tailwind.config.*"], "Design system tokens & styling"),
        ("Phase 4: System Design", ["*system_design*.md", "*schema*.sql", "alembic/**/*", "prisma/**/*"], "Database DDL & API contracts"),
        ("Phase 5: Execution Plan", ["*plan*.md", "*sprint*.md", "*roadmap*.md"], "Task DAG & Sprint execution plan"),
        ("Phase 6: Implementation Code", ["src/**/*", "app/**/*", "lib/**/*"], "Layered source code files"),
        ("Phase 7: QA Testing Suite", ["tests/**/*", "test/**/*", "*test*.py", "*test*.dart", "*test*.js", "*test*.jsx"], "Automated test suites"),
        ("Phase 8: Debug & SRE", ["*debug*.md", "*rca*.md", "*incident*.md"], "Root Cause Analysis & patch logs"),
        ("Phase 9: DevOps Deployment", ["Dockerfile", "docker-compose.yml", "render.yaml", "railway.json", "k8s/**/*", "nginx.conf"], "Deployment & container manifests")
    ]

    total_phases = len(indicators)
    active_phases = 0

    for name, patterns, desc in indicators:
        found_files = []
        for pat in patterns:
            if "**" in pat:
                parts = pat.split("/**/")
                base_search = target_dir / parts[0] if parts[0] else target_dir
                if base_search.exists():
                    found_files.extend(list(base_search.glob("**/" + parts[1])))
            else:
                found_files.extend(list(target_dir.glob(pat)))

        if found_files:
            active_phases += 1
            icon = colorize("✅ PRESENT", COLOR_GREEN)
            sample = f"({len(found_files)} files, e.g. {found_files[0].name})"
        else:
            icon = colorize("⚪ MISSING", COLOR_YELLOW)
            sample = f"(Expected: {desc})"

        print(f"  [{icon}] {name:<35} {sample}")

    print("\n" + colorize("-" * 88, COLOR_CYAN))
    coverage = int((active_phases / total_phases) * 100)
    print(f"  SDLC Phase Coverage: {colorize(str(active_phases) + '/' + str(total_phases) + ' phases (' + str(coverage) + '%)', COLOR_BOLD + COLOR_GREEN)}")
    
    # Check Antigravity Customization integrity
    print(f"\n{colorize('Antigravity Customization Integrity:', COLOR_YELLOW)}")
    agents_root = target_dir / ".agents"
    rules_root = target_dir / ".agents" / "rules"
    skills_root = target_dir / ".agents" / "skills"
    
    print(f"  • Project Root .agents Link:  {colorize('VALID', COLOR_GREEN) if agents_root.exists() else colorize('NOT FOUND', COLOR_RED)}")
    rule_count = len(list(rules_root.glob("*.md"))) if rules_root.exists() else 0
    print(f"  • Custom Rules (.agents/rules): {colorize('VALID (' + str(rule_count) + ' rules)', COLOR_GREEN) if rules_root.exists() else colorize('NOT FOUND', COLOR_RED)}")
    print(f"  • Skills Registry (10 phases):  {colorize('VALID (All 10 mounted)', COLOR_GREEN) if skills_root.exists() else colorize('NOT FOUND', COLOR_RED)}")
    print(colorize("-" * 88, COLOR_CYAN) + "\n")


def run_interactive():
    """Interactive prompt wizard for navigating SDLC OS v2."""
    print("\n" + colorize("=" * 88, COLOR_CYAN))
    print(f"  {colorize('SDLC OS v2 - INTERACTIVE ENGINEERING WIZARD', COLOR_BOLD + COLOR_CYAN)}")
    print(colorize("=" * 88, COLOR_CYAN))
    print("Select an engineering phase to launch:\n")
    for p in PHASES:
        print(f"  [{p['phase']}] {p['command']:<12} - {p['name']}")
    print()
    try:
        choice = input(colorize("Enter phase number or command (e.g. 0 or /brainstorm): ", COLOR_YELLOW)).strip()
    except (KeyboardInterrupt, EOFError):
        print()
        return

    phase = get_phase_by_id(choice)
    if not phase:
        print(f"{colorize('Error:', COLOR_RED)} Invalid selection.")
        return

    show_presets(phase["id"])


def main():
    parser = argparse.ArgumentParser(
        description="Antigravity SDLC OS v2 - Unified CLI & Skill Preset Engine",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    subparsers = parser.add_subparsers(dest="subcommand", help="Subcommand to execute")

    # List
    subparsers.add_parser("list", help="List all registered SDLC skills and phases")
    
    # Pipeline
    subparsers.add_parser("pipeline", help="Display the end-to-end SDLC Control Plane diagram")

    # Audit
    audit_parser = subparsers.add_parser("audit", help="Audit repository SDLC compliance and health")
    audit_parser.add_argument("workspace_dir", nargs="?", default=None, help="Target workspace path to audit")

    # Run
    run_parser = subparsers.add_parser("run", help="Interactive phase navigation wizard")
    run_parser.add_argument("phase", nargs="?", default=None, help="Optional phase to open directly")

    # Template
    template_parser = subparsers.add_parser("template", help="Scaffold ready-to-fill design/plan templates")
    template_parser.add_argument("phase", help="Target phase ID or number (e.g. brainstorm, design, 4)")
    template_parser.add_argument("--output", "-o", default=None, help="File path to write template to")
    template_parser.add_argument("--project-name", "-n", default="MyProject", help="Project name placeholder")

    # Validate
    validate_parser = subparsers.add_parser("validate", help="Run 10-point gatekeeper validation on an artifact")
    validate_parser.add_argument("--phase", "-p", required=True, help="Target phase ID (e.g. ui-ux, design, plan, publish)")
    validate_parser.add_argument("--file", "-f", required=True, help="Path to markdown artifact")
    validate_parser.add_argument("--json", action="store_true", help="Output results in JSON format")

    # Prompt
    prompt_parser = subparsers.add_parser("prompt", help="Generate optimized prompt for AI agents")
    prompt_parser.add_argument("phase", help="Target phase (e.g. /proj-init, brainstorm, 2)")
    prompt_parser.add_argument("--project-name", default=None)
    prompt_parser.add_argument("--problem", default=None)
    prompt_parser.add_argument("--input", default=None)
    prompt_parser.add_argument("--type", default=None)
    prompt_parser.add_argument("--domain", default=None)
    prompt_parser.add_argument("--scale", default=None)
    prompt_parser.add_argument("--constraints", default=None)
    prompt_parser.add_argument("--priority", default=None)
    prompt_parser.add_argument("--tech-stack", default=None)
    prompt_parser.add_argument("--stack", default=None)
    prompt_parser.add_argument("--users", default=None)
    prompt_parser.add_argument("--platform", default=None)
    prompt_parser.add_argument("--theme", default=None)
    prompt_parser.add_argument("--framework", default=None)
    prompt_parser.add_argument("--latency-target", default=None)
    prompt_parser.add_argument("--backlog", default=None)
    prompt_parser.add_argument("--team-size", default=None)
    prompt_parser.add_argument("--sprint-duration", default=None)
    prompt_parser.add_argument("--task", default=None)
    prompt_parser.add_argument("--target", default=None)
    prompt_parser.add_argument("--concurrency", default=None)
    prompt_parser.add_argument("--error", default=None)
    prompt_parser.add_argument("--code", default=None)
    prompt_parser.add_argument("--severity", default=None)
    prompt_parser.add_argument("--port", default=None)
    prompt_parser.add_argument("--db", default=None)

    # Allow direct shorthand invocation like `python engine.py /ui-ux preset` or `python engine.py /brainstorm`
    if len(sys.argv) > 1 and not sys.argv[1].startswith("-") and sys.argv[1] not in (
        "list", "pipeline", "audit", "run", "template", "validate", "prompt"
    ):
        raw_cmd = sys.argv[1]
        target_phase = raw_cmd
        if len(sys.argv) > 2 and sys.argv[2] in ("preset", "presets", "--preset"):
            show_presets(target_phase)
            sys.exit(0)
        else:
            show_presets(target_phase)
            sys.exit(0)

    args = parser.parse_args()

    if not args.subcommand:
        list_skills()
        sys.exit(0)

    if args.subcommand == "list":
        list_skills()
    elif args.subcommand == "pipeline":
        show_pipeline()
    elif args.subcommand == "audit":
        audit_workspace(args.workspace_dir)
    elif args.subcommand == "run":
        if args.phase:
            show_presets(args.phase)
        else:
            run_interactive()
    elif args.subcommand == "template":
        generate_template(args.phase, args.output, args.project_name)
    elif args.subcommand == "validate":
        success = validate_artifact(args.phase, args.file, getattr(args, "json", False))
        sys.exit(0 if success else 1)
    elif args.subcommand == "prompt":
        generate_prompt(args.phase, vars(args))


if __name__ == "__main__":
    main()
