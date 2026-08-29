---
trigger: always_on
description: Production security, authentication, and UI 5-state resilience standards.
---

# Production Security & UI Resilience Standards

## 1. UI 5-State Component Resilience
All frontend UI components (React / Vite / Flutter) must handle 5 distinct states:
1. **Default / Ideal**: Clean, polished state with proper typography and spacing.
2. **Loading**: Skeleton screens, subtle spinners, and smooth transitions (no layout jumps).
3. **Empty**: Helpful empty state illustrations and clear actionable call-to-action buttons.
4. **Error**: User-friendly error message, retry trigger button, and localized copy.
5. **Partial / Offline**: Indicating stale or locally cached data with an offline sync indicator.

## 2. Security & Data Protection
- **Secrets & Credentials**: Never hardcode API keys, JWT secrets, or DB credentials. Always ingest via environment variables (`.env`).
- **Input Sanitization**: Sanitize all user inputs to prevent XSS, SQL injection, and path traversal.
- **CORS & Headers**: Strict CORS origin configuration, `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
- **Authentication & Authorization**: Role-based access control (RBAC), signed JWT with short expiration and refresh tokens.
