# Agent.md — EntePocket Development Guidelines

## Project Identity
EntePocket is a **digital household expense notebook** for Indian middle‑class families.  
It is intentionally simple — not a fintech platform.

## Tech Stack
- **Frontend:** React Native (Expo) with TypeScript
- **Navigation:** Expo Router (file‑based, `app/` directory)
- **Backend & Database:** Supabase (PostgreSQL)
- **Auth:** Phone OTP only (Twilio)
- **State:** Zustand
- **Local storage:** SQLite, AsyncStorage
- **Notifications:** Firebase Cloud Messaging
- **Target:** Android (primary), Indian users

## Core UX & Visual Principles
- **Feel:** Calm, trustworthy, familiar, spacious, parent‑friendly.
- **Look:** White backgrounds, soft green accents, rounded corners, soft shadows, large typography, black text.
- **No dark mode.** No fintech dashboards, no crypto‑style UI.
- **One primary action per screen.**
- **Touch targets:** Large, easy for older users.
- **Language:** Plain, non‑jargon. “Add Expense” not “Create Transaction”. “History” not “Ledger”.
- **Speed:** Expense entry must take <5 seconds.

## Feature Scope (MVP)
1. **Phone OTP Login** — No email/password.
2. **Family System** — Create/join family groups via invite code.
3. **Add Expense** — Amount, category, payment type (Cash default), optional note, date.
4. **Static Categories:** Groceries, Food, Transport, Bills, Medical, Education, Shopping, Other. No custom categories (MVP).
5. **Monthly Overview** — Total spent, recent expenses, family activity, simple balance.
6. **Recurring Bills** — Title, amount, due date, reminder toggle, paid/unpaid.
7. **Family Activity Feed** — e.g., “Amma added ₹450 for groceries”.
8. **Offline Support** — Add expenses offline, sync when connected.

## Explicitly NOT Allowed
- AI analytics, investment tracking, stock/crypto, bank integrations, OCR receipt scanning, cashback, budgeting systems, gamification, ads.
- No feature creep — keep it a household notebook, not a financial dashboard.

## Database Schema (simplified reference)
- `users` (id, name, phone, created_at)
- `families` (id, family_name, created_by, created_at)
- `family_members` (id, family_id, user_id, role, joined_at)
- `expenses` (id, family_id, added_by, amount, category, payment_type, note, expense_date, created_at)
- `recurring_bills` (id, family_id, title, amount, due_date, reminder_enabled, is_paid, created_at)

## Project Structure (post‑migration)
All routing lives inside the `app/` directory (Expo Router).  
Other modules are at the project root:
app/ → Routes & layouts (Expo Router)
components/ → Shared UI components
services/ → API, sync logic, Supabase queries
store/ → Zustand stores
hooks/ → Custom hooks
constants/ → Categories, colors, static data
types/ → TypeScript types
utils/ → Helpers, Supabase client (utils/supabase.ts)


## Architecture Rules
- **Keep it simple.** Solo‑developer project. No unnecessary abstractions, no premature scaling.
- **Offline‑first:** Use local storage (SQLite/AsyncStorage) as source of truth, sync to Supabase in background.
- **Typed code:** TypeScript everywhere. Avoid `any`.
- **Reusable components:** Only when it doesn’t complicate the code.
- **Consistent patterns:** Zustand stores for global state, Expo Router for navigation, Supabase client from `utils/supabase.ts`.

## Navigation Structure (Bottom Tabs)
**Home | History | Bills | Family | Profile**

## When Writing Code
- Always respect the “calm, simple, parent‑friendly” feel.
- Before adding anything, ask: *“Is this something you’d find in a physical expense notebook?”* If not, skip it.
- Use soft green (`#4CAF50` or similar) for accents, but keep usage minimal.
- Default payment type is **Cash**.
- Show loading/empty states thoughtfully — never just a blank screen.

## Common DO/DON’T
- ✅ Large, readable amount input.
- ✅ Category chips that are easy to tap.
- ✅ Clear success feedback after adding expense.
- ❌ Swipe gestures or complex animations.
- ❌ Pie charts, bar graphs, analytics.
- ❌ “Syncing…” jargon — use plain status if needed.

## Goal
Help the developer stay consistent and build a product that feels like a shared family notebook, not a tech product.