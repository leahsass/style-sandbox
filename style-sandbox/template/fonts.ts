// Style Sandbox fonts. All free on Google Fonts. Heading, body, and accent fonts are chosen
// independently; suggested pairings are shortcuts. Each font is tagged with the vibes it suits,
// so picking a vibe surfaces fitting fonts first. Do not edit per project.

export type FontOption = { name: string; vibes: string[] };
export type FontPair = { label: string; heading: string; body: string; vibes: string[] };

export const HEADING_FONTS: FontOption[] = [
  { name: "Young Serif", vibes: ["warm-earthy"] },
  { name: "Fraunces", vibes: ["warm-earthy"] },
  { name: "Lora", vibes: ["warm-earthy"] },
  { name: "Gelasio", vibes: ["warm-earthy"] },
  { name: "Plus Jakarta Sans", vibes: ["fresh-clean"] },
  { name: "Outfit", vibes: ["fresh-clean"] },
  { name: "DM Sans", vibes: ["fresh-clean"] },
  { name: "Figtree", vibes: ["fresh-clean"] },
  { name: "Bricolage Grotesque", vibes: ["bold-playful"] },
  { name: "Archivo Black", vibes: ["bold-playful"] },
  { name: "Fredoka", vibes: ["bold-playful"] },
  { name: "Unbounded", vibes: ["bold-playful"] },
  { name: "Syne", vibes: ["dark-moody"] },
  { name: "Bodoni Moda", vibes: ["dark-moody"] },
  { name: "Instrument Serif", vibes: ["dark-moody"] },
  { name: "Manrope", vibes: ["dark-moody"] },
  { name: "Playfair Display", vibes: ["romantic-soft"] },
  { name: "Cormorant Garamond", vibes: ["romantic-soft"] },
  { name: "Gilda Display", vibes: ["romantic-soft"] },
  { name: "Italiana", vibes: ["romantic-soft"] },
  { name: "DM Serif Display", vibes: ["classic-editorial"] },
  { name: "Newsreader", vibes: ["classic-editorial"] },
  { name: "Libre Baskerville", vibes: ["classic-editorial"] },
  { name: "Source Serif 4", vibes: ["classic-editorial"] },
  { name: "Space Grotesk", vibes: ["techy-modern"] },
  { name: "Geist", vibes: ["techy-modern"] },
  { name: "IBM Plex Sans", vibes: ["techy-modern"] },
  { name: "Sora", vibes: ["techy-modern"] },
  { name: "Abril Fatface", vibes: ["retro-vintage"] },
  { name: "Shrikhand", vibes: ["retro-vintage"] },
  { name: "Alfa Slab One", vibes: ["retro-vintage"] },
  { name: "Righteous", vibes: ["retro-vintage"] },
];

export const BODY_FONTS: FontOption[] = [
  { name: "Work Sans", vibes: ["warm-earthy"] },
  { name: "Karla", vibes: ["warm-earthy", "retro-vintage"] },
  { name: "Figtree", vibes: ["warm-earthy", "fresh-clean"] },
  { name: "Inter", vibes: ["fresh-clean", "techy-modern", "dark-moody"] },
  { name: "DM Sans", vibes: ["fresh-clean"] },
  { name: "Nunito", vibes: ["bold-playful"] },
  { name: "Rubik", vibes: ["bold-playful", "retro-vintage"] },
  { name: "Archivo", vibes: ["bold-playful"] },
  { name: "Manrope", vibes: ["dark-moody"] },
  { name: "Inter Tight", vibes: ["dark-moody"] },
  { name: "Source Sans 3", vibes: ["romantic-soft", "classic-editorial"] },
  { name: "Proza Libre", vibes: ["romantic-soft"] },
  { name: "Raleway", vibes: ["romantic-soft"] },
  { name: "Lato", vibes: ["classic-editorial", "retro-vintage"] },
  { name: "IBM Plex Sans", vibes: ["techy-modern"] },
  { name: "Geist", vibes: ["techy-modern"] },
];

/** Display serifs with real italics, for apps that use an emphasis font. */
export const ACCENT_FONTS: FontOption[] = [
  { name: "Instrument Serif", vibes: [] },
  { name: "Playfair Display", vibes: [] },
  { name: "Cormorant Garamond", vibes: [] },
  { name: "Fraunces", vibes: [] },
  { name: "DM Serif Display", vibes: [] },
];

