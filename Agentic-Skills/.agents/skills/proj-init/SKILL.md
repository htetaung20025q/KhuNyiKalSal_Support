---
name: proj-init
description: >-
  Phase 2 of the SDLC Pipeline. Initializes a new software project using Agile SDLC methodologies with full support for CLI-style
  command invocations (`/proj-init --project-name <name> --type <type> [options]`) and natural language requests.
  Parses command flags, validates required parameters, applies modern stack defaults (Python 3.12, FastAPI 0.111+, Flutter 3.22+, Next.js 14+),
  defines MVP scope, generates user personas and user stories, builds prioritized backlogs, plans Sprint 0 & Sprint 1, and produces
  folder structure and initial tasks. Ingests requirements from `/analyze` (Phase 1) and hands off to `/ui-ux` (Phase 3) and `/design` (Phase 4).
---

# Project Initialization with Agile SDLC (CLI Command Enabled)

## SDLC Pipeline Integration
This skill represents **Phase 2 (Project Scoping & Backlog Generation)** in the 10-phase engineering pipeline:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Integration (from [Phase 1: `/analyze`](../analyze/SKILL.md)):** Ingests extracted functional requirements (FRs), non-functional SLAs (NFRs), domain entities, and constraints.
- **Downstream Handoffs:**
  - **To Phase 3 ([`/ui-ux`](../ui-ux-promax/SKILL.md)):** Delivers user personas, user stories, and MVP UI scope to design tokens, wireframes, and 5-state components.
  - **To Phase 4 ([`/design`](../system-design/SKILL.md)):** Uses MVP Scope and Feature List to architect database schemas, API contracts, algorithms, and caching layers.
  - **To Phase 5 ([`/plan`](../plan/SKILL.md)):** Ingests the generated Product Backlog to decompose features into atomic engineering tasks, DAG dependency graphs, and effort estimates.

---

## When to Activate

- When the user runs the `/proj-init` command or provides CLI-style flags (`--project-name`, `--type`, etc.).
- When initializing a new project quickly via compact, parameter-driven inputs after requirement analysis.
- When the user wants structured Agile planning (MVP, backlog, sprints) for developer tools, AI agent CLI systems, or applications.
- When transforming analyzed requirements into a development-ready project structure.

---

## Command Syntax & Parameters

### Command Format
```bash
/proj-init --project-name <name> --type <project_type> [options]
```

### Supported Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--project-name` / `--name` | `string` | **Yes** | Name of the project (e.g., `Logistic`, `SOSApp`, `HealthTrack`). |
| `--type` | `enum` | **Yes** | Project architecture type: `web`, `mobile`, `backend`, `ai`, `fullstack`, `desktop`. |
| `--stack` | `string` | No | Tech stack (e.g., `fastapi`, `flutter`, `react`, `nextjs`, `pytorch`). |
| `--constraints` | `string` | No | Operational/system constraints (e.g., `offline-first`, `low-bandwidth`, `low-latency`). |
| `--users` / `--target-users` | `string` | No | Description of target users/personas (e.g., `warehouse staff, inventory managers`). |

### Example Invocations
```bash
# Minimal Backend
/proj-init --project-name Logistic --type backend

# Mobile app with stack and constraints
/proj-init --project-name SOSApp --type mobile --stack flutter --constraints offline-first

# Fullstack AI application
/proj-init --project-name DocuBrain --type ai --stack "fastapi, react, langchain" --users "legal researchers, compliance officers"
```

---

## Core Rules & Principles

1. **CLI Parsing & Validation**:
   - Parse all flag arguments accurately.
   - If `--project-name` or `--type` is missing, inform the user of the required parameters with command usage examples.
2. **Intelligent Stack Defaults**:
   - If `--stack` is not provided:
     - **Backend** &rarr; `FastAPI` (Python)
     - **Mobile** &rarr; `Flutter` (Dart)
     - **Web** &rarr; `Next.js` / `React` + `FastAPI`
     - **AI / Data** &rarr; `FastAPI` + `PyTorch` / `HuggingFace` / `LangChain`
     - **Fullstack** &rarr; `FastAPI` + `Flutter` (or `React`)
3. **Environment & Constraint Optimization**:
   - If `--constraints` mentions `offline-first`, `low-bandwidth`, or `low-connectivity` (e.g., Myanmar context), enforce local SQLite/Hive caching, optimistic updates, and lightweight JSON/Protobuf payloads.
