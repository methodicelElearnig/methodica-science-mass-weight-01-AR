'use strict';

/* ══════════════════════════════════════════════════════════════
   Pointer drag for drag-and-drop questions — shared across all 6 unit components.

   Replaces native HTML5 drag-and-drop (MOE QA: "בכל שאלות הגרירה ביחידה הגרירה
   הויזואלית לא קורית"). Native DnD shows only the browser's faint snapshot, which
   inside the scaled #app canvas was close to invisible, and it does not run on touch
   tablets. Here a clone of the card follows the pointer (mouse, pen or touch) while
   the original stays dimmed in place; nothing is re-rendered until the drop.

   Usage (from a part's render code):
     PointerDrag.make(cardEl, {
       zoneSelector: '[data-dnd-zone]',   // drop zones (closest match under the pointer)
       overClass:    'drag-over',         // class toggled on the zone under the pointer
       enabled:      () => true,          // checked on every press
       canDrop:      (zoneEl) => true,    // false = no highlight; onDrop still gets the zone
       onStart:      () => {},            // the press became a drag (moved ≥ threshold)
       onDrop:       (zoneEl|null) => {}  // released; null = not over any zone
     });

   A press that never moves past the threshold is a click and is left alone.
   Geometry follows 28-feedback-drag.js: the ghost is a child of the card's own
   .screen (position:absolute, no transform), in 1280×710 canvas units, so the
   canvas scale is divided out of every pointer delta. */
(function () {
  var THRESHOLD = 6; // px of real pointer movement before a press counts as a drag
  var CANVAS_W = 1280;
  var drag = null;

  var css =
    '.pd-draggable{touch-action:none;-webkit-user-select:none;user-select:none;-webkit-user-drag:none;cursor:grab}' +
    '.pd-draggable img{-webkit-user-drag:none;pointer-events:none}' +
    '.pd-origin{opacity:.35}' +
    '.pd-ghost{position:absolute!important;margin:0!important;pointer-events:none!important;z-index:1000!important;' +
      'cursor:grabbing;box-shadow:0 10px 24px rgba(0,0,0,.22)!important;transition:none!important;animation:none!important;opacity:1!important}' +
    '.pd-over{box-shadow:inset 0 0 0 3px rgba(1,157,229,.55);border-radius:8px}' +
    'body.pd-dragging,body.pd-dragging *{cursor:grabbing!important}';

  function injectCss() {
    if (document.getElementById('pd-style')) return;
    var st = document.createElement('style');
    st.id = 'pd-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function scaleOf(screen) {
    var r = screen.getBoundingClientRect();
    return r.width > 0 ? r.width / CANVAS_W : 1;
  }

  function zoneAt(x, y) {
    if (typeof document.elementFromPoint !== 'function') return null;
    var el = document.elementFromPoint(x, y);
    return el ? el.closest(drag.opts.zoneSelector) : null;
  }

  function setZone(zone) {
    var cls = drag.opts.overClass || 'drag-over';
    if (drag.zone === zone) return;
    if (drag.zone) drag.zone.classList.remove(cls);
    drag.zone = zone;
    if (zone && (!drag.opts.canDrop || drag.opts.canDrop(zone))) zone.classList.add(cls);
  }

  function start() {
    var el = drag.el;
    var screen = el.closest('.screen') || document.body;
    var sr = screen.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    var scale = scaleOf(screen);
    var ghost = el.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
    ghost.setAttribute('aria-hidden', 'true');
    ghost.classList.remove('pd-draggable', 's10-item-anim', 's26dnd-item-anim');
    ghost.classList.add('pd-ghost');
    ghost.style.left = (r.left - sr.left) / scale + 'px';
    ghost.style.top = (r.top - sr.top) / scale + 'px';
    ghost.style.width = r.width / scale + 'px';
    ghost.style.height = r.height / scale + 'px';
    screen.appendChild(ghost);
    el.classList.add('pd-origin');
    document.body.classList.add('pd-dragging');
    drag.ghost = ghost;
    drag.scale = scale;
    drag.started = true;
    if (drag.opts.onStart) drag.opts.onStart();
  }

  function finish(dropped) {
    var d = drag;
    drag = null;
    if (!d.started) return;
    var zone = dropped ? d.zone : null;
    if (d.zone) d.zone.classList.remove(d.opts.overClass || 'drag-over');
    if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost);
    d.el.classList.remove('pd-origin');
    document.body.classList.remove('pd-dragging');
    d.opts.onDrop(zone);
  }

  function onDown(e) {
    var el = e.currentTarget;
    if (drag) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    var opts = el._pdOpts;
    if (!opts || (opts.enabled && !opts.enabled())) return;
    drag = { el: el, opts: opts, pointerId: e.pointerId, sx: e.clientX, sy: e.clientY, started: false, ghost: null, zone: null, scale: 1 };
    try { el.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault(); // no text selection, no native image drag
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    var dx = e.clientX - drag.sx;
    var dy = e.clientY - drag.sy;
    if (!drag.started) {
      if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) return;
      start();
    }
    drag.ghost.style.transform = 'translate(' + dx / drag.scale + 'px,' + dy / drag.scale + 'px)';
    setZone(zoneAt(e.clientX, e.clientY));
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    if (drag.started) setZone(zoneAt(e.clientX, e.clientY));
    finish(true);
  }

  function onCancel(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    finish(false);
  }

  function make(el, opts) {
    injectCss();
    el._pdOpts = opts;
    if (el._pdBound) return;
    el._pdBound = true;
    el.classList.add('pd-draggable');
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);
    el.addEventListener('lostpointercapture', onCancel);
    el.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  window.PointerDrag = { make: make, isDragging: function () { return !!(drag && drag.started); } };
})();
