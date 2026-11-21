---
name: vetro-frosted-glass
description: Implement the Vetro frosted-glass material (dock capsules, round buttons, notification plates, dropdown panels) in Jetpack Compose on top of the Kyant backdrop library. Use when the user wants a matte, diffuse "frosted" surface that stays readable over moving content, with exact blur/tint/grain/rim/highlight/shadow values for dark and light themes.
---

# Vetro frosted glass — implementation skill

You are implementing a **material**, not a translucent rectangle. Follow this document literally; every number
below was taken from a shipping Android app (Vetro) and is tuned. The reference implementation is in `GUIDE.txt`
of the same archive — read it before writing code and copy it unless the user's code base forces a deviation.

## 0. Decide first: is this the right glass?

There are two different glass materials, do not mix them up:

| Material | Look | Use for |
| --- | --- | --- |
| **Liquid** (lens refraction, almost no blur) | content under it is magnified/refracted and still readable | a dock over a list of covers |
| **Frosted** (this skill: strong blur + tint + grain) | content under it is *diffused*, text on top stays readable | plates carrying text, menus, notifications, buttons over busy art |

Use frosted when letters will sit on top of it. Never put a frosted surface over a flat solid fill: with nothing
to diffuse it is just an opaque rectangle no matter how large the blur radius is. It needs real content under it
(a list, covers, a video frame).

## 1. Stack and versions (verified)

- Kotlin 2.4.21, Android Gradle Plugin 8.13.2, Compose BOM 2025.12.00, compileSdk/targetSdk 36, minSdk 26
- `io.github.kyant0:backdrop:1.0.0` — provides `layerBackdrop`, `drawBackdrop`, `blur`, `colorControls`, `Highlight`, `Shadow`
- Real blur needs **Android 12 (API 31)**. Below that, use the deliberate fallback material (section 5), never a fake.

Imports you will need:

```kotlin
import com.kyant.backdrop.Backdrop
import com.kyant.backdrop.backdrops.layerBackdrop
import com.kyant.backdrop.backdrops.rememberLayerBackdrop
import com.kyant.backdrop.drawBackdrop
import com.kyant.backdrop.effects.blur
import com.kyant.backdrop.effects.colorControls
import com.kyant.backdrop.highlight.Highlight
import com.kyant.backdrop.shadow.Shadow
```

Check the license of the backdrop library before shipping and keep its attribution.

## 2. The eight layers (order matters)

| # | Layer | How it is built |
| - | ----- | --------------- |
| 1 | live backdrop | `drawBackdrop(backdrop)` — a real recording of the scene under the surface |
| 2 | local blur | `blur(radiusPx)`, clipped to the surface shape |
| 3 | saturation + contrast | `colorControls(contrast, saturation)` — keeps colour alive after blur |
| 4 | neutral tint | `onDrawSurface = { drawRect(tint) }` — drawn AFTER the blur |
| 5 | micro-grain 1–3 % | `onDrawFront` — a cached 128x128 achromatic noise tile |
| 6 | rim, exactly one physical pixel | `border(1px, rim, shape)` — **1 physical px, not 1 dp** |
| 7 | inner highlight on the top edge | `highlight = Highlight(width = 0.75.dp, alpha = …)` |
| 8 | wide, weak shadow | `shadow = Shadow(radius = …, color = black @ low alpha)` |

Hard rules:

1. **Blur happens before tint.** Tint goes in `onDrawSurface`, i.e. on top of the processed backdrop. Never mix
   the tint into the backdrop beneath the blur.
2. **Blur before colour controls** inside `effects { }`. The reverse order smears already boosted saturation into a
   dirty halo.
3. Grain is **achromatic** and weak (alpha 0.014–0.022). Visible grain is decoration, not material. Its job is to
   kill banding on the blur gradient. Build the tile once per process with a fixed seed (`Random(0x5E7B0)`,
   grey = 128 ± 64) so screenshots are reproducible.
4. The rim is one **physical** pixel: `with(density) { 1f.toDp() }`. 1 dp is 3–4 px on a dense screen and turns the
   hairline into a fat frame.

## 3. Material values

Per-role materials, not one "glass" with ad-hoc alphas scattered across components (that is how glass turns to mush).

### dock — capsules, round buttons, dropdown panels (blur 20 dp)

|  | dark | light |
| --- | --- | --- |
| blur | 20 dp | 20 dp |
| saturation / contrast | 1.20 / 1.06 | 1.18 / 1.05 |
| tint | `#141414` @ 0.48 | white @ 0.54 |
| grain alpha | 0.020 | 0.014 |
| rim | white @ 0.14 | white @ 0.90 |
| highlight (0.75 dp) | alpha 0.55 | alpha 0.75 |
| shadow | radius 30 dp, black @ 0.26 | radius 28 dp, black @ 0.14 |
| fallback fill (API < 31) | `#1A1A1A` | `#F2F2F4` |

### notification — plates that carry body text (blur 24 dp, denser tint)

