# Translation Export Report — Target 04, מסה ומשקל (Mass & Weight)

**Module:** yaad4-science-mass-weight-01
**Target/learning-objective:** 04
**Export type:** Fresh export (no prior translation export existed — `translation/` was untracked and absent before this run)
**Date:** 2026-08-31 (refreshed 2026-10-01, see §0)

---

## 0. Refresh — 2026-10-01 (supersedes the totals in §3)

**Why:** the export was made on 2026-08-31 and only two units were touched after that (in `b3b55d1`). Since then the build went through several QA rounds, the 720 platform layer was added, and screens 48/49 were removed. A strict re-check against the current build (HEAD `37c0138`) found the XLIFF out of date.

**How it was checked:** every unit's `<source>` was compared to a whole text segment in its cited file: an element's text, an attribute value, a JS string literal or a `+`-concatenation. Line breaks counted (`<br>` / `\n`); a substring match did not. The checker was calibrated on the 2026-08-31 snapshot first, where it matched 737/744. An independent sweep of every Hebrew fragment in all in-scope files then looked for live text that no unit covered.

### Result

| | Count |
|---|---|
| Units before | 744 |
| Removed (content no longer in the build) | 12 |
| Source text updated to the current build | 33 |
| New units | 152 |
| **Units now** | **884** |
| Exact match to the current build | 878 / 884 |
| Not matched as one literal (same 6 as in the original export: 1 multi-line instruction with inline buttons, 5 Galileo-applet runtime strings with `{placeholder}`s; checked by hand) | 6 |
| `source-location` recomputed | 884 / 884 |
| Translation targets filled | 0 (all `<target>` empty; nothing to carry over) |

Units by part: 00 → 0, 01 → 205, 02 → 237, 03 → 122, 04 → 59, 05 → 161, 06 → 100.

### Removed (12)

- Screens 13 and 14 (part 01): the hint was taken out of both screens (hint text, "אפשר רמז?", "חזרה לשאלה").
- Screens 48 and 49 (part 06): both Peak end screens were removed; `unit-manifest.js` part 06 is now `[44,45,46,47]`. Their manifest rows were removed too.

IDs: `04-01-13-016`, `04-01-13-017`, `04-01-13-020`, `04-01-14-019`, `04-01-14-020`, `04-01-14-023`, `04-06-48-001`, `04-06-48-002`, `04-06-48-003`, `04-06-49-001`, `04-06-49-002`, `04-06-49-003`. Removed IDs are not reused.

### Source updated (33)

Each one carries a `<note from="refresh">`. The changes are wording edits (character names, the screen-12/15/44 copy, "מחשה"→"המחשה", the "שככוח"→"שכוח" typo fix), feedback bodies that were rewritten or re-broken into lines, and screen 47's end button ("המשך"→"סיימתי").

