---
title: Form Inputs & Selection
description: Exact API reference for toggle switches, tri-state checkboxes, diamond radios, text boxes, search boxes, and dropdowns.
---

Ore UI includes a full set of Bedrock-style form controls with spring physics, IME/clipboard text editing, and deferred modal dropdowns.

---

## Toggle Switches (`ui.toggle`)

A `25×14` animated switch track. When toggled, the square handle springs across the track with damped harmonic physics (`stiffness = 2729`, `damping = 60`).

### Signatures

```java
// Default green switch (25x14) without track icons
public void toggle(int x, int y, boolean on, String key, String tip, Runnable action)

// Full switch control
public void toggle(int x, int y, boolean on, OreVariant variant, boolean icon,
                   boolean enabled, boolean focused, String key, String tip, Runnable action)
```

| Parameter | Description |
| :--- | :--- |
| `on` | Current boolean state (`true` = handle on right, track colored). |
| `variant` | Track fill color when `on` (usually `OreVariant.COLORED`). |
| `icon` | If `true`, draws the Bedrock `I` (on) and `O` (off) glyphs inside the track. |
| `key` | Unique animation key for spring state persistence across frames. |

```java
ui.toggle(x, y, soundEnabled, "soundToggle", "Toggle sound", () -> {
    soundEnabled = !soundEnabled;
});
```

---

## Checkboxes (`ui.checkbox`)

A `14×14` (`OreUi.CHECK_SIZE`) checkbox supporting Bedrock's **three states**:

```java
public enum OreCheck {
    UNCHECKED,     // Empty dark box
    CHECKED,       // Colored box with bright checkmark
    INDETERMINATE; // Box with horizontal bar (mixed selection)

    public OreCheck next(); // INDETERMINATE -> CHECKED, CHECKED -> UNCHECKED
}
```

### Signature

```java
public void checkbox(int x, int y, OreCheck state, OreVariant variant,
                     boolean focused, String tip, Runnable action)
```

```java
ui.checkbox(x, y, checkState, OreVariant.COLORED, false, "Toggle option", () -> {
    checkState = checkState.next();
});
ui.text("Enable Auto-Save", x + 20, y + 3, OreTone.TEXT);
```

---

## Radio Buttons (`ui.radio`)

A `22×22` (`OreUi.RADIO_SIZE`) **3D beveled diamond** radio control.

### Signature

```java
public void radio(int x, int y, boolean selected, OreVariant variant,
                  boolean enabled, boolean focused, String tip, Runnable action)
```

```java
String[] modes = { "Survival", "Creative", "Adventure" };
for (int i = 0; i < modes.length; i++) {
    int idx = i;
    int ry = y + i * 26;
    ui.radio(x, ry, selectedMode == i, OreVariant.COLORED, true, false,
        "Select " + modes[i], () -> selectedMode = idx);
    ui.text(modes[i], x + 28, ry + 7, OreTone.TEXT);
}
```

---

## Text Boxes (`ui.textBox`)

A `31px` high (`OreUi.FIELD_HEIGHT`) single-line input field backed by a stateful `OreTextField` instance. Supports blinking caret, mouse drag selection, double-click word selection, keyboard navigation, IME preedit, and clipboard shortcuts (`Ctrl+A`, `Ctrl+C`, `Ctrl+V`, `Ctrl+X`).

### Signature

```java
public void textBox(int x, int y, int w, OreTextField field,
                    String placeholder, String[] trailing, boolean enabled)
```

- `trailing`: Optional `8×8` `OreIcon.*.small` icon drawn on the right side of the field (pass `null` for none).

```java
// Store as a field on your Screen:
private final OreTextField nameField = new OreTextField("Steve").maxLength(32);

// Inside extractView / extractContent:
ui.textBox(x, y, width, nameField, "Enter username...", OreIcon.PENCIL.small, true);
```

### `OreTextField` Methods

| Method | Description |
| :--- | :--- |
| `new OreTextField()` / `new OreTextField(String value)` | Creates a new text field state. |
| `value()` | Returns the current `String`. |
| `setValue(String text)` | Replaces the text and resets the cursor. |
| `maxLength(int length)` | Fluent setter capping character count. |
| `selectionStart()` / `selectionEnd()` | Returns selection range indices. |
| `hasSelection()` / `selected()` | Checks or retrieves the highlighted substring. |
| `selectAll()` | Selects the entire text. |

---

## Search Boxes (`ui.searchBox`)

A specialized `31px` text box with a built-in trailing **Search** magnifying glass icon (`OreIcon.SEARCH.small`) that automatically turns into a clickable **Clear (`×`)** button whenever text is present.

```java
public void searchBox(int x, int y, int w, OreTextField field, String placeholder, boolean enabled)
```

```java
private final OreTextField searchField = new OreTextField();

ui.searchBox(x, y, width, searchField, "Search settings...", true);
String query = searchField.value().toLowerCase();
```

---

## Dropdowns (`ui.dropdown`)

A button-styled selector (`26px` high) with left-aligned text and a right-aligned down chevron. When `open` is `true`, `OreUi` automatically defers rendering of the floating menu popup to `ui.end()`, anchored to the **screen bounds** (not clipped by scroll containers), and adds an internal scrollbar if the option list exceeds screen height.

### Signature

```java
public void dropdown(int x, int y, int w, String selected, String[] options,
                     boolean open, String key, String tip,
                     Runnable toggle, IntConsumer onSelect)
```

```java
private boolean dropdownOpen = false;
private int selectedOption = 0;
private final String[] options = { "Fancy", "Fast", "Fabulous!" };

// Inside render loop:
ui.dropdown(x, y, width, options[selectedOption], options, dropdownOpen,
    "gfxDrop", "Choose graphics quality",
    () -> dropdownOpen = !dropdownOpen,
    idx -> {
        selectedOption = idx;
        dropdownOpen = false;
    });
```
