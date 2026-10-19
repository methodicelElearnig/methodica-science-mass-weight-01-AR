# LOCAL SETUP

## Project Folder

`/Users/noatenenbaum/Library/CloudStorage/OneDrive-methodic.co.il/FigmaAndClaude/yaad4-science-mass-weight-01`

---

## PowerPoint

`~/Downloads/yaad4-science-mass-weight-01.pptx` — most recently modified of the three script files in Downloads; this is the authoritative one per SESSION_TASK.md/PROJECT_SOURCES.md.

(Also present, older: `מדעים_יעד 4_מסה ומשקל_תסריט להפקה_120726.pptx` and the `(1)` variant — not authoritative, kept only for history.)

---

## Figma

Foundation: https://www.figma.com/design/eSbp4bKHgBky0rakDb8l9N/720---UI-Templates?node-id=618-10116
Templates: https://www.figma.com/design/eSbp4bKHgBky0rakDb8l9N/720---UI-Templates?node-id=196-3196
Unit Figma: not yet provided (open question in PROJECT_BRIEF.md). All layout decisions this session were made from sibling-screen precedent in the existing code, not from a Unit Figma frame.

---

## Claude Skills

Installed:

- figma-lomda-builder
- 720-templates
- 720-design-guidelines
- lomda-qa-publish
- skill-maintainer

Needs Update:

-

---

## Local Assets

Generated locally (used this session, already present):

- assets/gif/scretching.gif — Class Task transition character
- assets/gif/before-ques.gif — Advanced transition character
- assets/gif/char-orange-scales.gif — Class Task reflection form character

Need to generate:

- Image/gif for Standard-B Q2: "אצן רץ עד קו הסיום" (runner reaching the finish line) — screen data-screen=30, `#s46-img`.
- ~~Interactive HTML widget for Advanced Q1 (Galileo free-fall experiment simulator)~~ — RESOLVED: the real widget now exists at `assets/widgets/galileo-applet/` (drag-two-same-mass-objects-into-claws → release → physically-verified fall-time simulation) and is embedded via `<iframe>` in both sections א/ב (data-screen 37/38) and the zoom modal, replacing the old placeholder. Fixed 2026-07-27 (continuation): object images were 404ing due to a relative-path/clean-URL-redirect interaction (see WORK_PROGRESS.md), now root-relative and working; object-card layout also reworked (image-first, bank column narrowed, arena widened).
- assets/gif/char-orange-medal.gif — referenced in code in two places (`GEN_DATA[39].char` for the Peak-question intro, data-screen=44; and `GEN_DATA[44].char` for the End-Success screen, data-screen=49) but the file does not exist in assets/gif/. Currently renders as an empty/broken image in both places (harmless — `alt=""` + `aria-hidden`, so no visible defect, just missing content).
- ~~Placement for `assets/gif/orange-monster-glasses.gif` on the Class Task wrap-up screen~~ — RESOLVED: screen rebuilt on the standard TransitionScreen template (title + speech bubble + character), character now placed via the same `.s12-char-gif` component used on sibling transition screens.

---

## Videos

Pending:

-

---

## Audio

Pending:

-

---

## Manual Steps

Things Claude cannot do — needs a human:

- Source/generate the runner gif and the medal gif listed above.
- ~~Get the Galileo free-fall simulator widget (or its spec) from the producer~~ — RESOLVED, widget now exists and works (see Local Assets above).
- Confirm whether "Knowledge Summary" (required screen type per PROJECT_BRIEF.md, not currently built) is in scope for this unit, and if so provide/point to its source content (script slides 146-156 look like a candidate).
- Provide Unit Figma link so layout choices made from sibling-screen precedent this session (Class Task transition, Advanced transition, End screens — see WORK_PROGRESS.md) can be verified against the real design.

---

## Applet Guide screen (new, session 2026-07-16 continuation 3)

**Screen:** `data-screen="36"`, id `sAdvGuide`, right before Advanced Q1 (script slide 99).

**Real interactive Galileo widget (RESOLVED — placeholder replaced):**

- The `#galileo-applet-container` placeholder `<span>` described below has since been replaced with the real widget, embedded via `<iframe src="assets/widgets/galileo-applet/index.html">` — same container/id, no other markup changes needed, exactly as originally planned.
- Widget source: `assets/widgets/galileo-applet/` (`index.html` + `images/*.png`, 6 objects with physically-verified fall times). Same iframe embed is reused on Advanced Q1 sections א/ב (data-screen 37/38) and the zoom modal.
- 2026-07-27 (continuation): fixed object images 404ing (relative-path/clean-URL-redirect interaction — see WORK_PROGRESS.md) and reworked the "חפצים לבחירה" object-card layout (image-first, larger images, narrower bank column, wider arena). No JS/interaction logic changed.
- Original placeholder notes, kept for history:
  - Element was: `<div id="galileo-applet-container" class="applet-placeholder sadv-img-placeholder">`
  - Location in DOM: inside `.sadv-img-area` (the left column of the screen's `.sadv-layout` two-column grid).
  - Size/position: inherits `.sadv-img-area` (360px wide) and `.sadv-img-placeholder` (height stretched to 100% of a 420px-tall area via the screen-scoped `[data-screen="36"] .sadv-img-area { height: 420px }` rule in css/style.css).

## CSS/content fixes this session (for context if similar drift bugs resurface)

- Several Advanced-practice screens (Q1a/Q1b/Q2-VIQ/Q3/Q4/Q5) had CSS scoped to stale/wrong `data-screen` numbers from earlier renumbering rounds — same bug class flagged in the previous session's Known Issues as "may recur." All six screens now have working `.s15-progress`, `.sadv-layout`/`.s11-col` (as applicable), `.s11-options`/`.s11-option`/`.s11-radio`, `.s11-feedback`/`.s11-hint-overlay`, and (Q5) `.hsp-*` CSS. See WORK_PROGRESS.md's "Session 2026-07-16 (continuation 3)" entry for the full list.
- **Not fixed, flagged for a future session:** Peak Q1/Q2/Q3 (data-screen 45/46/47, after this session's +1 shift) show signs of the same CSS-scoping drift bug (missing `.sadv-layout`/`.s15-progress`/`.s11-options` at their current numbers) — out of this session's explicit scope (slides 99–122 / the Advanced-practice questions only), not touched, but likely broken/unstyled if visited in Preview. Recommend a dedicated pass before publish.
- Advanced Q5 (hotspot/roller-coaster graph, data-screen 43): still needs its real graph image asset — the click-zone interaction depends on it and couldn't be depth-tested with the current placeholder.

---

## Publish Checklist

Before publish:

[ ] Assets replaced (see "Need to generate" above)

[ ] Videos final

[ ] Audio final

[ ] QA complete (Advanced/Peak full interaction pass still pending — see WORK_PROGRESS.md → QA Remaining)

[ ] SCORM tested

[ ] Final Preview
