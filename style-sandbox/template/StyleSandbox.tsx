"use client";
// Style Sandbox: a floating style panel over the live app. Live tweaks, zero credits.
// Created by Leah Sass (1x Designs). MIT license. https://github.com/leahsass/style-sandbox
// Do not edit per project. Project settings live in config.ts.
//
// Mount <StyleSandbox /> once in the app's root layout. It renders nothing unless the URL has
// ?style-sandbox and the host is a preview or local host (see config.hosts).

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { checks, derive, fix, type KeyColors } from "./color";
import { SANDBOX_CONFIG as CFG } from "./config";
import { ACCENT_FONTS, BODY_FONTS, FONT_PAIRS, HEADING_FONTS, byVibe, fontUrls, loadFonts } from "./fonts";
import {
  DEPTH_LABELS, RADIUS_FULL, currentLook, decodeLook, effectiveColors, encodeLook, exportCss, fontStack, lookName,
  lookPrompt, parseImport, previewCss, primaryFill, radii, radiusLabel, shadows, suggestGradientEnd, themeName,
  type Density, type Look,
} from "./look";
import { SANDBOX_CSS } from "./styles";
import { VIBES, shuffleMix, themesForVibe, type Theme } from "./themes";

const PARAM = "style-sandbox";
const OPEN_KEY = "style-sandbox-open";
const LOOK_KEY = "style-sandbox-look";
const SAVED_KEY = "style-sandbox-saved";
const STYLE_ID = "style-sandbox-preview";

const safe = <T,>(fn: () => T, fallback: T): T => { try { return fn(); } catch { return fallback; } };
const hostAllowed = () => typeof window !== "undefined" && CFG.hosts.some((h) => window.location.hostname.includes(h));
const wantsOpen = () =>
  hostAllowed() && (new URLSearchParams(window.location.search).has(PARAM) || safe(() => sessionStorage.getItem(OPEN_KEY) === "1", false));

const themeKeys = (t: Theme): KeyColors => ({
  background: t.background, foreground: t.foreground, primary: t.primary, primaryForeground: t.primaryForeground, accent: t.accent, gradientEnd: t.gradientEnd,
});
const allFonts = (l: Look) => [l.fonts.heading, l.fonts.body, l.fonts.accent ?? ""];

