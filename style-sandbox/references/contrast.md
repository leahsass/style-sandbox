# AA contrast (WCAG 2.2)

## Formula

```
channel(c):          c = c / 255
                     c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4
luminance(color):    0.2126 * R + 0.7152 * G + 0.0722 * B   (using channel values)
ratio(a, b):         (lighter + 0.05) / (darker + 0.05)
```

AA requires 4.5:1 for normal text and 3:1 for large text (24px+, or 18.66px+ bold) and for UI parts like borders and icons.

## Checked live in the sandbox

The template checks these automatically (see `template/color.ts`). Apply mode re-checks them.

| Pair | Minimum |
|---|---|
| Text on background | 4.5 |
| Text on primary buttons (every gradient stop) | 4.5 |
| Muted text on background | 4.5 |
| Links on background | 4.5 |
| Text on secondary | 4.5 |
| Borders on background | 3.0 |

## Generated and checked in Apply mode

These are not shown in the sandbox, but the AI will use them later for alerts, toasts, forms, and dialogs, so they must pass now.

| Pair | Minimum |
|---|---|
| Success, Warning, Destructive, Info foregrounds on their own fill | 4.5 |
| Success, Warning, Destructive, Info fills on Background (as icons or borders) | 3.0 |
| Disabled text on Background | 3.0 (disabled controls are exempt from AA, but should stay legible) |

Derive feedback hues from conventional colors (green, amber, red, blue) nudged toward the theme's temperature. Warning fills usually need dark text.

## Fix

Convert the failing color to HSL. Keep hue and saturation. Step lightness toward black or white, whichever increases contrast, in 1% steps until the pair passes. Prefer adjusting the color the user did not pick directly (for example adjust Text on Primary before Primary itself). Show the before and after.