/** Three pairings per vibe, each made for that vibe only, so themes and fonts feel like they belong together. */
export const FONT_PAIRS: FontPair[] = [
  { label: "Warm", heading: "Young Serif", body: "Work Sans", vibes: ["warm-earthy"] },
  { label: "Crafted", heading: "Fraunces", body: "Figtree", vibes: ["warm-earthy"] },
  { label: "Homey", heading: "Lora", body: "Karla", vibes: ["warm-earthy"] },
  { label: "Friendly", heading: "Plus Jakarta Sans", body: "Plus Jakarta Sans", vibes: ["fresh-clean"] },
  { label: "Airy", heading: "Outfit", body: "Inter", vibes: ["fresh-clean"] },
  { label: "Clean", heading: "DM Sans", body: "DM Sans", vibes: ["fresh-clean"] },
  { label: "Expressive", heading: "Bricolage Grotesque", body: "Nunito", vibes: ["bold-playful"] },
  { label: "Punchy", heading: "Archivo Black", body: "Archivo", vibes: ["bold-playful"] },
  { label: "Playful", heading: "Fredoka", body: "Rubik", vibes: ["bold-playful"] },
  { label: "Avant-garde", heading: "Syne", body: "Inter", vibes: ["dark-moody"] },
  { label: "Cinematic", heading: "Bodoni Moda", body: "Manrope", vibes: ["dark-moody"] },
  { label: "Noir", heading: "Instrument Serif", body: "Inter Tight", vibes: ["dark-moody"] },
  { label: "Romantic", heading: "Playfair Display", body: "Source Sans 3", vibes: ["romantic-soft"] },
  { label: "Elegant", heading: "Cormorant Garamond", body: "Proza Libre", vibes: ["romantic-soft"] },
  { label: "Dreamy", heading: "Gilda Display", body: "Raleway", vibes: ["romantic-soft"] },
  { label: "Classic", heading: "DM Serif Display", body: "Lato", vibes: ["classic-editorial"] },
  { label: "Editorial", heading: "Newsreader", body: "Source Sans 3", vibes: ["classic-editorial"] },
  { label: "Bookish", heading: "Libre Baskerville", body: "Lato", vibes: ["classic-editorial"] },
  { label: "Technical", heading: "Space Grotesk", body: "Inter", vibes: ["techy-modern"] },
  { label: "Precise", heading: "Geist", body: "Geist", vibes: ["techy-modern"] },
  { label: "Industrial", heading: "IBM Plex Sans", body: "IBM Plex Sans", vibes: ["techy-modern"] },
  { label: "Retro", heading: "Abril Fatface", body: "Lato", vibes: ["retro-vintage"] },
  { label: "Groovy", heading: "Shrikhand", body: "Karla", vibes: ["retro-vintage"] },
  { label: "Diner", heading: "Alfa Slab One", body: "Rubik", vibes: ["retro-vintage"] },
];

/** Only the options made for a vibe. */
export const forVibe = <T extends { vibes: string[] }>(list: T[], vibe: string): T[] => list.filter((f) => f.vibes.includes(vibe));

/** One pairing from each of several vibes, for when no vibe is chosen yet (the app's current look or a custom theme). */
export function pairsSampler(count = 5): FontPair[] {
  const vibes = [...new Set(FONT_PAIRS.flatMap((p) => p.vibes))].sort(() => Math.random() - 0.5).slice(0, count);
  return vibes.map((v) => {
    const pool = forVibe(FONT_PAIRS, v);
    return pool[Math.floor(Math.random() * pool.length)] as FontPair;
  });
}

/** Options that suit a vibe first, then the rest. "mix" shuffles. */
export function byVibe<T extends { vibes: string[] }>(list: T[], vibe: string): T[] {
  if (vibe === "mix") return [...list].sort(() => Math.random() - 0.5);
  const fit = list.filter((f) => f.vibes.includes(vibe));
  return [...fit, ...list.filter((f) => !fit.includes(f))];
}

// Google Fonts rejects a request for weights or italics a family doesn't have, so each family
// asks only for what it ships. Anything not listed gets regular and bold.
const AXES: Record<string, string> = {
  "DM Serif Display": ":ital@0;1",
  "Instrument Serif": ":ital@0;1",
  "Abril Fatface": "",
  "Archivo Black": "",
  "Young Serif": "",
  "Gilda Display": "",
  "Italiana": "",
  "Shrikhand": "",
  "Alfa Slab One": "",
  "Righteous": "",
  "Playfair Display": ":ital,wght@0,400;0,700;1,400",
  "Cormorant Garamond": ":ital,wght@0,400;0,700;1,400",
  "Fraunces": ":ital,wght@0,400;0,700;1,400",
};

/** One URL per family, so an unknown or misspelled family never blocks the others. */
export const fontUrls = (families: string[]) =>
  [...new Set(families.map((f) => f.trim()).filter(Boolean))].map(
    (f) => `https://fonts.googleapis.com/css2?family=${f.replace(/ /g, "+")}${AXES[f] ?? ":wght@400;700"}&display=swap`,
  );

/** Add font links to a document once each. */
export function loadFonts(doc: Document, families: string[]) {
  for (const href of fontUrls(families)) {
    const exists = Array.from(doc.querySelectorAll<HTMLLinkElement>("link[data-ss-font]")).some((l) => l.href === href);
    if (exists) continue;
    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.ssFont = "1";
    doc.head.appendChild(link);
  }
}
