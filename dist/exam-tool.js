/* מבחנים בהקלדה · Gemini Canvas build */
(function () {
  document.documentElement.lang = 'he'; document.documentElement.dir = 'rtl';
  document.head.insertAdjacentHTML('beforeend', "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Frank+Ruhl+Libre:wght@400;500;700;900&display=swap\"><style id=\"xm-css\">/* Exam runtime — everything scoped under .xm so it can live inside the converter's preview or alone in an exported file. */\r\n.xm {\r\n  --paper: #f4f6fa; --sheet: #ffffff; --line: #d6dce8; --line-soft: #e8ecf3; --text: #1a2130; --muted: #5b6577;\r\n  --ink: #1c3fae; --ink-soft: #e7ecfb; --done: #1d8150; --partial: #b0700f; --partial-soft: #fbf0dc; --empty: #98a1b1; --mark: #fff0b3;\r\n  --shadow: 0 1px 2px rgba(20, 30, 60, .06), 0 4px 16px rgba(20, 30, 60, .06);\r\n  --f-text: \"Frank Ruhl Libre\", \"Noto Serif Hebrew\", \"David\", \"Times New Roman\", serif;\r\n  --f-ui: \"Assistant\", \"Noto Sans Hebrew\", \"Segoe UI\", Arial, sans-serif;\r\n  --fs: 1; --u: calc(16px * var(--fs)); --nkz: 1; --mapW: 236px; --artW: 36%;\r\n  position: relative; height: 100%; overflow: hidden; display: grid; grid-template-rows: auto minmax(0, 1fr);\r\n  background: var(--paper); color: var(--text); font-family: var(--f-ui); font-size: var(--u); direction: rtl; color-scheme: light;\r\n}\r\n.xm * { box-sizing: border-box; }\r\n.xm [hidden] { display: none !important; }\r\n.xm button, .xm input, .xm select, .xm textarea { font: inherit; color: inherit; }\r\n.xm button { cursor: pointer; }\r\n.xm :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }\r\n\r\n.xm-top { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; background: var(--sheet); border-bottom: 1px solid var(--line); padding: 9px max(16px, env(safe-area-inset-right, 0px)) 9px max(16px, env(safe-area-inset-left, 0px)); }\r\n.xm-brand { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }\r\n.xm-brand b { font-family: var(--f-text); font-size: 1.2em; font-weight: 700; }\r\n.xm-brand span { color: var(--muted); font-size: .85em; }\r\n.xm-who { display: flex; align-items: center; gap: 8px; font-size: .9em; color: var(--muted); }\r\n.xm-who input { width: 11em; border: 1px solid var(--line); border-radius: 6px; padding: 4px 8px; background: var(--paper); font-family: var(--f-text); color: var(--ink); font-size: 1.05em; }\r\n.xm-grow { flex: 1; }\r\n.xm-timer { display: flex; align-items: center; gap: 10px; font-variant-numeric: tabular-nums; }\r\n.xm-clock { font-size: 1.3em; font-weight: 700; min-width: 4.2em; text-align: center; }\r\n.xm-clock.low { color: var(--partial); }\r\n.xm-toggle { display: inline-flex; align-items: center; gap: 6px; font-size: .85em; color: var(--muted); cursor: pointer; user-select: none; }\r\n.xm-toggle input { accent-color: var(--ink); }\r\n.xm-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }\r\n.xm-btn { border: 1px solid var(--line); background: var(--sheet); border-radius: 8px; padding: 6px 12px; font-weight: 600; font-size: .92em; }\r\n.xm-btn:hover { border-color: var(--ink); }\r\n.xm-btn.primary { background: var(--ink); border-color: var(--ink); color: #fff; }\r\n.xm-seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }\r\n.xm-seg button { border: 0; background: var(--sheet); color: var(--muted); padding: 5px 10px; font-weight: 600; font-size: .88em; }\r\n.xm-seg button + button { border-right: 1px solid var(--line); }\r\n.xm-seg button[aria-pressed=\"true\"] { background: var(--ink-soft); color: var(--ink); }\r\n.xm-seg button:hover { color: var(--ink); }\r\n.xm-x { flex: none; border: 0; background: none; color: var(--muted); font-size: 1.3em; line-height: 1; width: 1.6em; height: 1.6em; border-radius: 6px; padding: 0; }\r\n.xm-x:hover { background: var(--line-soft); color: var(--text); }\r\n\r\n.xm-desk { display: flex; min-height: 0; }\r\n.xm-rz { flex: none; width: 7px; margin: 0 -3px; position: relative; z-index: 3; cursor: col-resize; touch-action: none; }\r\n.xm-rz::after { content: \"\"; position: absolute; top: 0; bottom: 0; left: 2px; width: 3px; border-radius: 2px; background: var(--ink); opacity: 0; transition: opacity .15s; }\r\n.xm-rz:hover::after, .xm-rz.drag::after, .xm-rz:focus-visible::after { opacity: 1; }\r\n.xm-rz:focus-visible { outline: none; }\r\n\r\n.xm-map { flex: none; width: var(--mapW); border-left: 1px solid var(--line); background: var(--sheet); overflow: auto; padding: 14px 12px; display: flex; flex-direction: column; gap: 14px; }\r\n.xm-prog { display: flex; flex-direction: column; gap: 6px; }\r\n.xm-prog-top { display: flex; gap: 8px; align-items: center; font-size: .9em; }\r\n.xm-prog-top span { flex: 1; }\r\n.xm-prog-top b { font-size: 1.1em; font-variant-numeric: tabular-nums; }\r\n.xm-bar { height: 8px; border-radius: 99px; background: var(--line-soft); overflow: hidden; display: flex; }\r\n.xm-bar i { display: block; height: 100%; transition: width .3s; }\r\n.xm-bar .d { background: var(--done); } .xm-bar .p { background: var(--partial); }\r\n.xm-legend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: .78em; color: var(--muted); }\r\n.xm-legend span::before { content: \"\"; display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-left: 5px; vertical-align: middle; }\r\n.xm-legend .l-d::before { background: var(--done); } .xm-legend .l-p::before { background: var(--partial); } .xm-legend .l-e::before { border: 1.5px solid var(--empty); }\r\n.xm-grp h3 { margin: 0 0 7px; font-size: .78em; color: var(--muted); font-weight: 700; }\r\n.xm-chips { display: flex; flex-wrap: wrap; gap: 5px; }\r\n.xm-chip { min-width: 2.7em; padding: 3px 7px; border-radius: 7px; border: 1.5px solid var(--empty); background: transparent; font-weight: 700; font-size: .85em; font-variant-numeric: tabular-nums; }\r\n.xm-chip.partial { border-color: var(--partial); background: var(--partial-soft); color: var(--partial); }\r\n.xm-chip.done { border-color: var(--done); background: var(--done); color: #fff; }\r\n.xm-chip.here { box-shadow: 0 0 0 2px var(--sheet), 0 0 0 4px var(--ink); }\r\n\r\n.xm-col { flex: 1; overflow: auto; min-width: 0; display: flex; flex-direction: column; }\r\n.xm-sheet { width: 100%; max-width: 880px; margin: 0 auto; padding: 20px 22px 40px; display: flex; flex-direction: column; gap: 16px; flex: 1; }\r\n.xm-instr { background: var(--sheet); border: 1px solid var(--line); border-radius: 10px; padding: 10px 16px; }\r\n.xm-instr summary { cursor: pointer; font-weight: 700; }\r\n.xm-instr p { margin: 6px 0 0; line-height: 1.6; font-family: var(--f-text); }\r\n.xm-part { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; border-bottom: 2px solid var(--text); padding-bottom: 6px; margin-top: 12px; }\r\n.xm-part h2 { margin: 0; font-family: var(--f-text); font-size: 1.4em; font-weight: 700; text-wrap: balance; }\r\n.xm-part span { color: var(--muted); font-size: .9em; white-space: nowrap; }\r\n.xm-q { background: var(--sheet); border: 1px solid var(--line); border-radius: 10px; box-shadow: var(--shadow); padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; scroll-margin-top: 14px; }\r\n.xm-qh { display: flex; gap: 10px; align-items: flex-start; }\r\n.xm-qn { flex: none; font-family: var(--f-text); font-weight: 700; font-size: 1.22em; line-height: 1.55; min-width: 1.6em; }\r\n.xm-qi { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }\r\n.xm-sub { display: flex; flex-direction: column; gap: 10px; padding-top: 12px; border-top: 1px dashed var(--line); scroll-margin-top: 14px; border-radius: 4px; }\r\n.xm-sub.first { border-top: 0; padding-top: 0; }\r\n.xm-sh { display: flex; gap: 10px; align-items: flex-start; }\r\n.xm-sl { flex: none; font-weight: 700; font-family: var(--f-text); font-size: 1.1em; line-height: 1.7; }\r\n.xm-sp { flex: 1; min-width: 0; font-family: var(--f-text); font-size: 1.1em; line-height: 1.75; }\r\n.xm-pts { flex: none; font-size: .78em; color: var(--muted); border: 1px solid var(--line); border-radius: 99px; padding: 2px 8px; margin-top: 4px; white-space: nowrap; }\r\n.xm-st { flex: none; width: 10px; height: 10px; border-radius: 50%; border: 1.5px solid var(--empty); margin-top: 10px; }\r\n.xm-st.partial { border-color: var(--partial); background: var(--partial); }\r\n.xm-st.done { border-color: var(--done); background: var(--done); }\r\n.xm-st.none { visibility: hidden; }\r\n.xm .flash { animation: xmflash 1.6s ease-out; }\r\n@keyframes xmflash { 0%, 30% { background: var(--mark); } 100% { background: transparent; } }\r\n@media (prefers-reduced-motion: reduce) { .xm .flash { animation: none; } }\r\n\r\n.xm-t { margin: 0; font-family: var(--f-text); font-size: 1.1em; line-height: 1.95; }\r\n.xm-passage { margin: 0; font-family: var(--f-text); font-size: 1.08em; line-height: 1.85; background: var(--paper); border: 1px solid var(--line-soft); border-radius: 8px; padding: 10px 14px; }\r\n.xm-ref { display: inline-flex; align-items: center; gap: 4px; border: 1px solid var(--line); background: var(--paper); border-radius: 6px; padding: 0 7px; font-family: var(--f-ui); font-size: .78em; font-weight: 600; color: var(--ink); vertical-align: 2px; line-height: 1.7; }\r\n.xm-ref::before { content: \"↖\"; font-size: .8em; }\r\n.xm-ref:hover { border-color: var(--ink); }\r\n\r\n.xm-a { font-family: var(--f-text); font-size: 1em; color: var(--ink); background: var(--paper); border: 1.5px dashed var(--empty); border-radius: 6px; padding: 3px 9px; line-height: 1.6; }\r\n.xm-a:focus { outline: none; border-style: solid; border-color: var(--ink); background: var(--sheet); box-shadow: 0 0 0 3px var(--ink-soft); }\r\n.xm-a.has { border-style: solid; border-color: var(--line); background: var(--sheet); }\r\ntextarea.xm-a { width: 100%; resize: vertical; min-height: 3.4em; font-size: 1.08em; }\r\ninput.xm-a.inl { width: 10em; max-width: 100%; margin: 2px 4px; padding: 0 8px; }\r\ninput.xm-a.wide { width: 100%; min-width: 6em; }\r\nselect.xm-a { padding: 3px 6px; cursor: pointer; font-size: .95em; }\r\n.xm-a::placeholder { color: var(--empty); font-family: var(--f-ui); font-size: .85em; }\r\n.xm-mc { display: flex; flex-direction: column; gap: 7px; }\r\n.xm-opt { border: 1.5px solid var(--line); background: var(--sheet); border-radius: 8px; text-align: right; }\r\n.xm-opt:hover { border-color: var(--ink); }\r\n.xm-opt[aria-checked=\"true\"] { border-color: var(--ink); background: var(--ink-soft); color: var(--ink); }\r\n.xm-mco { display: flex; gap: 12px; align-items: baseline; padding: 8px 12px; font-family: var(--f-text); font-size: 1.06em; line-height: 1.5; }\r\n.xm-ml { flex: none; display: inline-grid; place-items: center; width: 1.7em; height: 1.7em; border-radius: 50%; border: 1.5px solid currentColor; font-weight: 700; font-size: .88em; }\r\n.xm-mco[aria-checked=\"true\"] .xm-ml { background: var(--ink); border-color: var(--ink); color: #fff; }\r\n.xm-ch { display: inline-flex; flex-wrap: wrap; gap: 4px; vertical-align: middle; margin: 2px; }\r\n.xm-ch .xm-opt { font-family: var(--f-text); font-size: 1em; padding: 0 10px; line-height: 1.65; border-radius: 99px; }\r\n.xm-ch .xm-opt[aria-checked=\"true\"] { box-shadow: 0 0 0 2px var(--ink) inset; font-weight: 700; }\r\n.xm-root { display: inline-flex; align-items: center; gap: 3px; vertical-align: middle; margin: 2px 4px; }\r\n.xm-root input { width: 2.1em; height: 2.1em; text-align: center; padding: 0; font-family: var(--f-text); font-size: 1.05em; color: var(--ink); background: var(--paper); border: 1.5px dashed var(--empty); border-radius: 6px; }\r\n.xm-root input.has { border-style: solid; border-color: var(--line); background: var(--sheet); }\r\n.xm-root input:focus { outline: none; border: 1.5px solid var(--ink); box-shadow: 0 0 0 3px var(--ink-soft); background: var(--sheet); }\r\n.xm-root input.o4 { opacity: .7; }\r\n.xm-root i { color: var(--muted); font-style: normal; }\r\n.xm-lw { display: inline-flex; flex-direction: column; align-items: center; vertical-align: bottom; margin: 3px; gap: 2px; line-height: 1.5; }\r\n.xm-lw input.xm-a { width: 7em; font-size: .88em; padding: 0 6px; text-align: center; }\r\n.xm-lw b { border-top: 2px solid var(--line); }\r\n.xm-tw { overflow-x: auto; }\r\n.xm-grid { border-collapse: collapse; width: 100%; }\r\n.xm-grid th, .xm-grid td { border: 1px solid var(--line); padding: 6px 9px; text-align: right; font-family: var(--f-text); font-size: 1.04em; line-height: 1.7; }\r\n.xm-grid thead th { background: var(--paper); font-family: var(--f-ui); font-size: .85em; color: var(--muted); font-weight: 700; }\r\n\r\n.xm-nk { position: sticky; bottom: 0; background: var(--sheet); border-top: 1px solid var(--line); padding: 4px 10px; display: flex; align-items: center; gap: 8px; box-shadow: 0 -4px 14px rgba(20,30,60,.06); }\r\n.xm-nk.off { display: none; }\r\n.xm-nk-l { font-size: .75em; color: var(--muted); font-weight: 700; flex: none; }\r\n.xm-nk-k { display: flex; gap: 3px; overflow-x: auto; min-width: 0; }\r\n.xm-key { flex: none; display: grid; place-items: center; border: 1px solid var(--line); background: var(--paper); border-radius: 6px; padding: 0 4px; min-width: calc(2.1em * var(--nkz)); height: calc(2.1em * var(--nkz)); }\r\n.xm-key:hover { border-color: var(--ink); background: var(--ink-soft); }\r\n.xm-key b { font-family: var(--f-text); font-size: calc(1.15em * var(--nkz)); line-height: 1; font-weight: 500; }\r\n.xm-grip { position: absolute; top: -6px; left: 0; right: 0; height: 12px; cursor: ns-resize; touch-action: none; }\r\n.xm-grip::after { content: \"\"; position: absolute; top: 4px; left: 50%; width: 42px; height: 4px; margin-left: -21px; border-radius: 4px; background: var(--line); }\r\n.xm-grip:hover::after, .xm-grip.drag::after { background: var(--ink); }\r\n.xm-nk .xm-x { margin-right: auto; }\r\n\r\n.xm-arts { flex: none; width: var(--artW); border-right: 1px solid var(--line); background: var(--sheet); display: flex; flex-direction: column; min-height: 0; min-width: 0; }\r\n.xm-tabs { display: flex; align-items: center; gap: 4px; padding: 8px 10px 0; border-bottom: 1px solid var(--line); overflow-x: auto; }\r\n.xm-tab { border: 1px solid transparent; border-bottom: 0; background: none; padding: 6px 12px; border-radius: 8px 8px 0 0; font-weight: 700; color: var(--muted); margin-bottom: -1px; white-space: nowrap; }\r\n.xm-tab[aria-selected=\"true\"] { background: var(--sheet); border-color: var(--line); color: var(--text); }\r\n.xm-tabs .xm-x { align-self: center; }\r\n.xm-tabs .xm-full { margin-right: auto; font-size: 1.1em; }\r\n.xm-arts.full { position: absolute; inset: 0; width: auto; z-index: 14; transform: none; box-shadow: none; border: 0; }\r\n.xm-arts.full .xm-tabs { padding-inline: max(16px, calc((100% - 860px) / 2)); }\r\n.xm-arts.full .xm-ab { padding: 26px max(20px, calc((100% - 820px) / 2)) 40px; font-size: 1.1em; }\r\n.xm-arts.full .xm-para p { max-width: 70ch; line-height: 1.85; }\r\n.xm.narrow .xm-arts.full { width: auto; transform: none; }\r\n.xm-ab { overflow: auto; padding: 14px 18px 30px; }\r\n.xm-ab h4 { font-family: var(--f-text); font-size: 1.3em; margin: 0 0 4px; text-wrap: balance; }\r\n.xm-by { color: var(--muted); font-size: .85em; margin: 0 0 12px; }\r\n.xm-para { display: grid; grid-template-columns: 3.2em minmax(0, 1fr); gap: 8px; padding: 6px; border-radius: 6px; scroll-margin-top: 10px; }\r\n.xm-para span { font-size: .78em; color: var(--muted); font-weight: 700; padding-top: .35em; }\r\n.xm-para p { margin: 0; font-family: var(--f-text); font-size: 1.06em; line-height: 1.75; max-width: 62ch; }\r\n\r\n.xm-end { text-align: center; padding: 20px 0 6px; display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--muted); }\r\n.xm-ov { position: absolute; inset: 0; background: rgba(10, 15, 25, .45); display: grid; place-items: center; z-index: 20; padding: 16px; }\r\n.xm-modal { background: var(--sheet); border-radius: 12px; box-shadow: var(--shadow); width: min(520px, 100%); max-height: 100%; overflow: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }\r\n.xm-modal h2 { margin: 0; font-family: var(--f-text); font-size: 1.35em; }\r\n.xm-modal p { margin: 0; line-height: 1.6; }\r\n.xm-miss { display: flex; flex-direction: column; gap: 6px; max-height: 45vh; overflow: auto; }\r\n.xm-miss button { display: flex; justify-content: space-between; align-items: center; gap: 10px; text-align: right; border: 1px solid var(--line); background: var(--paper); border-radius: 8px; padding: 7px 12px; }\r\n.xm-miss button:hover { border-color: var(--ink); }\r\n.xm-miss em { font-style: normal; font-size: .8em; font-weight: 700; color: var(--partial); }\r\n.xm-miss em.e { color: var(--muted); }\r\n.xm-row { display: flex; flex-wrap: wrap; gap: 8px; }\r\n.xm-ok { color: var(--done); font-weight: 700; }\r\n.xm-res { position: absolute; inset: 0; background: var(--paper); z-index: 15; overflow: auto; padding: 22px 16px 40px; }\r\n.xm-res-in { max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; }\r\n.xm-res h2 { font-family: var(--f-text); font-size: 1.6em; margin: 0; }\r\n.xm-meta { color: var(--muted); margin: 0; }\r\n.xm-sheet-t { background: var(--sheet); border: 1px solid var(--line); border-radius: 10px; overflow-x: auto; }\r\n.xm-sheet-t table { width: 100%; border-collapse: collapse; }\r\n.xm-sheet-t td, .xm-sheet-t th { border-bottom: 1px solid var(--line-soft); padding: 7px 12px; text-align: right; vertical-align: top; }\r\n.xm-sheet-t th { width: 4.5em; }\r\n.xm-sheet-t .k { color: var(--muted); font-size: .85em; width: 1%; white-space: nowrap; }\r\n.xm-sheet-t .v { font-family: var(--f-text); color: var(--ink); white-space: pre-wrap; }\r\n.xm-sheet-t .v.blank { color: var(--partial); font-family: var(--f-ui); font-size: .85em; font-weight: 700; }\r\n\r\n/* container-driven narrow layouts (the preview can be narrow on a wide screen) */\r\n.xm.narrow .xm-rz-a { display: none; }\r\n.xm.narrow .xm-arts { position: absolute; top: 0; bottom: 0; left: 0; width: min(520px, 92%); z-index: 12; box-shadow: 0 0 40px rgba(0,0,0,.25); transform: translateX(-102%); transition: transform .25s; }\r\n.xm.narrow .xm-arts.open { transform: none; }\r\n.xm.phone .xm-desk { flex-direction: column; overflow: auto; }\r\n.xm.phone .xm-rz { display: none; }\r\n.xm.phone .xm-map { width: auto; border-left: 0; border-bottom: 1px solid var(--line); padding: 8px 14px; gap: 8px; }\r\n.xm.phone .xm-grps { display: flex; gap: 5px; overflow-x: auto; }\r\n.xm.phone .xm-grp { display: contents; }\r\n.xm.phone .xm-grp h3, .xm.phone .xm-legend { display: none; }\r\n.xm.phone .xm-chips { flex-wrap: nowrap; }\r\n.xm.phone .xm-col { overflow: visible; }\r\n.xm.phone .xm-sheet { padding: 14px 14px 30px; }\r\n.xm.phone .xm-q { padding: 12px; }\r\n.xm.phone .xm-arts { width: 100%; }\r\n.xm.phone .xm-nk-l { display: none; }\r\n\r\n/* curriculum question types */\r\n.xm-hint { margin: 0; font-size: .82em; color: var(--muted); }\r\n.xm-pnote { margin: -4px 0 0; color: var(--muted); font-family: var(--f-text); line-height: 1.6; }\r\n.xm-lw select.xm-a { font-size: .82em; padding: 1px 4px; max-width: 9em; }\r\n.xm-essay { display: flex; flex-direction: column; gap: 6px; }\r\n.xm-essay textarea.xm-a { min-height: 16em; line-height: 1.9; }\r\n.xm-wc { align-self: flex-start; font-size: .82em; font-weight: 700; color: var(--muted); background: var(--paper); border: 1px solid var(--line); border-radius: 99px; padding: 2px 10px; font-variant-numeric: tabular-nums; }\r\n.xm-wc.ok { color: var(--done); border-color: var(--done); }\r\n.xm-wc.over { color: var(--partial); border-color: var(--partial); }\r\n.xm-mark, .xm-split { margin: 0; font-family: var(--f-text); font-size: 1.12em; line-height: 2.2; background: var(--paper); border: 1px solid var(--line-soft); border-radius: 8px; padding: 8px 12px; }\r\n.xm-w { border: 0; background: none; padding: 0 2px; border-radius: 4px; font-family: inherit; font-size: inherit; line-height: 1.5; border-bottom: 2px solid transparent; }\r\n.xm-w:hover { background: var(--ink-soft); }\r\n.xm-w[aria-pressed=\"true\"] { background: var(--mark); border-bottom-color: var(--ink); color: var(--ink); font-weight: 700; }\r\n.xm-sw { white-space: nowrap; }\r\n.xm-gap { display: inline-block; vertical-align: middle; width: 14px; height: 1.6em; margin: 0 1px; border: 0; border-radius: 4px; background: transparent; position: relative; padding: 0; }\r\n.xm-gap::after { content: \"\"; position: absolute; top: 15%; bottom: 15%; left: 50%; width: 1px; background: var(--line); }\r\n.xm-gap:hover { background: var(--ink-soft); }\r\n.xm-gap[aria-pressed=\"true\"]::after { content: \"/\"; width: auto; background: none; top: -2px; bottom: auto; transform: translateX(-50%); font-weight: 700; color: var(--ink); font-size: 1.3em; font-family: var(--f-ui); }\r\n.xm-sorter { display: flex; flex-direction: column; gap: 8px; }\r\n.xm-drop { min-height: 2.8em; border-radius: 8px; display: flex; flex-wrap: wrap; gap: 6px; align-content: flex-start; padding: 7px; transition: background .15s; }\r\n.xm-pool { border: 1.5px dashed var(--line); background: var(--paper); }\r\n.xm-pool:empty::after { content: \"כל המילים מוינו\"; color: var(--muted); font-size: .85em; align-self: center; }\r\n.xm-scols { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 8px; }\r\n.xm-scol { border: 1px solid var(--line); border-radius: 10px; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }\r\n.xm-sh2, .xm-sm { display: flex; flex-direction: column; gap: 4px; padding: 7px; font-size: .8em; color: var(--muted); font-weight: 600; background: var(--paper); }\r\n.xm-sm { border-top: 1px solid var(--line-soft); }\r\n.xm-sh2 .xm-a, .xm-sm .xm-a { width: 100%; font-size: 1.1em; }\r\n.xm-scol .xm-drop { flex: 1; min-height: 4.5em; }\r\n.xm-sorter.picking .xm-drop { background: var(--ink-soft); cursor: pointer; }\r\n.xm-drop.over { outline: 2px solid var(--ink); }\r\n.xm-wc2 { font-family: var(--f-text); font-size: 1.05em; font-weight: 700; padding: 2px 11px; border-radius: 7px; border: 1.5px solid var(--line); background: var(--sheet); cursor: grab; }\r\n.xm-scol .xm-wc2 { color: var(--ink); }\r\n.xm-wc2[aria-pressed=\"true\"] { border-color: var(--ink); background: var(--ink); color: #fff; }\r\n.xm-match td:first-child { width: 55%; }\r\n.xm-match select.xm-a { width: 100%; }\r\n.xm-draft { position: absolute; left: 16px; bottom: 16px; width: min(420px, calc(100% - 32px)); height: min(340px, 60%); z-index: 11; background: var(--sheet); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,.18); display: flex; flex-direction: column; resize: both; overflow: hidden; min-width: 240px; min-height: 160px; }\r\n.xm-draft-h { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-bottom: 1px solid var(--line); background: var(--paper); }\r\n.xm-draft-h span { flex: 1; font-size: .8em; color: var(--muted); }\r\n.xm-draft textarea.xm-a { flex: 1; border: 0; border-radius: 0; resize: none; background: var(--sheet); font-size: 1em; }\r\n.xm.phone .xm-scols { grid-template-columns: minmax(0, 1fr); }\r\n\r\n/* pictures, marked text, clause labels, punctuation */\r\n.xm-img { max-width: min(100%, 520px); max-height: 420px; height: auto; border-radius: 6px; border: 1px solid var(--line-soft); vertical-align: middle; }\r\n.xm-fig { margin: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }\r\n.xm-fig figcaption { font-size: .82em; color: var(--muted); }\r\n.xm-para.pic { display: block; text-align: center; }\r\n.xm-para.pic .xm-img { max-width: 100%; max-height: none; }\r\n.xm-box { border: 1.5px solid var(--text); padding: 0 4px; border-radius: 2px; }\r\n.xm u { text-decoration-thickness: 1.5px; text-underline-offset: 3px; }\r\n.xm-segs { display: flex; flex-direction: column; gap: 6px; }\r\n.xm-segr { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: var(--paper); border: 1px solid var(--line-soft); border-radius: 8px; padding: 5px 10px; }\r\n.xm-segr span { flex: 1; min-width: 10em; font-family: var(--f-text); font-size: 1.05em; }\r\n.xm-segr .xm-a { width: 13em; }\r\n.xm-punct { margin: 0; font-family: var(--f-text); font-size: 1.12em; line-height: 2.2; background: var(--paper); border: 1px solid var(--line-soft); border-radius: 8px; padding: 8px 12px; }\r\n.xm-pg { display: inline-block; vertical-align: middle; min-width: 14px; height: 1.6em; margin: 0 -2px 0 1px; padding: 0 2px; border: 0; border-radius: 4px; background: transparent; font-family: var(--f-text); font-size: 1.2em; font-weight: 700; color: var(--ink); line-height: 1; position: relative; }\r\n.xm-pg:not(.has)::after { content: \"\"; position: absolute; top: 30%; bottom: 30%; left: 50%; width: 1px; background: var(--line); }\r\n.xm-pg:hover { background: var(--ink-soft); }\r\n.xm-pmenu { position: fixed; z-index: 30; display: flex; flex-wrap: wrap; gap: 4px; max-width: 270px; padding: 6px; background: var(--sheet); border: 1px solid var(--line); border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,.18); }\r\n.xm-pmenu button { min-width: 2.2em; height: 2.2em; border: 1px solid var(--line); border-radius: 7px; background: var(--paper); font-family: var(--f-text); font-size: 1.1em; font-weight: 700; }\r\n.xm-pmenu button:hover, .xm-pmenu button:focus-visible { border-color: var(--ink); color: var(--ink); }\r\n.xm-pmenu .clr { font-family: var(--f-ui); font-size: .85em; font-weight: 600; padding: 0 8px; color: var(--muted); }\r\n\r\n/* choosing a chapter or some of the questions */\r\n.xm-alt { border: 1.5px solid var(--ink); background: var(--ink-soft); border-radius: 10px; padding: 10px 14px; display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }\r\n.xm-alt .xm-btn[aria-pressed=\"true\"] { background: var(--ink); color: #fff; border-color: var(--ink); }\r\n.xm-poff { display: none; margin: 6px 0 0; color: var(--muted); }\r\n.xm-pw.off .xm-poff { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }\r\n.xm-pw.off .xm-q, .xm-pw.off .xm-pickinfo { display: none; }\r\n.xm-pw.off .xm-part h2 { color: var(--muted); }\r\n.xm-pickinfo { margin: 0; font-weight: 700; color: var(--muted); }\r\n.xm-pickinfo.ok { color: var(--done); }\r\n.xm-pickinfo.over { color: var(--partial); }\r\n.xm-pick { display: inline-flex; align-items: center; gap: 6px; font-size: .85em; font-weight: 700; color: var(--ink); margin-bottom: 4px; cursor: pointer; }\r\n.xm-q.unpicked { opacity: .55; }\r\n.xm-chip.off { opacity: .35; }\r\n.xm-warn { border: 1px solid var(--partial); background: var(--partial-soft); color: var(--partial); border-radius: 8px; padding: 6px 12px; margin-bottom: 10px; font-weight: 600; }\r\n.xm-warn p { margin: 4px 0; }\r\n\r\n/* converter preview: edit handles */\r\n.xm-q, .xm-part { position: relative; }\r\n.xm-edit { position: absolute; left: 10px; top: 10px; z-index: 2; border: 1px solid var(--ink); background: var(--sheet); color: var(--ink); border-radius: 99px; padding: 2px 12px; font-weight: 700; font-size: .82em; box-shadow: var(--shadow); }\r\n.xm-edit:hover { background: var(--ink); color: #fff; }\r\n.xm-part .xm-edit { top: auto; bottom: 6px; }\r\n.xm-q.editing { outline: 3px solid var(--ink); outline-offset: 2px; }\r\n\r\n/* round nikud button, bottom-left */\r\n.xm-fab { position: absolute; left: max(16px, env(safe-area-inset-left, 0px)); bottom: max(16px, env(safe-area-inset-bottom, 0px)); z-index: 13; width: 58px; height: 58px; border-radius: 50%; border: 2px solid var(--ink); background: var(--sheet); color: var(--ink); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; padding: 0; box-shadow: 0 6px 18px rgba(28, 63, 174, .25); transition: background .15s, color .15s; }\r\n.xm-fab b { font-family: var(--f-text); font-size: 1.45em; line-height: 1; font-weight: 700; }\r\n.xm-fab small { font-size: .62em; font-weight: 700; line-height: 1.2; }\r\n.xm-fab[aria-pressed=\"true\"] { background: var(--ink); color: #fff; }\r\n.xm-fab:hover { box-shadow: 0 8px 22px rgba(28, 63, 174, .35); }\r\n.xm-draft { bottom: 86px; }\r\n.xm-nk { padding-left: 84px; }\r\n</style><style>/* Layout: two screens. Home = a desk of saved exams (ruled-paper hero, upload card, grid of exam \"sheets\").\r\n   Editor = the live exam itself; a question is edited in place, like a document. Always light; ink-blue accent. */\r\n:root {\r\n  --bg: #eef1f6; --panel: #ffffff; --line: #d6dce8; --soft: #e9edf4; --text: #1a2130; --muted: #5b6577;\r\n  --ink: #1c3fae; --ink-2: #3557c9; --ink-soft: #e7ecfb; --margin: #e2777a; --warn: #9a5b00; --warn-soft: #fdf3e1; --ok: #1d8150;\r\n  --f-ui: \"Assistant\", \"Noto Sans Hebrew\", \"Segoe UI\", Arial, sans-serif;\r\n  --f-text: \"Frank Ruhl Libre\", \"Noto Serif Hebrew\", \"David\", serif;\r\n  color-scheme: light;\r\n}\r\nhtml, body { height: 100%; }\r\nbody { background: var(--bg); color: var(--text); font-family: var(--f-ui); font-size: 15px; margin: 0; }\r\nbody::before { content: \"\"; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 50; background: var(--panel); }\r\n* { box-sizing: border-box; }\r\n[hidden] { display: none !important; }\r\nbutton, input, select, textarea { font: inherit; color: inherit; }\r\nbutton { cursor: pointer; }\r\n:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }\r\n.gut { padding-left: max(20px, env(safe-area-inset-left, 0px)); padding-right: max(20px, env(safe-area-inset-right, 0px)); }\r\n.btn { border: 1px solid var(--line); background: var(--panel); border-radius: 9px; padding: 7px 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }\r\n.btn:hover { border-color: var(--ink); }\r\n.btn.primary { background: var(--ink); border-color: var(--ink); color: #fff; }\r\n.btn.primary:hover { background: var(--ink-2); }\r\n.btn.ghost { border-color: transparent; background: transparent; }\r\n.btn.ghost:hover { background: var(--soft); border-color: transparent; }\r\n.btn.small { padding: 3px 10px; font-size: .86rem; border-radius: 7px; }\r\n.btn.danger { color: #b3261e; }\r\n.btn:disabled { opacity: .45; cursor: default; }\r\n.filebtn { position: relative; }\r\n.filebtn input { position: absolute; width: 1px; height: 1px; opacity: 0; }\r\n.filebtn:focus-within { outline: 2px solid var(--ink); outline-offset: 2px; }\r\n\r\n/* ===================== HOME ===================== */\r\n#home { min-height: 100%; overflow: auto; height: 100%; }\r\n.hero { position: relative; background: var(--panel); border-bottom: 1px solid var(--line); overflow: hidden;\r\n  background-image: repeating-linear-gradient(to bottom, transparent 0 31px, #dfe6f3 31px 32px); }\r\n.hero::after { content: \"\"; position: absolute; top: 0; bottom: 0; right: max(44px, 6vw); width: 2px; background: var(--margin); opacity: .55; }\r\n.hero-in { position: relative; z-index: 1; max-width: 1120px; margin: 0 auto; padding-block: 34px 30px; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 28px; align-items: center; }\r\n.kicker { font-size: .82rem; font-weight: 800; letter-spacing: .04em; color: var(--ink); background: var(--ink-soft); border-radius: 99px; padding: 3px 12px; display: inline-block; }\r\n.hero h1 { font-family: var(--f-text); font-weight: 900; font-size: clamp(2rem, 4.2vw, 3.1rem); line-height: 1.12; margin: 12px 0 10px; text-wrap: balance; }\r\n.hero h1 em { font-style: normal; color: var(--ink); }\r\n.hero p.lead { margin: 0; font-size: 1.08rem; line-height: 1.65; color: var(--muted); max-width: 46ch; }\r\n.steps { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 16px; font-size: .9rem; color: var(--muted); }\r\n.steps span b { display: inline-grid; place-items: center; width: 1.6em; height: 1.6em; border-radius: 50%; background: var(--ink); color: #fff; font-size: .8rem; margin-left: 6px; }\r\n.upcard { background: var(--panel); border: 2px dashed #9fb0dc; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; box-shadow: 0 10px 30px rgba(28,63,174,.08); transition: border-color .15s, background .15s; }\r\n.upcard.over { border-color: var(--ink); background: var(--ink-soft); }\r\n.upcard h2 { margin: 0; font-family: var(--f-text); font-size: 1.4rem; }\r\n.upcard p { margin: 0; color: var(--muted); line-height: 1.55; }\r\n.upcard .row { display: flex; flex-wrap: wrap; gap: 8px; }\r\n.upcard .btn.primary { padding: 10px 18px; font-size: 1.02rem; }\r\n.libbar { max-width: 1120px; margin: 0 auto; padding-block: 26px 10px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; }\r\n.libbar h2 { margin: 0; font-family: var(--f-text); font-size: 1.6rem; }\r\n.libbar .count { color: var(--muted); font-variant-numeric: tabular-nums; }\r\n.libbar .grow { flex: 1; }\r\n.search { border: 1px solid var(--line); background: var(--panel); border-radius: 9px; padding: 7px 12px; min-width: 0; width: 15em; }\r\n.where { font-size: .8rem; color: var(--muted); background: var(--panel); border: 1px solid var(--line); border-radius: 99px; padding: 3px 10px; }\r\n.lib { max-width: 1120px; margin: 0 auto; padding-bottom: 50px; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 18px; }\r\n.sheetcard { position: relative; text-align: right; background: var(--panel); border: 1px solid var(--line); border-radius: 4px 14px 14px 14px; padding: 18px 18px 14px; display: flex; flex-direction: column; gap: 8px; min-height: 196px;\r\n  box-shadow: 0 1px 0 #fff inset, 4px 4px 0 -1px #f7f8fb, 4px 4px 0 0 var(--line), 0 6px 18px rgba(20,30,60,.06); transition: transform .15s, box-shadow .15s; cursor: pointer; }\r\n.sheetcard:hover { transform: translateY(-3px); box-shadow: 4px 4px 0 -1px #f7f8fb, 4px 4px 0 0 var(--line), 0 14px 28px rgba(20,30,60,.12); }\r\n@media (prefers-reduced-motion: reduce) { .sheetcard, .sheetcard:hover { transition: none; transform: none; } }\r\n.sheetcard::before { content: \"\"; position: absolute; top: 0; bottom: 0; right: 14px; width: 1.5px; background: var(--margin); opacity: .45; }\r\n.sheetcard .t { font-family: var(--f-text); font-weight: 700; font-size: 1.22rem; line-height: 1.3; margin-right: 10px; text-wrap: balance; }\r\n.sheetcard .st { color: var(--muted); font-size: .9rem; margin-right: 10px; }\r\n.sheetcard .lines { flex: 1; margin-right: 10px; background-image: repeating-linear-gradient(to bottom, transparent 0 13px, #e3e8f2 13px 14px); min-height: 28px; opacity: .9; }\r\n.sheetcard .meta { display: flex; flex-wrap: wrap; gap: 5px; margin-right: 10px; }\r\n.tag { font-size: .76rem; font-weight: 700; color: var(--muted); background: var(--soft); border-radius: 99px; padding: 2px 9px; }\r\n.tag.blue { color: var(--ink); background: var(--ink-soft); }\r\n.sheetcard .foot { display: flex; align-items: center; gap: 4px; margin-right: 10px; font-size: .8rem; color: var(--muted); }\r\n.sheetcard .foot .grow { flex: 1; }\r\n.ico { border: 0; background: none; border-radius: 7px; padding: 3px 8px; color: var(--muted); font-size: .82rem; font-weight: 600; }\r\n.ico:hover { background: var(--soft); color: var(--text); }\r\n.ico.del:hover, .ico.armed { color: #b3261e; background: #fdecea; }\r\n.newcard { border: 2px dashed var(--line); background: transparent; box-shadow: none; align-items: center; justify-content: center; text-align: center; color: var(--muted); font-weight: 700; gap: 6px; }\r\n.newcard:hover { border-color: var(--ink); color: var(--ink); box-shadow: none; }\r\n.newcard big { font-size: 2rem; line-height: 1; }\r\n.empty-lib { grid-column: 1 / -1; text-align: center; color: var(--muted); padding: 30px 10px; border: 2px dashed var(--line); border-radius: 14px; }\r\n.empty-lib b { display: block; font-family: var(--f-text); font-size: 1.3rem; color: var(--text); margin-bottom: 4px; }\r\n@media (max-width: 820px) { .hero-in { grid-template-columns: minmax(0, 1fr); } .search { width: 100%; } }\r\n\r\n/* ===================== EDITOR ===================== */\r\n#editor { height: 100%; display: grid; grid-template-rows: auto auto minmax(0, 1fr); }\r\n.ebar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; background: var(--panel); border-bottom: 1px solid var(--line); padding-block: 8px; }\r\n.etitle { font-family: var(--f-text); font-weight: 700; font-size: 1.2rem; border: 1px solid transparent; border-radius: 7px; padding: 2px 8px; min-width: 6em; max-width: 30em; background: transparent; }\r\n.etitle:hover { border-color: var(--line); }\r\n.etitle:focus { border-color: var(--ink); outline: none; background: #fff; }\r\n.saved { font-size: .8rem; color: var(--muted); white-space: nowrap; }\r\n.saved.ok::before { content: \"✓ \"; color: var(--ok); }\r\n.ebar .grow { flex: 1; }\r\n.ask { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; background: linear-gradient(90deg, var(--ink-soft), #f3f0fb); border-bottom: 1px solid var(--line); padding-block: 8px; }\r\n.ask form { flex: 1 1 440px; display: flex; gap: 8px; min-width: 0; align-items: center; }\r\n.ask label { font-weight: 800; color: var(--ink); white-space: nowrap; font-size: .92rem; }\r\n.ask input { flex: 1; min-width: 0; border: 1px solid var(--line); border-radius: 9px; padding: 8px 12px; background: #fff; font-size: .98rem; }\r\n.ask .stat { font-size: .84rem; color: var(--muted); }\r\n.ask .warn { color: var(--warn); font-weight: 600; }\r\n.work { display: grid; grid-template-columns: minmax(0, 1fr); min-height: 0; position: relative; }\r\n.work.drawer-open { grid-template-columns: minmax(0, 1fr) min(440px, 42vw); }\r\n#pv { min-height: 0; min-width: 0; }\r\n.drawer { background: var(--panel); border-right: 1px solid var(--line); display: flex; flex-direction: column; min-height: 0; min-width: 0; box-shadow: 8px 0 30px rgba(20,30,60,.08); }\r\n.dr-h { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-bottom: 1px solid var(--line); }\r\n.dr-h h2 { margin: 0; font-family: var(--f-text); font-size: 1.25rem; flex: 1; }\r\n.dr-b { flex: 1; overflow: auto; padding: 14px; display: flex; flex-direction: column; gap: 12px; }\r\n.x { border: 0; background: none; color: var(--muted); font-size: 1.4rem; line-height: 1; width: 1.6em; height: 1.6em; border-radius: 6px; }\r\n.x:hover { background: var(--soft); color: var(--text); }\r\n.f { display: flex; flex-direction: column; gap: 4px; font-size: .8rem; color: var(--muted); font-weight: 600; min-width: 0; }\r\n.f input, .f select, .f textarea { border: 1px solid var(--line); border-radius: 8px; padding: 7px 10px; background: #fff; font-size: .95rem; color: var(--text); font-weight: 400; width: 100%; }\r\n.f textarea { font-family: var(--f-text); font-size: 1.02rem; line-height: 1.6; resize: vertical; }\r\n.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }\r\n.sw { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 8px 10px; border: 1px solid var(--line); border-radius: 10px; }\r\n.sw:hover { border-color: #b8c3dc; }\r\n.sw input { position: absolute; opacity: 0; width: 1px; height: 1px; }\r\n.sw i { flex: none; width: 38px; height: 22px; border-radius: 99px; background: #c8cfdc; position: relative; transition: background .15s; margin-top: 1px; }\r\n.sw i::after { content: \"\"; position: absolute; top: 3px; right: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: right .15s; box-shadow: 0 1px 2px rgba(0,0,0,.2); }\r\n.sw input:checked + i { background: var(--ink); }\r\n.sw input:checked + i::after { right: 19px; }\r\n.sw input:focus-visible + i { outline: 2px solid var(--ink); outline-offset: 2px; }\r\n.sw span { font-weight: 700; line-height: 1.35; }\r\n.sw small { display: block; font-weight: 400; color: var(--muted); font-size: .82rem; }\r\n.art-card { border: 1px solid var(--line); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px; }\r\n.art-card .h { display: flex; align-items: center; gap: 6px; }\r\n.art-card .h b { flex: 1; font-size: .85rem; color: var(--muted); }\r\n.notes { background: var(--warn-soft); border: 1px solid #f0d9ae; border-radius: 10px; padding: 9px 12px; font-size: .86rem; color: var(--warn); }\r\n\r\n/* ---------- in-place question editor ---------- */\r\n.xm-q.editing { padding: 0; overflow: visible; border-color: var(--ink); box-shadow: 0 0 0 3px var(--ink-soft), var(--shadow); }\r\n.qe { display: flex; flex-direction: column; font-family: var(--f-ui); font-size: 15px; }\r\n.qe-top { position: sticky; top: 0; z-index: 5; background: var(--panel); border-bottom: 1px solid var(--line); border-radius: 10px 10px 0 0; padding: 8px 12px; display: flex; flex-direction: column; gap: 8px; }\r\n.qe-r1 { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }\r\n.qe-r1 .num { display: inline-flex; align-items: center; gap: 4px; font-weight: 800; color: var(--ink); }\r\n.qe-r1 .num input { width: 3.2em; font-family: var(--f-text); font-weight: 700; font-size: 1.1rem; border: 1px solid var(--line); border-radius: 7px; padding: 1px 6px; text-align: center; }\r\n.qe-r1 .grow { flex: 1; }\r\n.fmt { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 5px 6px; background: var(--bg); border-radius: 9px; }\r\n.fmt.off { opacity: .55; }\r\n.fmt .lbl { font-size: .76rem; font-weight: 800; color: var(--muted); margin-left: 2px; }\r\n.fb { border: 1px solid var(--line); background: var(--panel); border-radius: 7px; padding: 2px 9px; font-size: .85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }\r\n.fb:hover { border-color: var(--ink); color: var(--ink); }\r\n.fb .pv { font-size: .78rem; color: var(--ink); background: var(--ink-soft); border-radius: 4px; padding: 0 5px; }\r\n.qe-ask { display: flex; gap: 6px; align-items: center; }\r\n.qe-ask span { font-weight: 800; font-size: .85rem; color: var(--ink); white-space: nowrap; }\r\n.qe-ask input { flex: 1; min-width: 0; border: 1px solid var(--line); border-radius: 8px; padding: 5px 10px; font-size: .92rem; background: #fff; }\r\n.qe-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 12px; }\r\n.qe-sec { border: 1px solid var(--soft); border-radius: 12px; padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 10px; background: #fcfdff; }\r\n.qe-sec.intro { background: var(--bg); border-style: dashed; }\r\n.qe-sh { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }\r\n.qe-sh .lab { display: inline-flex; align-items: center; gap: 3px; font-size: .8rem; font-weight: 700; color: var(--muted); }\r\n.qe-sh input { border: 1px solid var(--line); border-radius: 7px; padding: 1px 6px; width: 3.6em; text-align: center; font-family: var(--f-text); font-weight: 700; font-size: 1rem; background: #fff; }\r\n.qe-sh .grow { flex: 1; }\r\n.qe-b { position: relative; border-radius: 10px; padding: 6px 8px; border: 1px solid transparent; }\r\n.qe-b:hover, .qe-b:focus-within { border-color: var(--line); background: #fff; }\r\n.qe-b .tools { position: absolute; top: -12px; left: 8px; display: none; gap: 2px; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 1px 3px; box-shadow: 0 2px 8px rgba(20,30,60,.08); }\r\n.qe-b:hover .tools, .qe-b:focus-within .tools { display: flex; }\r\n.qe-b .kind { font-size: .72rem; font-weight: 800; color: var(--muted); padding: 1px 6px; align-self: center; }\r\n.rich { font-family: var(--f-text); font-size: 1.08rem; line-height: 2; min-height: 1.9em; padding: 2px 6px; border-radius: 6px; outline: none; white-space: pre-wrap; }\r\n.rich:focus { background: #fff; box-shadow: 0 0 0 2px var(--ink-soft); }\r\n.rich:empty::before { content: attr(data-ph); color: #9aa3b5; font-family: var(--f-ui); font-size: .92rem; }\r\n.rich.passage { background: var(--bg); border: 1px solid var(--soft); padding: 8px 12px; }\r\n.tk { display: inline-flex; align-items: center; gap: 4px; vertical-align: 1px; margin: 0 2px; padding: 0 8px; border-radius: 6px; font-family: var(--f-ui); font-size: .85rem; font-weight: 700; line-height: 1.75; cursor: pointer; user-select: none; border: 1.5px dashed #8ea0d8; color: var(--ink); background: #f5f7fe; white-space: nowrap; }\r\n.tk:hover { background: var(--ink-soft); border-style: solid; }\r\n.tk.ch { border-style: solid; border-radius: 99px; }\r\n.tk.ls::after { content: \"▾\"; font-size: .8em; }\r\n.tk.ab { flex-direction: column; gap: 0; line-height: 1.25; padding: 1px 8px; vertical-align: -6px; }\r\n.tk.ab small { font-size: .7rem; color: var(--muted); font-weight: 700; }\r\n.tk.ab b { font-family: var(--f-text); font-size: 1rem; color: var(--text); }\r\n.tk.rf { border-style: solid; background: var(--panel); }\r\n.tk.im { padding: 2px; background: var(--panel); }\r\n.tk.im img { display: block; max-height: 90px; max-width: 220px; border-radius: 4px; }\r\n.tk.bx { border: 1.5px solid var(--text); border-radius: 2px; background: none; color: var(--text); font-family: var(--f-text); font-weight: 500; }\r\n.tk.rt { letter-spacing: .05em; }\r\n.opt-ed { display: flex; flex-direction: column; gap: 6px; }\r\n.opt-row { display: flex; align-items: center; gap: 8px; }\r\n.opt-row .ml { flex: none; display: inline-grid; place-items: center; width: 1.75em; height: 1.75em; border-radius: 50%; border: 1.5px solid var(--muted); font-weight: 700; font-size: .85rem; color: var(--muted); }\r\n.opt-row input, .li-in { flex: 1; border: 1px solid var(--line); border-radius: 8px; padding: 6px 10px; font-family: var(--f-text); font-size: 1.04rem; background: #fff; min-width: 0; }\r\n.addline { align-self: flex-start; border: 1px dashed var(--line); background: none; border-radius: 8px; padding: 3px 10px; color: var(--ink); font-weight: 700; font-size: .86rem; }\r\n.addline:hover { border-color: var(--ink); background: var(--ink-soft); }\r\n.ansbox { border: 1.5px dashed var(--empty); border-radius: 8px; background: var(--paper); color: var(--muted); display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 12px; font-size: .9rem; flex-wrap: wrap; }\r\n.seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #fff; }\r\n.seg button { border: 0; background: none; padding: 3px 10px; font-size: .84rem; font-weight: 600; color: var(--muted); }\r\n.seg button + button { border-right: 1px solid var(--line); }\r\n.seg button[aria-pressed=\"true\"] { background: var(--ink-soft); color: var(--ink); }\r\n.numin { width: 4.6em; border: 1px solid var(--line); border-radius: 7px; padding: 2px 6px; text-align: center; background: #fff; }\r\n.ted { overflow-x: auto; }\r\n.ted table { border-collapse: collapse; width: 100%; }\r\n.ted td { border: 1px solid var(--line); padding: 0; vertical-align: top; min-width: 7em; }\r\n.ted tr.head td { background: var(--paper); }\r\n.ted tr.head .rich { font-family: var(--f-ui); font-weight: 700; font-size: .92rem; }\r\n.ted .rich { min-height: 2.4em; line-height: 1.8; border-radius: 0; }\r\n.ted .rich:empty::before { content: \"משבצת לתשובה\"; color: #8ea0d8; font-weight: 700; font-size: .8rem; }\r\n.ted tr.head .rich:empty::before { content: \"כותרת\"; }\r\n.ted-bar { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }\r\n.chips-ed { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 6px; border: 1px solid var(--line); border-radius: 9px; background: #fff; }\r\n.chips-ed .c { display: inline-flex; align-items: center; gap: 4px; font-family: var(--f-text); font-weight: 700; background: var(--soft); border-radius: 7px; padding: 1px 4px 1px 9px; }\r\n.chips-ed .c button { border: 0; background: none; color: var(--muted); font-size: 1rem; line-height: 1; padding: 0 3px; border-radius: 4px; }\r\n.chips-ed .c button:hover { color: #b3261e; }\r\n.chips-ed input { flex: 1; min-width: 8em; border: 0; outline: none; font-family: var(--f-text); font-size: 1rem; padding: 3px; }\r\n.cap { font-size: .8rem; color: var(--muted); }\r\n.row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }\r\n.addmenu { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 6px; padding: 8px; background: var(--bg); border-radius: 10px; }\r\n.addmenu button { text-align: right; border: 1px solid var(--line); background: var(--panel); border-radius: 9px; padding: 7px 10px; display: flex; flex-direction: column; gap: 1px; }\r\n.addmenu button:hover { border-color: var(--ink); }\r\n.addmenu b { font-size: .9rem; }\r\n.addmenu small { color: var(--muted); font-size: .76rem; line-height: 1.3; }\r\n\r\n/* popover */\r\n.pop { position: fixed; z-index: 60; background: var(--panel); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 12px 34px rgba(20,30,60,.18); padding: 12px; width: min(320px, calc(100vw - 24px)); display: flex; flex-direction: column; gap: 8px; }\r\n.pop h3 { margin: 0; font-size: .95rem; }\r\n.pop .f input, .pop .f select { font-size: .95rem; }\r\n.pop .lists { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; max-height: 260px; overflow: auto; }\r\n.pop .lists button { text-align: right; border: 1px solid var(--line); background: #fff; border-radius: 7px; padding: 4px 8px; font-size: .86rem; font-weight: 600; }\r\n.pop .lists button:hover { border-color: var(--ink); color: var(--ink); }\r\n.pop .row { justify-content: space-between; }\r\n\r\n/* modal + misc */\r\n.ov { position: fixed; inset: 0; background: rgba(10, 15, 25, .45); display: grid; place-items: center; z-index: 70;\r\n  padding: max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px)) max(16px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px)); }\r\n.modal { background: var(--panel); border-radius: 14px; width: min(600px, 100%); max-height: 100%; overflow: auto; padding: 22px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 10px 40px rgba(0,0,0,.2); }\r\n.modal h2 { margin: 0; font-family: var(--f-text); font-size: 1.35rem; }\r\n.modal p { margin: 0; line-height: 1.6; }\r\n.modal ol { margin: 0; padding-right: 20px; line-height: 1.7; }\r\n.modal textarea { width: 100%; min-height: 9em; font-family: monospace; font-size: .75rem; direction: ltr; }\r\n.spin { display: inline-block; width: 15px; height: 15px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; animation: sp .8s linear infinite; vertical-align: -2px; }\r\n@keyframes sp { to { transform: rotate(360deg); } }\r\n@media (prefers-reduced-motion: reduce) { .spin { animation: none; } }\r\n.drop-hint { position: fixed; inset: 0; z-index: 80; background: rgba(28, 63, 174, .12); border: 3px dashed var(--ink); display: grid; place-items: center; font-size: 1.4rem; font-weight: 800; color: var(--ink); pointer-events: none; }\r\n@media (max-width: 900px) {\r\n  .work.drawer-open { grid-template-columns: minmax(0, 1fr); }\r\n  .drawer { position: absolute; inset: 0; z-index: 20; }\r\n  .grid2 { grid-template-columns: minmax(0, 1fr); }\r\n}\r\n</style>");
  document.body.insertAdjacentHTML('beforeend', "<div id=\"app\" dir=\"rtl\" lang=\"he\" style=\"height:100%\">\r\n  <!-- HOME -->\r\n  <section id=\"home\" aria-label=\"המבחנים שלי\">\r\n    <div class=\"hero gut\">\r\n      <div class=\"hero-in\">\r\n        <div>\r\n          <span class=\"kicker\">מבחני לשון י״א–י״ב · בהקלדה</span>\r\n          <h1 id=\"hello\">כל מבחן ב-Word הופך<br><em>למבחן נוח להקלדה</em></h1>\r\n          <p class=\"lead\" id=\"lead\">מעלים את קובץ המבחן, Claude ממיר אותו עם משבצות, ניקוד, טבלאות ומאמרים, ואתם רק בודקים ומתקנים. כל המבחנים נשמרים כאן.</p>\r\n          <div class=\"steps\"><span><b>1</b>מעלים Word</span><span><b>2</b>בודקים ומתקנים</span><span><b>3</b>מורידים קובץ לתלמידים</span></div>\r\n        </div>\r\n        <div class=\"upcard\" id=\"upcard\">\r\n          <h2>מבחן חדש</h2>\r\n          <p>גררו לכאן את קובץ המבחן (Word ‎.docx או PDF), או בחרו אותו מהמחשב.</p>\r\n          <div class=\"row\">\r\n            <label class=\"btn primary filebtn\">בחירת קובץ<input type=\"file\" id=\"file\" accept=\".docx,.pdf,.html,.htm\"></label>\r\n            <button type=\"button\" class=\"btn\" data-home=\"blank\">מבחן ריק</button>\r\n            <button type=\"button\" class=\"btn ghost\" data-home=\"sample\">פתיחת דוגמה</button>\r\n            <button type=\"button\" class=\"btn\" id=\"aiSetBtn\" hidden>חיבור ל-Gemini</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"libbar gut\">\r\n      <h2>המבחנים שלי</h2><span class=\"count\" id=\"libCount\"></span>\r\n      <span class=\"grow\"></span>\r\n      <input class=\"search\" id=\"search\" type=\"search\" placeholder=\"חיפוש מבחן…\" aria-label=\"חיפוש מבחן\">\r\n      <span class=\"where\" id=\"where\"></span>\r\n      <button type=\"button\" class=\"btn small\" id=\"backupBtn\">גיבוי</button>\r\n      <label class=\"btn small filebtn\">שחזור<input type=\"file\" id=\"restoreIn\" accept=\".json\"></label>\r\n    </div>\r\n    <div class=\"lib gut\" id=\"lib\" aria-live=\"polite\"></div>\r\n  </section>\r\n\r\n  <!-- EDITOR -->\r\n  <section id=\"editor\" hidden aria-label=\"עריכת מבחן\">\r\n    <header class=\"ebar gut\">\r\n      <button type=\"button\" class=\"btn ghost\" id=\"backHome\">→ המבחנים שלי</button>\r\n      <input class=\"etitle\" id=\"etitle\" aria-label=\"שם המבחן\">\r\n      <span class=\"saved\" id=\"saved\"></span>\r\n      <span class=\"grow\"></span>\r\n      <button type=\"button\" class=\"btn ghost\" id=\"undoBtn\" disabled>↶ ביטול</button>\r\n      <button type=\"button\" class=\"btn\" data-open=\"settings\">הגדרות</button>\r\n      <button type=\"button\" class=\"btn\" data-open=\"texts\" id=\"textsBtn\">מאמרים</button>\r\n      <button type=\"button\" class=\"btn primary\" id=\"exportBtn\">הורדה לתלמידים</button>\r\n    </header>\r\n    <div class=\"ask gut\">\r\n      <form id=\"askForm\"><label for=\"askIn\" id=\"askLabel\">✦ בקשו מ-Claude</label><input id=\"askIn\" type=\"text\" autocomplete=\"off\" placeholder=\"למשל: שאלה 7 תהיה אמריקאית · תמחק את פרק התחביר · בכל הטבלאות תוסיף עמודת גזרה\"><button type=\"submit\" class=\"btn primary\">שינוי</button></form>\r\n      <span class=\"stat\" id=\"stat\"></span>\r\n    </div>\r\n    <div class=\"work\" id=\"work\">\r\n      <div id=\"pv\"></div>\r\n      <aside class=\"drawer\" id=\"drawer\" hidden aria-label=\"הגדרות\"></aside>\r\n    </div>\r\n  </section>\r\n</div>\r\n<div class=\"drop-hint\" id=\"dropHint\" hidden>שחררו כאן את קובץ המבחן</div>\r\n<div class=\"ov\" id=\"modal\" hidden><div class=\"modal\" role=\"dialog\" aria-modal=\"true\" id=\"modalIn\"></div></div>\r\n<div class=\"pop\" id=\"pop\" hidden role=\"dialog\"></div>\r\n\r\n");
  // the exported exam file needs the exam runtime as text
  const rt = document.createElement('script'); rt.type = 'text/plain'; rt.id = 'xm-runtime'; rt.textContent = "/* Exam runtime: renders an exam described as data into a typing-friendly exam.\r\n   Text tokens:  ___ blank · {a / b / c} choose one · [שורש] root boxes · **bold**\r\n                 [בניין] [גזרה] [תפקיד] [חלק דיבר] [סוג משפט] [פסוקית] [קשר לוגי] [תצורה] [זמן] [גוף] [מין ומספר] ready-made lists\r\n                 [רשימה:א / ב / ג] a list of your own · [מעל:מילה] box above a word · [מעל:מילה|תפקיד] list above a word\r\n                 [מאמר 2, פס' 3] or [מאמר 2, פסקה ג] link to an article · [קו:מילים] underlined · [מסגרת:מילים] boxed\r\n                 [תמונה:img1] a picture from data.images\r\n   Blocks: text · passage · mc (num: options (1), (2)…) · long · table · essay · mark (click words) · split (mark boundaries;\r\n           label: a list name or \"free\", to name every part) · punct (add punctuation) · sort · match · img\r\n   Parts: alt (parts with the same alt are alternatives: answer one) · pick (answer only that many of the questions) */\r\nconst XM_BINYANIM = ['פָּעַל (קל)', 'נִפְעַל', 'פִּעֵל', 'פֻּעַל', 'הִפְעִיל', 'הֻפְעַל', 'הִתְפַּעֵל'];\r\nconst XM_LISTS = {\r\n  'בניין': XM_BINYANIM,\r\n  'גזרה': ['שלמים', 'פ\"נ', 'פ\"י / פ\"ו', 'פ\"א', 'ע\"ו / ע\"י', 'ל\"ה / ל\"י', 'ל\"א', 'כפולים (ע\"ע)', 'מרובעים'],\r\n  'תפקיד': ['נושא', 'נשוא', 'אוגד', 'מושא ישיר', 'מושא עקיף', 'משלים', 'תיאור זמן', 'תיאור מקום', 'תיאור סיבה', 'תיאור תכלית', 'תיאור אופן', 'תיאור תנאי', 'תיאור ויתור', 'תיאור מצב', 'תיאור כמות', 'לוואי', 'תמורה', 'נשוא שני', 'פנייה', 'הסגר', 'מילת קישור'],\r\n  'חלק דיבר': ['שם עצם', 'שם תואר', 'פועל', 'בינוני', 'שם פועל', 'שם פעולה', 'תואר הפועל', 'כינוי גוף', 'מילת יחס', 'מילת קישור', 'שם מספר', 'מילת שאלה', 'מילת שלילה'],\r\n  'סוג משפט': ['פשוט', 'פשוט בעל חלקים כוללים', 'מורכב', 'מאוחה', 'מאוחה-מורכב'],\r\n  'פסוקית': ['פסוקית נושא', 'פסוקית נשוא', 'פסוקית מושא', 'פסוקית לוואי', 'פסוקית תיאור זמן', 'פסוקית תיאור מקום', 'פסוקית תיאור סיבה', 'פסוקית תיאור תכלית', 'פסוקית תיאור תנאי', 'פסוקית תיאור ויתור', 'פסוקית תיאור אופן', 'פסוקית תיאור השוואה', 'פסוקית תיאור תוצאה', 'פסוקית תמורה'],\r\n  'קשר לוגי': ['ניגוד', 'ויתור', 'סיבה', 'תוצאה', 'תכלית', 'תנאי', 'זמן', 'השוואה', 'הוספה', 'הסבר / פירוט', 'הדגמה', 'הסתייגות', 'ברירה', 'הכללה / סיכום'],\r\n  'תצורה': ['שורש ומשקל', 'בסיס וצורן', 'הלחם', 'ראשי תיבות', 'מילה שאולה'],\r\n  'זמן': ['עבר', 'הווה', 'עתיד', 'ציווי', 'שם הפועל'],\r\n  'גוף': ['אני', 'אתה', 'את', 'הוא', 'היא', 'אנחנו', 'אתם', 'אתן', 'הם', 'הן'],\r\n  'מין ומספר': ['זכר יחיד', 'נקבה יחידה', 'זכר רבים', 'נקבה רבות']\r\n};\r\nfunction mountExam(root, data, opts) {\r\n  opts = opts || {};\r\n  const preview = !!opts.preview;\r\n  const BINYANIM = XM_BINYANIM, LISTS = XM_LISTS;\r\n  const listOf = name => { name = String(name || '').trim(); return LISTS[name] || (/\\//.test(name) ? name.split('/').map(x => x.trim()).filter(Boolean) : null); };\r\n  const NIKUD = [['ָ', 'קמץ'], ['ַ', 'פתח'], ['ֵ', 'צירה'], ['ֶ', 'סגול'], ['ִ', 'חיריק'], ['ֹ', 'חולם'], ['ֻ', 'קובוץ'], ['ּ', 'דגש/שורוק'], ['ְ', 'שווא'], ['ֲ', 'חטף פתח'], ['ֱ', 'חטף סגול'], ['ֳ', 'חטף קמץ'], ['ׁ', 'שׁ ימנית', 'ש'], ['ׂ', 'שׂ שמאלית', 'ש'], ['־', 'מקף', '']];\r\n  const esc = s => String(s == null ? '' : s).replace(/[&<>\"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' }[c]));\r\n  const set = Object.assign({ nikud: true, texts: true, textsName: 'מאמרים', textItem: 'מאמר', ext: 25 }, data.settings || {});\r\n  const arts = set.texts ? (data.articles || []) : [];\r\n\r\n  let h = 0; const src = JSON.stringify(data);\r\n  for (let i = 0; i < src.length; i++) h = (h * 31 + src.charCodeAt(i)) | 0;\r\n  const KEY = 'xm-' + (h >>> 0).toString(36);\r\n  const store = {\r\n    get(k) { if (preview) return null; try { return JSON.parse(localStorage.getItem(KEY + k)); } catch (e) { return null; } },\r\n    set(k, v) { if (preview) return; try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) {} },\r\n    del(k) { try { localStorage.removeItem(KEY + k); } catch (e) {} }\r\n  };\r\n\r\n  /* ---------- build ---------- */\r\n  const S = {}, FIELD = {}, ITEMS = [], SUBS = [];\r\n  let cur = null, fc = 0;\r\n  const nf = (type, label) => { const id = 'f' + (++fc); cur.fields.push(id); FIELD[id] = { item: cur, type, label: label || '' }; return id; };\r\n  // the label of an answer place: the few words just before it, on its own line and after any earlier answer place\r\n  const ctx = (str, off) => {\r\n    const s = str.slice(Math.max(0, off - 60), off).split('\\n').pop().replace(/^[^{[]*?[}\\]]/, '').replace(/\\*\\*/g, '');\r\n    const parts = s.split(/_{3,}|\\{[^}]*\\}|\\[[^\\]]*\\]/).map(x => x.trim());\r\n    const t = parts.pop() || parts.pop() || '';\r\n    return t.split(/\\s+/).slice(-4).join(' ');\r\n  };\r\n\r\n  function field(type, label, o) {\r\n    o = o || {};\r\n    if (type === 'text') { const id = nf('text', label); o.id = id; return `<input class=\"xm-a ${o.wide ? 'wide' : 'inl'}\" data-f=\"${id}\" type=\"text\" autocomplete=\"off\" spellcheck=\"false\" aria-label=\"${esc(label || 'תשובה')}\">`; }\r\n    if (type === 'root') {\r\n      const id = nf('root', label); let s = '<span class=\"xm-root\">';\r\n      for (let i = 0; i < 4; i++) s += (i ? '<i>-</i>' : '') + `<input class=\"${i === 3 ? 'o4' : ''}\" data-rf=\"${id}\" data-i=\"${i}\" maxlength=\"2\" autocomplete=\"off\" spellcheck=\"false\" aria-label=\"${esc(label)} · אות ${i + 1}\">`;\r\n      return s + '</span>';\r\n    }\r\n    if (type === 'list') { const id = nf('text', label); o.id = id; return `<select class=\"xm-a\" data-f=\"${id}\" aria-label=\"${esc(label || 'בחירה')}\"><option value=\"\">בחרו…</option>${(o.list || []).map(b => `<option>${esc(b)}</option>`).join('')}</select>`; }\r\n  }\r\n  // words keep their **bold** marks\r\n  const fmt = w => esc(w).replace(/\\*\\*(.+?)\\*\\*/g, '<b>$1</b>').replace(/\\*\\*/g, '');\r\n  const SORTS = {}; let sortN = 0;\r\n  function choiceHtml(opts2, label, cls) {\r\n    const id = nf('choice', label);\r\n    return `<span class=\"xm-ch ${cls || ''}\" role=\"radiogroup\">${opts2.map(v => `<button type=\"button\" class=\"xm-opt\" role=\"radio\" aria-checked=\"false\" data-f=\"${id}\" data-v=\"${esc(v)}\">${esc(v)}</button>`).join('')}</span>`;\r\n  }\r\n  const LISTNAMES = Object.keys(LISTS).join('|');\r\n  // pictures from the Word file live in data.images, by id; only real images are shown\r\n  const IMG = data.images || {};\r\n  const imgHtml = (id, cls) => /^data:image\\//.test(IMG[id] || '') ? `<img class=\"${cls || 'xm-img'}\" src=\"${IMG[id]}\" alt=\"\">` : '';\r\n  // paragraphs may be counted 1, 2, 3 or א, ב, ג (a reference may use either)\r\n  const HEBN = [[400, 'ת'], [300, 'ש'], [200, 'ר'], [100, 'ק'], [90, 'צ'], [80, 'פ'], [70, 'ע'], [60, 'ס'], [50, 'נ'], [40, 'מ'], [30, 'ל'], [20, 'כ'], [10, 'י'], [9, 'ט'], [8, 'ח'], [7, 'ז'], [6, 'ו'], [5, 'ה'], [4, 'ד'], [3, 'ג'], [2, 'ב'], [1, 'א']];\r\n  const heb = n => { if (n === 15) return 'טו'; if (n === 16) return 'טז'; let s = ''; for (const [v, l] of HEBN) while (n >= v) { s += l; n -= v; } return s; };\r\n  const parNum = p => /^\\d+$/.test(p) ? +p : [...String(p || '')].reduce((t, c) => t + ((HEBN.find(x => x[1] === c) || [0])[0]), 0);\r\n  const parLab = (A, n) => A && A.pl === 'letters' ? `פסקה ${heb(n)}` : `פס׳ ${n}`;\r\n  const TOK = new RegExp(String.raw`\\*\\*(?<b>.+?)\\*\\*|(?<blank>_{3,})|\\{(?<ch>[^{}]+?\\s\\/\\s[^{}]+?)\\}|(?<root>\\[שורש\\])|\\[(?<ls>${LISTNAMES})\\]|\\[רשימה:(?<cl>[^\\]]+)\\]|\\[מעל:(?<ab>[^\\]|]+)(?:\\|(?<abl>[^\\]]+))?\\]|\\[קו:(?<u>[^\\]]+)\\]|\\[מסגרת:(?<box>[^\\]]+)\\]|\\[תמונה:(?<img>[^\\]\\s]+)\\]|\\[(?:מאמר|טקסט|קטע)\\s*(?<art>\\d+)(?:\\s*,\\s*(?:פס['׳]?|פסקה)\\s*(?<par>\\d+|[א-ת]{1,2}))?\\]`, 'g');\r\n  function rich(text) {\r\n    const s = String(text || '');\r\n    let out = '', last = 0, m;\r\n    TOK.lastIndex = 0;\r\n    const inner = (tag, cls, v) => { const save = TOK.lastIndex; const h = `<${tag}${cls ? ` class=\"${cls}\"` : ''}>${rich(v)}</${tag}>`; TOK.lastIndex = save; return h; };\r\n    while ((m = TOK.exec(s))) {\r\n      out += esc(s.slice(last, m.index)).replace(/\\n/g, '<br>');\r\n      last = TOK.lastIndex;\r\n      const g = m.groups, label = ctx(s, m.index);\r\n      if (g.b !== undefined) out += inner('b', '', g.b);\r\n      else if (g.u !== undefined) out += inner('u', '', g.u);\r\n      else if (g.box !== undefined) out += inner('span', 'xm-box', g.box);\r\n      else if (g.img) out += imgHtml(g.img) || '';\r\n      else if (g.blank) out += field('text', label, { wide: g.blank.length > 30 });\r\n      else if (g.ch) out += choiceHtml(g.ch.split(/\\s\\/\\s/).map(x => x.trim()).filter(Boolean), label);\r\n      else if (g.root) out += field('root', label ? label + ' · שורש' : 'שורש');\r\n      else if (g.ls) out += field('list', label ? `${label} · ${g.ls}` : g.ls, { list: LISTS[g.ls] });\r\n      else if (g.cl) out += field('list', label || 'בחירה', { list: listOf(g.cl) || [g.cl] });\r\n      else if (g.ab) {\r\n        const w = g.ab.trim(), list = g.abl ? listOf(g.abl) : null;\r\n        const box = list ? field('list', `מעל ${w}`, { list }) : (() => { const id = nf('text', w); return `<input class=\"xm-a\" data-f=\"${id}\" type=\"text\" autocomplete=\"off\" spellcheck=\"false\" aria-label=\"מעל ${esc(w)}\">`; })();\r\n        out += `<span class=\"xm-lw\">${box}<b>${esc(w)}</b></span>`;\r\n      }\r\n      else if (g.art) {\r\n        const a = +g.art - 1, p = g.par ? parNum(g.par) : 0;\r\n        out += arts[a] ? `<button type=\"button\" class=\"xm-ref\" data-a=\"${a}\" data-p=\"${p || ''}\">${esc(set.textItem)} ${g.art}${p ? ` · ${parLab(arts[a], p)}` : ''}</button>` : esc(m[0]);\r\n      }\r\n    }\r\n    return out + esc(s.slice(last)).replace(/\\n/g, '<br>');\r\n  }\r\n  // article paragraphs: formatting and pictures, no answer places\r\n  const ATOK = /\\*\\*(.+?)\\*\\*|\\[קו:([^\\]]+)\\]|\\[מסגרת:([^\\]]+)\\]|\\[תמונה:([^\\]\\s]+)\\]/g;\r\n  const artText = t => esc(String(t || '')).replace(/\\[תמונה:([^\\]\\s]+)\\]/g, (x, id) => imgHtml(id) || '').replace(ATOK, (x, b, u, box) => b !== undefined ? `<b>${b}</b>` : u !== undefined ? `<u>${u}</u>` : box !== undefined ? `<span class=\"xm-box\">${box}</span>` : x).replace(/\\n/g, '<br>');\r\n  const onlyImg = t => /^\\s*\\[תמונה:[^\\]\\s]+\\]\\s*$/.test(String(t || ''));\r\n  const MARKS = ['.', ',', ';', ':', '?', '!', '–', '״', '(', ')'];\r\n  function block(b, i) {\r\n    const t = b.t || 'text';\r\n    if (t === 'passage') return `<p class=\"xm-passage\">${rich(b.v)}</p>`;\r\n    if (t === 'img') { const h = imgHtml(b.src); return h ? `<figure class=\"xm-fig\">${h}${b.cap ? `<figcaption>${esc(b.cap)}</figcaption>` : ''}</figure>` : ''; }\r\n    if (t === 'mc') {\r\n      // options labelled א, ב, ג like most exams, or (1), (2), (3) when the exam numbers them\r\n      const id = nf('choice', 'תשובה'); const L = k => b.num ? `(${k + 1})` : 'אבגדהוזחטי'[k];\r\n      return `<div class=\"xm-mc\" role=\"radiogroup\">${(b.opts || []).map((o, k) => `<button type=\"button\" class=\"xm-opt xm-mco\" role=\"radio\" aria-checked=\"false\" data-f=\"${id}\" data-v=\"${esc(L(k) + (b.num ? ' ' : '. ') + o)}\"><span class=\"xm-ml\">${L(k)}</span><span>${rich(o)}</span></button>`).join('')}</div>`;\r\n    }\r\n    if (t === 'punct') {\r\n      // a text without punctuation: the student adds a mark in the gap after any word\r\n      const words = String(b.v || '').split(/\\s+/).filter(Boolean);\r\n      const id = nf('punct', 'הפיסוק'); FIELD[id].words = words.map(w => w.replace(/\\*\\*/g, '')); FIELD[id].marks = (b.marks && b.marks.length ? b.marks : MARKS);\r\n      return `<p class=\"xm-punct\">${words.map((w, k) => `<span class=\"xm-sw\">${fmt(w)}</span><button type=\"button\" class=\"xm-pg\" data-pu=\"${id}\" data-i=\"${k}\" aria-label=\"סימן פיסוק אחרי ${esc(w.replace(/\\*\\*/g, ''))}\"></button>`).join(' ')}</p><p class=\"xm-hint\">לחצו אחרי מילה כדי להוסיף שם סימן פיסוק. לחיצה על סימן קיים מאפשרת להחליף או למחוק אותו.</p>`;\r\n    }\r\n    if (t === 'long') { const id = nf('text', 'תשובה'); return `<textarea class=\"xm-a\" data-f=\"${id}\" rows=\"${b.rows || 3}\" spellcheck=\"false\" placeholder=\"כתבו כאן את התשובה\" aria-label=\"תשובה\"></textarea>`; }\r\n    if (t === 'essay') {\r\n      const id = nf('text', 'חיבור'); FIELD[id].essay = { min: +b.min || 0, max: +b.max || 0 };\r\n      return `<div class=\"xm-essay\"><textarea class=\"xm-a\" data-f=\"${id}\" rows=\"${b.rows || 14}\" spellcheck=\"false\" placeholder=\"כתבו כאן\" aria-label=\"חיבור\"></textarea><div class=\"xm-wc\" data-wc=\"${id}\"></div></div>`;\r\n    }\r\n    if (t === 'mark' || t === 'split') {\r\n      const words = String(b.v || '').split(/\\s+/).filter(Boolean);\r\n      const id = nf('set', t === 'mark' ? 'המילים שסומנו' : 'החלוקה'); FIELD[id].words = words.map(w => w.replace(/\\*\\*/g, '')); FIELD[id].kind = t;\r\n      if (t === 'mark') return `<p class=\"xm-mark\">${words.map((w, k) => `<button type=\"button\" class=\"xm-w\" data-mk=\"${id}\" data-i=\"${k}\" aria-pressed=\"false\">${fmt(w)}</button>`).join(' ')}</p><p class=\"xm-hint\">לחצו על מילה כדי לסמן אותה, ולחיצה נוספת מבטלת.</p>`;\r\n      // with a label, every part between the boundaries also gets a role, a clause type or free text\r\n      if (b.label) FIELD[id].seg = { name: b.label === 'free' ? '' : b.label, list: b.label === 'free' ? null : listOf(b.label) };\r\n      const segHint = b.label ? ` אחר כך ציינו ליד כל חלק את ${b.label === 'free' ? 'מה שנדרש' : 'ה' + b.label}.` : '';\r\n      return `<p class=\"xm-split\">${words.map((w, k) => `<span class=\"xm-sw\">${fmt(w)}</span>` + (k < words.length - 1 ? `<button type=\"button\" class=\"xm-gap\" data-sp=\"${id}\" data-i=\"${k}\" aria-pressed=\"false\" aria-label=\"גבול אחרי ${esc(w.replace(/\\*\\*/g, ''))}\"></button>` : '')).join('')}</p>${b.label ? `<div class=\"xm-segs\" data-segs=\"${id}\"></div>` : ''}<p class=\"xm-hint\">לחצו על הרווח בין שתי מילים כדי לסמן שם גבול (/), ולחיצה נוספת מבטלת.${segHint}</p>`;\r\n    }\r\n    if (t === 'sort') {\r\n      const items = (b.items || []).filter(Boolean), n = Math.max(2, Math.min(5, +b.cols || 2)), sid = 'srt' + (++sortN);\r\n      const hl = b.head && listOf(b.head), heads = [];\r\n      let cols = '';\r\n      for (let c = 0; c < n; c++) {\r\n        const o = { wide: true, list: hl };\r\n        const head = hl ? field('list', `כותרת עמודה ${c + 1}`, o) : field('text', `כותרת עמודה ${c + 1}`, o);\r\n        heads.push(o.id);\r\n        const mean = b.meaning ? `<label class=\"xm-sm\">המשמעות המשותפת${field('text', `משמעות עמודה ${c + 1}`, { wide: true })}</label>` : '';\r\n        cols += `<div class=\"xm-scol\"><label class=\"xm-sh2\">${esc(b.headLabel || (hl ? b.head : 'כותרת'))}${head}</label><div class=\"xm-drop\" data-sort=\"${sid}\" data-col=\"${c}\"></div>${mean}</div>`;\r\n      }\r\n      const ids = items.map(w => { const id = nf('sort', w.replace(/\\*\\*/g, '')); FIELD[id].sort = { sid, heads }; return id; });\r\n      SORTS[sid] = { ids, items };\r\n      return `<div class=\"xm-sorter\" data-sorter=\"${sid}\"><p class=\"xm-hint\">לחצו על מילה ואז על העמודה שלה (אפשר גם לגרור). לחיצה על המאגר מחזירה אותה.</p><div class=\"xm-pool xm-drop\" data-sort=\"${sid}\" data-col=\"\"></div><div class=\"xm-scols\" style=\"--n:${n}\">${cols}</div></div>`;\r\n    }\r\n    if (t === 'match') {\r\n      const right = (b.right || []).filter(Boolean);\r\n      return `<div class=\"xm-tw\"><table class=\"xm-grid xm-match\"><tbody>${(b.left || []).filter(Boolean).map(l => `<tr><td>${rich(l)}</td><td>${field('list', String(l).replace(/\\*\\*/g, ''), { list: right })}</td></tr>`).join('')}</tbody></table></div>`;\r\n    }\r\n    if (t === 'table') {\r\n      const rows = b.rows || []; const head = b.head !== false && rows.length > 1;\r\n      const cell = (c, r, k) => {\r\n        const txt = String(c == null ? '' : c);\r\n        if (!txt.trim()) return field('text', `${(rows[r] && rows[r][0]) || ''} · ${(head && rows[0][k]) || 'עמודה ' + (k + 1)}`.replace(/^ · /, ''), { wide: true });\r\n        return rich(txt);\r\n      };\r\n      return `<div class=\"xm-tw\"><table class=\"xm-grid\">${head ? `<thead><tr>${rows[0].map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${rows.slice(head ? 1 : 0).map((r, ri) => `<tr>${r.map((c, k) => `<td>${cell(c, ri + (head ? 1 : 0), k)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;\r\n    }\r\n    return `<p class=\"xm-t\">${rich(b.v)}</p>`;\r\n  }\r\n  const ptsTxt = p => (p || p === 0) && p !== '' ? `<span class=\"xm-pts\">${p} נק׳</span>` : '';\r\n\r\n  let sheet = '';\r\n  if (data.instructions && data.instructions.length) sheet += `<details class=\"xm-instr\" open><summary>הוראות לנבחן</summary>${data.instructions.map(l => `<p>${artText(l)}</p>`).join('')}</details>`;\r\n  // choices: parts that share an \"alt\" group are alternatives (the student answers one of them),\r\n  // and a part with \"pick\" asks for only that many of its questions\r\n  const PARTS = data.parts || [], ALT = {};\r\n  PARTS.forEach((p, pi) => { if (p.alt) (ALT[p.alt] = ALT[p.alt] || []).push(pi); });\r\n  const altOf = pi => { const g = PARTS[pi] && PARTS[pi].alt; return g && ALT[g].length > 1 ? g : ''; };\r\n  const pickOf = pi => { const p = PARTS[pi], n = Math.floor(+(p && p.pick) || 0); return n > 0 && n < (p.qs || []).length ? n : 0; };\r\n  PARTS.forEach((part, pi) => {\r\n    const grp = altOf(pi);\r\n    if (grp && ALT[grp][0] === pi) sheet += `<div class=\"xm-alt\" data-alt=\"${esc(grp)}\"><b>בפרקים הבאים בוחרים פרק אחד. באיזה פרק תענו?</b><div class=\"xm-row\">${ALT[grp].map(k => `<button type=\"button\" class=\"xm-btn\" data-altp=\"${k}\" aria-pressed=\"false\">${esc(PARTS[k].title || 'פרק ' + (k + 1))}</button>`).join('')}</div></div>`;\r\n    sheet += `<div class=\"xm-pw\" data-pw=\"${pi}\">`;\r\n    if (part.title || opts.editable) sheet += `<div class=\"xm-part\"><h2>${esc(part.title || 'חלק ללא שם')}</h2>${part.pts ? `<span>${esc(part.pts)}</span>` : ''}${opts.editable ? `<button type=\"button\" class=\"xm-edit\" data-editpart=\"${pi}\">✎ עריכה</button>` : ''}</div>`;\r\n    if (part.note) sheet += `<p class=\"xm-pnote\">${rich(part.note)}</p>`;\r\n    if (pickOf(pi)) sheet += `<p class=\"xm-pickinfo\" data-pickinfo=\"${pi}\"></p>`;\r\n    if (grp) sheet += `<p class=\"xm-poff\">לא בחרתם בפרק הזה. <button type=\"button\" class=\"xm-btn\" data-altp=\"${pi}\">לענות על הפרק הזה</button></p>`;\r\n    (part.qs || []).forEach((q, qi) => {\r\n      const qid = `xq${pi}-${qi}`;\r\n      sheet += `<section class=\"xm-q\" id=\"${qid}\">${opts.editable ? `<button type=\"button\" class=\"xm-edit\" data-edit=\"${pi}.${qi}\">✎ עריכה</button>` : ''}`;\r\n      if (pickOf(pi)) sheet += `<label class=\"xm-pick\"><input type=\"checkbox\" data-pick=\"${pi}.${qi}\"> בחרתי לענות על שאלה ${esc(q.n)}</label>`;\r\n      const hasIntro = q.intro && q.intro.length;\r\n      if (hasIntro) {\r\n        cur = { id: qid + 'i', label: String(q.n || ''), nav: String(q.n || ''), part: pi, q: qi, fields: [] };\r\n        const html = q.intro.map(block).join('');\r\n        if (cur.fields.length) ITEMS.push(cur);\r\n        sheet += `<div class=\"xm-qh\" id=\"${cur.id}\"><span class=\"xm-qn\">${esc(q.n)}.</span><div class=\"xm-qi\">${html}</div></div>`;\r\n      }\r\n      (q.subs || []).forEach((s, si) => {\r\n        const id = `${qid}-${si}`;\r\n        const lab = String(s.l || '');\r\n        cur = { id, label: String(q.n || '') + lab, nav: String(q.n || '') + lab.replace(/[()\\s]/g, ''), part: pi, q: qi, fields: [] };\r\n        const blocks = s.blocks || [];\r\n        const first = blocks[0] && (blocks[0].t || 'text') === 'text' ? blocks[0] : null;\r\n        const headHtml = first ? rich(first.v) : '';\r\n        const rest = (first ? blocks.slice(1) : blocks).map(block).join('');\r\n        const tracked = cur.fields.length > 0;\r\n        if (tracked) ITEMS.push(cur);\r\n        const lead = !hasIntro && si === 0 ? `<span class=\"xm-qn\">${esc(q.n)}.</span>` : '';\r\n        sheet += `<div class=\"xm-sub${si === 0 && !hasIntro ? ' first' : ''}\" id=\"${id}\"><div class=\"xm-sh\">${lead}${lab ? `<span class=\"xm-sl\">${esc(lab)}.</span>` : ''}<div class=\"xm-sp\">${headHtml}</div>${ptsTxt(s.pts)}<span class=\"xm-st${tracked ? '' : ' none'}\"></span></div>${rest}</div>`;\r\n      });\r\n      sheet += `</section>`;\r\n    });\r\n    sheet += `</div>`;\r\n  });\r\n  if (opts.editable) sheet += `<div class=\"xm-row\" style=\"justify-content:center\"><button type=\"button\" class=\"xm-btn\" data-addq>+ שאלה חדשה בסוף</button></div>`;\r\n  sheet += `<div class=\"xm-end\"><span>סוף המבחן. לפני ההגשה יוצגו כל הסעיפים שעדיין חסרים.</span><button type=\"button\" class=\"xm-btn primary\" data-act=\"submit\">מעבר להגשה</button></div>`;\r\n\r\n  const partNames = (data.parts || []).map(p => (p.title || '').replace(/^(חלק|פרק)\\s+\\S+\\s*[:\\-–]\\s*/, '').slice(0, 28) || 'שאלות');\r\n  const nav = (data.parts || []).map((p, pi) => {\r\n    const its = ITEMS.filter(i => i.part === pi); if (!its.length) return '';\r\n    return `<div class=\"xm-grp\"><h3>${esc(partNames[pi])}</h3><div class=\"xm-chips\">${its.map(i => `<button type=\"button\" class=\"xm-chip\" data-go=\"${i.id}\" aria-label=\"סעיף ${esc(i.label)}\">${esc(i.nav)}</button>`).join('')}</div></div>`;\r\n  }).join('');\r\n\r\n  root.classList.add('xm');\r\n  root.setAttribute('dir', 'rtl'); root.setAttribute('lang', 'he');\r\n  root.innerHTML = `\r\n  <header class=\"xm-top\">\r\n    <div class=\"xm-brand\"><b>${esc(data.title || 'מבחן')}</b>${data.subtitle ? `<span>${esc(data.subtitle)}</span>` : ''}</div>\r\n    <label class=\"xm-who\">שם:<input data-name type=\"text\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"שם מלא\"></label>\r\n    <div class=\"xm-grow\"></div>\r\n    <div class=\"xm-timer\"><span class=\"xm-clock\" data-clock></span>${set.ext > 0 ? `<label class=\"xm-toggle\"><input type=\"checkbox\" data-ext> הארכת זמן ${+set.ext}%</label>` : ''}</div>\r\n    <div class=\"xm-tools\">\r\n      <div class=\"xm-seg\" role=\"group\" aria-label=\"גודל טקסט\"><button type=\"button\" data-act=\"fs-\" aria-label=\"הקטנת טקסט\">א-</button><button type=\"button\" data-act=\"fs+\" aria-label=\"הגדלת טקסט\">א+</button></div>\r\n      <div class=\"xm-seg\" role=\"group\" aria-label=\"הצגה והסתרה של חלונות\"><button type=\"button\" data-tg=\"map\" aria-pressed=\"true\">מספרי שאלות</button>${arts.length ? `<button type=\"button\" data-tg=\"arts\" aria-pressed=\"true\">${esc(set.textsName)}</button>` : ''}${set.draft !== false ? '<button type=\"button\" data-tg=\"draft\" aria-pressed=\"false\">טיוטה</button>' : ''}</div>\r\n      <button type=\"button\" class=\"xm-btn primary\" data-act=\"submit\">הגשה</button>\r\n    </div>\r\n  </header>\r\n  <div class=\"xm-desk\">\r\n    <nav class=\"xm-map\" data-map aria-label=\"מספרי שאלות\">\r\n      <div class=\"xm-prog\"><div class=\"xm-prog-top\"><span>סעיפים שנענו</span><b data-prog></b><button type=\"button\" class=\"xm-x\" data-act=\"map-x\" aria-label=\"הסתרה\">×</button></div>\r\n        <div class=\"xm-bar\"><i class=\"d\" data-bd></i><i class=\"p\" data-bp></i></div>\r\n        <div class=\"xm-legend\"><span class=\"l-d\">נענה</span><span class=\"l-p\">חלקי</span><span class=\"l-e\">ריק</span></div></div>\r\n      <div class=\"xm-grps\">${nav}</div>\r\n    </nav>\r\n    <div class=\"xm-rz xm-rz-m\" data-rz=\"map\" role=\"separator\" aria-orientation=\"vertical\" aria-label=\"שינוי רוחב\" tabindex=\"0\"></div>\r\n    <main class=\"xm-col\" data-col>\r\n      <div class=\"xm-sheet\">${sheet}</div>\r\n      <div class=\"xm-nk off\" data-nk role=\"toolbar\" aria-label=\"מקלדת ניקוד\"${set.nikud ? '' : ' hidden'}>\r\n        <div class=\"xm-grip\" data-grip role=\"separator\" aria-orientation=\"horizontal\" aria-label=\"שינוי גודל הניקוד\" tabindex=\"0\"></div>\r\n        <div class=\"xm-nk-l\">ניקוד</div>\r\n        <div class=\"xm-nk-k\">${NIKUD.map(([m, n, b]) => `<button type=\"button\" class=\"xm-key\" data-mark=\"${m}\" title=\"${n}\"><b>${(b == null ? 'ב' : b) + m}</b></button>`).join('')}</div>\r\n        <button type=\"button\" class=\"xm-x\" data-act=\"nk-x\" aria-label=\"הסתרת הניקוד\">×</button>\r\n      </div>\r\n    </main>\r\n    ${arts.length ? `<div class=\"xm-rz xm-rz-a\" data-rz=\"arts\" role=\"separator\" aria-orientation=\"vertical\" aria-label=\"שינוי רוחב המאמרים\" tabindex=\"0\"></div>\r\n    <aside class=\"xm-arts\" data-arts aria-label=\"${esc(set.textsName)}\">\r\n      <div class=\"xm-tabs\" role=\"tablist\">${arts.map((a, i) => `<button type=\"button\" class=\"xm-tab\" role=\"tab\" data-tab=\"${i}\">${esc(set.textItem)} ${i + 1}</button>`).join('')}<button type=\"button\" class=\"xm-x xm-full\" data-act=\"arts-full\" aria-label=\"מסך מלא\" title=\"מסך מלא\">⤢</button><button type=\"button\" class=\"xm-x\" data-act=\"arts-x\" aria-label=\"הסתרה\">×</button></div>\r\n      <div class=\"xm-ab\" data-ab></div>\r\n    </aside>` : ''}\r\n  </div>\r\n  ${set.nikud ? '<button type=\"button\" class=\"xm-fab\" data-tg=\"nk\" aria-pressed=\"true\" title=\"מקלדת ניקוד\" aria-label=\"מקלדת ניקוד\"><b>אָ</b><small>ניקוד</small></button>' : ''}\r\n  <div class=\"xm-draft\" data-draft hidden><div class=\"xm-draft-h\"><b>טיוטה</b><span>לא נבדקת</span><button type=\"button\" class=\"xm-x\" data-act=\"draft-x\" aria-label=\"סגירת הטיוטה\">×</button></div><textarea class=\"xm-a\" data-draftta spellcheck=\"false\" placeholder=\"כאן אפשר לכתוב ראשי פרקים, טיוטה לחיבור וכל מה שעוזר\"></textarea></div>\r\n  <div class=\"xm-ov\" data-modal hidden><div class=\"xm-modal\" role=\"dialog\" aria-modal=\"true\"><h2>לפני ההגשה</h2><div data-mbody></div><div class=\"xm-row\"><button type=\"button\" class=\"xm-btn primary\" data-act=\"confirm\">הגשה</button><button type=\"button\" class=\"xm-btn\" data-act=\"back\">חזרה למבחן</button></div></div></div>\r\n  <div class=\"xm-res\" data-res hidden><div class=\"xm-res-in\">\r\n    <h2>המבחן הוגש</h2><p class=\"xm-meta\" data-rmeta></p>\r\n    <div class=\"xm-row\">${preview ? '' : '<button type=\"button\" class=\"xm-btn primary\" data-act=\"save\">שמירת התשובות כקובץ Word</button>'}<button type=\"button\" class=\"xm-btn\" data-act=\"copy\">העתקת התשובות</button><button type=\"button\" class=\"xm-btn\" data-act=\"reopen\">חזרה למבחן</button></div>\r\n    ${preview ? '<p class=\"xm-meta\">בתצוגה המקדימה אין שמירה לקובץ. בקובץ המבחן שמורידים יש כפתור ששומר את התשובות כקובץ Word.</p>' : ''}\r\n    <textarea class=\"xm-a\" data-copyfb hidden readonly style=\"min-height:8em\"></textarea>\r\n    <div class=\"xm-sheet-t\" data-rsheet></div>\r\n  </div></div>`;\r\n\r\n  const q = sel => root.querySelector(sel);\r\n  const qa = sel => root.querySelectorAll(sel);\r\n\r\n  /* ---------- state ---------- */\r\n  const meta = Object.assign({ name: '', start: Date.now(), ext: false, submitted: false }, store.get('m') || {});\r\n  Object.assign(S, store.get('s') || {});\r\n  const ui = Object.assign({ map: true, arts: true, nk: true, draft: false, mapW: 236, artW: 0, nkz: 1, fs: 1 }, store.get('ui') || {});\r\n  const save = () => { store.set('s', S); store.set('m', meta); };\r\n  const saveUi = () => store.set('ui', ui);\r\n\r\n  const filled = id => {\r\n    const v = S[id], f = FIELD[id], t = f.type;\r\n    if (t === 'root') return Array.isArray(v) && v.filter(Boolean).length >= 3;\r\n    if (t === 'set') return Array.isArray(v) && v.length > 0 && (!f.seg || Object.values(S[id + ':L'] || {}).some(x => String(x).trim()));\r\n    if (t === 'punct') return !!v && Object.values(v).some(Boolean);\r\n    return v != null && String(v).trim() !== '';\r\n  };\r\n  // which parts and questions the student is answering\r\n  const qChosen = (pi, qi) => !!(meta.pick && meta.pick[pi + '.' + qi]) || ITEMS.some(i => i.part === pi && i.q === qi && i.fields.some(filled));\r\n  const partOn = pi => { const g = altOf(pi); return !g || !meta.alt || meta.alt[g] == null || meta.alt[g] === pi; };\r\n  const active = it => partOn(it.part) && (!pickOf(it.part) || qChosen(it.part, it.q));\r\n  const pickCount = pi => (PARTS[pi].qs || []).filter((x, qi) => qChosen(pi, qi)).length;\r\n  function applyChoices() {\r\n    PARTS.forEach((p, pi) => {\r\n      const w = q(`[data-pw=\"${pi}\"]`); if (w) w.classList.toggle('off', !partOn(pi));\r\n      const n = pickOf(pi); if (!n) return;\r\n      const k = pickCount(pi), info = q(`[data-pickinfo=\"${pi}\"]`);\r\n      if (info) { info.textContent = `בחלק הזה עונים על ${n} מתוך ${p.qs.length} השאלות. בחרתם ${k}.${k > n ? ` זה יותר מ-${n}.` : ''}`; info.classList.toggle('over', k > n); info.classList.toggle('ok', k === n); }\r\n      p.qs.forEach((x, qi) => {\r\n        const c = q(`[data-pick=\"${pi}.${qi}\"]`), on = qChosen(pi, qi); if (c) c.checked = on;\r\n        const sec = q(`#xq${pi}-${qi}`); if (sec) sec.classList.toggle('unpicked', !on && k >= n);\r\n      });\r\n    });\r\n    Object.keys(ALT).forEach(g => qa(`[data-alt=\"${g}\"] [data-altp]`).forEach(b => b.setAttribute('aria-pressed', String(!!meta.alt && meta.alt[g] === +b.dataset.altp))));\r\n  }\r\n  function renderSegs(id) {\r\n    const box = q(`[data-segs=\"${id}\"]`), f = FIELD[id]; if (!box || !f.seg) return;\r\n    const cuts = S[id] || [], labs = S[id + ':L'] || {}, segs = []; let st = 0;\r\n    [...cuts, f.words.length - 1].forEach(c => { if (c >= st) { segs.push([st, c]); st = c + 1; } });\r\n    box.innerHTML = segs.map(([a, z]) => {\r\n      const v = labs[a] || '', txt = f.words.slice(a, z + 1).join(' ');\r\n      const ctl = f.seg.list ? `<select class=\"xm-a${v ? ' has' : ''}\" data-sl=\"${id}\" data-st=\"${a}\" aria-label=\"${esc(txt)}\"><option value=\"\">${esc(f.seg.name)}…</option>${f.seg.list.map(o => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`\r\n        : `<input class=\"xm-a${v ? ' has' : ''}\" data-sl=\"${id}\" data-st=\"${a}\" type=\"text\" value=\"${esc(v)}\" autocomplete=\"off\" spellcheck=\"false\" aria-label=\"${esc(txt)}\">`;\r\n      return `<div class=\"xm-segr\"><span>${esc(txt)}</span>${ctl}</div>`;\r\n    }).join('');\r\n  }\r\n  function setSeg(el) { const id = el.dataset.sl, labs = Object.assign({}, S[id + ':L'] || {}); labs[el.dataset.st] = el.value; S[id + ':L'] = labs; markHas(el); save(); refresh(FIELD[id].item); }\r\n  let pmenu = null;\r\n  const closePunct = () => { if (pmenu) { pmenu.remove(); pmenu = null; } };\r\n  function openPunct(btn) {\r\n    closePunct();\r\n    const id = btn.dataset.pu, f = FIELD[id], r = btn.getBoundingClientRect();\r\n    const m = document.createElement('div'); m.className = 'xm-pmenu'; m.setAttribute('role', 'menu');\r\n    m.dataset.pu = id; m.dataset.i = btn.dataset.i;\r\n    m.innerHTML = f.marks.map(x => `<button type=\"button\" role=\"menuitem\" data-pm=\"${esc(x)}\">${esc(x)}</button>`).join('') + '<button type=\"button\" role=\"menuitem\" class=\"clr\" data-pm=\"\">ללא</button>';\r\n    m.style.top = Math.min(window.innerHeight - 60, r.bottom + 4) + 'px'; m.style.left = Math.max(4, Math.min(window.innerWidth - 280, r.left - 120)) + 'px';\r\n    root.appendChild(m); pmenu = m; m.querySelector('button').focus();\r\n  }\r\n  function showPunct(id) { const v = S[id] || {}; qa(`[data-pu=\"${id}\"]`).forEach(b => { const x = v[b.dataset.i] || ''; b.textContent = x; b.classList.toggle('has', !!x); }); }\r\n  const words = s => (String(s || '').trim().match(/\\S+/g) || []).length;\r\n  function essayCount(id) {\r\n    const el = q(`[data-wc=\"${id}\"]`); if (!el) return;\r\n    const n = words(S[id]), e = FIELD[id].essay, rng = e.min && e.max ? `${e.min}–${e.max}` : e.min ? `לפחות ${e.min}` : e.max ? `עד ${e.max}` : '';\r\n    el.textContent = `${n} מילים${rng ? ` · נדרש ${rng}` : ''}`;\r\n    el.classList.toggle('ok', !!rng && (!e.min || n >= e.min) && (!e.max || n <= e.max));\r\n    el.classList.toggle('over', !!e.max && n > e.max);\r\n  }\r\n  let picked = null;\r\n  function renderSort(sid) {\r\n    const s = SORTS[sid], box = q(`[data-sorter=\"${sid}\"]`); if (!box) return;\r\n    box.querySelectorAll('.xm-drop').forEach(d => { d.innerHTML = ''; });\r\n    s.ids.forEach((id, i) => {\r\n      const c = S[id], tgt = c == null || c === '' ? box.querySelector('.xm-pool') : box.querySelector(`.xm-drop[data-col=\"${c}\"]`);\r\n      if (tgt) tgt.insertAdjacentHTML('beforeend', `<button type=\"button\" class=\"xm-wc2\" draggable=\"true\" data-chip=\"${id}\" aria-pressed=\"${picked === id}\">${fmt(s.items[i])}</button>`);\r\n    });\r\n    box.classList.toggle('picking', !!picked && s.ids.includes(picked));\r\n  }\r\n  function place(id, col) { picked = null; setVal(id, col); Object.keys(SORTS).forEach(renderSort); }\r\n  const status = it => { const n = it.fields.filter(filled).length; return n === 0 ? 'empty' : n === it.fields.length ? 'done' : 'partial'; };\r\n  function refresh(only) {\r\n    applyChoices();\r\n    // a choice can change which items count, so the chips of every item are refreshed\r\n    ITEMS.forEach(i => {\r\n      const st = status(i);\r\n      if (!only || i === only) { const dot = root.querySelector(`#${i.id} .xm-st`); if (dot) dot.className = 'xm-st ' + st; }\r\n      const ch = q(`[data-go=\"${i.id}\"]`); if (ch) ch.className = 'xm-chip ' + st + (active(i) ? '' : ' off') + (ch.classList.contains('here') ? ' here' : '');\r\n    });\r\n    const act = ITEMS.filter(active);\r\n    let d = 0, p = 0; act.forEach(i => { const s = status(i); if (s === 'done') d++; else if (s === 'partial') p++; });\r\n    const n = act.length || 1;\r\n    q('[data-prog]').textContent = `${d}/${act.length}`;\r\n    q('[data-bd]').style.width = d / n * 100 + '%'; q('[data-bp]').style.width = p / n * 100 + '%';\r\n  }\r\n  const markHas = el => el.classList.toggle('has', el.value.trim() !== '');\r\n  function setVal(id, v) { S[id] = v; save(); refresh(FIELD[id].item); }\r\n  function applyAll() {\r\n    qa('[data-f]').forEach(el => { const id = el.dataset.f; if (el.classList.contains('xm-opt')) el.setAttribute('aria-checked', String(S[id] === el.dataset.v)); else { el.value = S[id] == null ? '' : S[id]; markHas(el); } });\r\n    qa('[data-rf]').forEach(el => { const v = S[el.dataset.rf] || []; el.value = v[+el.dataset.i] || ''; markHas(el); });\r\n    qa('[data-mk], [data-sp]').forEach(el => { const v = S[el.dataset.mk || el.dataset.sp] || []; el.setAttribute('aria-pressed', String(v.includes(+el.dataset.i))); });\r\n    Object.keys(FIELD).forEach(id => { if (FIELD[id].seg) renderSegs(id); if (FIELD[id].type === 'punct') showPunct(id); });\r\n    Object.keys(SORTS).forEach(renderSort);\r\n    Object.keys(FIELD).forEach(id => { if (FIELD[id].essay) essayCount(id); });\r\n    q('[data-name]').value = meta.name || ''; const ex = q('[data-ext]'); if (ex) ex.checked = !!meta.ext;\r\n    const dt = q('[data-draftta]'); if (dt) dt.value = meta.draft || '';\r\n    refresh();\r\n  }\r\n\r\n  /* ---------- panels ---------- */\r\n  const narrow = () => root.classList.contains('narrow');\r\n  function applyUi() {\r\n    root.style.setProperty('--mapW', ui.mapW + 'px');\r\n    if (ui.artW) root.style.setProperty('--artW', ui.artW + 'px');\r\n    root.style.setProperty('--nkz', ui.nkz); root.style.setProperty('--fs', ui.fs);\r\n    q('[data-map]').hidden = q('[data-rz=\"map\"]').hidden = !ui.map;\r\n    if (arts.length) { q('[data-arts]').hidden = q('[data-rz=\"arts\"]').hidden = !narrow() && !ui.arts; }\r\n    if (!ui.nk) q('[data-nk]').classList.add('off');\r\n    const set = (k, v) => { const b = q(`[data-tg=\"${k}\"]`); if (b) b.setAttribute('aria-pressed', String(v)); };\r\n    q('[data-draft]').hidden = !ui.draft; set('draft', !!ui.draft);\r\n    set('map', ui.map); set('nk', ui.nk); if (arts.length) set('arts', narrow() ? q('[data-arts]').classList.contains('open') : ui.arts);\r\n  }\r\n  function setFull(on) {\r\n    const el = q('[data-arts]'), b = q('[data-act=\"arts-full\"]'); if (!el) return;\r\n    el.classList.toggle('full', on);\r\n    if (b) { b.textContent = on ? '⤡' : '⤢'; b.title = b.ariaLabel = on ? 'יציאה ממסך מלא' : 'מסך מלא'; b.setAttribute('aria-label', b.title); }\r\n  }\r\n  function setArts(on) { if (!arts.length) return; if (narrow()) q('[data-arts]').classList.toggle('open', on); else { ui.arts = on; saveUi(); } applyUi(); }\r\n  let curArt = -1;\r\n  function showArt(a, p) {\r\n    if (!arts[a]) return;\r\n    curArt = a; const A = arts[a];\r\n    qa('.xm-tab').forEach(t => t.setAttribute('aria-selected', String(+t.dataset.tab === a)));\r\n    const ab = q('[data-ab]');\r\n    // a paragraph that is only a picture (a chart, an infographic) is shown without a number\r\n    let n = 0;\r\n    ab.innerHTML = `<h4>${esc(A.title || set.textItem + ' ' + (a + 1))}</h4>${A.by ? `<p class=\"xm-by\">${esc(A.by)}</p>` : ''}${(A.ps || []).map(t => onlyImg(t) ? `<div class=\"xm-para pic\">${artText(t)}</div>` : `<div class=\"xm-para\" data-pp=\"${++n}\"><span>${parLab(A, n)}</span><p>${artText(t)}</p></div>`).join('')}`;\r\n    const el = p && ab.querySelector(`[data-pp=\"${p}\"]`);\r\n    if (el) requestAnimationFrame(() => { ab.scrollTop = el.offsetTop - 8; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); });\r\n    else ab.scrollTop = 0;\r\n  }\r\n  if (arts.length) showArt(0);\r\n  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {\r\n    const w = root.clientWidth, wasN = narrow();\r\n    root.classList.toggle('narrow', w < 1000); root.classList.toggle('phone', w < 700);\r\n    if (wasN !== narrow()) applyUi();\r\n  }) : null;\r\n  if (ro) ro.observe(root);\r\n\r\n  function dragger(el, begin, move, key) {\r\n    if (!el) return;\r\n    el.addEventListener('pointerdown', e => {\r\n      e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add('drag');\r\n      const st = begin(e), mv = ev => { move(ev, st); applyUi(); };\r\n      const up = () => { el.classList.remove('drag'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); saveUi(); };\r\n      el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);\r\n    });\r\n    el.addEventListener('keydown', e => { if (key(e.key)) { e.preventDefault(); applyUi(); saveUi(); } });\r\n  }\r\n  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));\r\n  dragger(q('[data-rz=\"map\"]'), () => q('[data-map]').getBoundingClientRect().right, (e, r) => { ui.mapW = Math.round(clamp(r - e.clientX, 150, 420)); },\r\n    k => { if (k === 'ArrowLeft') ui.mapW = clamp(ui.mapW + 20, 150, 420); else if (k === 'ArrowRight') ui.mapW = clamp(ui.mapW - 20, 150, 420); else return false; return true; });\r\n  if (arts.length) dragger(q('[data-rz=\"arts\"]'), () => q('[data-arts]').getBoundingClientRect().left, (e, l) => { ui.artW = Math.round(clamp(e.clientX - l, 240, root.clientWidth * .6)); },\r\n    k => { const w = ui.artW || q('[data-arts]').offsetWidth; if (k === 'ArrowRight') ui.artW = clamp(w + 20, 240, root.clientWidth * .6); else if (k === 'ArrowLeft') ui.artW = clamp(w - 20, 240, root.clientWidth * .6); else return false; return true; });\r\n  dragger(q('[data-grip]'), e => ({ y: e.clientY, z: ui.nkz }), (e, s) => { ui.nkz = Math.round(clamp(s.z + (s.y - e.clientY) / 50, .8, 2.2) * 100) / 100; },\r\n    k => { if (k === 'ArrowUp') ui.nkz = clamp(ui.nkz + .1, .8, 2.2); else if (k === 'ArrowDown') ui.nkz = clamp(ui.nkz - .1, .8, 2.2); else return false; return true; });\r\n\r\n  /* ---------- events ---------- */\r\n  let lastText = null;\r\n  const isText = t => t.matches && t.matches('input.xm-a, textarea.xm-a') && !t.hasAttribute('readonly');\r\n  root.addEventListener('focusin', e => { if (isText(e.target)) { lastText = e.target; if (ui.nk && set.nikud) q('[data-nk]').classList.remove('off'); } });\r\n  root.addEventListener('focusout', e => { const to = e.relatedTarget; if (to && (isText(to) || (to.closest && to.closest('[data-nk], .xm-fab')))) return; q('[data-nk]').classList.add('off'); });\r\n  ['mousedown', 'pointerdown'].forEach(ev => q('[data-nk]').addEventListener(ev, e => { if (e.target.closest('.xm-key, [data-grip]')) e.preventDefault(); }));\r\n  const fab = q('.xm-fab'); if (fab) fab.addEventListener('mousedown', e => e.preventDefault());\r\n  root.addEventListener('input', e => {\r\n    const t = e.target;\r\n    if (t.hasAttribute('data-name')) { meta.name = t.value; save(); return; }\r\n    if (t.hasAttribute('data-draftta')) { meta.draft = t.value; save(); return; }\r\n    if (t.dataset.f) { markHas(t); setVal(t.dataset.f, t.value); if (FIELD[t.dataset.f].essay) essayCount(t.dataset.f); return; }\r\n    if (t.dataset.sl && t.tagName === 'INPUT') { setSeg(t); return; }\r\n    if (t.dataset.rf) {\r\n      t.value = t.value.replace(/[^א-ת]/g, '').slice(-1); markHas(t);\r\n      const id = t.dataset.rf, arr = (S[id] || ['', '', '', '']).slice(); arr[+t.dataset.i] = t.value; setVal(id, arr);\r\n      if (t.value) { const nx = t.parentElement.querySelector(`[data-i=\"${+t.dataset.i + 1}\"]`); if (nx) nx.focus(); }\r\n    }\r\n  });\r\n  root.addEventListener('change', e => {\r\n    if (e.target.matches('select[data-f]')) { markHas(e.target); setVal(e.target.dataset.f, e.target.value); }\r\n    if (e.target.matches('select[data-sl]')) setSeg(e.target);\r\n    if (e.target.hasAttribute('data-pick')) { meta.pick = Object.assign({}, meta.pick, { [e.target.dataset.pick]: e.target.checked }); save(); refresh(); }\r\n    if (e.target.hasAttribute('data-ext')) { meta.ext = e.target.checked; save(); tick(); }\r\n  });\r\n  root.addEventListener('keydown', e => {\r\n    const t = e.target;\r\n    if (t.dataset && t.dataset.rf && e.key === 'Backspace' && !t.value) { const pv = t.parentElement.querySelector(`[data-i=\"${+t.dataset.i - 1}\"]`); if (pv) { e.preventDefault(); pv.focus(); } }\r\n    if (e.key === 'Escape') { if (pmenu) { const b = q(`[data-pu=\"${pmenu.dataset.pu}\"][data-i=\"${pmenu.dataset.i}\"]`); closePunct(); if (b) b.focus(); return; } const a = q('[data-arts]'); if (a && a.classList.contains('full')) { setFull(false); return; } q('[data-modal]').hidden = true; if (narrow()) setArts(false); }\r\n  });\r\n  root.addEventListener('dragstart', e => { const c = e.target.closest && e.target.closest('[data-chip]'); if (c) { e.dataTransfer.setData('text/plain', c.dataset.chip); e.dataTransfer.effectAllowed = 'move'; } });\r\n  root.addEventListener('dragover', e => { const d = e.target.closest && e.target.closest('.xm-drop'); if (d) { e.preventDefault(); d.classList.add('over'); } });\r\n  root.addEventListener('dragleave', e => { const d = e.target.closest && e.target.closest('.xm-drop'); if (d) d.classList.remove('over'); });\r\n  root.addEventListener('drop', e => {\r\n    const d = e.target.closest && e.target.closest('.xm-drop'); if (!d) return;\r\n    e.preventDefault(); d.classList.remove('over');\r\n    const id = e.dataTransfer.getData('text/plain'); if (id && FIELD[id] && FIELD[id].sort && FIELD[id].sort.sid === d.dataset.sort) place(id, d.dataset.col);\r\n  });\r\n  function goTo(id) {\r\n    const el = root.querySelector('#' + id); if (!el) return;\r\n    const col = q('[data-col]'); col.scrollTop += el.getBoundingClientRect().top - col.getBoundingClientRect().top - 12;\r\n    if (root.classList.contains('phone')) el.scrollIntoView({ block: 'start' });\r\n    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');\r\n    qa('.xm-chip.here').forEach(c => c.classList.remove('here'));\r\n    const ch = q(`[data-go=\"${id}\"]`); if (ch) ch.classList.add('here');\r\n    const f = el.querySelector('input, textarea, select, .xm-opt'); if (f) setTimeout(() => f.focus({ preventScroll: true }), 50);\r\n  }\r\n  root.addEventListener('click', e => {\r\n    const t = e.target;\r\n    const pm = t.closest('[data-pm]');\r\n    if (pm && pmenu) {\r\n      const id = pmenu.dataset.pu, k = pmenu.dataset.i, v = Object.assign({}, S[id] || {});\r\n      if (pm.dataset.pm) v[k] = pm.dataset.pm; else delete v[k];\r\n      closePunct(); setVal(id, v); showPunct(id); const b = q(`[data-pu=\"${id}\"][data-i=\"${k}\"]`); if (b) b.focus(); return;\r\n    }\r\n    if (pmenu && !t.closest('.xm-pmenu')) closePunct();\r\n    const pg = t.closest('[data-pu]'); if (pg) { openPunct(pg); return; }\r\n    const altp = t.closest('[data-altp]');\r\n    if (altp) {\r\n      const pi = +altp.dataset.altp, g = altOf(pi); if (!g) return;\r\n      meta.alt = Object.assign({}, meta.alt, { [g]: pi }); save(); refresh();\r\n      const w = q(`[data-pw=\"${pi}\"]`), col = q('[data-col]'); if (w && altp.closest('.xm-poff')) col.scrollTop += w.getBoundingClientRect().top - col.getBoundingClientRect().top - 12;\r\n      return;\r\n    }\r\n    const opt = t.closest('.xm-opt[data-f]');\r\n    if (opt) { const id = opt.dataset.f, v = S[id] === opt.dataset.v ? '' : opt.dataset.v; qa(`.xm-opt[data-f=\"${id}\"]`).forEach(o => o.setAttribute('aria-checked', String(o.dataset.v === v))); setVal(id, v); return; }\r\n    const tog = t.closest('[data-mk], [data-sp]');\r\n    if (tog) {\r\n      const id = tog.dataset.mk || tog.dataset.sp, i = +tog.dataset.i, v = (S[id] || []).slice(), k = v.indexOf(i);\r\n      if (k >= 0) v.splice(k, 1); else v.push(i);\r\n      v.sort((a, b) => a - b); tog.setAttribute('aria-pressed', String(k < 0)); setVal(id, v); if (FIELD[id].seg) renderSegs(id); return;\r\n    }\r\n    const chip = t.closest('[data-chip]');\r\n    if (chip) { const id = chip.dataset.chip; picked = picked === id ? null : id; Object.keys(SORTS).forEach(renderSort); const again = q(`[data-chip=\"${id}\"]`); if (again) again.focus(); return; }\r\n    const drop = t.closest('.xm-drop');\r\n    if (drop && picked && SORTS[drop.dataset.sort] && SORTS[drop.dataset.sort].ids.includes(picked)) { place(picked, drop.dataset.col); return; }\r\n    const ed = t.closest('[data-edit], [data-editpart], [data-addq]');\r\n    if (ed && opts.onEdit) { opts.onEdit(ed.dataset.edit ? { q: ed.dataset.edit } : ed.dataset.editpart != null ? { part: +ed.dataset.editpart } : { add: true }); return; }\r\n    const key = t.closest('.xm-key');\r\n    if (key) { if (!lastText) return; const el = lastText, a = el.selectionStart == null ? el.value.length : el.selectionStart, b = el.selectionEnd == null ? a : el.selectionEnd; el.focus(); el.setRangeText(key.dataset.mark, a, b, 'end'); el.dispatchEvent(new Event('input', { bubbles: true })); return; }\r\n    const ref = t.closest('.xm-ref'); if (ref) { setArts(true); showArt(+ref.dataset.a, +ref.dataset.p); return; }\r\n    const tab = t.closest('.xm-tab'); if (tab) { showArt(+tab.dataset.tab); return; }\r\n    const go = t.closest('[data-go]'); if (go) { goTo(go.dataset.go); return; }\r\n    const miss = t.closest('[data-miss]'); if (miss) { q('[data-modal]').hidden = true; goTo(miss.dataset.miss); return; }\r\n    const tg = t.closest('[data-tg]');\r\n    if (tg) {\r\n      const k = tg.dataset.tg;\r\n      if (k === 'arts') setArts(narrow() ? !q('[data-arts]').classList.contains('open') : !ui.arts);\r\n      else { ui[k] = !ui[k]; saveUi(); applyUi(); if (k === 'draft' && ui.draft) q('[data-draftta]').focus(); if (k === 'nk' && ui.nk) { if (lastText && lastText.isConnected) { lastText.focus(); q('[data-nk]').classList.remove('off'); } } }\r\n      return;\r\n    }\r\n    const act = t.closest('[data-act]'); if (!act) { if (t === q('[data-modal]')) q('[data-modal]').hidden = true; return; }\r\n    const a = act.dataset.act;\r\n    if (a === 'submit') openSubmit();\r\n    else if (a === 'back') q('[data-modal]').hidden = true;\r\n    else if (a === 'confirm') { q('[data-modal]').hidden = true; meta.submitted = true; save(); showResult(); }\r\n    else if (a === 'reopen') { meta.submitted = false; save(); q('[data-res]').hidden = true; }\r\n    else if (a === 'map-x') { ui.map = false; saveUi(); applyUi(); }\r\n    else if (a === 'arts-x') { setFull(false); setArts(false); }\r\n    else if (a === 'arts-full') setFull(!q('[data-arts]').classList.contains('full'));\r\n    else if (a === 'nk-x') { ui.nk = false; saveUi(); applyUi(); }\r\n    else if (a === 'draft-x') { ui.draft = false; saveUi(); applyUi(); }\r\n    else if (a === 'fs+' || a === 'fs-') { ui.fs = Math.round(clamp(ui.fs + (a === 'fs+' ? .1 : -.1), .85, 1.5) * 100) / 100; saveUi(); applyUi(); }\r\n    else if (a === 'copy') copyAnswers(act);\r\n    else if (a === 'save') saveWord();\r\n  });\r\n\r\n  /* ---------- timer ---------- */\r\n  const minutes = +data.minutes || 0;\r\n  function tick() {\r\n    const c = q('[data-clock]'); if (!c) return;\r\n    if (!minutes) { c.parentElement.hidden = true; return; }\r\n    const total = Math.round(minutes * (meta.ext ? 1 + (+set.ext || 0) / 100 : 1) * 60), left = Math.max(0, total - Math.floor((Date.now() - meta.start) / 1000));\r\n    const hh = Math.floor(left / 3600), mm = Math.floor(left % 3600 / 60), ss = left % 60;\r\n    c.textContent = left ? `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : 'הזמן נגמר';\r\n    c.classList.toggle('low', left < 600);\r\n  }\r\n  const timer = setInterval(() => { if (!root.isConnected) clearInterval(timer); else tick(); }, 1000);\r\n\r\n  /* ---------- submit ---------- */\r\n  function choiceWarnings() {\r\n    const w = [];\r\n    Object.keys(ALT).forEach(g => { if (ALT[g].length > 1 && (!meta.alt || meta.alt[g] == null)) w.push(`לא בחרתם באיזה פרק לענות: ${ALT[g].map(pi => PARTS[pi].title || 'פרק ' + (pi + 1)).join(' או ')}.`); });\r\n    PARTS.forEach((p, pi) => {\r\n      const n = pickOf(pi); if (!n || !partOn(pi)) return;\r\n      const k = pickCount(pi), name = p.title || 'חלק ' + (pi + 1);\r\n      if (k < n) w.push(`ב${name} צריך לענות על ${n} שאלות, ובחרתם ${k}.`);\r\n      if (k > n) w.push(`ב${name} עניתם על ${k} שאלות, אבל צריך לענות רק על ${n}.`);\r\n    });\r\n    return w;\r\n  }\r\n  function openSubmit() {\r\n    const act = ITEMS.filter(active), missing = act.filter(i => status(i) !== 'done'), warn = choiceWarnings();\r\n    q('[data-mbody]').innerHTML = (warn.length ? `<div class=\"xm-warn\">${warn.map(x => `<p>${esc(x)}</p>`).join('')}</div>` : '') + (!missing.length ? `<p class=\"xm-ok\">כל ${act.length} הסעיפים נענו.</p>`\r\n      : `<p>נשארו <b>${missing.length}</b> סעיפים שלא נענו במלואם. לחיצה על סעיף מעבירה אליו.</p><div class=\"xm-miss\">${missing.map(i => { const st = status(i), n = i.fields.filter(filled).length; return `<button type=\"button\" data-miss=\"${i.id}\"><span>סעיף ${esc(i.label)}</span><em class=\"${st === 'empty' ? 'e' : ''}\">${st === 'empty' ? 'ריק' : `חלקי · ${n} מתוך ${i.fields.length}`}</em></button>`; }).join('')}</div>`);\r\n    q('[data-act=\"confirm\"]').textContent = missing.length || warn.length ? 'הגשה בכל זאת' : 'הגשה';\r\n    q('[data-modal]').hidden = false; q('[data-act=\"back\"]').focus();\r\n  }\r\n  const readable = id => {\r\n    const v = S[id], f = FIELD[id]; if (!filled(id)) return null;\r\n    if (f.type === 'root') return v.filter(Boolean).join('-');\r\n    if (f.type === 'set' && f.kind === 'mark') return v.map(i => f.words[i]).join(' · ');\r\n    if (f.type === 'set' && f.seg) {\r\n      const labs = S[id + ':L'] || {}, out = []; let st = 0;\r\n      [...v, f.words.length - 1].forEach(c => { if (c >= st) { out.push(f.words.slice(st, c + 1).join(' ') + (labs[st] ? ` (${labs[st]})` : '')); st = c + 1; } });\r\n      return out.join(' / ');\r\n    }\r\n    if (f.type === 'set') return f.words.map((w, i) => w + (v.includes(i) ? ' /' : '')).join(' ');\r\n    if (f.type === 'punct') return f.words.map((w, i) => w + (v[i] || '')).join(' ');\r\n    if (f.type === 'sort') { const h = S[f.sort.heads[+v]]; return h ? `${h} (עמודה ${+v + 1})` : `עמודה ${+v + 1}`; }\r\n    if (f.essay) return `${v}\\n(${words(v)} מילים)`;\r\n    return String(v);\r\n  };\r\n  function rows() {\r\n    // the parts and questions the student chose, and anything else the student answered anyway\r\n    const r = []; ITEMS.filter(it => active(it) || it.fields.some(filled)).forEach(it => it.fields.forEach((id, k) => r.push({ item: it.label, first: k === 0, span: it.fields.length, label: FIELD[id].label, v: readable(id) })));\r\n    if (meta.draft && meta.draft.trim()) r.push({ item: 'טיוטה', first: true, span: 1, label: 'לא נבדקת', v: meta.draft });\r\n    return r;\r\n  }\r\n  function showResult() {\r\n    const rs = rows();\r\n    q('[data-rsheet]').innerHTML = `<table>${rs.map(r => `<tr>${r.first ? `<th rowspan=\"${r.span}\">${esc(r.item)}</th>` : ''}<td class=\"k\">${esc(r.label)}</td><td class=\"v${r.v === null ? ' blank' : ''}\">${r.v === null ? 'לא נענה' : esc(r.v)}</td></tr>`).join('')}</table>`;\r\n    const act = ITEMS.filter(active);\r\n    q('[data-rmeta]').textContent = `${meta.name || 'ללא שם'} · ${act.filter(i => status(i) === 'done').length} מתוך ${act.length} סעיפים נענו במלואם`;\r\n    q('[data-res]').hidden = false; q('[data-res]').scrollTop = 0;\r\n  }\r\n  const plain = () => `${data.title || 'מבחן'} · ${meta.name || 'ללא שם'}\\n\\n` + rows().map(r => `${r.item}${r.label ? ' · ' + r.label : ''}: ${r.v == null ? '—' : r.v}`).join('\\n');\r\n  function copyAnswers(btn) {\r\n    const txt = plain(), fb = q('[data-copyfb]');\r\n    const fallback = () => { fb.hidden = false; fb.value = txt; fb.focus(); fb.select(); btn.textContent = 'סמנו והעתיקו מהתיבה'; };\r\n    try { navigator.clipboard.writeText(txt).then(() => { btn.textContent = 'הועתק'; }, fallback); } catch (e) { fallback(); }\r\n  }\r\n  function saveWord() {\r\n    const rs = rows();\r\n    const html = `<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\"><head><meta charset=\"utf-8\"><title>${esc(data.title)}</title><style>body{font-family:David,Arial;direction:rtl}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:4px 8px;text-align:right;vertical-align:top}.b{color:#b0700f}</style></head><body dir=\"rtl\"><h2>${esc(data.title || 'מבחן')}</h2><p>שם: ${esc(meta.name || '')}</p><table>${rs.map(r => `<tr>${r.first ? `<th rowspan=\"${r.span}\">${esc(r.item)}</th>` : ''}<td>${esc(r.label)}</td><td${r.v === null ? ' class=\"b\"' : ''}>${r.v === null ? 'לא נענה' : esc(r.v).replace(/\\n/g, '<br>')}</td></tr>`).join('')}</table></body></html>`;\r\n    const blob = new Blob(['﻿' + html], { type: 'application/msword' });\r\n    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${(meta.name || 'תשובות').replace(/[\\\\/:*?\"<>|]/g, '')} - ${(data.title || 'מבחן').replace(/[\\\\/:*?\"<>|]/g, '')}.doc`;\r\n    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);\r\n  }\r\n\r\n  applyAll(); applyUi(); tick();\r\n  if (meta.submitted) showResult();\r\n  return { destroy() { clearInterval(timer); if (ro) ro.disconnect(); root.innerHTML = ''; }, colScroll: () => q('[data-col]').scrollTop, setColScroll: v => { q('[data-col]').scrollTop = v; } };\r\n}\r\n";
  document.body.appendChild(rt);
  const z = document.createElement('script'); z.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'; document.head.appendChild(z);
})();
/* Exam runtime: renders an exam described as data into a typing-friendly exam.
   Text tokens:  ___ blank · {a / b / c} choose one · [שורש] root boxes · **bold**
                 [בניין] [גזרה] [תפקיד] [חלק דיבר] [סוג משפט] [פסוקית] [קשר לוגי] [תצורה] [זמן] [גוף] [מין ומספר] ready-made lists
                 [רשימה:א / ב / ג] a list of your own · [מעל:מילה] box above a word · [מעל:מילה|תפקיד] list above a word
                 [מאמר 2, פס' 3] or [מאמר 2, פסקה ג] link to an article · [קו:מילים] underlined · [מסגרת:מילים] boxed
                 [תמונה:img1] a picture from data.images
   Blocks: text · passage · mc (num: options (1), (2)…) · long · table · essay · mark (click words) · split (mark boundaries;
           label: a list name or "free", to name every part) · punct (add punctuation) · sort · match · img
   Parts: alt (parts with the same alt are alternatives: answer one) · pick (answer only that many of the questions) */
