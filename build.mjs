// Builds the tool from src/ into two forms:
//   index.html            one self-contained page (works inside claude.ai, or as a file with a free Gemini key)
//   dist/exam-tool.js     one script for Gemini Canvas: canvas-loader.html loads it from a CDN
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const read = f => readFile(new URL(`./src/${f}`, import.meta.url), 'utf8');
const [tool, runtimeCss, runtimeJs, parserJs, appJs] = await Promise.all(['tool.html', 'runtime.css', 'runtime.js', 'parser.js', 'app.js'].map(read));
for (const [name, src] of [['runtime.js', runtimeJs], ['parser.js', parserJs], ['app.js', appJs]]) {
  if (/<\/script/i.test(src)) throw new Error(`${name} must not contain "</script"`);
}

// 1. the single page
let html = tool;
for (const [ph, src] of [['/*RUNTIME_CSS*/', runtimeCss], ['/*RUNTIME_JS*/', runtimeJs], ['/*PARSER_JS*/', parserJs], ['/*APP_JS*/', appJs]]) {
  if (!html.includes(ph)) throw new Error(`tool.html is missing ${ph}`);
  html = html.replace(ph, () => src);
}
await writeFile(new URL('./index.html', import.meta.url), html);

// 2. the Canvas bundle: puts the page's styles and markup into the loader page, then runs the same code
const appCss = tool.match(/<style>\s*(\/\* Layout:[\s\S]*?)<\/style>/)[1];
const start = tool.indexOf('<div id="app"'), end = tool.indexOf('<script id="xm-runtime">');
if (start < 0 || end < 0) throw new Error('tool.html markup markers not found');
const markup = tool.slice(start, end);
const head = [
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Frank+Ruhl+Libre:wght@400;500;700;900&display=swap">',
  `<style id="xm-css">${runtimeCss}</style>`,
  `<style>${appCss}</style>`
].join('');
const bundle = `/* מבחנים בהקלדה · Gemini Canvas build */
(function () {
  document.documentElement.lang = 'he'; document.documentElement.dir = 'rtl';
  document.head.insertAdjacentHTML('beforeend', ${JSON.stringify(head)});
  document.body.insertAdjacentHTML('beforeend', ${JSON.stringify(markup)});
  // the exported exam file needs the exam runtime as text
  const rt = document.createElement('script'); rt.type = 'text/plain'; rt.id = 'xm-runtime'; rt.textContent = ${JSON.stringify(runtimeJs)};
  document.body.appendChild(rt);
  const z = document.createElement('script'); z.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'; document.head.appendChild(z);
})();
${runtimeJs}
${parserJs}
${appJs}
`;
await mkdir(new URL('./dist/', import.meta.url), { recursive: true });
await writeFile(new URL('./dist/exam-tool.js', import.meta.url), bundle);
console.log(`built index.html (${Math.round(html.length / 1024)} KB) and dist/exam-tool.js (${Math.round(bundle.length / 1024)} KB)`);
