---
title: Popups & Modals
description: Complete API reference for modal dialogs, input blockers, popup headers, content paragraphs, action bars, and deferred dropdowns.
---

Ore UI features a modal dialog system that blocks underlying input, draws translucent backdrops, and composes beveled popups with integrated headers, auto-wrapped body text, and action bars.

---

## Anatomy of a Modal Popup

```
+------------------------------------------------------------------+ -> Dark Overlay (OreTone.OVERLAY_POPUP)
|                                                                  |
|       +--------------------------------------------------+       | -> 1px Popup Outer Frame (ui.popup)
|       | Header Title               [Trailing Close (X)]  |       | -> Popup Header (ui.popupHeader)
|       +--------------------------------------------------+       |
|       |                                                  |       |
|       | Modal Body (Paragraphs, Inputs, Lists)           |       | -> Popup Content (ui.popupContent)
|       |                                                  |       |
|       +--------------------------------------------------+       |
|       | [Cancel Button]                [Confirm Button]  |       | -> Popup Actions (ui.popupActions)
|       +--------------------------------------------------+       |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Input Blocking (`ui.block()`)

Whenever a modal popup is open, call `ui.block()` **before** rendering the popup's interactive controls:

```java
if (modalOpen) {
    ui.overlay(0, 0, width, height, OreTone.OVERLAY_POPUP);
    ui.block(); // Clears prior hit targets, disables hover behind, resets Tab cycle
    renderMyPopup(ui);
}
```

---

## Popup API Signatures

```java
// Draw full-screen or bounded translucent backdrop
public void overlay(int colour)
public void overlay(int x0, int y0, int x1, int y1, int colour)

// Draw outer 1px popup frame and #373A39 body fill
public void popup(int x, int y, int w, int h)

// Header bar (24px high). Pass null for badge/accent/close if unused. Returns height (24).
public int popupHeader(int x, int y, int w, String title, String badge, OreAccent accent,
                       String[] close, String tip, Runnable onClose)

// Auto-wrapped body paragraphs. Returns rendered height.
public int popupContent(int x, int y, int w, String... paragraphs)
public int popupContentHeight(int w, String... paragraphs)

// Action button bar (horizontal side-by-side or vertical stack). Returns height.
public int popupActions(int x, int y, int w, boolean vertical, String[] labels,
                        OreVariant[] variants, Runnable[] actions)
public int popupActionsHeight(boolean vertical, int count)
```

---

## Complete Action Popup Example

Using `popupContentHeight(...)` and `popupActionsHeight(...)` lets you size the popup dynamically to fit any text length:

```java
private boolean showDeleteDialog = false;

public void renderDeleteDialog(OreUi ui) {
    if (!showDeleteDialog) return;

    ui.overlay(OreTone.OVERLAY_POPUP);
    ui.block();

    int pw = 300;
    String[] body = { "This action cannot be undone. All files will be permanently lost." };
    int headerH = 24;
    int bodyH = ui.popupContentHeight(pw - 2, body);
    int actionsH = ui.popupActionsHeight(false, 2);
    int ph = headerH + bodyH + actionsH + 2;

    int px = (this.width - pw) / 2;
    int py = (this.height - ph) / 2;

    ui.popup(px, py, pw, ph);

    int cy = py + 1;
    cy += ui.popupHeader(px + 1, cy, pw - 2, "Delete World?", null, null,
        OreIcon.CLOSE.small, "Close", () -> showDeleteDialog = false);

    cy += ui.popupContent(px + 1, cy, pw - 2, body);

    ui.popupActions(px + 1, cy, pw - 2, false,
        new String[] { "Cancel", "Delete" },
        new OreVariant[] { OreVariant.GENERAL, OreVariant.DESTRUCTIVE },
        new Runnable[] {
            () -> showDeleteDialog = false,
            () -> {
                deleteWorld();
                showDeleteDialog = false;
            }
        }
    );
}
```

---

## Deferred Dropdown Layer

To ensure dropdown menus are never clipped by card containers, scroll panes, or sidebars, `ui.dropdown(...)` automatically defers its menu popup to `ui.end()`, rendering it on the topmost layer anchored to screen coordinates.
