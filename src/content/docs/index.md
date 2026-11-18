---
title: Ore UI Library
description: Pixel-perfect Minecraft Bedrock Ore UI design system and component framework for Minecraft Java Edition.
---

Ore UI Library is a modular, high-fidelity implementation of the **Minecraft Bedrock Ore UI** design system for Minecraft Java Edition.

It gives mod developers and creators a complete, ready-to-use framework of pixel-accurate Bedrock components: layered tactile buttons, responsive docked cards, spring-animated sliders, tri-state checkboxes, diamond radio groups, floating popups, multi-font typography with vector antialiasing, and responsive layout management that scales gracefully across all GUI scales.

Start with [Installation](/install/) or [Your First Screen](/first-screen/).

## Why Ore UI?

Vanilla Minecraft Java Edition UI components (`Button`, `Checkbox`, `EditBox`, etc.) are notoriously rigid, flat, and visually divergent from modern Minecraft Bedrock Edition. Crafting custom screens often requires hundreds of lines of fragile manual rendering, inconsistent hover logic, broken keyboard navigation, and pixel artifacts.

Ore UI Library solves this by bringing the official **Minecraft Bedrock "Ore UI Style"** specifications into a modern immediate-mode Java API:

- **100% Design Fidelity**: Every dimension, bevel, drop shadow, inner highlight, sink depth, and color token matches Bedrock Edition's design tokens (where 1 design unit = 4px).
- **Physical Feel**: Real tactile button sinking on mouse press, layered shadows (2 rows at rest, 0 when pressed), and genuine physics-based spring oscillations when releasing sliders.
- **True Multi-Font Engine**: Dynamically fetches and rasterizes official Mojang typography (**Minecraft Seven**, **Minecraft Ten**) and **Noto Sans** into an Ultra-HD 4096×4096 vector GPU atlas with subpixel antialiasing and kerning.
- **Adaptive Layout Engine**: Automatically transitions between floating desktop panes with generous breathing room and edge-to-edge docked mode when GUI scales are constrained.
- **Zero-Boilerplate Modularity**: Use pre-built base classes like `OrePanelScreen` or call individual immediate-mode widgets (`ui.button(...)`, `ui.toggle(...)`, `ui.slider(...)`) on any vanilla or custom `Screen`.

## Core Component Matrix

| Component | Method | Description |
| --- | --- | --- |
| **Buttons** | `ui.button(...)` | Tactile push buttons with rest/hover/down states, icons, and 5 color variants. |
| **Stacked Buttons** | `ui.buttonStacked(...)` | Tall action buttons with 12px icon positioned vertically above the label. |
| **Selection Buttons** | `ui.selectionButton(...)` | Mutually exclusive or multi-choice tabbed segmented buttons with badges. |
| **Selectable Icon Buttons** | `ui.selectableIconButton(...)` | Image-picker square tiles that sink into dark green beveled frames on selection. |
| **Menu Rows** | `ui.menuButton(...)` | Edge-to-edge 28px list actions with hover wash and chevron/icon support. |
| **Cards & Containers** | `ui.cardContainer(...)` | Beveled 3D containers with dark border, drop shadow, and attached headers. |
| **Horizontal Cards** | `ui.cardHorizontal(...)` | List items with thumbnail, title, subtitle, and trailing chevron. |
| **Switches** | `ui.toggle(...)` | Animated toggle switches with spring handle bounce and optional glyph icons. |
| **Checkboxes** | `ui.checkbox(...)` | Distinct 3-state checkbox (unchecked, checked, indeterminate) with drop shadow. |
| **Radios** | `ui.radio(...)` | Beveled 3D diamond selection dots with lit top and shadow bevels. |
| **Text Fields** | `ui.textBox(...)` | Smooth single-line input with selection, caret navigation, and lock icons. |
| **Search Fields** | `ui.searchBox(...)` | Text input with magnifying glass icon and instant clear button. |
| **Dropdowns** | `ui.dropdown(...)` | Collapsible selector expanding into an edge-to-edge floating modal menu. |
| **Sliders** | `ui.slider(...)` | Continuous & segmented track sliders with physics-based spring snap bounce. |
| **Popups & Modals** | `ui.popup(...)` | Floating dark dialog frames with `popupHeader`, `popupActions`, and input blocking. |
| **Toasts** | `ui.toast(...)`, `ui.toastBottom(...)` | Sliding alert notifications with custom fonts and icons. |
| **Tooltips** | `ui.tooltip(...)` | Adaptive stepped-tail speech bubble tooltips in Bedrock blue. |
| **Tab Bars** | `ui.tabBar(...)` | Full-width pinned header with centered title and optional action icon buttons. |
| **Navigation** | `ui.navItem(...)`, `ui.navButtonHorizontal(...)` | Responsive vertical and horizontal sidebar navigation buttons with active states. |

## Supported Loaders & Minecraft Versions

Ore UI Library is architected with a decoupled core:
- **Minecraft Versions**: 1.21.4 through 26.3+.
- **Loader**: Fabric (Forge / NeoForge multi-loader architecture planned).
- **Client-Side Only**: Safe to use in any client mod without server presence required.
