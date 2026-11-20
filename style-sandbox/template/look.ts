// Style Sandbox looks: the user's current pick, how it turns into CSS, sharing, export, and import.
// Do not edit per project.

import { bestText, derive, hexToHslTriplet, toHsl, toMode, washOf, type Colors, type KeyColors } from "./color";
import { SANDBOX_CONFIG, type TokenFormat } from "./config";
import { THEMES } from "./themes";

export const RADIUS_FULL = 28;
export const DEPTH_LABELS = ["Flat", "Low", "Raised", "High", "Floating"];
export const DENSITY = { compact: 0.85, cozy: 1, roomy: 1.18 } as const;
export type Density = keyof typeof DENSITY;

export type Look = {
  v: 1;
  name: string;
  themeId: string; // a theme id, "current", "custom", or "imported"
  colors: KeyColors; // the theme's own colors, in its native mode
  gradient: boolean;
  mode: "auto" | "light" | "dark"; // auto keeps the theme's native mode
  fonts: { heading: string; body: string; accent: string | null };
  tracking: number; // heading letter spacing in em, -0.06 to 0.1
  radius: number; // 0 to RADIUS_FULL (RADIUS_FULL means fully round buttons and pills)
  depth: number; // 0 to 4
  softness: number; // 0 (hard edge) to 100 (diffused)
  density: Density;
};

const findTheme = (id: string) => THEMES.find((t) => t.id === id) ?? SANDBOX_CONFIG.extraThemes.find((t) => t.id === id);

export const currentLook = (): Look => ({
  v: 1,
  name: "Current",
  themeId: "current",
  colors: { ...SANDBOX_CONFIG.current.colors },
  gradient: false,
  mode: "auto",
  fonts: { ...SANDBOX_CONFIG.current.fonts },
  tracking: SANDBOX_CONFIG.current.tracking,
  radius: SANDBOX_CONFIG.current.radius,
  depth: SANDBOX_CONFIG.current.depth,
  softness: SANDBOX_CONFIG.current.softness,
  density: "cozy",
});

/** The colors actually shown: the theme's colors, converted to light or dark if asked. */
export const effectiveColors = (l: Look): KeyColors => (l.mode === "auto" ? l.colors : toMode(l.colors, l.mode));

export const themeName = (l: Look) =>
  l.themeId === "current" ? "Current" : l.themeId === "custom" ? "Custom" : l.themeId === "imported" ? "Imported" : findTheme(l.themeId)?.name ?? "Custom";

export const lookName = (l: Look) => `${themeName(l)}${l.gradient ? " gradient" : ""}${l.mode !== "auto" ? ` (${l.mode})` : ""} + ${l.fonts.heading}`;

export function radiusLabel(r: number) {
  if (r >= RADIUS_FULL) return "Full";
  if (r === 0) return "Sharp";
  return `${r}px`;
}

export function radii(r: number) {
  const full = r >= RADIUS_FULL;
  return { card: `${Math.min(r, 24)}px`, button: full ? "9999px" : `${r}px` };
}

const OFFSETS = [0, 2, 4, 8, 14];

/** Card and raised shadows from depth and softness. Softness 0 is a hard offset edge. */
export function shadows(depth: number, softness: number, colors: KeyColors) {
  const s = Math.max(0, Math.min(100, softness)) / 100;
  const dark = toHsl(colors.background)[2] < 0.25;
  const one = (d: number) => {
    const base = OFFSETS[Math.max(0, Math.min(4, d))] ?? 0;
    if (base === 0) return "none";
    // Hard edges read heavier, so they use shorter offsets than soft shadows at the same depth.
    const y = Math.max(1, Math.round(base * (0.45 + 0.55 * s)));
    const x = Math.round(y * (1 - s));
    const blur = Math.round(y * 3 * s);
    const spread = s > 0.6 ? -Math.round(y * 0.25) : 0;
    const color = s < 0.15 ? colors.foreground : dark ? `rgb(0 0 0 / ${(0.75 - 0.25 * s).toFixed(2)})` : `rgb(0 0 0 / ${(0.3 - 0.18 * s).toFixed(2)})`;
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  };
  return { card: one(depth), raised: one(Math.min(4, depth + 1)) };
}

