---
name: ui-ux
description: >-
  Phase 3 of the SDLC Pipeline. Principal UI/UX Designer, Design System Architect, and Frontend Experience Engineer (UI/UX ProMax).
  Transforms user stories and system requirements into world-class, premium user interfaces with rich design systems,
  glassmorphism, micro-animations, responsive web/mobile layouts, accessibility (WCAG AAA), and 5-state component resilience
  (Default, Loading, Empty, Error, Success). Triggered via `/ui-ux`, `/design-ui`, or natural language requests for UI/UX design.
---

# UI/UX ProMax & Design System Architecture Engine

## SDLC Pipeline Integration
This skill represents **Phase 3 (UI/UX Experience Design & Design System Engineering)** in the end-to-end SDLC engineering operating system:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
  (Architecture)      (Requirements)    (Scoping)        (UI/UX ProMax)    (Blueprint)    (Sprint DAG)    (Code Engine)   (QA Validator)   (Self-Healing)   (DevOps Engine)
```

- **Upstream Dependencies (from [Phase 2: `/proj-init`](../proj-init/SKILL.md)):** Ingests user personas, user stories, MVP scope, and platform constraints (Web / Flutter mobile / low-bandwidth).
- **Downstream Handoffs:**
  - **To [Phase 4: `/design`](../system-design/SKILL.md):** Supplies frontend component data contracts, state mutation triggers, and pagination/filtering UI requirements.
  - **To [Phase 6: `/build`](../code-generation/SKILL.md):** Supplies exact CSS variables, design tokens, Flutter theme data, and responsive component code.

---

## When to Use
- When designing modern, beautiful, and dynamic web or mobile user interfaces.
- When creating a cohesive **Design System** (color palettes, typography scale, spacing tokens, elevations).
- When converting user stories into high-fidelity component layouts and wireframes.
- When defining micro-interactions, hover effects, skeleton loaders, and responsive layouts.
- When the user runs `/ui-ux` or `/design-ui`.

---

## Command Format
```bash
/ui-ux --project-name <name> --platform <web|mobile|fullstack> [options]
```

### Supported Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--project-name` / `--name` | `string` | **Yes** | Name of the project or application. |
| `--platform` / `--target` | `enum` | **Yes** | Target UI platform: `web`, `mobile`, `desktop`, `fullstack`. |
| `--theme` | `enum` | No | Aesthetic theme: `dark` (default), `light`, `glassmorphism`, `cyberpunk`, `minimal-nordic`. |
| `--framework` | `string` | No | Frontend technology: `vanilla-css`, `flutter`, `tailwind`, `react`, `nextjs`. Default: `vanilla-css` for web, `flutter` for mobile. |
| `--constraints` | `string` | No | Operational UX constraints (e.g., `offline-first`, `low-bandwidth`, `touch-friendly`, `wcag-aaa`). |

### Example Invocations
```bash
# Real-time logistics tracking mobile & web dashboard
/ui-ux --project-name "FleetTracker" --platform fullstack --theme dark --constraints "offline-first, touch-friendly"

# Fintech double-entry ledger analytics portal
/ui-ux --project-name "PayLedger" --platform web --theme glassmorphism --framework vanilla-css

# Rural telemedicine portal (Offline-First, Low-Bandwidth)
/ui-ux --project-name "CareSync" --platform mobile --framework flutter --constraints "offline-first, low-bandwidth, high-contrast"
```

---

## Core UI/UX ProMax Design Principles

1. **Rich & Premium Aesthetics (Strictly No Generic/Boring UIs)**:
   - Curated HSL color palettes with deep slate/charcoal backgrounds, vibrant electric accents, and subtle gradient highlights.
   - Glassmorphic surfaces with layered elevation (`backdrop-filter: blur(16px)` with delicate `rgba(255,255,255,0.08)` borders).
   - Modern typography from Google Fonts (`Inter`, `Outfit`, `Plus Jakarta Sans`, `Roboto Mono` for numbers/data).
2. **5-State Component Resilience**:
   - Every interactive component or screen MUST explicitly define 5 states:
     1. **Default State:** Clean layout with populated data.
     2. **Loading State:** Shimmering skeleton loaders (no jarring spinner flashes).
     3. **Empty State:** Illustrated, friendly empty state with a clear call-to-action (CTA).
     4. **Error State:** Descriptive error message with an instant "Retry" trigger.
     5. **Success / Active State:** Feedback micro-animations (e.g. green check pulse, optimistic badge update).
3. **Fluid Micro-Interactions & Spring Motion**:
   - Snappy physics transitions using custom cubic-bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Interactive hover lifts (`transform: translateY(-2px)`), ripple clicks, and smooth drawer slide-ins.
4. **Accessibility (WCAG 2.1 AA / AAA Compliance)**:
   - High contrast text ratios (> 4.5:1 for normal text, > 7:1 for headers).
   - Focus visible rings for keyboard navigation.
   - Screen reader semantic tags and ARIA labels.
