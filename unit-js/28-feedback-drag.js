'use strict';

/* ══════════════════════════════════════════════════════════════
   Draggable feedback panels — shared across all 6 unit components.

   Marking: any feedback container carries data-fb-draggable in the HTML.
   Behavior: panels render exactly as designed (same container, size,
   position, colors) until a learner actually drags one — only then do we
   lock the panel's current on-screen box and switch it to free positioning
   within its screen's 1280x710 canvas. A plain click/tap is left completely
   untouched (native onclick/dismiss handlers still fire normally), so
   panels like the hotspot "click anywhere to dismiss" feedback keep
   working exactly as before.

   Every panel resets to its designed default position (and original spot
   in the DOM) the moment it goes hidden -> visible again (a new question, a
   retry, a fresh attempt), so a dragged position never carries over into a
   new feedback state.

   Positioning note: a locked panel is reparented to be a direct child of
   its own [data-screen] .screen element and switched to position:absolute
   relative to it. .screen is guaranteed position:absolute/transform:none
   in this project's CSS, so it's a stable, always-correct containing block
   — reparenting there sidesteps entrance-animation wrappers that carry a
   lingering (even identity) transform, which would otherwise silently
   hijack the containing block for position:fixed/absolute and throw the
   drag math off. A comment-node placeholder marks the panel's original
   spot so unlock() can restore it exactly. */
(function () {
  var SELECTOR = '[data-fb-draggable]';
  var DRAG_THRESHOLD = 6; // px of real pointer movement before a press counts as a drag, not a click
  var CANVAS_W = 1280;
  var CANVAS_H = 710;

  var drag = null;
  var lastVisible = new WeakMap();
  var placeholders = new WeakMap();

  function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }

  function isVisible(el) {
    return getComputedStyle(el).display !== 'none';
  }

  function lockToCanvas(panel) {
    var screen = panel.closest('.screen');
    if (!screen || panel.hasAttribute('data-fb-locked')) return;
    var screenRect = screen.getBoundingClientRect();
    var rect = panel.getBoundingClientRect();
    var scale = screenRect.width > 0 ? screenRect.width / CANVAS_W : 1;

    var left = (rect.left - screenRect.left) / scale;
    var top = (rect.top - screenRect.top) / scale;
    var width = rect.width / scale;
    var height = rect.height / scale;

    var placeholder = document.createComment('fb-drag-placeholder');
    panel.parentNode.insertBefore(placeholder, panel);
    placeholders.set(panel, placeholder);
    screen.appendChild(panel);

    panel.style.position = 'absolute';
    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.width = width + 'px';
    panel.style.height = height + 'px';
    panel.style.margin = '0';
    panel.style.zIndex = '999';
    panel.setAttribute('data-fb-locked', 'true');
  }

  function unlock(panel) {
    ['position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'margin', 'z-index']
      .forEach(function (prop) { panel.style.removeProperty(prop); });
    panel.removeAttribute('data-fb-locked');
    panel.classList.remove('is-fb-dragging');

    var placeholder = placeholders.get(panel);
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.insertBefore(panel, placeholder);
      placeholder.remove();
    }
    placeholders.delete(panel);

    if (drag && drag.panel === panel) drag = null;
  }

  function checkVisibility(panel) {
    var visible = isVisible(panel);
    if (visible && !lastVisible.get(panel) && panel.hasAttribute('data-fb-locked')) {
      unlock(panel);
    }
    lastVisible.set(panel, visible);
  }

  function onPointerDown(e) {
    if (drag) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    var panel = e.target.closest(SELECTOR);
    if (!panel) return;
    if (e.target.closest('a, button, input, textarea, select, [contenteditable="true"]')) return;

    var screen = panel.closest('.screen');
    var screenRect = screen ? screen.getBoundingClientRect() : null;

    drag = {
      panel: panel,
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      moved: false,
      scale: screenRect && screenRect.width > 0 ? screenRect.width / CANVAS_W : 1
    };
  }

  function onPointerMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    var dxScreen = e.clientX - drag.startClientX;
    var dyScreen = e.clientY - drag.startClientY;

    if (!drag.moved) {
      if (Math.abs(dxScreen) < DRAG_THRESHOLD && Math.abs(dyScreen) < DRAG_THRESHOLD) return;
      drag.moved = true;
      var panel = drag.panel;
      lockToCanvas(panel);
      drag.baseLeft = parseFloat(panel.style.left) || 0;
      drag.baseTop = parseFloat(panel.style.top) || 0;
      drag.width = parseFloat(panel.style.width) || panel.offsetWidth;
      drag.height = parseFloat(panel.style.height) || panel.offsetHeight;
      panel.classList.add('is-fb-dragging');
      panel.style.cursor = 'grabbing';
      try { panel.setPointerCapture(drag.pointerId); } catch (err) { /* noop */ }
    }

    e.preventDefault();
    var dxCanvas = dxScreen / drag.scale;
    var dyCanvas = dyScreen / drag.scale;
    var newLeft = clamp(drag.baseLeft + dxCanvas, 0, Math.max(0, CANVAS_W - drag.width));
    var newTop = clamp(drag.baseTop + dyCanvas, 0, Math.max(0, CANVAS_H - drag.height));
    drag.panel.style.left = newLeft + 'px';
    drag.panel.style.top = newTop + 'px';
  }

  function onPointerUp(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    var panel = drag.panel;
    if (drag.moved) {
      suppressNextClickOn(panel);
      panel.classList.remove('is-fb-dragging');
      panel.style.cursor = 'grab';
      try { panel.releasePointerCapture(drag.pointerId); } catch (err) { /* noop */ }
    }
    drag = null;
  }

  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('pointermove', onPointerMove, true);
  document.addEventListener('pointerup', onPointerUp, true);
  document.addEventListener('pointercancel', onPointerUp, true);

  /* Swallow the click that follows a real drag (mouseup normally fires a
     click on whatever's under the pointer), so panels with their own
     onclick dismiss handler — e.g. the hotspot feedback's "click anywhere
     to dismiss" — don't get triggered by the drag's release. Scoped to
     this one panel and self-expiring (catches the click if one arrives, or
     unregisters itself shortly after if not) rather than a single global
     "next click" flag — some input paths release a drag via
     pointerup/pointercancel without ever synthesizing a following click
     event at all, and a flag left waiting forever would silently eat
     whatever real, unrelated click happened to come along next. Registered
     on document (an ancestor) with capture:true so it always runs before
     the panel's own inline onclick, regardless of listener registration
     order on the panel itself. */
  function suppressNextClickOn(panel) {
    var active = true;
    function handler(e) {
      if (!active) return;
      if (e.target === panel || panel.contains(e.target)) {
        active = false;
        document.removeEventListener('click', handler, true);
        clearTimeout(timer);
        e.stopPropagation();
        e.preventDefault();
      }
    }
    document.addEventListener('click', handler, true);
    var timer = setTimeout(function () {
      active = false;
      document.removeEventListener('click', handler, true);
    }, 300);
  }

  function init() {
    var panels = document.querySelectorAll(SELECTOR);
    panels.forEach(function (panel) {
      lastVisible.set(panel, isVisible(panel));
      panel.style.cursor = 'grab';
      var mo = new MutationObserver(function () { checkVisibility(panel); });
      mo.observe(panel, { attributes: true, attributeFilter: ['style', 'class'] });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