export const primaryFill = (l: Look, c: KeyColors = effectiveColors(l)) =>
  l.gradient && c.gradientEnd ? `linear-gradient(135deg, ${c.primary}, ${c.gradientEnd})` : c.primary;

export const fontStack = (name: string, fallback: "serif" | "sans-serif" = "sans-serif") => `"${name}", system-ui, ${fallback}`;

function colorValue(hex: string, format: TokenFormat) {
  if (format === "hex") return hex;
  const t = hexToHslTriplet(hex);
  return format === "hsl" ? `hsl(${t})` : t;
}

function spacingValue(density: Density) {
  const m = /^([\d.]+)(\w*)$/.exec(SANDBOX_CONFIG.current.spacing.trim());
  if (!m) return SANDBOX_CONFIG.current.spacing;
  const n = parseFloat(m[1] ?? "0") * DENSITY[density];
  return `${Number(n.toFixed(4))}${m[2] ?? ""}`;
}

/** Every token the look writes, keyed by the app's own variable names. */
export function tokenValues(l: Look, cfg = SANDBOX_CONFIG): [string, string][] {
  const k = effectiveColors(l);
  const c: Colors = derive(k);
  const r = radii(l.radius);
  const sh = shadows(l.depth, l.softness, k);
  const colorTokens: Record<string, string> = {
    background: c.background, foreground: c.foreground, card: c.card, cardForeground: c.foreground,
    popover: c.card, popoverForeground: c.foreground, primary: c.primary, primaryForeground: c.primaryForeground,
    secondary: c.secondary, secondaryForeground: c.secondaryForeground, muted: c.muted, mutedForeground: c.mutedForeground,
    accent: c.accent, accentForeground: c.accentForeground, border: c.border, input: c.border, ring: c.link,
  };
  const plainTokens: Record<string, string> = {
    link: c.link, primaryFill: primaryFill(l, k), radius: r.card, radiusButton: r.button,
    shadowCard: sh.card, shadowRaised: sh.raised,
    fontHeading: fontStack(l.fonts.heading, "serif"), fontBody: fontStack(l.fonts.body),
    fontAccent: fontStack(l.fonts.accent ?? l.fonts.heading, "serif"), headingTracking: `${l.tracking}em`,
    spacing: spacingValue(l.density),
  };
  const out: [string, string][] = [];
  for (const [key, value] of Object.entries(colorTokens)) {
    const name = cfg.tokens[key];
    if (name) out.push([name, colorValue(value, cfg.tokenFormat)]);
  }
  for (const [key, value] of Object.entries(plainTokens)) {
    const name = cfg.tokens[key];
    if (name) out.push([name, value]);
  }
  return out;
}

/**
 * Many apps hard-code corners with Tailwind classes (rounded-xl, rounded-2xl...) that ignore --radius.
 * These rules tie every radius class except rounded-full to the look's corner radius, keeping the
 * app's relative sizes (an xl card stays rounder than an md input). Buttons follow the button radius.
 * Turn off with `tailwindRadius: false` in config.ts for projects without Tailwind.
 */
const RADIUS_SCALE: [string, number][] = [["rounded-sm", 0.5], ["rounded", 0.75], ["rounded-md", 0.75], ["rounded-lg", 1], ["rounded-xl", 1.5], ["rounded-2xl", 2], ["rounded-3xl", 3]];
const tailwindOn = (cfg: typeof SANDBOX_CONFIG) => {
  const c = cfg as { tailwindClasses?: boolean; tailwindRadius?: boolean };
  return c.tailwindClasses !== false && c.tailwindRadius !== false;
};
const radiusRules = (important: boolean, cfg = SANDBOX_CONFIG) => {
  const r = cfg.tokens["radius"], rb = cfg.tokens["radiusButton"];
  if (!r || !tailwindOn(cfg)) return "";
  const imp = important ? " !important" : "";
  const cards = RADIUS_SCALE.map(([c, m]) => `.${c} { border-radius: min(calc(var(${r}) * ${m}), 40px)${imp}; }`);
  // Elements token prep marked as buttons win even over rounded-full, which shadcn button variants often add.
  const marked = [`[class~="rounded-button"]`, `[class*="rounded-[var(${rb})]"]`].flatMap((m) => [m, `${m}.rounded-full`]).join(", ");
  const buttons = rb ? [`${RADIUS_SCALE.map(([c]) => `button.${c}, a.${c}[role="button"]`).join(", ")} { border-radius: var(${rb})${imp}; }`, `${marked} { border-radius: var(${rb}) !important; }`] : [];
  return [...cards, ...buttons].join("\n");
};

