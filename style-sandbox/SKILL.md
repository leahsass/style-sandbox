---
name: style-sandbox
description: Use when the user wants to explore, compare, or rethink the visual style of an app or site they have already built (color themes, fonts, corner radius, shadows, density, light or dark mode) before committing to changes. Installs a ready-made floating style panel that opens over the live app with ?style-sandbox, where the user picks a vibe, mixes and matches themes and fonts, and adjusts corners, depth, and density, all live on their real pages. Every exported look meets WCAG AA. Also handles applying a look exported from the sandbox. Not for building new features, writing copy, or changing layouts.
metadata:
  version: "1.0.0"
  author: "Leah Sass, 1x Designs"
  license: "MIT"
---

# Style Sandbox

Style Sandbox installs a floating style panel over the user's real app. They open it by adding `?style-sandbox` to any preview URL, then click around their app while every choice (theme, fonts, corners, depth, density, light or dark) restyles the real pages instantly. Live tweaks, zero credits: after the install, everything runs in the browser. The panel only opens on preview and local hosts, never on the published site.

The sandbox is **already written**. It lives in this skill's `template/` folder. Your job is to prepare the project's tokens, copy the template in, fill in one config file, and mount one component. Do not write your own sandbox, and do not rewrite or "improve" the template files. This keeps the install cheap and the result the same in every project.

## Modes

1. **Install mode** (default): Phases 0 to 3.
2. **Apply mode**: the user's message contains a Style Sandbox look (JSON starting with `"styleSandbox": "1.0"`). Go to Phase 4.

If `src/style-sandbox/` already exists, this is a repeat run: only refresh `config.ts` if tokens changed, and say so. Do not reinstall.

## Phase 0: Preflight (read only, change nothing)

1. **Stack.** Detect the framework and router. See `references/stack-notes.md`.
2. **Existing playgrounds.** If a `/sandbox`, `/playground`, `/design-system`, `/styleguide`, or similar route exists, leave it untouched and say in one line that Style Sandbox is separate and won't touch it.
3. **Key screens.** Pick the **3** screens (4 at most) users will check first: the home or landing page, then the most visually distinct pages. Token prep focuses on these.
4. **Real copy.** Note the app's main headline and one line of body copy.
5. **Tokens.** Find the global stylesheet. Note how colors are written (hex, shadcn HSL triplets like `222 47% 11%`, or `hsl(...)`) and the variable names used. Check whether spacing comes from one variable (Tailwind v4 uses `--spacing`); if so, Density can work.
6. **Current look.** Note the current background, text, primary, text-on-primary, and accent colors as hex, the heading and body fonts (and an emphasis font if the app uses one), the corner radius in px, and roughly how deep and how hard the shadows are.
7. **Decorations.** Note decorative art that isn't part of the layout: illustrations, mascots, background shapes, animated characters.

Do not ask the user any questions in Install mode. Users choose their vibe inside the sandbox, which costs nothing.

If the user's first message included a link or screenshot of a style they like, extract its background, text, primary, text-on-primary, and accent colors, check they pass AA (4.5:1 for text on background and for text on primary), and add it to `extraThemes` in `config.ts` named after the source ("From stripe.com"). Mention this costs a little more than the built-in path. Pasted CSS needs no work from you: the user can paste it into the sandbox's Import CSS button for free.

## Phase 1: Token prep (keep it small)

The sandbox restyles the app by overriding CSS variables, so the key screens must read their style from variables. Follow `references/tokens.md`.

- Only touch what the 3 key screens and their shared components use. Do not refactor the whole app.
- Add any missing variables to the global stylesheet **set to the current values**, so nothing looks different.
- Point primary buttons, secondary buttons, links, cards, headings, and body text at those variables.
- Add `data-decor` to decorative elements from Phase 0, step 7.
- Do not change layout, spacing, copy, or structure.

## Phase 2: Install

1. Copy every file in `template/` into the project at `src/style-sandbox/` (or the project's equivalent source folder), **unchanged**: `StyleSandbox.tsx`, `color.ts`, `config.ts`, `fonts.ts`, `look.ts`, `styles.ts`, `themes.ts`.
2. Edit **only** `src/style-sandbox/config.ts`. Replace every value marked `FILL` with what you found in Phase 0 and set up in Phase 1: app name, headline and body copy, token format, token names (set any the app lacks to `null`, including `spacing` if spacing isn't one variable), the decorations selector, and the current look.
3. Mount `<StyleSandbox />` once in the app's root layout, next to the router outlet, so it stays open while the user navigates. It renders nothing unless the URL has `?style-sandbox` on an allowed host, so visitors to the published site never see it. See `references/stack-notes.md` for each router.
4. Help the user and future agents find it: add one line to the project's `AGENTS.md` (create it if missing; in Lovable, also suggest adding it to Project Knowledge): "Style Sandbox is installed. Open it on any preview page by adding ?style-sandbox to the URL or pressing Option+Shift+S (Alt+Shift+S on Windows)."
5. Make sure the project builds. If the project's TypeScript or lint settings reject something in the template, make the smallest possible fix and mention it.

## Phase 3: Hand off

Reply in 3 to 5 short lines:
- How to open it, in bold, as the first line: **Add `?style-sandbox` to the end of your preview URL, or press Option+Shift+S (Alt+Shift+S on Windows) while viewing the preview.** It only opens on preview and local addresses. If you know the preview URL, give it as a ready link with `?style-sandbox` already added.
- What was prepared in Phase 1, in one line.
- One thing to try first: "Pick a vibe, tap a theme, then click around your app."
- When they like a look: Copy as prompt and send it, or Copy CSS and paste it for free.

## Phase 4: Apply mode

When the user sends a look JSON:

1. Re-check AA with the formula in `references/contrast.md`. If anything fails, fix it the same way the sandbox does and say what changed.
2. Write the look's values into the global stylesheet's variables, and its fonts into the font links. The JSON lists every color, the mode, the corner and shadow values, fonts, heading tracking, and density. Do not touch layout, copy, or components.
3. **Add the supporting colors the AI will need later**, even though the sandbox doesn't show them: success, warning, destructive, and info, each with a matching foreground, plus disabled text. Derive them from the theme and make each pass AA. See `references/contrast.md`.
4. **Carry AA forward.** Create or update `DESIGN.md` at the project root using `references/design-rules.md`, filled in with the applied look. If the project has `AGENTS.md`, `CLAUDE.md`, or `.cursor/rules`, add one line pointing to `DESIGN.md`. In Lovable, also tell the user: "Paste DESIGN.md into Project Knowledge so every future prompt follows it."
5. Update `current` in `src/style-sandbox/config.ts` to the applied look, so "Current" stays accurate.
6. Reply with a short before and after list.

## Hard rules

- Never edit template files other than `config.ts`, except the smallest fix needed to build.
- Never delete or modify another playground route.
- Never let the panel open on the published site. Keep `hosts` limited to preview and local hosts unless the user asks otherwise.
- Never change how the real app looks during Install mode.
- Never add npm dependencies. The template uses only React.
- Never export or apply a look that fails WCAG 2.2 AA.

## If you are running in Lovable

- The install should take one pass. Afterward, everything in the panel happens in the browser and costs nothing.
- The panel opens in the Lovable preview (hosts starting `preview--` or `id-preview--`). Tell the user to add `?style-sandbox` to the preview URL.
- Applying with a prompt uses credits. Pasting the exported CSS into the global stylesheet in Code mode is free.

## If you are running in Claude Code, Cursor, Codex, or another agent

- Copy the template files with a file copy, not by retyping them.
- Start the dev server if it isn't running and give the user the local URL with `?style-sandbox` added.
