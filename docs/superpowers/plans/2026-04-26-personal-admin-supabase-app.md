# Personal Admin Supabase App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fresh Supabase-ready personal admin dashboard app and provide a destructive rebuild SQL script.

**Architecture:** A Next.js App Router application renders a polished personal admin dashboard with focused modules for tasks, reminders, documents, notes, contacts, records, and activity. Supabase integration is isolated in `lib/supabase/*`, while app-facing data helpers live in small focused modules that can be tested without a database.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Supabase SSR/client libraries, Vitest, lucide-react.

---

### Task 1: Project Scaffold And Verification Harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `.env.example`
- Create: `.gitignore`
- Create: `tests/dashboard-summary.test.ts`

- [x] **Step 1: Add project configuration and a failing dashboard summary test**
- [x] **Step 2: Run `npm install`**
- [x] **Step 3: Run `npm test -- --run` and confirm the test fails because implementation is missing**

### Task 2: App Shell And Domain Helpers

**Files:**
- Create: `lib/types.ts`
- Create: `lib/dashboard.ts`
- Create: `lib/sample-data.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/utils.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `components/app-shell.tsx`
- Create: `components/dashboard.tsx`
- Create: `components/module-list.tsx`

- [x] **Step 1: Implement the minimal domain helper to pass the dashboard summary test**
- [x] **Step 2: Build the application shell and Supabase-ready dashboard**
- [x] **Step 3: Run `npm test -- --run` and confirm tests pass**

### Task 3: Supabase Destructive Schema And Setup Docs

**Files:**
- Create: `supabase/schema.sql`
- Create: `README.md`

- [x] **Step 1: Add a destructive SQL script that drops and recreates public schema objects**
- [x] **Step 2: Document local setup, Supabase setup, and deployment handoff**
- [x] **Step 3: Run `npm run build` and confirm the app compiles**

### Self-Review

- [x] Spec coverage: dashboard, tasks, reminders, documents, notes, contacts, records, tags, activity, settings, Supabase auth/storage/RLS readiness, and destructive SQL are covered.
- [x] Placeholder scan: no TBD/TODO placeholders.
- [x] Type consistency: UI and schema use consistent names for workspaces, tasks, reminders, documents, notes, contacts, records, tags, and activity.