/**
 * Cards often get their depth from Tailwind shadow classes (shadcn cards use shadow-sm). These rules
 * route those classes, and anything with bg-card, through the Depth and Softness sliders.
 * Larger shadows (xl, 2xl) and hover shadows use the raised level, so overlays stay above cards.
 */
const shadowRules = (important: boolean, cfg = SANDBOX_CONFIG) => {
  const card = cfg.tokens["shadowCard"], raised = cfg.tokens["shadowRaised"];
  if (!card || !raised || !tailwindOn(cfg)) return "";
  const imp = important ? " !important" : "";
  return [
    `.shadow-sm, .shadow, .shadow-md, .shadow-lg, .bg-card { box-shadow: var(${card})${imp}; }`,
    `.shadow-xl, .shadow-2xl, .hover\\:shadow-md:hover, .hover\\:shadow-lg:hover, .hover\\:shadow-xl:hover { box-shadow: var(${raised})${imp}; }`,
  ].join("\n");
};

/**
 * Gradient themes put their signature gradient on primary buttons and a soft wash on the page.
 * Many apps paint buttons with Tailwind's flat bg-primary, so the gradient is laid over that too.
 */
const gradientRules = (l: Look, important: boolean, cfg = SANDBOX_CONFIG) => {
  const k = effectiveColors(l);
  if (!l.gradient || !k.gradientEnd) return "";
  const imp = important ? " !important" : "";
  const wash = `body { background-image: linear-gradient(160deg, ${k.background} 0%, ${washOf(k)} 100%)${imp}; background-attachment: fixed${imp}; }`;
  return [wash, tailwindOn(cfg) ? `.bg-primary { background-image: ${primaryFill(l, k)}${imp}; }` : ""].filter(Boolean).join("\n");
};

const typeRules = (cfg = SANDBOX_CONFIG) => {
  const h = cfg.tokens.fontHeading, b = cfg.tokens.fontBody, t = cfg.tokens.headingTracking;
  return [
    b ? `body { font-family: var(${b}); }` : "",
    h ? `h1, h2, h3, h4, h5, h6 { font-family: var(${h});${t ? ` letter-spacing: var(${t});` : ""} }` : "",
  ].filter(Boolean).join("\n");
};

/** CSS applied to the live app while the panel is open. Same values as the export, plus !important so it wins. */
export function previewCss(l: Look, hideDecorations: boolean, cfg = SANDBOX_CONFIG) {
  const vars = tokenValues(l, cfg).map(([k, v]) => `  ${k}: ${v} !important;`).join("\n");
  const decor = hideDecorations && cfg.decorations ? `\n${cfg.decorations} { display: none !important; }` : "";
  return `:root, :root.dark, .dark {\n${vars}\n}\n${typeRules(cfg)}\n${radiusRules(true, cfg)}\n${shadowRules(true, cfg)}\n${gradientRules(l, true, cfg)}${decor}`;
}

/** CSS the user pastes at the end of their global stylesheet. */
export function exportCss(l: Look, cfg = SANDBOX_CONFIG) {
  const vars = tokenValues(l, cfg).map(([k, v]) => `  ${k}: ${v};`).join("\n");
  const rr = [radiusRules(false, cfg), shadowRules(false, cfg), gradientRules(l, false, cfg)].filter(Boolean).join("\n");
  return `/* Style Sandbox: ${lookName(l)} */\n:root {\n${vars}\n}\n${typeRules(cfg)}${rr ? `\n${rr}` : ""}`;
}