| Unit | Before | Now |
|---|---|---|
| `04-01-01-004` | אלין | מאי |
| `04-01-01-006` | אוריאל | יוסף |
| `04-01-01-010` | אביתר | אביאל |
| `04-01-12-002` | שתי שאלות חימום קלילות לפני שנתקדם | שתי שאלות קלילות לחימום לפני שנתקדם |
| `04-02-15-001` | נעבור לתרגול הראשון ונענה על | סיימנו את שלב הלימוד, נעבור לתרגול הראשון ונענה על |
| `04-02-20-010` | בחרו עבור כל משפט, האם הוא <span class="s20-term-wrap"><button class="… | בחרו עבור כל משפט, האם הוא <span class="s20-term-wrap"><button class="… |
| `04-02-20-025` | <strong>תצפית</strong> היא מה שניתן לראות בפועל, <br>ללא פרשנות או הסב… | <p style="margin:0 0 12px 0;letter-spacing:-0.35px"><strong>תצפית</str… |
| `04-02-20-027` | <strong>תצפית</strong> היא מה שניתן לראות בפועל, <br>ללא פרשנות או הסב… | <p style="margin:0 0 12px 0;letter-spacing:-0.35px"><strong>תצפית</str… |
| `04-05-36-005` | תוצאות זמני הנחיתה הן לצורך מחשה בלבד. | תוצאות זמני הנחיתה הן לצורך המחשה בלבד. |
| `04-06-44-004` | אם לא הצלחת לענות על חלק מהשאלות עד כה, חשוב להבין מה עדיין לא ברור ול… | אם לא הצלחת לענות נכון על חלק מהשאלות, חשוב להבין מה עדיין לא ברור ולפ… |
| `04-06-47-021` | המשך | סיימתי |
| `04-02-16-013` | <strong>המסה</strong> היא כמות החומר שיש בגוף.  ⏎ היא אינה תלויה בכוח … | <strong>המסה</strong> היא כמות החומר שיש בגוף. היא אינה תלויה  ⏎ בכוח … |
| `04-02-16-017` | <strong>המסה</strong> היא כמות החומר שיש בגוף.  ⏎ היא אינה תלויה בכוח … | <strong>המסה</strong> היא כמות החומר שיש בגוף. היא אינה תלויה  ⏎ בכוח … |
| `04-02-23-011` | למרות ההבדל במסה, שני החפצים נחתו על הקרקע באותו זמן.<br><br>לכן מסקנת… | למרות ההבדל במסה, שני החפצים נחתו על הקרקע באותו זמן.<br>לכן מסקנת הני… |
| `04-02-23-015` | למרות ההבדל במסה, שני החפצים נחתו על הקרקע באותו זמן.<br><br>לכן מסקנת… | למרות ההבדל במסה, שני החפצים נחתו על הקרקע באותו זמן.<br>לכן מסקנת הני… |
| `04-03-26-012` | מסה היא כמות החומר שיש בגוף. היא לא תלויה בכוח הכבידה, ולכן נשארת אותו… | מסה היא כמות החומר שיש בגוף. היא לא תלויה בכוח הכבידה, ⏎ ולכן נשארת או… |
| `04-03-26-016` | מסה היא כמות החומר שיש בגוף. היא לא תלויה בכוח הכבידה, ולכן נשארת אותו… | מסה היא כמות החומר שיש בגוף. היא לא תלויה בכוח הכבידה, ⏎ ולכן נשארת או… |
| `04-05-37-013` | למרות שבכל זוג, לשני הגופים הייתה אותה מסה בדיוק, זמני הנפילה היו שוני… | למרות שבכל זוג, לשני הגופים הייתה אותה מסה בדיוק, ⏎ זמני הנפילה היו שו… |
| `04-05-37-017` | למרות שבכל זוג, לשני הגופים הייתה אותה מסה בדיוק, זמני הנפילה היו שוני… | למרות שבכל זוג, לשני הגופים הייתה אותה מסה בדיוק, ⏎ זמני הנפילה היו שו… |
| `04-05-38-013` | בהתנסות שערכנו גילינו שלהתנגדות האויר ⏎ יש השפעה על זמן הנפילה של הגוף… | בהתנסות שערכנו גילינו שלהתנגדות האויר יש השפעה ⏎ על זמן הנפילה של הגוף… |
| `04-05-38-017` | בהתנסות שערכנו גילינו שלהתנגדות האויר ⏎ יש השפעה על זמן הנפילה של הגוף… | בהתנסות שערכנו גילינו שלהתנגדות האויר יש השפעה ⏎ על זמן הנפילה של הגוף… |
| `04-05-41-013` | מסת גרגר אחד היא קטנה מדי ולכן המאזניים לא יראו אותה. ⏎ מה צריך לעשות … | מסת גרגר אחד היא קטנה מדי ולכן המאזניים לא יראו אותה. ⏎ מה צריך לעשות … |
| `04-05-41-015` | מדידת מסתם של מספר גרגרי אורז יחד תציג מסה כוללת בצג המשקל. ⏎ נחלק את … | מדידת מסתם של מספר גרגרי אורז יחד תציג מסה כוללת בצג המשקל. ⏎ נחלק את … |
| `04-05-41-019` | מדידת מסתם של מספר גרגרי אורז יחד תציג מסה כוללת בצג המשקל. ⏎ נחלק את … | מדידת מסתם של מספר גרגרי אורז יחד תציג מסה כוללת בצג המשקל. ⏎ נחלק את … |
| `04-06-45-013` | גרם וק"ג הן יחידות של מסה. לכן, הניסוח המדעי המדויק על כל שלוש התוויות… | גרם וק"ג הן יחידות של מסה.<br>לכן, הניסוח המדעי המדויק על כל שלוש התוו… |
| `04-06-45-017` | גרם וק"ג הן יחידות של מסה. לכן, הניסוח המדעי המדויק על כל שלוש התוויות… | גרם וק"ג הן יחידות של מסה.<br>לכן, הניסוח המדעי המדויק על כל שלוש התוו… |
| `04-06-46-013` | 1. <strong>לא נכון</strong>: מסה היא כמות החומר, ולא תלויה בכבידה. 45 … | 1. <strong>לא נכון</strong>: מסה היא כמות החומר,<br>ולא תלויה בכבידה.<… |
| `04-06-46-015` | 1. <strong>לא נכון</strong>: מסה היא כמות החומר, ולא תלויה בכבידה. 45 … | 1. <strong>לא נכון</strong>: מסה היא כמות החומר,<br>ולא תלויה בכבידה.<… |
| `04-06-46-017` | 1. <strong>לא נכון</strong>: מסה היא כמות החומר, ולא תלויה בכבידה. 45 … | 1. <strong>לא נכון</strong>: מסה היא כמות החומר,<br>ולא תלויה בכבידה.<… |
| `04-06-47-013` | מאזניים דיגיטליים מודדים משקל (כוח) ומכוילים כך שהם מחלקים את הכוח בער… | מאזניים דיגיטליים מודדים משקל (כוח) ⏎ ומכוילים כך שהם מחלקים את הכוח ⏎… |
| `04-06-47-017` | מאזניים דיגיטליים מודדים משקל (כוח) ומכוילים כך שהם מחלקים את הכוח בער… | מאזניים דיגיטליים מודדים משקל (כוח) ⏎ ומכוילים כך שהם מחלקים את הכוח ⏎… |
| `04-02-18-023` | חשבו: על הירח הכבידה חלשה יותר, אבל זה משפיע <strong>באותה מידה</stron… | חשבו: על הירח הכבידה חלשה יותר, אבל זה משפיע <strong>באותה מידה</stron… |
| `04-03-29-015` | מה ההבדל בין דעה לבין השערה מדעית? מה חייב להיות אפשרי כדי שרעיון ייחש… | מה ההבדל בין דעה לבין השערה מדעית?<br>מה חייב להיות אפשרי כדי שרעיון י… |