4. **Lean & Testable MVP**: Keep MVP scope strictly minimal and focused on the core value proposition.
5. **Structured & Actionable Output**:
   - Output must be clean, crisp, and directly usable by developers and AI agents.
   - Avoid conversational filler or unnecessary introductory/concluding boilerplate.
   - Strictly follow the [Output Template](#output-template).

---

## Execution Workflow (10 Steps)

1. **Parse CLI Input / Analyze Handoff**: Extract `--project-name`, `--type`, `--stack`, `--constraints`, and `--users`.
2. **Validate Parameters**: Ensure required arguments (`project-name` and `type`) are present.
3. **Infer Missing Values**: Apply default tech stack and infer target users/constraints if unspecified.
4. **Define MVP Scope**: Clarify the core problem, list essential MVP features, and establish explicit out-of-scope boundaries.
5. **Generate User Personas**: Define 2 distinct personas with roles and core needs.
6. **Create User Stories**: Formulate user stories in standard format: `As a [user], I want [feature] so that [benefit]`.
7. **Build Product Backlog**: Create a prioritized backlog table (`High`, `Medium`, `Low`) with acceptance criteria.
8. **Prioritize Features**: Ensure `High` priority items map directly to Sprint 1 MVP deliverables.
9. **Generate Sprint 0 (Setup)**: Detail environment setup, repo scaffolding, DB schema, and CI/CD baseline.
10. **Generate Sprint 1 (Core MVP)**: Detail core API endpoints, primary UI screens, and integration steps.
11. **Next Phase Recommendation**: Prompt the user to proceed to **Phase 3 ([`/ui-ux`](../ui-ux-promax/SKILL.md))** for UI/UX design system generation, **Phase 4 ([`/design`](../system-design/SKILL.md))** for technical blueprinting, or **Phase 5 ([`/plan`](../plan/SKILL.md))** for engineering sprint task decomposition.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
### Project Overview
- **Name:** <Project Name>
- **Type:** <Project Type>
- **Stack:** <Selected / Inferred Tech Stack>
- **Description:** <Concise 2-3 sentence project summary>
- **Target Users:** <Target Audience description>

### MVP Scope
- **Core Features:**
  - <Key MVP Feature 1>
  - <Key MVP Feature 2>
- **Out of Scope (Post-MVP):**
  - <Deferred Feature 1>
  - <Deferred Feature 2>

### User Personas
- **Persona 1:**
  - **Name / Role:** <Role Name>
  - **Needs:** <Primary pain points & goals>
- **Persona 2:**
  - **Name / Role:** <Role Name>
  - **Needs:** <Primary pain points & goals>

### User Stories
- As a <user>, I want <feature> so that <benefit>
- As a <user>, I want <feature> so that <benefit>

### Product Backlog
| ID | Feature | Priority | Description | Acceptance Criteria |
|:---|:--------|:---------|:------------|:--------------------|
| 1  | <Name>  | High     | <Summary>   | <Verification condition> |
| 2  | <Name>  | Medium   | <Summary>   | <Verification condition> |

### Sprint Plan

#### Sprint 0 (Foundation & Environment Setup)
- [ ] Initialize repository and folder structure
- [ ] Setup base framework and verify health endpoint
- [ ] Configure database schema and migrations
- [ ] Setup linting, formatting, and CI/CD basics

#### Sprint 1 (Core MVP Feature Development)
- [ ] Implement core API endpoints / business logic
- [ ] Implement primary user interface / state management
- [ ] Connect frontend to backend with error & connectivity handling
- [ ] Perform end-to-end integration and sanity tests

### Folder Structure
```text
project/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── lib/
│   │   ├── screens/
│   │   └── widgets/
│   └── pubspec.yaml
└── docs/
```

### Initial Tasks
- [ ] Setup repository
- [ ] Initialize backend / frontend
- [ ] Define database schema

---

### Recommended Next Steps in Pipeline
- Run `/ui-ux --project-name <name> --platform <platform>` to generate the UI/UX design system (Phase 3: Design tokens, wireframes, 5-state components).
- Run `/design --project-name <name> --type <type>` to generate the production system design blueprint (Phase 4: DDL schemas, API contracts, Big-O algorithm choices).
- Run `/plan --project-name <name> --backlog <items>` to generate atomic engineering tasks, DAG dependency graphs, and resource estimates (Phase 5).
```

---

## Reference Examples

Detailed end-to-end examples:
- **Backend Service (`/proj-init --project-name Logistic --type backend`)**: See [examples.md](./references/examples.md#example-1-logistic-backend-service)
- **Mobile App with Constraints (`/proj-init --project-name SOSApp --type mobile --stack flutter --constraints offline-first`)**: See [examples.md](./references/examples.md#example-2-emergency-sos-mobile-app)
