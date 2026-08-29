# Agile Project Initialization Template

Use this markdown template when producing the initialization deliverable for a new project.

---

### Project Overview
- **Name:** <Project Name>
- **Type:** <web | mobile | backend | ai | fullstack | desktop>
- **Description:** <Concise description of the system and its primary purpose>
- **Target Users:** <Primary personas and audience>

---

### MVP Scope
- **Core Problem:** <The primary pain point or inefficiency the MVP solves>
- **Key Features:**
  - <Feature 1: Essential core flow>
  - <Feature 2: Essential supporting flow>
  - <Feature 3: Minimal data persistence/sync>
- **Out of Scope (Post-MVP):**
  - <Advanced feature deferred to later phases>
  - <Non-critical optimizations or integrations>

---

### User Personas

#### Persona 1: <Persona Name>
- **Role:** <Title / User Type>
- **Background & Context:** <Key background or operating conditions, e.g., low connectivity>
- **Needs:** <Primary objectives and problems to solve>

#### Persona 2: <Persona Name>
- **Role:** <Title / User Type>
- **Background & Context:** <Key background or operating conditions>
- **Needs:** <Primary objectives and problems to solve>

---

### User Stories
- **US-01:** As a `<user persona>`, I want `<feature/capability>` so that `<benefit/value>`.
- **US-02:** As a `<user persona>`, I want `<feature/capability>` so that `<benefit/value>`.
- **US-03:** As a `<user persona>`, I want `<feature/capability>` so that `<benefit/value>`.

---

### Product Backlog

| ID | Feature | Priority | Description | Acceptance Criteria |
|:---|:--------|:---------|:------------|:--------------------|
| 1  | <Feature Name> | High     | <Concise feature description> | <Key verifiable condition> |
| 2  | <Feature Name> | High     | <Concise feature description> | <Key verifiable condition> |
| 3  | <Feature Name> | Medium   | <Concise feature description> | <Key verifiable condition> |
| 4  | <Feature Name> | Low      | <Concise feature description> | <Key verifiable condition> |

---

### Sprint Plan

#### Sprint 0 (Foundation & Environment Setup)
- [ ] Initialize Git repository, `.gitignore`, and branching strategy.
- [ ] Setup folder hierarchy for backend (`FastAPI`) and frontend (`Flutter`).
- [ ] Configure database schema, local migrations, and seed scripts.
- [ ] Configure linting, formatting, environment configs (`.env`), and base CI pipelines.

#### Sprint 1 (Core MVP Development)
- [ ] **Backend:** Implement core API endpoints for highest-priority MVP feature (ID 1 & 2).
- [ ] **Frontend:** Implement primary screen and state management for core user workflow.
- [ ] **Integration:** Connect frontend with backend API endpoints with offline/error resilience.
- [ ] **Verification:** Run unit/integration tests and validate basic end-to-end user flow.

---

### Folder Structure

```text
project/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   └── endpoints/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── crud/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── lib/
│   │   ├── core/
│   │   │   ├── network/
│   │   │   └── theme/
│   │   ├── models/
│   │   ├── providers/
│   │   ├── screens/
│   │   └── widgets/
│   ├── test/
│   └── pubspec.yaml
└── docs/
    └── architecture.md
```

---

### Initial Tasks
- [ ] **Task 1:** Initialize repository and setup base folder structure.
- [ ] **Task 2:** Scaffold backend application with FastAPI and verify `/health` endpoint.
- [ ] **Task 3:** Scaffold Flutter frontend application with routing and theme structure.
- [ ] **Task 4:** Define database schema and write initial migration script.
