# DESIGN.md template

Written to the project root in Apply mode, filled in with the applied look. Keep it short so it fits in Project Knowledge or an agent rules file.

```markdown
# Design rules

These rules apply to every page, component, and feature built in this project.

## Look
- Theme: {theme name} ({solid or gradient})
- Fonts: {heading} for headings, {body} for everything else{, accent for emphasis}
- Corners: {radius}
- Elevation: {depth}, {hard or soft} shadows

## Use the tokens
- Always use the CSS tokens in {stylesheet path}. Never hardcode colors, fonts, radii, or shadows.
- Primary buttons use var(--primary-fill). Body text never sits on a gradient.
- Alerts, toasts, and form errors use the success, warning, destructive, and info tokens with their matching foregrounds.
- Cards use var(--shadow-card). Toasts, dialogs, dropdowns, and popovers use var(--shadow-raised).
- Text links use var(--link). Buttons and pills use var(--radius-button).

## Accessibility (WCAG 2.2 AA minimum)
- Normal text needs 4.5:1 contrast against what's behind it. Large text, icons, and borders need 3:1.
- Any new color pairing must be checked before use. If it fails, adjust lightness, not the token set.
- Never rely on color alone to show meaning. Pair it with text or an icon.
- Every interactive element has a visible focus state and a hover state.
- Text links inside paragraphs are underlined or otherwise distinguishable without color.
- Form fields always have visible labels.

## Changing the look
- To explore a new direction, open /style-sandbox. Do not restyle pages one by one.
```
