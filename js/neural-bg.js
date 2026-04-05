/**
 * NPMC — Neural Network Background Animation
 * ნეირონები, კავშირები და სიგნალები მოძრაობენ ფონზე
 */
(function () {
  'use strict';

  /* ── canvas setup ── */
  const canvas = document.createElement('canvas');
  canvas.id = 'neural-bg';
  canvas.style.cssText = [
    'position:fixed',
    'inset:0',
    'width:100%',
    'height:100%',
    'pointer-events:none',
    'z-index:0',
    'opacity:1',
  ].join(';');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  /* ── palette ── */
  const GOLD        = { r: 201, g: 169, b: 110 };
  const GOLD_LIGHT  = { r: 226, g: 200, b: 152 };
  const BLUE        = { r: 100, g: 140, b: 220 };

  function rgba(c, a) {
    return `rgba(${c.r},${c.g},${c.b},${a})`;
  }

  /* ── config ── */
  const isMobile = window.innerWidth < 768;

  const CFG = {
    nodeCount:      isMobile ? 25 : 55,
    connectDist:    isMobile ? 120 : 200,
    nodeMinR:       1.5,
    nodeMaxR:       3.5,
    nodePulseSpeed: 0.012,
    driftSpeed:     0.18,
    signalSpeed:    1.4,
    signalRadius:   2.8,
    signalSpawnMs:  isMobile ? 600 : 320,
    maxSignals:     isMobile ? 12 : 38,
    connectionAlpha:0.10,
    nodeAlpha:      0.35,
    signalAlpha:    0.85,
  };

  /* ── resize ── */
  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── nodes ── */
  const nodes = [];
  function createNode() {
    return {
      x:      Math.random() * W,
      y:      Math.random() * H,
      vx:     (Math.random() - 0.5) * CFG.driftSpeed,
      vy:     (Math.random() - 0.5) * CFG.driftSpeed,
      r:      CFG.nodeMinR + Math.random() * (CFG.nodeMaxR - CFG.nodeMinR),
      phase:  Math.random() * Math.PI * 2,
      color:  Math.random() < 0.75 ? GOLD : BLUE,
    };
  }
  for (let i = 0; i < CFG.nodeCount; i++) nodes.push(createNode());

  /* ── signals ── */
  const signals = [];
  let lastSignalTime = 0;

  function spawnSignal(time) {
    if (signals.length >= CFG.maxSignals) return;
    if (time - lastSignalTime < CFG.signalSpawnMs) return;
    lastSignalTime = time;

    /* pick a random edge */
    const a = nodes[Math.floor(Math.random() * nodes.length)];
    const candidates = nodes.filter(n => {
      if (n === a) return false;
      const dx = n.x - a.x, dy = n.y - a.y;
      return Math.sqrt(dx*dx + dy*dy) < CFG.connectDist;
    });
    if (!candidates.length) return;
    const b = candidates[Math.floor(Math.random() * candidates.length)];

    signals.push({
      from: a, to: b,
      t: 0,                          /* 0 → 1 progress */
      color: Math.random() < 0.6 ? GOLD_LIGHT : BLUE,
      speed: CFG.signalSpeed * (0.7 + Math.random() * 0.6),
    });
  }

  /* ── draw helpers ── */
  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > CFG.connectDist) continue;

        const fade = 1 - dist / CFG.connectDist;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        /* slight curve — ნეირონების "ხვეული" */
        const mx = (a.x + b.x) / 2 + (dy * 0.15);
        const my = (a.y + b.y) / 2 - (dx * 0.15);
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.strokeStyle = rgba(GOLD, CFG.connectionAlpha * fade);
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  function drawNodes(time) {
    nodes.forEach(n => {
      const pulse = 0.5 + 0.5 * Math.sin(n.phase + time * CFG.nodePulseSpeed);
      const r = n.r * (0.85 + 0.3 * pulse);
      const alpha = CFG.nodeAlpha * (0.7 + 0.3 * pulse);

      /* glow */
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
      grad.addColorStop(0,   rgba(n.color, alpha * 0.6));
      grad.addColorStop(0.4, rgba(n.color, alpha * 0.2));
      grad.addColorStop(1,   rgba(n.color, 0));
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      /* core */
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(n.color, alpha);
      ctx.fill();
    });
  }

  function drawSignals() {
    signals.forEach(s => {
      const x = s.from.x + (s.to.x - s.from.x) * s.t;
      const y = s.from.y + (s.to.y - s.from.y) * s.t;

      /* trail */
      const trail = 0.12;
      const tx = s.from.x + (s.to.x - s.from.x) * Math.max(0, s.t - trail);
      const ty = s.from.y + (s.to.y - s.from.y) * Math.max(0, s.t - trail);
      const grad = ctx.createLinearGradient(tx, ty, x, y);
      grad.addColorStop(0, rgba(s.color, 0));
      grad.addColorStop(1, rgba(s.color, CFG.signalAlpha * 0.5));
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(x, y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      /* head glow */
      const hGrad = ctx.createRadialGradient(x, y, 0, x, y, CFG.signalRadius * 3);
      hGrad.addColorStop(0,   rgba(s.color, CFG.signalAlpha));
      hGrad.addColorStop(0.4, rgba(s.color, CFG.signalAlpha * 0.4));
      hGrad.addColorStop(1,   rgba(s.color, 0));
      ctx.beginPath();
      ctx.arc(x, y, CFG.signalRadius * 3, 0, Math.PI * 2);
      ctx.fillStyle = hGrad;
      ctx.fill();
    });
  }

  /* ── update ── */
  function updateNodes() {
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20)  { n.x = W + 20; }
      if (n.x > W+20) { n.x = -20; }
      if (n.y < -20)  { n.y = H + 20; }
      if (n.y > H+20) { n.y = -20; }
    });
  }

  function updateSignals() {
    for (let i = signals.length - 1; i >= 0; i--) {
      const s = signals[i];
      const dx = s.to.x - s.from.x, dy = s.to.y - s.from.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      s.t += s.speed / dist;
      if (s.t >= 1) signals.splice(i, 1);
    }
  }

  /* ── main loop ── */
  function loop(time) {
    ctx.clearRect(0, 0, W, H);
    spawnSignal(time);
    updateNodes();
    updateSignals();
    drawConnections();
    drawSignals();
    drawNodes(time);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  /* ── make sure content stays above canvas ── */
  const style = document.createElement('style');
  style.textContent = `
    body > *:not(#neural-bg) { position: relative; z-index: 1; }
    #neural-bg { opacity: 0; animation: neuralFadeIn 2s ease forwards; }
    @keyframes neuralFadeIn { to { opacity: 1; } }
  `;
  document.head.appendChild(style);
})();
