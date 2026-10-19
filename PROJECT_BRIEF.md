# PROJECT_BRIEF.md — מדעים יעד 4: מסה ומשקל

## Project Goal

Develop an interactive HTML learning unit about Mass and Weight for 7th grade students.

The implementation should faithfully reproduce the instructional experience defined by the pedagogical team, including all interactions, feedback, navigation, scoring and accessibility.

## פרטי פרויקט

| שדה | ערך |
|-----|-----|
| **שם פרויקט** | yaad4-science-mass-weight-01 |
| **נושא** | מסה, משקל וההבדלים ביניהם |
| **קהל יעד** | כיתה ז' |
| **שפה** | עברית (RTL) |
| **Canvas** | 1280 × 710 px (תבנית 720) |
| **תיקיית עבודה** | `/Users/noatenenbaum/Library/CloudStorage/OneDrive-methodic.co.il/FigmaAndClaude/yaad4-science-mass-weight-01` |
| **קובץ תסריט** | `Downloads/מדעים_יעד 4_מסה ומשקל_תסריט לתיקוף_270626.pptx` |
| **Figma יחידה** | — (יסופק לפני פיתוח) |
| **Figma תבניות** | `https://www.figma.com/design/eSbp4bKHgBky0rakDb8l9N/720---UI-Templates` |

## מקורות מידע ותפקידם

| מקור | תפקיד |
|------|--------|
| **Unit Figma** | Source of Truth — layout, מיקום, states, טקסטים, assets, spacing, micro-interactions. **בסתירה — Figma גובר תמיד.** |
| **720 Templates** | Design System בלבד — תבניות מסכים, shared components, UI patterns, CSS conventions, navigation. **אין לקחת ממנו layout יחידה או תוכן.** |
| **מצגת התסריט** | הבנת מבנה לוגי, רצף מסכים, states, מסלולים. **לא מקור אמת לעיצוב.** |

> **figma-lomda-builder** מגדיר: מבנה פרויקט, ארגון קבצים, כללי assets, workflow Figma-to-HTML, ו-QA.
> **720-templates** מגדיר: כיצד לממש כל מסך ורכיב ספציפי.

## מסלולי למידה

```
Intro → Hook → Method Selection
  ├─ Video Path → VideoScreen (שקפים 9-12 = סרטון, לא מסכי לומדה)
  └─ Text Path  → Accordion + Hotspot + Open Q (שקפים 13-21)
       ↓ (שני המסלולים מתכנסים)
Flip Cards → Drag & Drop → חימום (2Q)
→ תרגול סטנדרטי (6Q)
  ├─ ≥80% → סטנדרטי ב' → משימת כיתה → מתקדם (5Q) → שאלת שיא (3 סעיפים) → End
  └─ <80% → בסיסי (3Q) → סטנדרטי ב' → משימת כיתה → מתקדם → שיא → End
```

## Screen/State Policy

**section = מסך ניווט עצמאי** — מסך שאליו ניתן לנווט ישירות (goTo) ושמהווה שלב ייחודי במסע הלמידה.

**state פנימי = אינו section נפרד** — משוב (נכון/שגוי), hint popup, selected option, hover, tooltip, modal, מסכי states של שאלה (ניסיון 1 שגוי → ניסיון 2) — כולם מנוהלים כ-JavaScript states בתוך אותו section.

**חריגים:** אם Figma מייצג state כ-frame ניווטי עצמאי (לדוגמה — מסך הצלחה / כישלון שיא) — הוא יהיה section נפרד.

## סוגי מסכים

| סוג | סיווג | מסלול |
|-----|-------|-------|
| TransitionScreen | MATCH | כל המסלולים |
| TwoOptionSelection | MATCH | כל המסלולים |
| VideoScreen | MATCH | Video Path |
| SingleChoiceQuestion | MATCH | ממסך חימום ואילך |
| FlipCardsReveal | MATCH | שותף לשני המסלולים |
| SingleChoiceQuestionImage | ADAPT (מ-SCQ) | מתקדם + שיא |
| DragAndDropQuestion (table) | ADAPT (מ-DDQ) | שותף לשני המסלולים |
| DropdownQuestion | ADAPT (מ-SCQ) | חימום + סטנדרטי + בסיסי |
| ValueInputQuestion | ADAPT (מ-Answer Entry) | מתקדם |
| StatementAssessmentQuestion | ADAPT (מ-Dropdown) | שיא |
| Accordion | CUSTOM | Text Path |
| HotspotImage (reveal) | CUSTOM | Text Path |
| hookOpenQuestion | CUSTOM | Text Path |
| Knowledge Summary | CUSTOM | שותף |
| ImageHotspotQuestion | CUSTOM | מתקדם |
| Hook Screens | CUSTOM | כל המסלולים |
| Class Task | CUSTOM | כל המסלולים |

## שאלות פתוחות לפני פיתוח

| # | שאלה | חשיבות |
|---|------|--------|
| 1 | שאלה 1 של סטנדרטי ב' — היכן בתסריט? | גבוהה |
| 2 | שקפים 36–40 — חלק מסרגל 6 השאלות? | גבוהה |
| 3 | Threshold: 80% = כמה שאלות נכונות מתוך כמה? | גבוהה |
| 4 | Unit Figma URL | גבוהה |
| 5 | Assets (גיפים, תמונות מ-gen AI) — מתי מוכנים? | בינונית |

## Development Constraints

This project must follow:

- Unit Figma for all visual decisions.
- PowerPoint for all instructional content.
- Foundation for shared visual language.
- 720 Templates for reusable components.
- Claude Skills for implementation workflow.