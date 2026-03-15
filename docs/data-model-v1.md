# Data Model V1

**Project:** Tessera  
**Document:** data-model-v1.md  
**Purpose:** Define the v1 relational data model, constraints, and access rules for Tessera.

This document translates the product philosophy and domain model into an implementable backend structure for **Supabase/Postgres**.

The v1 model supports:

- user accounts
- circles
- mutable circle membership
- mosaics with frozen membership
- tesserae (moments)
- one private editable note per user per tessera

---

# 1. Design Goals

The data model should preserve the core product rules:

1. **Circles are living groups**
   - membership can change over time

2. **Mosaics are fixed chapters**
   - mosaic membership is frozen when the mosaic begins

3. **A tessera is a person-shared moment**
   - text is required
   - photos are optional

4. **Notes are private acknowledgments**
   - one note per user per tessera
   - editable
   - not threaded
   - not public

5. **Privacy comes first**
   - all application data is private to relevant participants
   - there is no public discovery layer in v1

---

# 2. Core Tables

V1 should include the following tables:

- `profiles`
- `circles`
- `circle_members`
- `mosaics`
- `mosaic_members`
- `tesserae`
- `tessera_photos`
- `notes`

Optional supporting tables later:

- `invites`
- `presence_events`
- `notifications`
- `mosaic_transitions`

These are not required for the initial vertical slice.

---

# 3. Table Definitions

## 3.1 `profiles`

Extends Supabase Auth user records with product-facing profile data.

### Purpose
Stores human identity information used throughout the app.

### Fields

- `id` UUID PRIMARY KEY  
  - references `auth.users(id)`
- `display_name` TEXT NOT NULL
- `username` TEXT NULL
- `avatar_url` TEXT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Notes

- `username` is optional in v1.
- `display_name` is the main identity field shown in UI.
- One `profiles` row per authenticated user.

---

## 3.2 `circles`

Represents a living social group.

### Purpose
A circle is the long-lived social container from which mosaics are created.

### Fields

- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `name` TEXT NOT NULL
- `description` TEXT NULL
- `created_by` UUID NOT NULL REFERENCES `profiles(id)`
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `archived_at` TIMESTAMPTZ NULL

### Notes

- Circles persist over time.
- Membership can change.
- Archiving is preferable to hard deletion.

---

## 3.3 `circle_members`

Join table for current and historical circle membership.

### Purpose
Tracks who belongs to a circle and when.

### Fields

- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `circle_id` UUID NOT NULL REFERENCES `circles(id)` ON DELETE CASCADE
- `user_id` UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
- `role` TEXT NOT NULL DEFAULT 'member'
- `joined_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `left_at` TIMESTAMPTZ NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints

- unique active membership per user per circle

Suggested constraint pattern:
- allow historical rows
- but prevent multiple active rows where `left_at IS NULL`

### Roles

Initial supported roles:

- `owner`
- `member`

You may later add:

- `admin`

### Notes

- A user is considered an active member if `left_at IS NULL`.
- Historical membership matters because circles are living groups.

---

## 3.4 `mosaics`

Represents a time-bounded chapter tied to a circle.

### Purpose
A mosaic is the primary memory artifact in Tessera.

### Fields

- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `circle_id` UUID NOT NULL REFERENCES `circles(id)` ON DELETE CASCADE
- `title` TEXT NOT NULL
- `description` TEXT NULL
- `created_by` UUID NOT NULL REFERENCES `profiles(id)`
- `starts_at` TIMESTAMPTZ NULL
- `ends_at` TIMESTAMPTZ NULL
- `status` TEXT NOT NULL DEFAULT 'active'
- `cover_tessera_id` UUID NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `settled_at` TIMESTAMPTZ NULL

### Status values

- `draft`
- `active`
- `settled`
- `archived`

### Notes

- `settled` is preferred over “expired” in product language.
- A mosaic belongs to one circle.
- Mosaic membership is captured separately and frozen at creation time.

---

## 3.5 `mosaic_members`

Snapshot of membership at the time a mosaic is created.

### Purpose
Freezes the chapter’s participants, even if the parent circle changes later.

### Fields

- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `mosaic_id` UUID NOT NULL REFERENCES `mosaics(id)` ON DELETE CASCADE
- `user_id` UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
- `role` TEXT NOT NULL DEFAULT 'member'
- `added_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints

- `UNIQUE (mosaic_id, user_id)`

### Notes

- Membership here is immutable after creation in product terms.
- For v1, do not support removing members from a mosaic after it begins.
- This table is one of the most important parts of the Tessera model.

---

## 3.6 `tesserae`

Represents a shared moment inside a mosaic.

### Purpose
Stores the main user-generated content of the application.

### Fields

- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `mosaic_id` UUID NOT NULL REFERENCES `mosaics(id)` ON DELETE CASCADE
- `author_id` UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
- `reflection_text` TEXT NOT NULL
- `captured_at` TIMESTAMPTZ NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `deleted_at` TIMESTAMPTZ NULL

### Notes

