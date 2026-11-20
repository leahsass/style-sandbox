// Style Sandbox panel styles. Self-contained and neutral, so the panel looks the same in every
// app and never picks up the look it's previewing. Do not edit per project.

export const SANDBOX_CSS = `
.ss-root, .ss-root *, .ss-root *::before, .ss-root *::after { box-sizing: border-box; }
.ss-root { font: 13px/1.45 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; color: #1C1917; letter-spacing: normal; text-transform: none; }
.ss-root h1, .ss-root h2, .ss-root h3, .ss-root p, .ss-root label, .ss-root button, .ss-root input, .ss-root textarea, .ss-root pre { font-family: inherit; letter-spacing: normal; text-transform: none; color: inherit; margin: 0; }
.ss-panel { position: fixed; top: 16px; right: 16px; bottom: 16px; width: 360px; max-width: calc(100vw - 32px); display: flex; flex-direction: column; background: #FAFAF8; border: 1px solid #E2DFD8; border-radius: 16px; box-shadow: 0 18px 50px rgba(0,0,0,.22); z-index: 2147483000; overflow: hidden; }
/* Minimized pill sits mid-height on the edge, away from bottom nav bars and top headers. */
.ss-root .ss-pill { position: fixed; right: 12px; top: 50%; bottom: auto; transform: translateY(-50%); z-index: 2147483000; appearance: none; border: 0; background: #1C1917; color: #FFFFFF; border-radius: 999px; padding: 10px 14px; font: 600 13px/1 ui-sans-serif, system-ui, sans-serif; box-shadow: 0 8px 24px rgba(0,0,0,.25); cursor: pointer; }
.ss-root .ss-pill:hover { background: #3A3631; }
.ss-head { display: flex; align-items: flex-start; gap: 8px; padding: 14px 16px 12px; border-bottom: 1px solid #E2DFD8; }
.ss-title { font-size: 15px; font-weight: 700; }
.ss-sub { color: #6B655C; font-size: 12px; margin-top: 1px; }
.ss-icon { appearance: none; border: 1px solid #D6D2C9; background: #fff; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; font-size: 15px; line-height: 1; display: grid; place-items: center; }
.ss-scroll { flex: 1; overflow-y: auto; }
.ss-section { padding: 14px 16px; border-bottom: 1px solid #E2DFD8; }
.ss-root .ss-label { display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #6B655C; margin-bottom: 10px; }
.ss-root .ss-label span { letter-spacing: .02em; font-weight: 600; text-transform: none; color: #1C1917; }
.ss-sublabel { display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: #6B655C; margin: 12px 0 6px; }
.ss-sublabel span { color: #1C1917; }
.ss-btn { appearance: none; border: 1px solid #D6D2C9; background: #fff; border-radius: 8px; padding: 6px 10px; font-size: 12px; font-weight: 600; cursor: pointer; }
.ss-btn:hover { background: #F2F0EB; }
.ss-btn:disabled { opacity: .4; cursor: not-allowed; }
.ss-root .ss-btn-dark { background: #1C1917; border-color: #1C1917; color: #fff; }
.ss-btn-dark:hover { background: #3A3631; }
.ss-root button:focus-visible, .ss-root input:focus-visible, .ss-root textarea:focus-visible, .ss-root [role="button"]:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }
.ss-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.ss-chip { appearance: none; border: 1px solid #D6D2C9; background: #fff; border-radius: 999px; padding: 4px 10px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.ss-root .ss-chip[aria-pressed="true"] { background: #1C1917; border-color: #1C1917; color: #fff; }
.ss-font-chip { border-radius: 8px; font-size: 14px; padding: 5px 10px; }
.ss-dots { display: inline-flex; }
.ss-dots i { width: 8px; height: 8px; border-radius: 50%; margin-left: -3px; border: 1px solid rgba(0,0,0,.15); }
.ss-dots i:first-child { margin-left: 0; }
.ss-theme { width: 100%; text-align: left; border: 2px solid transparent; background: transparent; border-radius: 10px; padding: 6px 8px; margin-top: 4px; cursor: pointer; display: block; }
.ss-theme:hover { background: #F2F0EB; }
.ss-theme[aria-pressed="true"] { border-color: #1C1917; background: #F2F0EB; }
.ss-theme-top { display: flex; align-items: center; gap: 10px; }
.ss-strip { display: flex; border-radius: 6px; overflow: hidden; border: 1px solid rgba(0,0,0,.12); flex-shrink: 0; }
.ss-strip i { width: 14px; height: 22px; }
.ss-theme-name { font-weight: 700; }
.ss-badge { display: inline-block; margin-left: 6px; padding: 1px 6px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, #6D3FD8, #E8467C); vertical-align: 1px; }
.ss-theme-desc { color: #6B655C; font-size: 11.5px; }
.ss-warn { margin-left: auto; width: 8px; height: 8px; border-radius: 50%; background: #B91C1C; flex-shrink: 0; }
.ss-seg { display: inline-flex; border: 1px solid #D6D2C9; border-radius: 8px; overflow: hidden; }
.ss-seg button { appearance: none; border: 0; border-left: 1px solid #D6D2C9; background: #fff; font-size: 12px; font-weight: 600; padding: 5px 11px; cursor: pointer; }
.ss-seg button:first-child { border-left: 0; }
.ss-root .ss-seg button[aria-pressed="true"] { background: #1C1917; color: #fff; }
.ss-theme .ss-seg { margin-top: 8px; }
.ss-pair { width: 100%; text-align: left; appearance: none; border: 2px solid transparent; background: transparent; border-radius: 10px; padding: 6px 8px; cursor: pointer; display: block; }
.ss-pair:hover { background: #F2F0EB; }
.ss-pair[aria-pressed="true"] { border-color: #1C1917; background: #F2F0EB; }
.ss-pair-h { display: block; font-size: 17px; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ss-pair-meta { display: block; font-size: 11px; color: #6B655C; margin-top: 2px; }
.ss-root .ss-pair-meta b { color: #1C1917; }
.ss-link { appearance: none; border: 0; background: none; padding: 0; font-size: 12px; text-decoration: underline; cursor: pointer; margin-top: 8px; }
.ss-colors { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
.ss-colors label { display: flex; align-items: center; gap: 8px; font-size: 12px; }
.ss-colors input { width: 26px; height: 26px; border: 1px solid #D6D2C9; border-radius: 6px; padding: 0; background: none; cursor: pointer; }
.ss-range { width: 100%; accent-color: #1C1917; margin: 0; }
.ss-ends { display: flex; justify-content: space-between; font-size: 11px; color: #6B655C; margin: 2px 0 4px; }
.ss-switch { display: flex; align-items: center; justify-content: space-between; font-size: 13px; padding: 4px 0; cursor: pointer; }
.ss-switch input { width: 34px; height: 20px; accent-color: #1C1917; }
.ss-saved { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.ss-saved span { display: inline-flex; align-items: center; border: 1px solid #D6D2C9; border-radius: 999px; background: #fff; overflow: hidden; }
.ss-saved button { appearance: none; border: 0; background: none; padding: 4px 8px; font-size: 12px; cursor: pointer; }
.ss-saved button + button { border-left: 1px solid #E2DFD8; color: #6B655C; }
.ss-foot { border-top: 1px solid #E2DFD8; padding: 12px 16px; background: #FAFAF8; }
.ss-status { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 12px; }
.ss-fails { margin: 4px 0 0; padding-left: 18px; font-size: 11.5px; color: #6B655C; }
.ss-row { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.ss-row .ss-grow { flex: 1; padding: 8px; }
.ss-credit { font-size: 10.5px; color: #8A847A; margin-top: 8px; }
.ss-credit a { color: inherit; }
.ss-modal-bg { position: fixed; inset: 0; background: rgba(28,25,23,.5); display: grid; place-items: center; padding: 24px; z-index: 2147483001; }
.ss-modal { background: #FAFAF8; border-radius: 14px; padding: 20px; width: 100%; max-width: 980px; max-height: 100%; overflow: auto; }
.ss-modal-head { display: flex; align-items: center; margin-bottom: 12px; }
.ss-modal-head h2 { font-size: 16px; font-weight: 700; }
.ss-root .ss-pre { background: #F2F0EB; border-radius: 8px; padding: 12px; font: 11px/1.5 ui-monospace, Menlo, monospace; white-space: pre-wrap; word-break: break-word; max-height: 320px; overflow: auto; margin: 8px 0; }
.ss-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.ss-note { font-size: 11.5px; color: #6B655C; margin-top: 4px; }
.ss-root .ss-textarea { width: 100%; height: 180px; border: 1px solid #D6D2C9; border-radius: 8px; padding: 10px; font: 12px/1.5 ui-monospace, Menlo, monospace; margin-top: 8px; }
.ss-sheet { border-radius: 12px; border: 1px solid #D6D2C9; padding: 26px; }
.ss-toast { position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%); background: #1C1917; color: #fff; padding: 9px 16px; border-radius: 8px; font-size: 13px; z-index: 2147483002; }
@media (max-width: 760px) { .ss-panel { top: auto; height: 60vh; left: 8px; right: 8px; bottom: 8px; width: auto; max-width: none; } .ss-grid2 { grid-template-columns: 1fr; } }
`;
