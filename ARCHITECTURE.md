# ARCHITECTURE.md — מסה ומשקל

## Current structure (since 2026-09-24) — read this first

The unit ships as **six components** plus a shared 720 platform layer (xAPI reporting, the
"מצאתם בעיה?" issue report, resume). The single-file tree further down is the original authoring
layout and is kept for history; the files at the repo root (`css/`, `js/`, `assets/`,
`index-monolith-backup.html`) are that legacy build and are **never packaged**.

```
methodica-science-mass-weight-01/          (repo root)
├── index.html                 ← PRODUCTION entry: redirect to part 01, carries ?slxapi / ?registration
├── qa-shell.html              ← dev/QA only: Noa's iframe shell (+ unit-shell.js, unit-manifest.js)
├── index_dev.html             ← dev viewer of qa-shell.html
├── metadata/                  ← Kata catalogue: unit JSON + one per component (ids come from here)
├── unit-js/                   ← shared layer, loaded by every part in this order:
│     10-identity  20-xapi  25-report  40-resume  50-loader   (definitions only)
│     28-feedback-drag                                          (after the part's main.js)
│     90-boot                                                   (the only side effects — last tag)
├── unit-css/25-report.css     ← issue-report dialogs
├── unit-assets/               ← fonts / images / video shared by more than one part
├── methodica-science-mass-weight-01-0N/   ← the six parts (Kata components)
│     index.html  js/main.js  css/style.css  assets/  (+ index_dev.html, dev only)
├── _test/                     ← headless regression harness (never shipped)
├── docs/                      ← REPORT-XAPI.md, REPORT-ISSUE.md, RESUME.md, QA-REVIEW-MODE-HOOK.md
└── docs-and-tools/            ← package-allowlist / build-package / verify-package (never shipped)
```

Rules that break things silently (full reasoning: `2026/Documentation/reporting-and-resume/
ADDING-REPORTING-AND-RESUME.md`):

- Screens use **global** `data-screen` numbers; `unit-manifest.js` says which part owns which.
- Each part's `js/main.js` ends with its xAPI config block (`SCREEN_TO_SUBCONTENT`, …) and its four
  resume hooks. No top-level name may be declared both there and in `unit-js/`.
- **`?v=` on every code reference**, identical across parts for shared files; bump it with any change.
- The platform owns routing: a part's last click reports the component and stops. Hops between parts
  run only under `?dev=1` without `?registration` (`DEV_NAV`).
- **No external CDN for content or fonts** — with one required exception: the MOE xAPI library
  (`https://lomdot.education.gov.il/metodica/720active/common/xapi-720-k.js` + `xapiwrapper.min.js`),
  loaded by `unit-js/50-loader.js`, never copied into the repo. YouTube embeds are the other external
  source (static iframes; nothing from the page URL may reach them).
- Packages are built from an **allowlist**: `pwsh -File docs-and-tools/build-package.ps1`, checked
  by `verify-package.ps1` and by `node _test/verify-report.js <package>`.

---

## מבנה פרויקט (historical — the original single-file layout)

מבנה זה עוקב **בדיוק** אחר המבנה שמוגדר ב-`figma-lomda-builder`:

```
yaad4-science-mass-weight-01/
├── index.html          ← לומדה ראשית (production)
├── index_dev.html      ← כלי פיתוח, ניווט חופשי
├── css/
│   └── style.css       ← כל ה-CSS בקובץ אחד, מאורגן לפי engines
├── js/
│   └── main.js         ← כל ה-JS בקובץ אחד, מאורגן לפי engines
└── assets/
    ├── img/            ← Figma exports, כפתורים, רקעים, feedback panels
    ├── gif/            ← גיפים דמות כתומה
    ├── video/          ← .mp4 (סרטון הקניה)
    ├── audio/          ← קריינות, sound effects (אם נדרש)
    ├── fonts/          ← גופנים מקומיים — Assistant, Open Sans (ללא CDN)
    └── widgets/        ← embedded widgets (אם נדרשים)
```

