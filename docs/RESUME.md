# Resume — methodica-science-mass-weight-01

Unit-agnostic procedure: `2026/Documentation/reporting-and-resume/ADDING-REPORTING-AND-RESUME.md` §8.
This file records what is specific to this unit (Phase 4, 2026-09-24).

## Model

- One Kata State document **per component** (v5), addressed by the launch's `?registration`;
  `RESUME_STATE_ID = 'execution-state::<part slug>'`. Shared engine: `unit-js/40-resume.js`
  (mass-measure-03's, plus the `hints`/`picks` ledgers and `sendStatementOnce` — QA D-7).
- `RESUME_ENABLED = true` (`unit-js/10-identity.js`) → the loader takes `xapi-720-k.js`.
- Writes: debounced on every screen change (`goTo` seam), synchronous after every answer and every
  earned gate (`flushResumeSave`), synchronous on every ledger mark. `?resetState` starts clean.

## The design, and why it is small here

This unit's screen **enter functions already repaint an answered screen from its variables** — that is
how going back to a screen within one visit has always worked — and on an unanswered screen they reset
only the *pending* selection. So resume reuses them instead of adding painters:

| Hook (per part, bottom of `js/main.js`) | Does |
|---|---|
| `capturePartPayload()` | the **committed** state only: done / correct / attempts, the Retry gate's last wrong answer (`lw`, QA D-14), the "View My Answer" snapshot, gates (video watched, hotspots revealed, open question submitted), scores (`standardScore`, `peakSections`), progress dots, `XAPI_Q_RESULTS`. A pending pick on an unanswered question is normalised away — the restore would drop it anyway. |
| `applyResumeVars(st)` | puts those variables back (engines: state objects restored in place). Runs before and after `goTo`, idempotent. |
| `applyResumeDom(st)` | part 01 only: the two free-text answers of screen 8 (they live in the inputs). |
| `restoreScreenUI(n)` | during a restore only, re-runs the landing screen's enter after the DOM values are back; on ordinary navigation `goTo` has already painted. |

A resumed screen therefore looks exactly like returning to it within the same visit: answered screens in
their final (solution-first) view, unanswered screens clean with the attempt count, the hint state and
the Retry gate intact.

### Per part

| Part | Captured |
|---|---|
| 01 | hook, learning path, video / Earth / Moon gates, open question (flag + text), drag table (`ddq12`), dropdowns (`ddrop14`), warm-up single choice (`scq15` + `lw`) |
| 02 | `scq17`–`scq19`, `scq23` (+ `lw`), `dq19` (+ snapshot, `lw`), `dq20` (+ snapshot), screen-22 watch gate, `standardScore` |
| 03 | `genScqState` 24/26/28, `genDdqState` 25, drag snapshot + `lw` |
| 04 | the screen only — the reflection form is ungraded and clears itself on every entry by design |
| 05 | `genScqState` 33/50/36, `hspState` 38 |
| 06 | `genScqState` 40/42, `saqState` 41, `peakSections` |

## Decisions and fixes

- **Drag table, part 01 screen 11.** The answer is committed (and reported) at "צדקתי?", but the screen is
  marked done only at "הצג פתרון". The payload records the committed form — done plus the snapshot
  `ddq12ShowSolution` would take — so a reload between the two clicks cannot reopen the question and send
  a second `answered`.
- **Finished component's button (QA D-8, port 3).** `restoreEndedButton()` (`20-xapi.js`) re-disables
  `XAPI_END_BTN` whenever the **ledger** says the component was completed — after every repaint and after
  the restore. Part 04 re-enables its end button from the entrance timer; that site now asks
  `xapiComponentEnded()`. Part 06's end button is Peak Q3's "סיימתי" since the merge of Noa's `b3b55d1`
  (end screens removed); `enterScreen41()` keeps it disabled once the component is reported.
- **Two pre-existing re-entry bugs, fixed because resume would inherit them:**
  - part 02 `enterScreen20` reset `dq20Done` on **every** entry — returning to an answered screen 20 let
    the learner answer again (a second `answered.last` and a second `standardScore++`, which can tip the
    4-of-6 gate). It now repaints the answered state (`dq20PaintDone`).
  - part 05 `hspGenEnter` reset the attempt count on re-entry — leaving and returning after a wrong answer
    granted fresh attempts. It now keeps it.
- **Boot cover** in every part (sibling before `#app`, inline 800 ms / 6 s net).

## Verified (2026-09-24)

- `_test/verify-report.js` group 2e + a per-part runtime round trip (answer → capture → restore into a
  **fresh** page → capture: identical payloads, lands on the saved screen, the restored screens show the
  committed state). 1048 checks; ten Phase-4 mutations each caught (and the Phase 2/3 sets re-run clean).
- Browser, with the local stub, reload by reload: every part lands on its saved screen; attempts, hints and
  Retry gates survive; answered screens repaint; a finished part's button stays disabled after a reload and
  after back-and-forward, and a second click sends nothing (one component `completed`).
- **Not yet:** a live Kata run (Phase 5) — the State API round trip against the real platform.
