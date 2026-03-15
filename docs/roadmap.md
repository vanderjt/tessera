# Tessera Roadmap

**Project:** Tessera
**Purpose:** Define the staged development roadmap for building the Tessera application.

This roadmap balances **product design clarity** with **incremental engineering progress**, prioritizing early vertical slices over premature infrastructure complexity.

---

# 1. Guiding Strategy

Tessera will be built in **phases** that progressively unlock the product.

The key philosophy:

**Ship a complete thin slice first.**

Instead of building all backend systems first, we will build:

```
UI → data → interaction → persistence
```

for one feature at a time.

---

# 2. Phase 0 — Product Definition

Goal: Stabilize the conceptual and architectural foundation.

### Completed Documents

* design-baseline-01.md
* design-baseline-02.md
* data-model-v1.md

### Remaining Definition Work

* sanctuary-home-spec.md
* mosaic-page-spec.md
* share-moment-flow.md
* supabase-schema-v1.sql
* route-contracts.md

Deliverable:

A **fully specified v1 application blueprint**.

---

# 3. Phase 1 — Development Foundation

Goal: Establish the project infrastructure.

### Tasks

Create repository

Initialize Next.js project

Configure TypeScript

Install Tailwind CSS

Configure Supabase client

Configure Cloudflare R2 integration

Create base folder structure

```
app/
components/
lib/
types/
docs/
```

### Deliverable

Running development environment with:

```
Next.js
Tailwind
Supabase connection
basic page routing
```

---

# 4. Phase 2 — Authentication & Identity

Goal: Users can create accounts and log in.

### Features

Signup

Login

Logout

Session persistence

Profile creation

### Database Tables

```
profiles
```

### UI Pages

```
/signup
/login
```

### Deliverable

A logged-in user session with a stored profile.

---

# 5. Phase 3 — Circles

Goal: Users can create and manage their social groups.

### Database Tables

```
circles
circle_members
```

### Features

Create circle

View circle

Add members

View member list

### UI Pages

```
/circles
/circles/[circleId]
```

### Deliverable

Users can create circles and see their members.

---

# 6. Phase 4 — Mosaics

Goal: Introduce the core time-chapter structure.

### Database Tables

```
mosaics
mosaic_members
```

### Features

Create mosaic

Snapshot circle membership

View mosaic

List mosaics in sanctuary

### UI Pages

```
/mosaics/[mosaicId]
```

### Deliverable

Users can create a mosaic from a circle and see its member list.

---

# 7. Phase 5 — Tessera (Moments)

Goal: Enable the core memory-sharing mechanic.

### Database Tables

```
tesserae
tessera_photos
```

### Features

Share tessera

Reflection text input

Optional photo upload

Moment stream within mosaic

### UI Pages

```
/mosaics/[mosaicId]/share
```

### Deliverable

Users can share moments inside mosaics.

---

# 8. Phase 6 — Notes

Goal: Enable quiet personal responses.

### Database Tables

```
notes
```

### Features

Write note

Edit note

View notes on tessera

### Privacy

Only visible to:

* note author
* tessera author

### Deliverable

Private acknowledgement system works.

---

# 9. Phase 7 — Sanctuary Home

Goal: Build the primary entry experience.

### UI Page

```
/home
```

### Features

Greeting

Gentle presence signals

Your mosaics

Your circles

### Data

Queries for:

* user mosaics
* recent tessera activity
* recent notes

### Deliverable

Users can open the app and immediately enter their shared memory space.

---

# 10. Phase 8 — Image Handling

Goal: Robust media support.

### Features

Cloudflare R2 uploads

Image resizing

Blurhash preview

Secure storage keys

### Deliverable

Fast, reliable photo display.

---

# 11. Phase 9 — Design Refinement

Goal: Achieve the sanctuary tone.

### Work

Typography

Spacing

Color palette

Moment card design

Mosaic card design

Animation polish

### Deliverable

Interface feels calm and intentional.

---

# 12. Phase 10 — Invitations

Goal: Allow users to bring friends into circles.

### Features

Invite link generation

Invite acceptance

Auto membership

### Database Tables

```
invites
```

### Deliverable

Users can grow their circles organically.

---

# 13. Phase 11 — Presence Signals

Goal: Improve sanctuary awareness without notifications.

### Examples

"Emma shared a moment today"

"Lucas left you a note"

"Mosaic has been quiet lately"

### Deliverable

Light awareness layer without engagement mechanics.

---

# 14. Phase 12 — Stability

Goal: Prepare for real usage.

### Work

Error handling

RLS validation

Performance improvements

Logging

### Deliverable

Reliable private application.

---

# 15. Phase 13 — Mobile Optimization

Goal: Ensure phone usage is excellent.

### Work

Touch targets

Responsive layouts

Scrolling behavior

Keyboard handling

### Deliverable

App feels natural on mobile browsers.

---

# 16. Phase 14 — Future Work (Post-V1)

Not part of the initial launch.

Possible explorations:

Meta-mosaics

Seasonal memory exploration

Memory resurfacing

Timeline reflections

Native mobile apps

---

# 17. V1 Definition

Tessera V1 is complete when users can:

Create accounts

Create circles

Create mosaics

Share tesserae

Send private notes

View their sanctuary

Everything else is refinement.

---

# 18. Guiding Principle

Every feature must reinforce the core product idea:

**Friends sharing moments that accumulate into shared mosaics of memory.**

If a feature weakens that structure, it should be reconsidered.