### New (152)

All carry `<note from="refresh">`:

- **Issue-report dialog** ("מצאתם בעיה?"): 21 strings × 6 parts = 126 units, under each part's `04-0X-99` chrome screen. The three problem-type options are **logic-coupled**: `unit-js/25-report.js` REPORT_TYPE_LABELS holds a copy that is written to the issue-report sheet, and the placeholder "בחרו סוג בעיה" is repeated at 25-report.js:226.
- **View-my-answer toggle**, added after the export. It appears on screens 01-11, 01-13, 02-19, 02-20 and 03-26: the toggle labels "מעבר לתשובה שלי" / "התשובה הנכונה", the title/body "התשובה אינה נכונה." / "אפשר לצפות שוב בפתרון הנכון.", and the runtime suffix "התשובה הנכונה מוצגת." (22 units).
- **Hook screen 01-01:** 4 character-name labels, now shown inside the speech bubbles.
- **Module root `04-00-99`:** the root `index.html` is now a redirect page with a title, fallback text and a link, but per `b809674` (28.09.26) the package ships **no root files**, so learners never see it. It stays out of the XLIFF, with 0 units.

### Still excluded (checked, not translation content)

- Dead copies of the changed strings in other parts' `main.js`, as in §13: DQ20 body, GEN_DATA 26 / 38 bodies.
- Developer console messages in `unit-js/50-loader.js` and `unit-js/25-report.js:157`.
- The xAPI-only answer prefix "מסה: … | משקל: …" (`-01/js/main.js:933-935`). It goes to the LRS and is never shown.
- Asset file names in the Galileo applet.

### Corrections to earlier sections

- §7, first bullet, is **no longer true**: `#report-btn` is now wired in all 6 parts (`unit-js/25-report.js`), and its dialog is now in the XLIFF.
- §4 manual-review notes for `04-06-46-014/015` (unreachable first-attempt feedback) were not re-examined in this refresh.

---

## 1. Scope: actual parts found vs. expected

Expected (per task): parts `01, 02, 03, 04, 05, 06`.
**Actual: exactly parts 01–06, no discrepancy.** All six part folders exist, each with `index.html`, `js/main.js`, `js/feedback-drag.js`, `css/style.css`, `index_dev.html`; only part 01 additionally has `js/layout-config.js`.

`data-screen` coverage, cross-checked against the project's own `unit-manifest.js` (single source of truth for which component owns which global screen):

| Part | data-screen values | Count | Matches manifest? |
|---|---|---|---|
| 01 | 0–14 | 15 | Yes, contiguous |
| 02 | 15–23 | 9 | Yes, contiguous |
| 03 | 24–29 | 6 | Yes, contiguous |
| 04 | 31–34 | 4 | Yes (global screen 30 belongs to no part — confirmed absent, expected) |
| 05 | 35,36,37,38,41,43 | 6 | Yes (36,39,40,42 gaps documented in the project's own manifest as removed/cut screens; only 39/40/42 fall in this part's range and are confirmed absent from the live DOM, present only inside HTML comments marking their removal) |
| 06 | 44–49 | 6 | Yes, contiguous; screen 49 is the module's true final screen |

**Total: 46 real learner-facing screens**, plus 6 per-part "shared chrome" pseudo-screens (`*-99`) and 1 pseudo-part-00 module-root screen = **53 screen-manifest rows**.

### Module root (pseudo-part `00`, screen `99`)

Inspected `index.html`, `unit-shell.js`, `unit-manifest.js` at the repository root. **Discrepancy vs. the export template's default assumption:** the template expects a module root to typically be an LMS-entry redirect page with visible fallback text (e.g. "מעבירים אותך ללומדה…"). This module's root is architecturally different — a production **QA-shell wrapper** that loads component 01 in a chromeless full-viewport iframe and bridges a `DEV_*` postMessage protocol to a QA host. Its `<title>` and the iframe's `title` attribute are both the English internal project id, not Hebrew; there is no fallback text and no visible link. **Zero learner-visible Hebrew strings exist at the module root.** `unit-shell.js`/`unit-manifest.js` are pure orchestration logic (English comments/code only). Root-level `js/main.js` and `js/layout-config.js` are **not loaded** by the live `index.html` (which loads only `unit-manifest.js` + `unit-shell.js`) — they are legacy files referenced only by `index-monolith-backup.html`, itself explicitly labeled in its own header comment as a preserved, unmodified backup of the pre-split monolith, not a live entry point. All confirmed out of scope.

### Embedded applet (part 05 special case)

