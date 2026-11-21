---
name: vetro-motion
description: Implement the Vetro motion system in Jetpack Compose - a single table of spring tokens plus three patterns built on it (a window that grows out of a dock icon, a "..." popover with a corner pop, and a notification stack with arrive / fling / reflow cascade). Use when the user wants iOS-like, physically consistent UI motion with exact damping ratios and periods instead of ad-hoc spring() calls.
---

# Vetro motion — implementation skill

The idea: **one table of springs is the only source of truth.** UI code never calls `spring(...)` or `tween(...)`
with numbers of its own; it asks a token. The patterns below are compositions of those tokens. Reference code is
in `GUIDE.txt` of the same archive.

## 1. Laws (follow all of them)

1. **Springs, not durations.** Position/size/scale are springs. Opacity and colour are short tweens
   (160 / 220 / 300 ms) or the two spec easings below.
2. **A spring is defined by (ζ damping ratio, T period), mass = 1.** Compose `stiffness = (2π / T)²`,
   `dampingRatio = ζ`. Define tokens as `(ζ, T)` pairs and convert once.
3. **Enter and exit are different springs.** Exit is critically damped (ζ = 1, no bounce) and takes about
   60–65 % of the enter time: closing gets out of the way, it does not say goodbye with a wobble.
4. **Large surfaces are heavier** than menus: longer period (T ≈ 0.46 s for a window vs ≈ 0.28 s for a menu).
5. **Content appears after the shell has gained area**, not inside a tiny plate: reveal the content ~200 ms
   after a growing window starts (≈ 80 % of its path), then `EaseEnter` 140 ms; on exit the content fades first
   (`EaseExit` 100 ms).
6. **Stagger** list rows by 24 ms each, capped at 6 items.
7. **Hand-over of velocity**: when a gesture releases a surface, the finger velocity is the spring's initial
   condition. Never restart from rest.
8. **Never animate the alpha of glass, on open or on close.** A half-transparent glass shows the sharp backdrop
   through it for a few frames and reads as the blur disappearing. Keep alpha = 1 and change the glass's SIZE: grow
   it from a corner, shrink it back into the corner, fade only its content.
9. **Never hard-code** `spring(dampingRatio = …, stiffness = …)` in a screen. If a needed behaviour is missing,
   add a token with a comment saying where the numbers come from.

## 2. The token table

| Token | ζ | T (s) | stiffness | Use |
| --- | --- | --- | --- | --- |
| `springPressIn` | 1.00 | 0.080 | 6169 | button squeeze on press |
| `springSnappy` | 0.86 | 0.200 | 987 | release, toggle, chevron |
| `springSurface` | 0.88 | 0.240 | 685 | floating dock, scroll button, toast |
| `springObject` | 0.92 | 0.320 | 386 | new object appears in a list |
| `springExit` | 1.00 | 0.160 | 1542 | any close |
| `largeSurfaceEnter` | 0.92 | ≈0.46 | 186.6 | window / sheet appears |
| `largeSurfaceExit` | 1.00 | ≈0.30 | 438.6 | window / sheet leaves |
| `menuPop` | 0.72 | ≈0.28 | 503.6 | dropdown / popover (slight overshoot) |
| `sheetDismissForced` | 1.00 | — | 700 | forced dismiss after fling |
| `notificationArrive` | 0.80 | 0.380 | 273 | plate lands from the top (≈1.5 % overshoot) |
| `notificationRebound` | 0.78 | 0.300 | 439 | half-swiped plate returns |
| `notificationFling` | 1.00 | 0.220 | 816 | plate leaves, no return |
| `notificationReflow` | 0.72 | 0.340 (+8 %/slot) | 342 | neighbours fill the gap |

Two non-spring easings: `EaseEnter = cubic-bezier(0.16, 1, 0.3, 1)` (140 ms),
`EaseExit = cubic-bezier(0.32, 0.72, 0, 1)` (100 ms).

Overshoot of an under-damped spring: `OS = exp(−πζ / √(1 − ζ²))` (ζ 0.80 → 1.5 %, ζ 0.72 → 4 %).

## 3. Pattern A — window out of a dock icon (container transform)