const XM_BINYANIM = ['פָּעַל (קל)', 'נִפְעַל', 'פִּעֵל', 'פֻּעַל', 'הִפְעִיל', 'הֻפְעַל', 'הִתְפַּעֵל'];
const XM_LISTS = {
  'בניין': XM_BINYANIM,
  'גזרה': ['שלמים', 'פ"נ', 'פ"י / פ"ו', 'פ"א', 'ע"ו / ע"י', 'ל"ה / ל"י', 'ל"א', 'כפולים (ע"ע)', 'מרובעים'],
  'תפקיד': ['נושא', 'נשוא', 'אוגד', 'מושא ישיר', 'מושא עקיף', 'משלים', 'תיאור זמן', 'תיאור מקום', 'תיאור סיבה', 'תיאור תכלית', 'תיאור אופן', 'תיאור תנאי', 'תיאור ויתור', 'תיאור מצב', 'תיאור כמות', 'לוואי', 'תמורה', 'נשוא שני', 'פנייה', 'הסגר', 'מילת קישור'],
  'חלק דיבר': ['שם עצם', 'שם תואר', 'פועל', 'בינוני', 'שם פועל', 'שם פעולה', 'תואר הפועל', 'כינוי גוף', 'מילת יחס', 'מילת קישור', 'שם מספר', 'מילת שאלה', 'מילת שלילה'],
  'סוג משפט': ['פשוט', 'פשוט בעל חלקים כוללים', 'מורכב', 'מאוחה', 'מאוחה-מורכב'],
  'פסוקית': ['פסוקית נושא', 'פסוקית נשוא', 'פסוקית מושא', 'פסוקית לוואי', 'פסוקית תיאור זמן', 'פסוקית תיאור מקום', 'פסוקית תיאור סיבה', 'פסוקית תיאור תכלית', 'פסוקית תיאור תנאי', 'פסוקית תיאור ויתור', 'פסוקית תיאור אופן', 'פסוקית תיאור השוואה', 'פסוקית תיאור תוצאה', 'פסוקית תמורה'],
  'קשר לוגי': ['ניגוד', 'ויתור', 'סיבה', 'תוצאה', 'תכלית', 'תנאי', 'זמן', 'השוואה', 'הוספה', 'הסבר / פירוט', 'הדגמה', 'הסתייגות', 'ברירה', 'הכללה / סיכום'],
  'תצורה': ['שורש ומשקל', 'בסיס וצורן', 'הלחם', 'ראשי תיבות', 'מילה שאולה'],
  'זמן': ['עבר', 'הווה', 'עתיד', 'ציווי', 'שם הפועל'],
  'גוף': ['אני', 'אתה', 'את', 'הוא', 'היא', 'אנחנו', 'אתם', 'אתן', 'הם', 'הן'],
  'מין ומספר': ['זכר יחיד', 'נקבה יחידה', 'זכר רבים', 'נקבה רבות']
};
function mountExam(root, data, opts) {
  opts = opts || {};
  const preview = !!opts.preview;
  const BINYANIM = XM_BINYANIM, LISTS = XM_LISTS;
  const listOf = name => { name = String(name || '').trim(); return LISTS[name] || (/\//.test(name) ? name.split('/').map(x => x.trim()).filter(Boolean) : null); };
  const NIKUD = [['ָ', 'קמץ'], ['ַ', 'פתח'], ['ֵ', 'צירה'], ['ֶ', 'סגול'], ['ִ', 'חיריק'], ['ֹ', 'חולם'], ['ֻ', 'קובוץ'], ['ּ', 'דגש/שורוק'], ['ְ', 'שווא'], ['ֲ', 'חטף פתח'], ['ֱ', 'חטף סגול'], ['ֳ', 'חטף קמץ'], ['ׁ', 'שׁ ימנית', 'ש'], ['ׂ', 'שׂ שמאלית', 'ש'], ['־', 'מקף', '']];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const set = Object.assign({ nikud: true, texts: true, textsName: 'מאמרים', textItem: 'מאמר', ext: 25 }, data.settings || {});
  const arts = set.texts ? (data.articles || []) : [];

  let h = 0; const src = JSON.stringify(data);
  for (let i = 0; i < src.length; i++) h = (h * 31 + src.charCodeAt(i)) | 0;
  const KEY = 'xm-' + (h >>> 0).toString(36);
  const store = {
    get(k) { if (preview) return null; try { return JSON.parse(localStorage.getItem(KEY + k)); } catch (e) { return null; } },
    set(k, v) { if (preview) return; try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(KEY + k); } catch (e) {} }
  };

  /* ---------- build ---------- */
  const S = {}, FIELD = {}, ITEMS = [], SUBS = [];
  let cur = null, fc = 0;
  const nf = (type, label) => { const id = 'f' + (++fc); cur.fields.push(id); FIELD[id] = { item: cur, type, label: label || '' }; return id; };
  // the label of an answer place: the few words just before it, on its own line and after any earlier answer place
  const ctx = (str, off) => {
    const s = str.slice(Math.max(0, off - 60), off).split('\n').pop().replace(/^[^{[]*?[}\]]/, '').replace(/\*\*/g, '');
    const parts = s.split(/_{3,}|\{[^}]*\}|\[[^\]]*\]/).map(x => x.trim());
    const t = parts.pop() || parts.pop() || '';
    return t.split(/\s+/).slice(-4).join(' ');
  };

  function field(type, label, o) {
    o = o || {};
    if (type === 'text') { const id = nf('text', label); o.id = id; return `<input class="xm-a ${o.wide ? 'wide' : 'inl'}" data-f="${id}" type="text" autocomplete="off" spellcheck="false" aria-label="${esc(label || 'תשובה')}">`; }
    if (type === 'root') {
      const id = nf('root', label); let s = '<span class="xm-root">';
      for (let i = 0; i < 4; i++) s += (i ? '<i>-</i>' : '') + `<input class="${i === 3 ? 'o4' : ''}" data-rf="${id}" data-i="${i}" maxlength="2" autocomplete="off" spellcheck="false" aria-label="${esc(label)} · אות ${i + 1}">`;
      return s + '</span>';
    }
    if (type === 'list') { const id = nf('text', label); o.id = id; return `<select class="xm-a" data-f="${id}" aria-label="${esc(label || 'בחירה')}"><option value="">בחרו…</option>${(o.list || []).map(b => `<option>${esc(b)}</option>`).join('')}</select>`; }
  }
  // words keep their **bold** marks
  const fmt = w => esc(w).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*\*/g, '');
  const SORTS = {}; let sortN = 0;
  function choiceHtml(opts2, label, cls) {
    const id = nf('choice', label);
    return `<span class="xm-ch ${cls || ''}" role="radiogroup">${opts2.map(v => `<button type="button" class="xm-opt" role="radio" aria-checked="false" data-f="${id}" data-v="${esc(v)}">${esc(v)}</button>`).join('')}</span>`;
  }
  const LISTNAMES = Object.keys(LISTS).join('|');
  // pictures from the Word file live in data.images, by id; only real images are shown
  const IMG = data.images || {};
  const imgHtml = (id, cls) => /^data:image\//.test(IMG[id] || '') ? `<img class="${cls || 'xm-img'}" src="${IMG[id]}" alt="">` : '';
  // paragraphs may be counted 1, 2, 3 or א, ב, ג (a reference may use either)
  const HEBN = [[400, 'ת'], [300, 'ש'], [200, 'ר'], [100, 'ק'], [90, 'צ'], [80, 'פ'], [70, 'ע'], [60, 'ס'], [50, 'נ'], [40, 'מ'], [30, 'ל'], [20, 'כ'], [10, 'י'], [9, 'ט'], [8, 'ח'], [7, 'ז'], [6, 'ו'], [5, 'ה'], [4, 'ד'], [3, 'ג'], [2, 'ב'], [1, 'א']];
  const heb = n => { if (n === 15) return 'טו'; if (n === 16) return 'טז'; let s = ''; for (const [v, l] of HEBN) while (n >= v) { s += l; n -= v; } return s; };
  const parNum = p => /^\d+$/.test(p) ? +p : [...String(p || '')].reduce((t, c) => t + ((HEBN.find(x => x[1] === c) || [0])[0]), 0);
  const parLab = (A, n) => A && A.pl === 'letters' ? `פסקה ${heb(n)}` : `פס׳ ${n}`;
  const TOK = new RegExp(String.raw`\*\*(?<b>.+?)\*\*|(?<blank>_{3,})|\{(?<ch>[^{}]+?\s\/\s[^{}]+?)\}|(?<root>\[שורש\])|\[(?<ls>${LISTNAMES})\]|\[רשימה:(?<cl>[^\]]+)\]|\[מעל:(?<ab>[^\]|]+)(?:\|(?<abl>[^\]]+))?\]|\[קו:(?<u>[^\]]+)\]|\[מסגרת:(?<box>[^\]]+)\]|\[תמונה:(?<img>[^\]\s]+)\]|\[(?:מאמר|טקסט|קטע)\s*(?<art>\d+)(?:\s*,\s*(?:פס['׳]?|פסקה)\s*(?<par>\d+|[א-ת]{1,2}))?\]`, 'g');
  function rich(text) {
    const s = String(text || '');
    let out = '', last = 0, m;
    TOK.lastIndex = 0;
    const inner = (tag, cls, v) => { const save = TOK.lastIndex; const h = `<${tag}${cls ? ` class="${cls}"` : ''}>${rich(v)}</${tag}>`; TOK.lastIndex = save; return h; };
    while ((m = TOK.exec(s))) {
      out += esc(s.slice(last, m.index)).replace(/\n/g, '<br>');
      last = TOK.lastIndex;
      const g = m.groups, label = ctx(s, m.index);
      if (g.b !== undefined) out += inner('b', '', g.b);
      else if (g.u !== undefined) out += inner('u', '', g.u);
      else if (g.box !== undefined) out += inner('span', 'xm-box', g.box);
      else if (g.img) out += imgHtml(g.img) || '';
      else if (g.blank) out += field('text', label, { wide: g.blank.length > 30 });
      else if (g.ch) out += choiceHtml(g.ch.split(/\s\/\s/).map(x => x.trim()).filter(Boolean), label);
      else if (g.root) out += field('root', label ? label + ' · שורש' : 'שורש');
      else if (g.ls) out += field('list', label ? `${label} · ${g.ls}` : g.ls, { list: LISTS[g.ls] });
      else if (g.cl) out += field('list', label || 'בחירה', { list: listOf(g.cl) || [g.cl] });
      else if (g.ab) {
        const w = g.ab.trim(), list = g.abl ? listOf(g.abl) : null;
        const box = list ? field('list', `מעל ${w}`, { list }) : (() => { const id = nf('text', w); return `<input class="xm-a" data-f="${id}" type="text" autocomplete="off" spellcheck="false" aria-label="מעל ${esc(w)}">`; })();
        out += `<span class="xm-lw">${box}<b>${esc(w)}</b></span>`;
      }
      else if (g.art) {
        const a = +g.art - 1, p = g.par ? parNum(g.par) : 0;
        out += arts[a] ? `<button type="button" class="xm-ref" data-a="${a}" data-p="${p || ''}">${esc(set.textItem)} ${g.art}${p ? ` · ${parLab(arts[a], p)}` : ''}</button>` : esc(m[0]);
      }
    }
    return out + esc(s.slice(last)).replace(/\n/g, '<br>');
  }
  // article paragraphs: formatting and pictures, no answer places
  const ATOK = /\*\*(.+?)\*\*|\[קו:([^\]]+)\]|\[מסגרת:([^\]]+)\]|\[תמונה:([^\]\s]+)\]/g;
  const artText = t => esc(String(t || '')).replace(/\[תמונה:([^\]\s]+)\]/g, (x, id) => imgHtml(id) || '').replace(ATOK, (x, b, u, box) => b !== undefined ? `<b>${b}</b>` : u !== undefined ? `<u>${u}</u>` : box !== undefined ? `<span class="xm-box">${box}</span>` : x).replace(/\n/g, '<br>');
  const onlyImg = t => /^\s*\[תמונה:[^\]\s]+\]\s*$/.test(String(t || ''));
  const MARKS = ['.', ',', ';', ':', '?', '!', '–', '״', '(', ')'];
  function block(b, i) {
    const t = b.t || 'text';
    if (t === 'passage') return `<p class="xm-passage">${rich(b.v)}</p>`;
    if (t === 'img') { const h = imgHtml(b.src); return h ? `<figure class="xm-fig">${h}${b.cap ? `<figcaption>${esc(b.cap)}</figcaption>` : ''}</figure>` : ''; }
    if (t === 'mc') {
      // options labelled א, ב, ג like most exams, or (1), (2), (3) when the exam numbers them
      const id = nf('choice', 'תשובה'); const L = k => b.num ? `(${k + 1})` : 'אבגדהוזחטי'[k];
      return `<div class="xm-mc" role="radiogroup">${(b.opts || []).map((o, k) => `<button type="button" class="xm-opt xm-mco" role="radio" aria-checked="false" data-f="${id}" data-v="${esc(L(k) + (b.num ? ' ' : '. ') + o)}"><span class="xm-ml">${L(k)}</span><span>${rich(o)}</span></button>`).join('')}</div>`;
    }
    if (t === 'punct') {
      // a text without punctuation: the student adds a mark in the gap after any word
      const words = String(b.v || '').split(/\s+/).filter(Boolean);
      const id = nf('punct', 'הפיסוק'); FIELD[id].words = words.map(w => w.replace(/\*\*/g, '')); FIELD[id].marks = (b.marks && b.marks.length ? b.marks : MARKS);
      return `<p class="xm-punct">${words.map((w, k) => `<span class="xm-sw">${fmt(w)}</span><button type="button" class="xm-pg" data-pu="${id}" data-i="${k}" aria-label="סימן פיסוק אחרי ${esc(w.replace(/\*\*/g, ''))}"></button>`).join(' ')}</p><p class="xm-hint">לחצו אחרי מילה כדי להוסיף שם סימן פיסוק. לחיצה על סימן קיים מאפשרת להחליף או למחוק אותו.</p>`;
    }
    if (t === 'long') { const id = nf('text', 'תשובה'); return `<textarea class="xm-a" data-f="${id}" rows="${b.rows || 3}" spellcheck="false" placeholder="כתבו כאן את התשובה" aria-label="תשובה"></textarea>`; }
    if (t === 'essay') {
      const id = nf('text', 'חיבור'); FIELD[id].essay = { min: +b.min || 0, max: +b.max || 0 };
      return `<div class="xm-essay"><textarea class="xm-a" data-f="${id}" rows="${b.rows || 14}" spellcheck="false" placeholder="כתבו כאן" aria-label="חיבור"></textarea><div class="xm-wc" data-wc="${id}"></div></div>`;
    }
    if (t === 'mark' || t === 'split') {
      const words = String(b.v || '').split(/\s+/).filter(Boolean);
      const id = nf('set', t === 'mark' ? 'המילים שסומנו' : 'החלוקה'); FIELD[id].words = words.map(w => w.replace(/\*\*/g, '')); FIELD[id].kind = t;
      if (t === 'mark') return `<p class="xm-mark">${words.map((w, k) => `<button type="button" class="xm-w" data-mk="${id}" data-i="${k}" aria-pressed="false">${fmt(w)}</button>`).join(' ')}</p><p class="xm-hint">לחצו על מילה כדי לסמן אותה, ולחיצה נוספת מבטלת.</p>`;
      // with a label, every part between the boundaries also gets a role, a clause type or free text
      if (b.label) FIELD[id].seg = { name: b.label === 'free' ? '' : b.label, list: b.label === 'free' ? null : listOf(b.label) };
      const segHint = b.label ? ` אחר כך ציינו ליד כל חלק את ${b.label === 'free' ? 'מה שנדרש' : 'ה' + b.label}.` : '';
      return `<p class="xm-split">${words.map((w, k) => `<span class="xm-sw">${fmt(w)}</span>` + (k < words.length - 1 ? `<button type="button" class="xm-gap" data-sp="${id}" data-i="${k}" aria-pressed="false" aria-label="גבול אחרי ${esc(w.replace(/\*\*/g, ''))}"></button>` : '')).join('')}</p>${b.label ? `<div class="xm-segs" data-segs="${id}"></div>` : ''}<p class="xm-hint">לחצו על הרווח בין שתי מילים כדי לסמן שם גבול (/), ולחיצה נוספת מבטלת.${segHint}</p>`;
    }
    if (t === 'sort') {
      const items = (b.items || []).filter(Boolean), n = Math.max(2, Math.min(5, +b.cols || 2)), sid = 'srt' + (++sortN);
      const hl = b.head && listOf(b.head), heads = [];
      let cols = '';
      for (let c = 0; c < n; c++) {
        const o = { wide: true, list: hl };
        const head = hl ? field('list', `כותרת עמודה ${c + 1}`, o) : field('text', `כותרת עמודה ${c + 1}`, o);
        heads.push(o.id);
        const mean = b.meaning ? `<label class="xm-sm">המשמעות המשותפת${field('text', `משמעות עמודה ${c + 1}`, { wide: true })}</label>` : '';
        cols += `<div class="xm-scol"><label class="xm-sh2">${esc(b.headLabel || (hl ? b.head : 'כותרת'))}${head}</label><div class="xm-drop" data-sort="${sid}" data-col="${c}"></div>${mean}</div>`;
      }
      const ids = items.map(w => { const id = nf('sort', w.replace(/\*\*/g, '')); FIELD[id].sort = { sid, heads }; return id; });
      SORTS[sid] = { ids, items };
      return `<div class="xm-sorter" data-sorter="${sid}"><p class="xm-hint">לחצו על מילה ואז על העמודה שלה (אפשר גם לגרור). לחיצה על המאגר מחזירה אותה.</p><div class="xm-pool xm-drop" data-sort="${sid}" data-col=""></div><div class="xm-scols" style="--n:${n}">${cols}</div></div>`;
    }
    if (t === 'match') {
      const right = (b.right || []).filter(Boolean);
      return `<div class="xm-tw"><table class="xm-grid xm-match"><tbody>${(b.left || []).filter(Boolean).map(l => `<tr><td>${rich(l)}</td><td>${field('list', String(l).replace(/\*\*/g, ''), { list: right })}</td></tr>`).join('')}</tbody></table></div>`;
    }
    if (t === 'table') {
      const rows = b.rows || []; const head = b.head !== false && rows.length > 1;
      const cell = (c, r, k) => {
        const txt = String(c == null ? '' : c);
        if (!txt.trim()) return field('text', `${(rows[r] && rows[r][0]) || ''} · ${(head && rows[0][k]) || 'עמודה ' + (k + 1)}`.replace(/^ · /, ''), { wide: true });
        return rich(txt);
      };
      return `<div class="xm-tw"><table class="xm-grid">${head ? `<thead><tr>${rows[0].map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${rows.slice(head ? 1 : 0).map((r, ri) => `<tr>${r.map((c, k) => `<td>${cell(c, ri + (head ? 1 : 0), k)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    return `<p class="xm-t">${rich(b.v)}</p>`;
  }
  const ptsTxt = p => (p || p === 0) && p !== '' ? `<span class="xm-pts">${p} נק׳</span>` : '';

  let sheet = '';
  if (data.instructions && data.instructions.length) sheet += `<details class="xm-instr" open><summary>הוראות לנבחן</summary>${data.instructions.map(l => `<p>${artText(l)}</p>`).join('')}</details>`;
  // choices: parts that share an "alt" group are alternatives (the student answers one of them),
  // and a part with "pick" asks for only that many of its questions
  const PARTS = data.parts || [], ALT = {};
  PARTS.forEach((p, pi) => { if (p.alt) (ALT[p.alt] = ALT[p.alt] || []).push(pi); });
  const altOf = pi => { const g = PARTS[pi] && PARTS[pi].alt; return g && ALT[g].length > 1 ? g : ''; };
  const pickOf = pi => { const p = PARTS[pi], n = Math.floor(+(p && p.pick) || 0); return n > 0 && n < (p.qs || []).length ? n : 0; };
  PARTS.forEach((part, pi) => {
    const grp = altOf(pi);
    if (grp && ALT[grp][0] === pi) sheet += `<div class="xm-alt" data-alt="${esc(grp)}"><b>בפרקים הבאים בוחרים פרק אחד. באיזה פרק תענו?</b><div class="xm-row">${ALT[grp].map(k => `<button type="button" class="xm-btn" data-altp="${k}" aria-pressed="false">${esc(PARTS[k].title || 'פרק ' + (k + 1))}</button>`).join('')}</div></div>`;
    sheet += `<div class="xm-pw" data-pw="${pi}">`;
    if (part.title || opts.editable) sheet += `<div class="xm-part"><h2>${esc(part.title || 'חלק ללא שם')}</h2>${part.pts ? `<span>${esc(part.pts)}</span>` : ''}${opts.editable ? `<button type="button" class="xm-edit" data-editpart="${pi}">✎ עריכה</button>` : ''}</div>`;
    if (part.note) sheet += `<p class="xm-pnote">${rich(part.note)}</p>`;
    if (pickOf(pi)) sheet += `<p class="xm-pickinfo" data-pickinfo="${pi}"></p>`;
    if (grp) sheet += `<p class="xm-poff">לא בחרתם בפרק הזה. <button type="button" class="xm-btn" data-altp="${pi}">לענות על הפרק הזה</button></p>`;
    (part.qs || []).forEach((q, qi) => {
      const qid = `xq${pi}-${qi}`;
      sheet += `<section class="xm-q" id="${qid}">${opts.editable ? `<button type="button" class="xm-edit" data-edit="${pi}.${qi}">✎ עריכה</button>` : ''}`;
      if (pickOf(pi)) sheet += `<label class="xm-pick"><input type="checkbox" data-pick="${pi}.${qi}"> בחרתי לענות על שאלה ${esc(q.n)}</label>`;
      const hasIntro = q.intro && q.intro.length;
      if (hasIntro) {
        cur = { id: qid + 'i', label: String(q.n || ''), nav: String(q.n || ''), part: pi, q: qi, fields: [] };
        const html = q.intro.map(block).join('');
        if (cur.fields.length) ITEMS.push(cur);
        sheet += `<div class="xm-qh" id="${cur.id}"><span class="xm-qn">${esc(q.n)}.</span><div class="xm-qi">${html}</div></div>`;
      }
      (q.subs || []).forEach((s, si) => {
        const id = `${qid}-${si}`;
        const lab = String(s.l || '');
        cur = { id, label: String(q.n || '') + lab, nav: String(q.n || '') + lab.replace(/[()\s]/g, ''), part: pi, q: qi, fields: [] };
        const blocks = s.blocks || [];
        const first = blocks[0] && (blocks[0].t || 'text') === 'text' ? blocks[0] : null;
        const headHtml = first ? rich(first.v) : '';
        const rest = (first ? blocks.slice(1) : blocks).map(block).join('');
        const tracked = cur.fields.length > 0;
        if (tracked) ITEMS.push(cur);
        const lead = !hasIntro && si === 0 ? `<span class="xm-qn">${esc(q.n)}.</span>` : '';
        sheet += `<div class="xm-sub${si === 0 && !hasIntro ? ' first' : ''}" id="${id}"><div class="xm-sh">${lead}${lab ? `<span class="xm-sl">${esc(lab)}.</span>` : ''}<div class="xm-sp">${headHtml}</div>${ptsTxt(s.pts)}<span class="xm-st${tracked ? '' : ' none'}"></span></div>${rest}</div>`;
      });
      sheet += `</section>`;
    });
    sheet += `</div>`;
  });
  if (opts.editable) sheet += `<div class="xm-row" style="justify-content:center"><button type="button" class="xm-btn" data-addq>+ שאלה חדשה בסוף</button></div>`;
  sheet += `<div class="xm-end"><span>סוף המבחן. לפני ההגשה יוצגו כל הסעיפים שעדיין חסרים.</span><button type="button" class="xm-btn primary" data-act="submit">מעבר להגשה</button></div>`;

  const partNames = (data.parts || []).map(p => (p.title || '').replace(/^(חלק|פרק)\s+\S+\s*[:\-–]\s*/, '').slice(0, 28) || 'שאלות');
  const nav = (data.parts || []).map((p, pi) => {
    const its = ITEMS.filter(i => i.part === pi); if (!its.length) return '';
    return `<div class="xm-grp"><h3>${esc(partNames[pi])}</h3><div class="xm-chips">${its.map(i => `<button type="button" class="xm-chip" data-go="${i.id}" aria-label="סעיף ${esc(i.label)}">${esc(i.nav)}</button>`).join('')}</div></div>`;
  }).join('');

  root.classList.add('xm');
  root.setAttribute('dir', 'rtl'); root.setAttribute('lang', 'he');
  root.innerHTML = `
  <header class="xm-top">
    <div class="xm-brand"><b>${esc(data.title || 'מבחן')}</b>${data.subtitle ? `<span>${esc(data.subtitle)}</span>` : ''}</div>
    <label class="xm-who">שם:<input data-name type="text" autocomplete="off" spellcheck="false" placeholder="שם מלא"></label>
    <div class="xm-grow"></div>
    <div class="xm-timer"><span class="xm-clock" data-clock></span>${set.ext > 0 ? `<label class="xm-toggle"><input type="checkbox" data-ext> הארכת זמן ${+set.ext}%</label>` : ''}</div>
    <div class="xm-tools">
      <div class="xm-seg" role="group" aria-label="גודל טקסט"><button type="button" data-act="fs-" aria-label="הקטנת טקסט">א-</button><button type="button" data-act="fs+" aria-label="הגדלת טקסט">א+</button></div>
      <div class="xm-seg" role="group" aria-label="הצגה והסתרה של חלונות"><button type="button" data-tg="map" aria-pressed="true">מספרי שאלות</button>${arts.length ? `<button type="button" data-tg="arts" aria-pressed="true">${esc(set.textsName)}</button>` : ''}${set.draft !== false ? '<button type="button" data-tg="draft" aria-pressed="false">טיוטה</button>' : ''}</div>
      <button type="button" class="xm-btn primary" data-act="submit">הגשה</button>
    </div>
  </header>
  <div class="xm-desk">
    <nav class="xm-map" data-map aria-label="מספרי שאלות">
      <div class="xm-prog"><div class="xm-prog-top"><span>סעיפים שנענו</span><b data-prog></b><button type="button" class="xm-x" data-act="map-x" aria-label="הסתרה">×</button></div>
        <div class="xm-bar"><i class="d" data-bd></i><i class="p" data-bp></i></div>
        <div class="xm-legend"><span class="l-d">נענה</span><span class="l-p">חלקי</span><span class="l-e">ריק</span></div></div>
      <div class="xm-grps">${nav}</div>
    </nav>
    <div class="xm-rz xm-rz-m" data-rz="map" role="separator" aria-orientation="vertical" aria-label="שינוי רוחב" tabindex="0"></div>
    <main class="xm-col" data-col>
      <div class="xm-sheet">${sheet}</div>
      <div class="xm-nk off" data-nk role="toolbar" aria-label="מקלדת ניקוד"${set.nikud ? '' : ' hidden'}>
        <div class="xm-grip" data-grip role="separator" aria-orientation="horizontal" aria-label="שינוי גודל הניקוד" tabindex="0"></div>
        <div class="xm-nk-l">ניקוד</div>
        <div class="xm-nk-k">${NIKUD.map(([m, n, b]) => `<button type="button" class="xm-key" data-mark="${m}" title="${n}"><b>${(b == null ? 'ב' : b) + m}</b></button>`).join('')}</div>
        <button type="button" class="xm-x" data-act="nk-x" aria-label="הסתרת הניקוד">×</button>
      </div>
    </main>
    ${arts.length ? `<div class="xm-rz xm-rz-a" data-rz="arts" role="separator" aria-orientation="vertical" aria-label="שינוי רוחב המאמרים" tabindex="0"></div>
    <aside class="xm-arts" data-arts aria-label="${esc(set.textsName)}">
      <div class="xm-tabs" role="tablist">${arts.map((a, i) => `<button type="button" class="xm-tab" role="tab" data-tab="${i}">${esc(set.textItem)} ${i + 1}</button>`).join('')}<button type="button" class="xm-x xm-full" data-act="arts-full" aria-label="מסך מלא" title="מסך מלא">⤢</button><button type="button" class="xm-x" data-act="arts-x" aria-label="הסתרה">×</button></div>
      <div class="xm-ab" data-ab></div>
    </aside>` : ''}
  </div>
  ${set.nikud ? '<button type="button" class="xm-fab" data-tg="nk" aria-pressed="true" title="מקלדת ניקוד" aria-label="מקלדת ניקוד"><b>אָ</b><small>ניקוד</small></button>' : ''}
  <div class="xm-draft" data-draft hidden><div class="xm-draft-h"><b>טיוטה</b><span>לא נבדקת</span><button type="button" class="xm-x" data-act="draft-x" aria-label="סגירת הטיוטה">×</button></div><textarea class="xm-a" data-draftta spellcheck="false" placeholder="כאן אפשר לכתוב ראשי פרקים, טיוטה לחיבור וכל מה שעוזר"></textarea></div>
  <div class="xm-ov" data-modal hidden><div class="xm-modal" role="dialog" aria-modal="true"><h2>לפני ההגשה</h2><div data-mbody></div><div class="xm-row"><button type="button" class="xm-btn primary" data-act="confirm">הגשה</button><button type="button" class="xm-btn" data-act="back">חזרה למבחן</button></div></div></div>
  <div class="xm-res" data-res hidden><div class="xm-res-in">
    <h2>המבחן הוגש</h2><p class="xm-meta" data-rmeta></p>
    <div class="xm-row">${preview ? '' : '<button type="button" class="xm-btn primary" data-act="save">שמירת התשובות כקובץ Word</button>'}<button type="button" class="xm-btn" data-act="copy">העתקת התשובות</button><button type="button" class="xm-btn" data-act="reopen">חזרה למבחן</button></div>
    ${preview ? '<p class="xm-meta">בתצוגה המקדימה אין שמירה לקובץ. בקובץ המבחן שמורידים יש כפתור ששומר את התשובות כקובץ Word.</p>' : ''}
    <textarea class="xm-a" data-copyfb hidden readonly style="min-height:8em"></textarea>
    <div class="xm-sheet-t" data-rsheet></div>
  </div></div>`;

  const q = sel => root.querySelector(sel);
  const qa = sel => root.querySelectorAll(sel);

  /* ---------- state ---------- */
  const meta = Object.assign({ name: '', start: Date.now(), ext: false, submitted: false }, store.get('m') || {});
  Object.assign(S, store.get('s') || {});
  const ui = Object.assign({ map: true, arts: true, nk: true, draft: false, mapW: 236, artW: 0, nkz: 1, fs: 1 }, store.get('ui') || {});
  const save = () => { store.set('s', S); store.set('m', meta); };
  const saveUi = () => store.set('ui', ui);

  const filled = id => {
    const v = S[id], f = FIELD[id], t = f.type;
    if (t === 'root') return Array.isArray(v) && v.filter(Boolean).length >= 3;
    if (t === 'set') return Array.isArray(v) && v.length > 0 && (!f.seg || Object.values(S[id + ':L'] || {}).some(x => String(x).trim()));
    if (t === 'punct') return !!v && Object.values(v).some(Boolean);
    return v != null && String(v).trim() !== '';
  };
  // which parts and questions the student is answering
  const qChosen = (pi, qi) => !!(meta.pick && meta.pick[pi + '.' + qi]) || ITEMS.some(i => i.part === pi && i.q === qi && i.fields.some(filled));
  const partOn = pi => { const g = altOf(pi); return !g || !meta.alt || meta.alt[g] == null || meta.alt[g] === pi; };
  const active = it => partOn(it.part) && (!pickOf(it.part) || qChosen(it.part, it.q));
  const pickCount = pi => (PARTS[pi].qs || []).filter((x, qi) => qChosen(pi, qi)).length;
  function applyChoices() {
    PARTS.forEach((p, pi) => {
      const w = q(`[data-pw="${pi}"]`); if (w) w.classList.toggle('off', !partOn(pi));
      const n = pickOf(pi); if (!n) return;
      const k = pickCount(pi), info = q(`[data-pickinfo="${pi}"]`);
      if (info) { info.textContent = `בחלק הזה עונים על ${n} מתוך ${p.qs.length} השאלות. בחרתם ${k}.${k > n ? ` זה יותר מ-${n}.` : ''}`; info.classList.toggle('over', k > n); info.classList.toggle('ok', k === n); }
      p.qs.forEach((x, qi) => {
        const c = q(`[data-pick="${pi}.${qi}"]`), on = qChosen(pi, qi); if (c) c.checked = on;
        const sec = q(`#xq${pi}-${qi}`); if (sec) sec.classList.toggle('unpicked', !on && k >= n);
      });
    });
    Object.keys(ALT).forEach(g => qa(`[data-alt="${g}"] [data-altp]`).forEach(b => b.setAttribute('aria-pressed', String(!!meta.alt && meta.alt[g] === +b.dataset.altp))));
  }
  function renderSegs(id) {
    const box = q(`[data-segs="${id}"]`), f = FIELD[id]; if (!box || !f.seg) return;
    const cuts = S[id] || [], labs = S[id + ':L'] || {}, segs = []; let st = 0;
    [...cuts, f.words.length - 1].forEach(c => { if (c >= st) { segs.push([st, c]); st = c + 1; } });
    box.innerHTML = segs.map(([a, z]) => {
      const v = labs[a] || '', txt = f.words.slice(a, z + 1).join(' ');
      const ctl = f.seg.list ? `<select class="xm-a${v ? ' has' : ''}" data-sl="${id}" data-st="${a}" aria-label="${esc(txt)}"><option value="">${esc(f.seg.name)}…</option>${f.seg.list.map(o => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`
        : `<input class="xm-a${v ? ' has' : ''}" data-sl="${id}" data-st="${a}" type="text" value="${esc(v)}" autocomplete="off" spellcheck="false" aria-label="${esc(txt)}">`;
      return `<div class="xm-segr"><span>${esc(txt)}</span>${ctl}</div>`;
    }).join('');
  }
  function setSeg(el) { const id = el.dataset.sl, labs = Object.assign({}, S[id + ':L'] || {}); labs[el.dataset.st] = el.value; S[id + ':L'] = labs; markHas(el); save(); refresh(FIELD[id].item); }
  let pmenu = null;
  const closePunct = () => { if (pmenu) { pmenu.remove(); pmenu = null; } };
  function openPunct(btn) {
    closePunct();
    const id = btn.dataset.pu, f = FIELD[id], r = btn.getBoundingClientRect();
    const m = document.createElement('div'); m.className = 'xm-pmenu'; m.setAttribute('role', 'menu');
    m.dataset.pu = id; m.dataset.i = btn.dataset.i;
    m.innerHTML = f.marks.map(x => `<button type="button" role="menuitem" data-pm="${esc(x)}">${esc(x)}</button>`).join('') + '<button type="button" role="menuitem" class="clr" data-pm="">ללא</button>';
    m.style.top = Math.min(window.innerHeight - 60, r.bottom + 4) + 'px'; m.style.left = Math.max(4, Math.min(window.innerWidth - 280, r.left - 120)) + 'px';
    root.appendChild(m); pmenu = m; m.querySelector('button').focus();
  }
  function showPunct(id) { const v = S[id] || {}; qa(`[data-pu="${id}"]`).forEach(b => { const x = v[b.dataset.i] || ''; b.textContent = x; b.classList.toggle('has', !!x); }); }
  const words = s => (String(s || '').trim().match(/\S+/g) || []).length;
  function essayCount(id) {
    const el = q(`[data-wc="${id}"]`); if (!el) return;
    const n = words(S[id]), e = FIELD[id].essay, rng = e.min && e.max ? `${e.min}–${e.max}` : e.min ? `לפחות ${e.min}` : e.max ? `עד ${e.max}` : '';
    el.textContent = `${n} מילים${rng ? ` · נדרש ${rng}` : ''}`;
    el.classList.toggle('ok', !!rng && (!e.min || n >= e.min) && (!e.max || n <= e.max));
    el.classList.toggle('over', !!e.max && n > e.max);
  }
  let picked = null;
  function renderSort(sid) {
    const s = SORTS[sid], box = q(`[data-sorter="${sid}"]`); if (!box) return;
    box.querySelectorAll('.xm-drop').forEach(d => { d.innerHTML = ''; });
    s.ids.forEach((id, i) => {
      const c = S[id], tgt = c == null || c === '' ? box.querySelector('.xm-pool') : box.querySelector(`.xm-drop[data-col="${c}"]`);
      if (tgt) tgt.insertAdjacentHTML('beforeend', `<button type="button" class="xm-wc2" draggable="true" data-chip="${id}" aria-pressed="${picked === id}">${fmt(s.items[i])}</button>`);
    });
    box.classList.toggle('picking', !!picked && s.ids.includes(picked));
  }
  function place(id, col) { picked = null; setVal(id, col); Object.keys(SORTS).forEach(renderSort); }
  const status = it => { const n = it.fields.filter(filled).length; return n === 0 ? 'empty' : n === it.fields.length ? 'done' : 'partial'; };
  function refresh(only) {
    applyChoices();
    // a choice can change which items count, so the chips of every item are refreshed
    ITEMS.forEach(i => {
      const st = status(i);
      if (!only || i === only) { const dot = root.querySelector(`#${i.id} .xm-st`); if (dot) dot.className = 'xm-st ' + st; }
      const ch = q(`[data-go="${i.id}"]`); if (ch) ch.className = 'xm-chip ' + st + (active(i) ? '' : ' off') + (ch.classList.contains('here') ? ' here' : '');
    });
    const act = ITEMS.filter(active);
    let d = 0, p = 0; act.forEach(i => { const s = status(i); if (s === 'done') d++; else if (s === 'partial') p++; });
    const n = act.length || 1;
    q('[data-prog]').textContent = `${d}/${act.length}`;
    q('[data-bd]').style.width = d / n * 100 + '%'; q('[data-bp]').style.width = p / n * 100 + '%';
  }
  const markHas = el => el.classList.toggle('has', el.value.trim() !== '');
  function setVal(id, v) { S[id] = v; save(); refresh(FIELD[id].item); }
  function applyAll() {
    qa('[data-f]').forEach(el => { const id = el.dataset.f; if (el.classList.contains('xm-opt')) el.setAttribute('aria-checked', String(S[id] === el.dataset.v)); else { el.value = S[id] == null ? '' : S[id]; markHas(el); } });
    qa('[data-rf]').forEach(el => { const v = S[el.dataset.rf] || []; el.value = v[+el.dataset.i] || ''; markHas(el); });
    qa('[data-mk], [data-sp]').forEach(el => { const v = S[el.dataset.mk || el.dataset.sp] || []; el.setAttribute('aria-pressed', String(v.includes(+el.dataset.i))); });
    Object.keys(FIELD).forEach(id => { if (FIELD[id].seg) renderSegs(id); if (FIELD[id].type === 'punct') showPunct(id); });
    Object.keys(SORTS).forEach(renderSort);
    Object.keys(FIELD).forEach(id => { if (FIELD[id].essay) essayCount(id); });
    q('[data-name]').value = meta.name || ''; const ex = q('[data-ext]'); if (ex) ex.checked = !!meta.ext;
    const dt = q('[data-draftta]'); if (dt) dt.value = meta.draft || '';
    refresh();
  }

  /* ---------- panels ---------- */
  const narrow = () => root.classList.contains('narrow');
  function applyUi() {
    root.style.setProperty('--mapW', ui.mapW + 'px');
    if (ui.artW) root.style.setProperty('--artW', ui.artW + 'px');
    root.style.setProperty('--nkz', ui.nkz); root.style.setProperty('--fs', ui.fs);
    q('[data-map]').hidden = q('[data-rz="map"]').hidden = !ui.map;
    if (arts.length) { q('[data-arts]').hidden = q('[data-rz="arts"]').hidden = !narrow() && !ui.arts; }
    if (!ui.nk) q('[data-nk]').classList.add('off');
    const set = (k, v) => { const b = q(`[data-tg="${k}"]`); if (b) b.setAttribute('aria-pressed', String(v)); };
    q('[data-draft]').hidden = !ui.draft; set('draft', !!ui.draft);
    set('map', ui.map); set('nk', ui.nk); if (arts.length) set('arts', narrow() ? q('[data-arts]').classList.contains('open') : ui.arts);
  }
  function setFull(on) {
    const el = q('[data-arts]'), b = q('[data-act="arts-full"]'); if (!el) return;
    el.classList.toggle('full', on);
    if (b) { b.textContent = on ? '⤡' : '⤢'; b.title = b.ariaLabel = on ? 'יציאה ממסך מלא' : 'מסך מלא'; b.setAttribute('aria-label', b.title); }
  }
  function setArts(on) { if (!arts.length) return; if (narrow()) q('[data-arts]').classList.toggle('open', on); else { ui.arts = on; saveUi(); } applyUi(); }
  let curArt = -1;
  function showArt(a, p) {
    if (!arts[a]) return;
    curArt = a; const A = arts[a];
    qa('.xm-tab').forEach(t => t.setAttribute('aria-selected', String(+t.dataset.tab === a)));
    const ab = q('[data-ab]');
    // a paragraph that is only a picture (a chart, an infographic) is shown without a number
    let n = 0;
    ab.innerHTML = `<h4>${esc(A.title || set.textItem + ' ' + (a + 1))}</h4>${A.by ? `<p class="xm-by">${esc(A.by)}</p>` : ''}${(A.ps || []).map(t => onlyImg(t) ? `<div class="xm-para pic">${artText(t)}</div>` : `<div class="xm-para" data-pp="${++n}"><span>${parLab(A, n)}</span><p>${artText(t)}</p></div>`).join('')}`;
    const el = p && ab.querySelector(`[data-pp="${p}"]`);
    if (el) requestAnimationFrame(() => { ab.scrollTop = el.offsetTop - 8; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); });
    else ab.scrollTop = 0;
  }
  if (arts.length) showArt(0);
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
    const w = root.clientWidth, wasN = narrow();
    root.classList.toggle('narrow', w < 1000); root.classList.toggle('phone', w < 700);
    if (wasN !== narrow()) applyUi();
  }) : null;
  if (ro) ro.observe(root);

  function dragger(el, begin, move, key) {
    if (!el) return;
    el.addEventListener('pointerdown', e => {
      e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add('drag');
      const st = begin(e), mv = ev => { move(ev, st); applyUi(); };
      const up = () => { el.classList.remove('drag'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); saveUi(); };
      el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
    el.addEventListener('keydown', e => { if (key(e.key)) { e.preventDefault(); applyUi(); saveUi(); } });
  }
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  dragger(q('[data-rz="map"]'), () => q('[data-map]').getBoundingClientRect().right, (e, r) => { ui.mapW = Math.round(clamp(r - e.clientX, 150, 420)); },
    k => { if (k === 'ArrowLeft') ui.mapW = clamp(ui.mapW + 20, 150, 420); else if (k === 'ArrowRight') ui.mapW = clamp(ui.mapW - 20, 150, 420); else return false; return true; });
  if (arts.length) dragger(q('[data-rz="arts"]'), () => q('[data-arts]').getBoundingClientRect().left, (e, l) => { ui.artW = Math.round(clamp(e.clientX - l, 240, root.clientWidth * .6)); },
    k => { const w = ui.artW || q('[data-arts]').offsetWidth; if (k === 'ArrowRight') ui.artW = clamp(w + 20, 240, root.clientWidth * .6); else if (k === 'ArrowLeft') ui.artW = clamp(w - 20, 240, root.clientWidth * .6); else return false; return true; });
  dragger(q('[data-grip]'), e => ({ y: e.clientY, z: ui.nkz }), (e, s) => { ui.nkz = Math.round(clamp(s.z + (s.y - e.clientY) / 50, .8, 2.2) * 100) / 100; },
    k => { if (k === 'ArrowUp') ui.nkz = clamp(ui.nkz + .1, .8, 2.2); else if (k === 'ArrowDown') ui.nkz = clamp(ui.nkz - .1, .8, 2.2); else return false; return true; });

  /* ---------- events ---------- */
  let lastText = null;
  const isText = t => t.matches && t.matches('input.xm-a, textarea.xm-a') && !t.hasAttribute('readonly');
  root.addEventListener('focusin', e => { if (isText(e.target)) { lastText = e.target; if (ui.nk && set.nikud) q('[data-nk]').classList.remove('off'); } });
  root.addEventListener('focusout', e => { const to = e.relatedTarget; if (to && (isText(to) || (to.closest && to.closest('[data-nk], .xm-fab')))) return; q('[data-nk]').classList.add('off'); });
  ['mousedown', 'pointerdown'].forEach(ev => q('[data-nk]').addEventListener(ev, e => { if (e.target.closest('.xm-key, [data-grip]')) e.preventDefault(); }));
  const fab = q('.xm-fab'); if (fab) fab.addEventListener('mousedown', e => e.preventDefault());
  root.addEventListener('input', e => {
    const t = e.target;
    if (t.hasAttribute('data-name')) { meta.name = t.value; save(); return; }
    if (t.hasAttribute('data-draftta')) { meta.draft = t.value; save(); return; }
    if (t.dataset.f) { markHas(t); setVal(t.dataset.f, t.value); if (FIELD[t.dataset.f].essay) essayCount(t.dataset.f); return; }
    if (t.dataset.sl && t.tagName === 'INPUT') { setSeg(t); return; }
    if (t.dataset.rf) {
      t.value = t.value.replace(/[^א-ת]/g, '').slice(-1); markHas(t);
      const id = t.dataset.rf, arr = (S[id] || ['', '', '', '']).slice(); arr[+t.dataset.i] = t.value; setVal(id, arr);
      if (t.value) { const nx = t.parentElement.querySelector(`[data-i="${+t.dataset.i + 1}"]`); if (nx) nx.focus(); }
    }
  });
  root.addEventListener('change', e => {
    if (e.target.matches('select[data-f]')) { markHas(e.target); setVal(e.target.dataset.f, e.target.value); }
    if (e.target.matches('select[data-sl]')) setSeg(e.target);
    if (e.target.hasAttribute('data-pick')) { meta.pick = Object.assign({}, meta.pick, { [e.target.dataset.pick]: e.target.checked }); save(); refresh(); }
    if (e.target.hasAttribute('data-ext')) { meta.ext = e.target.checked; save(); tick(); }
  });
  root.addEventListener('keydown', e => {
    const t = e.target;
    if (t.dataset && t.dataset.rf && e.key === 'Backspace' && !t.value) { const pv = t.parentElement.querySelector(`[data-i="${+t.dataset.i - 1}"]`); if (pv) { e.preventDefault(); pv.focus(); } }
    if (e.key === 'Escape') { if (pmenu) { const b = q(`[data-pu="${pmenu.dataset.pu}"][data-i="${pmenu.dataset.i}"]`); closePunct(); if (b) b.focus(); return; } const a = q('[data-arts]'); if (a && a.classList.contains('full')) { setFull(false); return; } q('[data-modal]').hidden = true; if (narrow()) setArts(false); }
  });
  root.addEventListener('dragstart', e => { const c = e.target.closest && e.target.closest('[data-chip]'); if (c) { e.dataTransfer.setData('text/plain', c.dataset.chip); e.dataTransfer.effectAllowed = 'move'; } });
  root.addEventListener('dragover', e => { const d = e.target.closest && e.target.closest('.xm-drop'); if (d) { e.preventDefault(); d.classList.add('over'); } });
  root.addEventListener('dragleave', e => { const d = e.target.closest && e.target.closest('.xm-drop'); if (d) d.classList.remove('over'); });
  root.addEventListener('drop', e => {
    const d = e.target.closest && e.target.closest('.xm-drop'); if (!d) return;
    e.preventDefault(); d.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain'); if (id && FIELD[id] && FIELD[id].sort && FIELD[id].sort.sid === d.dataset.sort) place(id, d.dataset.col);
  });
  function goTo(id) {
    const el = root.querySelector('#' + id); if (!el) return;
    const col = q('[data-col]'); col.scrollTop += el.getBoundingClientRect().top - col.getBoundingClientRect().top - 12;
    if (root.classList.contains('phone')) el.scrollIntoView({ block: 'start' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    qa('.xm-chip.here').forEach(c => c.classList.remove('here'));
    const ch = q(`[data-go="${id}"]`); if (ch) ch.classList.add('here');
    const f = el.querySelector('input, textarea, select, .xm-opt'); if (f) setTimeout(() => f.focus({ preventScroll: true }), 50);
  }
  root.addEventListener('click', e => {
    const t = e.target;
    const pm = t.closest('[data-pm]');
    if (pm && pmenu) {
      const id = pmenu.dataset.pu, k = pmenu.dataset.i, v = Object.assign({}, S[id] || {});
      if (pm.dataset.pm) v[k] = pm.dataset.pm; else delete v[k];
      closePunct(); setVal(id, v); showPunct(id); const b = q(`[data-pu="${id}"][data-i="${k}"]`); if (b) b.focus(); return;
    }
    if (pmenu && !t.closest('.xm-pmenu')) closePunct();
    const pg = t.closest('[data-pu]'); if (pg) { openPunct(pg); return; }
    const altp = t.closest('[data-altp]');
    if (altp) {
      const pi = +altp.dataset.altp, g = altOf(pi); if (!g) return;
      meta.alt = Object.assign({}, meta.alt, { [g]: pi }); save(); refresh();
      const w = q(`[data-pw="${pi}"]`), col = q('[data-col]'); if (w && altp.closest('.xm-poff')) col.scrollTop += w.getBoundingClientRect().top - col.getBoundingClientRect().top - 12;
      return;
    }
    const opt = t.closest('.xm-opt[data-f]');
    if (opt) { const id = opt.dataset.f, v = S[id] === opt.dataset.v ? '' : opt.dataset.v; qa(`.xm-opt[data-f="${id}"]`).forEach(o => o.setAttribute('aria-checked', String(o.dataset.v === v))); setVal(id, v); return; }
    const tog = t.closest('[data-mk], [data-sp]');
    if (tog) {
      const id = tog.dataset.mk || tog.dataset.sp, i = +tog.dataset.i, v = (S[id] || []).slice(), k = v.indexOf(i);
      if (k >= 0) v.splice(k, 1); else v.push(i);
      v.sort((a, b) => a - b); tog.setAttribute('aria-pressed', String(k < 0)); setVal(id, v); if (FIELD[id].seg) renderSegs(id); return;
    }
    const chip = t.closest('[data-chip]');
    if (chip) { const id = chip.dataset.chip; picked = picked === id ? null : id; Object.keys(SORTS).forEach(renderSort); const again = q(`[data-chip="${id}"]`); if (again) again.focus(); return; }
    const drop = t.closest('.xm-drop');
    if (drop && picked && SORTS[drop.dataset.sort] && SORTS[drop.dataset.sort].ids.includes(picked)) { place(picked, drop.dataset.col); return; }
    const ed = t.closest('[data-edit], [data-editpart], [data-addq]');
    if (ed && opts.onEdit) { opts.onEdit(ed.dataset.edit ? { q: ed.dataset.edit } : ed.dataset.editpart != null ? { part: +ed.dataset.editpart } : { add: true }); return; }
    const key = t.closest('.xm-key');
    if (key) { if (!lastText) return; const el = lastText, a = el.selectionStart == null ? el.value.length : el.selectionStart, b = el.selectionEnd == null ? a : el.selectionEnd; el.focus(); el.setRangeText(key.dataset.mark, a, b, 'end'); el.dispatchEvent(new Event('input', { bubbles: true })); return; }
    const ref = t.closest('.xm-ref'); if (ref) { setArts(true); showArt(+ref.dataset.a, +ref.dataset.p); return; }
    const tab = t.closest('.xm-tab'); if (tab) { showArt(+tab.dataset.tab); return; }
    const go = t.closest('[data-go]'); if (go) { goTo(go.dataset.go); return; }
    const miss = t.closest('[data-miss]'); if (miss) { q('[data-modal]').hidden = true; goTo(miss.dataset.miss); return; }
    const tg = t.closest('[data-tg]');
    if (tg) {
      const k = tg.dataset.tg;
      if (k === 'arts') setArts(narrow() ? !q('[data-arts]').classList.contains('open') : !ui.arts);
      else { ui[k] = !ui[k]; saveUi(); applyUi(); if (k === 'draft' && ui.draft) q('[data-draftta]').focus(); if (k === 'nk' && ui.nk) { if (lastText && lastText.isConnected) { lastText.focus(); q('[data-nk]').classList.remove('off'); } } }
      return;
    }
    const act = t.closest('[data-act]'); if (!act) { if (t === q('[data-modal]')) q('[data-modal]').hidden = true; return; }
    const a = act.dataset.act;
    if (a === 'submit') openSubmit();
    else if (a === 'back') q('[data-modal]').hidden = true;
    else if (a === 'confirm') { q('[data-modal]').hidden = true; meta.submitted = true; save(); showResult(); }
    else if (a === 'reopen') { meta.submitted = false; save(); q('[data-res]').hidden = true; }
    else if (a === 'map-x') { ui.map = false; saveUi(); applyUi(); }
    else if (a === 'arts-x') { setFull(false); setArts(false); }
    else if (a === 'arts-full') setFull(!q('[data-arts]').classList.contains('full'));
    else if (a === 'nk-x') { ui.nk = false; saveUi(); applyUi(); }
    else if (a === 'draft-x') { ui.draft = false; saveUi(); applyUi(); }
    else if (a === 'fs+' || a === 'fs-') { ui.fs = Math.round(clamp(ui.fs + (a === 'fs+' ? .1 : -.1), .85, 1.5) * 100) / 100; saveUi(); applyUi(); }
    else if (a === 'copy') copyAnswers(act);
    else if (a === 'save') saveWord();
  });

  /* ---------- timer ---------- */
  const minutes = +data.minutes || 0;
  function tick() {
    const c = q('[data-clock]'); if (!c) return;
    if (!minutes) { c.parentElement.hidden = true; return; }
    const total = Math.round(minutes * (meta.ext ? 1 + (+set.ext || 0) / 100 : 1) * 60), left = Math.max(0, total - Math.floor((Date.now() - meta.start) / 1000));
    const hh = Math.floor(left / 3600), mm = Math.floor(left % 3600 / 60), ss = left % 60;
    c.textContent = left ? `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : 'הזמן נגמר';
    c.classList.toggle('low', left < 600);
  }
  const timer = setInterval(() => { if (!root.isConnected) clearInterval(timer); else tick(); }, 1000);

  /* ---------- submit ---------- */
  function choiceWarnings() {
    const w = [];
    Object.keys(ALT).forEach(g => { if (ALT[g].length > 1 && (!meta.alt || meta.alt[g] == null)) w.push(`לא בחרתם באיזה פרק לענות: ${ALT[g].map(pi => PARTS[pi].title || 'פרק ' + (pi + 1)).join(' או ')}.`); });
    PARTS.forEach((p, pi) => {
      const n = pickOf(pi); if (!n || !partOn(pi)) return;
      const k = pickCount(pi), name = p.title || 'חלק ' + (pi + 1);
      if (k < n) w.push(`ב${name} צריך לענות על ${n} שאלות, ובחרתם ${k}.`);
      if (k > n) w.push(`ב${name} עניתם על ${k} שאלות, אבל צריך לענות רק על ${n}.`);
    });
    return w;
  }
  function openSubmit() {
    const act = ITEMS.filter(active), missing = act.filter(i => status(i) !== 'done'), warn = choiceWarnings();
    q('[data-mbody]').innerHTML = (warn.length ? `<div class="xm-warn">${warn.map(x => `<p>${esc(x)}</p>`).join('')}</div>` : '') + (!missing.length ? `<p class="xm-ok">כל ${act.length} הסעיפים נענו.</p>`
      : `<p>נשארו <b>${missing.length}</b> סעיפים שלא נענו במלואם. לחיצה על סעיף מעבירה אליו.</p><div class="xm-miss">${missing.map(i => { const st = status(i), n = i.fields.filter(filled).length; return `<button type="button" data-miss="${i.id}"><span>סעיף ${esc(i.label)}</span><em class="${st === 'empty' ? 'e' : ''}">${st === 'empty' ? 'ריק' : `חלקי · ${n} מתוך ${i.fields.length}`}</em></button>`; }).join('')}</div>`);
    q('[data-act="confirm"]').textContent = missing.length || warn.length ? 'הגשה בכל זאת' : 'הגשה';
    q('[data-modal]').hidden = false; q('[data-act="back"]').focus();
  }
  const readable = id => {
    const v = S[id], f = FIELD[id]; if (!filled(id)) return null;
    if (f.type === 'root') return v.filter(Boolean).join('-');
    if (f.type === 'set' && f.kind === 'mark') return v.map(i => f.words[i]).join(' · ');
    if (f.type === 'set' && f.seg) {
      const labs = S[id + ':L'] || {}, out = []; let st = 0;
      [...v, f.words.length - 1].forEach(c => { if (c >= st) { out.push(f.words.slice(st, c + 1).join(' ') + (labs[st] ? ` (${labs[st]})` : '')); st = c + 1; } });
      return out.join(' / ');
    }
    if (f.type === 'set') return f.words.map((w, i) => w + (v.includes(i) ? ' /' : '')).join(' ');
    if (f.type === 'punct') return f.words.map((w, i) => w + (v[i] || '')).join(' ');
    if (f.type === 'sort') { const h = S[f.sort.heads[+v]]; return h ? `${h} (עמודה ${+v + 1})` : `עמודה ${+v + 1}`; }
    if (f.essay) return `${v}\n(${words(v)} מילים)`;
    return String(v);
  };
  function rows() {
    // the parts and questions the student chose, and anything else the student answered anyway
    const r = []; ITEMS.filter(it => active(it) || it.fields.some(filled)).forEach(it => it.fields.forEach((id, k) => r.push({ item: it.label, first: k === 0, span: it.fields.length, label: FIELD[id].label, v: readable(id) })));
    if (meta.draft && meta.draft.trim()) r.push({ item: 'טיוטה', first: true, span: 1, label: 'לא נבדקת', v: meta.draft });
    return r;
  }
  function showResult() {
    const rs = rows();
    q('[data-rsheet]').innerHTML = `<table>${rs.map(r => `<tr>${r.first ? `<th rowspan="${r.span}">${esc(r.item)}</th>` : ''}<td class="k">${esc(r.label)}</td><td class="v${r.v === null ? ' blank' : ''}">${r.v === null ? 'לא נענה' : esc(r.v)}</td></tr>`).join('')}</table>`;
    const act = ITEMS.filter(active);
    q('[data-rmeta]').textContent = `${meta.name || 'ללא שם'} · ${act.filter(i => status(i) === 'done').length} מתוך ${act.length} סעיפים נענו במלואם`;
    q('[data-res]').hidden = false; q('[data-res]').scrollTop = 0;
  }
  const plain = () => `${data.title || 'מבחן'} · ${meta.name || 'ללא שם'}\n\n` + rows().map(r => `${r.item}${r.label ? ' · ' + r.label : ''}: ${r.v == null ? '—' : r.v}`).join('\n');
  function copyAnswers(btn) {
    const txt = plain(), fb = q('[data-copyfb]');
    const fallback = () => { fb.hidden = false; fb.value = txt; fb.focus(); fb.select(); btn.textContent = 'סמנו והעתיקו מהתיבה'; };
    try { navigator.clipboard.writeText(txt).then(() => { btn.textContent = 'הועתק'; }, fallback); } catch (e) { fallback(); }
  }
  function saveWord() {
    const rs = rows();
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${esc(data.title)}</title><style>body{font-family:David,Arial;direction:rtl}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:4px 8px;text-align:right;vertical-align:top}.b{color:#b0700f}</style></head><body dir="rtl"><h2>${esc(data.title || 'מבחן')}</h2><p>שם: ${esc(meta.name || '')}</p><table>${rs.map(r => `<tr>${r.first ? `<th rowspan="${r.span}">${esc(r.item)}</th>` : ''}<td>${esc(r.label)}</td><td${r.v === null ? ' class="b"' : ''}>${r.v === null ? 'לא נענה' : esc(r.v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table></body></html>`;
    const blob = new Blob(['﻿' + html], { type: 'application/msword' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${(meta.name || 'תשובות').replace(/[\\/:*?"<>|]/g, '')} - ${(data.title || 'מבחן').replace(/[\\/:*?"<>|]/g, '')}.doc`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  applyAll(); applyUi(); tick();
  if (meta.submitted) showResult();
  return { destroy() { clearInterval(timer); if (ro) ro.disconnect(); root.innerHTML = ''; }, colScroll: () => q('[data-col]').scrollTop, setColScroll: v => { q('[data-col]').scrollTop = v; } };
}

/* Word (.docx) → exam data. Reads document.xml in order, then guesses structure from Hebrew exam conventions. */
async function readDocx(buf) {
  const zip = await JSZip.loadAsync(buf);
  const docXml = await zip.file('word/document.xml').async('string');
  const numFile = zip.file('word/numbering.xml');
  const numXml = numFile ? await numFile.async('string') : '';
  const P = new DOMParser();
  const doc = P.parseFromString(docXml, 'application/xml');
  const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  const kids = (el, name) => Array.from(el.childNodes).filter(n => n.nodeType === 1 && n.namespaceURI === W && (!name || n.localName === name));
  const kid = (el, name) => el && kids(el, name)[0];
  const attr = (el, name) => el ? (el.getAttributeNS(W, name) || el.getAttribute('w:' + name)) : null;
  const on = el => el && !/^(0|false|none)$/.test(attr(el, 'val') || '');

  // numbering definitions: numId -> levels [{fmt, text, start}]
  const nums = {};
  if (numXml) {
    const nd = P.parseFromString(numXml, 'application/xml');
    const abs = {};
    Array.from(nd.getElementsByTagNameNS(W, 'abstractNum')).forEach(a => {
      abs[attr(a, 'abstractNumId')] = kids(a, 'lvl').map(l => ({ fmt: attr(kid(l, 'numFmt'), 'val') || 'decimal', text: attr(kid(l, 'lvlText'), 'val') || '', start: +(attr(kid(l, 'start'), 'val') || 1) }));
    });
    Array.from(nd.getElementsByTagNameNS(W, 'num')).forEach(n => { nums[attr(n, 'numId')] = abs[attr(kid(n, 'abstractNumId'), 'val')] || []; });
  }
  const counters = {};
  const HEB = 'אבגדהוזחטיכלמנסעפצקרשת';
  const fmtNum = (fmt, n) => fmt === 'decimal' ? String(n) : /hebrew/.test(fmt) ? (HEB[n - 1] || String(n)) : fmt === 'lowerLetter' ? String.fromCharCode(96 + n) : fmt === 'upperLetter' ? String.fromCharCode(64 + n) : /Roman/.test(fmt) ? ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n - 1] || String(n) : '';
  function listPrefix(p) {
    const pPr = kid(p, 'pPr'), numPr = kid(pPr, 'numPr'); if (!numPr) return '';
    const id = attr(kid(numPr, 'numId'), 'val'), lvl = +(attr(kid(numPr, 'ilvl'), 'val') || 0);
    const levels = nums[id]; if (!levels || !levels[lvl] || id === '0') return '';
    const c = counters[id] = counters[id] || [];
    c[lvl] = (c[lvl] == null ? levels[lvl].start - 1 : c[lvl]) + 1;
    for (let k = lvl + 1; k < c.length; k++) c[k] = null;
    if (levels[lvl].fmt === 'bullet' || levels[lvl].fmt === 'none') return '';
    return levels[lvl].text.replace(/%(\d)/g, (_, k) => fmtNum((levels[k - 1] || levels[lvl]).fmt, c[k - 1] == null ? (levels[k - 1] || {}).start || 1 : c[k - 1])) + ' ';
  }
  // pictures: each one gets an id, and the text keeps a [תמונה:id] mark where it stood
  const rels = {}, pics = [];
  const relFile = zip.file('word/_rels/document.xml.rels');
  if (relFile) Array.from(P.parseFromString(await relFile.async('string'), 'application/xml').getElementsByTagName('Relationship')).forEach(r => { rels[r.getAttribute('Id')] = r.getAttribute('Target'); });
  const R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const picFor = rid => { let x = pics.find(p => p.rid === rid); if (!x) { x = { id: 'img' + (pics.length + 1), rid }; pics.push(x); } return x.id; };
  function picIn(n) {
    const blip = n.getElementsByTagNameNS('http://schemas.openxmlformats.org/drawingml/2006/main', 'blip')[0];
    const vml = n.getElementsByTagNameNS('urn:schemas-microsoft-com:vml', 'imagedata')[0];
    const rid = blip ? blip.getAttributeNS(R, 'embed') || blip.getAttribute('r:embed') : vml ? vml.getAttributeNS(R, 'id') || vml.getAttribute('r:id') : '';
    return rid && rels[rid] ? picFor(rid) : '';
  }
  // bold becomes **…**, underline becomes [קו:…]; an underlined run of spaces is an answer line
  const wrap = (s, b, u) => {
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/); let core = m[2];
    if (!core) return u && s.length >= 2 ? ' _____ ' : s;
    if (/^_+$/.test(core)) return s;
    if (u) core = `[קו:${core.replace(/\]/g, ')')}]`;
    if (b) core = `**${core}**`;
    return m[1] + core + m[3];
  };
  function paraText(p) {
    let out = '', bold = false, und = false, buf = '';
    const flush = () => { if (!buf) return; out += wrap(buf, bold, und); buf = ''; };
    Array.from(p.getElementsByTagNameNS(W, 'r')).forEach(r => {
      const rPr = kid(r, 'rPr'); const b = on(kid(rPr, 'b')) || on(kid(rPr, 'bCs')), u = on(kid(rPr, 'u'));
      let t = '';
      kids(r).forEach(n => {
        if (n.localName === 't') t += n.textContent; else if (n.localName === 'tab') t += ' '; else if (n.localName === 'br') t += '\n';
        else if (n.localName === 'drawing' || n.localName === 'pict') { const id = picIn(n); if (id) { flush(); out += t + ` [תמונה:${id}] `; t = ''; } }
      });
      if (!t) return;
      if (b !== bold || u !== und) { flush(); bold = b; und = u; }
      buf += t;
    });
    flush();
    return out.replace(/\*\*\*\*/g, '');
  }
  const lines = [];
  function walk(el) {
    kids(el).forEach(n => {
      if (n.localName === 'p') { const t = (listPrefix(n) + paraText(n)).replace(/ /g, ' '); lines.push({ k: 'p', t }); }
      else if (n.localName === 'tbl') {
        const rows = kids(n, 'tr').map(tr => kids(tr, 'tc').map(tc => kids(tc, 'p').map(paraText).join('\n').trim()));
        lines.push({ k: 'tbl', rows });
      } else if (n.localName === 'sdt') walk(kid(n, 'sdtContent') || n);
    });
  }
  walk(doc.getElementsByTagNameNS(W, 'body')[0]);
  // pictures the browser can show, made smaller so the exam stays light; the marks of the rest are removed
  const images = {};
  for (const x of pics) {
    const path = ('word/' + rels[x.rid]).replace(/^word\/\//, '').replace(/word\/\.\.\//, '');
    const f = zip.file(path);
    try { const url = f && await shrinkImage(await f.async('blob'), path); if (url) images[x.id] = url; } catch (e) {}
  }
  const strip = s => s.replace(/ ?\[תמונה:(img\d+)\] ?/g, (m, id) => images[id] ? m : ' ');
  lines.forEach(l => { if (l.k === 'p') l.t = strip(l.t); else l.rows = l.rows.map(r => r.map(strip)); });
  lines.images = images;
  return lines;
}
async function shrinkImage(blob, name) {
  const type = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', bmp: 'image/bmp', webp: 'image/webp' }[(name.split('.').pop() || '').toLowerCase()];
  if (!type || typeof createImageBitmap === 'undefined') return '';
  const bmp = await createImageBitmap(new Blob([blob], { type }));
  const k = Math.min(1, 760 / bmp.width, 900 / bmp.height);
  const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(bmp.width * k)); c.height = Math.max(1, Math.round(bmp.height * k));
  const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(bmp, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', 0.72);
}

function buildExam(lines) {
  const notes = [];
  const strip = s => s.replace(/\*\*/g, '');
  const exam = { title: '', subtitle: '', minutes: 0, instructions: [], articles: [], parts: [] };
  // cover ends at "בהצלחה", or at the first part heading when there is none
  let coverEnd = lines.findIndex((l, i) => i < 60 && l.k === 'p' && /בהצלחה/.test(l.t));
  const isPart = t => /^(חלק|פרק)\s+\S+/.test(t) && t.length < 90;
  if (coverEnd < 0) coverEnd = lines.findIndex(l => l.k === 'p' && isPart(strip(l.t).trim())) - 1;
  for (let i = 0; i <= coverEnd; i++) {
    const t = lines[i].k === 'p' ? strip(lines[i].t).trim() : '';
    if (!t) continue;
    if (!exam.title) { exam.title = t; continue; }
    if (!exam.subtitle && t.length < 70 && !/_/.test(t)) { exam.subtitle = t; continue; }
    const m = t.match(/(\d+)\s*דקות/); if (m) exam.minutes = +m[1];
    if (/_{3,}/.test(t)) continue;
    exam.instructions.push(t.replace(/^[•·]\s*/, ''));
  }
  if (!exam.minutes) { const h = exam.instructions.join(' ').match(/(\d+(?:\.\d+)?)\s*שעות|שעתיים/); if (h) exam.minutes = h[1] ? Math.round(+h[1] * 60) : 120; }

  let part = null, q = null, sub = null, art = null, inArt = false;
  const newPart = (title, pts) => { part = { title, pts, qs: [] }; exam.parts.push(part); q = null; sub = null; };
  const target = () => sub || (q ? (q._intro = q._intro || { blocks: [] }) : null);
  const textOf = tg => (tg.blocks || []).filter(b => !b.t || b.t === 'text').map(b => b.v).join(' ');
  const wantsMC = tg => /הקיפו את התשובה|בחרו את התשובה|סמנו את התשובה|התשובה הנכונה/.test(textOf(tg)) && !tg._choiceSeen;
  const wantsCircle = tg => /הקיפו|בחרו/.test(textOf(tg)) && !tg._choiceSeen;
  const takePts = (tg, t) => t.replace(/\(\s*(\d+(?:\.\d+)?)\s*נק(?:ודות|['׳])?\s*\)/, (m0, p) => { if (tg) tg.pts = +p; return ''; }).trim();

  // "א / ב / ג" inside a sentence becomes a choice. Middle options tell how many words each option has.
  function slashChoices(t) {
    const parts = t.split(/\s+\/\s+/);
    if (parts.length < 2) return t;
    const words = s => s.trim().split(/\s+/).filter(Boolean);
    const before = words(parts[0]), after = words(parts[parts.length - 1]);
    let nFirst = 1, nLast = 1;
    if (parts.length > 2) { nFirst = words(parts[1]).length; nLast = words(parts[parts.length - 2]).length; }
    else if (/^לא\s/.test(parts[1].trim())) nLast = 2;
    if (before.length < nFirst || after.length < nLast) return t;
    const opts = [before.slice(-nFirst).join(' '), ...parts.slice(1, -1).map(s => s.trim()), after.slice(0, nLast).join(' ')].map(s => strip(s).replace(/[.,:;]$/, ''));
    if (opts.some(o => !o || o.length > 40)) return t;
    return [before.slice(0, before.length - nFirst).join(' '), `{${opts.join(' / ')}}`, after.slice(nLast).join(' ')].filter(Boolean).join(' ');
  }
  function refs(t) {
    if (!exam.articles.length && !/מאמר/.test(t)) return t;
    return t.replace(/(מאמר(?:ים)?\s*(\d)(?:\s*(?:,|\s)\s*(?:בפסקה|פסקה|פס['׳])\s*(\d+))?)/g, (m0, all, a, p) => `${m0} [מאמר ${a}${p ? `, פס' ${p}` : ''}]`);
  }
  function addText(raw) {
    const tg = target(); if (!tg) return;
    let t = takePts(tg, raw).replace(/^[•·]\s*/, '');
    if (!t) return;
    if (/^_{20,}$/.test(t.replace(/\s/g, ''))) { tg.blocks.push({ t: 'long', rows: Math.min(8, Math.max(3, Math.round(t.length / 80))) }); return; }
    // a blank that already has writing inside it ("__שמונה___") is still just a blank
    t = t.replace(/(_+)(?=[^\s_])((?:[^_\n]|_(?!_)){1,60}?)(?<=[^\s_])(_+)/g, (m0, a, mid, c) => a.length + c.length >= 2 ? '___' : m0);
    t = t.replace(/_{3,}/g, m => m.length > 60 ? '______________________________________' : '___');
    if (wantsMC(tg) && /^[א-י][.)]\s+/.test(t)) {
      let mc = tg.blocks[tg.blocks.length - 1];
      if (!mc || mc.t !== 'mc') { mc = { t: 'mc', opts: [] }; tg.blocks.push(mc); }
      mc.opts.push(strip(t.replace(/^[א-י][.)]\s+/, ''))); return;
    }
    const sc = slashChoices(t);
    if (sc !== t) { tg._choiceSeen = true; t = sc; }
    else if (wantsCircle(tg)) {
      const items = strip(t).split(/\s*[•·]\s*|\s{3,}/).map(s => s.trim()).filter(Boolean);
      if (items.length >= 2 && items.length <= 8 && items.every(s => s.split(/\s+/).length <= 4)) { t = `{${items.join(' / ')}}`; tg._choiceSeen = true; }
    }
    const plainLen = strip(t).length, hasTok = /_{3}|\{[^}]+\/|\[/.test(t);
    tg.blocks.push({ t: plainLen > 220 && !hasTok ? 'passage' : 'text', v: refs(t) });
  }
  // a sub-question label, possibly followed by "(1)": "ב. (1) ..." → ב(1)
  function openSub(letter, rest) {
    const d = strip(rest).match(/^\((\d)\)\s*/);
    sub = { l: d ? `${letter}(${d[1]})` : letter, blocks: [] }; q.subs.push(sub);
    addText(d ? rest.replace(/^(\*\*)?\(\d\)\s*/, '$1') : rest);
  }
  const tableQs = [];
  const LET = 'אבגדהוזחטי';
  function artLine(t) {
    if (!t || /^פס(?:קה|['׳])?\s*\d+$/.test(t)) return;
    if (!art.title) art.title = t;
    else if (!art.by && !art.ps.length && (/\||\d{4}/.test(t)) && t.length < 120) art.by = t;
    else art.ps.push(t);
  }
  const romanRe = /^(I{1,3}|IV|V|VI{0,3})[.)]\s+/;

  for (let i = coverEnd + 1; i < lines.length; i++) {
    const L = lines[i];
    if (L.k === 'tbl') {
      if (inArt && art) { L.rows.forEach(r => r.forEach(c => c.split(/\n/).forEach(x => artLine(strip(x).trim())))); continue; }
      const tg = target(); if (!tg) continue;
      const rows = L.rows.filter(r => r.some(c => c.trim()) || L.rows.length < 12);
      if (!rows.length) continue;
      const head = rows[0].map(c => strip(c));
      const conv = rows.map((r, ri) => r.map((c, ci) => {
        if (ri === 0) return strip(c);
        if (c.trim()) return c.replace(/_{3,}/g, '___');
        if (/שורש/.test(head[ci] || '')) return '[שורש]';
        if (/בניין/.test(head[ci] || '')) return '[בניין]';
        return '';
      }));
      tg.blocks.push({ t: 'table', rows: conv });
      tableQs.push(q ? q.n : '?');
      continue;
    }
    const raw = L.t.replace(/\s+$/, '');
    const t = strip(raw).trim();
    if (!t) continue;
    if (/^(המשך|המשך בעמוד הבא|ראו עמוד הבא|טיוטה|בהצלחה!?|סוף המבחן.?)$/.test(t) || /^_{40,}$/.test(t.replace(/\s/g, ''))) continue;

    const am = t.match(/^(מאמר|טקסט|קטע)\s*(\d+)$/);
    if (am) { art = { title: '', by: '', ps: [] }; exam.articles[+am[2] - 1] = art; inArt = true; continue; }
    if (inArt) {
      const qq = t.match(/^(\d{1,2})\s*[.)]\s*(.+)/);
      if (isPart(t) || (qq && /נק|\?/.test(qq[2]))) inArt = false;
      else { artLine(t); continue; }
    }
    if (isPart(t)) {
      const pm = t.match(/\(?\s*(\d+)\s*נקודות\s*\)?/);
      newPart(t.replace(/\(?\s*\d+\s*נקודות\s*\)?/, '').trim(), pm ? pm[1] + ' נקודות' : '');
      continue;
    }
    const qm = raw.trim().match(/^(?:\*\*)?(\d{1,2})(?:\*\*)?\s*[.)](?:\*\*)?\s*(.*)$/s);
    if (qm && +qm[1] < 60 && !(q && wantsMC(target()) && false)) {
      if (!part) newPart('', '');
      q = { n: qm[1], intro: [], subs: [] }; part.qs.push(q); sub = null;
      const rest = qm[2].trim();
      const sm = strip(rest).match(/^([א-י])[.)]\s+/);
      if (sm) openSub(sm[1], rest.replace(/^(\*\*)?[א-י][.)]\s+/, '$1'));
      else if (rest) addText(rest);
      continue;
    }
    if (q) {
      const tg = target();
      const sm = t.match(/^([א-י])[.)]\s+/);
      const curL = sub ? LET.indexOf(String(sub.l).charAt(0)) : -1;
      if (sm && !(wantsMC(tg) && 'אבגדהו'.includes(sm[1])) && LET.indexOf(sm[1]) > curL) { openSub(sm[1], raw.trim().replace(/^(\*\*)?[א-י][.)]\s+/, '$1')); continue; }
      const dm = t.match(/^\((\d)\)\s*(.*)/);
      if (dm) {
        const base = sub ? String(sub.l).replace(/\(.*$/, '') : '';
        sub = { l: `${base}(${dm[1]})`, blocks: [] }; q.subs.push(sub); addText(raw.trim().replace(/^(\*\*)?\(\d\)\s*/, '$1')); continue;
      }
      if (romanRe.test(t)) { addText(raw.trim()); continue; }
      addText(raw.trim());
      continue;
    }
    // text before the first question goes to the part heading area as instructions
    if (part && !part.qs.length) { part.note = (part.note ? part.note + ' ' : '') + t; continue; }
    exam.instructions.push(t);
  }

  // turn question intros into proper fields; questions without subs get one
  exam.parts.forEach(p => p.qs.forEach(q => {
    if (q._intro) { if (q.subs.length) q.intro = q._intro.blocks; else q.subs.push({ l: '', pts: q._intro.pts, blocks: q._intro.blocks }); if (q._intro.pts && q.subs.length && q.subs[0].pts == null && q.intro.length) q.subs[0].pts = q._intro.pts; }
    delete q._intro;
    q.subs.forEach(s => { delete s._choiceSeen; if (!s.blocks.length) s.blocks.push({ t: 'text', v: '' }); });
    const hasField = s => s.blocks.some(b => b.t && b.t !== 'text' && b.t !== 'passage') || s.blocks.some(b => /_{3}|\{[^}]+\/[^}]+\}|\[שורש\]|\[בניין\]|\[מעל:/.test(b.v || ''));
    const earlier = si => [...(si > 0 ? q.subs.slice(0, si).reverse().flatMap(x => x.blocks.slice().reverse()) : []), ...(q.intro || []).slice().reverse()];
    q.subs.forEach((s, si) => {
      const txt = s.blocks.map(b => b.v || '').join(' ');
      if (hasField(s)) return;
      // "כתבו מעל כל צורה…": the bold words of the passage above get a box above them
      if (/מעל/.test(txt)) {
        const src = earlier(si).find(b => /\*\*[^*]+\*\*/.test(b.v || '') && (b.v || '').length > 80);
        if (src) { const moved = { t: 'passage', v: src.v.replace(/\*\*([^*]+)\*\*/g, (m0, w) => `[מעל:${w.trim()}]`) }; src.t = '_gone'; s.blocks.splice(1, 0, moved); return; }
      }
      // "הקיפו…" with the list given earlier ("א • ב • ג"): repeat the list as a choice here
      if (/הקיפו|בחרו/.test(txt)) {
        const src = earlier(si).find(b => /\S\s*•\s*\S/.test(b.v || ''));
        if (src) { const items = strip(src.v).split(/\s*•\s*/).map(x => x.trim()).filter(Boolean); if (items.length >= 2 && items.length <= 8) { s.blocks.push({ t: 'text', v: `{${items.join(' / ')}}` }); return; } }
      }
    });
    q.subs.forEach(s => { s.blocks = s.blocks.filter(b => b.t !== '_gone'); });
    if (q.intro) q.intro = q.intro.filter(b => b.t !== '_gone');
    // a sub with only a question and no answer place gets a written answer box,
    // unless it is just the heading of numbered parts that follow (א → א(1), א(2))
    q.subs.forEach((s, si) => {
      const next = q.subs[si + 1];
      const isHeading = next && s.l && String(next.l).startsWith(s.l + '(');
      if (!hasField(s) && !isHeading) s.blocks.push({ t: 'long', rows: 3 });
    });
  }));
  exam.parts = exam.parts.filter(p => p.qs.length);
  if (tableQs.length) notes.push(`יש טבלאות בשאלות ${[...new Set(tableQs)].join(', ')}. כדאי לבדוק שהמשבצות לתשובה נמצאות במקום הנכון.`);
  exam.articles = exam.articles.filter(Boolean);
  if (!exam.parts.length) notes.unshift('לא זוהו שאלות. בדקו שכל שאלה מתחילה במספר ונקודה, למשל "1."');
  const subCount = exam.parts.reduce((a, p) => a + p.qs.reduce((b, q) => b + q.subs.length, 0), 0);
  return { exam, notes: [...new Set(notes)], stats: { parts: exam.parts.length, qs: exam.parts.reduce((a, p) => a + p.qs.length, 0), subs: subCount, arts: exam.articles.length } };
}

/* ===================== shared ===================== */
// where the page runs: inside claude.ai (Claude), inside Gemini Canvas (the loader sets window.XM_CANVAS), or as a plain file with a Gemini key
const CANVAS = !!window.XM_CANVAS;
const WEB = !CANVAS && !(window.claude && window.claude.use);
const AI = WEB || CANVAS ? 'Gemini' : 'Claude';
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const $ = id => document.getElementById(id);
const NAMES = { 'מאמרים': 'מאמר', 'טקסטים': 'טקסט', 'קטעים': 'קטע' };
const LIST_KEYS = Object.keys(XM_LISTS);
const SAMPLE = {
  title: 'מבחן לדוגמה · לשון י״א–י״ב', subtitle: 'עברית: הבנה, הבעה ולשון', minutes: 120,
  settings: { nikud: true, texts: true, textsName: 'מאמרים', textItem: 'מאמר', ext: 25, draft: true },
  instructions: ['ענו על כל השאלות.', 'כשצריך, נקדו בעזרת מקלדת הניקוד שבתחתית המסך.'],
  articles: [{ title: 'יחסים בין אחים ואחיות', by: 'תקציר לדוגמה', ps: ['הקשר בין אחים הוא מהקשרים הארוכים והמשפיעים ביותר בחיינו.', 'בגילים 6–12 ילדים מבלים עם אחיהם כמחצית משעות הפנאי.', 'מריבות בין אחים נפוצות, והורים רבים חושבים שיש לתת לילדים להסתדר לבד.'] }],
  parts: [
    { title: 'חלק ראשון: הבנה והבעה', pts: '30 נקודות', qs: [
      { n: '1', intro: [], subs: [{ l: '', pts: 3, blocks: [{ t: 'text', v: 'מהי הטענה המרכזית במאמר? בחרו את התשובה הנכונה.' }, { t: 'mc', opts: ['מריבות בין אחים מזיקות תמיד.', 'הקשר בין אחים הוא מהקשרים המשמעותיים ביותר בחיינו.', 'ילדים בכורים מצליחים יותר.'] }] }] },
      { n: '2', intro: [{ t: 'text', v: "במאמר 1 בפסקה 3 [מאמר 1, פס' 3] הכותבת מציגה תפיסה רווחת בקרב הורים." }], subs: [
        { l: 'א', pts: 3, blocks: [{ t: 'text', v: 'כתבו את התפיסה הרווחת.' }, { t: 'long', rows: 2 }] },
        { l: 'ב', pts: 2, blocks: [{ t: 'text', v: 'המילה "אולם" בפסקה מבטאת קשר לוגי של [קשר לוגי].' }] }] },
      { n: '3', intro: [], subs: [{ l: '', pts: 20, blocks: [{ t: 'text', v: 'כתבו מאמר טיעון בנושא: "האם הורים צריכים להתערב במריבות בין אחים?"' }, { t: 'essay', rows: 14, min: 300, max: 350 }] }] }
    ]},
    { title: 'חלק שני: לשון', pts: '70 נקודות', qs: [
      { n: '4', intro: [{ t: 'passage', v: 'האישיות שלנו **מְעֻצֶּבֶת** בהשפעת האחים שלנו, והם **מְדַרְבְּנִים** אותנו **לְהִצְטַיֵּן**.' }], subs: [
        { l: 'א', pts: 6, blocks: [{ t: 'text', v: 'נתחו בטבלה את הצורות המודגשות.' }, { t: 'table', rows: [['הצורה', 'השורש', 'הבניין', 'הגזרה'], ['מְעֻצֶּבֶת', '[שורש]', '[בניין]', '[גזרה]'], ['מְדַרְבְּנִים', '[שורש]', '[בניין]', '[גזרה]'], ['לְהִצְטַיֵּן', '[שורש]', '[בניין]', '[גזרה]']] }] },
        { l: 'ב', pts: 4, blocks: [{ t: 'text', v: 'מיינו את השמות לפי המשקל וכתבו את המשקל בראש כל עמודה.' }, { t: 'sort', items: ['זַמָּרוֹת', 'מַגְהֵצִים', 'צַלָּם', 'מַחְשֵׁב'], cols: 2, head: '', meaning: true }] }] },
      { n: '5', intro: [{ t: 'text', v: 'לפניכם משפט: **כשההורים מתערבים בכל ריב, הילדים אינם לומדים לפתור בעיות בעצמם.**' }], subs: [
        { l: 'א', pts: 3, blocks: [{ t: 'text', v: 'חלקו את המשפט לפסוקיות: סמנו / בכל גבול.' }, { t: 'split', v: 'כשההורים מתערבים בכל ריב, הילדים אינם לומדים לפתור בעיות בעצמם.' }] },
        { l: 'ב', pts: 3, blocks: [{ t: 'text', v: 'כתבו מעל כל צירוף את התפקיד התחבירי שלו.' }, { t: 'passage', v: '[מעל:הילדים|תפקיד] [מעל:אינם לומדים|תפקיד] לפתור בעיות [מעל:בעצמם|תפקיד].' }] },
        { l: 'ג', pts: 2, blocks: [{ t: 'text', v: 'מהו סוג המשפט? [סוג משפט]' }] },
        { l: 'ד', pts: 2, blocks: [{ t: 'text', v: 'סמנו במשפט את מילת השעבוד.' }, { t: 'mark', v: 'כשההורים מתערבים בכל ריב, הילדים אינם לומדים לפתור בעיות בעצמם.' }] }] },
      { n: '6', intro: [], subs: [{ l: '', pts: 4, blocks: [{ t: 'text', v: 'התאימו לכל מילה את דרך התצורה שלה.' }, { t: 'match', left: ['רמזור', 'צה"ל', 'מחשב', 'קטנוע'], right: XM_LISTS['תצורה'] }] }] }
    ]}
  ]
};
const BLANK = { title: 'מבחן חדש', subtitle: '', minutes: 120, settings: { nikud: true, texts: false, textsName: 'מאמרים', textItem: 'מאמר', ext: 25, draft: true }, instructions: [], articles: [],
  parts: [{ title: 'חלק ראשון', pts: '', qs: [{ n: '1', intro: [], subs: [{ l: '', pts: null, blocks: [{ t: 'text', v: 'כתבו כאן את השאלה' }, { t: 'long', rows: 3 }] }] }] }] };
function normalize(x) {
  x.settings = Object.assign({ nikud: true, texts: (x.articles || []).length > 0, textsName: 'מאמרים', textItem: 'מאמר', ext: 25, draft: true }, x.settings || {});
  x.articles = x.articles || []; x.instructions = x.instructions || []; x.parts = x.parts || [];
  x.parts.forEach(p => { p.qs = p.qs || []; p.qs.forEach(q => { q.n = String(q.n == null ? '' : q.n); q.intro = q.intro || []; q.subs = q.subs || []; q.subs.forEach(s => { s.blocks = s.blocks || []; }); }); });
  return x;
}
const clone = o => JSON.parse(JSON.stringify(o));
const counts = ex => { let q = 0, s = 0; ex.parts.forEach(p => { q += p.qs.length; p.qs.forEach(x => { s += x.subs.length; }); }); return { q, s }; };
function ago(t) {
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return 'עכשיו'; if (m < 60) return `לפני ${m} דק׳`; const h = Math.round(m / 60);
  if (h < 24) return `לפני ${h} שע׳`; const d = Math.round(h / 24); if (d < 30) return d === 1 ? 'אתמול' : `לפני ${d} ימים`;
  return new Date(t).toLocaleDateString('he-IL');
}

/* ===================== storage: cloud (per person) with a browser fallback ===================== */
let db = null, uid = null, sample = null, downloads = null, userNs = null;
const CL = {
  ok: () => { const c = window.XM_CANVAS; return !!(c && c.fs && c.uid); },
  ref: (kind, id) => { const c = window.XM_CANVAS; return c.fs.doc(c.fs.db, 'artifacts', c.appId, 'users', c.uid, kind, id); },
  col: kind => { const c = window.XM_CANVAS; return c.fs.collection(c.fs.db, 'artifacts', c.appId, 'users', c.uid, kind); }
};
const Lib = {
  cloud: () => !!(db && uid) || CL.ok(),
  metaCol: () => db.collection(`data/users/${uid}/lib/meta`),
  bodyDoc: id => db.doc(`data/users/${uid}/lib/body/${id}`),
  localIdx() { try { return JSON.parse(localStorage.getItem('xm-lib') || '[]'); } catch (e) { return []; } },
  async list() {
    if (CL.ok()) { const s = await window.XM_CANVAS.fs.getDocs(CL.col('xm_meta')); return s.docs.map(d => Object.assign({ id: d.id }, d.data())).sort((a, b) => b.updatedAt - a.updatedAt); }
    if (this.cloud()) { const s = await this.metaCol().orderBy('updatedAt', 'desc').limit(500).get(); return s.docs.map(d => Object.assign({ id: d.id }, d.data())); }
    return this.localIdx().sort((a, b) => b.updatedAt - a.updatedAt);
  },
  async load(id) {
    if (CL.ok()) { const s = await window.XM_CANVAS.fs.getDoc(CL.ref('xm_body', id)); return s.exists() ? JSON.parse(s.data().json) : null; }
    if (this.cloud()) { const s = await this.bodyDoc(id).get(); return s.exists ? JSON.parse(s.data().json) : null; }
    try { return JSON.parse(localStorage.getItem('xm-lib-' + id)); } catch (e) { return null; }
  },
  metaOf(ex) { const c = counts(ex); return { title: ex.title || 'מבחן ללא שם', subtitle: ex.subtitle || '', updatedAt: Date.now(), nq: c.q, ns: c.s, minutes: +ex.minutes || 0, texts: !!(ex.settings.texts && ex.articles.length), nikud: !!ex.settings.nikud, source: ex._source || '' }; },
  async save(id, ex) {
    const meta = this.metaOf(ex), json = JSON.stringify(ex);
    // one cloud document holds up to 1 MB, pictures included
    if (CL.ok() && new Blob([json]).size > 1000000) throw { code: 'too_big' };
    if (CL.ok()) { const f = window.XM_CANVAS.fs; await f.setDoc(CL.ref('xm_body', id), { json }); await f.setDoc(CL.ref('xm_meta', id), meta); return; }
    if (this.cloud()) { await this.bodyDoc(id).set({ json }); await this.metaCol().doc(id).set(meta); return; }
    localStorage.setItem('xm-lib-' + id, json);
    const idx = this.localIdx().filter(m => m.id !== id); idx.push(Object.assign({ id }, meta));
    localStorage.setItem('xm-lib', JSON.stringify(idx));
  },
  async remove(id) {
    if (CL.ok()) { const f = window.XM_CANVAS.fs; await f.deleteDoc(CL.ref('xm_meta', id)); await f.deleteDoc(CL.ref('xm_body', id)); return; }
    if (this.cloud()) { await this.metaCol().doc(id).delete(); await this.bodyDoc(id).delete(); return; }
    localStorage.removeItem('xm-lib-' + id); localStorage.setItem('xm-lib', JSON.stringify(this.localIdx().filter(m => m.id !== id)));
  },
  newId: () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
};

/* ===================== HOME ===================== */
let libItems = [], libLoaded = false;
async function showHome() {
  closePop(); closeDrawer(); stopEdit(false);
  $('editor').hidden = true; $('home').hidden = false;
  $('where').textContent = CL.ok() ? 'נשמר בחשבון Google שלך' : Lib.cloud() ? 'נשמר בחשבון שלך' : 'נשמר בדפדפן הזה · כדאי לגבות מדי פעם';
  renderLib();
  try { libItems = await Lib.list(); } catch (e) { libItems = libItems || []; }
  libLoaded = true; renderLib();
}
function renderLib() {
  const qx = $('search').value.trim();
  const items = libItems.filter(m => !qx || (m.title + ' ' + m.subtitle).includes(qx));
  $('libCount').textContent = libLoaded ? `${libItems.length} מבחנים` : '';
  let h = '';
  if (!libLoaded) h = `<div class="empty-lib"><span class="spin"></span> טוען את המבחנים…</div>`;
  else if (!libItems.length) h = `<div class="empty-lib"><b>עוד אין כאן מבחנים</b>העלו קובץ Word של מבחן, והוא יופיע כאן. אפשר גם לפתוח את הדוגמה כדי לראות איך זה נראה.</div>`;
  else {
    h = items.map(m => `<article class="sheetcard" data-open-exam="${m.id}" tabindex="0" aria-label="פתיחת ${esc(m.title)}">
      <div class="t">${esc(m.title)}</div>${m.subtitle ? `<div class="st">${esc(m.subtitle)}</div>` : ''}
      <div class="lines" aria-hidden="true"></div>
      <div class="meta"><span class="tag blue">${m.nq || 0} שאלות</span>${m.minutes ? `<span class="tag">${m.minutes} דק׳</span>` : ''}${m.texts ? '<span class="tag">מאמרים</span>' : ''}${m.nikud ? '<span class="tag">ניקוד</span>' : ''}</div>
      <div class="foot"><span>${ago(m.updatedAt)}</span><span class="grow"></span>
        <button type="button" class="ico" data-card="dl" data-id="${m.id}">הורדה</button><button type="button" class="ico" data-card="dup" data-id="${m.id}">שכפול</button><button type="button" class="ico del" data-card="del" data-id="${m.id}">מחיקה</button></div>
    </article>`).join('') + `<button type="button" class="sheetcard newcard" data-home="pick"><big>+</big>מבחן חדש מ-Word</button>`;
    if (!items.length) h = `<div class="empty-lib"><b>לא נמצא מבחן</b>נסו מילה אחרת בחיפוש.</div>`;
  }
  $('lib').innerHTML = h;
}
$('search').addEventListener('input', renderLib);
$('lib').addEventListener('click', async e => {
  const b = e.target.closest('[data-card]');
  if (b) {
    e.stopPropagation(); const id = b.dataset.id, act = b.dataset.card;
    if (act === 'del') {
      if (!b.classList.contains('armed')) { b.classList.add('armed'); b.textContent = 'בטוח?'; setTimeout(() => { if (b.isConnected) { b.classList.remove('armed'); b.textContent = 'מחיקה'; } }, 3500); return; }
      await Lib.remove(id); libItems = libItems.filter(m => m.id !== id); renderLib(); return;
    }
    const ex = await Lib.load(id); if (!ex) return;
    if (act === 'dup') { const nid = Lib.newId(); ex.title = (ex.title || 'מבחן') + ' (עותק)'; await Lib.save(nid, normalize(ex)); libItems = await Lib.list(); renderLib(); }
    if (act === 'dl') exportExam(normalize(ex));
    return;
  }
  const card = e.target.closest('[data-open-exam]'); if (card) openExam(card.dataset.openExam);
});
$('lib').addEventListener('keydown', e => { const c = e.target.closest('[data-open-exam]'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openExam(c.dataset.openExam); } });
document.addEventListener('click', e => {
  const h = e.target.closest('[data-home]'); if (!h) return;
  if (h.dataset.home === 'pick') $('file').click();
  else createExam(normalize(clone(h.dataset.home === 'sample' ? SAMPLE : BLANK)));
});

/* ===================== EDITOR: state ===================== */
let exam = null, curId = null, notes = [], lines = null;
const undoStack = [];
function snapshot() { undoStack.push(JSON.stringify(exam)); if (undoStack.length > 50) undoStack.shift(); $('undoBtn').disabled = false; }
$('undoBtn').onclick = () => {
  if (!undoStack.length) return; exam = normalize(JSON.parse(undoStack.pop())); $('undoBtn').disabled = !undoStack.length;
  if (editing && !qAt(editing.pi, editing.qi)) editing = null;
  changed(true);
};
let saveT = null, saving = false, dirty = false;
function markDirty() { dirty = true; $('saved').className = 'saved'; $('saved').textContent = 'שומר…'; clearTimeout(saveT); saveT = setTimeout(flush, 800); }
async function flush() {
  if (!curId || !dirty) return; if (saving) { saveT = setTimeout(flush, 400); return; }
  saving = true; dirty = false;
  try { await Lib.save(curId, exam); $('saved').className = 'saved ok'; $('saved').textContent = 'נשמר'; }
  catch (e) {
    dirty = true; $('saved').className = 'saved';
    if (e && e.code === 'too_big') { $('saved').textContent = 'גדול מדי לשמירה: מחקו תמונה'; saving = false; return; }
    $('saved').textContent = e && e.code === 'quota_exceeded' ? 'אין מקום לשמור' : 'לא נשמר, מנסה שוב…'; saveT = setTimeout(flush, 4000);
  }
  saving = false;
}
async function createExam(ex, source) {
  const id = Lib.newId(); ex._source = source || '';
  await Lib.save(id, ex).catch(() => {});
  openLoaded(id, ex);
  return id;
}
async function openExam(id) {
  const ex = await Lib.load(id);
  if (!ex) { showModal(`<h2>לא הצלחתי לפתוח את המבחן</h2><p>נסו שוב בעוד רגע.</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`); return; }
  openLoaded(id, normalize(ex));
}
function openLoaded(id, ex) {
  curId = id; exam = ex; undoStack.length = 0; $('undoBtn').disabled = true; notes = []; editing = null;
  $('home').hidden = true; $('editor').hidden = false;
  $('saved').className = 'saved ok'; $('saved').textContent = 'נשמר';
  changed(true, true);
}
$('backHome').onclick = async () => { stopEdit(false); await flush(); showHome(); };
$('etitle').addEventListener('input', e => { exam.title = e.target.value; markDirty(); clearTimeout(pvT); pvT = setTimeout(renderPreview, 500); });

function changed(structural, noSave) {
  if (!noSave) markDirty();
  if (drawer && structural) renderDrawer();
  $('etitle').value = exam.title || '';
  renderStatus();
  clearTimeout(pvT); pvT = setTimeout(renderPreview, structural ? 0 : 350);
}
function renderStatus() {
  const c = counts(exam);
  $('stat').innerHTML = `${c.q} שאלות · ${c.s} סעיפים` + (notes.length ? ` · <span class="warn">${esc(notes[0])}</span>` : ' · לחצו "עריכה" ליד שאלה כדי לערוך אותה');
  $('textsBtn').textContent = exam.settings.textsName;
}

/* ===================== preview ===================== */
let mounted = null, pvT = null;
function renderPreview() {
  if (!exam) return;
  const pv = $('pv'); let sc = 0;
  if (mounted) { sc = mounted.colScroll(); mounted.destroy(); }
  pv.innerHTML = '';
  // a fresh host each time, so the exam's own listeners never pile up
  const host = document.createElement('div'); host.style.height = '100%'; pv.appendChild(host);
  try { mounted = mountExam(host, exam, { preview: true, editable: true, onEdit: onPreviewEdit }); mounted.setColScroll(sc); }
  catch (e) { pv.innerHTML = `<p style="padding:20px;color:#b3261e">שגיאה בתצוגה: ${esc(e.message)}</p>`; mounted = null; }
  if (editing) mountQE();
}
const qAt = (pi, qi) => exam.parts[pi] && exam.parts[pi].qs[qi];
function nextNum() { const all = exam.parts.flatMap(x => x.qs).map(x => +x.n).filter(n => !isNaN(n)); return String((all.length ? Math.max(...all) : 0) + 1); }
function onPreviewEdit(e) {
  if (e.q) { const [pi, qi] = e.q.split('.').map(Number); startEdit(pi, qi); }
  else if (e.part != null) openDrawer({ kind: 'part', pi: e.part });
  else if (e.add) {
    snapshot(); if (!exam.parts.length) exam.parts.push({ title: '', pts: '', qs: [] });
    const pi = exam.parts.length - 1, arr = exam.parts[pi].qs;
    arr.push({ n: nextNum(), intro: [], subs: [{ l: '', pts: null, blocks: [{ t: 'text', v: '' }, { t: 'long', rows: 3 }] }] });
    editing = { pi, qi: arr.length - 1 }; changed(true);
  }
}

/* ===================== in-place question editor ===================== */
let editing = null, lastRich = null, savedRange = null, addOpen = null;
function startEdit(pi, qi) { closePop(); const had = !!editing; snapshot(); editing = { pi, qi }; addOpen = null; if (had) renderPreview(); mountQE(true); }
function stopEdit(rerender) { closePop(); if (!editing) return; editing = null; lastRich = null; if (rerender !== false) renderPreview(); }
const TYPES = [
  ['text', 'טקסט / שאלה', 'שורת טקסט. אפשר להוסיף בה משבצות ובחירות'], ['passage', 'קטע קריאה', 'טקסט במסגרת, למשל משפט לניתוח'],
  ['mc', 'שאלה אמריקאית', 'תשובות א–ד, התלמיד בוחר אחת'], ['long', 'תשובה פתוחה', 'תיבה לכתיבת תשובה'],
  ['essay', 'חיבור / מטלת כתיבה', 'תיבה גדולה עם מונה מילים'], ['table', 'טבלה', 'למשל שורש, בניין וגזרה'],
  ['mark', 'סימון מילים', 'התלמיד לוחץ על מילים כדי לסמן אותן'], ['split', 'חלוקת משפט', 'התלמיד מסמן / בין מילים'],
  ['punct', 'פיסוק', 'התלמיד מוסיף סימני פיסוק לטקסט'],
  ['sort', 'מיון לעמודות', 'התלמיד ממיין מילים לקבוצות'], ['match', 'התאמה', 'לכל פריט התלמיד בוחר התאמה']];
const TNAME = Object.fromEntries(TYPES.map(t => [t[0], t[1]]));
const newBlock = k => k === 'mc' ? { t: k, opts: ['', '', '', ''] } : k === 'long' ? { t: k, rows: 3 } : k === 'essay' ? { t: k, rows: 14, min: 0, max: 0 } : k === 'table' ? { t: k, rows: [['', ''], ['', '']] } : k === 'sort' ? { t: k, items: [], cols: 2, head: '', meaning: false } : k === 'match' ? { t: k, left: [], right: [] } : { t: k, v: '' };

/* text with answer places <-> editable HTML with chips */
const TOKRE = new RegExp(String.raw`\*\*(.+?)\*\*|(_{3,})|\{([^{}]+?\s\/\s[^{}]+?)\}|(\[שורש\])|\[(${LIST_KEYS.join('|')})\]|\[רשימה:([^\]]+)\]|\[מעל:([^\]|]+)(?:\|([^\]]+))?\]|(\[(?:מאמר|טקסט|קטע)\s*\d+(?:\s*,\s*(?:פס['׳]?|פסקה)\s*(?:\d+|[א-ת]{1,2}))?\])|\[קו:([^\]]+)\]|(\[מסגרת:[^\]]+\]|\[תמונה:[^\]\s]+\])`, 'g');
function chip(tok) {
  let m;
  if (/^_{3,}$/.test(tok)) return `<span class="tk" contenteditable="false" data-tok="___">▭ משבצת</span>`;
  if ((m = tok.match(/^\[תמונה:([^\]\s]+)\]$/))) { const src = (exam && exam.images || {})[m[1]]; return `<span class="tk im" contenteditable="false" data-tok="${esc(tok)}">${/^data:image\//.test(src || '') ? `<img src="${src}" alt="">` : 'תמונה חסרה'}</span>`; }
  if ((m = tok.match(/^\[מסגרת:(.+)\]$/))) return `<span class="tk bx" contenteditable="false" data-tok="${esc(tok)}">${esc(m[1])}</span>`;
  if ((m = tok.match(/^\{(.+)\}$/))) return `<span class="tk ch" contenteditable="false" data-tok="${esc(tok)}">${esc(m[1].split(/\s\/\s/).join(' · '))}</span>`;
  if (tok === '[שורש]') return `<span class="tk rt" contenteditable="false" data-tok="[שורש]">שורש ▢-▢-▢</span>`;
  if ((m = tok.match(/^\[רשימה:(.+)\]$/))) return `<span class="tk ls" contenteditable="false" data-tok="${esc(tok)}">${esc(m[1])}</span>`;
  if ((m = tok.match(/^\[מעל:([^\]|]+)(?:\|([^\]]+))?\]$/))) return `<span class="tk ab" contenteditable="false" data-tok="${esc(tok)}"><small>${esc(m[2] ? m[2] + ' ▾' : 'משבצת')}</small><b>${esc(m[1])}</b></span>`;
  if ((m = tok.match(/^\[(מאמר|טקסט|קטע)\s*(\d+)(?:\s*,\s*(?:פס['׳]?|פסקה)\s*(\d+|[א-ת]{1,2}))?\]$/))) return `<span class="tk rf" contenteditable="false" data-tok="${esc(tok)}">↖ ${m[1]} ${m[2]}${m[3] ? ` · פס׳ ${m[3]}` : ''}</span>`;
  if ((m = tok.match(/^\[(.+)\]$/))) return `<span class="tk ls" contenteditable="false" data-tok="${esc(tok)}">${esc(m[1])}</span>`;
  return esc(tok);
}
function toEditable(text) {
  const s = String(text || ''); let out = '', last = 0, m; const re = new RegExp(TOKRE.source, 'g');
  while ((m = re.exec(s))) {
    out += esc(s.slice(last, m.index)).replace(/\n/g, '<br>'); last = re.lastIndex;
    out += m[1] !== undefined ? `<b>${toEditable(m[1])}</b>` : m[10] !== undefined ? `<u>${toEditable(m[10])}</u>` : chip(m[0]);
  }
  return out + esc(s.slice(last)).replace(/\n/g, '<br>');
}
function fromEditable(el) {
  let out = '';
  el.childNodes.forEach(n => {
    if (n.nodeType === 3) out += n.nodeValue.replace(/ /g, ' ');
    else if (n.nodeType === 1) {
      if (n.dataset && n.dataset.tok) out += n.dataset.tok;
      else if (n.tagName === 'BR') out += '\n';
      else if (/^(B|STRONG)$/.test(n.tagName)) { const inner = fromEditable(n); out += inner.trim() ? `**${inner}**` : inner; }
      else if (n.tagName === 'U') { const inner = fromEditable(n); out += inner.trim() ? `[קו:${inner.replace(/\]/g, ')')}]` : inner; }
      else if (/^(DIV|P)$/.test(n.tagName)) out += (out && !out.endsWith('\n') ? '\n' : '') + fromEditable(n);
      else out += fromEditable(n);
    }
  });
  return out.replace(/\*\*\*\*/g, '');
}
const rich = (path, val, ph, cls) => `<div class="rich ${cls || ''}" contenteditable="true" data-rich="${path}" data-ph="${esc(ph || 'כתבו כאן…')}">${toEditable(val)}</div>`;
const lineList = (path, arr, ph, letters) => `<div class="opt-ed">${(arr || []).map((o, k) => `<div class="opt-row">${letters ? `<span class="ml">${'אבגדהוזחטי'[k]}</span>` : ''}<input class="li-in" data-li="${path}" data-k="${k}" value="${esc(o)}" placeholder="${ph}"><button type="button" class="ico" data-qe="li-del" data-p="${path}" data-k="${k}" aria-label="מחיקה">✕</button></div>`).join('')}<button type="button" class="addline" data-qe="li-add" data-p="${path}">+ ${letters ? 'תשובה' : 'שורה'}</button></div>`;
function chipsEd(path, arr, ph) { return `<div class="chips-ed" data-chips="${path}">${(arr || []).map((w, k) => `<span class="c">${esc(w)}<button type="button" data-qe="chip-del" data-p="${path}" data-k="${k}" aria-label="הסרת ${esc(w)}">×</button></span>`).join('')}<input data-chipin="${path}" placeholder="${ph}"></div>`; }
function blockQE(b, p) {
  const t = b.t || 'text'; let body = '';
  if (t === 'text') body = rich(p + '.v', b.v, 'כתבו כאן טקסט או שאלה…');
  else if (t === 'passage') body = rich(p + '.v', b.v, 'הדביקו כאן את הקטע…', 'passage');
  else if (t === 'mc') body = lineList(p + '.opts', b.opts, 'תשובה…', true) + `<label class="row cap"><input type="checkbox" data-chk="${p}.num"${b.num ? ' checked' : ''}> מספור (1), (2), (3) במקום א, ב, ג</label>`;
  else if (t === 'long') body = `<div class="ansbox"><span>כאן התלמיד כותב את התשובה</span><span class="row"><span class="cap">גודל</span><span class="seg">${[[2, 'קטנה'], [4, 'בינונית'], [8, 'גדולה']].map(([r, n]) => `<button type="button" data-qe="set" data-p="${p}.rows" data-v="${r}" aria-pressed="${(b.rows || 3) === r || (r === 4 && ![2, 8].includes(b.rows || 3))}">${n}</button>`).join('')}</span></span></div>`;
  else if (t === 'essay') body = `<div class="ansbox" style="min-height:6em"><span>תיבה גדולה לכתיבה, עם מונה מילים</span><span class="row"><span class="cap">מילים: מ-</span><input class="numin" type="number" min="0" data-num="${p}.min" value="${b.min || ''}" aria-label="מינימום מילים"><span class="cap">עד</span><input class="numin" type="number" min="0" data-num="${p}.max" value="${b.max || ''}" aria-label="מקסימום מילים"></span></div>`;
  else if (t === 'table') {
    const rows = b.rows && b.rows.length ? b.rows : [['']];
    body = `<div class="ted"><table>${rows.map((r, ri) => `<tr class="${ri === 0 && b.head !== false ? 'head' : ''}">${r.map((c, ci) => `<td>${rich(`${p}.rows.${ri}.${ci}`, c, '')}</td>`).join('')}</tr>`).join('')}</table></div>
      <div class="ted-bar"><button type="button" class="addline" data-qe="tbl" data-p="${p}" data-v="row+">+ שורה</button><button type="button" class="addline" data-qe="tbl" data-p="${p}" data-v="col+">+ עמודה</button><button type="button" class="ico" data-qe="tbl" data-p="${p}" data-v="row-">− שורה</button><button type="button" class="ico" data-qe="tbl" data-p="${p}" data-v="col-">− עמודה</button><span class="cap">תא ריק = משבצת לתשובה. אפשר להכניס לתא שורש או רשימה מהסרגל למעלה.</span></div>`;
  }
  else if (t === 'mark') body = `${rich(p + '.v', b.v, 'הטקסט שבו התלמיד יסמן מילים…', 'passage')}<span class="cap">בזמן המבחן התלמיד לוחץ על מילים כדי לסמן אותן.</span>`;
  else if (t === 'split') body = `${rich(p + '.v', b.v, 'המשפט שהתלמיד יחלק…', 'passage')}
    <div class="row"><span class="cap">בזמן המבחן התלמיד לוחץ בין מילים כדי לסמן גבול ( / ). ואחר כך ליד כל חלק:</span><select class="numin" style="width:auto" data-sel="${p}.label">${[['', 'לא כותב כלום'], ['פסוקית', 'בוחר סוג פסוקית'], ['תפקיד', 'בוחר תפקיד תחבירי'], ['free', 'כותב בעצמו']].map(([v, n]) => `<option value="${v}"${(b.label || '') === v ? ' selected' : ''}>${n}</option>`).join('')}</select></div>`;
  else if (t === 'punct') body = `${rich(p + '.v', b.v, 'הטקסט בלי סימני הפיסוק…', 'passage')}<span class="cap">בזמן המבחן התלמיד לוחץ אחרי מילה ובוחר סימן פיסוק.</span>`;
  else if (t === 'sort') body = `${chipsEd(p + '.items', b.items, 'הקלידו מילה ולחצו Enter')}
    <div class="row"><span class="cap">עמודות</span><span class="seg">${[2, 3, 4].map(n => `<button type="button" data-qe="set" data-p="${p}.cols" data-v="${n}" aria-pressed="${(+b.cols || 2) === n}">${n}</button>`).join('')}</span>
    <span class="cap">כותרת כל עמודה</span><select class="numin" style="width:auto" data-sel="${p}.head"><option value="">התלמיד כותב</option>${LIST_KEYS.map(n => `<option${b.head === n ? ' selected' : ''}>בחירה: ${n}</option>`).join('')}</select>
    <label class="row cap"><input type="checkbox" data-chk="${p}.meaning"${b.meaning ? ' checked' : ''}> גם משמעות משותפת</label></div>`;
  else if (t === 'match') body = `<div class="grid2"><div><div class="cap">פריטים</div>${chipsEd(p + '.left', b.left, 'פריט ו-Enter')}</div><div><div class="cap">אפשרויות לבחירה</div>${chipsEd(p + '.right', b.right, 'אפשרות ו-Enter')}</div></div>`;
  return `<div class="qe-b"><div class="tools"><span class="kind">${TNAME[t] || ''}</span><button type="button" class="ico" data-qe="up" data-p="${p}" aria-label="למעלה">↑</button><button type="button" class="ico" data-qe="down" data-p="${p}" aria-label="למטה">↓</button><button type="button" class="ico del" data-qe="del" data-p="${p}" aria-label="מחיקה">מחיקה</button></div>${body}</div>`;
}
const addMenu = p => addOpen === p ? `<div class="addmenu">${TYPES.map(([k, n, d]) => `<button type="button" data-qe="add" data-p="${p}" data-v="${k}"><b>${n}</b><small>${d}</small></button>`).join('')}</div>` : `<button type="button" class="addline" data-qe="addmenu" data-p="${p}">+ הוספה</button>`;
function qeHtml() {
  const { pi, qi } = editing, q = qAt(pi, qi), qp = `parts.${pi}.qs.${qi}`;
  return `<div class="qe">
    <div class="qe-top">
      <div class="qe-r1"><span class="num">שאלה <input data-num="${qp}.n" value="${esc(q.n)}" aria-label="מספר השאלה"></span><span class="grow"></span>
        <button type="button" class="ico" data-qe="qmove" data-v="-1">↑ למעלה</button><button type="button" class="ico" data-qe="qmove" data-v="1">↓ למטה</button><button type="button" class="ico" data-qe="qdup">שכפול</button><button type="button" class="ico del" data-qe="qdel">מחיקת השאלה</button>
        <button type="button" class="btn primary small" data-qe="done">✓ סיום עריכה</button></div>
      <div class="fmt off" id="fmt" aria-label="הוספה לטקסט"><span class="lbl">בתוך הטקסט:</span>
        <button type="button" class="fb" data-ins="bold"><b>B</b> מודגש</button>
        <button type="button" class="fb" data-ins="u"><u>קו</u> מתחת</button>
        <button type="button" class="fb" data-ins="blank">משבצת <span class="pv">▭</span></button>
        <button type="button" class="fb" data-ins="choice">בחירה <span class="pv">א · ב</span></button>
        <button type="button" class="fb" data-ins="root">שורש <span class="pv">▢-▢-▢</span></button>
        <button type="button" class="fb" data-ins="list">רשימה <span class="pv">▾</span></button>
        <button type="button" class="fb" data-ins="above">מעל מילה</button>
        <button type="button" class="fb" data-ins="box">מסגרת <span class="pv">▢</span></button>
        <button type="button" class="fb" data-ins="img">תמונה</button>
        ${exam.settings.texts && exam.articles.length ? `<button type="button" class="fb" data-ins="ref">הפניה ל${esc(exam.settings.textItem)}</button>` : ''}</div>
      <form class="qe-ask" data-qeask><span>✦ ${AI}:</span><input id="qeAskIn" placeholder="${sample ? 'מה לשנות בשאלה? למשל: תהפוך לאמריקאית עם 4 תשובות' : 'שינוי במילים זמין כשהכלי פתוח מתוך Claude'}"${sample ? '' : ' disabled'}><button type="submit" class="btn small"${sample ? '' : ' disabled'}>שינוי</button></form>
    </div>
    <div class="qe-body">
      <div class="qe-sec intro"><div class="qe-sh"><span class="lab">פתיח לכל הסעיפים (לא חובה)</span></div>${q.intro.map((b, bi) => blockQE(b, `${qp}.intro.${bi}`)).join('')}${addMenu(`${qp}.intro`)}</div>
      ${q.subs.map((s, si) => { const sp = `${qp}.subs.${si}`; return `<div class="qe-sec"><div class="qe-sh"><span class="lab">סעיף <input data-num="${sp}.l" value="${esc(s.l)}" placeholder="—" aria-label="אות הסעיף"></span><span class="lab">נקודות <input data-num="${sp}.pts" value="${s.pts == null ? '' : esc(s.pts)}" aria-label="נקודות"></span><span class="grow"></span>
        <button type="button" class="ico" data-qe="up" data-p="${sp}" aria-label="סעיף למעלה">↑</button><button type="button" class="ico" data-qe="down" data-p="${sp}" aria-label="סעיף למטה">↓</button><button type="button" class="ico del" data-qe="del" data-p="${sp}">מחיקת סעיף</button></div>
        ${s.blocks.map((b, bi) => blockQE(b, `${sp}.blocks.${bi}`)).join('')}${addMenu(`${sp}.blocks`)}</div>`; }).join('')}
      <button type="button" class="addline" data-qe="addsub">+ סעיף חדש</button>
    </div></div>`;
}
function mountQE(scroll) {
  if (!editing) return;
  const sec = document.getElementById(`xq${editing.pi}-${editing.qi}`); if (!sec) { editing = null; return; }
  sec.classList.add('editing'); sec.innerHTML = qeHtml();
  if (scroll) { const col = sec.closest('.xm-col'); if (col) col.scrollTop += sec.getBoundingClientRect().top - col.getBoundingClientRect().top - 10; }
}
function refreshQE() { const sec = document.querySelector('#pv .xm-q.editing'); if (!sec) return; const col = sec.closest('.xm-col'), st = col ? col.scrollTop : 0; sec.innerHTML = qeHtml(); if (col) col.scrollTop = st; }
/* paths */
const getP = p => p.split('.').reduce((o, k) => o == null ? o : o[k], exam);
function setP(p, v) { const a = p.split('.'), k = a.pop(); const o = getP(a.join('.')); if (o) o[k] = v; }
const parentOf = p => { const a = p.split('.'); const k = a.pop(); return [getP(a.join('.')), +k]; };

/* editor events (delegated on the preview area) */
const pvEl = $('pv');
pvEl.addEventListener('focusin', e => { const r = e.target.closest && e.target.closest('[data-rich]'); if (r) { lastRich = r; const f = $('fmt'); if (f) f.classList.remove('off'); } });
document.addEventListener('selectionchange', () => { const s = getSelection(); if (s.rangeCount && lastRich && lastRich.contains(s.anchorNode)) savedRange = s.getRangeAt(0).cloneRange(); });
pvEl.addEventListener('input', e => {
  const t = e.target;
  const r = t.closest && t.closest('[data-rich]');
  if (r) { setP(r.dataset.rich, fromEditable(r).replace(/\n+$/, '')); markDirty(); return; }
  if (t.dataset.li) { getP(t.dataset.li)[+t.dataset.k] = t.value; markDirty(); return; }
  if (t.dataset.num) { const k = t.dataset.num; let v = t.value; if (/\.(min|max)$/.test(k)) v = +v || 0; else if (/\.pts$/.test(k)) v = v.trim() === '' ? null : (isNaN(+v) ? v : +v); setP(k, v); markDirty(); renderStatus(); return; }
});
pvEl.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.sel) { snapshot(); setP(t.dataset.sel, t.value.replace(/^בחירה: /, '')); markDirty(); }
  if (t.dataset.chk) { snapshot(); setP(t.dataset.chk, t.checked); markDirty(); }
});
pvEl.addEventListener('paste', e => {
  const r = e.target.closest && e.target.closest('[data-rich]'); if (!r) return;
  e.preventDefault(); const txt = (e.clipboardData || window.clipboardData).getData('text/plain');
  document.execCommand('insertText', false, txt);
});
pvEl.addEventListener('keydown', e => {
  const ci = e.target.dataset && e.target.dataset.chipin;
  if (ci && (e.key === 'Enter' || e.key === ',')) {
    e.preventDefault(); const v = e.target.value.trim(); if (!v) return;
    snapshot(); const arr = getP(ci) || []; v.split(/\s*,\s*/).filter(Boolean).forEach(w => arr.push(w)); setP(ci, arr); markDirty(); refreshQE();
    const again = document.querySelector(`[data-chipin="${ci}"]`); if (again) again.focus();
  }
  if (ci && e.key === 'Backspace' && !e.target.value) { const arr = getP(ci) || []; if (arr.length) { snapshot(); arr.pop(); markDirty(); refreshQE(); const again = document.querySelector(`[data-chipin="${ci}"]`); if (again) again.focus(); } }
  if (e.target.closest && e.target.closest('[data-rich]') && e.key === 'Enter' && e.target.closest('.ted')) e.preventDefault();
});
pvEl.addEventListener('mousedown', e => { if (e.target.closest('.fb')) e.preventDefault(); });
pvEl.addEventListener('submit', e => { if (e.target.matches('[data-qeask]')) { e.preventDefault(); askClaudeQuestion(); } });
pvEl.addEventListener('click', e => {
  const t = e.target;
  const tk = t.closest('.tk'); if (tk && tk.closest('[data-rich]')) { e.stopPropagation(); editChip(tk); return; }
  const fb = t.closest('[data-ins]'); if (fb) { insertFromBar(fb.dataset.ins, fb); return; }
  const b = t.closest('[data-qe]'); if (!b || !editing) return;
  e.stopPropagation();
  const act = b.dataset.qe, p = b.dataset.p, { pi, qi } = editing;
  if (act === 'done') { stopEdit(); return; }
  if (act === 'addmenu') { addOpen = addOpen === p ? null : p; refreshQE(); return; }
  if (act === 'qdel' && !b.classList.contains('armed')) { b.classList.add('armed'); b.textContent = 'לחצו שוב למחיקה'; return; }
  if (act === 'del' && /subs\.\d+$/.test(p) && !b.classList.contains('armed')) { b.classList.add('armed'); b.textContent = 'בטוח?'; return; }
  snapshot();
  if (act === 'add') { getP(p).push(newBlock(b.dataset.v)); addOpen = null; }
  else if (act === 'addsub') { const subs = qAt(pi, qi).subs, L = 'אבגדהוזחטי'; if (subs.length === 1 && !subs[0].l) subs[0].l = 'א'; subs.push({ l: subs.length ? L[subs.length] || '' : '', pts: null, blocks: [{ t: 'text', v: '' }, { t: 'long', rows: 3 }] }); }
  else if (act === 'del' || act === 'up' || act === 'down') { const [arr, i] = parentOf(p); if (act === 'del') arr.splice(i, 1); else { const j = act === 'up' ? i - 1 : i + 1; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; } }
  else if (act === 'set') setP(p, +b.dataset.v);
  else if (act === 'li-add') { const arr = getP(p) || []; arr.push(''); setP(p, arr); }
  else if (act === 'li-del' || act === 'chip-del') getP(p).splice(+b.dataset.k, 1);
  else if (act === 'tbl') {
    const blk = getP(p); const rows = blk.rows && blk.rows.length ? blk.rows : [['']]; const nc = Math.max(...rows.map(r => r.length));
    if (b.dataset.v === 'row+') rows.push(Array(nc).fill('')); else if (b.dataset.v === 'col+') rows.forEach(r => r.push(''));
    else if (b.dataset.v === 'row-' && rows.length > 1) rows.pop(); else if (b.dataset.v === 'col-' && nc > 1) rows.forEach(r => r.pop());
    blk.rows = rows;
  }
  else if (act === 'qmove') { const arr = exam.parts[pi].qs, j = qi + +b.dataset.v; if (j < 0 || j >= arr.length) return; [arr[qi], arr[j]] = [arr[j], arr[qi]]; editing.qi = j; markDirty(); renderPreview(); return; }
  else if (act === 'qdup') { const arr = exam.parts[pi].qs; const c = clone(arr[qi]); c.n = nextNum(); arr.splice(qi + 1, 0, c); editing.qi = qi + 1; markDirty(); renderStatus(); renderPreview(); return; }
  else if (act === 'qdel') { exam.parts[pi].qs.splice(qi, 1); editing = null; markDirty(); renderStatus(); renderPreview(); return; }
  markDirty(); renderStatus(); refreshQE();
});

/* inserting answer places into text */
function caretRange() {
  if (!lastRich || !lastRich.isConnected) return null;
  const s = getSelection();
  if (s.rangeCount && lastRich.contains(s.anchorNode)) return s.getRangeAt(0);
  if (savedRange && lastRich.contains(savedRange.startContainer)) return savedRange;
  const r = document.createRange(); r.selectNodeContents(lastRich); r.collapse(false); return r;
}
function insertTok(tok, range) {
  const r = range || caretRange(); if (!r) return;
  const tmp = document.createElement('span'); tmp.innerHTML = chip(tok); const node = tmp.firstChild;
  r.deleteContents(); r.insertNode(node);
  const sp = document.createTextNode(' '); node.after(sp);
  const s = getSelection(), nr = document.createRange(); nr.setStartAfter(sp); nr.collapse(true); s.removeAllRanges(); s.addRange(nr);
  lastRich.focus(); lastRich.dispatchEvent(new Event('input', { bubbles: true }));
}
function insertFromBar(kind, btn) {
  if (!lastRich || !lastRich.isConnected) { flashFmt(); return; }
  const r = caretRange(); const selText = r ? r.toString().trim() : '';
  if (kind === 'bold' || kind === 'u') { lastRich.focus(); if (r) { const s = getSelection(); s.removeAllRanges(); s.addRange(r); } document.execCommand(kind === 'u' ? 'underline' : 'bold'); lastRich.dispatchEvent(new Event('input', { bubbles: true })); return; }
  if (kind === 'blank') return insertTok('___', r);
  if (kind === 'root') return insertTok('[שורש]', r);
  const keep = r ? r.cloneRange() : null;
  if (kind === 'choice') openPop(btn, `<h3>בחירה בתוך המשפט</h3><label class="f">האפשרויות (מפרידים בפסיק)<input id="popIn" value="${esc(selText ? selText + ', ' : '')}" placeholder="ניגוד, ויתור"></label><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    () => { const o = $('popIn').value.split(/\s*[,/]\s*/).map(x => x.trim()).filter(Boolean); if (o.length < 2) return false; insertTok(`{${o.join(' / ')}}`, keep); });
  if (kind === 'list') openPop(btn, `<h3>רשימה לבחירה</h3><div class="lists">${LIST_KEYS.map(n => `<button type="button" data-pick="${n}">${n}</button>`).join('')}</div><label class="f">או רשימה משלכם (מפרידים בפסיק)<input id="popIn" placeholder="פשוט, מורכב, מאוחה"></label><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    pick => { if (pick) return insertTok(`[${pick}]`, keep); const o = $('popIn').value.split(/\s*[,/]\s*/).filter(Boolean); if (o.length < 2) return false; insertTok(`[רשימה:${o.join(' / ')}]`, keep); });
  if (kind === 'above') openPop(btn, `<h3>משבצת מעל מילה</h3><label class="f">המילה או הצירוף<input id="popIn" value="${esc(selText)}" placeholder="למשל: הילדים"></label><label class="f">מה התלמיד ממלא<select id="popSel"><option value="">כותב בעצמו</option>${LIST_KEYS.map(n => `<option>${n}</option>`).join('')}</select></label><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    () => { const w = $('popIn').value.trim(); if (!w) return false; insertTok(`[מעל:${w}${$('popSel').value ? '|' + $('popSel').value : ''}]`, keep); });
  if (kind === 'box') openPop(btn, `<h3>מילים במסגרת</h3><label class="f">המילים שבתוך המסגרת<input id="popIn" value="${esc(selText)}" placeholder="למשל: אם ימנעו הכותבים"></label><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    () => { const w = $('popIn').value.trim().replace(/\]/g, ')'); if (!w) return false; insertTok(`[מסגרת:${w}]`, keep); });
  if (kind === 'img') {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/png,image/jpeg,image/gif,image/webp';
    inp.onchange = async () => {
      const f = inp.files[0]; if (!f) return;
      let url = ''; try { url = await shrinkImage(f, f.name || 'x.png'); } catch (e) {}
      if (!url) { showModal(`<h2>לא הצלחתי לקרוא את התמונה</h2><p>אפשר להוסיף תמונה מסוג PNG או JPG.</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`); return; }
      exam.images = exam.images || {}; let n = 1; while (exam.images['img' + n]) n++;
      exam.images['img' + n] = url; insertTok(`[תמונה:img${n}]`, keep);
    };
    inp.click(); return;
  }
  if (kind === 'ref') openPop(btn, `<h3>הפניה ל${esc(exam.settings.textItem)}</h3><div class="grid2"><label class="f">${esc(exam.settings.textItem)}<select id="popA">${exam.articles.map((a, i) => `<option value="${i + 1}">${i + 1}. ${esc(a.title || '')}</option>`).join('')}</select></label><label class="f">פסקה (לא חובה)<input id="popP" type="number" min="1"></label></div><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    () => insertTok(`[${exam.settings.textItem} ${$('popA').value}${$('popP').value ? `, פס' ${$('popP').value}` : ''}]`, keep));
}
function flashFmt() { const f = $('fmt'); if (!f) return; f.classList.remove('off'); f.querySelector('.lbl').textContent = 'קודם לחצו בתוך הטקסט:'; setTimeout(() => { if (f.isConnected) f.querySelector('.lbl').textContent = 'בתוך הטקסט:'; }, 2200); }
function editChip(tk) {
  const tok = tk.dataset.tok, host = tk.closest('[data-rich]');
  const replace = nt => { lastRich = host; const tmp = document.createElement('span'); tmp.innerHTML = chip(nt); tk.replaceWith(tmp.firstChild); host.dispatchEvent(new Event('input', { bubbles: true })); };
  const remove = () => { tk.remove(); host.dispatchEvent(new Event('input', { bubbles: true })); };
  let m, html, ok;
  if ((m = tok.match(/^\{(.+)\}$/))) { html = `<h3>בחירה בתוך המשפט</h3><label class="f">האפשרויות (מפרידים בפסיק)<input id="popIn" value="${esc(m[1].split(/\s\/\s/).join(', '))}"></label>`; ok = () => { const o = $('popIn').value.split(/\s*[,/]\s*/).filter(Boolean); if (o.length < 2) return false; replace(`{${o.join(' / ')}}`); }; }
  else if ((m = tok.match(/^\[מעל:([^\]|]+)(?:\|([^\]]+))?\]$/))) { html = `<h3>משבצת מעל מילה</h3><label class="f">המילה<input id="popIn" value="${esc(m[1])}"></label><label class="f">מה התלמיד ממלא<select id="popSel"><option value="">כותב בעצמו</option>${LIST_KEYS.map(n => `<option${m[2] === n ? ' selected' : ''}>${n}</option>`).join('')}</select></label>`; ok = () => { const w = $('popIn').value.trim(); if (!w) return false; replace(`[מעל:${w}${$('popSel').value ? '|' + $('popSel').value : ''}]`); }; }
  else if ((m = tok.match(/^\[(רשימה:)?(.+)\]$/)) && tok !== '[שורש]' && !/^\[(מאמר|טקסט|קטע)/.test(tok)) { const cur = m[1] ? '' : m[2]; html = `<h3>רשימה לבחירה</h3><div class="lists">${LIST_KEYS.map(n => `<button type="button" data-pick="${n}"${n === cur ? ' style="border-color:var(--ink);color:var(--ink)"' : ''}>${n}</button>`).join('')}</div><label class="f">או רשימה משלכם<input id="popIn" value="${m[1] ? esc(m[2].split(/\s\/\s/).join(', ')) : ''}"></label>`; ok = pick => { if (pick) return replace(`[${pick}]`); const o = $('popIn').value.split(/\s*[,/]\s*/).filter(Boolean); if (o.length < 2) return false; replace(`[רשימה:${o.join(' / ')}]`); }; }
  else if ((m = tok.match(/^\[מסגרת:(.+)\]$/))) { html = `<h3>מילים במסגרת</h3><label class="f">המילים<input id="popIn" value="${esc(m[1])}"></label>`; ok = () => { const w = $('popIn').value.trim().replace(/\]/g, ')'); if (!w) return false; replace(`[מסגרת:${w}]`); }; }
  else { html = `<h3>${tok === '___' ? 'משבצת לתשובה' : tok === '[שורש]' ? 'משבצות שורש' : /^\[תמונה:/.test(tok) ? 'תמונה' : 'הפניה'}</h3><p class="cap" style="margin:0">אפשר למחוק או להשאיר.</p>`; ok = null; }
  openPop(tk, html + `<div class="row">${ok ? '<button type="button" class="btn primary small" id="popOk">שמירה</button>' : '<span></span>'}<button type="button" class="btn small danger" id="popDel">מחיקה</button></div>`, ok, remove);
}
let popOk = null;
function openPop(anchor, html, onOk, onDel) {
  const pop = $('pop'); pop.innerHTML = html; pop.hidden = false; popOk = onOk;
  const r = anchor.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
  let left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8), top = r.bottom + 6;
  if (top + h > innerHeight - 8) top = Math.max(8, r.top - h - 6);
  pop.style.left = left + 'px'; pop.style.top = top + 'px';
  const inp = pop.querySelector('input, select'); if (inp) inp.focus();
  const okb = $('popOk'); if (okb) okb.onclick = () => { if (popOk && popOk() !== false) closePop(); };
  const del = $('popDel'); if (del) del.onclick = () => { onDel && onDel(); closePop(); };
  pop.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => { if (popOk) popOk(b.dataset.pick); closePop(); });
  pop.onkeydown = e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); if (popOk && popOk() !== false) closePop(); } if (e.key === 'Escape') closePop(); };
}
function closePop() { $('pop').hidden = true; popOk = null; }
document.addEventListener('mousedown', e => { if (!$('pop').hidden && !e.target.closest('#pop') && !e.target.closest('.fb') && !e.target.closest('.tk')) closePop(); });

/* ===================== drawer: settings, texts, part ===================== */
let drawer = null;
function openDrawer(d) { drawer = d; renderDrawer(); }
function closeDrawer() { drawer = null; $('drawer').hidden = true; $('work').classList.remove('drawer-open'); }
const sw = (path, on, title, sub) => `<label class="sw"><input type="checkbox" data-dk="${path}"${on ? ' checked' : ''}><i></i><span>${title}<small>${sub}</small></span></label>`;
function renderDrawer() {
  const dr = $('drawer'); if (!drawer || !exam) return closeDrawer();
  dr.hidden = false; $('work').classList.add('drawer-open');
  const s = exam.settings; let title = '', body = '';
  if (drawer.kind === 'settings') {
    title = 'הגדרות המבחן';
    body = `<div class="grid2"><label class="f">שם המבחן<input data-dv="title" value="${esc(exam.title)}"></label><label class="f">כותרת משנה<input data-dv="subtitle" value="${esc(exam.subtitle)}"></label>
      <label class="f">משך המבחן (דקות)<input type="number" min="0" data-dv="minutes" value="${+exam.minutes || 0}"></label>
      <label class="f">הארכת זמן לבעלי התאמה<select data-dv="settings.ext">${[0, 25, 33, 50].map(v => `<option value="${v}"${+s.ext === v ? ' selected' : ''}>${v ? v + '%' : 'בלי הארכה'}</option>`).join('')}</select></label></div>
      ${sw('settings.nikud', s.nikud, 'מקלדת ניקוד', 'קמץ, פתח, דגש וכו׳, מופיעה כשמקלידים תשובה')}
      ${sw('settings.texts', s.texts, 'אזור טקסטים לצד השאלות', 'מאמרים או קטעים בחלון נפרד, עם הפניות לפסקאות')}
      ${s.texts ? `<label class="f" style="max-width:14em">איך לקרוא להם<select data-dv="settings.textsName">${Object.keys(NAMES).map(n => `<option${s.textsName === n ? ' selected' : ''}>${n}</option>`).join('')}</select></label>` : ''}
      ${sw('settings.draft', s.draft !== false, 'דף טיוטה', 'חלון לטיוטה ולראשי פרקים. לא נבדק, אבל נשמר עם התשובות')}
      <label class="f">הוראות לנבחן (כל הוראה בשורה)<textarea data-dv="instructions" rows="${Math.max(3, exam.instructions.length + 1)}">${esc(exam.instructions.join('\n'))}</textarea></label>`;
  } else if (drawer.kind === 'texts') {
    title = esc(s.textsName);
    body = (s.texts ? '' : `<div class="notes">אזור הטקסטים כבוי, ולכן התלמיד לא יראה אותם. <button type="button" class="btn small" data-dact="texts-on">להפעיל</button></div>`) +
      exam.articles.map((a, i) => `<div class="art-card"><div class="h"><b>${esc(s.textItem)} ${i + 1}</b><button type="button" class="ico" data-dact="up" data-i="${i}">↑</button><button type="button" class="ico" data-dact="down" data-i="${i}">↓</button><button type="button" class="ico del" data-dact="del" data-i="${i}">מחיקה</button></div>
        <label class="f">כותרת<input data-dv="articles.${i}.title" value="${esc(a.title)}"></label><label class="f">מקור / כותב<input data-dv="articles.${i}.by" value="${esc(a.by)}"></label>
        <label class="f">הטקסט (כל פסקה בשורה; ימוספרו אוטומטית)<textarea data-dv="articles.${i}.ps" rows="${Math.min(12, Math.max(3, (a.ps || []).length + 1))}">${esc((a.ps || []).join('\n'))}</textarea></label>
        ${sw(`articles.${i}.pl`, a.pl === 'letters', 'פסקאות באותיות', 'פסקה א, פסקה ב… במקום פס׳ 1, פס׳ 2')}</div>`).join('') +
      `<button type="button" class="btn" data-dact="add-art">+ ${esc(s.textItem)} חדש</button>`;
  } else if (drawer.kind === 'part') {
    const part = exam.parts[drawer.pi]; if (!part) return closeDrawer();
    title = 'חלק / פרק';
    body = `<label class="f">שם החלק<input data-dv="parts.${drawer.pi}.title" value="${esc(part.title)}"></label><label class="f">ניקוד<input data-dv="parts.${drawer.pi}.pts" value="${esc(part.pts)}"></label>
      <label class="f">הנחיה לחלק (לא חובה)<textarea data-dv="parts.${drawer.pi}.note" rows="2">${esc(part.note)}</textarea></label>
      ${part.qs.length > 1 ? `<label class="f" style="max-width:18em">על כמה שאלות עונים בחלק הזה<select data-dv="parts.${drawer.pi}.pick"><option value="0">על כולן</option>${part.qs.slice(1).map((x, k) => `<option value="${k + 1}"${+part.pick === k + 1 ? ' selected' : ''}>${k + 1} מתוך ${part.qs.length}</option>`).join('')}</select></label>` : ''}
      ${sw(`parts.${drawer.pi}.alt`, !!part.alt, 'פרק לבחירה', 'התלמיד בוחר פרק אחד מבין כל הפרקים שמסומנים כך, ועונה רק עליו')}
      <div class="row"><button type="button" class="btn" data-dact="add-q">+ שאלה בחלק הזה</button><button type="button" class="btn" data-dact="add-part">+ חלק חדש אחרי</button></div>
      <div class="row"><button type="button" class="ico" data-dact="pmove" data-v="-1">↑ למעלה</button><button type="button" class="ico" data-dact="pmove" data-v="1">↓ למטה</button><button type="button" class="ico del" data-dact="pdel">מחיקת החלק וכל השאלות בו</button></div>`;
  }
  dr.innerHTML = `<div class="dr-h"><h2>${title}</h2><button type="button" class="x" data-dact="close" aria-label="סגירה">×</button></div><div class="dr-b">${body}</div>`;
}
document.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openDrawer({ kind: b.dataset.open }));
$('drawer').addEventListener('input', e => {
  const t = e.target, k = t.dataset.dv; if (!k) return;
  let v = t.value;
  if (/(^instructions$|\.ps$)/.test(k)) v = v.split('\n').map(x => x.trim()).filter(Boolean);
  if (k === 'minutes' || k === 'settings.ext' || /\.pick$/.test(k)) v = +v || 0;
  setP2(k, v);
  if (k === 'settings.textsName') { exam.settings.textItem = NAMES[v] || 'מאמר'; changed(true); return; }
  if (/\.pick$/.test(k)) { changed(true); return; }
  changed(false);
});
$('drawer').addEventListener('change', e => { const t = e.target; if (t.dataset.dk) { snapshot(); setP2(t.dataset.dk, /\.pl$/.test(t.dataset.dk) ? (t.checked ? 'letters' : '') : t.checked); changed(true); } });
function setP2(p, v) { const a = p.split('.'), k = a.pop(); const o = a.length ? a.reduce((x, y) => x[y], exam) : exam; o[k] = v; }
$('drawer').addEventListener('click', e => {
  const b = e.target.closest('[data-dact]'); if (!b) return;
  const a = b.dataset.dact;
  if (a === 'close') return closeDrawer();
  if (a === 'pdel' && !b.classList.contains('armed')) { b.classList.add('armed'); b.textContent = 'לחצו שוב כדי למחוק'; return; }
  snapshot();
  if (a === 'texts-on') exam.settings.texts = true;
  else if (a === 'add-art') exam.articles.push({ title: '', by: '', ps: [] });
  else if (a === 'del' || a === 'up' || a === 'down') { const i = +b.dataset.i, arr = exam.articles; if (a === 'del') arr.splice(i, 1); else { const j = a === 'up' ? i - 1 : i + 1; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; } }
  else if (a === 'add-q') { const arr = exam.parts[drawer.pi].qs; arr.push({ n: nextNum(), intro: [], subs: [{ l: '', pts: null, blocks: [{ t: 'text', v: '' }, { t: 'long', rows: 3 }] }] }); editing = { pi: drawer.pi, qi: arr.length - 1 }; closeDrawer(); }
  else if (a === 'add-part') { const at = drawer.pi + 1; exam.parts.splice(at, 0, { title: 'חלק חדש', pts: '', qs: [] }); drawer = { kind: 'part', pi: at }; }
  else if (a === 'pmove') { const i = drawer.pi, j = i + +b.dataset.v, arr = exam.parts; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; drawer.pi = j; }
  else if (a === 'pdel') { exam.parts.splice(drawer.pi, 1); closeDrawer(); editing = null; }
  changed(true);
});

/* ===================== upload ===================== */
async function handleFile(f) {
  if (!f) return;
  const name = f.name || '';
  try {
    if (/\.html?$/i.test(name)) {
      const txt = await f.text();
      const m = txt.match(/<script type="application\/json" id="exam-data">([\s\S]*?)<\/script>/);
      if (!m) throw new Error('בקובץ הזה אין מבחן שנוצר בכלי הזה.');
      await createExam(normalize(JSON.parse(m[1].replace(/<\\\//g, '</'))), name); return;
    }
    if (/\.pdf$/i.test(name)) {
      const s = await samplePromise;
      if (!s || !s.pdf) throw new Error('כאן אפשר להמיר רק קובצי Word. קובץ PDF: פותחים אותו ב-Word, שומרים בשם כ-‎.docx ומעלים.');
      if (f.size > 18 * 1024 * 1024) throw new Error('קובץ ה-PDF גדול מדי (יותר מ-18MB). אפשר לשמור ממנו רק את עמודי המבחן ולהעלות שוב.');
      const data = await new Promise((ok, no) => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(',')[1]); fr.onerror = no; fr.readAsDataURL(f); });
      lines = null;
      const ex = normalize({ title: name.replace(/\.pdf$/i, ''), parts: [] }); ex.images = {};
      await createExam(ex, name); notes = []; renderStatus();
      await convertPdf(data);
      return;
    }
    if (!/\.docx$/i.test(name)) throw new Error('אפשר להעלות קובץ Word מסוג ‎.docx או PDF. קובץ ‎.doc ישן: פותחים אותו ב-Word ושומרים בשם כ-‎.docx.');
    lines = await readDocx(await f.arrayBuffer());
    const r = buildExam(lines);
    const ex = normalize(r.exam); ex.images = lines.images || {}; if (!ex.title || ex.title.length > 80) ex.title = name.replace(/\.docx$/i, '');
    await createExam(ex, name); notes = r.notes; renderStatus();
    // Word files always go through Claude; the built-in recognition is only the fallback
    const s = await samplePromise;
    if (s) await convertWithClaude();
    else { notes.unshift(`${AI} לא זמין כאן, אז נעשתה המרה בסיסית. כדאי לבדוק אותה היטב.`); renderStatus(); }
  } catch (err) { showModal(`<h2>לא הצלחתי לקרוא את הקובץ</h2><p>${esc(err.message || err)}</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`); }
}
$('file').addEventListener('change', e => { handleFile(e.target.files[0]); e.target.value = ''; });
let dragDepth = 0;
const hasFiles = e => e.dataTransfer && [...e.dataTransfer.types].includes('Files');
document.addEventListener('dragenter', e => { if (hasFiles(e)) { dragDepth++; $('dropHint').hidden = false; $('upcard').classList.add('over'); } });
document.addEventListener('dragleave', () => { dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) { $('dropHint').hidden = true; $('upcard').classList.remove('over'); } });
document.addEventListener('dragover', e => { if (hasFiles(e)) e.preventDefault(); });
document.addEventListener('drop', e => { if (!hasFiles(e)) return; e.preventDefault(); dragDepth = 0; $('dropHint').hidden = true; $('upcard').classList.remove('over'); handleFile(e.dataTransfer.files[0]); });
// a file copied in the computer's folders can also be pasted (Ctrl+V) on the home screen
document.addEventListener('paste', e => {
  const fs = e.clipboardData && e.clipboardData.files; if (!fs || !fs.length || $('home').hidden) return;
  const f = [...fs].find(x => /\.(docx|pdf|html?)$/i.test(x.name || '')); if (!f) return;
  e.preventDefault(); handleFile(f);
});

/* ===================== modal ===================== */
function showModal(html) { $('modalIn').innerHTML = html; $('modal').hidden = false; const b = $('modalIn').querySelector('button'); if (b) b.focus(); }
$('modal').addEventListener('click', e => { if (e.target === $('modal') || e.target.closest('[data-close]')) $('modal').hidden = true; });
document.addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (!$('pop').hidden) closePop(); else if (!$('modal').hidden) $('modal').hidden = true; else if (drawer) closeDrawer(); });

/* ===================== export ===================== */
function buildFile(ex) {
  const css = $('xm-css').textContent, js = $('xm-runtime').textContent;
  const json = JSON.stringify(Object.assign({}, ex, { _source: undefined })).replace(/<\//g, '<\\/');
  return `<!doctype html>
<html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(ex.title || 'מבחן')}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&family=Frank+Ruhl+Libre:wght@400;500;700&display=swap">
<style>html,body{height:100%;margin:0}${css}</style></head>
<body><div id="exam"></div>
<script type="application/json" id="exam-data">${json}<\/script>
<script>${js}
mountExam(document.getElementById('exam'), JSON.parse(document.getElementById('exam-data').textContent));<\/script>
</body></html>`;
}
let lastExport = '';
async function exportExam(ex) {
  const html = buildFile(ex), fname = `${(ex.title || 'מבחן').replace(/[\\/:*?"<>|]/g, '').trim() || 'מבחן'}.html`;
  lastExport = html;
  if (downloads) {
    try { await downloads.save({ filename: fname, data: html }); exportDone(fname); return; }
    catch (e) { if (e && e.code === 'declined') return; }
  }
  showModal(`<h2>שמירת קובץ המבחן</h2><p>כאן אי אפשר להוריד ישירות. העתיקו את הקוד, הדביקו בפנקס רשימות (Notepad) ושמרו בשם <b>${esc(fname)}</b>.</p><textarea readonly id="codeOut">${esc(html)}</textarea><div class="row"><button type="button" class="btn primary" id="copyCode">העתקה</button><button type="button" class="btn" data-close>סגירה</button></div>`);
  $('copyCode').onclick = () => { const t = $('codeOut'); navigator.clipboard.writeText(html).then(() => { $('copyCode').textContent = 'הועתק'; }, () => { t.focus(); t.select(); }); };
}
$('exportBtn').onclick = () => { stopEdit(); exportExam(exam); };
function exportDone(fname) {
  showModal(`<h2>קובץ המבחן מוכן</h2><p>הקובץ <b>${esc(fname)}</b> נשמר. ככה משתמשים בו:</p><ol>
    <li>מעתיקים את הקובץ למחשבים שבהם נבחנים (דיסק און קי, תיקייה משותפת או Drive).</li>
    <li>התלמיד פותח אותו בדפדפן (כרום או אדג׳). לא צריך אינטרנט ולא צריך להתקין כלום.</li>
    <li>התשובות נשמרות אוטומטית. בסוף לוחצים "הגשה" ואז "שמירת התשובות כקובץ Word", ומעבירים את הקובץ למורה.</li></ol>${CANVAS ? '<p class="cap">לא ירד קובץ? <button type="button" class="btn small" id="showCode">הצגת הקוד להעתקה</button></p>' : ''}<div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`);
  const sc = $('showCode'); if (sc) sc.onclick = () => {
    showModal(`<h2>שמירת קובץ המבחן</h2><p>העתיקו את הקוד, הדביקו בפנקס רשימות (Notepad) ושמרו בשם <b>${esc(fname)}</b>.</p><textarea readonly id="codeOut">${esc(lastExport)}</textarea><div class="row"><button type="button" class="btn primary" id="copyCode">העתקה</button><button type="button" class="btn" data-close>סגירה</button></div>`);
    $('copyCode').onclick = () => { const t = $('codeOut'); t.focus(); t.select(); try { document.execCommand('copy'); $('copyCode').textContent = 'הועתק'; } catch (e) {} };
  };
}

/* ===================== Claude ===================== */
const SCHEMA_HELP = `Exam JSON: {"title":str,"subtitle":str,"minutes":int,"instructions":[str],"articles":[{"title":str,"by":str,"pl":""|"letters","ps":[str]}],"parts":[{"title":str,"pts":str,"note":str,"alt":str,"pick":int,"qs":[{"n":str,"intro":[Block],"subs":[{"l":str,"pts":number|null,"blocks":[Block]}]}]}]}
Block types:
 {"t":"text","v":str} question text or a line with inline answer places · {"t":"passage","v":str} reading passage / sentence block
 {"t":"mc","opts":[str],"num":bool} multiple choice; num=true when the options are numbered (1), (2)… instead of א-ד · {"t":"long","rows":int} written answer
 {"t":"punct","v":str} the student adds punctuation to this text ("פסקו את הקטע"); v is the text exactly as given, without punctuation
 {"t":"essay","rows":int,"min":int,"max":int} writing task (חיבור, מאמר טיעון, סיכום, מכתב, מטלת כתיבה) with word limits from the instructions
 {"t":"table","rows":[[str]]} first row = headers; empty cell "" = answer box
 {"t":"mark","v":str} student clicks words in this text to mark/underline/circle them ("סמנו/מתחו קו/הקיפו בקטע/במשפט את...")
 {"t":"split","v":str,"label":""|"פסוקית"|"תפקיד"|"free"} student marks boundaries with / between words ("חלקו את המשפט לפסוקיות/לאיברים", "תחמו את הפסוקית", "סמנו את גבולות הפסוקית"); label = what the student then names for every part: "פסוקית" when asked for the clause type, "תפקיד" when asked for the syntactic role of each clause/phrase (also "נתחו את המשפט: ציינו מעל המילים את התפקידים"), "free" for anything else; omit when only the boundaries are asked
 {"t":"sort","items":[str],"cols":int,"head":"" or list name,"meaning":bool} sort words into columns ("מיינו", "חלקו לזוגות/לקבוצות"); head = list name when column titles come from a list (e.g. "בניין"), "" when the student writes them; meaning=true when asked for the common meaning
 {"t":"match","left":[str],"right":[str]} matching ("התאימו", "מתחו קו בין")
Tokens inside "v", table cells, options and items:
 ___ typed blank · {opt1 / opt2 / opt3} pick one (every inline "א / ב", נכון / לא נכון, words to circle from a short list)
 [שורש] root letter boxes · ready-made dropdowns: ${LIST_KEYS.map(n => `[${n}]`).join(' ')} · [רשימה:a / b / c] custom dropdown
 [מעל:word] box above a word, [מעל:word|תפקיד] dropdown above a word (any list name) — for "כתבו מעל כל מילה/צירוף..."
 [מאמר N, פס' M] link to article N paragraph M (after every reference to an article; M may be a letter, [מאמר N, פסקה ג]) · **bold**
 [קו:words] underlined words (keep every underline of the exam, e.g. "הצירוף המסומן בקו") · [מסגרת:words] words in a box (e.g. a clause already bounded)
 [תמונה:imgN] a picture: keep each mark exactly once, where it stands (in a question's text, a table cell, or as its own article paragraph); never invent marks
Choices: when a part says to answer only some of its questions ("ענו על ארבע מן השאלות 6–10", "ענו על שתיים מן השאלות"), set its "pick" to that number. When the student chooses one of several chapters/parts ("בחרו בפרק ב – תחביר או בפרק ג – מערכת הצורות", "ענו על אחד מן הפרקים ב–ג"), make each chapter its own part and give those parts the same "alt" (e.g. "בחירה"); drop the line asking to write the chosen chapter's name.
Articles: paragraphs labelled with letters ("פסקה א", "פסקה ב") → "pl":"letters"; drop the paragraph labels and line numbers from the text. A reference sheet (דף עזר / נספח) is one more article. Titles, part titles and "by" are plain text without marks.
Rules: keep the exam's wording, nikud and numbering exactly. "l" is the sub label like "א" or "ב(2)"; the first block of a sub is its question text. Points like "(3 נק')" go to "pts", not the text. Every sub must have somewhere to answer. Labelled lines ("מאפיין: ___ דוגמה: ___", "השורש: ___ הבניין: ___") keep every blank; rewriting tasks ("נסחו מחדש", "המירו", "פרקו לשלושה משפטים") get a long answer with one row per line asked. Prefer the most specific type: tables with root/binyan/גזרה/משקל columns use [שורש], [בניין], [גזרה] in empty cells; syntax roles use [מעל:..|תפקיד]; clause types use [פסוקית]; sentence types use [סוג משפט]; logical relations use [קשר לוגי]. Drop page-break notes, draft pages, cover name/class lines and any answers a student already wrote.`;
const CLAUDE_ERRORS = {
  rate_limited: WEB ? 'הגעתם למגבלה של המפתח החינמי. מחכים דקה ומנסים שוב. אם נגמרה המכסה היומית, היא מתחדשת מחר.' : CANVAS ? 'נגמרה המכסה של Gemini Pro בחשבון הזה. היא מתחדשת לבד אחרי כמה שעות, לפעמים רק למחרת, ואז אפשר לנסות שוב. המבחן שמור ולא נפגע.' : 'יש כרגע עומס או שהגעתם למגבלת השימוש. נסו שוב בעוד כמה דקות.',
  not_granted: CANVAS ? 'Gemini לא אישר בקשות מהחשבון הזה. בדקו שאתם מחוברים לחשבון Google. בחשבון של בית ספר ייתכן שמנהל המערכת חסם את Gemini באפליקציות, ואז אפשר להיכנס עם חשבון Google פרטי.' : 'לא אושרה גישה ל-Claude.',
  bad_key: 'מפתח ה-Gemini לא עובד. בדקו אותו בחיבור ל-Gemini.',
  model_missing: CANVAS ? 'Gemini Pro לא זמין כרגע בחשבון הזה.' : 'המודל שנבחר כבר לא זמין. בחרו מודל אחר בחיבור ל-Gemini.',
  network: 'אין חיבור לאינטרנט. בדקו את החיבור ונסו שוב.',
  refusal: `${WEB ? 'Gemini' : 'Claude'} סירב לבצע את הבקשה הזו. נסו לנסח אחרת.`,
  too_large: 'המבחן ארוך מדי לבקשה אחת.'
};
async function runClaude(prompt, label, files) {
  if (WEB && !getKey() && !(await askKey())) return null;
  const ctl = new AbortController();
  showModal(`<h2><span class="spin"></span> ${label}</h2><p>זה לוקח בדרך כלל דקה עד שלוש. אפשר לחכות כאן.</p><p class="cap" id="aiProg"></p><div class="row"><button type="button" class="btn" id="aiStop">עצירה</button></div>`);
  $('aiStop').onclick = () => ctl.abort();
  const onProgress = n => { const p = $('aiProg'); if (p) p.textContent = `${AI} כותב… ${n.toLocaleString('he-IL')} תווים עד עכשיו`; };
  const o = { modelTier: 'complex', signal: ctl.signal }; if (files) o.files = files;
  if (WEB) o.onProgress = onProgress; else o.onText = ({ text }) => onProgress((text || '').length);
  try { const out = await sample.json(prompt, o); $('modal').hidden = true; return out; }
  catch (e) {
    if (e && e.code === 'cancelled') { $('modal').hidden = true; return null; }
    const code = e && e.code;
    const msg = CLAUDE_ERRORS[code] || `${AI} לא הצליח הפעם. אפשר לנסות שוב, אולי בניסוח אחר.`;
    const fix = WEB && (code === 'bad_key' || code === 'model_missing');
    showModal(`<h2>זה לא הסתדר</h2><p>${msg}</p>${e && e.detail ? `<p class="cap" dir="ltr">${esc(e.detail)}</p>` : ''}<div class="row">${fix ? '<button type="button" class="btn primary" id="reKey">חיבור ל-Gemini</button>' : ''}<button type="button" class="btn${fix ? '' : ' primary'}" data-close>סגירה</button></div>`);
    const rk = $('reKey'); if (rk) rk.onclick = () => askKey();
    return null;
  }
}

/* ===================== outside Claude: Gemini with the teacher's own free key ===================== */
// Inside claude.ai the page talks to Claude. Opened as a plain file or website, it talks to Google's Gemini API
// straight from the browser, with a free key from Google AI Studio that stays on this computer.
const GEM = 'https://generativelanguage.googleapis.com/v1beta';
const ls = { get: k => { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }, set: (k, v) => { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch (e) {} } };
const getKey = () => ls.get('xm-gemini-key');
async function listModels(key) {
  let r;
  try { r = await fetch(`${GEM}/models?pageSize=1000`, { headers: { 'x-goog-api-key': key } }); } catch (e) { throw { code: 'network' }; }
  if (r.status === 400 || r.status === 401 || r.status === 403) throw { code: 'bad_key' };
  if (!r.ok) throw { code: 'server_error' };
  const j = await r.json();
  return (j.models || [])
    .filter(m => (m.supportedGenerationMethods || []).includes('generateContent') && /gemini/i.test(m.name) && !/(embed|aqa|image|tts|audio|live|robotics|computer-use|nano)/i.test(m.name))
    .map(m => ({ id: m.name.replace(/^models\//, ''), label: m.displayName || m.name, out: m.outputTokenLimit || 8192 }));
}
// newest stable "flash" first (fast, generous free limits), then pro, then anything newer that is a preview
function rankModels(ms) {
  const ver = id => { const m = id.match(/gemini-(\d+(?:\.\d+)?)/); return m ? +m[1] : 0; };
  const score = m => ver(m.id) * 100 + (/flash/.test(m.id) && !/lite/.test(m.id) ? 30 : /pro/.test(m.id) ? 20 : 0) - (/(preview|exp)/.test(m.id) ? 60 : 0) - (/latest/.test(m.id) ? 1 : 0);
  return ms.slice().sort((a, b) => score(b) - score(a));
}
function askKey() {
  return new Promise(resolve => {
    showModal(`<h2>חיבור ל-Gemini</h2>
      <p>כדי שהכלי ימיר מבחנים צריך מפתח של Gemini. המפתח חינמי ולא צריך כרטיס אשראי:</p>
      <ol><li>נכנסים ל-<a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> עם חשבון Google.</li><li>לוחצים "Create API key" ומעתיקים את המפתח.</li><li>מדביקים אותו כאן. הוא נשמר רק במחשב הזה.</li></ol>
      <form id="keyForm" class="row"><input id="keyIn" type="password" autocomplete="off" placeholder="המפתח (מתחיל ב-AIza…)" value="${esc(getKey())}" style="flex:1;border:1px solid var(--line);border-radius:9px;padding:8px 12px;direction:ltr" aria-label="מפתח Gemini"><button type="submit" class="btn primary" id="keyOk">בדיקה ושמירה</button></form>
      <p class="cap" id="keyMsg"></p>
      <div id="modelRow" hidden><label class="f">מודל<select id="modelSel"></select></label></div>
      <div class="row"><button type="button" class="btn primary" id="keyDone" hidden>סיום</button><button type="button" class="btn ghost" id="keyCancel">ביטול</button>${getKey() ? '<button type="button" class="btn ghost danger" id="keyForget">מחיקת המפתח מהמחשב</button>' : ''}</div>`);
    const msg = t => { $('keyMsg').textContent = t; };
    $('keyIn').focus();
    $('keyForm').onsubmit = async e => {
      e.preventDefault(); const key = $('keyIn').value.trim(); if (!key) return;
      $('keyOk').disabled = true; msg('בודק את המפתח…');
      try {
        const ms = rankModels(await listModels(key));
        if (!ms.length) throw { code: 'model_missing' };
        ls.set('xm-gemini-key', key);
        const cur = ls.get('xm-gemini-model'), pick = ms.find(m => m.id === cur) || ms[0];
        $('modelSel').innerHTML = ms.map(m => `<option value="${esc(m.id)}"${m.id === pick.id ? ' selected' : ''}>${esc(m.label)}</option>`).join('');
        ls.set('xm-gemini-model', pick.id); ls.set('xm-gemini-out', String(pick.out));
        $('modelSel').onchange = () => { const m = ms.find(x => x.id === $('modelSel').value); ls.set('xm-gemini-model', m.id); ls.set('xm-gemini-out', String(m.out)); };
        $('modelRow').hidden = false; $('keyDone').hidden = false; msg('המפתח עובד. אפשר להשאיר את המודל שנבחר.');
        renderAiState();
      } catch (err) { msg(err.code === 'bad_key' ? 'המפתח לא התקבל. בדקו שהעתקתם את כולו.' : err.code === 'network' ? 'אין חיבור לאינטרנט.' : 'משהו השתבש. נסו שוב.'); }
      $('keyOk').disabled = false;
    };
    $('keyDone').onclick = () => { $('modal').hidden = true; resolve(true); };
    $('keyCancel').onclick = () => { $('modal').hidden = true; resolve(!!getKey()); };
    const fg = $('keyForget'); if (fg) fg.onclick = () => { ls.set('xm-gemini-key', ''); $('modal').hidden = true; renderAiState(); resolve(false); };
  });
}
// models sometimes wrap JSON in a code fence or a sentence; keep the outermost object
function parseJsonText(text) {
  const t = String(text || '').replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');
  try { return JSON.parse(t); } catch (e) {}
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e) {} }
  throw { code: 'invalid_json' };
}
// Gemini reads attached files (a PDF exam) together with the instructions
const filesAndText = (prompt, opts) => [...((opts && opts.files) || []).map(f => ({ inline_data: { mime_type: f.mime, data: f.data } })), { text: prompt }];
const geminiSample = {
  pdf: true,
  async json(prompt, opts) {
    opts = opts || {};
    const key = getKey(); if (!key) throw { code: 'bad_key' };
    let model = ls.get('xm-gemini-model'), out = +ls.get('xm-gemini-out') || 8192;
    if (!model) { const ms = rankModels(await listModels(key)); if (!ms.length) throw { code: 'model_missing' }; model = ms[0].id; out = ms[0].out; ls.set('xm-gemini-model', model); ls.set('xm-gemini-out', String(out)); }
    let res;
    try {
      res = await fetch(`${GEM}/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`, {
        method: 'POST', signal: opts.signal,
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({ contents: [{ role: 'user', parts: filesAndText(prompt, opts) }], generationConfig: { responseMimeType: 'application/json', maxOutputTokens: Math.min(65536, out) } })
      });
    } catch (e) { throw { code: e && e.name === 'AbortError' ? 'cancelled' : 'network' }; }
    if (!res.ok) {
      const j = await res.json().catch(() => ({})), m = (j.error && (j.error.message || j.error.status)) || '';
      if (res.status === 429) throw { code: 'rate_limited' };
      if (res.status === 404) { ls.set('xm-gemini-model', ''); throw { code: 'model_missing' }; }
      if (res.status === 401 || res.status === 403 || /api key/i.test(m)) throw { code: 'bad_key' };
      throw { code: res.status >= 500 ? 'server_error' : 'bad_request' };
    }
    // server-sent events: "data: {candidates:[{content:{parts:[{text}]}, finishReason}]}"
    const reader = res.body.getReader(), dec = new TextDecoder();
    let buf = '', text = '', finish = '', blocked = '';
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let nl;
        while ((nl = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
          if (!line.startsWith('data:')) continue;
          const ev = JSON.parse(line.slice(5));
          if (ev.promptFeedback && ev.promptFeedback.blockReason) blocked = ev.promptFeedback.blockReason;
          const c = ev.candidates && ev.candidates[0]; if (!c) continue;
          ((c.content && c.content.parts) || []).forEach(p => { if (p.text && !p.thought) text += p.text; });
          if (c.finishReason) finish = c.finishReason;
          if (opts.onProgress) opts.onProgress(text.length);
        }
      }
    } catch (e) { if (e && e.code) throw e; throw { code: e && e.name === 'AbortError' ? 'cancelled' : 'network' }; }
    if (blocked || /SAFETY|PROHIBITED|BLOCKLIST|RECITATION/.test(finish)) throw { code: 'refusal' };
    if (finish === 'MAX_TOKENS') throw { code: 'too_large' };
    return parseJsonText(text);
  }
};
// Gemini Canvas: Canvas adds the key to any Gemini call the page makes, so it runs on the account of whoever opened it.
// Pro models only, newest first; the next one is tried only when an account cannot use the one before it.
const CANVAS_MODELS = ['gemini-3-pro-preview', 'gemini-2.5-pro'];
const canvasCall = (model, body, signal) => fetch(`${GEM}/models/${model}:generateContent?key=`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal });
const canvasSample = {
  pdf: true,
  async json(prompt, opts) {
    opts = opts || {};
    const body = { contents: [{ role: 'user', parts: filesAndText(prompt, opts) }], generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 65536 } };
    const models = CANVAS_MODELS;
    let res, wait = 2000;
    for (let m = 0, attempt = 0; ; attempt++) {
      try { res = await canvasCall(models[m], body, opts.signal); }
      catch (e) { throw { code: e && e.name === 'AbortError' ? 'cancelled' : 'network' }; }
      if (res.status === 400 && body.generationConfig.maxOutputTokens) { delete body.generationConfig.maxOutputTokens; continue; }
      if ((res.status === 429 || res.status === 503) && attempt < 2) { await new Promise(r => setTimeout(r, wait)); wait *= 3; continue; }
      if ([401, 403, 404, 429].includes(res.status) && m + 1 < models.length) { m++; attempt = 0; wait = 2000; continue; }
      break;
    }
    if (!res.ok) {
      let detail = '';
      try { const j = await res.json(); detail = (j.error && j.error.message) || ''; } catch (e) {}
      throw { code: res.status === 429 ? 'rate_limited' : res.status === 401 || res.status === 403 ? 'not_granted' : res.status === 404 ? 'model_missing' : 'server_error', detail: `${res.status} ${detail}`.trim() };
    }
    const data = await res.json();
    if (data.promptFeedback && data.promptFeedback.blockReason) throw { code: 'refusal' };
    const c = data.candidates && data.candidates[0];
    if (!c) throw { code: 'server_error' };
    if (/SAFETY|PROHIBITED|BLOCKLIST|RECITATION/.test(c.finishReason || '')) throw { code: 'refusal' };
    if (c.finishReason === 'MAX_TOKENS') throw { code: 'too_large' };
    return parseJsonText(((c.content && c.content.parts) || []).filter(x => x.text && !x.thought).map(x => x.text).join(''));
  }
};
// shows on the home screen whether the AI is connected
function renderAiState() {
  const b = $('aiSetBtn'); if (!b) return;
  b.hidden = !WEB;
  b.textContent = getKey() ? 'Gemini מחובר ✓' : 'חיבור ל-Gemini';
  b.classList.toggle('primary', !getKey());
}
const webDownloads = {
  async save({ filename, data }) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: /\.json$/.test(filename) ? 'application/json' : 'text/html' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
};

/* ===================== backup: all exams in one file ===================== */
async function backupAll() {
  const list = await Lib.list(), exams = [];
  for (const m of list) { const ex = await Lib.load(m.id); if (ex) exams.push(ex); }
  if (!exams.length) { showModal(`<h2>אין מה לגבות</h2><p>עוד אין מבחנים שמורים.</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`); return; }
  const fname = `גיבוי מבחנים ${new Date().toLocaleDateString('he-IL').replace(/\./g, '-')}.json`;
  try { await (downloads || webDownloads).save({ filename: fname, data: JSON.stringify({ kind: 'xm-backup', v: 1, exams }) }); }
  catch (e) { if (!e || e.code !== 'declined') showModal(`<h2>הגיבוי לא נשמר</h2><p>נסו שוב.</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`); }
}
async function restoreFile(f) {
  try {
    const d = JSON.parse(await f.text());
    if (!d || d.kind !== 'xm-backup' || !Array.isArray(d.exams)) throw new Error('bad');
    for (const ex of d.exams) await Lib.save(Lib.newId(), normalize(ex));
    libItems = await Lib.list(); renderLib();
    showModal(`<h2>השחזור הושלם</h2><p>נוספו ${d.exams.length} מבחנים.</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`);
  } catch (e) { showModal(`<h2>לא הצלחתי לשחזר</h2><p>זה לא נראה כמו קובץ גיבוי של הכלי הזה.</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`); }
}
$('backupBtn').onclick = backupAll;
$('restoreIn').addEventListener('change', e => { if (e.target.files[0]) restoreFile(e.target.files[0]); e.target.value = ''; });
// what the AI sees of the exam: articles by title only, pictures by their marks only
const lean = () => Object.assign({}, exam, { _source: undefined, images: undefined, articles: exam.articles.map(a => ({ title: a.title })) });
const keepArts = (out, arts) => { if (!out.articles || !out.articles.length || out.articles.every(a => !a.ps || !a.ps.length)) out.articles = arts; return out; };
async function convertWithClaude() {
  if (!sample || !lines) return;
  const docText = lines.map(l => l.k === 'tbl' ? '[טבלה]\n' + l.rows.map(r => r.join(' | ')).join('\n') + '\n[סוף טבלה]' : l.t).filter(x => x && x.trim()).join('\n');
  const knownArts = exam.articles.slice(), id = curId;
  const artRule = knownArts.length ? `\nThe ${knownArts.length} articles are already extracted: return "articles": [] and do not copy their text, but still add [מאמר N, פס' M] links in the questions.` : '';
  const out = await runClaude(`You convert a Hebrew school exam (Hebrew language / לשון, grades 11–12; extracted from Word: bold marked with **, underline with [קו:…], pictures with [תמונה:imgN], each table between [טבלה] and [סוף טבלה] with | between cells) into JSON for a typing-friendly exam app. Return ONLY the JSON.\n${SCHEMA_HELP}${artRule}\n\nEXAM:\n${docText}`, `${AI} ממיר את המבחן…`);
  if (id !== curId) return;
  if (!out || !Array.isArray(out.parts) || !out.parts.length) { if (out !== null) { notes.unshift(`ההמרה עם ${AI} לא הושלמה, ומוצגת המרה בסיסית.`); renderStatus(); } return; }
  snapshot();
  const keepSettings = exam.settings, title = exam.title, src = exam._source, pics = exam.images;
  exam = normalize(keepArts(out, knownArts)); exam._source = src; exam.images = pics; if (!exam.title) exam.title = title;
  exam.settings = Object.assign(keepSettings, { texts: exam.articles.length > 0 || keepSettings.texts });
  notes = [`הומר עם ${AI}. כדאי לעבור על השאלות.`]; editing = null;
  changed(true);
}
// a PDF goes to Gemini as it is: Gemini reads the pages, tables and pictures itself
async function convertPdf(data) {
  const id = curId;
  const out = await runClaude(`The attached PDF is a Hebrew school exam (Hebrew language / לשון, grades 11–12). Convert it into JSON for a typing-friendly exam app. Return ONLY the JSON.
The PDF may also hold a cover page, general instructions, answer lines, draft pages ("טיוטה") and an appendix (נספח) with articles and a reference sheet: the appendix texts go into "articles"; skip covers, answer lines and drafts. Mark bold words with ** and underlined words with [קו:…] as they appear.
Pictures cannot be copied: where a picture matters for a question (a comic, an ad, a chart), describe it briefly in Hebrew in parentheses, starting "בתמונה:", and include every word written in it.
${SCHEMA_HELP}`, `${AI} קורא את ה-PDF וממיר את המבחן…`, [{ mime: 'application/pdf', data }]);
  if (id !== curId) return;
  if (!out || !Array.isArray(out.parts) || !out.parts.length) { if (out !== null) { notes.unshift(`${AI} לא הצליח להמיר את ה-PDF. אפשר לנסות שוב, או לשמור אותו ב-Word כ-‎.docx ולהעלות.`); renderStatus(); } return; }
  snapshot();
  const keepSettings = exam.settings, title = exam.title, src = exam._source;
  exam = normalize(out); exam._source = src; exam.images = {}; if (!exam.title) exam.title = title;
  exam.settings = Object.assign(keepSettings, { texts: exam.articles.length > 0 });
  notes = [`הומר עם ${AI} מתוך ה-PDF. תמונות מה-PDF מתוארות במילים; אפשר להוסיף אותן בעריכה, בכפתור "תמונה".`]; editing = null;
  changed(true);
}
$('askForm').addEventListener('submit', async e => {
  e.preventDefault();
  const req = $('askIn').value.trim(); if (!req) return;
  if (!sample) { showModal(`<h2>Claude לא זמין כאן</h2><p>שינוי במילים עובד כשפותחים את הכלי מתוך Claude, עם משתמש מחובר. בינתיים אפשר לערוך כל שאלה בלחיצה על "עריכה".</p><div class="row"><button type="button" class="btn primary" data-close>סגירה</button></div>`); return; }
  stopEdit(false);
  const arts = exam.articles;
  const out = await runClaude(`Here is a Hebrew exam as JSON for a typing-friendly exam app (articles shortened to titles; keep them as they are). Apply the teacher's request and return the WHOLE updated exam JSON only.\n${SCHEMA_HELP}\n\nTEACHER'S REQUEST (Hebrew): ${req}\n\nEXAM JSON:\n${JSON.stringify(lean())}`, `${AI} משנה את המבחן…`);
  if (!out || !Array.isArray(out.parts)) return;
  snapshot();
  const keepSettings = exam.settings, src = exam._source, pics = exam.images;
  exam = normalize(keepArts(out, arts)); exam._source = src; exam.images = pics; exam.settings = Object.assign(keepSettings, out.settings || {});
  $('askIn').value = ''; notes = [`בוצע: ${req}`];
  changed(true);
});
async function askClaudeQuestion() {
  const inp = $('qeAskIn'); const req = inp && inp.value.trim(); if (!req || !editing || !sample) return;
  const { pi, qi } = editing, q = qAt(pi, qi);
  const out = await runClaude(`Here is ONE question from a Hebrew exam, as JSON for a typing-friendly exam app. Apply the teacher's request to this question and return ONLY the updated question JSON {"n","intro","subs"}.\n${SCHEMA_HELP}\nThe exam's articles: ${exam.articles.map((a, i) => `${i + 1}. ${a.title}`).join('; ') || 'none'}.\n\nTEACHER'S REQUEST (Hebrew): ${req}\n\nQUESTION JSON:\n${JSON.stringify(q)}`, `${AI} משנה את השאלה…`);
  if (!out || !Array.isArray(out.subs)) return;
  snapshot();
  exam.parts[pi].qs[qi] = { n: String(out.n || q.n), intro: out.intro || [], subs: out.subs };
  normalize(exam); markDirty(); renderStatus(); refreshQE();
}

/* ===================== start ===================== */
const samplePromise = (async () => {
  if (CANVAS) { downloads = webDownloads; sample = canvasSample; return sample; }
  if (WEB) { downloads = webDownloads; sample = geminiSample; return sample; }
  try { downloads = await window.claude.use('downloads'); } catch (e) {}
  try { sample = await window.claude.use('sample'); } catch (e) {}
  return sample;
})();
$('lead').textContent = $('lead').textContent.replace('Claude', AI);
$('askLabel').textContent = `✦ בקשו מ-${AI}`;
$('aiSetBtn').onclick = () => askKey();
renderAiState();
(async () => {
  showHome();
  if (window.claude && window.claude.use) {
    try { userNs = await window.claude.use('user'); if (userNs) { uid = await userNs.id(); const me = await userNs.me(); if (me && me.name) $('hello').innerHTML = `שלום ${esc(me.name.split(' ')[0])},<br><em>איזה מבחן ממירים היום?</em>`; } } catch (e) {}
    try { db = await window.claude.use('db'); } catch (e) {}
    if (Lib.cloud()) { libLoaded = false; showHome(); }
  }
})();

