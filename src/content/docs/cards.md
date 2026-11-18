---
title: Cards & Containers
description: API reference for Bedrock cards, headers, switch/button list cards, horizontal/vertical cards, and border overlapping.
---

Cards are the structural backbone of Ore UI screens. In Bedrock Edition, settings, lists, and options are grouped into tactile grey containers (`OreTone.CARD` `#48494A`) with dark `#1E1E1F` outlines, `1px` top-left inner highlights (`OreTone.CARD_STROKE`), and shaded bottom-right inner strokes (`OreTone.CARD_STROKE_SHADOW`).

## Card Positions (`OreCardPosition`)

When stacking cards vertically into connected lists, pass `OreCardPosition` and subtract `1` from the returned height so adjacent `#1E1E1F` borders merge cleanly into a single `1px` divider:

```java
public enum OreCardPosition {
	STANDALONE,         // Isolated card with borders on all 4 sides
	HEADER,             // Header card
	HEADER_ATTACHED,    // Header card attached directly above a list item
	UNDER_HEADER,       // First body card directly under a header card
	FIRST_UNDER_HEADER, // Alias for first card under a header
	TOP,                // Top card of a list
	MIDDLE,             // Middle card in a connected list
	BOTTOM              // Bottom card of a list
}
```

## Card Containers (`ui.cardContainer` & `ui.cardButtonContainer`)

`cardContainer` creates a card of custom height with built-in **`12px` horizontal** and **`6px` vertical** inner padding, passing `(cui, cx, cy, cw, ch)` to an `OreCardSlot` lambda. `cardButtonContainer` adds hover, press, and focus states with `4px` inner padding. Both return `h`.

```java
public int cardContainer(int x, int y, int w, int h, OreCardPosition pos, boolean isHeader, OreCardSlot slot)

public int cardButtonContainer(int x, int y, int w, int h, OreCardPosition pos,
                               String key, String tip, Runnable onClick, OreCardSlot slot)

public int cardButtonContainer(int x, int y, int w, int h, OreCardPosition pos, boolean selected,
                               String key, String tip, Runnable onClick, OreCardSlot slot)
```

### Example

```java
y += ui.cardHeader(x, y, width, "WORLD OPTIONS", OreCardPosition.HEADER_ATTACHED) - 1;

y += ui.cardContainer(x, y, width, 54, OreCardPosition.UNDER_HEADER, false, (cui, cx, cy, cw, ch) -> {
	cui.text("Enable Multiplayer", cx, cy + 3, OreTone.TEXT);
	cui.toggle(cx + cw - 25, cy, isMultiplayer, "mpToggle",
		"Toggle multiplayer", () -> isMultiplayer = !isMultiplayer);
}) - 1;

y += ui.cardContainer(x, y, width, 54, OreCardPosition.BOTTOM, false, (cui, cx, cy, cw, ch) -> {
	cui.text("Difficulty", cx, cy + 2, OreTone.TEXT);
	cui.slider(cx, cy + 18, cx + cw, difficulty, OreVariant.GENERAL, 3, false,
		"diffSlider", "Set difficulty", val -> difficulty = (float) val);
});
```

## Card Headers (`ui.cardHeader`)

Renders a `28px` tall category header card in `OreFont.TEN` (`1.25F` scale) with no inner stroke (`isHeader = true`). Returns `28`.

```java
public int cardHeader(int x, int y, int w, String title)
public int cardHeader(int x, int y, int w, String title, OreCardPosition pos)
```

## List Cards (`ui.listCardSwitch` & `ui.listCardButton`)

Ready-made settings rows (`30px` tall without description, `36px` tall with description) returning their rendered height:

```java
// Switch row
public int listCardSwitch(int x, int y, int w, String label, String description,
                          boolean on, boolean enabled, OreCardPosition pos,
                          String key, String tip, Runnable action)

// Clickable button row with trailing 12x12 OreIcon
public int listCardButton(int x, int y, int w, String label, String description,
                          OreIcon trailingIcon, OreCardPosition pos,
                          String key, String tip, Runnable onClick)
```

### Example

```java
y += ui.listCardSwitch(x, y, width,
	"Auto-Jump", "Automatically jump over 1-block obstacles",
	autoJump, true, OreCardPosition.TOP,
	"autoJumpSwitch", "Toggle Auto-Jump", () -> autoJump = !autoJump) - 1;

y += ui.listCardButton(x, y, width,
	"Resource Packs", "3 packs active",
	OreIcon.CHEVRON_RIGHT, OreCardPosition.BOTTOM,
	"resPacksBtn", "Manage resource packs", this::openResourcePacks);
```

## Horizontal & Vertical Cards (`ui.cardHorizontal` & `ui.cardVertical`)

Rich media cards supporting an `Identifier` sprite thumbnail, label, description, and hover/selected/focus states:

```java
// Horizontal card (32 px tall)
public int cardHorizontal(int x, int y, int w, Identifier logo, OreIcon trailingIcon,
                          String label, String description, String detail,
                          OreCardPosition pos, boolean selected, String tip, Runnable onClick)

// Vertical card (custom height h)
public int cardVertical(int x, int y, int w, int h, Identifier logo, OreIcon icon,
                        String label, String description,
                        OreCardPosition pos, boolean selected, String tip, Runnable onClick)
```

### Example

```java
ui.cardHorizontal(x, y, width,
	Identifier.fromNamespaceAndPath("mymod", "textures/gui/server_icon.png"),
	OreIcon.CHEVRON_RIGHT,
	"Survival Multiplayer",
	"Version 26.3 · 12/20 Players",
	"Online",
	OreCardPosition.STANDALONE,
	isSelected,
	"Click to select server",
	() -> selectServer(serverId));
```
