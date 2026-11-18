---
title: Your First Screen
description: Step-by-step guide to building custom Bedrock-style screens using Ore UI Library.
---

Ore UI Library provides three ways to integrate Bedrock-style interfaces into your mod:

1. **[`OrePanelScreen`](../navigation/)**: A complete, responsive screen architecture with Bedrock tab bars, sidebar/horizontal navigation, scrollable content panes, and automatic docked/floating layouts. Recommended for settings, menus, and multi-tab screens.
2. **[`OreScreen`](../design-system/)**: A lightweight base `Screen` that manages the `OreUi` lifecycle and routes all mouse, keyboard, IME preedit, and scroll events automatically. Recommended for custom layouts, dialogs, or splash screens.
3. **Standalone `OreUi`**: Embed `OreUi` directly inside any existing vanilla or custom `Screen` using `ui.begin(...)` and `ui.end()`.

> **Live Reference:** Check `OreShowcaseScreen.java` in the repository for a full working example of every widget, card, popup, and animation state.

---

## Option 1: Building with `OrePanelScreen`

`OrePanelScreen` handles responsive margins, scrollbars, focus bounds, and Bedrock panel docking automatically.

```java
package com.example.mymod.client;

import net.minecraft.client.gui.screens.Screen;
import net.minecraft.network.chat.Component;
import se.miljo.beef.oreui.*;

public class MySettingsScreen extends OrePanelScreen {
    private boolean soundEnabled = true;
    private float masterVolume = 0.8f;
    private int selectedTab = 0;

    public MySettingsScreen(Screen parent) {
        super(Component.literal("My Mod Settings"), parent);

        // Configure panel layout via fluent builders
        navbar(160)                          // 160px sidebar width
            .footer(false)                   // No bottom footer bar
            .panelSize(1200, 720)            // Max preferred dimensions
            .barTitle("My Mod Settings")     // Pinned top TabBar title
            .barButtons(OreIcon.CHEVRON_LEFT.small, this::onClose, null, null);
    }

    @Override
    protected int extractNav(OreUi ui, int x, int top, int w) {
        int y = top;

        // Section header
        ui.navHeader(x, y, w, null, "SETTINGS", "Configuration options");
        y += OreUi.NAV_HEIGHT;

        // Vertical navigation items (returns void, triggers Runnable on click)
        ui.navItem(x, y, w, selectedTab == 0, "navAudio", OreIcon.ADJUST_HORIZONTAL3.small,
            "Audio", "Audio settings", () -> selectedTab = 0);
        y += OreUi.NAV_HEIGHT;

        ui.navItem(x, y, w, selectedTab == 1, "navGraphics", OreIcon.LANDSCAPE.small,
            "Graphics", "Graphics settings", () -> selectedTab = 1);
        y += OreUi.NAV_HEIGHT;

        return y - top; // Return total height for sidebar scrollbar
    }

    @Override
    protected int extractView(OreUi ui, int x, int top, int w) {
        int y = top;

        // Attached card header (-1 px border overlap so borders fuse cleanly)
        y += ui.cardHeader(x, y, w, "Audio Controls", OreCardPosition.HEADER_ATTACHED) - 1;

        // Card container with 12px horizontal and 6px vertical inner padding
        y += ui.cardContainer(x, y, w, 84, OreCardPosition.BOTTOM, false, (cui, cx, cy, cw, ch) -> {
            // Toggle switch (25x14 px)
            cui.text("Sound Effects", cx, cy + 3, OreTone.TEXT);
            cui.toggle(cx + cw - 25, cy, soundEnabled, "soundToggle",
                "Toggle sound effects", () -> soundEnabled = !soundEnabled);

            // Volume slider (note: slider takes x0, y, x1 — right edge, not width)
            cui.text("Master Volume: " + Math.round(masterVolume * 100) + "%", cx, cy + 28, OreTone.MUTED);
            cui.slider(cx, cy + 44, cx + cw, masterVolume, OreVariant.COLORED, 0, false,
                "volSlider", "Adjust volume", val -> masterVolume = (float) val);
        });

        return y - top; // Return total height for content scrollbar
    }
}
```

---

## Option 2: Building with `OreScreen`

If you want a clean canvas without a sidebar or tab bar, extend `OreScreen` and override `extractContent`:

```java
package com.example.mymod.client;

import net.minecraft.client.gui.screens.Screen;
import net.minecraft.network.chat.Component;
import se.miljo.beef.oreui.*;

public class MyConfirmScreen extends OreScreen {
    private final Screen parent;
    private final Runnable onConfirm;

    public MyConfirmScreen(Screen parent, Runnable onConfirm) {
        super(Component.literal("Confirm Action"));
        this.parent = parent;
        this.onConfirm = onConfirm;
    }

    @Override
    protected void extractContent(OreUi ui, int mouseX, int mouseY, float partialTick) {
        // Dim background behind modal
        ui.overlay(0x88000000);

        int w = 260;
        int h = 132;
        int x = (this.width - w) / 2;
        int y = (this.height - h) / 2;

        // Modal frame + block() prevents clicks from leaking behind the popup
        ui.popup(x, y, w, h);
        ui.block();

        int cy = y;
        cy += ui.popupHeader(x, cy, w, "Confirm Reset", null, null,
            OreIcon.CLOSE.small, "Close", this::onClose);
        cy += ui.popupContent(x, cy, w, "Are you sure you want to reset all settings to default?");

        ui.popupActions(x, cy, w, false,
            new String[] { "Cancel", "Reset" },
            new OreVariant[] { OreVariant.GENERAL, OreVariant.DESTRUCTIVE },
            new Runnable[] {
                this::onClose,
                () -> {
                    onConfirm.run();
                    onClose();
                }
            });
    }

    @Override
    public void onClose() {
        if (this.minecraft != null) {
            this.minecraft.setScreen(parent);
        }
    }
}
```

---

## Option 3: Embedding `OreUi` in Any Vanilla `Screen`

`OreUi` is completely stateless between frames (except for spring/hover animation caches and active text field state). You can instantiate a single `private final OreUi ui = new OreUi();` field in any vanilla `Screen` and forward the render and input hooks:

```java
// Inside extractRenderState / render:
ui.setScreen(this);
ui.begin(graphics, this.font, mouseX, mouseY, this.width, this.height);
ui.button(20, 20, 120, "Open Ore UI", OreVariant.COLORED, "Opens settings", () -> {
    this.minecraft.setScreen(new MySettingsScreen(this));
});
ui.end(); // Draws deferred popups, dropdowns, and tooltips on top!
```

> **Important:** Always forward `mouseClicked`, `mouseDragged`, `mouseReleased`, `keyPressed`, `charTyped`, and `preeditUpdated` to your `ui` instance when embedding manually, and always call `ui.end()` at the end of rendering so overlays, dropdowns, and tooltips render above all other widgets.
