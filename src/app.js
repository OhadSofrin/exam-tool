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
  catch (e) { dirty = true; $('saved').className = 'saved'; $('saved').textContent = e && e.code === 'quota_exceeded' ? 'אין מקום לשמור' : 'לא נשמר, מנסה שוב…'; saveT = setTimeout(flush, 4000); }
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
  ['sort', 'מיון לעמודות', 'התלמיד ממיין מילים לקבוצות'], ['match', 'התאמה', 'לכל פריט התלמיד בוחר התאמה']];
const TNAME = Object.fromEntries(TYPES.map(t => [t[0], t[1]]));
const newBlock = k => k === 'mc' ? { t: k, opts: ['', '', '', ''] } : k === 'long' ? { t: k, rows: 3 } : k === 'essay' ? { t: k, rows: 14, min: 0, max: 0 } : k === 'table' ? { t: k, rows: [['', ''], ['', '']] } : k === 'sort' ? { t: k, items: [], cols: 2, head: '', meaning: false } : k === 'match' ? { t: k, left: [], right: [] } : { t: k, v: '' };

/* text with answer places <-> editable HTML with chips */
const TOKRE = new RegExp(String.raw`\*\*(.+?)\*\*|(_{3,})|\{([^{}]+?\s\/\s[^{}]+?)\}|(\[שורש\])|\[(${LIST_KEYS.join('|')})\]|\[רשימה:([^\]]+)\]|\[מעל:([^\]|]+)(?:\|([^\]]+))?\]|(\[(?:מאמר|טקסט|קטע)\s*\d+(?:\s*,\s*פס['׳]?\s*\d+)?\])`, 'g');
function chip(tok) {
  let m;
  if (/^_{3,}$/.test(tok)) return `<span class="tk" contenteditable="false" data-tok="___">▭ משבצת</span>`;
  if ((m = tok.match(/^\{(.+)\}$/))) return `<span class="tk ch" contenteditable="false" data-tok="${esc(tok)}">${esc(m[1].split(/\s\/\s/).join(' · '))}</span>`;
  if (tok === '[שורש]') return `<span class="tk rt" contenteditable="false" data-tok="[שורש]">שורש ▢-▢-▢</span>`;
  if ((m = tok.match(/^\[רשימה:(.+)\]$/))) return `<span class="tk ls" contenteditable="false" data-tok="${esc(tok)}">${esc(m[1])}</span>`;
  if ((m = tok.match(/^\[מעל:([^\]|]+)(?:\|([^\]]+))?\]$/))) return `<span class="tk ab" contenteditable="false" data-tok="${esc(tok)}"><small>${esc(m[2] ? m[2] + ' ▾' : 'משבצת')}</small><b>${esc(m[1])}</b></span>`;
  if ((m = tok.match(/^\[(מאמר|טקסט|קטע)\s*(\d+)(?:\s*,\s*פס['׳]?\s*(\d+))?\]$/))) return `<span class="tk rf" contenteditable="false" data-tok="${esc(tok)}">↖ ${m[1]} ${m[2]}${m[3] ? ` · פס׳ ${m[3]}` : ''}</span>`;
  if ((m = tok.match(/^\[(.+)\]$/))) return `<span class="tk ls" contenteditable="false" data-tok="${esc(tok)}">${esc(m[1])}</span>`;
  return esc(tok);
}
function toEditable(text) {
  const s = String(text || ''); let out = '', last = 0, m; const re = new RegExp(TOKRE.source, 'g');
  while ((m = re.exec(s))) {
    out += esc(s.slice(last, m.index)).replace(/\n/g, '<br>'); last = re.lastIndex;
    out += m[1] !== undefined ? `<b>${toEditable(m[1])}</b>` : chip(m[0]);
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
  else if (t === 'mc') body = lineList(p + '.opts', b.opts, 'תשובה…', true);
  else if (t === 'long') body = `<div class="ansbox"><span>כאן התלמיד כותב את התשובה</span><span class="row"><span class="cap">גודל</span><span class="seg">${[[2, 'קטנה'], [4, 'בינונית'], [8, 'גדולה']].map(([r, n]) => `<button type="button" data-qe="set" data-p="${p}.rows" data-v="${r}" aria-pressed="${(b.rows || 3) === r || (r === 4 && ![2, 8].includes(b.rows || 3))}">${n}</button>`).join('')}</span></span></div>`;
  else if (t === 'essay') body = `<div class="ansbox" style="min-height:6em"><span>תיבה גדולה לכתיבה, עם מונה מילים</span><span class="row"><span class="cap">מילים: מ-</span><input class="numin" type="number" min="0" data-num="${p}.min" value="${b.min || ''}" aria-label="מינימום מילים"><span class="cap">עד</span><input class="numin" type="number" min="0" data-num="${p}.max" value="${b.max || ''}" aria-label="מקסימום מילים"></span></div>`;
  else if (t === 'table') {
    const rows = b.rows && b.rows.length ? b.rows : [['']];
    body = `<div class="ted"><table>${rows.map((r, ri) => `<tr class="${ri === 0 && b.head !== false ? 'head' : ''}">${r.map((c, ci) => `<td>${rich(`${p}.rows.${ri}.${ci}`, c, '')}</td>`).join('')}</tr>`).join('')}</table></div>
      <div class="ted-bar"><button type="button" class="addline" data-qe="tbl" data-p="${p}" data-v="row+">+ שורה</button><button type="button" class="addline" data-qe="tbl" data-p="${p}" data-v="col+">+ עמודה</button><button type="button" class="ico" data-qe="tbl" data-p="${p}" data-v="row-">− שורה</button><button type="button" class="ico" data-qe="tbl" data-p="${p}" data-v="col-">− עמודה</button><span class="cap">תא ריק = משבצת לתשובה. אפשר להכניס לתא שורש או רשימה מהסרגל למעלה.</span></div>`;
  }
  else if (t === 'mark' || t === 'split') body = `${rich(p + '.v', b.v, t === 'mark' ? 'הטקסט שבו התלמיד יסמן מילים…' : 'המשפט שהתלמיד יחלק…', 'passage')}<span class="cap">${t === 'mark' ? 'בזמן המבחן התלמיד לוחץ על מילים כדי לסמן אותן.' : 'בזמן המבחן התלמיד לוחץ בין מילים כדי לסמן גבול ( / ).'}</span>`;
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
        <button type="button" class="fb" data-ins="blank">משבצת <span class="pv">▭</span></button>
        <button type="button" class="fb" data-ins="choice">בחירה <span class="pv">א · ב</span></button>
        <button type="button" class="fb" data-ins="root">שורש <span class="pv">▢-▢-▢</span></button>
        <button type="button" class="fb" data-ins="list">רשימה <span class="pv">▾</span></button>
        <button type="button" class="fb" data-ins="above">מעל מילה</button>
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
  if (kind === 'bold') { lastRich.focus(); if (r) { const s = getSelection(); s.removeAllRanges(); s.addRange(r); } document.execCommand('bold'); lastRich.dispatchEvent(new Event('input', { bubbles: true })); return; }
  if (kind === 'blank') return insertTok('___', r);
  if (kind === 'root') return insertTok('[שורש]', r);
  const keep = r ? r.cloneRange() : null;
  if (kind === 'choice') openPop(btn, `<h3>בחירה בתוך המשפט</h3><label class="f">האפשרויות (מפרידים בפסיק)<input id="popIn" value="${esc(selText ? selText + ', ' : '')}" placeholder="ניגוד, ויתור"></label><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    () => { const o = $('popIn').value.split(/\s*[,/]\s*/).map(x => x.trim()).filter(Boolean); if (o.length < 2) return false; insertTok(`{${o.join(' / ')}}`, keep); });
  if (kind === 'list') openPop(btn, `<h3>רשימה לבחירה</h3><div class="lists">${LIST_KEYS.map(n => `<button type="button" data-pick="${n}">${n}</button>`).join('')}</div><label class="f">או רשימה משלכם (מפרידים בפסיק)<input id="popIn" placeholder="פשוט, מורכב, מאוחה"></label><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    pick => { if (pick) return insertTok(`[${pick}]`, keep); const o = $('popIn').value.split(/\s*[,/]\s*/).filter(Boolean); if (o.length < 2) return false; insertTok(`[רשימה:${o.join(' / ')}]`, keep); });
  if (kind === 'above') openPop(btn, `<h3>משבצת מעל מילה</h3><label class="f">המילה או הצירוף<input id="popIn" value="${esc(selText)}" placeholder="למשל: הילדים"></label><label class="f">מה התלמיד ממלא<select id="popSel"><option value="">כותב בעצמו</option>${LIST_KEYS.map(n => `<option>${n}</option>`).join('')}</select></label><div class="row"><button type="button" class="btn primary small" id="popOk">הוספה</button></div>`,
    () => { const w = $('popIn').value.trim(); if (!w) return false; insertTok(`[מעל:${w}${$('popSel').value ? '|' + $('popSel').value : ''}]`, keep); });
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
  else { html = `<h3>${tok === '___' ? 'משבצת לתשובה' : tok === '[שורש]' ? 'משבצות שורש' : 'הפניה'}</h3><p class="cap" style="margin:0">אפשר למחוק או להשאיר.</p>`; ok = null; }
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
        <label class="f">הטקסט (כל פסקה בשורה; ימוספרו אוטומטית)<textarea data-dv="articles.${i}.ps" rows="${Math.min(12, Math.max(3, (a.ps || []).length + 1))}">${esc((a.ps || []).join('\n'))}</textarea></label></div>`).join('') +
      `<button type="button" class="btn" data-dact="add-art">+ ${esc(s.textItem)} חדש</button>`;
  } else if (drawer.kind === 'part') {
    const part = exam.parts[drawer.pi]; if (!part) return closeDrawer();
    title = 'חלק / פרק';
    body = `<label class="f">שם החלק<input data-dv="parts.${drawer.pi}.title" value="${esc(part.title)}"></label><label class="f">ניקוד<input data-dv="parts.${drawer.pi}.pts" value="${esc(part.pts)}"></label>
      <label class="f">הנחיה לחלק (לא חובה)<textarea data-dv="parts.${drawer.pi}.note" rows="2">${esc(part.note)}</textarea></label>
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
  if (k === 'minutes' || k === 'settings.ext') v = +v || 0;
  setP2(k, v);
  if (k === 'settings.textsName') { exam.settings.textItem = NAMES[v] || 'מאמר'; changed(true); return; }
  changed(false);
});
$('drawer').addEventListener('change', e => { const t = e.target; if (t.dataset.dk) { snapshot(); setP2(t.dataset.dk, t.checked); changed(true); } });
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
    if (!/\.docx$/i.test(name)) throw new Error('אפשר להעלות קובץ Word מסוג ‎.docx. קובץ ‎.doc ישן: פותחים אותו ב-Word ושומרים בשם כ-‎.docx.');
    lines = await readDocx(await f.arrayBuffer());
    const r = buildExam(lines);
    const ex = normalize(r.exam); if (!ex.title || ex.title.length > 80) ex.title = name.replace(/\.docx$/i, '');
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
const SCHEMA_HELP = `Exam JSON: {"title":str,"subtitle":str,"minutes":int,"instructions":[str],"articles":[{"title":str,"by":str,"ps":[str]}],"parts":[{"title":str,"pts":str,"note":str,"qs":[{"n":str,"intro":[Block],"subs":[{"l":str,"pts":number|null,"blocks":[Block]}]}]}]}
Block types:
 {"t":"text","v":str} question text or a line with inline answer places · {"t":"passage","v":str} reading passage / sentence block
 {"t":"mc","opts":[str]} multiple choice (options א-ד) · {"t":"long","rows":int} written answer
 {"t":"essay","rows":int,"min":int,"max":int} writing task (חיבור, מאמר טיעון, סיכום, מכתב, מטלת כתיבה) with word limits from the instructions
 {"t":"table","rows":[[str]]} first row = headers; empty cell "" = answer box
 {"t":"mark","v":str} student clicks words in this text to mark/underline/circle them ("סמנו/מתחו קו/הקיפו בקטע/במשפט את...")
 {"t":"split","v":str} student marks boundaries with / between words ("חלקו את המשפט לפסוקיות/לאיברים", "סמנו את גבולות הפסוקית")
 {"t":"sort","items":[str],"cols":int,"head":"" or list name,"meaning":bool} sort words into columns ("מיינו", "חלקו לזוגות/לקבוצות"); head = list name when column titles come from a list (e.g. "בניין"), "" when the student writes them; meaning=true when asked for the common meaning
 {"t":"match","left":[str],"right":[str]} matching ("התאימו", "מתחו קו בין")
Tokens inside "v", table cells, options and items:
 ___ typed blank · {opt1 / opt2 / opt3} pick one (every inline "א / ב", נכון / לא נכון, words to circle from a short list)
 [שורש] root letter boxes · ready-made dropdowns: ${LIST_KEYS.map(n => `[${n}]`).join(' ')} · [רשימה:a / b / c] custom dropdown
 [מעל:word] box above a word, [מעל:word|תפקיד] dropdown above a word (any list name) — for "כתבו מעל כל מילה/צירוף..."
 [מאמר N, פס' M] link to article N paragraph M (after every reference to an article) · **bold**
Rules: keep the exam's wording, nikud and numbering exactly. "l" is the sub label like "א" or "ב(2)"; the first block of a sub is its question text. Points like "(3 נק')" go to "pts", not the text. Every sub must have somewhere to answer. Prefer the most specific type: tables with root/binyan/גזרה/משקל columns use [שורש], [בניין], [גזרה] in empty cells; syntax roles use [מעל:..|תפקיד]; clause types use [פסוקית]; sentence types use [סוג משפט]; logical relations use [קשר לוגי]. Drop page-break notes, draft pages, cover name/class lines and any answers a student already wrote.`;
const CLAUDE_ERRORS = {
  rate_limited: WEB ? 'הגעתם למגבלה של המפתח החינמי. מחכים דקה ומנסים שוב. אם נגמרה המכסה היומית, היא מתחדשת מחר.' : CANVAS ? 'נגמרה המכסה של Gemini Pro בחשבון הזה. היא מתחדשת לבד אחרי כמה שעות, לפעמים רק למחרת, ואז אפשר לנסות שוב. המבחן שמור ולא נפגע.' : 'יש כרגע עומס או שהגעתם למגבלת השימוש. נסו שוב בעוד כמה דקות.',
  not_granted: CANVAS ? 'Gemini לא אישר בקשות מהחשבון הזה. בדקו שאתם מחוברים לחשבון Google. בחשבון של בית ספר ייתכן שמנהל המערכת חסם את Gemini באפליקציות, ואז אפשר להיכנס עם חשבון Google פרטי.' : 'לא אושרה גישה ל-Claude.',
  bad_key: 'מפתח ה-Gemini לא עובד. בדקו אותו בחיבור ל-Gemini.',
  model_missing: CANVAS ? 'Gemini Pro לא זמין כרגע בחשבון הזה.' : 'המודל שנבחר כבר לא זמין. בחרו מודל אחר בחיבור ל-Gemini.',
  network: 'אין חיבור לאינטרנט. בדקו את החיבור ונסו שוב.',
  refusal: `${WEB ? 'Gemini' : 'Claude'} סירב לבצע את הבקשה הזו. נסו לנסח אחרת.`,
  too_large: 'המבחן ארוך מדי לבקשה אחת.'
};
async function runClaude(prompt, label) {
  if (WEB && !getKey() && !(await askKey())) return null;
  const ctl = new AbortController();
  showModal(`<h2><span class="spin"></span> ${label}</h2><p>זה לוקח בדרך כלל דקה עד שלוש. אפשר לחכות כאן.</p><p class="cap" id="aiProg"></p><div class="row"><button type="button" class="btn" id="aiStop">עצירה</button></div>`);
  $('aiStop').onclick = () => ctl.abort();
  const onProgress = n => { const p = $('aiProg'); if (p) p.textContent = `${AI} כותב… ${n.toLocaleString('he-IL')} תווים עד עכשיו`; };
  const o = { modelTier: 'complex', signal: ctl.signal };
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
const geminiSample = {
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
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', maxOutputTokens: Math.min(65536, out) } })
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
  async json(prompt, opts) {
    opts = opts || {};
    const body = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 65536 } };
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
const lean = () => Object.assign({}, exam, { _source: undefined, articles: exam.articles.map(a => ({ title: a.title })) });
const keepArts = (out, arts) => { if (!out.articles || !out.articles.length || out.articles.every(a => !a.ps || !a.ps.length)) out.articles = arts; return out; };
async function convertWithClaude() {
  if (!sample || !lines) return;
  const docText = lines.map(l => l.k === 'tbl' ? '[טבלה]\n' + l.rows.map(r => r.join(' | ')).join('\n') + '\n[סוף טבלה]' : l.t).filter(x => x && x.trim()).join('\n');
  const knownArts = exam.articles.slice(), id = curId;
  const artRule = knownArts.length ? `\nThe ${knownArts.length} articles are already extracted: return "articles": [] and do not copy their text, but still add [מאמר N, פס' M] links in the questions.` : '';
  const out = await runClaude(`You convert a Hebrew school exam (Hebrew language / לשון, grades 11–12; extracted from Word, bold marked with **) into JSON for a typing-friendly exam app. Return ONLY the JSON.\n${SCHEMA_HELP}${artRule}\n\nEXAM:\n${docText}`, `${AI} ממיר את המבחן…`);
  if (id !== curId) return;
  if (!out || !Array.isArray(out.parts) || !out.parts.length) { if (out !== null) { notes.unshift(`ההמרה עם ${AI} לא הושלמה, ומוצגת המרה בסיסית.`); renderStatus(); } return; }
  snapshot();
  const keepSettings = exam.settings, title = exam.title, src = exam._source;
  exam = normalize(keepArts(out, knownArts)); exam._source = src; if (!exam.title) exam.title = title;
  exam.settings = Object.assign(keepSettings, { texts: exam.articles.length > 0 || keepSettings.texts });
  notes = [`הומר עם ${AI}. כדאי לעבור על השאלות.`]; editing = null;
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
  const keepSettings = exam.settings, src = exam._source;
  exam = normalize(keepArts(out, arts)); exam._source = src; exam.settings = Object.assign(keepSettings, out.settings || {});
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