- Use `SharedTransitionLayout` + `Modifier.sharedBounds(...)`. Source (the 36 dp icon node in the dock) and
  destination (the whole screen) share one key.
- `resizeMode = SharedTransitionScope.ResizeMode.scaleToBounds()` for heavy content: the content is measured once
  at final size and scaled during the transition (no per-frame relayout of a long list). Use
  `RemeasureToBounds` only for light content.
- `boundsTransform = { _, _ -> largeSurfaceEnterBounds }` on the destination, `largeSurfaceExitBounds` on the
  source side for the way back (separate enter/exit springs; both are `SpringSpec<Rect>` with
  `Rect.VisibilityThreshold`).
- Clip the overlay with the corner radius of the target (`OverlayClip(shape)`).
- Pass `enter = EnterTransition.None, exit = ExitTransition.None` to `sharedBounds`: by default it cross-fades and
  the growing window looks half transparent. One `boundsTransform` lambda can pick enter/exit by direction
  (`target.width > initial.width`).
- Content: `fadeIn(easeEnter(delayMillis = 200))`; rows stagger 24 ms.
- The pressed dock icon first squeezes with `springPressIn`, releases with `springSnappy`.
- Do not add or remove modifiers above a `layerBackdrop` while the transition runs.

## 4. Pattern B — the "..." popover

- Panel is drawn inside the screen (not a `Popup`), anchored to the button's corner.
- `progress` is `animateFloatAsState(if (expanded) 1f else 0f, if (expanded) menuPop() else sheetDismissForced())`.
- The glass panel is never faded: its SIZE follows `progress` in the layout phase (`Modifier.layout`, width =
  232 dp × progress, height = 204 dp × progress, anchored at the top-right corner), so it grows out of the corner and
  shrinks back into it. It overshoots a few percent on open because ζ = 0.72. Rows keep their final size inside
  (`requiredSize`, aligned top-end, clipped by the glass) and fade in with a stagger.
- Rows fade in with a 60 ms delay and 24 ms stagger. Render the panel only while `progress > 0.001`.
- A transparent full-screen scrim sibling closes on outside tap; `BackHandler` closes it too.

## 5. Pattern C — notification stack

Slots 0..N (0 = top). Each plate has: `y` (arrive), `x` (fling), and a continuous `slot` value.

- Arrive: `y` from above the screen to 0 with `notificationArrive`; oldest plate first, every new plate lands on
  top and pushes the others back one slot.
- Slot geometry: `translateY = 12 dp × slot`, `scale = 1 − 0.045 × slot` (illustrative numbers).
- Fling: swipe past 32 % of the width, or faster than 1000 dp/s → `x` to off-screen with `notificationFling`
  using the finger velocity as initial velocity.
- Reflow: when a plate leaves, every plate behind it animates `slot` down by 1 with `notificationReflow`, where
  the period of the n-th plate is `0.340 s × (1 + 0.08 × n)` (n capped at 6). **No timers**: the longer period
  alone makes the wave run down the stack without cutting off anyone's velocity.
- Material: the same glass for every plate; fade the text of plates behind (`1 − 1.4 × slot`). Do not swap glass for
  an opaque fill while a plate moves back — the swap is visible as the glass popping out.

## 6. What to build

1. `MotionTokens` object exactly as in `GUIDE.txt` (generic `<T> fun …(): SpringSpec<T>`).
2. The three patterns as small composables (`DockWindowTransition`, `PopoverMenu`, `NotificationStack`) that only
   use tokens.
3. A demo screen that runs all three on a calm moving background, in light and dark.

## 7. Acceptance checklist

- [ ] `grep -r "spring(" ui/` shows only the tokens file.
- [ ] Opening a window: the shell grows first, content appears ≈200 ms later; no text inside a tiny plate.
- [ ] Closing is faster than opening and has no bounce.
- [ ] The popover overshoots slightly on open, none on close.
- [ ] Removing a plate from a stack makes the others shift in a visible wave, not all at once.
- [ ] All animations survive a mid-flight reverse (tap close during open) without a jump.
- [ ] Frame time stays flat on a mid-range phone (scaleToBounds used for long content).

## 8. Report back

List the tokens you added beyond the table (should be none) and anything you could not verify on a device.

Licence: GPL-3.0 (Vetro Modules).