/** JSON for Apply mode. */
export function lookJson(l: Look) {
  const k = effectiveColors(l);
  const sh = shadows(l.depth, l.softness, k);
  return {
    styleSandbox: "1.0",
    name: lookName(l),
    theme: themeName(l),
    mode: l.mode === "auto" ? (toHsl(k.background)[2] < 0.25 ? "dark" : "light") : l.mode,
    colors: derive(k),
    gradient: l.gradient && !!k.gradientEnd,
    fonts: l.fonts,
    headingTracking: `${l.tracking}em`,
    corners: { radius: l.radius >= RADIUS_FULL ? "full" : l.radius, ...radii(l.radius) },
    elevation: { depth: l.depth, softness: l.softness, card: sh.card, raised: sh.raised },
    density: SANDBOX_CONFIG.tokens.spacing ? { name: l.density, spacing: spacingValue(l.density) } : null,
  };
}

export const lookPrompt = (l: Look) =>
  `Apply this Style Sandbox look. Update only design tokens and fonts; do not change layout, copy, or components:\n\n${JSON.stringify(lookJson(l), null, 2)}`;

export function encodeLook(l: Look) {
  const json = JSON.stringify(l);
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeLook(s: string): Look | null {
  try {
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
    const j = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (ch) => ch.charCodeAt(0))));
    if (!j || j.v !== 1 || !j.colors?.background || !j.fonts?.heading) return null;
    return { ...currentLook(), ...j };
  } catch {
    return null;
  }
}

/** Convert any CSS color (hex, rgb, hsl, oklch, shadcn triplet) to hex using the browser. */
function toHex(value: string): string | null {
  let v = value.trim();
  if (/^-?[\d.]+(deg)?\s+[\d.]+%\s+[\d.]+%$/.test(v)) v = `hsl(${v})`;
  if (/^[\d.]+%?\s+[\d.]+\s+[\d.]+$/.test(v)) v = `oklch(${v})`;
  try {
    const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.fillStyle = "#010203";
    ctx.fillStyle = v;
    if (ctx.fillStyle === "#010203" && v.toLowerCase() !== "#010203") return null;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return "#" + [r, g, b].map((n) => (n ?? 0).toString(16).padStart(2, "0")).join("").toUpperCase();
  } catch {
    return null;
  }
}

/** Read a pasted theme. Takes the first (light) block, keeps current values for anything missing. */
export function parseImport(text: string, base: Look): { look: Look; summary: string } {
  const firstBlock = text.split("}")[0] ?? text;
  const vars = new Map<string, string>();
  for (const m of firstBlock.matchAll(/(--[\w-]+)\s*:\s*([^;]+);?/g)) vars.set((m[1] ?? "").replace(/^--color-/, "--"), (m[2] ?? "").trim());
  const color = (...names: string[]) => { for (const n of names) { const v = vars.get(n); const h = v ? toHex(v) : null; if (h) return h; } return null; };
  const font = (...names: string[]) => { for (const n of names) { const v = vars.get(n); if (v) return (v.split(",")[0] ?? "").replace(/["']/g, "").trim(); } return null; };
  const got: string[] = [];
  const pick = (v: string | null, label: string, fallback: string) => { if (v) got.push(label); return v ?? fallback; };
  const primary = pick(color("--primary", "--brand"), "primary", base.colors.primary);
  const colors: KeyColors = {
    background: pick(color("--background", "--bg"), "background", base.colors.background),
    foreground: pick(color("--foreground", "--text"), "text", base.colors.foreground),
    primary,
    primaryForeground: color("--primary-foreground") ?? bestText(primary),
    accent: pick(color("--accent"), "accent", base.colors.accent),
  };
  const heading = font("--font-heading", "--font-display", "--font-serif");
  const body = font("--font-body", "--font-sans");
  if (heading || body) got.push("fonts");
  let radius = base.radius;
  const r = vars.get("--radius");
  if (r) { const n = parseFloat(r); radius = Math.round(r.includes("rem") ? n * 16 : n); got.push("corners"); }
  const look: Look = { ...base, themeId: "imported", colors, gradient: false, mode: "auto", fonts: { ...base.fonts, heading: heading ?? body ?? base.fonts.heading, body: body ?? heading ?? base.fonts.body }, radius: Math.min(radius, RADIUS_FULL) };
  const summary = got.length ? `Imported ${got.join(", ")}. Everything else kept from your app.` : "Nothing recognizable found. Paste CSS variables like --background: #fff;";
  return { look: { ...look, name: lookName(look) }, summary };
}
