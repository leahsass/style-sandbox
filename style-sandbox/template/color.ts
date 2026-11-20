// Style Sandbox color math: WCAG 2.2 contrast, derived colors, AA checks, and Fix.
// Do not edit per project.

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h.slice(0, 6), 16) || 0;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const rgbToHex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();

const channel = (c: number) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };

export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a: string, b: string) {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function mix(a: string, b: string, t: number) {
  const p = hexToRgb(a), q = hexToRgb(b);
  return rgbToHex(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t);
}

export function toHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255) as [number, number, number];
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}

export function fromHsl(h: number, s: number, l: number) {
  const f = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) return rgbToHex(l * 255, l * 255, l * 255);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  return rgbToHex(f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255);
}

/** "222 47% 11%" style triplet used by shadcn/ui. */
export function hexToHslTriplet(hex: string) {
  const [h, s, l] = toHsl(hex);
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/** Black or white, whichever reads better on the given color. */
export const bestText = (bg: string) => (contrast("#FFFFFF", bg) >= contrast("#111111", bg) ? "#FFFFFF" : "#111111");

/** Step lightness 1% at a time (keeping hue and saturation) until `color` meets `min` against every color in `against`. */
export function adjustUntil(color: string, against: string[], min: number) {
  const ok = (c: string) => against.every((a) => contrast(c, a) >= min);
  if (ok(color)) return color;
  const [h, s, l] = toHsl(color);
  let best: string | null = null, bestSteps = Infinity;
  for (const dir of [1, -1]) {
    for (let i = 1; i <= 100; i++) {
      const nl = l + (dir * i) / 100;
      if (nl < 0 || nl > 1) break;
      const c = fromHsl(h, s, nl);
      if (ok(c)) { if (i < bestSteps) { best = c; bestSteps = i; } break; }
    }
  }
  return best ?? bestText(against[0] ?? "#FFFFFF");
}

/** The colors a look chooses directly. */
export type KeyColors = {
  background: string; foreground: string; primary: string; primaryForeground: string; accent: string; gradientEnd?: string;
};

/** Everything the app needs, derived from the key colors. Derived colors are built to pass AA. */
export type Colors = KeyColors & {
  secondary: string; secondaryForeground: string; muted: string; mutedForeground: string;
  accentForeground: string; border: string; link: string; card: string;
};

export function derive(k: KeyColors): Colors {
  const dark = luminance(k.background) < 0.2;
  const secondary = mix(k.background, k.foreground, dark ? 0.1 : 0.06);
  // Gradient themes also paint a soft wash behind content, so text colors must pass on it too.
  const surfaces = k.gradientEnd ? [k.background, washOf(k)] : [k.background];
  return {
    ...k,
    secondary,
    secondaryForeground: adjustUntil(k.foreground, [secondary], 4.5),
    muted: secondary,
    mutedForeground: adjustUntil(mix(k.foreground, k.background, 0.4), [...surfaces, secondary], 4.5),
    accentForeground: bestText(k.accent),
    border: adjustUntil(mix(k.background, k.foreground, 0.18), [k.background], 3),
    link: adjustUntil(k.primary, surfaces, 4.5),
    card: dark ? mix(k.background, k.foreground, 0.05) : k.background,
  };
}

/** The soft page wash gradient themes add behind content: the background tinted toward the gradient's end color. */
export const washOf = (k: KeyColors) => (k.gradientEnd ? mix(k.background, k.gradientEnd, luminance(k.background) < 0.2 ? 0.16 : 0.12) : k.background);

export type Check = { id: string; label: string; ratio: number; min: number; pass: boolean };

export function checks(c: Colors, gradient: boolean): Check[] {
  const stops = gradient && c.gradientEnd ? [c.primary, c.gradientEnd] : [c.primary];
  const onPrimary = Math.min(...stops.map((s) => contrast(c.primaryForeground, s)));
  const surfaces = gradient && c.gradientEnd ? [c.background, washOf(c)] : [c.background];
  const onSurface = (fg: string) => Math.min(...surfaces.map((s) => contrast(fg, s)));
  const rows: [string, string, number, number][] = [
    ["text", "Text on background", onSurface(c.foreground), 4.5],
    ["onPrimary", gradient ? "Text on gradient buttons" : "Text on primary buttons", onPrimary, 4.5],
    ["muted", "Muted text", onSurface(c.mutedForeground), 4.5],
    ["link", "Links", onSurface(c.link), 4.5],
    ["secondary", "Text on secondary", contrast(c.secondaryForeground, c.secondary), 4.5],
    ["border", "Borders", contrast(c.border, c.background), 3],
  ];
  return rows.map(([id, label, ratio, min]) => ({ id, label, ratio, min, pass: ratio >= min }));
}

/** Make every pair pass. Adjusts the color the user did not pick directly first. */
export function fix(c: Colors, gradient: boolean): { colors: Colors; changes: string[] } {
  const changes: string[] = [];
  let k: KeyColors = { background: c.background, foreground: c.foreground, primary: c.primary, primaryForeground: c.primaryForeground, accent: c.accent, gradientEnd: c.gradientEnd };
  const set = (key: keyof KeyColors, v: string, label: string) => {
    if (v !== k[key]) { changes.push(`${label}: ${k[key]} to ${v}`); k = { ...k, [key]: v }; }
  };
  set("foreground", adjustUntil(k.foreground, [k.background], 4.5), "Text");
  const stops = gradient && k.gradientEnd ? [k.primary, k.gradientEnd] : [k.primary];
  const label = adjustUntil(k.primaryForeground, stops, 4.5);
  if (stops.every((s) => contrast(label, s) >= 4.5)) set("primaryForeground", label, "Button text");
  else {
    set("primary", adjustUntil(k.primary, [k.primaryForeground], 4.5), "Primary");
    if (gradient && k.gradientEnd) set("gradientEnd", adjustUntil(k.gradientEnd, [k.primaryForeground], 4.5), "Gradient end");
  }
  return { colors: derive(k), changes };
}

export type Mode = "light" | "dark";
export const modeOf = (bg: string): Mode => (luminance(bg) < 0.2 ? "dark" : "light");

/**
 * The same theme in the other mode. Keeps the theme's hues, swaps light and dark, then runs Fix
 * so the result always passes AA. Returns the key colors unchanged if already in that mode.
 */
export function toMode(k: KeyColors, mode: Mode): KeyColors {
  if (modeOf(k.background) === mode) return k;
  const [bh, bs] = toHsl(k.background);
  const [fh, fs] = toHsl(k.foreground);
  const dark = mode === "dark";
  const background = fromHsl(bh, Math.min(bs, 0.25), dark ? 0.08 : 0.97);
  const foreground = fromHsl(fh, Math.min(fs, 0.2), dark ? 0.92 : 0.12);
  const primary = adjustUntil(k.primary, [background], 3);
  const shift = (c: string) => adjustUntil(c, [background], 3);
  const next: KeyColors = {
    background, foreground, primary, primaryForeground: bestText(primary),
    accent: shift(k.accent), gradientEnd: k.gradientEnd ? adjustUntil(k.gradientEnd, [background], 3) : undefined,
  };
  const fixed = fix(derive(next), !!next.gradientEnd).colors;
  return { background: fixed.background, foreground: fixed.foreground, primary: fixed.primary, primaryForeground: fixed.primaryForeground, accent: fixed.accent, gradientEnd: fixed.gradientEnd };
}
