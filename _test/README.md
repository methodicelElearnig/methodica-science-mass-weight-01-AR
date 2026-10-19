# `_test/` — headless regression oracle

**Never deployed.** Development tool only; the package allowlist excludes this folder.

## Run

jsdom (~26 MB) must live **outside** this OneDrive-synced tree:

```bash
mkdir -p /tmp/lomda-test && cd /tmp/lomda-test && npm install jsdom
NODE_PATH=/tmp/lomda-test/node_modules node _test/verify-report.js
```

On Windows, a POSIX `NODE_PATH` works only because Git Bash translates it; anything else needs a
real path such as `C:/Users/<you>/AppData/Local/Temp/lomda-test/node_modules`.

Point it at a built package instead of the repo with an optional argument:

```bash
NODE_PATH=... node _test/verify-report.js ../../deployments/<date>
```

## What it checks

Every assertion targets a **silent** failure — the lomda keeps working and the data is wrong or
missing. Loud screen behaviour is verified in a browser.

| Group | Checks |
|---|---|
| 0. Ownership | `unit-manifest.js` vs each part: DOM `data-screen` set, one owner per screen, `TOTAL_SCREENS`, initial `currentScreen`, one `resetScreenState` case per own screen |
| 1. Identity | metadata ids: unit = bare slug, component = prefix + slug + `/`, items nested with 3-digit suffix, questions `<item>qN` |
| 2. Wiring | lowercase cross-part paths; `?v=` on every code reference and identical across parts for shared files |
| 2b. Asset contract | every `url()` / `src` / `href` / `'assets/…'` literal in each part's HTML, CSS and JS resolves with **exact case** (`resolveExact`, not `existsSync`, which is case-insensitive on Windows); no local copy of any file in `unit-assets/` and no local `feedback-drag.js` grows back; the sweep must see >150 references (a regex that matches nothing passes everything) |
| 2c. Reporting (Phase 2) | identity in code vs metadata; loader letters inside the `XAPI_USING_G` regex; no name declared in both `main.js` and `unit-js/`; root redirect + `qa-shell.html` with `?dev=1`; tag order and shared `?v=`; per part: config block, map keys === the part's own screens, both-way item coverage (D-2), every literal `xapi*` call and `XAPI_GEN_Q` entry names a catalogue question, every declared question is reported (D-9), `goTo` seams, flush after the answer and before later returns (D-13), exactly one `xapiEndComponent` on a real button, cross-part navigation only under `DEV_NAV`, no D-1 pattern (`widget_referrer`, `YT.Player` with `videoId`/`playerVars`) |
| 2d. Issue report (Phase 3) | the nine markup constraints of guide §7.1 in every part (dialogs `hidden`, the `[hidden]` CSS override, field order, one submit + one cancel, thanks focus target, the three type values, the custom-select structure, the nine ids, report CSS after `style.css`); dialogs inside `#app` after every `.screen`; the shared form endpoint; delegation |
| 2e. Resume (Phase 4) | v5 per-component document; `hints`/`picks` ledgers (D-7); `sendStatementOnce`; per-unit character key (D-6); `RESULT_KEYS`; `restoreEndedButton` after every repaint and after the restore, reading the ledger (D-8); per part: the four hooks, `currentScreen` in the payload, `XAPI_END_BTN` = the button `xapiEndComponent` disables, every Retry-gate variable captured and restored (D-14), the boot cover before `#app` with its inline net, timer-enabled end buttons ask `xapiComponentEnded()`; the two fixed re-entry bugs (part 02 screen 20, part 05 hotspot attempts) |
| 3. Runtime | each part loads its real local scripts in jsdom, walks every own screen with `goTo`, no `console.error`, no uncaught page error, one `.active` screen; every `img`/`video`/`source`/`iframe` URL left in the walked DOM exists; **regression gate** (no library: nothing sent, nothing throws, scoring still records); **statement flow** with an inline recorder — the forward walk opens/closes exactly the mapped items; the last click sends one component `completed` with an explicit `success`, disables its button, and does not navigate; **issue-report walk** with a fetch spy — hidden at start, inner flag label opens, submit gated, close-with-text confirms, rejected POST still thanks, POST names unit / part / item; **resume round trip** — a per-part scenario, capture, restore into a fresh page, capture again: identical payloads, the saved screen, and the committed state on screen (Retry gate, answered view, attempts) |

**One known category is allowed** in 2b: each `main.js` is a copy of the old single-file build and
carries `GEN_DATA` entries for *other* parts' screens (65 references in total). Such a reference may
name a file that **exactly one other part** ships — it is never reached, and the runtime check proves
that everything the walk does reach exists. Anything else unresolved fails.

### Phase gates

`EXPECT` at the top of `verify-report.js` turns each group on when its phase lands (versioning,
reporting, issue report, resume). A group that is not yet expected prints `skipped` rather than
passing vacuously. Flip a flag in the same commit that adds the feature; never flip one back.

### Negative-tested

Every new assertion must fail when the code is broken on purpose (guide §10.4). Restore mutated files
from a **byte backup**, never with `git checkout` (that also discards uncommitted work).

- Ownership: against `99b2bac` (before the part-06 end-screen fix) — exactly the three part-06 mismatches.
- Asset contract (Phase 1), six mutations, each caught by the named check: wrong-case HTML ref
  (static + runtime), re-grown local copy of a hoisted video, `?v=` dropped from `main.js`, a
  `GEN_DATA` path to a file no part ships (static + runtime), `?v=` mismatch on a shared file, a CSS
  `url()` to a missing file.
- Reporting (Phase 2), twelve mutations: a missing map key, a library letter outside the regex, a
  removed flush, a name collision, a hop outside `DEV_NAV`, a wrong item literal, a removed component
  `completed`, a removed `goTo` seam, the unit id replaced by the prefix, a root redirect without the
  query, `YT.Player` given a `videoId` (first version of that check matched nothing — fixed), and a
  flush moved before a later return.
- Issue report (Phase 3), eight mutations: a dialog without `hidden`, the `[hidden]` rule removed,
  wiring by id, a renamed type value, report CSS before `style.css`, the script tag missing, the thank-you
  only on a successful POST, the cancel button removed.
- Resume (Phase 4), ten mutations: a Retry-gate value not captured, the boot cover removed, an end
  button re-enabled by its timer, `restoreEndedButton` dropped from the repaint, hotspot state not
  restored, each fixed re-entry bug reintroduced, the open-question text not put back, the
  checked-not-shown drag table captured as unanswered (first scenario never reached it — added),
  the `hints` ledger missing.

## `basic-stop.js` — part 03, the stop after basic Q3 (2026-10-07)

Screen 24 says «ענו נכון על כל השאלות כדי להתקדם». Real Chrome (puppeteer-core, local server, one
browser context per page), the real option clicks and check buttons: any of Q1–Q3 wrong -> Q3's
"המשך" stays on screen 27, one component `completed` with `success:false`, the button disabled, a
second click or the arrow key changes nothing, and after a restore without a ledger it is still
disabled; answered-not-clicked -> live after a restore, and its click ends the part; all three
right -> screen 28, nothing completed. 29 of its 45 checks fail on the code before the stop.

```bash
NODE_PATH=/tmp/lomda-test/node_modules node _test/basic-stop.js
```