/** Stand-in components styled by the look, for judging buttons, links, pills, cards and small pieces together. */
function ComponentSheet({ look }: { look: Look }) {
  const k = effectiveColors(look);
  const c = derive(k);
  const r = radii(look.radius);
  const sh = shadows(look.depth, look.softness, k);
  const head: CSSProperties = { fontFamily: fontStack(look.fonts.heading, "serif"), letterSpacing: `${look.tracking}em`, margin: 0, color: c.foreground };
  const primary: CSSProperties = { background: primaryFill(look, k), color: c.primaryForeground, borderRadius: r.button, padding: "10px 18px", fontWeight: 700, border: 0, boxShadow: sh.card, cursor: "default" };
  const secondary: CSSProperties = { background: c.secondary, color: c.secondaryForeground, borderRadius: r.button, padding: "10px 18px", fontWeight: 600, border: `1px solid ${c.border}`, cursor: "default" };
  const hover: CSSProperties = { filter: "brightness(0.92)", boxShadow: sh.raised };
  const card = (d: number): CSSProperties => ({ background: c.card, border: `1px solid ${d === 0 ? c.border : "transparent"}`, borderRadius: r.card, padding: 18, boxShadow: shadows(d, look.softness, k).card, outline: d === look.depth ? `2px solid ${c.link}` : "none", outlineOffset: 3 });
  const h = (t: string) => <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: c.mutedForeground, margin: "26px 0 10px" }}>{t}</p>;
  return (
    <div className="ss-sheet" style={{ background: c.background, color: c.foreground, fontFamily: fontStack(look.fonts.body) }}>
      <nav style={{ display: "flex", alignItems: "center", gap: 20, paddingBottom: 14, borderBottom: `1px solid ${c.border}` }}>
        <strong style={head}>{CFG.appName}</strong>
        <span style={{ color: c.link, textDecoration: "underline", textUnderlineOffset: 3 }}>Home</span>
        <span>About</span><span>Contact</span>
        <span style={{ ...primary, marginLeft: "auto", boxShadow: "none" }}>Get started</span>
      </nav>
      <h1 style={{ ...head, fontSize: 38, lineHeight: 1.1, marginTop: 26 }}>{CFG.headline}</h1>
      <p style={{ fontSize: 16, color: c.mutedForeground, maxWidth: 560, marginTop: 8 }}>{CFG.body}</p>
      {h("Buttons and links, default and hover")}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <span style={primary}>Primary</span><span style={{ ...primary, ...hover }}>Primary</span>
        <span style={secondary}>Secondary</span><span style={{ ...secondary, ...hover }}>Secondary</span>
        <span style={{ color: c.link, fontWeight: 600 }}>View all →</span><span style={{ color: c.link, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>View all →</span>
      </div>
      {h("Pills and badges")}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ background: c.accent, color: c.accentForeground, borderRadius: r.button, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>New</span>
        <span style={{ border: `1px solid ${c.border}`, borderRadius: r.button, padding: "5px 12px", fontSize: 13 }}>Unselected</span>
        <span style={{ background: primaryFill(look, k), color: c.primaryForeground, borderRadius: r.button, padding: "5px 12px", fontSize: 13, fontWeight: 600 }}>Selected ✓</span>
      </div>
      {h("Cards at each depth (yours is outlined)")}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 18 }}>
        {[0, 1, 2, 3, 4].map((d) => (
          <div key={d} style={card(d)}>
            <p style={{ fontSize: 11, color: c.mutedForeground }}>{DEPTH_LABELS[d]}</p>
            <h3 style={{ ...head, fontSize: 18, marginTop: 4 }}>{CFG.appName}</h3>
            <p style={{ fontSize: 13, margin: "6px 0 12px" }}>{CFG.body}</p>
            <span style={{ ...primary, padding: "7px 14px", fontSize: 13, boxShadow: "none", display: "inline-block" }}>Open</span>
          </div>
        ))}
      </div>
      {h("Smaller pieces")}
      <div style={{ maxWidth: 480, fontSize: 13, fontWeight: 600 }}>Message
        <div style={{ marginTop: 6, padding: 10, minHeight: 70, background: c.background, color: c.mutedForeground, border: `1px solid ${c.border}`, borderRadius: r.card, fontWeight: 400 }}>Write something…</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: c.secondary, color: c.secondaryForeground, display: "grid", placeItems: "center", fontWeight: 700, border: `1px solid ${c.border}` }}>AB</span>
        <span style={{ fontSize: 13, color: c.mutedForeground }}>Avatar</span>
      </div>
      <hr style={{ border: 0, borderTop: `1px solid ${c.border}`, margin: "22px 0" }} />
      <p style={{ fontSize: 12, color: c.mutedForeground }}>Stand-in components. Close this to see the look on your real pages.</p>
    </div>
  );
}

function Section({ title, value, children }: { title: string; value?: string; children: ReactNode }) {
  return <section className="ss-section"><h2 className="ss-label">{title}{value && <span>{value}</span>}</h2>{children}</section>;
}

