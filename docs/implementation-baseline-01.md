# Tessera Implementation Baseline
Version: 0.1
Purpose: Record the current implementation plan for Tessera before active development begins.

This document translates the product and design philosophy into a practical technical baseline.

---

# Implementation Intent

Tessera will be built as a **dynamic web application** with a **mobile-first interaction model**.

Although Phase 1 will launch as a browser-based web app, the product should be designed with future mobile usage in mind.

The implementation should support:

- private group-based sharing
- intentional moment creation
- quiet person-to-person response
- long-term architectural growth
- a calm, non-dashboard-like user experience

---

# Platform Strategy

## Phase 1

Phase 1 is a **web application** served at:

`tessera.photos`

The web app is the first production surface because it is realistic to deploy and iterate on without app-store dependency.

Even in web form, the interaction model should be **mobile-first**:

- narrow layouts
- touch-friendly controls
- vertically flowing screens
- minimal chrome
- calm, focused pages

## Phase 2

Phase 2 may include native or near-native mobile applications.

The Phase 1 architecture should make this transition easier by keeping the product model and UI patterns mobile-friendly from the beginning.

---

# Chosen Frontend Framework

## Next.js

Tessera will use **Next.js** as the primary application framework.

Reasoning:

- stronger long-term structure
- built-in routing
- good support for authenticated application flows
- clear separation between public and protected areas
- room for future growth without major rearchitecture

This choice reflects a preference for **long-term investment over short-term simplicity**.

Important constraint:

Even though Next.js is powerful, Tessera should still maintain **minimal initial scope**.

We are choosing a stronger framework, not a larger feature set.

---

# Styling System

## Tailwind CSS

Tessera will use **Tailwind CSS** as the primary styling system.

Reasoning:

- supports fast UI iteration
- works well with Next.js
- makes mobile-first layout design easier
- allows a custom visual identity without imposing a dashboard aesthetic
- helps maintain consistent spacing, typography, and layout rhythm

Tailwind is preferred over heavier component frameworks because Tessera requires a **soft, intentional, custom interface** rather than a generic admin or SaaS look.

---

# Styling Philosophy

The interface should feel:

- calm
- warm
- spacious
- readable
- intimate

The app should avoid looking like:

- a dashboard
- an enterprise tool
- a social media feed
- a utility panel

## Design characteristics

- narrow centered layouts
- strong vertical rhythm
- generous whitespace
- soft neutral palette
- minimal visual noise
- large touch-friendly actions
- typography that supports reading and reflection

---

# Rejected Styling Direction

## React Bootstrap

React Bootstrap was considered but is not the chosen styling direction.

Reasoning:

- it carries a strong dashboard / admin-panel visual bias
- it encourages UI patterns that conflict with Tessera’s sanctuary-like design goals
- it would likely require heavy overriding to achieve the intended tone

For Tessera, React Bootstrap would introduce more visual friction than value.

The product benefits more from custom design control than from prebuilt Bootstrap-style components.

---

# Core Technology Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Backend Services
- Supabase Auth
- Supabase Postgres

## Storage
- Cloudflare R2 for photo storage

## Hosting / Domain
- Cloudflare
- `tessera.photos`

---

# Product Scope for Initial Build

The initial build should remain minimal.

The first version focuses on:

- user accounts
- circles
- mosaics
- tesserae (moments)
- notes

The first version should not include:

- public discovery
- likes
- public reaction counts
- comment threads
- meta-mosaics
- gallery-first browsing
- complex notification systems
- advanced social features

---

# Technical Product Model

## Users
Authenticated people using the platform.

## Circles
Living social groups whose membership may change over time.

## Mosaics
Time-bounded shared artifacts tied to circles.

Important rule:
Circle membership may evolve, but mosaic membership is frozen once a mosaic begins.

## Tesserae
Moments shared into a mosaic.

A tessera requires:
- short text reflection
- author
- timestamp

A tessera may optionally include:
- one or more photos

## Notes
A private response from one user to another about a tessera.

Constraint:
Each user may send only **one note per tessera**.
That note may be edited, but not multiplied into a thread.

---

# Route Philosophy

The application should be structured into:

- public routes
- auth routes
- protected sanctuary/app routes

The emotional center of the app is not a global feed.

Users should primarily enter Tessera through:

- their sanctuary
- their circles
- their mosaics

The mosaic remains the primary memory experience.

---

# UX Philosophy for Implementation

The implementation should support these behavioral goals:

- sharing should feel more intentional than texting
- posting should remain lightweight enough for everyday use
- moments should prioritize human reflection over pure visual browsing
- responses should feel personal, not performative
- the app should reinforce presence, not competition

Technical decisions should serve these cultural goals.

---

# Engineering Discipline

Because Next.js was chosen for long-term strength, the team should be careful not to overbuild.

Guiding rule:

**Long-term architecture, short-term scope.**

This means:

- use framework strength for structure
- avoid solving future-phase problems early
- keep components small and readable
- keep dependencies minimal
- prioritize clarity over cleverness

---

# Initial Repo-Level Guidance

The repository should reinforce the following implementation choices:

- Next.js is the application framework
- Tailwind CSS is the styling system
- Supabase is the initial auth/database platform
- R2 is the initial image storage layer
- mosaic membership is immutable after creation
- text is required for tesserae
- notes are private and limited to one per user per tessera

These rules should also be reflected in project documentation and agent guidance files.

---

# Current Open Technical Questions

The following decisions remain open and should be resolved in later implementation planning:

- exact Supabase schema details
- invite flow mechanics
- image upload flow
- note delivery / notification behavior
- whether moment detail pages are required in v1
- deployment specifics for Next.js on Cloudflare

---

# Summary

Tessera will be built as a **dynamic Next.js web application** with a **mobile-first interaction model** and a **Tailwind CSS styling system**.

The architecture is intentionally strong for the long term, while the first feature set remains minimal.

This baseline exists to ensure implementation stays aligned with the product’s core identity:

a calm, intimate, private sanctuary for shared memory.