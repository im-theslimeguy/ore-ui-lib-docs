---
title: Design System
description: Game pixel grid units, layered bevel anatomy, immediate-mode lifecycle, and keyboard focus rules.
---

Ore UI avoids rounded corners and soft drop shadows. Depth is built from stacked rectangles, directional 1-pixel bevels, and hard-edged extrusion shadows.

## Game Pixel Grid

In the Figma Ore UI specification, 1 Ore UI design unit equals `4px` on the Figma canvas and **1 GUI pixel** in Minecraft Java Edition (with fractional values rounded down):

| Constant (`OreUi.*`) | Value (GUI px) | Component |
| --- | --- | --- |
| `BUTTON_HEIGHT` | `26` | Standard `ui.button(...)` height (26.25 px rounded down) |
| `NAV_HEIGHT` | `25` | `ui.navItem(...)` and `ui.navHeader(...)` row height |
| `CHECK_SIZE` | `14` | `ui.checkbox(...)` square size (14.5 px rounded down) |
| `RADIO_SIZE` | `22` | `ui.radio(...)` bounding box for the 45° diamond |
| `FIELD_HEIGHT` | `31` | `ui.textBox(...)`, `ui.searchBox(...)`, and `ui.banner(...)` height |
| `TAB_HEIGHT` | `27` | `ui.tabBar(...)`, `ui.tabButton(...)`, `ui.navButtonHorizontal(...)`, and `ui.selectionButton(...)` height |
| `BADGE_HEIGHT` | `14` | `ui.badge(...)` and `ui.seamlessButton(...)` height |
| `HANDLE` | `14` | `ui.slider(...)` handle width and height |
| `BAR_OVERLAP` | `1` | Horizontal pixel overlap used by `tabRow`, `navRowHorizontal`, and `selectionRow` |
| `SEAMLESS_FRAME` | `12` | Icon-only seamless square reference frame |

## Bevel & Shadow Anatomy

Every raised control (`ui.face(...)`) follows the exact same layer order:

1. **Outer Outline (`OreTone.DARK` / `0xFF1E1E1F`)**: `1px` solid frame wrapping the entire control.
2. **Face & Bevels**: Main surface fill with a `1px` lighter `stroke` on the **bottom and right**, and a `1px` translucent `light` highlight (`0x33FFFFFF` at rest) on the **top and left**.
3. **Shadow Rows**: `2px` solid block (`shadowRows = 2`) below the face inside the `#1E1E1F` outline. When pressed, `sink` increases (up to `3px`) and `shadowRows` collapses to `0` so the control physically sinks.
4. **Focus Ring (`OreTone.FOCUS` / `0xFFFFFFFF`)**: `1px` solid `#FFFFFF` outline drawn **outside** the `#1E1E1F` border via `ui.focusRing(...)`. Focus rings are deferred to `ui.end()` so they render cleanly above adjacent widgets while respecting active scissor clips.

## Immediate-Mode Lifecycle & Primitives

`OreUi` is immediate-mode: components render and register their hit/focus regions in the same call, with later calls sitting on top of earlier ones:

- **`ui.begin(graphics, font, mouseX, mouseY, screenWidth, screenHeight)`**: Resets the frame's hit list, focusables, and clip state, and computes frame delta time (`clamped <= 0.05s`) for springs and hover transitions.
- **`ui.end()`**: Renders deferred focus rings, renders open `dropdown(...)` modal popups on top, and updates the hardware cursor (`POINTING_HAND` over clickables, `NOT_ALLOWED` over areas marked with `markDisabledArea(...)`).
- **`ui.block()`**: Swallows all earlier hit targets and clears earlier Tab stops so a modal popup never leaks clicks, hovers, or focus to content behind it.
- **`ui.pushClip(x0, y0, x1, y1)` / `ui.popClip()`**: Intersecting scissor stack used by scrollable panels and text fields so both drawing and hit-testing clip cleanly.
- **Primitive helpers**: `ui.face(...)`, `ui.faceRing(...)`, `ui.surface(...)`, `ui.focusRing(...)`, `ui.approach(...)`, `ui.spring(...)`, `ui.springTo(...)`.
