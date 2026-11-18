---
title: Design System & Foundations
description: The core design rules, coordinate systems, bevel mechanics, and interaction physics of Ore UI.
---

Ore UI is built around a rigorous, tangible design philosophy derived from official Bedrock Edition UI specifications. Rather than rendering flat rectangles with CSS borders, Ore UI treats every surface as a physical, extruded voxel slab with real light, shadow, and kinetic response.

---

## The 4px Grid Unit

In the official Ore UI design files, **1 design unit equals 4 screen pixels**:
- Standard button height: `26px` (6.5 units).
- Tab bar height: `20px` (5 units) or `24px` (6 units).
- Card container horizontal padding: `12px` (3 units).
- Card container vertical padding: `6px` (1.5 units).
- Standard icon size: `8×8` or `12×12` pixels.

All dimensions, gaps, and insets in `OreUi` strictly conform to this grid.

---

## Anatomy of an Ore UI Face

Every interactable element in Ore UI uses a multi-layered face shader drawn using integer raster rectangles:

```
+---------------------------------------------------------+ -> 1px Dark Outer Outline (#1E1E1F)
| +-----------------------------------------------------+ |
| | \ Inner Light Highlight (20% white)                 | |
| |   \                                                 | |
| |     \                   Face Fill                   | |
| |       \                                             | |
| |         +-----------------------------------------+ | |
| |         | Bottom/Right Stroke Highlight           | | |
| +---------+-----------------------------------------+ | |
| | Shadow Rows (2px at rest, 0px when pressed)        | | |
| +---------------------------------------------------+ | |
+---------------------------------------------------------+
```

1. **Outer Outline (`OreTone.DARK = 0xFF1E1E1F`)**: A crisp 1px border wrapping the widget.
2. **Face Fill (`variant.face`)**: The primary colored surface of the widget.
3. **Bottom/Right Stroke (`variant.stroke`)**: A 1px lighter stroke along the bottom and right edges of the face, simulating a top-left light source.
4. **Inner Highlight (`variant.light`)**: A 1px translucent highlight (20% to 40% white) along the top and left interior edges.
5. **Shadow Rows (`variant.shadow`)**: Two rows of darker pixels directly underneath the face. At rest, both rows are visible (`shadowRows = 2`). When pressed, the shadow rows collapse (`shadowRows = 0`), creating the illusion that the button is physically sinking into the panel.

---

## The Sink Interaction (Kinetic Depth)

When a button, checkbox, tab, or selection row is clicked:
- **Rest State**: `sink = 0`, `shadowRows = 2`.
- **Hover State**: Face lightens smoothly via `approach(...)` transition (`0.05s` ease-in).
- **Pressed State**: `sink = 2px` (or `3px`), `shadowRows = 0px`. The face, label, and icon all displace downwards by the exact sink depth.
- **Sound**: Plays vanilla `random.click` upon press.

---

## Focus Rings and Keyboard Accessibility

Ore UI is fully accessible via keyboard:
- **Tab / Shift+Tab**: Cycles through all active focusable components in DOM extraction order.
- **Enter / Space**: Activates the focused button, checkbox, radio, or toggle.
- **Arrow Keys**: Adjusts focused sliders by 1 segment (or 5% for continuous sliders).
- **Focus Ring (`OreTone.FOCUS = 0xFFFFFFFF`)**: A pure 1px white rectangular ring is drawn around the focused element. The focus ring sinks synchronously with the face when pressed. Focus rings are automatically clipped to panels and never bleed outside scissor bounds.
