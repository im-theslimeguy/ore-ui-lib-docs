---
title: Installation
description: How to add Ore UI Library to your Minecraft 26.3 Fabric mod project.
---

Ore UI Library is a client-side UI library mod targeting **Minecraft 26.3** (Fabric Loader `>=0.20.1`, Java `25`).

## Adding to Gradle (Fabric)

Until a public Maven repository is published, include the compiled library jar from a local `libs/` directory in your mod project.

In your `build.gradle`:

```groovy
repositories {
    flatDir {
        dirs 'libs'
    }
}

dependencies {
    // Place ore-ui-lib-1.0.jar in your project's libs/ folder
    modImplementation name: 'ore-ui-lib-1.0'
}
```

If you want to bundle Ore UI Library inside your own mod jar (Jar-in-Jar) so players do not need to install it separately:

```groovy
dependencies {
    include modImplementation(name: 'ore-ui-lib-1.0')
}
```

## Fabric Mod Configuration

If you are **not** bundling the library via `include`, declare `ore-ui-lib` as a client dependency in your `fabric.mod.json`:

```json
{
  "schemaVersion": 1,
  "id": "my_mod",
  "version": "1.0.0",
  "name": "My Mod",
  "environment": "client",
  "depends": {
    "fabricloader": ">=0.20.1",
    "minecraft": "26.3",
    "java": ">=25",
    "ore-ui-lib": ">=1.0"
  }
}
```

## Dynamic Font Asset Pipeline

Ore UI Library does **not** bundle proprietary font binaries inside the mod jar. When Minecraft starts and an Ore UI screen is opened for the first time:

1. **Cache Check**: `OreFontManager` checks `gameDirectory/oreui/fonts/` for cached typography files.
2. **Dynamic Download**: If missing, `OreAssetDownloadScreen` opens automatically and fetches:
   - **Minecraft Ten v2** (`.woff2`) directly from Mojang's official web CDN.
   - **Noto Sans Regular** (`.ttf`) directly from Google Fonts.
3. **WOFF2 Unpacking**: The built-in `Woff2Converter` decodes WOFF2 into standard SFNT OpenType tables in memory.
4. **4K GPU Atlas Generation**: `OreFontAtlas` rasterizes each font at a high-DPI 128px base into a `4096×4096` GPU texture atlas with vector antialiasing and subpixel kerning.
5. **Loading Screen**: A blurred native Minecraft progress screen informs the user (`Downloading assets...`, `Unpacking WOFF2...`, `Generating atlas...`). Once cached on disk, subsequent launches are instantaneous.

Developers can force a cache reset and re-download at any time via `OreFontManager.resetFonts()`.
