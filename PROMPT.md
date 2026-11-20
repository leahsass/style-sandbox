# Style Sandbox: paste-in prompt

No skills on your plan (for example Base44 Starter, Bolt, v0, or Replit)? Paste the prompt below into your builder's chat instead. It does the same install as the skill in one message.

Before you paste:
- Your app must be built with React. Style Sandbox v1 supports React apps only.
- The prompt asks the builder to download 7 files from this GitHub repo. If your builder can't open web links, it will stop and tell you instead of writing its own version, so you won't waste credits on a lookalike.

Copy everything inside the box:

```text
Install Style Sandbox in this app. It is a ready-made floating style panel that restyles my real pages live when I add ?style-sandbox to the preview URL. Follow these steps in order. Do not ask me questions, and do not change how the app looks right now.

STEP 1: GET THE FILES (do this first)
Download these 7 files exactly as written. Do not retype, rewrite, shorten, or "improve" them:
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/StyleSandbox.tsx
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/color.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/config.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/fonts.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/look.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/styles.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/themes.ts
If you cannot open these links, STOP here. Make no changes and reply only: "I can't download the Style Sandbox files in this builder." Do not write your own version of the panel.
If this app is not built with React, STOP and reply: "Style Sandbox v1 supports React apps only."

STEP 2: LOOK AROUND (read only, change nothing)
- Find the 3 screens people see first (home, then the most visually different pages).
- Find the global stylesheet. Note how colors are written (hex, HSL triplets like 222 47% 11%, or hsl(...)) and the CSS variable names.
- Note the current background, text, primary, text-on-primary, and accent colors as hex, the heading and body fonts, the corner radius in px, and how deep the shadows are.
- Note the main headline and one line of body copy.
- Note decorative art that isn't layout (illustrations, mascots, background shapes).
- If a /sandbox, /playground, or /styleguide page exists, leave it alone.

STEP 3: PREP TOKENS (keep it small)
- Only touch what those 3 screens and their shared components use.
- Add any missing CSS variables to the global stylesheet, set to the CURRENT values, so nothing looks different.
- Point primary and secondary buttons, links, cards, headings, and body text at those variables.
- If a background pattern or texture (dot grid, stripes, CSS gradient) uses a fixed color, rewrite only its color with the variables (for example hsl(var(--foreground) / 0.12)), keeping its size and spacing.
- If cards have no shadow class and no bg-card (for example bg-white rounded-xl border), add bg-card so the Depth slider reaches them. Tailwind rounded-* and shadow-* classes don't need rewriting; the panel handles them.
- Add data-decor to the decorative elements.
- Do not change layout, spacing, copy, or structure.

STEP 4: INSTALL
- Put the 7 files in a style-sandbox folder in the source directory (src/style-sandbox/ or the equivalent), unchanged.
- Edit ONLY config.ts. Replace every value marked FILL with what you found: app name, headline and body copy, token format, token names (use null for any the app doesn't have, including spacing if spacing isn't one variable), the decorations selector, and the current look.
- In config.ts, add this builder's PREVIEW hostname (or a unique part of it) to hosts. Never add the published app's domain, so visitors can't open the panel.
- Mount <StyleSandbox /> once in the app's root layout (the component that wraps every page), next to the page content, so it stays open while I click between pages.
- Add this line to AGENTS.md at the project root (create it if missing): "Style Sandbox is installed. Open it on any preview page by adding ?style-sandbox to the URL or pressing Option+Shift+S (Alt+Shift+S on Windows)."
- Make sure the app builds. If this project is JavaScript only and rejects .ts/.tsx files, make the smallest change needed to build (for example rename the files and remove the type annotations) and tell me what you changed. Do not add npm packages; the files only need React.

STEP 5: TELL ME (3 to 5 short lines)
- How to open it, first and in bold: add ?style-sandbox to the end of the preview URL, or press Option+Shift+S (Alt+Shift+S on Windows).
- What you prepped in Step 3, in one line.
- Which preview host you added, so I can fix it if the panel doesn't open.
- When I like a look: Copy CSS and paste it in for free, or Copy as prompt and send it back to you.

Rules: never edit the template files except config.ts (or the smallest fix needed to build), never let the panel open on the published site, never change how the app looks during this install.
```

## Refreshing an existing install

Already installed Style Sandbox and want the latest version? Paste this instead. It replaces the panel's code but keeps your app's settings in config.ts.

```text
Update Style Sandbox to the latest version. Do not ask me questions, and do not change how the app looks.

1. Download these 6 files exactly as written and replace the files with the same names in the existing style-sandbox folder. Do not retype, rewrite, shorten, or "improve" them:
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/StyleSandbox.tsx
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/color.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/fonts.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/look.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/styles.ts
https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/themes.ts
If you cannot open these links, STOP and reply only: "I can't download the Style Sandbox files in this builder."
2. Do NOT replace config.ts. Open the latest version at https://raw.githubusercontent.com/leahsass/style-sandbox/main/style-sandbox/template/config.ts and add any settings it has that the existing config.ts is missing, using the default values. Keep every existing value exactly as it is.
3. Make sure the app builds. If something in the new files doesn't build in this project, make the smallest fix and tell me.
4. Reply in 2 lines: which files you replaced, and which settings you added to config.ts.
```

## Applying a look later

When you find a look you like, click **Copy CSS** and paste it into your global stylesheet yourself if your plan lets you edit code. That's free.

Or click **Copy as prompt**, paste it into your builder's chat, and add this paragraph underneath before you send it. Without the skill installed, the builder doesn't know these extra steps:

```text
Also: re-check every text color against its background for WCAG 2.2 AA (4.5:1 for text, 3:1 for large text and UI parts) and fix anything that fails. Add success, warning, destructive, and info colors, each with a matching foreground, plus a disabled text color, all derived from this theme and passing AA. Create DESIGN.md at the project root listing the applied colors, fonts, radius, shadows, and the rule that every future color pairing must pass AA. Update "current" in src/style-sandbox/config.ts to this look. Reply with a short before and after list.
```