Part 05 embeds a fully separate, self-contained learner-visible document via `<iframe>`: `methodica-science-mass-weight-01-05/assets/widgets/galileo-applet/index.html` (a free-fall physics simulator). It is loaded identically in three places (`data-screen` 36, 37, 38) plus a shared modal — same content every time, not per-screen variants. **This is a scenario the export template (written for simple part/JS/JSON scoping) does not explicitly cover.** Decision made and flagged here for review: its content is extracted once, under this part's existing shared-chrome pseudo-screen id **`04-05-99`** (reusing the template's own "99 = shared/global chrome" convention rather than inventing a new number), with every unit's `developer-note` stating it comes from the embedded widget and listing its embed points. The outer page's own iframe `title` attributes and the expand-button/modal chrome are recorded as separate, smaller units also under `04-05-99`.

---

## 2. Deliverables

1. **XLIFF 1.2:** [`translation/target-04-mass-weight.xlf`](../translation/target-04-mass-weight.xlf)
2. **Screen manifest:** [`translation/translation-screen-manifest.csv`](../translation/translation-screen-manifest.csv)
3. **This report:** `translation/translation-export-report.md`

⚠️ **The `translation/` directory is currently untracked in git.** Nothing in it (including a translator's returned work) is protected until it is committed — recommend committing it before handing off for translation.

---

## 3. Totals

| Metric | Count |
|---|---|
| Total screens (46 real + 6 chrome + 1 module-root) | 53 |
| **Total translation units** | **744** |
| Excluded items (logged with reason) | 91 |
| Out-of-scope items (logged separately) | 12 |
| Manual-review flags | 12 |
| Logic-coupled flags | 63 |

### Units by part

| Part | Screens | Units |
|---|---|---|
| 01 | 15 + chrome | 179 |
| 02 | 9 + chrome | 206 |
| 03 | 6 + chrome | 96 |
| 04 | 4 + chrome | 38 |
| 05 | 6 + chrome (incl. Galileo applet) | 140 |
| 06 | 6 + chrome | 85 |
| 00 (module root) | 1 (empty) | 0 |
| **Total** | | **744** |

---

## 4. Manual-review items (12) — flagged, not fixed

| Unit | Issue |
|---|---|
| `04-01-08-004` | `<br>` placement differs from the near-identical string on screen 7 (`04-01-07-004`) — one has it before the parenthetical, the other doesn't. |
| `04-02-17-012` | "Wrong answer" title drops the definite article (`תשובה` vs. sibling screens' `התשובה`). |
| `04-02-18-014` | Same definite-article inconsistency, opposite direction (final-attempt title missing `ה-` that the first-attempt title on the same question has). |
| `04-03-25-011` / `04-03-25-013` | Same definite-article inconsistency, this question's first- vs. final-attempt titles disagree with each other. |
| `04-03-29-011` / `04-03-29-013` | Same pattern again, different screen. |
| `04-04-32-009` | Uses a plain hyphen-minus as a parenthetical dash where sibling screens in the same part use an en-dash. |
| `04-05-43-016` | Final-attempt wrong-answer title missing the definite article `ה-` that its sibling screens' equivalent field has. |
| `04-06-46-014`, `04-06-46-015` | Field is unreachable dead code — `saqGenCheck()` always sets `state.done=true` on the first check, so `feedbackIncorrectFirst` never renders (only relevant if the underlying JS logic is later fixed). |
| `04-06-99-001` | The document `<title>` embeds the internal component number ("רכיב 06") — confirm with the content owner whether an internal identifier belongs in learner-facing/translatable text. |

**Cross-part pattern worth flagging as one issue, not six:** the "תשובה לא נכונה" ("wrong answer") feedback title is inconsistent about the Hebrew definite article `ה-` (`התשובה` vs. `תשובה`) in at least 3 different parts (02, 03, 05), each time between a question's first-attempt and final-attempt variant. This reads as a content-authoring inconsistency introduced at script-writing time, not a one-off typo — worth a single consolidated content-team review across the whole module rather than six separate fixes.

---

## 5. Logic-coupled strings (63)

Concentrated in parts 02 (25), 03 (19), 01 (10), 05 (3), 06 (6) — part 04 has none. Two recurring patterns, both noted individually on the relevant `<note from="logic-coupled">` XLIFF entries:

1. **Answer-option text duplicated in a JS comparison structure** (`GEN_DATA[*].options` / `correctAnswer`, `SCQ*.options`, dropdown "correct" keys) that is compared by string equality at runtime — translating the HTML option without updating the JS copy identically breaks answer-checking.
2. **Cross-referenced category labels** — e.g. the drag-and-drop column headers "מסה"/"משקל" (part 03, screen 26) are also matched by strict string equality in three other JS locations.

Translators must be told: units flagged `logic-coupled` need their JS-side twin updated to the **exact same** translated string, or the interaction will silently stop recognizing correct answers.

---

## 6. Excluded (91) and out-of-scope (12) — summary

Full detail with reasons and source locations is in the XLIFF-adjacent extraction data and reflected per-screen in the CSV's `manual_review` column where relevant. Categories:

- Decorative `alt=""` / `aria-hidden="true"` elements, glyph entities (`&#8592;`, `&#10005;`), SVG icon paths — no linguistic content.
- Dev-only nav toolbar text (gated behind `DEV_NAV_ENABLED`, never shown in production).
- Source-code comments, including Hebrew ones (per spec, excluded regardless of language) — includes several dozen stale/mislabeled screen-number comments (see §7).
- Dead/unused JS data duplicates never written to the DOM (e.g. `DDQ12.rows/cols`, `DDROP14.items[].text`, `SCQ15.options` in part 01; similar patterns in parts 02, 03).
- `js/layout-config.js` (part 01 only): pure CSS-position data; its Hebrew content is source comments labeling which element a position belongs to — excluded, no learner-visible strings.
- Bare numeric/asset-path/id data (`mass: 5`, image paths, DOM ids).
- Out-of-scope: `css/*.css` (styling only, all 6 parts), `index_dev.html` (confirmed dev-only visual editor that iframes the real `index.html`, all 6 parts), 2 embedded YouTube videos (part 02) — captions live in YouTube, not these files.

---

## 7. Cross-part systemic findings (surfaced incidentally, not translation issues)

These were independently reported by every part's extraction pass without prompting — a genuine architectural pattern worth the project team's attention, separate from translation:

- **The report-a-problem flag button (`#report-btn`) is present, styled, and has a real label + aria-label in all 6 parts — but has no click handler and no report modal wired up anywhere, in any part.** It appears to be permanently non-functional across the entire module.
- **Three empty global popup containers** (`#hint-modal`, `#help-popup`, `#revelation-popup`) exist in the chrome markup of every part but are never referenced by any part's JS — dead markup.
- **The image-zoom modal's dialog element has no `aria-label`** in every part that has one — only its close button does.
- Internal numbering drift is pervasive: `data-screen` (canonical), legacy DOM-id prefixes (`s14-`, `s30-`, etc.), and internal `GEN_DATA`/`SCQ`/`DDQ` object keys frequently disagree with each other and with stale HTML comment labels (e.g. a comment says "Screen 47" where the closing comment for the same section says "Screen 44"). This did not affect extraction (all units were traced to real, currently-reachable code, not by trusting comment labels) but may be worth a numbering-cleanup pass independent of translation.
- Every part's `js/main.js` is a **separate, only lightly-pruned copy of a shared master script** covering the entire module's original 0–49 screen authoring — each part's copy is a different size (5203–5499 lines) and contains large stretches of dead code for screens outside that part's own range, including content for screens that were **entirely removed from the shipped curriculum** (a runner/kinetic-energy question and a sugar-cube/moon-interpretation question were both confirmed, via direct inspection, to have no corresponding live screen in any part — see §9, Sweep 2).

---

## 8. Verification — Sweep 1 (every unit vs. its cited source)

**Method:** scripted, not manual assertion. For each of the 744 units, the recorded `source-location` file:line was read from the actual repository file and compared (tag/placeholder/bidi-normalized) against the literal text.

- **Exact match on the recorded line: 697 / 744 (93.7%)**
- **Documented normalization exceptions: 47 / 744 (6.3%)** — all individually verified by spot-check across every part, falling into exactly the categories the spec anticipates:
  - Multi-line HTML elements joined onto one recorded line, `<br>` preserved (e.g. `04-02-17-015`, `04-02-18-017`, `04-02-20-010`).
  - JS strings built via `+` concatenation across several source lines, joined into one recorded unit (e.g. `04-02-19-010`).
  - `{placeholder}`-abstracted runtime values, where the recorded text necessarily differs from the literal code around it (the large majority of the 47 — token-overlap ratios of 90–100% confirmed by script, several spot-checked by hand).
  - A JS `\n` that becomes one `<br>` at runtime (6 units in part 06).
- **Unexplained mismatches: 0.**

**One citation error found and corrected during verification:** unit `04-02-19-012` originally cited `main.js:2342`, which is `const DQ19_FB_WRONG_BODY = DQ19_FB_CORRECT_BODY;` — a JS-level alias, not the literal text. Corrected to cite `main.js:2335`, where the literal string is actually defined (identical text to `04-02-19-010`, the correct-feedback counterpart, by original design).

---

## 9. Verification — Sweep 2 (no Hebrew left uncovered)

**Method:** an extraction pass entirely independent of the manual unit-authoring above — a from-scratch script walked every in-scope file character-by-character tracking comment state (`//`, `/* */`, `<!-- -->`, spanning multiple lines correctly), extracted every Hebrew-bearing fragment, and cross-checked each one against the assembled XLIFF and the excluded/out-of-scope logs.

| | Count |
|---|---|
| Total Hebrew fragments examined | 4,335 |
| In comments (excluded by rule) | 615 |
| In `console.*` calls (excluded by rule) | 0 |
| Covered by a translation unit | 3,297 |
| Covered by a logged exclusion | 7 |
| **Uncovered — required classification** | **416 raw / 290 unique** |

**Classification of the 290 uncovered fragments:** all 290, without exception, are located in `js/main.js` — **zero** in any part's `index.html`, zero in `js/feedback-drag.js`, zero in the embedded Galileo applet file, across all 6 parts. That is: every learner-visible-file Hebrew fragment in the entire module is accounted for. The `main.js` fragments break down as:

1. **Dead/orphaned draft content for screens that were cut from the shipped curriculum.** Directly confirmed by inspection: a "runner loses mass → converted to kinetic energy" question and content matching the project's own documented removed screens (39, 40, 42 — see `unit-manifest.js`'s own comments) exist as complete `GEN_DATA`-style JS objects with no corresponding live `data-screen` section in any part. Representative examples: `מסתו של אצן עם הבגדים, לפני יציאתו לריצה, הייתה 76 קילוגרם` (part 01/02/04 copies, main.js ~3277–3306); the moon-interpretation `GEN_DATA[37]` block confirmed to be exactly the removed "Advanced Q4" screen (part 01 copy, main.js ~3460–3490).
2. **JS-constant duplicates of text that is genuinely live and already captured** as a translation unit — sourced from that screen's real HTML, in its correct owning part. Verified example: the "ליאורה in space" answer options are live in part 02's `index.html` (captured as `04-02-16-008` through `011`); an identical, unused `SCQ18` JS object also containing the same four strings sits dead in every part's shared `main.js` copy (including part 01's, at a completely different, unrelated line region).
3. One regex character-class literal, `/[א-ת]/` (Hebrew alphabet range used as a pattern boundary, not content) — appears identically in parts 01 and 06.

