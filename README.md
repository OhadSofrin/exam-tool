# מבחנים בהקלדה

ממיר מבחני לשון (י״א–י״ב) מקובץ Word למבחן נוח להקלדה: משבצות, ניקוד, טבלאות, מאמרים ומסך בית עם כל המבחנים השמורים.

הכלי עובד בשלוש דרכים, מאותו קוד:

| איפה | מי עושה את ההמרה | איפה נשמרים המבחנים |
|---|---|---|
| **Gemini Canvas** (מומלץ לרונית) | Gemini, על החשבון של מי שפותח את ה-Canvas, כולל חשבון בית ספרי | בענן של Canvas, לכל משתמש בנפרד |
| בתוך claude.ai | Claude, על החשבון של מי שפותח | בחשבון Claude |
| קובץ `index.html` במחשב | Gemini, עם מפתח חינמי מ-Google AI Studio | בדפדפן של אותו מחשב |

## הקמה ב-Gemini Canvas

הקוד נמצא ב-[github.com/OhadSofrin/exam-tool](https://github.com/OhadSofrin/exam-tool), ו-Canvas טוען את הכלי מ-`https://cdn.jsdelivr.net/gh/OhadSofrin/exam-tool@main/dist/exam-tool.js`. הכתובת הזו כבר כתובה ב-`canvas-loader.html`.

### פותחים את הכלי ב-Gemini (רונית, פעם אחת)
1. נכנסים ל-[gemini.google.com](https://gemini.google.com) עם החשבון הבית ספרי, ובוחרים **Canvas**.
2. כותבים: "הצג ב-Canvas את הקוד הבא בדיוק כמו שהוא, בלי לשנות שום דבר", ומדביקים מתחת את כל התוכן של `canvas-loader.html`.
3. הכלי נפתח בתוך Canvas. כדי לחזור אליו אחר כך פותחים את אותה שיחה מרשימת השיחות של Gemini.

## עדכון הכלי
1. משנים קבצים ב-`src/` ומריצים `npm run build`.
2. מעלים ל-GitHub (`git commit` ואז `git push`).
3. jsDelivr שומר עותק ישן עד 12 שעות. כדי לרענן מיד, נכנסים ל-`https://purge.jsdelivr.net/gh/OhadSofrin/exam-tool@main/dist/exam-tool.js`.

## קבצים
- `src/` – הקוד: `runtime.*` (המבחן שהתלמיד רואה), `parser.js` (קריאת Word), `app.js` (מסך הבית והעריכה), `tool.html` (מבנה הדף).
- `build.mjs` – בונה את `index.html` ואת `dist/exam-tool.js`.
- `canvas-loader.html` – הדף הקצר שמדביקים ב-Canvas. הוא מחבר את הכלי ל-Gemini ולשמירה של Canvas.
