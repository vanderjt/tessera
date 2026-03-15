# Design Baseline 02 — Sanctuary & Core Experience

**Project:** Tessera
**Document:** design-baseline-02.md
**Purpose:** Define the core application experience and interaction model for v1.

This document translates the philosophical baseline into **practical product structure**, focusing on the **sanctuary home experience**, **mosaic interaction**, and **moment sharing flow**.

---

# 1. Core UX Model

Tessera is not organized around a feed.

Instead, the product has a **place-based structure**:

```
Sanctuary
   ↓
Circles
   ↓
Mosaics (chapters of time)
   ↓
Tesserae (moments)
   ↓
Private Notes
```

Users primarily **enter through the sanctuary**, then move into mosaics that represent chapters of shared life.

The application should feel like **entering a quiet shared space**, not checking a social feed.

---

# 2. Sanctuary (Home Screen)

## Purpose

The sanctuary is the emotional center of the product.

It answers three questions:

1. **Who are my people?**
2. **What shared chapters am I part of?**
3. **Has anything meaningful happened since I last arrived?**

The sanctuary should feel **calm and spacious**, not busy.

---

## Structure

The sanctuary home page is composed of four sections.

### 1. Greeting

A soft contextual greeting that acknowledges the user.

Examples:

* "Good evening."
* "Welcome back."
* "Your sanctuary."

No productivity tone. No metrics.

---

### 2. Gentle Presence Signals

This section surfaces recent activity **without becoming a feed**.

Examples:

* Emma shared a moment today.
* Lucas left you a note.
* Apartment Crew has been quiet lately.

These signals are intentionally **low-detail and non-scrollable**.

They are not a chronological feed.

Purpose:
Allow users to notice that something changed.

---

### 3. Your Mosaics

This is the **primary section of the sanctuary**.

Each mosaic is presented as a card.

Example mosaics:

* Summer With Friends
* Apartment Life — Fall
* Italy Trip
* Family

---

### Mosaic Card Contents

Each mosaic card contains:

• Mosaic title
• Circle name
• Number of participants
• Last moment shared
• Small participant avatar row

Optional visual texture:

• subtle background image from recent tessera

The card should communicate:

**people + time + shared memory**

---

### 4. Circles (Secondary)

Circles represent the underlying social groups.

This section is less prominent than mosaics because **mosaics are the lived chapters**.

Circle cards allow:

• viewing members
• creating new mosaics

---

# 3. Mosaic Experience

The mosaic page is the **primary memory experience**.

---

## Default View: Moment Stream

The mosaic displays a chronological stream of **moment cards**.

The focus is on:

• the person
• their reflection
• the moment

Not on images.

---

### Moment Card Structure

Each moment card contains:

Author
Timestamp
Reflection text (required)

Optional:

• photo(s)

Example:

```
Emma
May 12

Saw this tiny bookstore on my walk home and it reminded me
of the place we found in Lisbon.

[photo]
```

---

## Design Principle

Text should never feel secondary to the image.

Images add memory texture.

Words carry the meaning.

---

# 4. Tessera Sharing Flow

Posting a tessera should feel **intentional but lightweight**.

Target time to post:

**30–120 seconds**

---

## Share Moment Page

Fields:

Reflection text (required)

Prompt examples:

* "What moment are you sharing?"
* "What made this moment meaningful?"

Photo upload (optional)

Submit button:

**Share Moment**

---

## Posting Philosophy

Tessera should capture small reflections like:

* Saw a cute cat and thought of you.
* Finally tried that restaurant you recommended.
* The sunset tonight looked like the one from our trip.

Moments should feel **natural and human**, not performative.

---

# 5. Responses (Notes)

Tessera do not have public reactions.

There are:

• no likes
• no emoji reactions
• no comment threads

Instead, each user may send **one private note**.

---

### Note Properties

* one note per user per tessera
* editable
* visible only to the author
* not visible to others

Purpose:

Allow quiet acknowledgment without creating a public performance space.

---

# 6. Sharing Friction

Tessera deliberately introduces **light friction**.

Not as instant as texting.
Not as heavy as journaling.

The goal is to encourage **meaningful small reflections**.

---

# 7. Design Constraints

The interface must avoid:

• infinite feeds
• notification-driven engagement loops
• popularity metrics
• reaction counts

Tessera should encourage **presence**, not scrolling.

---

# 8. Mobile First

Although the first release is a web application, the interface must be designed as **mobile-first**.

Most real usage will occur on phones.

Layouts should be optimized for:

• thumb navigation
• vertical reading
• simple actions

---

# 9. Future Extensions (Not V1)

The following ideas may be explored later:

Gallery view
Seasonal mosaic exploration
Meta-mosaics across years
Memory slices (e.g., "All Summers")

These should not influence v1 architecture unnecessarily.

---

# 10. Guiding Principle

Tessera should feel like:

**walking into a quiet room where shared memories live.**

The product should help friends notice the moments that accumulate into shared history.