**No genuine content miss was found.** This conclusion rests on: (a) 100% clean coverage across every HTML file and the embedded applet — the files that carry essentially all real learner-facing content; (b) a consistent architectural explanation (shared, only-partially-pruned master script per part) independently reported by all six extraction passes without cross-communication; (c) targeted spot-checks across parts 01, 02, 04, and 06 that uniformly confirmed dead/orphaned/duplicate status. The full 290-item list was not exhaustively hand-verified one-by-one beyond this sampling — if the team wants a 100%-manual line-by-line confirmation of every remaining fragment, that can be run as a follow-up pass.

---

## 10. Validation results

- **XML well-formed:** yes (parsed cleanly with `xml.dom.minidom`).
- **`trans-unit` ids unique:** yes, 744/744.
- **Every unit has a `screen-id` note:** yes, by construction.
- **Every screen id referenced by a unit exists in the manifest, and vice versa:** yes (0 orphaned references either direction after adding the 6 chrome pseudo-screen manifest rows, which the extraction passes had cited but not listed as manifest rows).
- **Every `<target>` empty:** yes, 744/744.
- **Every `<source>` non-empty:** yes, 744/744.
- **IDs match the `{target}-{part}-{screen}-{string}` shape:** yes, 0 malformed.
- **`source-location` points at a real file:** yes for all 744 (Sweep 1 above); "in-range line" — 697 exact, 47 near-exact-with-documented-reason, 0 unresolvable.

