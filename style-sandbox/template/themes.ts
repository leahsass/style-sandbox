// Style Sandbox built-in themes. 40 themes in 8 vibes. Every theme passes WCAG AA
// for text on background and text on primary (both gradient stops where offered).
// Do not edit per project. Projects add their own themes through Import CSS.

export type Vibe = { id: string; label: string };
export type Theme = {
  id: string; vibe: string; name: string; description: string;
  background: string; foreground: string; primary: string; primaryForeground: string; accent: string;
  /** Present only on themes that support a gradient key color. */
  gradientEnd?: string;
};

export const VIBES: Vibe[] = [
  { id: "warm-earthy", label: "Warm & Earthy" },
  { id: "fresh-clean", label: "Fresh & Clean" },
  { id: "bold-playful", label: "Bold & Playful" },
  { id: "dark-moody", label: "Dark & Moody" },
  { id: "romantic-soft", label: "Romantic & Soft" },
  { id: "classic-editorial", label: "Classic & Editorial" },
  { id: "techy-modern", label: "Techy & Modern" },
  { id: "retro-vintage", label: "Retro & Vintage" },
];

export const THEMES: Theme[] = [
  { id: "terracotta-table", vibe: "warm-earthy", name: "Terracotta Table", description: "Oat, terracotta, olive.", background: "#F6EFE6", foreground: "#2B2118", primary: "#B4532A", primaryForeground: "#FFFFFF", accent: "#6E7B4F" },
  { id: "desert-sage", vibe: "warm-earthy", name: "Desert Sage", description: "Sand, sage, baked clay.", background: "#F3F0E8", foreground: "#2A2E26", primary: "#5E6B4E", primaryForeground: "#FFFFFF", accent: "#C98B5B" },
  { id: "olive-grove", vibe: "warm-earthy", name: "Olive Grove", description: "Stone, olive, honey.", background: "#F4F2EA", foreground: "#26291F", primary: "#556B2F", primaryForeground: "#FFFFFF", accent: "#D4A24C" },
  { id: "clay-linen", vibe: "warm-earthy", name: "Clay & Linen", description: "Linen, rust, warm taupe.", background: "#F8F3EC", foreground: "#3A2A22", primary: "#8C4A32", primaryForeground: "#FFFFFF", accent: "#C9B79C", gradientEnd: "#A85A2E" },
  { id: "harvest-gold", vibe: "warm-earthy", name: "Harvest Gold", description: "Cream, marigold, brick.", background: "#FBF6EA", foreground: "#2E2416", primary: "#E0A526", primaryForeground: "#2E2416", accent: "#8B3A2E", gradientEnd: "#D9772B" },
  { id: "morning-mint", vibe: "fresh-clean", name: "Morning Mint", description: "Cool white, deep mint, pale jade.", background: "#F6FBF9", foreground: "#10241F", primary: "#0F7B63", primaryForeground: "#FFFFFF", accent: "#BFE9DB", gradientEnd: "#13698C" },
  { id: "glacier", vibe: "fresh-clean", name: "Glacier", description: "Ice white, cobalt, sky.", background: "#F5F8FB", foreground: "#0F1B2A", primary: "#1F5FAF", primaryForeground: "#FFFFFF", accent: "#A7D3F5", gradientEnd: "#3A45C8" },
  { id: "linen-white", vibe: "fresh-clean", name: "Linen White", description: "Pure white, charcoal, oat.", background: "#FFFFFF", foreground: "#1C1C1C", primary: "#2F2F2F", primaryForeground: "#FFFFFF", accent: "#E9E4DA" },
  { id: "seafoam", vibe: "fresh-clean", name: "Seafoam", description: "Sea glass, deep teal, coral.", background: "#F2FAF9", foreground: "#0E2A2A", primary: "#0E7C7B", primaryForeground: "#FFFFFF", accent: "#FFB997" },
  { id: "clinic-clean", vibe: "fresh-clean", name: "Clinic Clean", description: "Pure white, deep teal, pale aqua.", background: "#FFFFFF", foreground: "#0F172A", primary: "#0F766E", primaryForeground: "#FFFFFF", accent: "#E0F2F1" },
  { id: "bold-block", vibe: "bold-playful", name: "Bold Block", description: "Cream, safety orange, electric blue.", background: "#FFF8E7", foreground: "#111111", primary: "#FF5A1F", primaryForeground: "#111111", accent: "#2D5BFF", gradientEnd: "#FF8A00" },
  { id: "citrus-pop", vibe: "bold-playful", name: "Citrus Pop", description: "Lemon cream, sunflower, hot pink.", background: "#FFFBEA", foreground: "#1A1A1A", primary: "#FFC93C", primaryForeground: "#1A1A1A", accent: "#FF4F79", gradientEnd: "#FF8A3C" },
  { id: "bubblegum", vibe: "bold-playful", name: "Bubblegum", description: "Pink white, magenta, sky.", background: "#FFF5F9", foreground: "#2A1030", primary: "#C21F63", primaryForeground: "#FFFFFF", accent: "#4FC3F7", gradientEnd: "#8E24AA" },
  { id: "electric-lime", vibe: "bold-playful", name: "Electric Lime", description: "Lime white, ultramarine, acid green.", background: "#F7FFE8", foreground: "#121212", primary: "#2B2BD9", primaryForeground: "#FFFFFF", accent: "#B6F23A", gradientEnd: "#7A2BD9" },
  { id: "arcade", vibe: "bold-playful", name: "Arcade", description: "Midnight purple, coin gold, hot pink.", background: "#1B1036", foreground: "#F5F3FF", primary: "#FFD23F", primaryForeground: "#1B1036", accent: "#FF4FD8", gradientEnd: "#FF9F1C" },
  { id: "night-shift", vibe: "dark-moody", name: "Night Shift", description: "Ink black, mint, soft violet.", background: "#0E1116", foreground: "#E6E8EB", primary: "#7CE7AC", primaryForeground: "#0E1116", accent: "#9C8CFF", gradientEnd: "#5CC8E8" },
  { id: "midnight-ink", vibe: "dark-moody", name: "Midnight Ink", description: "Navy black, apricot, steel blue.", background: "#0D1321", foreground: "#E8ECF4", primary: "#F0A868", primaryForeground: "#0D1321", accent: "#6C8EBF" },
  { id: "velvet-plum", vibe: "dark-moody", name: "Velvet Plum", description: "Plum black, orchid, gold.", background: "#1E1222", foreground: "#F3E9F5", primary: "#D98BE0", primaryForeground: "#1E1222", accent: "#E8B04A", gradientEnd: "#F28AB2" },
  { id: "charcoal-ember", vibe: "dark-moody", name: "Charcoal Ember", description: "Charcoal, ember orange, amber.", background: "#161616", foreground: "#EDEDED", primary: "#FF6B3D", primaryForeground: "#161616", accent: "#FFC857", gradientEnd: "#FF3D6E" },
  { id: "forest-night", vibe: "dark-moody", name: "Forest Night", description: "Pine black, moss, lantern gold.", background: "#0F1A14", foreground: "#E6EFE9", primary: "#7FD1A3", primaryForeground: "#0F1A14", accent: "#E3B23C" },
  { id: "garden-party", vibe: "romantic-soft", name: "Garden Party", description: "Blush white, raspberry, sage.", background: "#FBF7F4", foreground: "#3B2F2F", primary: "#A34A6B", primaryForeground: "#FFFFFF", accent: "#7A9E7E", gradientEnd: "#8A3D7A" },
  { id: "blush-letter", vibe: "romantic-soft", name: "Blush Letter", description: "Petal pink, rose, dusty peach.", background: "#FFF6F4", foreground: "#3A2328", primary: "#B5485D", primaryForeground: "#FFFFFF", accent: "#E8C1B5", gradientEnd: "#9C3D7A" },
  { id: "lavender-haze", vibe: "romantic-soft", name: "Lavender Haze", description: "Lilac white, violet, cotton candy.", background: "#F8F6FC", foreground: "#2A2340", primary: "#6B4FBB", primaryForeground: "#FFFFFF", accent: "#F2B8D0", gradientEnd: "#A445B0" },
  { id: "peach-silk", vibe: "romantic-soft", name: "Peach Silk", description: "Peach cream, burnt coral, apricot.", background: "#FFF7F0", foreground: "#3B2A22", primary: "#B8502F", primaryForeground: "#FFFFFF", accent: "#F6C9A8" },
  { id: "rosewater", vibe: "romantic-soft", name: "Rosewater", description: "Rose white, wine, mauve.", background: "#FDF7F7", foreground: "#33262B", primary: "#8E3B55", primaryForeground: "#FFFFFF", accent: "#C8A2C8" },
  { id: "paper-ink", vibe: "classic-editorial", name: "Paper & Ink", description: "Warm white, near black, coral.", background: "#FAFAF7", foreground: "#1A1A1A", primary: "#1A1A1A", primaryForeground: "#FFFFFF", accent: "#E85D3A" },
  { id: "newsprint", vibe: "classic-editorial", name: "Newsprint", description: "Newsprint, oxblood, brass.", background: "#F4F1EA", foreground: "#222222", primary: "#8B1E3F", primaryForeground: "#FFFFFF", accent: "#C9A227" },
  { id: "navy-brass", vibe: "classic-editorial", name: "Navy & Brass", description: "Ivory, navy, brass.", background: "#F7F5EF", foreground: "#14213D", primary: "#14213D", primaryForeground: "#FFFFFF", accent: "#B08D3C" },
  { id: "gallery-white", vibe: "classic-editorial", name: "Gallery White", description: "Bright white, black, signal red.", background: "#FFFFFF", foreground: "#111111", primary: "#111111", primaryForeground: "#FFFFFF", accent: "#D7263D" },
  { id: "library-green", vibe: "classic-editorial", name: "Library Green", description: "Parchment, bottle green, leather.", background: "#F5F1E8", foreground: "#1F2A24", primary: "#1F4D3A", primaryForeground: "#FFFFFF", accent: "#A8742F" },
  { id: "soft-cloud", vibe: "techy-modern", name: "Soft Cloud", description: "Cool white, periwinkle, sky.", background: "#F7F8FC", foreground: "#1E2235", primary: "#4453E0", primaryForeground: "#FFFFFF", accent: "#8FD3FF", gradientEnd: "#6D3FD8" },
  { id: "graphite", vibe: "techy-modern", name: "Graphite", description: "Fog gray, graphite, bright blue.", background: "#F4F5F7", foreground: "#111418", primary: "#111418", primaryForeground: "#FFFFFF", accent: "#3B82F6" },
  { id: "ultraviolet", vibe: "techy-modern", name: "Ultraviolet", description: "Void black, ultraviolet, aqua.", background: "#0B0B12", foreground: "#ECEBFF", primary: "#8B7CFF", primaryForeground: "#0B0B12", accent: "#3EE6C1", gradientEnd: "#3EB7FF" },
  { id: "signal-blue", vibe: "techy-modern", name: "Signal Blue", description: "White, signal blue, teal.", background: "#FFFFFF", foreground: "#0A1A2F", primary: "#0057FF", primaryForeground: "#FFFFFF", accent: "#00D1B2", gradientEnd: "#6A00FF" },
  { id: "terminal", vibe: "techy-modern", name: "Terminal", description: "Black, phosphor green, amber.", background: "#0C0F0A", foreground: "#D7F5C8", primary: "#39FF88", primaryForeground: "#0C0F0A", accent: "#F5D547" },
  { id: "diner", vibe: "retro-vintage", name: "Diner", description: "Vanilla, cherry red, turquoise.", background: "#FFF6E9", foreground: "#222222", primary: "#C62B28", primaryForeground: "#FFFFFF", accent: "#2BB3B1" },
  { id: "polaroid", vibe: "retro-vintage", name: "Polaroid", description: "Off white, faded blue, mustard.", background: "#FAF7F0", foreground: "#2B2B2B", primary: "#3D6B8C", primaryForeground: "#FFFFFF", accent: "#E8A33D" },
  { id: "seventies-sun", vibe: "retro-vintage", name: "Seventies Sun", description: "Wheat, burnt orange, gold.", background: "#FBF0DC", foreground: "#3A2414", primary: "#B94E1B", primaryForeground: "#FFFFFF", accent: "#E6A23C", gradientEnd: "#8F3A1A" },
  { id: "mod-teal", vibe: "retro-vintage", name: "Mod Teal", description: "Putty, mod teal, tangerine.", background: "#F2F0E6", foreground: "#1E2A2A", primary: "#1C6E6A", primaryForeground: "#FFFFFF", accent: "#E4572E" },
  { id: "vintage-botanical", vibe: "retro-vintage", name: "Vintage Botanical", description: "Archival paper, leaf green, dusty rose.", background: "#F4EFE4", foreground: "#2B2A22", primary: "#4F6B43", primaryForeground: "#FFFFFF", accent: "#C7807A" },
];

/** One random theme from each of `count` random vibes, so no two apps start with the same set. */
export function shuffleMix(count = 5): Theme[] {
  const vibes = [...VIBES].sort(() => Math.random() - 0.5).slice(0, count);
  return vibes.map((v) => {
    const pool = THEMES.filter((t) => t.vibe === v.id);
    return pool[Math.floor(Math.random() * pool.length)] as Theme;
  });
}

export const themesForVibe = (vibe: string) => THEMES.filter((t) => t.vibe === vibe);
