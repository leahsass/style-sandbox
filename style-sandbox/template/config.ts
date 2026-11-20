// Style Sandbox project config. THIS IS THE ONLY TEMPLATE FILE THE AGENT EDITS.
// Fill in every value marked FILL from Phase 0 (preflight) and Phase 1 (token prep).

import type { KeyColors } from "./color";
import type { Theme } from "./themes";

export type TokenFormat =
  | "hex"          // --primary: #4453E0;
  | "hsl-triplet"  // --primary: 234 72% 57%;   (shadcn/ui default)
  | "hsl";         // --primary: hsl(234 72% 57%);

export const SANDBOX_CONFIG = {
  /** FILL: the app's name, shown on the Components sheet. */
  appName: "My App",

  /** FILL: the app's real main headline and one real line of body copy, used for font samples. */
  headline: "Your real headline here",
  body: "One real line of body copy from the app.",

  /**
   * Where the panel may open. It opens only when the URL contains ?style-sandbox AND the host
   * matches one of these. Defaults cover local dev and Lovable previews, never published sites.
   */
  hosts: ["localhost", "127.0.0.1", "preview--", "id-preview--", "lovableproject.com"],

  /** FILL: how the global stylesheet writes color values. */
  tokenFormat: "hsl-triplet" as TokenFormat,

  /**
   * FILL: the CSS variable names the app uses. Defaults match shadcn/ui.
   * Set a name to null if the app has no such token.
   */
  tokens: {
    background: "--background",
    foreground: "--foreground",
    card: "--card",
    cardForeground: "--card-foreground",
    popover: "--popover",
    popoverForeground: "--popover-foreground",
    primary: "--primary",
    primaryForeground: "--primary-foreground",
    secondary: "--secondary",
    secondaryForeground: "--secondary-foreground",
    muted: "--muted",
    mutedForeground: "--muted-foreground",
    accent: "--accent",
    accentForeground: "--accent-foreground",
    border: "--border",
    input: "--input",
    ring: "--ring",
    // Added by token prep if missing. Always written as plain CSS values (not triplets).
    link: "--link",
    primaryFill: "--primary-fill",
    radius: "--radius",
    radiusButton: "--radius-button",
    shadowCard: "--shadow-card",
    shadowRaised: "--shadow-raised",
    fontHeading: "--font-heading",
    fontBody: "--font-body",
    /** Only if the app uses a separate emphasis font (for example an italic serif). Otherwise null. */
    fontAccent: null,
    headingTracking: "--heading-tracking",
    /** Spacing base for Density. Tailwind v4 projects use "--spacing". Set to null if spacing isn't tokenized. */
    spacing: null,
  } as Record<string, string | null>,

  /** Ties Tailwind rounded-* and shadow-* classes to the Corners and Depth sliders. Set false if the project doesn't use Tailwind. */
  tailwindClasses: true,

  /** FILL: CSS selector for decorative art (illustrations, mascots, background shapes) that "Hide decorations" hides. Use "" if none. */
  decorations: "[data-decor]",

  /**
   * OPTIONAL: themes extracted from a link or screenshot the user gave at setup. Leave empty otherwise.
   * Use vibe "custom". Each must pass AA (text on background, text on primary).
   */
  extraThemes: [] as Theme[],

  /** FILL: the app's current look, so "Current" is always the first option. */
  current: {
    colors: {
      background: "#FFFFFF",
      foreground: "#111111",
      primary: "#111111",
      primaryForeground: "#FFFFFF",
      accent: "#E5E7EB",
    } as KeyColors,
    /** accent: the emphasis font if the app has one, otherwise null. */
    fonts: { heading: "Inter", body: "Inter", accent: null as string | null },
    /** Heading letter spacing in em, for example -0.02. */
    tracking: 0,
    /** Corner radius in px. */
    radius: 8,
    /** Elevation depth 0 (flat) to 4 (floating), and softness 0 (hard edge) to 100 (diffused). */
    depth: 1,
    softness: 70,
    /** The spacing token's current value, if spacing is tokenized (for example "0.25rem"). */
    spacing: "0.25rem",
  },
};