|  | dark | light |
| --- | --- | --- |
| blur | 24 dp | 24 dp |
| saturation / contrast | 1.18 / 1.05 | 1.16 / 1.04 |
| tint | `#121212` @ 0.62 | white @ 0.66 |
| grain alpha | 0.022 | 0.016 |
| rim | white @ 0.16 | white @ 0.85 |
| highlight | alpha 0.50 | alpha 0.70 |
| shadow | radius 28 dp, black @ 0.22 | radius 26 dp, black @ 0.12 |
| fallback fill | `#1C1C1E` | white |

### playerControl — buttons over cover art (theme independent: the backdrop is the picture, not the app)

blur 24 dp, saturation 1.16, contrast 1.05, tint `#141414` @ 0.42, grain 0.020, rim white @ 0.16, highlight 0.50,
shadow radius 24 dp black @ 0.22, fallback `#E6202020`.

### stackedNotification — a plate lying UNDER the top one in a stack

Same as notification but `blur = 0`, saturation = contrast = 1, tint fully opaque (`#1C1C1E` / white),
grain 0, no highlight, no shadow. Opaque on purpose: through a translucent stack the text of lower plates shows
through and turns into noise. Alternative that avoids a visible material swap while a plate is pushed back: keep the
same glass for every plate and fade the text of plates that lie behind (the demo app does this).

## 4. Structure rules (these cause the nasty bugs)

1. One `rememberLayerBackdrop()` per screen; the scrolling content gets `Modifier.layerBackdrop(backdrop)`.
   Every glass surface is a **sibling** of that content (drawn after it), never its ancestor.
2. **Never structurally add or remove a modifier node above a `layerBackdrop`** at runtime (for example a
   `Modifier.blur` that appears only when radius > 0, or a conditional `.then(...)`). Toggle *properties* of a
   permanent node instead. A changed node set resets the backdrop recording and the glass collapses into a flat fill.
3. Keep the glass modifier chain constant for the whole life of a composable. Choose branches (API level, theme)
   once with `remember(...)`, not per frame.
4. `DropdownMenu` / `Popup` are separate windows: the screen's `layerBackdrop` cannot be read from there and the
   menu comes out solid. Draw dropdown panels **inside** the screen as siblings of the content.
5. `drawBackdrop` creates a new shape provider on every call without `equals`; any recomposition would rebuild the
   `RenderEffect` and repaint the shadow. Remember the whole modifier chain keyed by
   `(backdrop, shape, material, blurPx, noiseBrush)`.
6. Moving the glass: translate with `Modifier.offset { }` or by animating the surface's own position. Wrapping the
   backdrop-providing content in a `graphicsLayer` that changes at runtime was observed to flatten the glass.
7. **Never animate the alpha of glass, not on open and not on close.** A half-transparent glass shows the sharp,
   un-blurred backdrop through it for a few frames, which reads as the blur disappearing. Keep alpha = 1 and change
   the glass's SIZE: let a panel grow from its corner and shrink back into it (its size follows the spring in the
   layout phase), and fade only the content (text, icons). Capping alpha early fixes the opening but the closing still
   flashes the sharp backdrop.

## 5. API < 31 fallback

`RenderEffect.createBlurEffect` exists from Android 12. Below that do **not** imitate blur with a grey
translucent rectangle. Use a deliberate, denser material: `background(material.fallbackFill, shape)` plus the
grain overlay. Decide the branch once (`Build.VERSION.SDK_INT >= Build.VERSION_CODES.S`).

## 6. What to build

1. `FrostedMaterial` (immutable data class: blur, saturation, contrast, tint, noiseAlpha, rim, highlight, shadow,
   fallbackFill).
2. `FrostedMaterials` with `dock(isDark)`, `notification(isDark)`, `stackedNotification(isDark)`, `playerControl()`.
3. `Modifier.frostedGlass(backdrop, shape, material)` exactly as in `GUIDE.txt`.
4. A demo screen: scrolling list of colourful cards under a capsule dock, a round button, a notification plate and a
   dropdown panel, in light and dark. Without colourful moving content you cannot judge the result.

Adapt names/packages to the user's project, keep the numbers.

## 7. Acceptance checklist

- [ ] Text on the plate is readable over a high-contrast poster in **both** themes.
- [ ] Scrolling content visibly diffuses under the glass (not an opaque rectangle).
- [ ] Rim is a hairline on a 3x-density phone.
- [ ] No banding on the blur gradient; grain is not visible as texture at 1:1.
- [ ] Toggling theme or recomposing does not make the glass go flat.
- [ ] On API 26–30 the fallback material renders without crashing and without fake blur.
- [ ] The dropdown panel is glass (not solid): it is drawn inside the screen, not in a Popup.
- [ ] While a panel/plate animates in or out you never see the sharp backdrop through a half-transparent glass.
- [ ] No hard-coded alpha values outside the materials object.

## 8. Report back

State: which files you created, the material values you changed (should be none), and which acceptance items you
could not verify on a device.

Licence: GPL-3.0 (Vetro Modules). Material parameters and code may be reused under the terms of the GPL-3.0.
