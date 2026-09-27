# GameSense — Autonomous Gameplay & AI Playtesting Intelligence Platform

GameSense is a full-stack game intelligence platform combining autonomous reinforcement-learning AI agent swarms and human tester cohorts to deliver empirical gameplay balance, microsecond telemetry analytics, and closed-loop tuning recommendations.

---

## 🌟 Key Features

1. **Cinematic 100vh / 100vw Opening Universe**:
   - `GAME` (from LEFT) + `SENSE` (from RIGHT) physical impact fusion.
   - 3D gaming universe activation with depth parallax (mouse responsive).
   - Scroll-driven camera push through parting geometric layers directly into the workspace.
   - Full `prefers-reduced-motion` compliance and Replay / Skip toggles.

2. **Frictionless Authentication & Role-Based Authorization**:
   - **Developer / User Sign-In (`/login`)**: Log in with any personal email; accounts and starter workspaces are auto-provisioned with zero "Invalid credentials" friction. Includes a 1-click Demo Account fill (`user@gamesense.io` / `user123`).
   - **Platform Control Center (`/admin/login`)**: Dedicated administrator gateway displaying explicit authorized credentials (`admin@gamesense.io` / `admin123`, ID `admin-001`) with 1-click auto-fill.
   - Protected routes rejecting unprivileged access to `/admin`.
   - Complete password recovery (`/forgot-password`, `/reset-password`, `/verify-email`).

3. **High-Throughput Telemetry Ingestion (`/api/telemetry/events`)**:
   - Sub-millisecond event streaming supporting `player_death`, `checkpoint_reached`, `damage_dealt`, `level_completed`, etc.
   - Interactive live simulation buttons to transmit AI and Human events live.

4. **Machine Learning Balance Anomaly Detector (`/dashboard/issues`)**:
   - Automated detection of win-rate divergence, TTK anomalies, exploit glitches, and currency inflation.
   - Severity categorization (`critical`, `high`, `medium`, `low`) and confidence scoring.

5. **AI Tuning Recommendations Workflow (`/dashboard/recommendations`)**:
   - Algorithmic parameter hotfixes with projected delta metrics.
   - Interactive workflow: `PENDING` → `ACCEPTED` / `REJECTED` → `APPLIED TO BUILD`.

6. **Automated Retesting & Version Comparison (`/dashboard/retests`, `/dashboard/comparison`)**:
   - Baseline vs Retest regression validation.
   - Side-by-side AI vs Human metric comparison.

7. **Executive Briefs & Audits (`/dashboard/reports`)**:
   - 1-click generation of comprehensive playtest audits with printable summaries and metric JSON dumps.

---

## 🔑 Default Credentials

| Portal | Email | Password | Role / ID |
| :--- | :--- | :--- | :--- |
| **User Sign-In** | Any personal email (auto-created) | (Any 6+ chars) | `user` |
| **Demo User** | `user@gamesense.io` | `user123` | `user` / `user-001` |
| **Admin Portal** | `admin@gamesense.io` | `admin123` | `admin` / `admin-001` |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Webpack bundling)
- **UI & Animation**: Tailwind CSS, Framer Motion, Three.js, Lucide Icons, Recharts
- **Backend & Database**: In-Memory Relational Engine (`lib/db.ts`) with cryptographic password verification and Next.js 16 async cookie security.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies (already installed via junction)
npm install

# 2. Start development server
npm run dev

# 3. Production build
npm run build
```

---

## 📡 REST API Reference

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/auth/login` | `POST` | User login (auto-provisions new users) |
| `/api/auth/admin-login` | `POST` | Dedicated admin authentication |
| `/api/auth/forgot-password` | `POST` | Password reset dispatch |
| `/api/telemetry/events` | `GET`, `POST` | Ingest and inspect live gameplay telemetry |
| `/api/issues` | `GET`, `POST`, `PATCH` | Balance problem triage and updates |
| `/api/recommendations` | `GET`, `PATCH` | Review and apply parameter recommendations |
| `/api/retests` | `GET`, `POST` | Schedule and inspect automated retests |
| `/api/reports` | `GET`, `POST` | Generate and view audit briefs |
| `/api/notifications` | `GET`, `PATCH` | Notification inbox and read status |
| `/api/contact` | `POST` | Studio contact inquiry submissions |
| `/api/admin/inquiries` | `GET`, `PATCH`, `DELETE` | Admin studio inquiry management |
| `/api/admin/metrics` | `GET` | Platform-wide admin telemetry, inquiries, and health |
