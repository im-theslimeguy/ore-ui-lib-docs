---
title: Sliders & Scrollbars
description: Exact API reference for continuous sliders, segmented sliders with damped spring physics, vertical sliders, and scrollbars.
---

Ore UI provides horizontal continuous sliders, stepped segmented sliders with spring physics, vertical sliders, and thin vertical scrollbars.

> **Coordinate Note:** Unlike `button(...)` which takes `(x, y, w, h)`, horizontal `slider(...)` takes **`(x0, y, x1)`**, where `x1` is the **right edge X coordinate** (`x + width`), not the width!

---

## Continuous Sliders (`ui.slider`)

Adjusts a normalized float/double value between `0.0` and `1.0`.

### Signatures

```java
// Default green continuous slider (returns value 0..1 to DoubleConsumer)
public void slider(int x0, int y, int x1, float t, String tip, DoubleConsumer set)

// Variant & segment control
public void slider(int x0, int y, int x1, float t, OreVariant variant, int segments,
                   boolean focused, String tip, DoubleConsumer set)

// Full control with explicit animation key
public void slider(int x0, int y, int x1, float t, OreVariant variant, int segments,
                   boolean focused, String key, String tip, DoubleConsumer set)
```

```java
private float volume = 0.75f;

// Basic continuous slider (Ore UI Green)
ui.slider(x, y, x + width, volume, "Volume slider", val -> volume = (float) val);

// Explicit variant and key
ui.slider(x, y, x + width, volume, OreVariant.COLORED, 0, false,
    "volSlider", "Adjust master volume", val -> volume = (float) val);
```

- **Track Height**: `6px` layered track.
- **Handle**: `15×14` beveled face (`OreUi.HANDLE = 14`).
- **Sinking**: Handle drops by 2 shadow rows while dragged.

---

## Segmented Sliders with Spring Physics

When `segments > 1`, the track is divided into discrete stepped intervals. Use `OreUi.snap(float value, int segments)` if you need to snap a value manually.

```java
private float renderDistance = 0.5f; // 0.0 .. 1.0 stepped into 8 segments

ui.slider(x, y, x + width, renderDistance, OreVariant.GENERAL, 8, false,
    "renderDist", "Adjust render distance", val -> renderDistance = (float) val);
```

### Dragging and Spring Release Mechanics
- **Click**: Clicking directly on the track picks the nearest segment boundary and springs smoothly there without jumping to the cursor first.
- **While Dragging**: Once the pointer moves past the drag threshold, the handle tracks the cursor smoothly while the active track fill masks up to the handle's exact position.
- **On Release**: The value snaps to the nearest segment boundary and the handle springs into place using a **damped harmonic oscillator** (`stiffness = 1200`, `damping = 38`, `mass = 1.0`) without flashing segment colors during overshoot.

---

## Vertical Sliders (`ui.sliderVertical`)

A vertical slider spanning from `y0` to `y1`, mapping between `from` and `to`:

```java
public void sliderVertical(int x, int y0, int y1, float from, float to,
                           OreVariant variant, String key, String tip, DoubleConsumer set)
```

---

## Vertical Scrollbars (`ui.scrollbar`)

Used automatically by `OrePanelScreen` for both the sidebar and content pane, and available for custom scrollable areas:

```java
public void scrollbar(int x, int y0, int y1, int viewHeight, int contentHeight,
                      int scroll, DoubleConsumer set)
```

```java
int viewHeight = 200;
int contentHeight = 600;
// ...
ui.scrollbar(scrollbarX, y0, y1, viewHeight, contentHeight, scrollOffset, t -> {
    int maxScroll = Math.max(0, contentHeight - viewHeight);
    scrollOffset = (int) Math.round(t * maxScroll);
});
```

- Automatically hides when `contentHeight <= viewHeight`.
- Supports proportional thumb dragging and track-click jumping.
