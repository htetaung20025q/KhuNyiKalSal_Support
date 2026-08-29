# Antigravity SDLC OS v2 - Permanent Agent Guidelines & Memory

Welcome to the **KhuNyiKalSal Support Platform & AI Agentic SDLC OS v2** codebase.

## 🤖 Persistent System Memory
All AI coding agents operating in this repository must automatically adhere to the **Antigravity AI Agentic SDLC OS v2** methodology across all development, design, testing, and deployment workflows.

## 🛠️ Multi-Agent SDLC Phase Skills
Activate specialized phase skills via their slash commands or CLI engine:

| Phase | Slash Command | Agent Role | Capabilities & Hand-offs |
| :--- | :--- | :--- | :--- |
| **0** | `/brainstorm` | **Solution Architect** | Explores 3 architectural options (MVP, Scalable, Advanced), Big-O analysis, and tech tradeoffs. |
| **1** | `/analyze` | **Requirement Analyst** | Functional (FR) and non-functional (NFR) analysis, entity relationships, and hidden complexity. |
| **2** | `/proj-init` | **Product Scope Manager** | Lean MVP boundaries, user personas, agile user stories, and sprint backlog. |
| **3** | `/ui-ux` | **UI/UX ProMax Architect** | High-polish design systems, glassmorphism, 5-state UI resilience, micro-interactions, WCAG AAA. |
| **4** | `/design` | **System Design Architect** | PostgreSQL 16 schemas (DDL), API contracts, Redis 7.2 streams, and caching architectures. |
| **5** | `/plan` | **Execution Plan Manager** | Atomic developer tasks (<2 days), effort matrix, and Directed Acyclic Graph (DAG) sequences. |
| **6** | `/build` | **Code Engine Engineer** | Production code generation (API, Service, Repo, Models) strictly following the DAG. |
| **7** | `/test` | **QA & Reliability Validator** | Unit, integration, 50-worker concurrency, negative scenarios, and chaos testing. |
| **8** | `/debug` | **Self-Healing SRE Agent** | Root Cause Analysis (RCA) and minimal targeted code diff patches with zero regression. |
| **9** | `/publish` | **Universal DevOps Generator** | Deployment manifests for Railway, Docker, Render, VPS (Ubuntu/Nginx), AWS ECS, and Kubernetes. |

## 🚀 CLI Automation with `engine.py`
Invoke the CLI engine at `Agentic-Skills/engine.py`:
- `python3 Agentic-Skills/engine.py list`: List all 10 registered skills and their paths.
- `python3 Agentic-Skills/engine.py pipeline`: View the end-to-end SDLC Control Plane diagram.
- `python3 Agentic-Skills/engine.py <phase> preset`: View domain-specific ready-to-run presets.
- `python3 Agentic-Skills/engine.py prompt <phase>`: Generate rich, production prompts for any phase.
- `python3 Agentic-Skills/engine.py template <phase>`: Scaffold starter markdown documents.
- `python3 Agentic-Skills/engine.py validate --phase <phase> --file <path> [--json]`: Run the 10-point gatekeeper check.
- `python3 Agentic-Skills/engine.py audit`: Check repository SDLC compliance and health.

## 📐 Non-Negotiable Engineering Guidelines
1. **Never mock database locking in tests**; test real concurrency or write explicit stress tests.
2. **Enforce 5 UI states** on all components: Default, Loading, Empty, Error, and Partial/Offline.
3. **Follow layered separation**: API / Router -> Service -> Repository -> Model.
4. **Prioritize offline-first capabilities** for mobile and low-connectivity environments.
