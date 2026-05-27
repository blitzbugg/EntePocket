# Agent.md — EntePocket Development Guidelines

## Project Identity
EntePocket is a calm, mobile-first household expense tracking app for Indian middle-class families.

The app should feel like:
> “A shared digital household notebook.”

It is intentionally simple and should NEVER evolve into a fintech dashboard or investment platform.

---

# Tech Stack

## Frontend
- React Native
- Expo
- TypeScript
- Expo Router (`app/` directory)

## Backend
- Supabase (PostgreSQL)

## Authentication
- Phone OTP only
- Twilio SMS provider

## State Management
- Zustand

## Local Storage
- SQLite
- AsyncStorage

## Notifications
- Firebase Cloud Messaging

## Target Platform
- Android-first
- Indian users

---

# Core Product Principles

## UX Philosophy
The app must feel:
- Calm
- Spacious
- Familiar
- Trustworthy
- Parent-friendly

The UI should reduce stress and cognitive load.

---

# Visual Design System

## Primary Colors

### Primary Green
`#4CAF50`
Used for:
- Primary buttons
- Active navigation states
- Important actions
- Success states

Represents:
- Safety
- Financial health
- Trust

---

### Surface White
`#FCF9F8`
Primary app background.

Must dominate the interface.

---

## Supporting Colors

### Primary Text
`#1C1B1B`

Used for:
- Headings
- Body text
- Important labels

Must maintain high readability.

---

### Surface Containers
`#F6F3F2`
`#F1EEED`

Used for:
- Cards
- Input fields
- Sections
- Soft grouping

Avoid harsh borders where possible.

---

### Alert Red
`#B3261E`

Reserved ONLY for:
- Unpaid bills
- Important warnings
- Critical actions

Do not overuse.

---

# Visual Rules

## DO
- White backgrounds
- Rounded corners
- Soft shadows
- Spacious layouts
- Large typography
- Large touch targets
- Minimal visual noise

## DON'T
- Dark mode
- Glassmorphism
- Neon colors
- Fintech dashboards
- Crypto-style UI
- Heavy gradients
- Complex animations

---

# UX Rules

## Rule 1
One primary action per screen.

---

## Rule 2
Adding an expense must take:
< 5 seconds.

---

## Rule 3
Use simple language.

### Good
- Add Expense
- History
- Bills

### Bad
- Create Transaction
- Ledger
- Analytics

---

## Rule 4
Always optimize for:
- parents
- non-technical users
- readability

---

# MVP Scope

## Included Features
- Phone OTP login
- Family creation/joining
- Shared household expenses
- Monthly overview
- Recurring bill reminders
- Expense history
- Offline support

---

## Excluded Features
DO NOT ADD:
- AI features
- Investments
- Crypto
- Stock tracking
- Bank integrations
- OCR scanning
- Cashback systems
- Gamification
- Ads
- Complex analytics

---

# Expense Categories

Use ONLY:

- Groceries
- Food
- Transport
- Bills
- Medical
- Education
- Shopping
- Other

No custom categories in MVP.

---

# Payment Types

- Cash
- UPI
- Card

Default selection:
- Cash

---

# Navigation Structure

Bottom Tabs:

- Home
- History
- Bills
- Family
- Profile

---

# App Structure

```txt
app/              → Expo Router routes & layouts
components/       → Shared UI components
services/         → API & sync logic
store/            → Zustand stores
hooks/            → Custom hooks
constants/        → Colors, categories, static values
types/            → TypeScript types
utils/            → Helpers & Supabase client