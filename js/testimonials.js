(function () {
  'use strict';

  const track   = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (!track) return;

  const cards      = Array.from(track.children);
  const CARD_W     = 360 + 20; // width + gap
  const VISIBLE    = Math.floor(window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1);
  const MAX_IDX    = cards.length - VISIBLE;
  let   current    = 0;
  let   autoTimer  = null;

  /* dots */
  const dots = cards.map((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.className = 'testi-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `გადადი ${i + 1}-ზე`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    return d;
  });

  const prevBtn = document.querySelector('.testi-arrow--prev');
  const nextBtn = document.querySelector('.testi-arrow--next');

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, MAX_IDX));
    track.style.transform = `translateX(-${current * CARD_W}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= MAX_IDX;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  /* drag / swipe */
  let startX = 0, dragging = false;
  track.addEventListener('mousedown', e => { startX = e.clientX; dragging = true; });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      goTo(current + (diff > 0 ? 1 : -1));
      dragging = false;
      resetAuto();
    }
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(current + (diff > 0 ? 1 : -1)); resetAuto(); }
  }, { passive: true });

  /* auto-play */
  function startAuto() {
    autoTimer = setInterval(() => goTo(current >= MAX_IDX ? 0 : current + 1), 4500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  goTo(0);
  startAuto();
})();
