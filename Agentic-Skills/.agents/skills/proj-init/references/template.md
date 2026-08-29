# Agile Project Initialization Template (CLI Command Enabled)

Use this markdown template when producing the initialization deliverable for a new project.

---

### Project Overview
- **Name:** <Project Name>
- **Type:** <web | mobile | backend | ai | fullstack | desktop>
- **Stack:** <Selected / Inferred Tech Stack>
- **Description:** <Concise description of the system and its primary purpose>
- **Target Users:** <Primary personas and audience>

---

### MVP Scope
- **Core Features:**
  - <Feature 1: Essential core flow>
  - <Feature 2: Essential supporting flow>
  - <Feature 3: Minimal data persistence / sync>
- **Out of Scope (Post-MVP):**
  - <Advanced feature deferred to later phases>
  - <Non-critical optimizations or integrations>

---

### User Personas

#### Persona 1: <Persona Name / Role>
- **Role:** <Title / User Type>
- **Needs:** <Primary objectives, pain points, and requirements>

#### Persona 2: <Persona Name / Role>
- **Role:** <Title / User Type>
- **Needs:** <Primary objectives, pain points, and requirements>

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
- [ ] Setup base project structure for selected tech stack.
- [ ] Configure database schema, local migrations, and seed scripts.
- [ ] Configure linting, formatting, environment configs (`.env`), and base CI pipelines.

#### Sprint 1 (Core MVP Feature Development)
- [ ] **Core Business Logic / API:** Implement core endpoints for highest-priority MVP feature (ID 1 & 2).
- [ ] **UI & State Management:** Implement primary screen and state management for core user workflow.
- [ ] **Integration:** Connect frontend with backend API endpoints with offline/error resilience.
- [ ] **Verification:** Run unit/integration tests and validate basic end-to-end user flow.

---

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

---

### Initial Tasks
- [ ] **Task 1:** Initialize repository and setup base folder structure.
- [ ] **Task 2:** Scaffold backend application with FastAPI and verify health endpoint.
- [ ] **Task 3:** Scaffold frontend/mobile application with routing and theme structure.
- [ ] **Task 4:** Define database schema and write initial migration script.
