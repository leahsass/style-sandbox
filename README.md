# Style Sandbox

**Try every look before you build it.**

Style Sandbox is an open source agent skill that adds a floating style panel to your app. Add `?style-sandbox` to any preview URL and the panel opens over your real app. Pick a vibe, tap a theme, swap fonts, drag the corner and depth sliders, flip to dark mode, and click around your app while every change lands on your actual pages. Live tweaks, zero credits.

![Style Sandbox demo](docs/demo.gif)

<!-- Replace docs/demo.gif with a 10 second screen recording: tap a theme, then drag the shadow Softness slider from soft to hard. -->

## Why I built it

I build apps in Lovable, and every time I wanted to rethink the look of something, I had the same problem. I could ask for a new style, but I couldn't see it until it was built. If I didn't like it, I reverted and spent more credits trying the next idea. When I asked for a sandbox, I got a type scale on a blank page, not my landing page with the new fonts in place.

So I made the thing I wanted: one build, then unlimited free exploration on my actual app. I built it for my own Lovable workflow, and because it follows the open Agent Skills standard, it also runs in Claude Code, Cursor, Codex, and other agents that support skills.

## What you get

- **A panel over your real app.** Click between pages while you tweak. Minimize it to a small pill, or move it to the other side so it never hides what you're judging. Close it and your app goes back to normal.
- **Vibes, not guesswork.** Pick a vibe like Warm & Earthy or Techy & Modern, or tap Mix to shuffle one theme from each of five vibes. 40 themes ship with the skill, but you only see a handful at a time, so no two apps start from the same five.
- **Gradients where they make sense.** Gradient-ready themes let you choose Solid or Gradient for the key color.
- **Light or dark, for any theme.** Flip modes and Style Sandbox builds the matching version of the theme, still passing AA.
- **Font pairings with personality.** Editorial, Technical, Expressive, and more, each shown in your real headline. Or mix your own heading, body, and emphasis fonts.
- **Sliders and switches for the rest.** Corner radius, depth, shadow softness, heading tracking, Compact / Cozy / Roomy density, paper grain, and Hide decorations for mascots and illustrations.
- **AA accessibility built in.** Every look is checked live, with a one-tap fix. A look can't be copied until it meets WCAG AA. Applying it adds AA-safe colors for alerts and errors and writes a `DESIGN.md`, so everything your AI builds afterward stays accessible.
- **Saved looks.** Save a few and tap between them to compare on the same page.
- **Bring your own theme.** Paste CSS from tweakcn, shadcn themes, or any theme generator.
- **Share a look.** Send a link that opens the panel with your look already applied.
- **Copy as prompt, or copy the CSS for free.** The CSS is exactly what you previewed.
- **Safe by default.** The panel only opens on preview and local addresses, never on your published site.

## Low-credit install

The panel's code ships inside the skill, so your AI builder copies it in and fills out one config file instead of writing a playground from scratch. Install costs are one-time. After that, exploring costs nothing because it all runs in your browser.

<!-- After testing, add: "Installs in about X Lovable credits." -->

## Install

Download or clone this repo. The skill is the `style-sandbox` folder.

### Lovable
Open your workspace settings, go to **Skills**, choose **Add**, and import from GitHub with this repo's URL, or upload the `style-sandbox` folder as a ZIP. Then type `/style-sandbox` in any project. When it's done, add `?style-sandbox` to your preview URL to open the panel.

### Claude Code
```bash
git clone https://github.com/leahsass/style-sandbox.git
mkdir -p ~/.claude/skills
cp -r style-sandbox/style-sandbox ~/.claude/skills/
```
Use it in any project by asking to explore styles, or type `/style-sandbox`.

### Cursor
```bash
git clone https://github.com/leahsass/style-sandbox.git
mkdir -p ~/.cursor/skills
cp -r style-sandbox/style-sandbox ~/.cursor/skills/
```

### Codex
```bash
git clone https://github.com/leahsass/style-sandbox.git
mkdir -p ~/.codex/skills
cp -r style-sandbox/style-sandbox ~/.codex/skills/
```

To install for a single project instead of globally, copy the folder into that project's `.claude/skills/`, `.cursor/skills/`, or `.codex/skills/` directory.

**No skills on your plan?** Use the paste-in prompt instead. It does the same install in one message.

## How it works

1. **Preflight.** Reads your project and changes nothing.
2. **Token prep.** Makes sure your key screens read their colors, fonts, corners, and shadows from CSS variables. Your app looks exactly the same afterward.
3. **Install.** Copies in the panel, fills in one config file with your current look, and mounts it in your app.
4. **Explore.** Add `?style-sandbox` to your preview URL. Everything from here runs in your browser, so it costs nothing.
5. **Apply.** When a look meets AA, copy it as a prompt and send it, or copy the CSS and paste it yourself.

Run it again later and it keeps the existing install instead of starting over.

## Works best with

React apps, especially React + Tailwind + shadcn/ui, the default for Lovable and most AI-built apps. React Router, TanStack Router, and Next.js are covered. See `style-sandbox/references/stack-notes.md`.

## Contributing

Ideas, bug reports, and new color themes or font pairings are welcome. Open an issue or a pull request.

## Support

Style Sandbox is free and always will be. If it saved you time or credits, you can [buy me a coffee](https://www.buymeacoffee.com/leahsass). It keeps me building the next one.

## Credits

Created by **Leah Sass** of 1x Designs.

## License

MIT. See [LICENSE](LICENSE).