5. **Low-Bandwidth & Offline UX Adaptation (Myanmar / Emerging Markets)**:
   - Visual offline badge with cached data timestamp.
   - Optimistic local UI mutations with background sync indicators.
   - Compact vector icons (SVG) with zero heavy unoptimized raster images.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# UI/UX ProMax Design System & Experience Blueprint: [Project Name]

## 1. Aesthetic Direction & UX Strategy
- **Target Platform:** [Web | Mobile (Flutter) | Fullstack]
- **Visual Style:** [Modern Dark Mode | Frosted Glassmorphism | Clean Nordic]
- **Target Audience:** [User Personas & environmental operating conditions]
- **Core Design Goal:** [Emotional user reaction: Trustworthy, Ultra-Fast, Intuitive, Wow-Factor]

---

## 2. Design System Tokens (`tokens.css` / Theme Data)

### Color Palette (Tailored HSL)
- **Background Deep:** `hsl(222, 47%, 7%)` (`#0b0f19`) &mdash; Primary canvas
- **Surface Elevation 1:** `hsl(217, 33%, 12%)` (`#131b2e`) &mdash; Cards & panels
- **Surface Glass:** `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(16px)`
- **Primary Accent:** `hsl(217, 91%, 60%)` (`#3b82f6`) &mdash; Primary actions & highlights
- **Success Glow:** `hsl(142, 71%, 45%)` (`#10b981`) &mdash; Completed / Online
- **Warning Glow:** `hsl(38, 92%, 50%)` (`#f59e0b`) &mdash; Pending / Buffering
- **Danger Glow:** `hsl(0, 84%, 60%)` (`#ef4444`) &mdash; Errors / Alerts
- **Text Primary:** `hsl(210, 40%, 98%)` (`#f8fafc`) &mdash; High-contrast readable
- **Text Secondary:** `hsl(215, 20%, 65%)` (`#94a3b8`) &mdash; Metadata & labels

### Typography Hierarchy (Google Fonts: Outfit + Inter)
- **Display 1 (H1):** `clamp(2rem, 4vw, 3rem)` / `700 Weight` / `line-height: 1.1`
- **Heading 2 (H2):** `1.5rem` / `600 Weight` / `letter-spacing: -0.02em`
- **Body Regular:** `0.9375rem (15px)` / `400 Weight` / `line-height: 1.6`
- **Data / Monospace:** `0.875rem (14px)` / `Roboto Mono` / Tabular numbers

### Elevation & Shadow Tokens
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-glow: 0 0 20px -5px rgba(59, 130, 246, 0.3);
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. Screen Layout & Component Hierarchy

