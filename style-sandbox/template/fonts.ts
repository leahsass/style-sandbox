// Style Sandbox fonts. All free on Google Fonts. Heading, body, and accent fonts are chosen
// independently; suggested pairings are shortcuts. Each font is tagged with the vibes it suits,
// so picking a vibe surfaces fitting fonts first. Do not edit per project.

export type FontOption = { name: string; vibes: string[] };
export type FontPair = { label: string; heading: string; body: string; vibes: string[] };

export const HEADING_FONTS: FontOption[] = [
  { name: "Fraunces", vibes: ["warm-earthy", "classic-editorial", "romantic-soft"] },
  { name: "Playfair Display", vibes: ["romantic-soft", "classic-editorial"] },
  { name: "DM Serif Display", vibes: ["classic-editorial", "warm-earthy"] },
  { name: "Cormorant Garamond", vibes: ["romantic-soft", "classic-editorial"] },
  { name: "Instrument Serif", vibes: ["classic-editorial", "dark-moody", "romantic-soft"] },
  { name: "Young Serif", vibes: ["warm-earthy", "retro-vintage", "fresh-clean"] },
  { name: "Abril Fatface", vibes: ["retro-vintage", "classic-editorial"] },
  { name: "Space Grotesk", vibes: ["techy-modern", "bold-playful"] },
  { name: "Bricolage Grotesque", vibes: ["bold-playful", "retro-vintage"] },
  { name: "Syne", vibes: ["dark-moody", "techy-modern"] },
  { name: "Archivo Black", vibes: ["bold-playful", "retro-vintage"] },
  { name: "Outfit", vibes: ["bold-playful", "fresh-clean"] },
  { name: "Plus Jakarta Sans", vibes: ["fresh-clean", "techy-modern"] },
  { name: "Manrope", vibes: ["fresh-clean", "techy-modern", "dark-moody"] },
];

export const BODY_FONTS: FontOption[] = [
  { name: "Inter", vibes: ["techy-modern", "fresh-clean", "classic-editorial"] },
  { name: "Manrope", vibes: ["fresh-clean", "techy-modern", "dark-moody"] },
  { name: "DM Sans", vibes: ["classic-editorial", "fresh-clean", "warm-earthy"] },
  { name: "IBM Plex Sans", vibes: ["techy-modern", "classic-editorial"] },
  { name: "Work Sans", vibes: ["warm-earthy", "romantic-soft"] },
  { name: "Source Sans 3", vibes: ["romantic-soft", "classic-editorial"] },
  { name: "Nunito Sans", vibes: ["bold-playful", "fresh-clean"] },
  { name: "Figtree", vibes: ["warm-earthy", "retro-vintage", "bold-playful"] },
  { name: "Lato", vibes: ["retro-vintage", "romantic-soft"] },
  { name: "Proza Libre", vibes: ["romantic-soft", "classic-editorial"] },
];

/** Display serifs with real italics, for apps that use an emphasis font. */
export const ACCENT_FONTS: FontOption[] = [
  { name: "Instrument Serif", vibes: [] },
  { name: "Playfair Display", vibes: [] },
  { name: "Cormorant Garamond", vibes: [] },
  { name: "Fraunces", vibes: [] },
  { name: "DM Serif Display", vibes: [] },
];

export const FONT_PAIRS: FontPair[] = [
  { label: "Editorial", heading: "Fraunces", body: "Inter", vibes: ["warm-earthy", "classic-editorial"] },
  { label: "Romantic", heading: "Playfair Display", body: "Source Sans 3", vibes: ["romantic-soft"] },
  { label: "Classic", heading: "DM Serif Display", body: "DM Sans", vibes: ["classic-editorial"] },
  { label: "Technical", heading: "Space Grotesk", body: "Inter", vibes: ["techy-modern"] },
  { label: "Friendly", heading: "Plus Jakarta Sans", body: "Plus Jakarta Sans", vibes: ["fresh-clean"] },
  { label: "Precise", heading: "Manrope", body: "Manrope", vibes: ["dark-moody", "fresh-clean"] },
  { label: "Elegant", heading: "Cormorant Garamond", body: "Proza Libre", vibes: ["romantic-soft"] },
  { label: "Expressive", heading: "Bricolage Grotesque", body: "Figtree", vibes: ["bold-playful"] },
  { label: "Avant-garde", heading: "Syne", body: "Inter", vibes: ["dark-moody"] },
  { label: "Warm", heading: "Young Serif", body: "Work Sans", vibes: ["warm-earthy"] },
  { label: "Retro", heading: "Abril Fatface", body: "Lato", vibes: ["retro-vintage"] },
  { label: "Industrial", heading: "Archivo Black", body: "IBM Plex Sans", vibes: ["bold-playful", "retro-vintage"] },
];

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
