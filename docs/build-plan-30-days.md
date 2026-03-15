# Tessera 30-Day Build Plan

**Project:** Tessera
**Document:** build-plan-30-days.md
**Goal:** Deliver a functional v1 vertical slice within 30 days.

This plan assumes a small team (1–2 developers) building in parallel with product design decisions.

The goal is to reach a **usable, private memory-sharing app** with the core loop:

```
create circle → create mosaic → share moment → receive note
```

Perfection is not the goal. **Momentum is.**

---

# Overview

The plan is divided into four development weeks:

| Week   | Focus                |
| ------ | -------------------- |
| Week 1 | Project setup + auth |
| Week 2 | Circles + mosaics    |
| Week 3 | Tessera (moments)    |
| Week 4 | Notes + sanctuary    |

By the end of Week 4 the system should be **functionally complete**.

---

# Week 1 — Project Foundation

Goal: Establish development environment and authentication.

## Tasks

### Repository

Create project repository.

Suggested structure:

```
tessera/
  app/
  components/
  lib/
  types/
  docs/
```

---

### Initialize Next.js

Create project:

```
npx create-next-app@latest tessera
```

Options:

* TypeScript: yes
* Tailwind: yes
* App Router: yes
* src directory: optional

---

### Install Core Dependencies

```
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs
npm install uuid
```

---

### Configure Supabase

Create project in Supabase dashboard.

Add environment variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Create helper:

```
lib/supabase/client.ts
```

---

### Authentication Pages

Create routes:

```
/login
/signup
```

Features:

* email/password signup
* login
* logout
* session persistence

---

### Profiles Table

Create `profiles` table.

Trigger to auto-create profile on signup.

Minimal fields:

```
id
display_name
created_at
```

---

## Week 1 Deliverable

You can:

* sign up
* log in
* log out
* load a basic authenticated page

---

# Week 2 — Circles & Mosaics

Goal: Build the social container system.

---

## Circles

### Database

Create tables:

```
circles
circle_members
```

---

### UI

Routes:

```
/circles
/circles/[circleId]
```

---

### Features

Create circle

Automatically add creator as owner

View circle members

Add members (basic email input is fine for now)

---

## Mosaics

### Database

Create tables:

```
mosaics
mosaic_members
```

---

### Mosaic Creation

Workflow:

1. User selects circle
2. Creates mosaic
3. System snapshots active circle members

---

### UI

Routes:

```
/mosaics/[mosaicId]
```

Basic page should show:

* mosaic title
* participants
* empty moment list

---

## Week 2 Deliverable

You can:

```
create circle
add members
create mosaic
view mosaic page
```

No content yet.

---

# Week 3 — Tessera (Moments)

Goal: Enable the core sharing mechanic.

---

## Database

Create tables:

```
tesserae
tessera_photos
```

---

## Share Moment Flow

Route:

```
/mosaics/[mosaicId]/share
```

Fields:

Reflection text (required)

Optional photo upload

Submit button.

---

## Photo Storage

Configure Cloudflare R2.

Workflow:

1. Upload photo
2. Save storage key in `tessera_photos`
3. Render image in moment card

For v1 you can skip resizing and just upload original images.

---

## Mosaic Page

Update mosaic page to display moment cards.

Moment card layout:

```
Author
Timestamp
Reflection text
Optional photo
```

Moments sorted by:

```
created_at DESC
```

---

## Week 3 Deliverable

Working core loop:

```
create mosaic
share moment
see moment appear in stream
```

---

# Week 4 — Notes & Sanctuary

Goal: Complete the social interaction layer.

---

# Notes

## Database

Create table:

```
notes
```

Constraint:

```
UNIQUE (tessera_id, author_id)
```

---

## UI

Moment cards get a **"Leave a note"** action.

Note editor:

```
textarea
save button
```

---

## Visibility Rules

Note visible to:

* note author
* tessera author

No one else.

---

# Sanctuary Home

Route:

```
/home
```

Sections:

Greeting

Gentle presence signals

Your mosaics

Your circles

---

### Mosaic Cards

Each card shows:

* title
* circle
* participant avatars
* last activity

---

### Presence Signals

Derived from:

* new tessera in mosaics
* notes on your tessera

Example:

```
Emma shared a moment today
Lucas left you a note
```

---

## Week 4 Deliverable

Complete v1 experience:

```
login
create circle
create mosaic
share moment
write note
view sanctuary
```

The application is now usable.

---

# After Day 30

Post-v1 improvements:

* invite links
* image optimization
* blurhash previews
* animation polish
* better presence signals
* mobile refinements

---

# Success Criteria

The project is successful if:

Small groups of friends can privately share moments that accumulate into mosaics of memory.

Everything else is refinement.

---

# Guiding Principle

Tessera should feel like:

```
entering a quiet room
where shared memories live
```

The technology exists to support that experience.
