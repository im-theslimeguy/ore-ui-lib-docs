---
title: Cards & Containers
description: Complete API reference for Bedrock cards, headers, switch/button list cards, horizontal/vertical cards, and border overlapping.
---

Cards are the structural backbone of Ore UI screens. In Bedrock Edition, settings, lists, and options are grouped into tactile grey containers with dark `#1E1E1F` outlines, top highlights, and bottom-right drop shadows.

---

## Card Positions (`OreCardPosition`)

When grouping cards vertically into lists, adjacent cards share borders without leaving double borders:

```java
public enum OreCardPosition {
    STANDALONE,         // Isolated card with borders on all 4 sides
    HEADER,             // Header card
    HEADER_ATTACHED,    // Header card attached directly above a list item
    UNDER_HEADER,       // First body card directly under a header card
    FIRST_UNDER_HEADER, // Alias for first card under a header
    TOP,                // Top card of a list
    MIDDLE,             // Middle card in a connected list
    BOTTOM;             // Bottom card of a list
}
```

> [!TIP]
> Subtract `1` from the returned height (`y += ui.cardContainer(...) - 1;`) whenever stacking cards vertically so adjacent `#1E1E1F` borders fuse cleanly into a single `1px` divider.

---

## Card Containers (`ui.cardContainer`)

Creates a card of custom height with built-in **`12px` horizontal** and **`6px` vertical** inner padding, passing `(cui, cx, cy, cw, ch)` to an `OreCardSlot` lambda. Returns the card's height (`h`).

### Signature

```java
public int cardContainer(int x, int y, int w, int h, OreCardPosition pos, boolean isHeader, OreCardSlot slot)
```

### Example

```java
// Header attached to the list below
y += ui.cardHeader(x, y, width, "WORLD OPTIONS", OreCardPosition.HEADER_ATTACHED) - 1;

// Middle card in a stack
y += ui.cardContainer(x, y, width, 54, OreCardPosition.UNDER_HEADER, false, (cui, cx, cy, cw, ch) -> {
    cui.text("Enable Multiplayer", cx, cy + 3, OreTone.TEXT);
    cui.toggle(cx + cw - 25, cy, isMultiplayer, "mpToggle",
        "Toggle multiplayer", () -> isMultiplayer = !isMultiplayer);
}) - 1;

// Bottom card in a stack
y += ui.cardContainer(x, y, width, 54, OreCardPosition.BOTTOM, false, (cui, cx, cy, cw, ch) -> {
    cui.text("Difficulty", cx, cy + 2, OreTone.TEXT);
    cui.slider(cx, cy + 18, cx + cw, difficulty, OreVariant.GENERAL, 3, false,
        "diffSlider", "Set difficulty", val -> difficulty = (float) val);
});
```

---

## Card Headers (`ui.cardHeader`)

Renders a category header card (`26px` high) above a list or container. Returns its height.

```java
public int cardHeader(int x, int y, int w, String title)
public int cardHeader(int x, int y, int w, String title, OreCardPosition pos)
```

---

## List Cards (`ui.listCardSwitch` & `ui.listCardButton`)

Ready-made settings rows (`30px` high without description, `36px` high with description) that handle padding, typography, and trailing controls automatically. Both return their height.

### Switch List Card

```java
public int listCardSwitch(int x, int y, int w, String label, String description,
                          boolean on, boolean enabled, OreCardPosition pos,
                          String key, String tip, Runnable action)
```

```java
y += ui.listCardSwitch(x, y, width,
    "Auto-Jump",
    "Automatically jump over 1-block obstacles",
    autoJump, true, OreCardPosition.TOP,
    "autoJumpSwitch", "Toggle Auto-Jump", () -> autoJump = !autoJump
) - 1;
```

### Button List Card

```java
public int listCardButton(int x, int y, int w, String label, String description,
                          OreIcon trailingIcon, OreCardPosition pos,
                          String key, String tip, Runnable onClick)
```

```java
y += ui.listCardButton(x, y, width,
    "Resource Packs",
    "3 packs active",
    OreIcon.CHEVRON_RIGHT, OreCardPosition.BOTTOM,
    "resPacksBtn", "Manage resource packs", this::openResourcePacks
);
```

---

## Horizontal & Vertical Cards (`ui.cardHorizontal` & `ui.cardVertical`)

Rich media cards supporting an optional `Identifier` thumbnail, label, description, detail text, and `OreIcon` glyph, with full hover/selected/focus states.

### Horizontal Card (`32px` high)

```java
public int cardHorizontal(int x, int y, int w, Identifier logo, OreIcon trailingIcon,
                          String label, String description, String detail,
                          OreCardPosition pos, boolean selected, String tip, Runnable onClick)
```

```java
ui.cardHorizontal(x, y, width,
    Identifier.fromNamespaceAndPath("mymod", "textures/gui/server_icon.png"),
    OreIcon.CHEVRON_RIGHT,
    "Survival Multiplayer",
    "Version 26.3 • 12/20 Players",
    "Online",
    OreCardPosition.STANDALONE,
    isSelected,
    "Click to select server",
    () -> selectServer(serverId)
);
```

### Vertical Card

```java
public int cardVertical(int x, int y, int w, int h, Identifier logo, OreIcon icon,
                        String label, String description, String detail,
                        OreCardPosition pos, boolean selected, String tip, Runnable onClick)
```

---

## Docking & Scrollbar Overlap Handling

In constrained GUI scales or narrow windows, `OrePanelScreen` docks content cards flush against the navbar (`gap = 0`, `viewX0 = navX1 + 1`).

- If the navbar displays a scrollbar, the scrollbar sits along the dividing edge.
- Because `cardContainer` and list cards include built-in `12px` inner horizontal padding, internal widgets (`cx`) stay safely clear of the scrollbar without shifting your layout code.