export function StyleSandbox() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [left, setLeft] = useState(false); // dock side, so the panel never hides the part of the page you're judging
  const [look, setLook] = useState<Look>(currentLook);
  const [hide, setHide] = useState(false);
  const [vibe, setVibe] = useState("mix");
  const [mix, setMix] = useState<Theme[]>(() => shuffleMix());
  const [extra, setExtra] = useState<Look | null>(null);
  const [saved, setSaved] = useState<Look[]>([]);
  const [modal, setModal] = useState<null | "export" | "import" | "components">(null);
  const [toast, setToast] = useState("");
  const [fixNote, setFixNote] = useState<string[]>([]);
  const [importText, setImportText] = useState("");
  const [custom, setCustom] = useState(false);
  const [ownFonts, setOwnFonts] = useState(false);

  const flash = (m: string) => { setToast(m); window.setTimeout(() => setToast(""), 2400); };
  const up = (p: Partial<Look>) => { setFixNote([]); setLook((l) => ({ ...l, ...p })); };

  // Open only on allowed hosts with ?style-sandbox; stay open for the tab while navigating.
  useEffect(() => {
    if (!wantsOpen()) return;
    safe(() => sessionStorage.setItem(OPEN_KEY, "1"), undefined);
    const m = window.location.hash.match(/look=([^&]+)/);
    const shared = m?.[1] ? decodeLook(m[1]) : null;
    const stored = safe(() => decodeLook(sessionStorage.getItem(LOOK_KEY) ?? ""), null);
    if (shared) { setLook(shared); flash("Shared look loaded"); } else if (stored) setLook(stored);
    setSaved(safe(() => JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]") as Look[], []));
    setOpen(true);
  }, []);

  const css = previewCss(look, hide);
  useEffect(() => {
    if (!open) return;
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) { el = document.createElement("style"); el.id = STYLE_ID; }
    document.head.appendChild(el); // keep it last so it wins
    el.textContent = css;
    loadFonts(document, allFonts(look));
    safe(() => sessionStorage.setItem(LOOK_KEY, encodeLook(look)), undefined);
  }, [open, css]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const themes = vibe === "mix" ? mix : themesForVibe(vibe);
  const pairs = useMemo(() => byVibe(FONT_PAIRS, vibe).slice(0, 5), [vibe]);
  const headings = useMemo(() => byVibe(HEADING_FONTS, vibe).slice(0, 8), [vibe]);
  const bodies = useMemo(() => byVibe(BODY_FONTS, vibe).slice(0, 6), [vibe]);
  const hasAccent = !!CFG.tokens.fontAccent;

  useEffect(() => {
    if (!open || collapsed) return;
    const names = pairs.flatMap((p) => [p.heading, p.body]);
    if (ownFonts) names.push(...headings.map((f) => f.name), ...bodies.map((f) => f.name), ...(hasAccent ? ACCENT_FONTS.map((f) => f.name) : []));
    loadFonts(document, names);
  }, [open, collapsed, pairs, headings, bodies, ownFonts, hasAccent]);

  const k = effectiveColors(look);
  const result = useMemo(() => checks(derive(k), look.gradient), [k, look.gradient]);
  const fails = result.filter((r) => !r.pass);
  const aa = fails.length === 0;
  const gate = aa ? undefined : "Fix contrast first.";

  if (!open) return null;

  const close = () => {
    safe(() => { sessionStorage.removeItem(OPEN_KEY); sessionStorage.removeItem(LOOK_KEY); }, undefined);
    document.getElementById(STYLE_ID)?.remove();
    const url = new URL(window.location.href);
    url.searchParams.delete(PARAM);
    url.hash = url.hash.replace(/#?look=[^&]*/, "");
    window.history.replaceState(null, "", url.toString());
    setOpen(false);
  };
  const copy = async (text: string, msg: string) => { try { await navigator.clipboard.writeText(text); flash(msg); } catch { flash("Couldn't copy. Select the text and copy it manually."); } };
  const save = () => {
    const named = { ...look, name: lookName(look) };
    const next = [named, ...saved.filter((s) => s.name !== named.name)].slice(0, 4);
    setSaved(next); safe(() => localStorage.setItem(SAVED_KEY, JSON.stringify(next)), undefined); flash("Saved. Tap saved looks to flip between them.");
  };
  const unsave = (i: number) => { const next = saved.filter((_, j) => j !== i); setSaved(next); safe(() => localStorage.setItem(SAVED_KEY, JSON.stringify(next)), undefined); };
  const setColor = (key: keyof KeyColors, v: string) => {
    const colors = { ...look.colors, [key]: v.toUpperCase() };
    if (key === "primary") colors.gradientEnd = suggestGradientEnd(colors.primary);
    setExtra({ ...look, themeId: "custom", colors }); up({ themeId: "custom", colors, mode: "auto" });
  };
  const doImport = () => {
    const { look: imported, summary } = parseImport(importText, look);
    setExtra(imported); setLook(imported); setFixNote([]); setModal(null); flash(summary);
  };
  const shareUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, "");
    return `${url.origin}${url.pathname}?${PARAM}#look=${encodeLook(look)}`;
  };
  const fontLinks = fontUrls(allFonts(look)).map((href) => `<link rel="stylesheet" href="${href}">`).join("\n");
  const summary = `${themeName(look)}${look.gradient ? " (gradient)" : ""}${look.mode !== "auto" ? `, ${look.mode}` : ""} · ${look.fonts.heading} / ${look.fonts.body} · Corners ${radiusLabel(look.radius)} · ${DEPTH_LABELS[look.depth]}${look.depth ? (look.softness < 20 ? ", hard shadow" : look.softness > 70 ? ", soft shadow" : "") : ""}${CFG.tokens.spacing ? ` · ${look.density}` : ""}${look.grain ? " · grain" : ""}`;

  // A render function, not a component, so rows keep focus across re-renders.
  const themeRow = (id: string, name: string, desc: string, colors: KeyColors, gradientOk: boolean) => {
    const selected = look.themeId === id;
    const shown = selected ? k : colors;
    const bad = checks(derive(shown), selected && look.gradient).some((x) => !x.pass);
    const fill = selected && look.gradient && shown.gradientEnd ? `linear-gradient(135deg, ${shown.primary}, ${shown.gradientEnd})` : shown.primary;
    const pick = () => { if (!selected) up({ themeId: id, colors, gradient: false }); };
    return (
      <div key={id} role="button" tabIndex={0} aria-pressed={selected} className="ss-theme" onClick={pick}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } }}
        aria-label={`${name}${bad ? ", has contrast issues" : ""}`}>
        <div className="ss-theme-top">
          <span className="ss-strip" aria-hidden>{[shown.background, fill, shown.accent, shown.foreground].map((c, i) => <i key={i} style={{ background: c }} />)}</span>
          <span><span className="ss-theme-name">{name}</span>{gradientOk && <span className="ss-theme-desc"> · gradient ready</span>}<span className="ss-theme-desc" style={{ display: "block" }}>{desc}</span></span>
          {bad && <span className="ss-warn" title="Contrast issues" />}
        </div>
        {selected && gradientOk && (
          <div className="ss-seg" role="group" aria-label="Key color" onClick={(e) => e.stopPropagation()}>
            {(["Solid", "Gradient"] as const).map((m) => <button key={m} aria-pressed={look.gradient === (m === "Gradient")} onClick={() => up({ gradient: m === "Gradient" })}>{m}</button>)}
          </div>
        )}
      </div>
    );
  };

  if (collapsed) {
    return (
      <div className="ss-root">
        <style>{SANDBOX_CSS}</style>
        <button className="ss-pill" style={left ? { left: 16, right: "auto" } : undefined} onClick={() => setCollapsed(false)} aria-label="Open Style Sandbox">✦ Style Sandbox</button>
      </div>
    );
  }

  return (
    <div className="ss-root">
      <style>{SANDBOX_CSS}</style>
      <aside className="ss-panel" aria-label="Style Sandbox" style={left ? { left: 16, right: "auto" } : undefined}>
        <div className="ss-head">
          <div style={{ flex: 1 }}>
            <p className="ss-title">Style Sandbox</p>
            <p className="ss-sub">Live tweaks, zero credits. Click around your app.</p>
          </div>
          <button className="ss-icon" onClick={() => setLeft(!left)} aria-label={left ? "Move panel right" : "Move panel left"} title="Move panel to the other side">⇆</button>
          <button className="ss-icon" onClick={() => setCollapsed(true)} aria-label="Minimize" title="Minimize">−</button>
          <button className="ss-icon" onClick={close} aria-label="Close and restore your app" title="Close and restore your app">×</button>
        </div>

        <div className="ss-scroll">
          <Section title="Theme">
            <div className="ss-chips" role="group" aria-label="Vibe">
              <button className="ss-chip" aria-pressed={vibe === "mix"} onClick={() => { if (vibe === "mix") setMix(shuffleMix()); setVibe("mix"); }}>{vibe === "mix" ? "↻ Shuffle" : "Mix"}</button>
              {VIBES.map((v) => (
                <button key={v.id} className="ss-chip" aria-pressed={vibe === v.id} onClick={() => setVibe(v.id)}>
                  <span className="ss-dots" aria-hidden>{themesForVibe(v.id).slice(0, 3).map((t) => <i key={t.id} style={{ background: t.primary }} />)}</span>{v.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              {themeRow("current", "Current", "Your app as it is today.", CFG.current.colors, false)}
              {CFG.extraThemes.map((t) => themeRow(t.id, t.name, t.description, themeKeys(t), !!t.gradientEnd))}
              {extra && themeRow(extra.themeId, extra.themeId === "imported" ? "Imported" : "Custom", "Your own colors.", extra.colors, !!extra.colors.gradientEnd)}
              {themes.map((t) => themeRow(t.id, t.name, t.description, themeKeys(t), !!t.gradientEnd))}
            </div>
            <p className="ss-sublabel">Mode</p>
            <div className="ss-seg" role="group" aria-label="Light or dark">
              {([["auto", "Theme default"], ["light", "Light"], ["dark", "Dark"]] as const).map(([m, label]) => (
                <button key={m} aria-pressed={look.mode === m} onClick={() => up({ mode: m })}>{label}</button>
              ))}
            </div>
            <div><button className="ss-link" onClick={() => setCustom(!custom)} aria-expanded={custom}>{custom ? "Hide custom colors" : "Customize colors"}</button></div>
            {custom && (
              <div className="ss-colors">
                {([["background", "Background"], ["foreground", "Text"], ["primary", "Key color"], ["primaryForeground", "Text on key"], ["accent", "Accent"]] as [keyof KeyColors, string][]).map(([key, label]) => (
                  <label key={key}><input type="color" value={look.colors[key] ?? "#000000"} onChange={(e) => setColor(key, e.target.value)} aria-label={label} />{label}</label>
                ))}
              </div>
            )}
          </Section>

          <Section title="Typography">
            {[{ label: "Current", heading: CFG.current.fonts.heading, body: CFG.current.fonts.body }, ...pairs].map((p) => {
              const on = look.fonts.heading === p.heading && look.fonts.body === p.body;
              return (
                <button key={p.label + p.heading} className="ss-pair" aria-pressed={on} onClick={() => up({ fonts: { ...look.fonts, heading: p.heading, body: p.body } })}>
                  <span className="ss-pair-h" style={{ fontFamily: fontStack(p.heading, "serif") }}>{CFG.headline}</span>
                  <span className="ss-pair-meta"><b>{p.label}</b> · {p.heading}{p.body !== p.heading ? ` + ${p.body}` : ""}</span>
                </button>
              );
            })}
            <div><button className="ss-link" onClick={() => setOwnFonts(!ownFonts)} aria-expanded={ownFonts}>{ownFonts ? "Hide font picker" : "Mix your own fonts"}</button></div>
            {ownFonts && (<>
              <p className="ss-sublabel">Heading</p>
              <div className="ss-chips">
                {headings.map((f) => <button key={f.name} className="ss-chip ss-font-chip" aria-pressed={look.fonts.heading === f.name} style={{ fontFamily: fontStack(f.name, "serif") }} onClick={() => up({ fonts: { ...look.fonts, heading: f.name } })}>{f.name}</button>)}
              </div>
              <p className="ss-sublabel">Body</p>
              <div className="ss-chips">
                {bodies.map((f) => <button key={f.name} className="ss-chip ss-font-chip" aria-pressed={look.fonts.body === f.name} style={{ fontFamily: fontStack(f.name) }} onClick={() => up({ fonts: { ...look.fonts, body: f.name } })}>{f.name}</button>)}
              </div>
              {hasAccent && (<>
                <p className="ss-sublabel">Emphasis</p>
                <div className="ss-chips">
                  {ACCENT_FONTS.map((f) => <button key={f.name} className="ss-chip ss-font-chip" aria-pressed={look.fonts.accent === f.name} style={{ fontFamily: fontStack(f.name, "serif"), fontStyle: "italic" }} onClick={() => up({ fonts: { ...look.fonts, accent: f.name } })}>{f.name}</button>)}
                </div>
              </>)}
            </>)}
            <p className="ss-sublabel">Heading tracking <span>{look.tracking.toFixed(2)}em</span></p>
            <input className="ss-range" type="range" min={-6} max={10} value={Math.round(look.tracking * 100)} onChange={(e) => up({ tracking: Number(e.target.value) / 100 })} aria-label="Heading letter spacing" />
            <div className="ss-ends"><span>Tight</span><span>Wide</span></div>
          </Section>

          <Section title="Shape">
            <p className="ss-sublabel" style={{ marginTop: 0 }}>Corner radius <span>{radiusLabel(look.radius)}</span></p>
            <input className="ss-range" type="range" min={0} max={RADIUS_FULL} value={look.radius} onChange={(e) => up({ radius: Number(e.target.value) })} aria-label="Corner radius" />
            <div className="ss-ends"><span>Sharp</span><span>Full</span></div>
            <p className="ss-sublabel">Depth <span>{DEPTH_LABELS[look.depth]}</span></p>
            <input className="ss-range" type="range" min={0} max={4} step={1} value={look.depth} onChange={(e) => up({ depth: Number(e.target.value) })} aria-label="Shadow depth" />
            <div className="ss-ends"><span>Flat</span><span>Floating</span></div>
            <p className="ss-sublabel">Shadow softness</p>
            <input className="ss-range" type="range" min={0} max={100} value={look.softness} disabled={look.depth === 0} onChange={(e) => up({ softness: Number(e.target.value) })} aria-label="Shadow softness" />
            <div className="ss-ends"><span>Hard edge</span><span>Diffused</span></div>
            {CFG.tokens.spacing && (<>
              <p className="ss-sublabel">Density</p>
              <div className="ss-seg" role="group" aria-label="Density">
                {(["compact", "cozy", "roomy"] as Density[]).map((d) => <button key={d} aria-pressed={look.density === d} onClick={() => up({ density: d })}>{d[0]!.toUpperCase() + d.slice(1)}</button>)}
              </div>
            </>)}
          </Section>

          <Section title="Finish">
            <label className="ss-switch">Paper grain<input type="checkbox" checked={look.grain} onChange={(e) => up({ grain: e.target.checked })} /></label>
            {CFG.decorations && <label className="ss-switch">Hide decorations<input type="checkbox" checked={hide} onChange={(e) => setHide(e.target.checked)} /></label>}
          </Section>

          <Section title="Saved looks">
            <button className="ss-btn" onClick={save}>Save this look</button>
            {saved.length > 0 && (
              <div className="ss-saved">
                {saved.map((s, i) => (
                  <span key={s.name + i}><button onClick={() => setLook(s)} title="Switch to this look">{s.name}</button><button onClick={() => unsave(i)} aria-label={`Remove ${s.name}`}>×</button></span>
                ))}
              </div>
            )}
            <div className="ss-row">
              <button className="ss-btn" onClick={() => setModal("components")}>Components</button>
              <button className="ss-btn" onClick={() => setModal("import")}>Import CSS</button>
              <button className="ss-btn" disabled={!aa} title={gate} onClick={() => copy(shareUrl(), "Share link copied")}>Share link</button>
              <button className="ss-btn" onClick={() => { setLook(currentLook()); setFixNote([]); }}>Reset</button>
            </div>
          </Section>
        </div>

        <div className="ss-foot">
          <div className="ss-status" role="status">
            {aa ? <span>✓ Meets WCAG AA</span> : (<>
              <span>{fails.length} contrast issue{fails.length > 1 ? "s" : ""}</span>
              <button className="ss-btn ss-btn-dark" onClick={() => {
                const r = fix(derive(k), look.gradient);
                const c = r.colors;
                setLook((l) => ({ ...l, mode: "auto", themeId: l.themeId === "current" ? "custom" : l.themeId, colors: { background: c.background, foreground: c.foreground, primary: c.primary, primaryForeground: c.primaryForeground, accent: c.accent, gradientEnd: c.gradientEnd } }));
                setFixNote(r.changes);
              }}>Fix</button>
            </>)}
          </div>
          {!aa && <ul className="ss-fails">{fails.map((f) => <li key={f.id}>{f.label}: {f.ratio.toFixed(2)} (needs {f.min})</li>)}</ul>}
          {fixNote.length > 0 && <ul className="ss-fails">{fixNote.map((n) => <li key={n}>{n}</li>)}</ul>}
          <p className="ss-note">{summary}</p>
          <div className="ss-row">
            <button className="ss-btn ss-btn-dark ss-grow" disabled={!aa} title={gate} onClick={() => copy(lookPrompt(look), "Prompt copied. Paste it in chat to apply.")}>Copy as prompt</button>
            <button className="ss-btn ss-grow" disabled={!aa} title={gate} onClick={() => setModal("export")}>Copy CSS (free)</button>
          </div>
          <p className="ss-credit">Made with <a href="https://github.com/leahsass/style-sandbox" target="_blank" rel="noreferrer">Style Sandbox</a> by Leah Sass · <a href="https://www.buymeacoffee.com/leahsass" target="_blank" rel="noreferrer">Buy me a coffee</a></p>
        </div>
      </aside>

      {modal && (
        <div className="ss-modal-bg" role="dialog" aria-modal="true" aria-label={modal} onClick={() => setModal(null)}>
          <div className="ss-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ss-modal-head">
              <h2>{{ export: "Apply it yourself", import: "Import CSS", components: "Components" }[modal]}</h2>
              <button className="ss-btn" style={{ marginLeft: "auto" }} onClick={() => setModal(null)}>Close</button>
            </div>
            {modal === "components" && <ComponentSheet look={look} />}
            {modal === "import" && (<>
              <p className="ss-note">Paste CSS variables from tweakcn, shadcn themes, lovablethemes.app, or your own. Hex, rgb, hsl, oklch and shadcn triplets all work.</p>
              <textarea className="ss-textarea" value={importText} onChange={(e) => setImportText(e.target.value)} aria-label="CSS to import" placeholder={":root {\n  --background: #FBF7F4;\n  --foreground: #3B2F2F;\n  --primary: #A34A6B;\n  --radius: 0.75rem;\n}"} />
              <div className="ss-row"><button className="ss-btn ss-btn-dark" onClick={doImport} disabled={!importText.trim()}>Import</button></div>
            </>)}
            {modal === "export" && (<>
              <p className="ss-note">Paste the CSS at the end of your global stylesheet and the font links in your page head. It's exactly what you're previewing. To also get AA-safe alert colors and a DESIGN.md, use Copy as prompt instead.</p>
              <pre className="ss-pre">{`${fontLinks}\n\n${exportCss(look)}`}</pre>
              <button className="ss-btn ss-btn-dark" onClick={() => copy(`${fontLinks}\n\n${exportCss(look)}`, "CSS copied")}>Copy CSS</button>
            </>)}
          </div>
        </div>
      )}
      {toast && <div className="ss-toast" role="status">{toast}</div>}
    </div>
  );
}

export default StyleSandbox;
