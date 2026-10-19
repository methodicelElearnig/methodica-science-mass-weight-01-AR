# CLAUDE WORKFLOW

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
- Claude Skills

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

**מקור אמת יחיד: תבנית ה-Figma.** רכיב ה-"Popup Feedback" ב-720 Templates
Figma (Question Templates, לדוגמה `SingleChoiceQuestion`
`media=image, state=incorrect-attempt-1` node `962:23385`, וכל שאר וריאנטי
ה-media=image/media=video) הוא הרפרנס המחייב לכל מסך עם מדיה — לא הנחה
כללית, לא precedent מסך אחר. אומת בפועל מול ה-Figma (get_design_context +
screenshot, לא רק metadata) ב-2026-09-02. הסעיף הזה מחליף גרסה קודמת שתיארה
התנהגות הפוכה (המשוב "מחליף" את האלמנט הוויזואלי לגמרי) — הגרסה הקודמת
הייתה שגויה ואינה תואמת את ה-Figma בפועל.

**כלל מחייב, לכל מסך חדש/עתידי (כולל יחידות עתידיות) שיש בו אלמנט ויזואלי
ראשי** (תמונה / GIF / וידאו / יישומון / Placeholder):

1. **המדיה נשארת גלויה על המסך.** אסור להסתיר אותה ואסור להחליף אותה
   באלמנט אחר, **אלא אם התבנית הספציפית ב-Figma עבור אותו מסך מראה
   במפורש** התנהגות אחרת (למשל: מצב "הוחלף" מתועד כ-state נפרד בפריים
   של אותו מסך עצמו). אם אין state כזה מתועד — ברירת המחדל היא שהמדיה
   נשארת.
2. המשוב הוא כרטיס (Popup) בגודל קבוע שמונח מעל **החלק התחתון בלבד** של
   אזור המדיה וממשיך מתחתיו — לא נמתח כדי למלא את כל ה-container של
   האלמנט המקורי, ולא ממורכז אנכית בתוכו.
   - מיקום: פינה (בד"כ bottom-left של אזור המדיה).
   - רוחב קבוע (Figma: `426px`), לא תלוי ברוחב/גובה האלמנט המקורי.
   - `border-radius: 12px`, `padding: 24px`, `gap: 24px` בין הכותרת לגוף
     הטקסט.
   - ללא אייקון X / כפתור סגירה ידני (הוסר מהתבנית; ראה `720-templates`
     skill → `_global-components.md` → "No manual close").
3. טקסט (כותרת + גוף) מיושר לימין (RTL רגיל) — **לא ממורכז**, אופקית או
   אנכית — אלא אם ה-Unit Figma של היחידה הספציפית מגדיר אחרת במפורש
   באותו מסך. אין להצמיד את הטקסט לחלק העליון של הכרטיס עצמו — ריווח
   טבעי כמו כל כרטיס טקסט (ראה Vertical Spacing למטה).

**היקף / rollout:** זהו הכלל התקני מהיום והלאה לכל מסך חדש, בפרויקט הזה
וביחידות עתידיות. **אין חובה לתקן רטרואקטיבית** מסכים קיימים שכבר נראים
תקינים/עקביים — לתקן רק כאשר נתקלים בפועל במסך שה-implementation שלו
סותר את התבנית המאומתת (כפי שקרה במסך 20, ראה WORK_PROGRESS.md). מסך 20
כבר תוקן ואין לגעת בו שוב בעקבות הסעיף הזה.

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
✓ האם המשוב הוא כרטיס בגודל קבוע שמכסה רק את חלקו התחתון של אזור המדיה (לא מחליף/מסתיר אותה לגמרי)?
✓ האם הכל נראה כמו מסך מאותה יחידה?