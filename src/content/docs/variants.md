---
title: Variants & Accents
description: Color system, semantic usage guidelines, and the 10 accent badge colors.
---

Ore UI defines five semantic **Surface Variants** (`OreVariant`) for interactive elements, and ten flat **Accent Colors** (`OreAccent`) for indicators, tags, and badges.

---

## The 5 Surface Variants (`OreVariant`)

Every interactive component (`button`, `slider`, `toggle`, `checkbox`, `radio`) accepts an `OreVariant` that controls its face, stroke, shadow, highlight, and text colors.

```
+-----------------------------------------------------------------------------------------+
| Variant       | Base Color           | Text Color | Semantic Purpose                    |
|---------------|----------------------|------------|-------------------------------------|
| GENERAL       | Neutral Grey #D0D1D5 | Dark Grey  | Default standard actions            |
| COLORED       | Ore UI Green #387E24 | Pure White | Primary call-to-action (CTA)         |
| WARNING       | Caution Gold #E1B922 | Dark Grey  | Non-destructive caution / alerts    |
| DESTRUCTIVE   | Crimson Red  #C93636 | Pure White | Irreversible actions (Delete, Drop) |
| REALMS        | Royal Purple #7345E5 | Pure White | Realms, premium, or special features|
+-----------------------------------------------------------------------------------------+
```

### 1. `OreVariant.GENERAL` (Default Neutral)
- **Face Color**: Neutral Grey (`#D0D1D5` at rest, `#E3E3E5` on hover).
- **Text Color**: Dark Charcoal (`#1E1E20`).
- **When to use**: Standard buttons, navigation toggles, secondary actions, and unhighlighted options. A screen should consist mostly of `GENERAL` buttons.

### 2. `OreVariant.COLORED` (Signature Ore UI Green)
> [!IMPORTANT]
> **Design Guideline**: The `COLORED` variant background is strictly **Ore UI Emerald Green (`#387E24`)**, **NOT yellow**. Yellow is reserved exclusively for `WARNING`.
- **Face Color**: Ore UI Green (`#387E24` at rest, `#50913D` on hover, `#1C4A12` pressed).
- **Text Color**: Pure White (`#FFFFFF`).
- **When to use**: The **single primary call-to-action (CTA)** on a screen. For example: "Done", "Save", "Create World", or "Confirm". There should never be more than one `COLORED` button competing for attention in a single view.

### 3. `OreVariant.WARNING` (Caution Gold)
- **Face Color**: Amber Gold (`#E1B922` at rest, `#E7C85B` on hover).
- **Text Color**: Dark Charcoal (`#1E1E20`).
- **When to use**: Actions that have significant consequences but are not destructive. Examples: "Reset to Defaults", "Leave Team", or warning confirmations.

### 4. `OreVariant.DESTRUCTIVE` (Crimson Red)
- **Face Color**: Crimson Red (`#C93636` at rest, `#D04A4B` on hover).
- **Text Color**: Pure White (`#FFFFFF`).
- **When to use**: Irreversible, dangerous actions. Examples: "Delete World", "Abandon Quest", "Reset Font Atlas", or "Ban Player".

### 5. `OreVariant.REALMS` (Royal Purple)
- **Face Color**: Royal Purple (`#7345E5` at rest, `#8E4AEB` on hover).
- **Highlight**: Pink glow (`0x33FAB0FF`), not white.
- **Text Color**: Pure White (`#FFFFFF`).
- **When to use**: Multiplayer server connections, Realms subscriptions, or unique external integrations.

---

## Accent Palette (`OreAccent`)

Accents are flat fills used for small badges, tags, indicator dots, and labeled dividers. They do not have 3D bevels or drop shadows.

```java
public enum OreAccent {
    GRAY       (0xFFD2D4D6, OreTone.TEXT_DARK),
    DARK_GRAY  (0xFF37373A, OreTone.TEXT),
    RED        (0xFFFF8A8A, OreTone.TEXT_DARK),
    PINK       (0xFFFF8AE0, OreTone.TEXT_DARK),
    PURPLE     (0xFFAD99E7, OreTone.TEXT_DARK),
    BLUE       (0xFF89AFFF, OreTone.TEXT_DARK),
    TURQUOISE  (0xFF89FFE1, OreTone.TEXT_DARK),
    GREEN      (0xFF9DDF77, OreTone.TEXT_DARK), // Signature Ore UI accent green
    YELLOW     (0xFFFFEC72, OreTone.TEXT_DARK),
    ORANGE     (0xFFFFB98A, OreTone.TEXT_DARK);
}
```

### Rendering Badges
To attach a badge to a button or header:

```java
// Render an inline badge
ui.badge(x, y, "NEW", OreAccent.GREEN);
ui.badge(x, y, "BETA", OreAccent.YELLOW);
ui.badge(x, y, "DEPRECATED", OreAccent.RED);
```