**כלל ברזל:** אין CDN חיצוני. כל הפונטים מתחת ל-`assets/fonts/`.

---

## index.html — מבנה כללי

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>מסה ומשקל — יעד 4</title>
  <!-- Fonts: local only, no CDN -->
  <style>
    @font-face { font-family: 'Assistant'; src: url('assets/fonts/Assistant-Regular.woff2') format('woff2'); font-weight: 400; }
    @font-face { font-family: 'Assistant'; src: url('assets/fonts/Assistant-SemiBold.woff2') format('woff2'); font-weight: 600; }
    @font-face { font-family: 'Assistant'; src: url('assets/fonts/Assistant-Bold.woff2') format('woff2'); font-weight: 700; }
    @font-face { font-family: 'Open Sans'; src: url('assets/fonts/OpenSans-Bold.woff2') format('woff2'); font-weight: 700; }
  </style>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div id="app">

  <!-- ── SCREENS ── -->
  <!-- כל section = מסך ניווט עצמאי בלבד.
       States פנימיים (feedback, hint, selected) = JS states בתוך אותו section. -->
  <section class="screen active" data-screen="0"><!-- TransitionScreen: Intro --></section>
  <section class="screen" data-screen="1"><!-- Hook: ד' דמויות --></section>
  <!-- ... -->

  <!-- ── MODALS (חובה: מחוץ לכל .screen, בתוך #app) ── -->
  <div id="hint-modal"       class="modal-overlay hidden" role="dialog" aria-modal="true"></div>
  <div id="help-popup"       class="help-popup hidden"    role="tooltip"></div>
  <div id="revelation-popup" class="popup-overlay hidden" role="dialog" aria-modal="true"></div>

</div><!-- /#app -->
<script src="js/main.js"></script>
</body>
</html>
```

---

## css/style.css — ארגון לפי Sections

```
/* ── 1. RESET & BASE ──────────────────────────────────
   html, body: direction:rtl, font-family, overflow:hidden   */

/* ── 2. CANVAS & SCALE ────────────────────────────────
   #app (1280×710, transform-origin: top left)
   .screen (display:none / .active display:block)            */

/* ── 3. GLOBAL COMPONENTS ────────────────────────────
   Bottom bar, Continue button, Back button,
   Report/Issue button, Navigation arrows (RTL)              */

/* ── 4. MODAL ENGINE ──────────────────────────────────
   .modal-overlay, .help-popup, .popup-overlay
   Rule: all positioned inside #app, z-index above screens   */

/* ── 5. FEEDBACK ENGINE ───────────────────────────────
   .feedback-panel (correct/incorrect)
   Clipping formula: overflow:hidden + full-canvas img       */

/* ── 6. PROGRESS ENGINE ───────────────────────────────
   .progress-bar, .crumb, .crumb.active, .crumb.done         */

/* ── 7. VIDEO ENGINE ──────────────────────────────────
   .screen-video, .play-btn, .veo-video                      */

/* ── 8. SCQ ENGINE ────────────────────────────────────
   Pill options: .scq-option, .is-selected, .is-correct,
   .is-incorrect, .scq-radio, Submit button states           */

/* ── 9. FLIP CARD ENGINE ─────────────────────────────
   .frc-card-inner (transform), .is-flipped,
   .frc-card-front/.frc-card-back (backface-visibility)      */

/* ── 10. DRAG & DROP ENGINE ──────────────────────────
   .ddq-item (draggable), .ddq-target (drop zone),
   .ddq-ghost (placeholder), correct/incorrect states        */

/* ── 11. FORM ENGINE ─────────────────────────────────
   input/textarea fields, .correct/.incorrect states,
   @keyframes shake, submit button, :disabled opacity fix    */

/* ── 12. ANIMATION ENGINE ────────────────────────────
   @keyframes floatIn, .hidden utility class                 */

/* ── 13. UNLOCK ENGINE ───────────────────────────────
   Continue button locked/unlocked states (shared by
   Accordion, HotspotReveal, FlipCards)                      */

/* ── 14. SCREEN-SPECIFIC ─────────────────────────────
   Per-screen classes ordered by screen index.
   Only classes that don't belong to any engine above.       */
```

---

## js/main.js — ארגון לפי Engines

כל ה-JS בקובץ אחד. אין קבצים נפרדים לכל מסך.

### 1. Navigation Engine
- `scaleApp()` — scale `#app` לפי viewport
- `goTo(n)` — pause all videos + swap `.active` + call `resetScreenState()`
- `resetScreenState()` — dispatcher: `switch(currentScreen)` → קריאה ל-`enter*()` function הרלוונטית
- keyboard nav: `ArrowLeft` = next (RTL), `ArrowRight` = prev

### 2. Screen Registry
```js
const SCREEN_INTRO         = 0;
const SCREEN_HOOK          = 1;
const SCREEN_HOOK_POPUP    = 2;
const SCREEN_METHOD        = 3;
const SCREEN_VIDEO         = 4;
const SCREEN_ACCORDION     = 5;
// ... named constants for every section
```
אין magic numbers ב-`goTo()`. כל קריאה משתמשת ב-constants.

### 3. State Manager
```js
window.lomdaState = {
  acquisitionPath: null,    // 'video' | 'text' — set in TwoOptionSelection
  standardScore:   0,       // נכונות בתרגול סטנדרטי
  standardTotal:   6,       // לחישוב % threshold
  peakSections:    0,       // 0-3 סעיפי שיא שהצליחו
};
// Per-screen done flags:
// let screen<Name>Done = false;
// Set only in disableSubmit(). Read in resetScreenState().
```

Routing functions:
- `routeAfterStandard()` — `standardScore/standardTotal ≥ 0.8` → Standard B, else Basic
- `routeAfterPeak()` — `peakSections === 3` → End Success, else End Fail

### 4. Modal Engine
מנהל את כל modals שחייבים לשבת **מחוץ** לכל `.screen`:
- `openModal(modalId)` / `closeModal(modalId)`
- `openHint(hintText)` / `closeHint()`
- `openPopup(popupId)` / `closePopup(popupId)`
- Help button toggle: class `.is-open` + modal visibility

### 5. Feedback Engine
- `showFeedback(panelId, isCorrect)` — הצג פנל, style
- `hideFeedback(panelId)` — מוסתר ב-`resetScreenState()`
- `disableSubmit(submitBtnId, inputIds, doneFlagRef)` — hide submit + `disabled = true` inputs + set done flag

### 6. Progress Engine
- `setProgress(barId, current, total)` — mark crumb `.active` / `.done`

### 7. Video Engine
- `initVideo(videoId, playBtnId, nextBtnId)` — play overlay, `ended` event → show next, error fallback
- `videoWatched` flag — prevent re-gating on revisit

### 8. SCQ Engine
כל שאלת SingleChoice משתמשת באותם functions עם config object:
```js
// Config per question (defined near screen index):
// const SCQ_N = { correctId: 'b', maxAttempts: 2, screenDoneFlagName: 'scqNDone' };
function scqSelect(optionEl, config) { }   // mark selected, enable submit
function scqCheck(config) { }             // validate, attempt count, feedback
function scqEnter(config) { }             // restore state on revisit
```

### 9. Drag & Drop Engine
```js
// const DDQ_CONFIG = { correctMap: {targetA: 'itemX'}, maxAttempts: 1 };
let ddqPlacement = {};   // { targetId: itemId }
let ddqChecked   = false;
function ddqDragStart(e, itemId) { }
function ddqDragOver(e) { }
function ddqDrop(e, targetId) { }  // evict existing, ghost placeholder
function ddqCheck(config) { }
function ddqEnter() { }            // restore on revisit
```

### 10. Dropdown Engine
```js
function ddropAllFilled(formId) { }           // all <select> chosen → enable submit
function ddropSubmit(formId, correctMap) { }  // validate, feedback, screenDone
```

### 11. Form Engine
```js
function formCheckFilled(formId) { }            // all inputs non-empty → enable submit
function formValidateNumeric(val, expected) { } // normalize + compare (±tolerance)
function formDisableInputs(formId) { }          // disabled + preserve color
```

### 12. Unlock Engine
Generic: `revealed[]` array → כשכולם true → enable Continue.
משמש: Accordion, HotspotReveal, FlipCards.
```js
function unlockCheckAll(revealedArr, continueBtnId) { }
```

FlipCards גם עושה שימוש בפונקציות ייחודיות:
```js
function frcFlip(cardEl, index) { }
function frcEnter() { }
```

### 13. Animation Engine
```js
function animateSequential(screenIndex, elementIds, delays, onDone) { }
// onDone() נקרא אחרי האלמנט האחרון — לדוגמה: show Continue
```

### 14. Screen-Specific Logic
בלוק ייחודי לכל מסך custom:

| מסך | Functions |
|-----|-----------|
| Accordion | `accordionToggle(i)`, `accordionEnter()` |
| HotspotReveal | `hotspotReveal(sceneId, i)`, `hotspotSceneEnter(sceneId)` |
| hookOpenQuestion | `hoqInput(inputEl)`, `hoqSubmit()` |
| Hook Screens | `hookReveal(charId)`, `hookCheckAllRevealed()` |
| ImageHotspotQ | `hotspotQClick(e)`, `hotspotQValidate(config)` |
| StatementAssessment | `saqToggle(itemId, value)`, `saqCheckReady()`, `saqSubmit(config)` |
| Class Task | `classtaskCheck()`, `classtaskSubmit()` |

---

## Asset Naming Conventions

```
assets/img/
  bg-screen-N.png              ← רקע מסך (N = screen index)
  btn-nav.png / btn-nav-hover.png
  btn-continue-normal.png / -hover.png / -disabled.png
  btn-back-normal.png / -hover.png
  btn-submit-normal.png / -hover.png
  btn-hint-normal.png / -hover.png
  btn-help-open-normal.png / -hover.png
  btn-help-close-normal.png / -hover.png
  feedback-correct.png / feedback-incorrect.png
  hotspot-sea.png
  hotspot-moon.png
  flip-front-scales-cup.png
  flip-front-scales-digital.png
  char-hook-N-[name].png
  graph-advanced-q1.png
  graph-advanced-q5.png
  image-products.png

assets/gif/
  char-orange-scales.gif
  char-orange-stretch.gif
  char-orange-popcorn.gif
  char-orange-medal.gif

assets/fonts/
  Assistant-Regular.woff2
  Assistant-SemiBold.woff2
  Assistant-Bold.woff2
  OpenSans-Bold.woff2

assets/video/
  acquisition.mp4
```

---

## QA Plan

בהתאם ל-`figma-lomda-builder/reference/qa-checklist.md`:

1. **Visual fidelity** — כל מסך: `get_design_context` → בדיקת position/size/spacing
2. **Live text** — שום PNG לא מכיל טקסט לומד (פתח כל PNG isolation בדפדפן)
3. **RTL** — nav arrows, flex alignment, text — בדיקה ב-1280px
4. **State resume** — navigate back לשאלה שהושלמה → תוצאה נשמרת, ללא ניסיון חוזר
5. **Video gating** — Continue מוסתר עד `ended` event
6. **Routing** — בדיקת שני מסלולים (video/text), בדיקת <80% standard
7. **Peak routing** — success (3/3 סעיפים) → End Success; fail → End Fail
8. **Dev tool** — `◀▶` ניווט חופשי, `Ctrl+←/→` עובדים
9. **Assets** — ללא 404s, SVG-as-PNG check (`file assets/img/X.png`)
10. **Modals** — כולם מחוץ ל-`.screen`, z-index תקין
11. **Fullscreen** — לא נקרא אוטומטית, רק מ-user gesture
