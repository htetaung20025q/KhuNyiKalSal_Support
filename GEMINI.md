# Project Configuration & Permanent Assistant Guidelines

## 🤖 Persistent Memory: AI Agentic SDLC OS v2 Active
This workspace integrates **KhuNyiKalSal Support Platform** with **Antigravity AI Agentic SDLC OS v2**.
For all development, refactoring, planning, debugging, and testing tasks in this repository, **ALWAYS apply the AI Agentic multi-agent engineering framework**:

1. **Phase Pipeline**:
   - `/brainstorm` (Phase 0): Architecture exploration & trade-offs.
   - `/analyze` (Phase 1): Requirement analysis & domain entity modeling.
   - `/proj-init` (Phase 2): Agile scope & backlog management.
   - `/ui-ux` (Phase 3): 5-state UI resilience, WCAG AAA accessibility, design tokens.
   - `/design` (Phase 4): System design blueprints, PostgreSQL DDL schemas, API contracts.
   - `/plan` (Phase 5): Atomic task DAGs and sprint roadmaps.
   - `/build` (Phase 6): Production code generation with layered architecture.
   - `/test` (Phase 7): QA test suites (unit, integration, concurrency, chaos).
   - `/debug` (Phase 8): Root cause analysis & minimal self-healing patches.
   - `/publish` (Phase 9): Production DevOps manifests (Docker, Nginx, Railway, VPS, K8s).

2. **CLI Engine & Automation**:
   - Use `python3 Agentic-Skills/engine.py <command>` for presets, templates, prompt building, artifact validation, and health auditing.

3. **Core Engineering Directives**:
   - **5-State UI Resilience**: All UI components must support Default, Loading, Empty, Error, and Partial/Offline states.
   - **Layered Architecture**: Strictly separate API/Routers -> Services -> Repositories -> Models.
   - **Offline-First & Concurrency**: Prioritize offline data availability and never mock row locking in concurrent operations.

## Rules & Standards
- Coding Standards: `.agents/rules/code-standards.md`
- Security & Resilience: `.agents/rules/security-and-resilience.md`
- Offline-First Architecture: `.agents/rules/offline-first.md`
- SDLC Pipeline Specs: `.agents/skills/PIPELINE.md`
