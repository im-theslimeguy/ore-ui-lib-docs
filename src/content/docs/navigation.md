---
title: Navigation & Responsive Panes
description: Complete API reference for TabBars, sidebar navItem/navHeader, horizontal nav rows, pagination, and OrePanelScreen docking rules.
---

Ore UI provides structured navigation components designed for mod settings, multi-screen dashboards, and category browsers.

---

## Pinned Tab Bar (`ui.tabBar`)

The top bar pinned across the top of a screen (`OreUi.TAB_HEIGHT = 27`). Draws a `Minecraft Ten` (`OreFont.TEN`) centered title and optional left/right icon buttons. Returns `TAB_HEIGHT`.

```java
public void tabBar(int x, int y, int w)
public int tabBar(int x, int y, int w, String title,
                  String[] leading, Runnable onLeading,
                  String[] trailing, Runnable onTrailing)
```

```java
ui.tabBar(0, 0, screenWidth, "Settings",
    OreIcon.CHEVRON_LEFT.small, this::onClose,
    OreIcon.SEARCH.small, this::openSearch
);
```

---

## Sidebar Navigation (`ui.navItem` & `ui.navHeader`)

Inside `OrePanelScreen.extractNav(OreUi ui, int x, int top, int w)`, stack section headers and navigation rows (`OreUi.NAV_HEIGHT = 25`):

### Signatures

```java
public void navHeader(int x, int y, int w, String[] icon, String label, String tip)

public void navItem(int x, int y, int w, boolean selected, String key,
                    String[] icon, String label, String tip, Runnable action)

public void navItem(int x, int y, int w, boolean selected, String key,
                    String[] icon, String label, String badge, OreAccent accent,
                    String tip, Runnable action)
```

### Example

```java
int y = top;

ui.navHeader(x, y, width, null, "GENERAL", "General settings");
y += OreUi.NAV_HEIGHT;

ui.navItem(x, y, width, selectedTab == 0, "navAudio", OreIcon.ADJUST_HORIZONTAL3.small,
    "Audio", "Audio settings", () -> selectedTab = 0);
y += OreUi.NAV_HEIGHT;

ui.navItem(x, y, width, selectedTab == 1, "navWorld", OreIcon.LANDSCAPE.small,
    "World", "NEW", OreAccent.GREEN, "World settings", () -> selectedTab = 1);
y += OreUi.NAV_HEIGHT;
```

---

## Horizontal Navigation (`ui.navButtonHorizontal` & `ui.navRowHorizontal`)

For top-of-panel category tabs, either render individual buttons or a connected row:

```java
// Connected horizontal row (returns height)
public int navRowHorizontal(int x, int y, int w, String[] labels, String[][] icons,
                            int selected, String key, IntConsumer action)

// Individual horizontal nav button
public void navButtonHorizontal(int x, int y, int w, String label, String[] icon,
                                String badge, OreAccent accent,
                                boolean selected, boolean enabled, boolean focused,
                                String key, String tip, Runnable action)
```

```java
String[] tabs = { "Graphics", "Audio", "Controls", "Keybinds" };
ui.navRowHorizontal(x, y, contentWidth, tabs, null, activeTab, "hnav", idx -> activeTab = idx);
```

---

## Pagination (`ui.pagination`)

Renders `< 1 2 3 ... >` page navigation controls. Returns total width.

```java
public int pagination(int x, int y, int page, int pages, String tip, IntConsumer set)
```

---

## `OrePanelScreen` Responsive Layout & Docking Rules

`OrePanelScreen` supports three `NavMode` options via `.navMode(NavMode mode)`:
- `NavMode.SIDEBAR`: Vertical sidebar on the left (`extractNav`).
- `NavMode.HORIZONTAL`: Horizontal tab strip above the content pane.
- `NavMode.NONE`: Single full-width content pane without navigation.

```
+-----------------------------------------------------------------------------------------+
| Condition          | Side Margins | Bottom Margin | Navbar-Content Gap | Top Gap        |
|--------------------|--------------|---------------|--------------------|----------------|
| Large / Small GUI  | 36px to 72px | 18px to 32px  | 14px to 24px       | 5px            |
| Medium Scale       | 0px to 36px  | 0px to 18px   | 0px to 14px        | 5px            |
| Constrained (<=500)| 0px          | 0px           | 0px (Docked!)      | 0px (Docked!)  |
+-----------------------------------------------------------------------------------------+
```

- **Floating State (`width > 500`)**: Margins and gaps scale smoothly with viewport size, keeping a `5px` top gap under the TabBar.
- **Docked State (`width <= 500` or High GUI Scale)**: Margins, navbar-content gap, and top gap collapse to `0px`. The navbar and content panes dock flush against the TabBar and each other (`viewX0 = navX1 + 1`), while card containers' built-in `12px` inner padding keeps content clear of any active navbar scrollbar.
