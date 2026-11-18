---
title: Buttons
description: Complete API reference and design guide for Ore UI push buttons, stacked buttons, selection buttons, icon tiles, and menu rows.
---

Buttons are the primary interactive controls in Ore UI. Every button uses a layered 3D face with a 2px bottom shadow, sinks 3px while pressed, animates hover brightness over 50ms, supports keyboard focus rings, and accepts `OreIcon` glyphs.

All button methods return `void` and execute a `Runnable` callback when clicked or activated via keyboard.

---

## Standard Push Button (`ui.button`)

The standard Bedrock push button has a default height of **26px** (`OreUi.BUTTON_HEIGHT`).

### Signatures

```java
// Default 26px height, text-only, enabled
public void button(int x, int y, int w, String label, OreVariant variant, String tip, Runnable action)

// Custom height, text-only, enabled
public void button(int x, int y, int w, int h, String label, OreVariant variant, String tip, Runnable action)

// Full state control (custom height, 8x8 icon, enabled, focused)
public void button(int x, int y, int w, int h, String label, String[] icon,
                   OreVariant variant, String tip, Runnable action,
                   boolean enabled, boolean focused)

// Full state control with custom text/icon shadow overrides
public void button(int x, int y, int w, int h, String label, String[] icon,
                   OreVariant variant, String tip, Runnable action,
                   boolean enabled, boolean focused,
                   boolean textShadow, int textShadowColor, Boolean iconShadowOverride)
```

### Usage Examples

```java
// Basic neutral button
ui.button(x, y, 120, "Cancel", OreVariant.GENERAL, "Discard changes", this::onClose);

// Primary CTA button (Ore UI Green #387E24)
ui.button(x, y, 140, "Save Changes", OreVariant.COLORED, "Commit changes", this::save);

// Button with 8x8 leading icon
ui.button(x, y, 130, OreUi.BUTTON_HEIGHT, "Settings", OreIcon.ADJUST_HORIZONTAL3.small,
    OreVariant.GENERAL, "Open configuration", this::openSettings, true, false);

// Icon-only square button (pass label = null)
ui.button(x, y, 26, 26, null, OreIcon.ADJUST_HORIZONTAL3.small,
    OreVariant.GENERAL, "Settings", this::openSettings, true, false);
```

### Visual States
- **Rest**: 2 shadow rows visible below the face (`rows = 2`).
- **Hover**: 50ms ease-in lightness wash.
- **Pressed**: Face sinks `3px`, shadow rows fold away (`rows = 0`), label and icon shift down with the face.
- **Disabled**: 50% label opacity, flattened `variant.disabledFace()`, shadow rows removed, click ignored.
- **Focused**: `1px` white outer ring (`focusRing`) tracking the face vertically as it sinks.

---

## Stacked Button (`ui.buttonStacked`)

Places the `8×8` icon vertically centered **above** the label instead of beside it. Ideal for compact toolbar grids (recommended height `>= 34px`).

### Signatures

```java
public void buttonStacked(int x, int y, int w, int h, String label, String[] icon,
                          OreVariant variant, String tip, Runnable action,
                          boolean enabled, boolean focused)
```

### Example

```java
ui.buttonStacked(x, y, 76, 36, "Export", OreIcon.EXPORT.small,
    OreVariant.GENERAL, "Export world data", this::exportData, true, false);
```

---

## Selection Button (`ui.selectionButton` & `ui.selectionRowFill`)

Selection buttons represent mutually exclusive choices (tabs, difficulty, game mode). Adjacent selection buttons overlap by **1px** (`OreUi.BAR_OVERLAP = 1`) so their dark outlines fuse cleanly into a shared `1px` divider.

### Signatures

```java
// Single selection button
public void selectionButton(int x, int y, int w, String label, String[] icon,
                            boolean selected, boolean enabled, boolean focused,
                            String key, String tip, Runnable action)

// With an attached OreAccent badge
public void selectionButton(int x, int y, int w, String label, String[] icon,
                            String badge, OreAccent accent,
                            boolean selected, boolean enabled, boolean focused,
                            String key, String tip, Runnable action)

// Auto-sized row anchored to x, y with natural widths (returns total width)
public int selectionRow(int x, int y, int w, String[] labels, String[][] icons,
                        int selected, String key, IntConsumer action)

// Full-width row stretched across totalW (returns total height)
public int selectionRowFill(int x, int y, int totalW, String[] labels, String[][] icons,
                            int selected, String key, IntConsumer action)
```

### Examples

```java
// Connected full-width selection row
String[] difficulties = { "Peaceful", "Easy", "Normal", "Hard" };
ui.selectionRowFill(x, y, contentWidth, difficulties, null, selectedDifficulty,
    "diffChoice", idx -> selectedDifficulty = idx);

// Individual selection button with a NEW badge
ui.selectionButton(x, y, 110, "Experimental", OreIcon.SPARKLES3.small,
    "NEW", OreAccent.GREEN, isExperimental, true, false,
    "selExp", "Toggle experimental mode", () -> isExperimental = !isExperimental);
```

> **Badge Layout Rule:** Badges inside selection buttons are layout-participating elements — the button expands its internal spacing to accommodate the badge rather than overlapping text.

---

## Selectable Icon Button (`ui.selectableIconButton`)

Square image-picker tiles (typically `37×37` or `48×48`). When selected, the tile sinks `2px` into a dark green recessed face (`OreTone.SELECTED_FACE = 0xFF1C4A12`).

```java
public void selectableIconButton(int x, int y, int w, String label, String[] icon,
                                 boolean selected, boolean enabled, boolean focused,
                                 String key, String tip, Runnable action)
```

```java
String[] biomes = { "Plains", "Hills", "Forest" };
String[][] icons = { OreIcon.LANDSCAPE.small, OreIcon.LANDSCAPE2.small, OreIcon.HOUSE.small };

for (int i = 0; i < biomes.length; i++) {
    int idx = i;
    ui.selectableIconButton(x + i * 48, y, 44, biomes[i], icons[i],
        selectedBiome == i, true, false, "biome:" + i,
        "Choose " + biomes[i], () -> selectedBiome = idx);
}
```

---

## Menu Rows (`ui.menuButton`)

Edge-to-edge list rows (`28px` high) built for popups, context menus, and dropdown overlays.

```java
public void menuButton(int x, int y, int w, String label, String[] icon,
                       String key, String tip, Runnable action)
```

```java
ui.menuButton(x, y, popupWidth, "Account Settings", OreIcon.PERSON.small,
    "menuAcc", "Manage account", this::openAccountSettings);
```

- **Rest**: Crisp `OreTone.MENU_STROKE` border with `OreTone.MENU_FACE` fill.
- **Hover**: Smoothly interpolates toward `OreTone.POPUP_BODY` over 50ms.
- **Icon alignment**: If `icon` is non-null, it is drawn at `x + 7` and the label starts at `x + 21`; without an icon, the label starts at `x + 5`.
