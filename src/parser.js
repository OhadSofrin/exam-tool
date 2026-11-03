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
  function paraText(p) {
    let out = '', bold = false, buf = '';
    const flush = () => { if (!buf) return; out += bold && buf.trim() && !/^_+$/.test(buf.trim()) ? buf.replace(/^(\s*)(.*?)(\s*)$/, '$1**$2**$3') : buf; buf = ''; };
    Array.from(p.getElementsByTagNameNS(W, 'r')).forEach(r => {
      const rPr = kid(r, 'rPr'); const b = on(kid(rPr, 'b')) || on(kid(rPr, 'bCs'));
      let t = '';
      kids(r).forEach(n => { if (n.localName === 't') t += n.textContent; else if (n.localName === 'tab') t += ' '; else if (n.localName === 'br') t += '\n'; });
      if (!t) return;
      if (b !== bold) { flush(); bold = b; }
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
  return lines;
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