### Primary View: [Screen Name, e.g. Real-Time Telemetry Fleet Dashboard]
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Navbar: Brand Logo] ── [Live Status Pill: 🟢 10,240 Online] ── [Driver Search] ── [Profile]│
├──────────────────────────────────────┬─────────────────────────────────────────────────┤
│ [Sidebar: Active Vehicle Fleet]      │ [Main Map Canvas: Interactive Spatial Fleet View] │
│ ├── 🔍 Search & Filter Bar           │ ├── Real-time Map Markers (Live Speed & Heading)│
│ ├── 📦 Active Shipments List         │ ├── Geofence Radius Overlay Rings               │
│ │   ├── [Card 1: Vehicle #402]       │ └── [Floating Quick-Action Route Controls]       │
│ │   │   • ETA: 12 mins (In Transit)  ├─────────────────────────────────────────────────┤
│ │   │   • Speed: 42 km/h             │ [Telemetry Metrics & Real-time Throughput Panel]│
│ │   └── [Card 2: Vehicle #109]       │ ├── Ingestion: 2,450 pings/sec | Latency: 32ms  │
│ └── ⚠️ Offline Buffered Sync Queue   │ └── Live Event Stream: Delivery Milestones      │
└──────────────────────────────────────┴─────────────────────────────────────────────────┘
```

---

## 4. 5-State Component Resilience Matrix

| Component | Default State | Loading State | Empty State | Error State | Success / Active State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Fleet Card** | Vehicle plate, ETA, speed badge, driver icon. | Pulsing gradient skeleton block (`shimmer`). | "No active vehicles in this sector" + Reset filters CTA. | "Failed to sync telemetry" + Retry button. | Green glowing pulse beacon on location update. |
| **Stock Adjuster** | Current count, stepper controls (+/-), reason select. | Disabled buttons with mini inline spinner. | "Item not found in inventory". | Red input border + "Insufficient stock balance (max: 5)". | Checkmark flash + optimistic balance increment. |
| **Telemetry Sync** | "All data synchronized with cloud". | "Syncing 12 offline pings (45%)...". | "Zero pending offline operations". | "Network lost &bull; 12 pings stored locally". | "Sync Complete &bull; 0 pings queued". |

---

## 5. Production Component Implementation

### File: `app/static/css/design-system.css` / `lib/theme/app_theme.dart`

```css
/* Production Design System Tokens & Glassmorphic Utilities */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700&family=Roboto+Mono:wght@400;500&display=swap');

:root {
  --bg-primary: #0b0f19;
  --bg-surface: #131b2e;
  --accent-primary: #3b82f6;
  --accent-glow: rgba(59, 130, 246, 0.4);
  --text-primary: #f8fafc;
  --text-muted: #94a3b8;
  --border-glass: rgba(255, 255, 255, 0.08);
}

.glass-card {
  background: rgba(19, 27, 46, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px 0 var(--accent-glow);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Skeleton Shimmer Loader */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
```

---

## 6. Micro-Interactions & Animation Specifications
- **Button Click Effect:** `transform: scale(0.97)` on active click for tactile physical feedback.
- **Badge Status Pulse:** Infinite 2s keyframe scale and opacity pulse on real-time live pills (`@keyframes live-pulse`).
- **Offline Mode Transition:** Smooth 300ms amber banner slide-down when `window.navigator.onLine` toggles to false.

---

## 7. Accessibility (WCAG 2.1 AAA Compliance)
- [x] All text-to-background contrast ratios measure $\ge 7:1$.
- [x] Explicit `aria-live="polite"` applied to live telemetry stream updates.
- [x] All interactive elements have $\ge 44 \times 44\text{px}$ touch target areas on mobile screens.
- [x] Visible focus rings (`outline: 2px solid var(--accent-primary)`) enabled on keyboard focus.

---

## 8. Low-Bandwidth & Emerging Market Optimizations
- **Zero Heavy Bitmap Assets:** All UI icons rendered as inline SVGs (< 1KB each).
- **Offline Cache Indicators:** Local SQLite/Hive cached data displayed immediately with an "Offline Cache (Updated 2m ago)" badge.
- **Payload Compression:** CSS and frontend bundles minified and Gzip compressed (< 25KB total initial bundle).
```

---

## Reference Example: FleetTracker ProMax Dashboard

### Command Invocation
```bash
/ui-ux --project-name "FleetTracker" --platform fullstack --theme dark --constraints "offline-first, touch-friendly"
```

### Generated Output

# UI/UX ProMax Design System & Experience Blueprint: FleetTracker

## 1. Aesthetic Direction & UX Strategy
- **Target Platform:** Fullstack (Flutter Mobile Telemetry App + Next.js / Vanilla CSS Web Dispatcher)
- **Visual Style:** Dark Glassmorphism with Electric Blue (`#3b82f6`) and Emerald Green (`#10b981`) telemetry accents.
- **Target Audience:** Fleet logistics managers operating under high information density, and delivery drivers glancing at mobile mounts.

---

## 2. Design System Tokens

```css
:root {
  --bg-root: #070a12;
  --surface-panel: rgba(15, 23, 42, 0.75);
  --accent-cyan: #06b6d4;
  --accent-blue: #3b82f6;
  --accent-emerald: #10b981;
  --status-warning: #f59e0b;
  --text-main: #f8fafc;
  --text-muted: #64748b;
  --glass-stroke: 1px solid rgba(255, 255, 255, 0.07);
}
```

---

## 3. Screen Layout & Component Hierarchy

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [FleetTracker Live Monitor] ── [🔴 SSE Connected: 2.4k pps] ── [Driver Filter] ── [Map]│
├──────────────────────────────────────┬─────────────────────────────────────────────────┤
│ [Active Fleet Roster]                │ [Interactive Map & Route Overlay]               │
│ ├── 🚗 Driver #104 (Daw Win)         │ ├── Vehicle GPS Marker (Heading 180° &bull; 45km/h) │
│ │   • Status: In Transit             │ ├── 500m Geofence Arrival Radius Ring            │
│ │   • ETA to Warehouse: 8 mins       │ └── Live Breadcrumb Trail (Last 5 mins)         │
│ ├── 🚗 Driver #208 (Ko Kyaw)         ├─────────────────────────────────────────────────┤
│ │   • Status: Offline Buffered (3)   │ [Driver Telemetry & Network Status Bar]         │
│ │   • Last Sync: 2m ago              │ ├── 📶 3G (Weak Signal) &bull; Battery: 88%     │
│ └── ➕ Dispatch New Driver           │ └── [Sync Offline Queue (3 items)]              │
└──────────────────────────────────────┴─────────────────────────────────────────────────┘
```

---

## 4. 5-State Component Resilience Matrix
- **Map Marker:**
  - *Default:* Vehicle icon with live speed tag (`42 km/h`).
  - *Loading:* Semi-transparent marker with rotating radar sweep.
  - *Empty:* Centered map view with "No vehicles currently reporting in this zone".
  - *Error:* Amber icon + "GPS signal degraded (> 50m drift)".
  - *Success:* Emerald pulse on delivery destination reached.

---

## 5. Accessibility & Performance Verification
- [x] Contrast ratio: `#f8fafc` text on `#070a12` background = **18.2:1** (Exceeds WCAG AAA).
- [x] Initial CSS stylesheet size: **4.8 KB** (Ultra-lightweight for 2G/3G connections).
- [x] Touch targets on mobile telemetry screen formatted $\ge 48\text{px}$ for one-tap driver interaction while docked in vehicle mounts.
