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
