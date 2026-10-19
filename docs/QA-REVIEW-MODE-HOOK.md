# QA-Review-Mode hook (`window.__qaReviewMode`)

> **Audience:** Metodika template authors. Read this if your applet enforces
> teaching-flow validation (auto-reverts to the last-completed screen when
> `show(N)` is called before the student unlocked N).

## Why this exists

The QA tool lets reviewers walk any screen in any order — by clicking a page
in the project tree, using the ← → arrows, picking from the screen dropdown,
or following a comment's deep link. When the reviewer navigates, we call the
applet's own `show()` / `goTo()` / `showScreen()` / `goToScreen()` /
`gotoScreen()` / `navigateTo()` function so the applet's audio, animations,
and progress bar all reset cleanly.

Templates that enforce teaching-flow validation intercept those calls and
snap back to the last "unlocked" screen. From the reviewer's perspective the
tree marker sticks on page 1, arrows stop working, and the applet visually
returns to the intro every time they try to jump ahead. **This makes the
part un-reviewable.**

The QA tool has no way to know, at review time, which screens the reviewer
"should" have unlocked, and forcing the DOM directly (bypassing the
applet's own nav) corrupts audio, quiz state, and animations. So we set a
flag on the iframe's `window` and ask cooperating templates to check it.

## The contract

**QA-tool side (already shipped)**

Every applet iframe loaded inside the QA tool has this set before any
applet script runs:

```js
window.__qaReviewMode = true;
```

**Applet-template side (what you add)**

In your teaching-flow validator — the function that decides "may the
student go to screen N?" — bail out early when the flag is set:

```js
function canAdvanceTo(screenId) {
  if (window.__qaReviewMode) return true;   // reviewers walk freely
  // ... existing "has the student unlocked this screen?" logic ...
}
```

If your template auto-reverts inside the `show()` function itself:

```js
function show(screenId) {
  if (!window.__qaReviewMode && !hasUnlocked(screenId)) {
    screenId = lastUnlockedScreenId();   // teaching-flow revert
  }
  // ... existing render logic ...
}
```

If your template uses a completion gate on button handlers:

```js
document.querySelector('.next-btn').addEventListener('click', () => {
  if (!currentScreenComplete() && !window.__qaReviewMode) return;
  show(nextScreenId());
});
```

The one-line pattern is always: **`if (window.__qaReviewMode) return;`** or
**`|| window.__qaReviewMode`** wherever you'd otherwise block.

## What you don't need to do

- No visual "review mode" indicator — the QA tool already frames the applet
  with its own chrome (tree, comments rail, part selector).
- No changes to audio, animations, or progress state — those all keep
  working normally. Reviewers WANT to see them.
- No changes for single-screen applets or applets that don't enforce
  teaching flow. They already work fine without the hook.

## Verifying the hook works

1. Deploy the template to a QA session and open the review page.
2. Navigate to a "locked" screen via the tree or arrows.
3. In DevTools, on the iframe's console:
   - `window.__qaReviewMode` should be `true`.
   - The applet's validator should return `true` / not intervene.
4. The tree marker should update to the target page, and the arrows should
   move relative to it.

If the tree marker still snaps back after step 2, your validator has more
than one place enforcing the flow — search for `showScreen`, `goTo`,
`nextBtn`, `canAdvance`, `unlocked`, and add the `__qaReviewMode` guard at
each site.

## Related

- QA-tool implementation: [`backend/public/qa-snippet.js`](../backend/public/qa-snippet.js) sets the flag.
- Reviewer nav path in the snippet: `case 'qa:navigateToScreen'` calls the
  applet's own nav function unchanged — no gate, no DOM force. The hook is
  the ONLY way to opt out of teaching-flow enforcement at review time.
- Skill for template authors: `.claude/skills/apply-qa-review-hook/` walks
  you through detecting and patching an applet's validator.
