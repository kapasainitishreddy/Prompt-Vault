/* Original motion education specimens. Not imports or copies of upstream packages. */
(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const quiet = () => Boolean(reduced && reduced.matches);
  const setStatus = (id, value) => { const el = byId('status-' + id); if (el) el.textContent = value; };
  const motionObject = byId('motion-object');
  byId('motion-play').addEventListener('click', () => {
    const old = motionObject.getAttribute('data-active') === 'true';
    motionObject.setAttribute('data-active', String(!old));
    if (!quiet() && motionObject.animate) {
      const from = old ? 'translateY(-18px) rotate(3deg) scale(1.04)' : 'rotate(-4deg)';
      const to = old ? 'rotate(-4deg)' : 'translateY(-18px) rotate(3deg) scale(1.04)';
      motionObject.animate([{transform: from},{transform: to}],{duration:410,easing:'cubic-bezier(.2,.8,.2,1)'});
    }
    setStatus('motion', quiet() ? 'Reduced motion: state changed without animation.' : 'Card state changed. Motion can communicate meaningful feedback.');
  });
  let timeline = [];
  byId('gsap-play').addEventListener('click', () => {
    timeline.forEach(animation => { try { animation.cancel(); } catch (_) {} });
    timeline = [];
    const elements = [...document.querySelectorAll('.mt-gsap-item')];
    if (!quiet() && elements.every(element => Boolean(element.animate))) {
      elements.forEach((element, index) => {
        timeline.push(element.animate([
          {opacity:0,transform:'translateY(34px) rotate(-7deg)'},
          {opacity:1,transform:'translateY(0) rotate(0)'}
        ],{duration:540,delay:index*155,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'}));
      });
    }
    setStatus('gsap', quiet() ? 'Reduced motion: the four blocks remain visible.' : 'Four blocks revealed in sequence. This demo uses the browser animation API, not GSAP.');
  });
  const scrollFrame = byId('locomotive-frame');
  let rafId = 0;
  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      const offset = quiet() ? 0 : Math.min(28, scrollFrame.scrollTop * 0.095);
      scrollFrame.style.setProperty('--mt-y', offset.toFixed(1) + 'px');
    });
  };
  scrollFrame.addEventListener('scroll', onScroll, {passive:true});
  if (reduced && reduced.addEventListener) reduced.addEventListener('change', onScroll);
  const bits = [...document.querySelectorAll('#bits-title span')];
  let words = [];
  byId('bits-play').addEventListener('click', () => {
    words.forEach(animation => { try { animation.cancel(); } catch (_) {} });
    words = [];
    if (!quiet()) {
      bits.forEach((el, index) => {
        if (!el.animate) return;
        words.push(el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:520,delay:index*130,easing:'ease-out',fill:'both'}));
      });
    }
    setStatus('bits', quiet() ? 'Reduced motion: text remains visible.' : 'Accessible text reveal played. This is an original example, not a React Bits component.');
  });
  const wrap = byId('three-wrap'), cube = byId('three-cube');
  let rotateX = -20, rotateY = 28, pointer = null;
  const renderCube = () => { cube.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)'; };
  wrap.addEventListener('pointerdown', event => {
    pointer = {id:event.pointerId,x:event.clientX,y:event.clientY};
    if (wrap.setPointerCapture) wrap.setPointerCapture(event.pointerId);
  });
  wrap.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    rotateY += (event.clientX - pointer.x) * .45;
    rotateX -= (event.clientY - pointer.y) * .45;
    pointer.x = event.clientX; pointer.y = event.clientY;
    renderCube();
  });
  const stop = () => { pointer = null; };
  wrap.addEventListener('pointerup', stop);
  wrap.addEventListener('pointercancel', stop);
  wrap.addEventListener('lostpointercapture', stop);
  wrap.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') rotateY -= 12;
    if (event.key === 'ArrowRight') rotateY += 12;
    if (event.key === 'ArrowUp') rotateX -= 12;
    if (event.key === 'ArrowDown') rotateX += 12;
    renderCube();
  });
  byId('three-reset').addEventListener('click', () => {rotateX=-20;rotateY=28;renderCube();wrap.focus();setStatus('three','View reset to the initial angle. This demo uses CSS 3D, not Three.js.');});
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const source = byId(button.getAttribute('data-copy'));
    const statusKey = button.getAttribute('data-copy').replace('prompt-','');
    if (!source) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(source.textContent.trim());
      setStatus(statusKey,'Prompt copied. Paste it into your coding tool or notes.');
    } catch (_) {
      const selection = window.getSelection();
      if (selection) { const range=document.createRange();range.selectNodeContents(source);selection.removeAllRanges();selection.addRange(range); }
      setStatus(statusKey,'Prompt selected. Use Copy on your keyboard or device.');
    }
  }));
})();
