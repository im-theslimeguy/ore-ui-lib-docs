---
title: Typography & Fonts
description: Multi-font architecture (OreFont.SEVEN, TEN, NOTO_SANS), 4K vector atlas, kerning rules, and OreFontManager API.
---

Ore UI Library features a multi-font typography pipeline that renders crisp high-definition vector typography alongside vanilla Minecraft's pixel font.

---

## The 3 `OreFont` Families

```java
public enum OreFont {
    SEVEN("Minecraft Seven v2"),     // Vanilla pixel font: buttons, labels, fields
    TEN("Minecraft Ten v2"),         // Mojang WOFF2: TabBar titles, major headers
    NOTO_SANS("Noto Sans");          // Google Fonts TTF: Bottom toasts, clean subtitles
}
```

---

## 4K GPU Vector Atlas Engine

To prevent pixelation or blurry scaling across GUI scales, `OreFontAtlas` rasterizes TrueType and OpenType fonts at runtime:

- **Atlas Resolution**: `4096×4096` texture dimensions.
- **Base Glyph Size**: `128px` high-DPI rasterization.
- **Pure Vector Outlines**: Glyphs are extracted as AWT vector outlines (`gv.getOutline()`) and filled with mathematical antialiasing.
- **Clean Alpha Mapping**: Pure white RGB (`0x00FFFFFF`) paired with the computed alpha channel allows clean OpenGL tinting without dark edge halos.

---

## Subpixel Kerning & 1px Separation Barrier

Standard TrueType fonts rendered at small GUI resolutions (8px–12px) can suffer from integer rounding errors where adjacent glyphs collapse and touch.

1. **Pair-Kerning Rules**:
   - **Minecraft Ten (`OreFont.TEN`)**: `'U'/'u'` followed by `'I'/'i'` applies `-7.0F` (`-0.44px`) optical tightening.
   - **Noto Sans (`OreFont.NOTO_SANS`)**: `'i'`/`'f'` (`+6.0F`), `'f'`/`'t'` (`+6.0F`), and `'a'`/`'r'` (`-3.0F`) micro-kerning adjustments.
2. **Guaranteed 1px Separation Barrier**:
   During glyph placement and width measurement, if integer rounding would cause two adjacent visible glyphs to touch (`dx < prevEnd + 1`), `dx` is pushed forward by `1` screen pixel while spaces (`cp == 32`) retain their natural advance.

---

## Rendering & Measuring Text

### Using `OreUi` Text Methods

```java
// Standard text (defaults to OreFont.SEVEN / vanilla font)
ui.text("Hello World", x, y, OreTone.TEXT);
ui.text("With shadow", x, y, OreTone.TEXT, true);

// Pinned header using Minecraft Ten
ui.text(OreFont.TEN, "WORLD SETTINGS", x, y, OreTone.TEXT);

// Clean sans-serif text using Noto Sans
ui.text(OreFont.NOTO_SANS, "Settings synced successfully", x, y, OreTone.TEXT);

// Centered or scaled text
ui.textCentered(OreFont.TEN, "PAUSE MENU", centerX, y, OreTone.TEXT);
ui.textScaled(OreFont.NOTO_SANS, "Subtitle text", x, y, OreTone.MUTED, 0.9F);
ui.textCenteredScaled(OreFont.TEN, "TITLE", centerX, y, OreTone.TEXT_DARK, 1.35F);

// Auto-wrapped paragraph (returns total rendered height)
int h = ui.paragraph("Long wrapped description...", x, y, maxWidth, OreTone.MUTED);

// Precise text measuring (returns integer pixels)
int w = ui.textWidth(OreFont.NOTO_SANS, "My Label");
int sw = ui.textWidth(OreFont.TEN, "Scaled", 1.35F);
```

### Using `OreFontManager` Directly

```java
// Check asset readiness
boolean ready = OreFontManager.isReady();
float progress = OreFontManager.getProgress();
String step = OreFontManager.getStep();

// Measure line height for a specific OreFont
int lineH = OreFontManager.lineHeight(OreFont.NOTO_SANS, this.font, 1.0F);

// Clear cached fonts and trigger re-download
OreFontManager.resetFonts();
```
