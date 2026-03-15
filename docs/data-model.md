# Tessera Data Model

This document defines the core entities that make up the Tessera system.

The data model is intentionally minimal for version 1.

## Core Entities

### User

Represents a person with access to the platform.

Fields:

- id
- username
- display_name
- email
- created_at

---

### Mosaic

A shared journal space between a group of users.

Fields:

- id
- title
- slug
- description
- created_by
- created_at
- visibility

Visibility values:

- private
- invite_only
- public (future)

---

### Membership

Defines which users belong to which mosaics.

Fields:

- id
- user_id
- mosaic_id
- role
- joined_at

Roles:

- owner
- editor
- member

---

### Entry

A single post within a mosaic.

Fields:

- id
- mosaic_id
- author_id
- title
- caption
- created_at
- updated_at

---

### EntryPhoto

Stores images attached to an entry.

Fields:

- id
- entry_id
- image_url
- alt_text
- sort_order

An entry may contain multiple photos.

---

## Relationships

User → Membership → Mosaic → Entry → EntryPhoto

This allows:

- users in multiple mosaics
- mosaics with many members
- entries with multiple photos

---

## Future Extensions

Possible future entities:

- Comment
- Invite
- Reaction
- Tag
- Location

These are intentionally excluded from v1.