### Intentional deviations from the template's literal format, noted for the record

- `source-location` uses the actual repository-relative path (`methodica-science-mass-weight-01-01/index.html:39`) rather than the template's shorthand example form (`01-01/index.html:142`) — this project's folder suffix (`-01` through `-06`) is the **part** number, not the **target** number (target is 04 throughout), so the template's shorthand would be actively misleading here. Full paths are unambiguous.
- `target-language` is omitted from the `<file>` element — no destination locale was specified for this export. Add it before handing to a translation vendor.

---

## 11. Refresh workflow

Not applicable — this is a fresh export. `translation/` did not exist in the repository before this run (confirmed via `find` at task start).

---

## 12. Production files — confirmed unmodified

See the final report to the user for the exact `git status` before/after comparison. Summary: identical set of pre-existing modified/untracked production files before and after this task; the only new filesystem change is the new `translation/` directory (untracked — see the warning in §2).

---

## 13. Sweep 2 follow-up — full fragment-level classification (2026-08-31)

**Trigger:** §9 left the 290 uncovered `main.js` fragments classified only by category example and sampling ("no genuine content miss was found... not exhaustively hand-verified one-by-one"). This follow-up performs the 100%-manual line-by-line confirmation §9 flagged as an optional next step, for every unique uncovered fragment, not a sample.

