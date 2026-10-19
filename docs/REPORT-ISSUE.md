# Issue reporting ("מצאתם בעיה?") — methodica-science-mass-weight-01

Unit-agnostic procedure: `2026/Documentation/reporting-and-resume/ADDING-REPORTING-AND-RESUME.md` §7.
This file records what is specific to this unit (Phase 3, 2026-09-24).

## What is where

| Piece | Location |
|---|---|
| Behaviour | `unit-js/25-report.js` — copied from mass-measure-03, unchanged except a comment |
| Style | `unit-css/25-report.css` — copied unchanged, linked after each part's `css/style.css` |
| Dialogs | the three `report-*-modal` blocks, last children of `#app` in each part's `index.html`, all `hidden` in source |
| Flag button | the existing `.flag-btn#report-btn` (one per part, global, inside `#app`, `z-index: 30`); styled by the part's own CSS, hidden on screen 7 by `#app:has(> [data-screen="7"].active) #report-btn` |
| Wiring | delegation on `document` for `.flag-btn` — no `onclick`, so the inner label and icon also open it |

The dialogs sit at `z-index: 1200`, above every layer in this unit (the highest is 201) except the
legacy dev toolbar, which is not shown in production.

## What a report carries

The shared 720 Google Form (`REPORT_FORM_ACTION`, one form for every 720 unit — never edit
`REPORT_FIELDS`). Per report: date/time, unit slug (`shortId(METADATA.learningUnitId)` =
`methodica-science-mass-weight-01`), component slug, the item on screen and its page (from
`SCREEN_TO_SUBCONTENT[currentScreen]`, so a report points at the same place as the xAPI statements),
problem type label and free text. Sent `no-cors`; the thank-you shows whatever the response.

The sheet holds every 720 unit's reports: filter by the unit-slug column when reading.

## Verified (2026-09-24)

- `_test/verify-report.js` group 2d (the nine markup constraints of guide §7.1, the endpoint shape,
  delegation) and the runtime dialog walk in every part: dialogs start hidden, the flag's inner label
  opens the form, submit stays disabled until type + text, closing with unsent text asks first, a
  rejected POST still shows the thank-you, and the POST names the unit, the part and the on-screen item.
  Eight mutations, each caught.
- Browser, all six parts, with the POST intercepted (nothing reached the shared sheet): the same flow,
  plus Escape closes an empty form, and the dialog renders centred over the canvas in RTL.
- **Not verifiable here:** focus moving into the dialog and back to the flag. The code does it
  (`25-report.js:100`, `:111`), but the automation pane never has document focus. Check by hand.
- **Inherited, copied as-is (guide §7.5):** `.report-field-error` never becomes visible and
  `.report-textarea.has-error` has no rule.
- **Delivery to the sheet — confirmed 2026-09-24.** One QA-marked report sent from the live unit (part 02,
  screen 22) arrived in the shared sheet (`Form_Responses`, row 24/09/2026 11:44:46) with unit, part, item
  `…-01-02-006`, page 2, type and text as sent (`2026/QA/2026-09-24/REPORT.md`).
