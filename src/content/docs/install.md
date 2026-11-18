---
title: Installation
description: Add Ore UI Library to your Fabric or NeoForge Gradle project and understand the runtime font asset pipeline.
---

`ore-ui-lib` is a client-side library mod targeting **Minecraft 26.3** and **Java 25** on both **Fabric** and **NeoForge**.

## Gradle Dependency

Place the compiled `ore-ui-lib` jar inside a local `libs/` directory in your mod project (or bundle it with Jar-in-Jar / `include` if you prefer standalone distribution).

### Fabric (`build.gradle`)

```groovy
repositories {
    flatDir {
        dirs 'libs'
    }
}

dependencies {
    // Place ore-ui-lib-1.0.0.jar in your project's libs/ directory
    modImplementation name: 'ore-ui-lib-1.0.0'

    // Optional: bundle inside your mod jar (Jar-in-Jar)
    // include modImplementation(name: 'ore-ui-lib-1.0.0')
}
```

### NeoForge (`build.gradle`)

```groovy
repositories {
    flatDir {
        dirs 'libs'
    }
}

dependencies {
    implementation name: 'ore-ui-lib-1.0.0'

    // Optional: bundle inside your mod jar (JarJar)
    // jarJar name: 'ore-ui-lib-1.0.0'
}
```

## Mod Metadata

If you do not bundle the library inside your jar, declare `ore-ui-lib` (Fabric) or `ore_ui_lib` (NeoForge) as a client-side dependency.

### `fabric.mod.json`

```json
{
  "schemaVersion": 1,
  "id": "my_mod",
  "version": "1.0.0",
  "name": "My Mod",
  "environment": "client",
  "depends": {
    "fabricloader": ">=0.19.3",
    "minecraft": ">=26.3 <26.4",
    "java": ">=25",
    "ore-ui-lib": ">=1.0.0"
  }
}
```

### `META-INF/neoforge.mods.toml`

```toml
[[dependencies.my_mod]]
modId="ore_ui_lib"
type="required"
versionRange="[1.0.0,)"
ordering="NONE"
side="CLIENT"
```

## Runtime Font Asset Pipeline

`ore-ui-lib` does not redistribute proprietary font binaries inside the mod jar. When an Ore UI screen runs for the first time:

1. **Cache Check**: `OreFontManager` inspects `gameDirectory/oreui/fonts/` for `Minecraft-Tenv2.otf` and `NotoSans-Regular.ttf`.
2. **Dynamic Download**: If missing, `OreAssetDownloadScreen` fetches **Minecraft Ten v2** (`.woff2`) from Mojang's CDN and **Noto Sans Regular** (`.ttf`) from Google Fonts.
3. **WOFF2 Conversion & 4K GPU Atlas**: `Woff2Converter` unpacks WOFF2 in memory, and `OreFontAtlas` rasterizes each typeface at `128px` base size into a `4096×4096` antialiased GPU texture atlas.

Once cached on disk, subsequent launches load directly from `oreui/fonts/`. You can clear and re-download cached fonts programmatically via `OreFontManager.resetFonts()`.