**Note on the starting count:** the original 290/416 figures were never persisted as a raw per-fragment list (only the aggregate counts in §9 survive on disk — no other file in `translation/` or elsewhere in the repo holds the itemized list). This follow-up therefore re-ran the extraction independently from scratch — a from-scratch tokenizer (comment/string/template-aware, matching §9's own method) over all six parts' `js/main.js` — rather than "re-opening" a saved list. It converges on **223 unique Hebrew-bearing string-literal fragments** in `main.js` project-wide (1,974 raw occurrences across the 6 parts), of which **164 are already covered** by an existing XLIFF `<source>` (exact text match after HTML-tag/whitespace/`\n`-vs-`<br>` normalization, or a `{placeholder}`-aware match) and **59 were initially uncovered**. The lower unique-fragment count vs. the original 290 reflects a coarser, more conservative fragment unit (one fragment = one whole JS string/template literal, vs. whatever finer split the original pass used) — not a smaller amount of code inspected; the same ~1,974 raw Hebrew-bearing string occurrences are accounted for either way. Every one of the 59 uncovered fragments below was individually traced to its exact declaring line, its containing JS construct, and — critically — whether that construct is ever actually reached by a live code path, not sampled.

### 13.1 Method

1. **Extraction:** a character-by-character tokenizer (distinguishing `//`, `/* */`, `'...'`, `"..."`, `` `...` `` with proper escape handling) pulled every Hebrew-bearing string/template literal from all 6 parts' `main.js`, excluding comments and `console.*` calls (none found).
2. **Coverage matching:** each unique fragment was normalized (HTML tags → space, JS `\n`/`\t` escapes unescaped to real whitespace, then collapsed) and compared against every XLIFF `<source>` (same normalization, plus a `{placeholder}` → wildcard regex for the 6 placeholder-bearing units). Matches: exact (152), `{placeholder}` (2), and a length-gated (≥15 chars) substring match (10) for strings the live code builds via `+`-concatenation of several literals that XLIFF recorded as one reassembled unit (e.g. the 3 `<li>` bullets of `04-02-19-010`).
3. **Reachability tracing (for the 59 that remained uncovered):** every part's screen-navigation `switch` statement is **not** shared code — each part's copy contains `case` labels only for that part's own live `data-screen` values (verified directly, e.g. part 01 has cases `0`–`14` only, part 06 has cases `44`–`49` only). For every uncovered fragment, its containing declaration (a `const` object, or a numeric key inside the shared `window.GEN_DATA` structure) was traced forward to see whether any of that part's actual `case → enterScreenNN() → …` chains ever reads it, and — for the `window.GEN_DATA`-hosted hint text specifically — whether the DOM element id it would be written into (`cfg.hintTitleId`/`hintBodyId`) actually exists anywhere in that part's `index.html`.

### 13.2 Result: 0 genuine misses, all 59 fully classified

| Category | Unique fragments | Raw occurrences |
|---|---|---|
| 1. Covered elsewhere by an existing XLIFF unit | 4 | 24 |
| 2. Comment | 0 | 0 |
| 3. Developer-only / diagnostic | 1 | 6 |
| 4. Analytics-only, never written to the DOM | 0 | 0 |
| 5. Dead / unreachable code | 54 | 271 |
| 6. Genuine learner-visible miss | **0** | **0** |
| **Total uncovered, now fully classified** | **59** | **301** |

Combined with the 164 already covered pre-existing, **all 223 unique `main.js` fragments are now accounted for with zero remaining unclassified.**

#### Category 1 — Covered elsewhere (4 fragments)

- `"לא תלוי"` / `"כן תלוי"` (part 01 only, `main.js:1045`, `DDQ12.boldPrefix`) — this is the bold lead-in used to build `<strong>לא תלוי</strong>&nbsp;בכוח הכבידה` at render time (`ddq12SetItemContent()`, `main.js:1048-1056`) for the live drag-and-drop table (screen 04-01-11). The **full** sentence is already captured verbatim as `04-01-11-010`/`011` (`"לא תלוי בכוח הכבידה"` / `"כן תלוי בכוח הכבידה"`) — the bare fragment is just the first two words, split out only to control which part is bold. No new unit needed; a translator only needs to know the bold-prefix must remain a literal prefix of the translated sentence (a logic-coupled-style caveat, not a content gap).
- `"יומיומית"` / `"מדעית"` (all 6 parts, `DQ19_ITEMS[].correct`, `main.js` "Screen 19" region) — read only for string-equality answer-checking in `dq19Check()` (`main.js:2456`+), which is wired to real onclick handlers **only in part 02** (`dq19Toggle`/`dq19Pick`/`dq19Check` appear nowhere in parts 01/03/04/05/06's `index.html`). The word itself is already fully captured as part of the live button labels `"שפה יומיומית"` / `"שפה מדעית"` (units `04-02-19-015/016` and siblings) for the same screen. This is the same "logic-coupled" pattern already documented in §5 — translators changing these two words must also update `DQ19_ITEMS[].correct` in part 02's `main.js`, but there is no untranslated content gap. (`.label` on the same array, e.g. `"כבד"`, `"שוקל"` etc., is a *different* property that is never read at all — see §13.2 category 5.)

#### Category 3 — Developer-only / diagnostic (1 fragment)

- `"מסך"` (all 6 parts, `main.js:167`, inside `initDevNavBar()`) — builds the label text (`"מסך " + n`) for the internal QA screen-jump `<select>` dropdown. `initDevNavBar()` only runs when `DEV_NAV_ENABLED` (`= !!document.getElementById('dev-nav-bar')`) is true, i.e. never in the shipped production HTML — same exclusion category the original export already applied to other dev-nav strings (§6).

#### Category 5 — Dead / unreachable code (54 fragments)

All 54 sit inside code that is provably never reached from any of that part's actual screens. Two distinct dead-code shapes account for all of them:

**(a) `window.GEN_DATA` numeric-key entries whose key is outside that part's live screen set (47 fragments).** `window.GEN_DATA` is a single object (identical shape in all 6 copies) keyed by 22 numeric screen ids spanning most of the module's original 0–49 authoring range. Tracing every part's own `case → enterScreenNN()` chain gives the *actual* reachable key set per part — much narrower than "all 22 keys exist in the file":

| Part | `window.GEN_DATA` keys actually reached by a live `case` | 
|---|---|
| 01 | *(none — all 15 of part 01's own screens use dedicated non-`GEN_DATA` code)* |
| 02 | *(none — same)* |
| 03 | 24, 26, 28 |
| 04 | 29, 30, 31, 46 |
| 05 | 32, 33, 36, 38, 50 |
| 06 | 39, 40, 41, 42, 43, 44 |

For every one of the 47 fragments, its key falls outside its part's own row above in **every part where the fragment occurs** — and, tellingly, in each case the *one* part where that key genuinely is live is exactly the part missing from the fragment's occurrence list (its own copy already matches the live HTML and was already counted as covered). Representative keys: **45** (6 fragments — the "runner loses mass while running, converted to kinetic energy" question already identified as cut content in §7/§9, e.g. `"מסתו של אצן עם הבגדים... 76 קילוגרם"`, `main.js` part 01 line 3277), **37** (8 fragments — a dead "which moon fact is an interpretation vs. observation" question, e.g. `"קוטרו של הירח הוא בערך 3,474 קילומטרים"`), **38** (3 fragments — a draft roller-coaster weight-change dialogue, `"יואב — משקל גדל"` / `"נועה — משקל קטן"`, superseded by the live hotspot question at screen 04-05-43), **34** (9 fragments — a draft "sugar cube / rice grain mass calculation" word problem), plus keys 28, 31, 32, 39, 40, 41, 46 (1–2 fragments each).

Within this same structure, `"רמז"` (46 raw occurrences — the generic hint-title value `hint.title` set on every one of the 22 keys) is dead **even in the 6 fragments that sit inside an otherwise-live key** (03/24, 05/36, 05/38, 06/40, 06/41, 06/42): the render code (`if (htEl) htEl.textContent = cfg.hint.title`) is gated on `document.getElementById(cfg.hintTitleId)`, and a direct search confirms **no `id="*-hint-title"` element exists anywhere in any of the 6 parts' `index.html`** — `hintTitleId` either isn't set on the config at all, or is set to an id nothing in the DOM has. (By contrast, `hint.body`'s target ids *do* sometimes exist as empty elements and *are* genuinely rendered live — e.g. `04-05-41-013`, already correctly captured in the existing XLIFF with a `developer-note` pointing at `window.GEN_DATA[36].hint.body` — confirming the original export's methodology already handled this pattern correctly where it mattered.)

**(b) Named `const` objects/arrays whose owning function is never wired to a live `onclick`/`case` in that part (7 fragments).**
- `DDROP14.hint` (`main.js:1298`, all 6 parts) — `DDROP14` itself **is** live in part 01 (screen 04-01-13/14), but the `.hint` property specifically is never read by any function (`ddrop14Hint()` only toggles the overlay's `display`); the hint text actually shown to learners (`04-01-13-016`) is hardcoded directly in HTML with different wording.
- `DQ19_ITEMS[].label` — `"כבד"`, `"שוקל"`, `"קל"`, `"ניוטון"`, `"כוח כבידה"` (5 fragments, all 6 parts) — confirmed via full-file search that `.label` is never referenced anywhere (only `.id` and `.correct` are read by `dq19Check()`); the visible row labels (`"כבד:"` etc., units `04-02-19-014`+) are separate, already-covered HTML text.
- `CAROUSEL_CARDS` (2 fragments, parts 02–06 only — part 01's own copy is live and already covered) — `renderCarousel()`/`enterScreen10()` are wired only in part 01's `index.html`.
- `SCQ15` (1 fragment, parts 02–06 only, part 01 live and already covered) and the `breaks` line-break-variant array in `enterScreen45()` (8 fragments — belongs to the dead screen-45 runner question from (a); `enterScreen45` itself is not a `case` target in any part's switch) — same shape.
- Bare `"כן"`/`"לא"` (`main.js:4793`, `(field.options || ['כן', 'לא'])`, all 6 parts) — the default fallback for a `type: 'yesNo'` class-task reflection-form field. A full-file search confirms **no field config anywhere in any part actually sets `type: 'yesNo'`** (the one live reflection form, screen 04-04-33, uses only `'text'`/`'textarea'` fields) — the branch is defined but never taken.

### 13.3 Non-content code artifacts (not part of the 223 — noted for completeness)

Two Hebrew-*character* occurrences are regex character-class literals, not text content: `/[א-ת]/g` (`hoqIsValid()`, identical in all 6 parts — live input validation for the open-question screen, counts Hebrew letters in the learner's typed answer) and `/^[א-ת]\./` (part 04 only, `main.js:4593` — detects Hebrew-lettered sub-step lines when rendering the class-task instruction list). Both match §9's own item 3 finding; neither is translatable content and neither needs an XLIFF unit.

### 13.4 Action taken

**No genuine learner-visible misses were found — the XLIFF, screen manifest, and all production files are unchanged by this follow-up.** Only this report file was updated, with the classification above added as this new section. No rerun of Sweep 1 or the validation checks in §10 was needed since no units were added.

### 13.5 Final Sweep 2 numbers (superseding §9 for `main.js`)

| | Count |
|---|---|
| Unique Hebrew string-literal fragments independently extracted (`main.js`, 6 parts) | 223 |
| — Covered by an existing XLIFF unit (direct/placeholder/concatenation match) | 164 |
| — Covered elsewhere (logic-coupled / bold-prefix substring, resolved by this follow-up) | 4 |
| — Developer-only / diagnostic | 1 |
| — Comment | 0 |
| — Analytics-only, never written to the DOM | 0 |
| — Dead / unreachable code | 54 |
| — Genuine learner-visible misses added | 0 |
| **Final uncovered count** | **0** |
