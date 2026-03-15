# UI Wireframes V1

**Project:** Tessera
**Document:** ui-wireframes-v1.md
**Purpose:** Define the initial screen layouts for the v1 Tessera application.

These wireframes describe **information hierarchy and layout**, not final styling.

All screens are designed **mobile-first**, since the majority of real usage will likely occur on phones.

---

# 1. Sanctuary (Home Screen)

The sanctuary is the **primary entry point** of the application.

It answers:

• What has changed?
• What shared spaces exist?
• Where do I want to go?

---

## Layout

```
--------------------------------
Your Sanctuary
--------------------------------

Good evening.

Emma shared a moment today
Lucas left you a note

--------------------------------
Your Mosaics
--------------------------------

[ Summer With Friends ]
Apartment Crew
4 people
Last moment: today

[ Italy Trip ]
Travel Circle
5 people
Last moment: 3 days ago

[ Family ]
6 people
Last moment: last week

--------------------------------
Your Circles
--------------------------------

Apartment Crew
Family
Travel Circle

--------------------------------
+ Share a Moment
--------------------------------
```

---

## Key Principles

Presence signals are **not a feed**.

They are brief awareness indicators.

Mosaics are the **primary navigation element**.

---

# 2. Circles Page

Circles represent the **long-lived social groups**.

They are less prominent than mosaics because mosaics capture lived chapters.

---

## Layout

```
--------------------------------
Circles
--------------------------------

[ Apartment Crew ]
5 members

[ Family ]
6 members

[ Travel Friends ]
4 members

--------------------------------
+ Create Circle
--------------------------------
```

---

## Circle Detail

```
--------------------------------
Apartment Crew
--------------------------------

Members

Emma
Lucas
Maya
You

--------------------------------
Mosaics
--------------------------------

Apartment Life — Fall
Apartment Life — Winter

--------------------------------
+ Start New Mosaic
--------------------------------
```

---

# 3. Mosaic Page

The mosaic page is the **core experience**.

Moments are presented as a **chronological reflection stream**.

Text is the primary element.

---

## Layout

```
--------------------------------
Summer With Friends
--------------------------------

4 participants

--------------------------------
Moments
--------------------------------

Emma
May 12

Saw this tiny bookstore on my walk
home and it reminded me of the one
we found in Lisbon.

[photo]

--------------------------------

Lucas
May 10

Tried the cafe you recommended.
The pastries were amazing.

--------------------------------

You
May 8

Sunset tonight looked exactly like
the one from the lake trip.

--------------------------------

+ Share Moment
--------------------------------
```

---

## Design Principles

Moments emphasize:

• author
• reflection text
• timestamp

Photos are secondary.

---

# 4. Share Moment Screen

This screen is intentionally simple.

Sharing should feel **intentional but light**.

Target time: **30–120 seconds**.

---

## Layout

```
--------------------------------
Share a Moment
--------------------------------

What moment are you sharing?

[ text input ]

--------------------------------

Add Photo (optional)

[ Upload ]

--------------------------------

Share Moment
```

---

## Posting Philosophy

Moments should feel natural:

Examples:

• Saw a cute cat and thought of you
• Finally tried the restaurant you suggested
• The sunset tonight reminded me of our trip

---

# 5. Moment Card

Moment cards are the **primary content component**.

They appear inside mosaics.

---

## Layout

```
--------------------------------

Emma
May 12

Saw this tiny bookstore on my walk
home and it reminded me of the one
we found in Lisbon.

[photo]

--------------------------------
Leave a note
--------------------------------
```

---

# 6. Note Editor

Each user may send **one private note per tessera**.

The note is visible only to:

• the note author
• the tessera author

---

## Layout

```
--------------------------------
Your note to Emma
--------------------------------

[ text input ]

--------------------------------
Save Note
```

---

# 7. Notes (Author View)

When viewing your own tessera, you see notes written to you.

```
--------------------------------
Notes
--------------------------------

Lucas

Love this place. We should go
there together next time.

--------------------------------

Maya

This reminds me of the bookstore
we found in Florence.

--------------------------------
```

---

# 8. Navigation Model

Primary navigation should remain minimal.

Suggested mobile navigation:

```
Home
Circles
Profile
```

Mosaics are accessed primarily via:

```
Sanctuary → Mosaic
Circle → Mosaic
```

---

# 9. Empty States

Important for new users.

---

## No Circles

```
You don't have any circles yet.

Create a circle to start sharing
moments with friends.

[ Create Circle ]
```

---

## No Mosaics

```
This circle hasn't started a chapter yet.

Start a mosaic to begin capturing
shared moments.

[ Start Mosaic ]
```

---

## No Moments

```
This mosaic is waiting for its
first moment.

Share the first tessera.
```

---

# 10. Core UI Components

Expected reusable components:

```
MosaicCard
MomentCard
CircleCard
NoteEditor
AvatarRow
PresenceSignals
```

---

# 11. Design Goal

The interface should feel like:

> opening a quiet shared space where memories live.

Users should feel:

• calm
• welcomed
• connected to people

not:

• overwhelmed
• distracted
• pressured to engage
