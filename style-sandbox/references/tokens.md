# Token prep

The sandbox writes CSS variables into the preview. Anything on the key screens that ignores those variables won't change when the user picks a new look. Prep only what the 3 key screens use.

## Variables the sandbox writes

Color variables use the project's existing format (set `tokenFormat` in `config.ts`). The rest are always plain CSS values. Names below are shadcn/ui defaults. If the app uses different names, put its names in `config.ts` instead of renaming anything.

| Purpose | Variable | Point these at it |
|---|---|---|
| Page background | `--background` | body, page wrappers |
| Text | `--foreground` | body text, headings |
| Cards and panels | `--card`, `--card-foreground` | cards, panels, popovers |
| Key color | `--primary`, `--primary-foreground` | primary button text color, selected states |
| Key color fill | `--primary-fill` | primary button **background** (`background: var(--primary-fill)`), so solid and gradient both work |
| Secondary | `--secondary`, `--secondary-foreground` | secondary buttons, pills |
| Muted | `--muted`, `--muted-foreground` | subtle surfaces, helper text |
| Accent | `--accent`, `--accent-foreground` | badges, highlights |
| Lines | `--border`, `--input` | borders, dividers, inputs |
| Links | `--link` | text links (`color: var(--link)`) |
| Focus | `--ring` | focus outlines |
| Corners | `--radius` | cards, inputs, panels |
| Button corners | `--radius-button` | buttons, pills, badges |
| Shadows | `--shadow-card`, `--shadow-raised` | cards (`box-shadow: var(--shadow-card)`), hover and overlays (`--shadow-raised`) |
| Fonts | `--font-heading`, `--font-body` | headings, body |
| Emphasis font | `--font-accent` | only if the app has an emphasis font (set `fontAccent` in `config.ts`) |
| Heading spacing | `--heading-tracking` | headings (`letter-spacing: var(--heading-tracking)`) |
| Density | the app's spacing base (Tailwind v4: `--spacing`) | only if spacing already comes from one variable. Set `tokens.spacing` and `current.spacing` in `config.ts`. Otherwise leave `tokens.spacing` null and the Density control stays hidden. Don't refactor spacing just for this. |

## Steps

1. Add any missing variable to the global stylesheet's `:root`, **set to the current value**, so the app looks exactly the same.
2. In the components the key screens use, replace hardcoded colors, fonts, radii, and shadows with the variables. In Tailwind, use arbitrary values such as `rounded-[var(--radius-button)]`, `shadow-[var(--shadow-card)]`, or `bg-[image:var(--primary-fill)]`, or add them to the Tailwind theme.
3. **Background patterns and textures** (dot grids, stripes, gradients drawn in CSS) must use the color variables too, or they'll stay the old color when the theme changes. Rewrite their colors with the variables, keeping size and spacing: for example `radial-gradient(hsl(var(--foreground) / 0.12) 1px, transparent 1px)` for shadcn triplets, or `color-mix(in srgb, var(--foreground) 12%, transparent)` for hex.
4. Tailwind `rounded-*` and `shadow-*` classes (and `bg-card` surfaces) are handled by the panel itself (see `tailwindClasses` in `config.ts`), so you don't need to rewrite them. If cards have no shadow class and no `bg-card` (for example `bg-white rounded-xl border`), add `bg-card` or `shadow-sm` to them so Depth reaches them. Inline `border-radius` styles on key components should still be replaced with `var(--radius)` or `var(--radius-button)`.
5. Add `data-decor` to decorative elements (illustrations, mascots, background shapes) so "Hide decorations" works.
6. Leave layout, spacing, copy, and structure alone.

## Checking your work

Open a key screen before and after. Light and dark mode both work through the same color variables, so no extra prep is needed for them. It must look identical. Then temporarily change `--primary` in the browser dev tools: buttons, links, and selected states should all follow.