- `reflection_text` is required.
- `captured_at` can represent when the moment happened.
- `created_at` represents when it was posted.
- Soft deletion is strongly preferred.

### Important rule

A tessera’s `author_id` must belong to the mosaic via `mosaic_members`.

That should be enforced in application logic and, where practical, reinforced with database-side checks or RPC workflows.

---

## 3.7 `tessera_photos`

Stores optional photos associated with a tessera.

### Purpose
Allows tesserae to include one or more images while preserving the principle that the tessera itself is not just a photo tile.

### Fields

- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tessera_id` UUID NOT NULL REFERENCES `tesserae(id)` ON DELETE CASCADE
- `storage_key` TEXT NOT NULL
- `url` TEXT NULL
- `position` INTEGER NOT NULL DEFAULT 0
- `width` INTEGER NULL
- `height` INTEGER NULL
- `blurhash` TEXT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints

- `UNIQUE (tessera_id, position)`

### Notes

- Store canonical object location in `storage_key`.
- `url` may be a cached/public delivery URL, but the storage key is the real reference.
- Limit number of photos per tessera in app logic for v1.

### V1 recommendation

Allow:
- 0 to 4 photos per tessera

Even if the product language says “optional photo,” supporting a small number of photos now is a safe design choice.

If you want stricter simplicity, set it to:
- 0 to 1 photo in v1

---

## 3.8 `notes`

Private response from one user to a tessera author.

### Purpose
Provides intimate acknowledgment without public interaction mechanics.

### Fields

- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `tessera_id` UUID NOT NULL REFERENCES `tesserae(id)` ON DELETE CASCADE
- `author_id` UUID NOT NULL REFERENCES `profiles(id)` ON DELETE CASCADE
- `body` TEXT NOT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `deleted_at` TIMESTAMPTZ NULL

### Constraints

- `UNIQUE (tessera_id, author_id)`

### Notes

- This enforces one note per user per tessera.
- Notes are private.
- The tessera author can see notes written to them.
- Other mosaic members cannot see someone else’s notes.

### Important rule

A note author must be a member of the same mosaic as the tessera.

---

# 4. Relationship Summary

## Core relational flow

- A `profile` can belong to many `circles`
- A `circle` has many active and historical `circle_members`
- A `circle` can have many `mosaics`
- A `mosaic` has many frozen `mosaic_members`
- A `mosaic` has many `tesserae`
- A `tessera` can have many `tessera_photos`
- A `tessera` can have many `notes`
- Each `note` belongs to exactly one user and one tessera
- Each user can create only one note per tessera

---

# 5. Important Business Rules

These rules are central and should be enforced carefully.

## 5.1 Circle membership is mutable

Users may join or leave circles over time.

This must not retroactively alter old mosaics.

---

## 5.2 Mosaic membership is frozen

When a mosaic is created, its member list is copied from the circle into `mosaic_members`.

After that, the mosaic is treated as a historical chapter with fixed participants.

---

## 5.3 Tessera text is required

Every tessera must include `reflection_text`.

Photos are optional and should never be the sole payload.

---

## 5.4 One note per user per tessera

This is enforced via a unique constraint in `notes`.

The user may edit their note, but not create a thread.

---

## 5.5 No public interaction layer

There are no:

- likes
- reaction counts
- public comments
- share counts
- popularity metrics

Nothing in the schema should imply those mechanics in v1.

---

# 6. Access Model

Tessera is private-by-default.

Visibility should be determined by relationship to the circle, mosaic, and tessera.

---

## 6.1 Profiles

Users may read:
- their own profile
- profiles of people who share a circle or mosaic with them

Users may update:
- only their own profile

---

## 6.2 Circles

Users may read a circle only if they are an active member.

Users may create circles for themselves.

Users may update a circle if they are an owner.

---

## 6.3 Circle members

Users may read membership lists for circles they belong to.

Only authorized roles should modify circle membership.

For v1, simplest rule:
- circle owners manage membership

---

## 6.4 Mosaics

Users may read a mosaic only if they are in `mosaic_members`.

Users may create a new mosaic if they are an active member of the parent circle.

Once created, the member snapshot is frozen.

---

## 6.5 Tesserae

Users may read a tessera only if they belong to the tessera’s mosaic.

Users may create a tessera only if they belong to the mosaic.

Users may edit or delete only their own tesserae.

---

## 6.6 Tessera photos

Users may read photos only if they can read the parent tessera.

Users may create or delete photos only for tesserae they authored.

---

## 6.7 Notes

Users may create a note only if:

- they belong to the same mosaic as the tessera
- they have not already written a note on that tessera

Users may edit only their own note.

Visibility:
- the note author can read their own note
- the tessera author can read notes written on their tessera
- nobody else can read that note

This privacy rule is crucial.

---

# 7. Suggested Row-Level Security Model

These are policy intentions, not final SQL.

---

## 7.1 `profiles`

### Select
Allow if:
- `profiles.id = auth.uid()`
- OR both users share at least one circle or mosaic

### Update
Allow only if:
- `profiles.id = auth.uid()`

---

## 7.2 `circles`

### Select
Allow if:
- requester has active membership in `circle_members`

### Insert
Allow if:
- authenticated

### Update
Allow if:
- requester is an `owner` of the circle

---

## 7.3 `circle_members`

### Select
Allow if:
- requester is an active member of the circle

### Insert / Update
Allow if:
- requester is circle owner

---

## 7.4 `mosaics`

### Select
Allow if:
- requester exists in `mosaic_members`

### Insert
Allow if:
- requester is active in parent circle

### Update
Allow if:
- requester created the mosaic
- or requester is owner of parent circle

You can choose the stricter of these later.

---

## 7.5 `mosaic_members`

### Select
Allow if:
- requester belongs to that mosaic

### Insert
Prefer:
- only through trusted server action / RPC when a mosaic is created

### Update / Delete
Disallow in normal product flow for v1

---

## 7.6 `tesserae`

### Select
Allow if:
- requester belongs to parent mosaic

### Insert
Allow if:
- requester belongs to parent mosaic
- requester is the author

### Update / Delete
Allow if:
- `author_id = auth.uid()`

---

## 7.7 `tessera_photos`

### Select
Allow if:
- requester can read parent tessera

### Insert / Delete
Allow if:
- requester authored parent tessera

---

## 7.8 `notes`

### Select
Allow if:
- `author_id = auth.uid()`
- OR requester is author of the parent tessera

### Insert
Allow if:
- requester belongs to parent mosaic
- requester is inserting as themself
- no existing row for `(tessera_id, auth.uid())`

### Update / Delete
Allow if:
- `author_id = auth.uid()`

---

# 8. Creation Workflows

Some product rules are easier to preserve through controlled workflows than raw table access.

---

## 8.1 Create Circle

1. User creates `circle`
2. User is inserted into `circle_members` as `owner`

---

## 8.2 Create Mosaic

1. User selects a circle
2. System verifies user is active in that circle
3. System inserts `mosaic`
4. System copies all active circle members into `mosaic_members`

This should ideally happen in a single transaction or RPC.

That is the cleanest way to preserve frozen membership.

---

## 8.3 Create Tessera

1. User selects mosaic
2. System verifies they are in `mosaic_members`
3. Insert tessera
4. Upload optional photos to R2
5. Insert `tessera_photos`

---

## 8.4 Create Note

1. User opens tessera
2. System verifies they are in the same mosaic
3. System checks for existing note by this user
4. Insert or update note

Because the note is unique per user per tessera, “write note” in UI can map to:
- create if absent
- edit if present

---

# 9. Recommended Constraints and Indexes

## Required unique constraints

- `mosaic_members (mosaic_id, user_id)`
- `notes (tessera_id, author_id)`
- `tessera_photos (tessera_id, position)`

## Recommended indexes

- `circle_members (circle_id, user_id)`
- `circle_members (user_id) WHERE left_at IS NULL`
- `mosaics (circle_id, created_at DESC)`
- `mosaic_members (user_id, mosaic_id)`
- `tesserae (mosaic_id, created_at DESC)`
- `tesserae (author_id, created_at DESC)`
- `notes (tessera_id)`
- `notes (author_id)`

These will help common sanctuary and mosaic queries a lot.

---

# 10. Sanctuary Query Requirements

The home screen will likely need:

## 10.1 User’s mosaics
Fetch mosaics where the user appears in `mosaic_members`

Include:
- mosaic title
- parent circle
- participant count
- last tessera timestamp
- maybe a small set of recent participants

---

## 10.2 Gentle presence signals
Derived from recent events such as:
- new tessera in user’s mosaics
- new note on user’s tesserae

This can initially be computed from `tesserae` and `notes` without a separate notification system.

---

## 10.3 User’s circles
Fetch active circles via `circle_members`

---

# 11. Open Questions

These do not block v1 schema drafting, but they should be resolved soon.

1. Should v1 allow exactly one photo or multiple photos per tessera?
2. Should circles support more than one owner?
3. Should mosaic creation allow excluding some current circle members, or always snapshot all active members?
4. Should tessera edits be unlimited, or time-limited?
5. Should notes support soft deletion or just overwriting body?
6. Do we need explicit invites in v1, or can membership be manually managed?
7. Should `captured_at` be user-editable?

---

# 12. Recommended V1 Decisions

To keep scope clean, I recommend:

- circles support:
  - one owner in v1
- mosaics snapshot:
  - all active circle members at creation
- tessera photos:
  - max 1 photo in v1
- tessera editing:
  - allowed
- note editing:
  - allowed
- note deletion:
  - soft delete or clear body
- invites:
  - defer unless they become necessary for onboarding

This keeps the first implementation much simpler.

---

# 13. Guiding Principle

The schema should protect the product’s emotional structure.

Tessera is not just a content app.

It is a system for preserving:
- who was there
- what was shared
- when that chapter happened
- and how friends quietly acknowledged each other

The database model should preserve those relationships faithfully.