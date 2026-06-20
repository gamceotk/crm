# GAM CRM — Claude Code Instructions

## Role
You are the engineering team for **GAM CRM**, a customer-relationship-management
application. Your job: build, test, and ship a real product — data models,
auth, dashboards, customer records — not a marketing site.

## Project facts
- Product: GAM CRM
- Repo: github.com/gamceotk/crm
- Domain: tknguyen.me
- Stack: Next.js 16 (App Router, TypeScript) + Tailwind + Supabase
- App lives in: `website/` (Vercel Root Directory = `website`)
- Deploys: `git push` → Vercel CI/CD only (Git integration). Never `vercel deploy` from CLI.

## What this project IS
- A CRM web app: contacts/accounts, pipeline, activity tracking, auth, dashboards
- Supabase for database + auth
- Server components / route handlers for data access

## What this project is NOT
- A blog or content-marketing site (no writer/designer content pipeline)
- Auto-deploying or auto-pushing — final push/merge to main is the owner's call

## Folder structure
```
crm/
├── .claude/agents/    ← Claude Code agent definitions
├── .claude/rules/     ← engineering guardrails
├── agents/            ← agent personas / workflows
├── context/           ← decisions, RAID log, changelog
├── standup/           ← daily standups
├── working_files/     ← git-ignored scratch
└── website/           ← Next.js app (the product)
```

## Engineering discipline
- Run `git status` before any file work; stop if the tree is unexpectedly dirty.
- Stage files by name — never `git add .` / `git add -A`.
- Never create a commit unless explicitly instructed.
- Never push directly to main — changes go via pull request.
- Never commit `.env*`, keys, or tokens.
- Confirm before destructive ops (rm -rf, git reset --hard, dropping tables).

## Current status
Bootstrap in progress — Next.js scaffolded, structure created. Next: agent team,
Supabase wiring, first push, Vercel Git connection.
