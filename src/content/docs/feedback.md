---
title: Toasts, Tooltips & Banners
description: Exact API reference for sliding toasts, Noto Sans bottom toasts, adaptive speech-bubble tooltips, banners, badges, and tags.
---

Ore UI provides visual feedback through sliding toasts, adaptive speech-bubble tooltips, informational banners, and flat `OreAccent` badges/tags.

---

## Sliding Toasts

### 1. Upper Toast (`ui.toast`)
A sleek pill notification for the upper viewport with cut corners, dark outline, and optional leading/trailing glyphs. Returns the rendered width.

```java
public int toastWidth(String label, boolean leading, boolean trailing)
public int toast(int x, int y, String label, String key, boolean leading, boolean trailing)
```

```java
int w = ui.toastWidth("Game Saved", true, false);
ui.toast((screenWidth - w) / 2, 16, "Game Saved", "toastSave", true, false);
```

### 2. Bottom Toast (`ui.toastBottom`)
A modern Bedrock toast notification that slides upwards from the bottom center of the screen using **Noto Sans** from the 4K vector atlas:
- **Background**: Dark grey (`#1E1E1E`) with a crisp `1px` frame and `+4px` drop shadow.
- **Animation**: Slides upward `32px` while easing opacity smoothly.

```java
public int toastWidthBottom(String label, boolean leading, boolean trailing)
public int toastBottom(int x, int y, String label, String key, boolean leading, boolean trailing)
```

```java
int toastW = ui.toastWidthBottom("Copied to clipboard", true, false);
int toastX = (screenWidth - toastW) / 2;
int toastY = screenHeight - 40;

ui.toastBottom(toastX, toastY, "Copied to clipboard", "toastClip", true, false);
```

---

## Adaptive Tooltips (`ui.tooltip`)

Speech-bubble tooltips with cut corners and a stepped tail pointing to the cursor. Widgets with a non-null `tip` parameter trigger tooltips automatically on hover; you can also invoke `ui.tooltip(...)` manually:

```java
public void tooltip(String tip, int mouseX, int mouseY)
```

- Automatically flips above or below the cursor based on available viewport space.
- Automatically shifts left/right near screen edges and wraps long lines cleanly.

---

## Informational Banners (`ui.banner`)

Persistent alert banners inside cards or views. Returns the computed banner height.

```java
public enum OreBanner {
    GENERAL(OreIcon.INFO_CIRCLE, OreTone.TEXT),
    SUCCESS(OreIcon.CHECK, OreAccent.GREEN.fill),
    WARNING(OreIcon.EXCLAMATION_MARK_TRIANGLE, OreAccent.YELLOW.fill),
    DESTRUCTIVE(OreIcon.CLOSE, OreAccent.RED.fill),
    QUESTION(OreIcon.QUESTION_MARK, OreAccent.BLUE.fill);
}
```

### Signatures

```java
public int banner(int x, int y, int w, String title, String description, OreBanner kind)
public int banner(int x, int y, int w, String title, String description, String[] leading, int tint)
public int banner(int x, int y, int w, String title, String description, String[] leading, String[] trailing)
```

```java
y += ui.banner(x, y, width,
    "Experimental Settings Enabled",
    "Some features may cause instability or lag.",
    OreBanner.WARNING
);
```

---

## Badges, Tags & Indicators

Flat `OreAccent` pills for status labels and notifications:

```java
// 14px tall pill badge (returns width)
public int badge(int x, int y, String label, OreAccent accent)

// Small circular/square dot indicator
public void indicator(int x, int y, OreAccent accent)

// Tag pill with optional 8x8 leading/trailing icons (returns width)
public int tag(int x, int y, String label, OreAccent accent)
public int tag(int x, int y, String label, OreAccent accent, String[] leading, String[] trailing)

// Horizontal divider with centered accent label
public void labeledDivider(int x, int y, int w, String label, OreAccent accent)
```
