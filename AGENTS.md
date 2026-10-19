# Codex WORKFLOW

## Startup Checklist

Before writing code:

Read:

- PROJECT_BRIEF.md
- PROJECT_SOURCES.md
- ARCHITECTURE.md
- SESSION_TASK.md
- WORK_PROGRESS.md

Read the relevant:

- PowerPoint slides
- Unit Figma frames
- Foundation
- Template
- Codex Skills

Only then start coding.

---

## Rules

Never invent layouts.

Never rewrite content.

Never ignore Figma.

Never create a new component if a template already exists.

Always compare against Preview.

Always verify behavior manually.

---

## QA

Every screen must pass:

✓ PPT comparison

✓ Figma comparison

✓ RTL

✓ Responsive

✓ Hover

✓ Selected

✓ Feedback

✓ Popup

✓ Accessibility

✓ Preview

✓ No overflow

---

## Assets

Never delete assets automatically.

Show the full list first.

Wait for approval.

---

## 720 platform layer (reporting · issue report · resume) — since 2026-09-24

Read `ARCHITECTURE.md` → "Current structure" and `docs/REPORT-XAPI.md`, `docs/RESUME.md` before
touching a screen's check, hint, finish or enter code. Non-negotiable:

- Every check that grades an answer calls `xapiAnswered(item, qKey, correct, isLast, answer)`
  (`isLast = correct || attempts >= maxAttempts`) and then `try { flushResumeSave(); } catch (e) {}` —
  also immediately before any later `return`. Two-attempt questions keep their **Retry gate**
  (the same wrong answer cannot be submitted twice).
- Hints report through `xapiRequestedHint` right before the reveal; the open function never toggles.
- A part's last button calls `xapiEndComponent(result, btn)` and stops; hops between parts run only
  under `DEV_NAV`. `XAPI_END_BTN` names that button.
- New state that must survive a reload goes into the part's `capturePartPayload` / `applyResumeVars`.
- Change a shared file or a `main.js` → bump its `?v=` (identically in all six `index.html`).
- Before committing: `NODE_PATH=<jsdom outside OneDrive> node _test/verify-report.js` must be green.
- Local preview: serve the repo root without URL rewriting (e.g. `python -m http.server`) and open
  parts with a trailing slash; the QA shell is `qa-shell.html`.

---

## Git

Before major changes:

git status

After implementation:

git diff

Never reset.

Never push.

Never publish.

---

## Autonomy

Solve independently:

- spacing
- layout
- CSS
- animation timing
- popup positioning
- responsive

Ask only when:

- missing content
- missing asset
- conflicting sources
- destructive operation

---

## Definition of Done

Screen is complete only when:

- Matches PPT
- Matches Figma
- Uses Templates
- Uses Foundation
- Preview verified
- QA complete

# UI Implementation Rules (Mandatory)

## Feedback Panels

כאשר במסך קיים אלמנט ויזואלי ראשי (תמונה / GIF / וידאו / יישומון / Placeholder):

- המשוב מחליף את האלמנט הוויזואלי.
- אין ליצור Popup צף.
- אין להקטין את המשוב.

על המשוב:

- להשתמש בדיוק באותו container של האלמנט המקורי.
- לשמור על אותו רוחב ואותו גובה.
- לשמור על אותו border-radius.
- לשמור על אותו padding.

Layout המשוב:

- אייקון X בפינה השמאלית העליונה.
- הכותרת והטקסט ממורכזים בתוך המשוב (גם אופקית וגם אנכית), אלא אם ה-Unit Figma מגדיר אחרת.
- אין להצמיד את הטקסט לחלק העליון.
- המשוב צריך להרגיש כהחלפה של האלמנט המקורי ולא כ-popup.

---

## Vertical Spacing

בכל מסך יש להקפיד על מרווחים טבעיים.

אין להצמיד:

- כותרת לניווט העליון.
- תוכן לכותרת.
- תמונות לכותרת.

יש להשאיר White Space בהתאם ל-Unit Figma.

כאשר יש ספק —
יש להעדיף מעט יותר רווח מאשר מעט מדי.

---

## Question Layout

יש למקסם את רוחב המסיחים.

כל Answer צריך להיות:

- רחב מעט יותר מהטקסט שבתוכו.
- ללא שטחים מתים גדולים.
- ללא רוחב מוגזם.

המטרה היא שהטקסט כמעט ימלא את רוחב הכפתור תוך שמירה על padding נעים.

---

## Text Wrapping

יש להימנע ככל האפשר משבירות שורה.

לפני שמקטינים Font:

- הגדל את רוחב ה-container.
- נצל שטח פנוי במסך.
- סדר מחדש את ה-layout.

רק אם אין אפשרות אחרת —
אפשר לשבור שורות.

---

## Source of Truth

לעולם אין להמציא Layout.

יש להיצמד לפי סדר עדיפות:

1. Unit Figma
2. 720 Templates
3. Design Guidelines

אם מסך דומה כבר קיים ביחידה —
יש להשתמש בו כתבנית לפני שמייצרים Layout חדש.

---

## Before Finishing Every Screen

יש לבצע בדיקה עצמית:

✓ האם יש מספיק White Space?
✓ האם הכותרת אינה צמודה לניווט?
✓ האם המסיחים ברוחב מתאים?
✓ האם אין שבירות שורה מיותרות?
✓ האם המשוב מחליף את התמונה/היישומון ולא צף מעליו?
✓ האם הכל נראה כמו מסך מאותה יחידה?