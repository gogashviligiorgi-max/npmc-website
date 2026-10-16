/* NPMC — "How TMS works" animation in the TMS tab (index.html #tms-how).
   Brain image: images/brain-lateral.webp, rendered from the fsaverage pial surface (NeuroMap3D). */
(() => {
  const W = 600, H = 520, T = 9;
  const P = [0, 1.3, 3.1, 5.0, T];          // phase starts: coil, field, current, neurons
  const root = document.getElementById('tms-how');
  if (!root) return;
  const css = getComputedStyle(root);
  const C = {};
  ['bg','panel','edge','ink','muted','field','current','spike','tissue','bone','skin']
    .forEach(k => C[k] = css.getPropertyValue('--' + k).trim());
  const FONT = "'Inter', 'Noto Sans Georgian', system-ui, sans-serif";
  const MONO = FONT;

  /* ---------- language (follows <html lang>, which js/i18n.js sets) ---------- */
  const TEXT = {
    ka: { coil: 'TMS კოჭი', field: 'მაგნიტური ველი', current: 'ინდუცირებული დენი', network: 'აქტივაცია ქსელში',
          skull: 'თავის ქალა', surface: 'ქერქის ზედაპირი', deeper: 'ღრმა ქსელებისკენ →',
          trace: 'მემბრანის პოტენციალი (mV) · ნეირონი A', threshold: 'ზღურბლი', pause: 'პაუზა', play: 'ჩართვა' },
    en: { coil: 'TMS coil', field: 'Magnetic field', current: 'Induced current', network: 'Network activation',
          skull: 'Skull', surface: 'Cortical surface', deeper: 'to deeper networks →',
          trace: 'Membrane potential (mV) · neuron A', threshold: 'threshold', pause: 'Pause', play: 'Play' },
    ru: { coil: 'Катушка TMS', field: 'Магнитное поле', current: 'Индуцированный ток', network: 'Активация сети',
          skull: 'Череп', surface: 'Поверхность коры', deeper: 'к глубоким сетям →',
          trace: 'Мембранный потенциал (мВ) · нейрон A', threshold: 'порог', pause: 'Пауза', play: 'Старт' },
  };
  const langOf = () => {
    const l = (document.documentElement.lang || 'ka').slice(0, 2);
    return TEXT[l] ? l : 'ka';
  };
  let L = TEXT[langOf()];

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const prog = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const ease = u => u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
  const bell = u => Math.sin(Math.PI * clamp(u, 0, 1));
  function rng(s) {
    return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }

  /* ---------- canvas: one 600×430 stage; each 600×520 scene is drawn offscreen, then composited ---------- */
  const CH = 430;
  const stage = document.getElementById('tms-how-canvas');
  const sctx = stage.getContext('2d');
  const off = document.createElement('canvas');
  const view = { ctx: off.getContext('2d'), s: 1 };
  const MAC = { s: .84, x: 82, y: -22 };     // head scene fitted into the stage
  const MIC = { s: .835, x: 50, y: 0 };      // neuron scene fitted into the stage
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = stage.clientWidth || W;
    stage.width = off.width = Math.round(w * dpr);
    stage.height = off.height = Math.round(w * CH / W * dpr);
    view.s = stage.width / W;
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
  window.addEventListener('resize', resize);
  resize();

  /* ---------- macro geometry ---------- */
  /* head in side profile, facing right; proportions follow a real head: cranium length ≈ 0.85 × vertex-to-chin,
     cerebrum fills the upper half, its temporal lobe ends near eye level */
  const CRANIUM = [[185, 420], [140, 395], [118, 340], [120, 280], [122, 180], [190, 108], [290, 108],
    [390, 108], [448, 170], [452, 250]];                          // nape → occiput → vertex → forehead (cubic runs)
  const headPath = new Path2D();
  headPath.moveTo(205, H);
  headPath.bezierCurveTo(205, 470, 200, 440, 185, 420);           // back of neck
  for (let i = 1; i < CRANIUM.length; i += 3) headPath.bezierCurveTo(...CRANIUM[i], ...CRANIUM[i + 1], ...CRANIUM[i + 2]);
  [[454, 272, 452, 286, 458, 298],                                // brow ridge
   [462, 306, 458, 314, 453, 318],                                // nasion
   [462, 338, 476, 360, 485, 377],                                // nasal bridge → tip
   [489, 385, 482, 392, 471, 392],                                // underside of nose
   [467, 399, 470, 404, 474, 408],                                // philtrum
   [479, 414, 476, 420, 468, 422],                                // upper lip
   [474, 428, 473, 434, 466, 438],                                // lower lip
   [459, 442, 457, 447, 461, 455],                                // chin crease
   [468, 470, 462, 490, 442, 496],                                // chin
   [412, 500, 386, 492, 368, 480],                                // under the jaw
   [360, 492, 352, 508, 350, H]                                   // throat
  ].forEach(c => headPath.bezierCurveTo(...c));
  headPath.closePath();
  const skullPath = new Path2D();                                 // calvarium, ~13 px inside the scalp
  skullPath.moveTo(190, 400);
  skullPath.bezierCurveTo(152, 378, 133, 336, 134, 280);
  skullPath.bezierCurveTo(136, 192, 198, 122, 290, 122);
  skullPath.bezierCurveTo(382, 122, 435, 178, 439, 250);
  skullPath.bezierCurveTo(441, 272, 440, 286, 446, 300);
  skullPath.moveTo(446, 300); skullPath.bezierCurveTo(430, 304, 410, 300, 396, 300);   // orbital roof / skull base
  skullPath.bezierCurveTo(330, 312, 280, 330, 250, 360);

  /* brain: rendered from NeuroMap3D's fsaverage model (anatomy/fsaverage/surf/rh.pial), front = right */
  const brainImg = new Image();
  brainImg.src = 'images/brain-lateral.webp';
  const BI = { x: 142, y: 137, w: 274, h: 274 * 601 / 820 };
  const CB = { c: [BI.x + 58, BI.y + BI.h - 6], rx: 42, ry: 24 };   // cerebellum, tucked under the occipital lobe

  // coil sits tangent to the scalp over the upper-front (DLPFC) region
  const cub = (p0, p1, p2, p3, u) => [0, 1].map(k => (1 - u) ** 3 * p0[k] + 3 * (1 - u) ** 2 * u * p1[k] + 3 * (1 - u) * u * u * p2[k] + u ** 3 * p3[k]);
  const sp = cub(...CRANIUM.slice(6, 10), .45), sp2 = cub(...CRANIUM.slice(6, 10), .46);
  const tl = Math.hypot(sp2[0] - sp[0], sp2[1] - sp[1]);
  const nx = (sp2[1] - sp[1]) / tl, ny = -(sp2[0] - sp[0]) / tl;   // outward normal
  const CO = { x: sp[0] + nx * 8, y: sp[1] + ny * 8 };
  const phi = Math.atan2(nx, -ny);
  const toG = (lx, ly) => ({ x: CO.x + lx * Math.cos(phi) - ly * Math.sin(phi), y: CO.y + lx * Math.sin(phi) + ly * Math.cos(phi) });
  const HOT = { lx: 0, ly: 60 };
  const hotG = toG(HOT.lx, HOT.ly);
  const nodes = [
    { x: 268, y: 214, c: [-30, 30] },   // cingulate / deep midline
    { x: 250, y: 288, c: [10, 50] },    // limbic / temporal
    { x: 196, y: 186, c: [-10, -40] },  // parietal
    { x: 362, y: 262, c: [40, 10] },    // ventral frontal
  ];

  function drawHead(ctx) {
    ctx.fillStyle = C.skin; ctx.fill(headPath);
    ctx.strokeStyle = C.bone; ctx.globalAlpha = .22; ctx.lineWidth = 1.5; ctx.stroke(headPath);
    ctx.globalAlpha = .55; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke(skullPath);
    ctx.globalAlpha = 1;
    drawBrain(ctx);
  }

  function strokePts(ctx, pts, dx = 0, dy = 0) {
    ctx.beginPath();
    pts.forEach((p, i) => i ? ctx.lineTo(p[0] + dx, p[1] + dy) : ctx.moveTo(p[0] + dx, p[1] + dy));
    ctx.stroke();
  }
  function shade(ctx, cx, cy, r0, r1, lightA, darkA) {   // light from above, darker toward the rim
    const g = ctx.createRadialGradient(cx, cy, r0, cx, cy, r1);
    g.addColorStop(0, `rgba(255,240,244,${lightA})`); g.addColorStop(.5, 'rgba(255,240,244,0)');
    g.addColorStop(1, `rgba(8,12,18,${darkA})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  function drawBrain(ctx) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    // brainstem (pons + medulla)
    const bx = BI.x + .39 * BI.w, by = BI.y + .84 * BI.h;
    const stem = new Path2D();
    stem.moveTo(bx - 18, by); stem.bezierCurveTo(bx - 30, by + 40, bx - 14, by + 70, bx - 24, by + 130);
    stem.lineTo(bx + 6, by + 130); stem.bezierCurveTo(bx + 4, by + 80, bx + 26, by + 50, bx + 20, by);
    stem.closePath();
    ctx.fillStyle = C.tissue; ctx.fill(stem);
    ctx.save(); ctx.clip(stem); shade(ctx, bx - 10, by + 20, 4, 70, .1, .6); ctx.restore();
    // cerebellum with fine folia
    const cb = new Path2D(); cb.ellipse(CB.c[0], CB.c[1], CB.rx, CB.ry, -.12, 0, Math.PI * 2);
    ctx.fillStyle = C.tissue; ctx.fill(cb);
    ctx.save(); ctx.clip(cb);
    shade(ctx, CB.c[0] + 4, CB.c[1] - 14, 4, CB.rx * 1.1, .15, .65);
    for (let y = -CB.ry; y <= CB.ry; y += 4.2) {
      const pts = [];
      for (let x = -CB.rx; x <= CB.rx; x += 4) pts.push([CB.c[0] + x, CB.c[1] + y + x * x / CB.rx * .18 - x * .12 + Math.sin(x * .3 + y) * .8]);
      ctx.strokeStyle = 'rgba(55,18,32,.6)'; ctx.lineWidth = 1.2; strokePts(ctx, pts);
      ctx.strokeStyle = 'rgba(255,236,242,.18)'; ctx.lineWidth = .8; strokePts(ctx, pts, 0, 1.4);
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(40,14,26,.7)'; ctx.lineWidth = 1.4; ctx.stroke(cb);
    // cerebrum: NeuroMap3D fsaverage pial surface (right hemisphere, lateral view)
    if (brainImg.complete && brainImg.naturalWidth) {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 5;
      ctx.drawImage(brainImg, BI.x, BI.y, BI.w, BI.h);
      ctx.restore();
    }
  }

  function drawCoil(ctx, t) {
    const charge = prog(t, 0, 1.15);
    const flash = Math.exp(-Math.pow((t - 1.25) / .12, 2));
    ctx.save(); ctx.translate(CO.x, CO.y); ctx.rotate(phi);
    // handle + cable
    ctx.fillStyle = '#2a3947';
    ctx.beginPath(); ctx.roundRect(-9, -92, 18, 80, 6); ctx.fill();
    ctx.strokeStyle = '#2a3947'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(0, -92); ctx.quadraticCurveTo(10, -130, 60, -128); ctx.stroke();
    // housing
    ctx.fillStyle = '#243240';
    ctx.beginPath(); ctx.roundRect(-74, -16, 148, 20, 8); ctx.fill();
    // copper windings, glowing with current
    [-34, 34].forEach(x => {
      for (let r = 0; r < 3; r++) {
        ctx.strokeStyle = '#c98a4e'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(x, -6, 30 - r * 8, 7 - r * 1.8, 0, 0, Math.PI * 2); ctx.stroke();
      }
      const g = .25 * charge + flash;
      if (g > .02) {
        ctx.save(); ctx.globalAlpha = clamp(g, 0, 1);
        ctx.shadowColor = C.spike; ctx.shadowBlur = 18; ctx.strokeStyle = C.spike; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.ellipse(x, -6, 30, 7, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }
    });
    // current direction dots in the windings during charge
    if (t < 1.4) {
      ctx.fillStyle = C.spike;
      for (let k = 0; k < 6; k++) {
        const a = t * 9 + k * Math.PI / 3;
        ctx.globalAlpha = .4 + .6 * charge;
        ctx.beginPath(); ctx.arc(-34 + 30 * Math.cos(a), -6 + 7 * Math.sin(a), 2, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.arc(34 + 30 * Math.cos(-a), -6 + 7 * Math.sin(-a), 2, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  function drawField(ctx, t) {
    const u = prog(t, 1.2, 3.1), fade = t < P[3] ? 1 : 1 - prog(t, P[3], P[3] + 1.2);
    if (u <= 0 || fade <= 0) return;
    const grow = ease(clamp(u * 1.6, 0, 1));
    ctx.save(); ctx.translate(CO.x, CO.y); ctx.rotate(phi);
    // expanding wavefronts
    for (let k = 0; k < 3; k++) {
      const w = (u * 1.4 - k * .22);
      if (w <= 0 || w >= 1) continue;
      ctx.strokeStyle = C.field; ctx.globalAlpha = (1 - w) * .7 * fade; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, 20 + w * 210, Math.PI * .12, Math.PI * .88); ctx.stroke();
    }
    // field lines looping between the two windings
    ctx.setLineDash([8, 9]); ctx.lineDashOffset = -t * 50;
    for (let i = 1; i <= 5; i++) {
      const d = i * 52 * grow;
      ctx.strokeStyle = C.field; ctx.globalAlpha = (.9 - i * .12) * fade; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(-30, -2); ctx.quadraticCurveTo(0, d, 30, -2); ctx.stroke();
      ctx.globalAlpha *= .4;
      ctx.beginPath(); ctx.moveTo(-38, -10); ctx.quadraticCurveTo(-34 - i * 14, -d * .5, -64 - i * 8, -6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(38, -10); ctx.quadraticCurveTo(34 + i * 14, -d * .5, 64 + i * 8, -6); ctx.stroke();
    }
    ctx.setLineDash([]); ctx.restore(); ctx.globalAlpha = 1;
  }

  function drawInduced(ctx, t) {
    const I = t < P[2] ? 0 : (t < P[3] ? ease(prog(t, P[2], P[2] + .6)) : 1 - prog(t, P[3] + .4, P[3] + 2));
    if (I <= 0) return;
    ctx.save(); ctx.translate(CO.x, CO.y); ctx.rotate(phi);
    const g = ctx.createRadialGradient(HOT.lx, HOT.ly, 2, HOT.lx, HOT.ly, 70);
    g.addColorStop(0, C.current); g.addColorStop(1, 'rgba(255,181,71,0)');
    ctx.globalAlpha = .55 * I; ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(HOT.lx, HOT.ly, 70, 36, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = I; ctx.strokeStyle = C.current; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(HOT.lx, HOT.ly, 46, 11, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.spike;
    for (let k = 0; k < 8; k++) {
      const a = -t * 3.2 + k * Math.PI / 4;
      ctx.beginPath(); ctx.arc(HOT.lx + 46 * Math.cos(a), HOT.ly + 11 * Math.sin(a), 2.4, 0, 7); ctx.fill();
    }
    ctx.restore(); ctx.globalAlpha = 1;
  }

  function quad(a, c, b, u) {
    const m = 1 - u;
    return { x: m * m * a.x + 2 * m * u * c.x + u * u * b.x, y: m * m * a.y + 2 * m * u * c.y + u * u * b.y };
  }
  function drawNetwork(ctx, t) {
    const u = prog(t, P[3] + .3, T - .6);
    const out = 1 - prog(t, T - .7, T);
    if (u <= 0) return;
    nodes.forEach((n, i) => {
      const ctl = { x: (hotG.x + n.x) / 2 + n.c[0], y: (hotG.y + n.y) / 2 + n.c[1] };
      const s = clamp(u * 1.5 - i * .14, 0, 1);
      ctx.strokeStyle = C.current; ctx.lineWidth = 2; ctx.globalAlpha = .45 * out;
      ctx.beginPath(); ctx.moveTo(hotG.x, hotG.y);
      for (let k = 1; k <= 20; k++) { const p = quad(hotG, ctl, n, s * k / 20); ctx.lineTo(p.x, p.y); }
      ctx.stroke();
      if (s > 0 && s < 1) {
        const p = quad(hotG, ctl, n, s);
        ctx.globalAlpha = out; ctx.fillStyle = C.spike; ctx.shadowColor = C.current; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      }
      if (s >= 1) {
        const lit = (.6 + .4 * Math.sin(t * 6 + i)) * out;
        const g = ctx.createRadialGradient(n.x, n.y, 1, n.x, n.y, 24);
        g.addColorStop(0, C.spike); g.addColorStop(1, 'rgba(255,181,71,0)');
        ctx.globalAlpha = lit; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, 24, 0, 7); ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
  }

  function label(ctx, txt, x, y, color, alpha = 1, align = 'left') {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.textAlign = align;
    ctx.font = `500 15px ${FONT}`;
    ctx.shadowColor = C.bg; ctx.shadowBlur = 6; ctx.fillText(txt, x, y); ctx.fillText(txt, x, y);
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
  }

  function drawMacro(v, t) {
    const ctx = v.ctx;
    drawHead(ctx);
    drawNetwork(ctx, t);
    drawInduced(ctx, t);
    drawField(ctx, t);
    drawCoil(ctx, t);
    const tip = toG(0, -100);
    label(ctx, L.coil, tip.x + 30, tip.y + 6, C.ink);
    label(ctx, L.field, 24, 92, C.field, bell(prog(t, 1.3, 4.2)));
    label(ctx, L.current, hotG.x - 80, hotG.y + 66, C.current, bell(prog(t, 3.1, 6.2)));
    label(ctx, L.network, 150, 470, C.spike, bell(prog(t, 5.6, T)));
    ctx.font = `400 12px ${FONT}`; ctx.fillStyle = C.muted; ctx.textAlign = 'left';
    ctx.fillText(L.skull, 18, 130);
  }

  /* ---------- micro geometry ---------- */
  const NA = { x: 150, y: 215, top: 62, name: 'A' };
  const NB = { x: 345, y: 300, top: 160, name: 'B' };
  const NC = { x: 505, y: 225, top: 62, name: 'C' };
  const axA = [[150, 232], [150, 330], [250, 322], [318, 300]];
  const axB = [[345, 317], [350, 420], [470, 410], [490, 252]];
  const axC = [[505, 242], [505, 320], [545, 360], [566, 405]];
  const bez = (p, u) => {
    const m = 1 - u;
    return [0, 1].map(k => m*m*m*p[0][k] + 3*m*m*u*p[1][k] + 3*m*u*u*p[2][k] + u*u*u*p[3][k]);
  };
  const ghost = []; { const g = rng(5); for (let i = 0; i < 9; i++) ghost.push({ x: 40 + g() * 520, y: 90 + g() * 300, s: .5 + g() * .4 }); }
  const fires = { A: 5.0, B: 6.4, C: 7.65 };

  function Vm(tt) {
    if (tt < P[2]) return -70;
    if (tt < 5.0) return -70 + 15 * ease(prog(tt, P[2], 5.0));
    if (tt < 5.07) return -55 + 85 * prog(tt, 5.0, 5.07);
    if (tt < 5.22) return 30 - 110 * prog(tt, 5.07, 5.22);
    return -70 - 10 * Math.exp(-(tt - 5.22) * 2.5);
  }

  function neuronPath(ctx, n, sc = 1) {
    const { x, y, top } = n;
    ctx.beginPath();
    ctx.moveTo(x, y - 18 * sc); ctx.lineTo(x, top);
    const len = y - top;
    [.35, .62].forEach((f, i) => {
      const yy = y - 18 * sc - (len - 18 * sc) * f, d = i ? -1 : 1;
      ctx.moveTo(x, yy); ctx.quadraticCurveTo(x + 14 * d * sc, yy - 6, x + 30 * d * sc, yy - 22 * sc);
    });
    ctx.moveTo(x, top); ctx.lineTo(x - 18 * sc, top - 16 * sc);
    ctx.moveTo(x, top); ctx.lineTo(x + 18 * sc, top - 16 * sc);
    ctx.moveTo(x - 12 * sc, y + 10 * sc); ctx.quadraticCurveTo(x - 28 * sc, y + 16 * sc, x - 40 * sc, y + 34 * sc);
    ctx.moveTo(x + 12 * sc, y + 10 * sc); ctx.quadraticCurveTo(x + 26 * sc, y + 14 * sc, x + 38 * sc, y + 30 * sc);
  }
  function soma(ctx, n, sc = 1) {
    ctx.beginPath();
    ctx.moveTo(n.x, n.y - 20 * sc); ctx.lineTo(n.x - 15 * sc, n.y + 12 * sc); ctx.lineTo(n.x + 15 * sc, n.y + 12 * sc); ctx.closePath();
  }
  function drawNeuron(ctx, n, ax, act) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = C.tissue; ctx.lineWidth = 2.2; ctx.globalAlpha = .9;
    neuronPath(ctx, n); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath();
    for (let k = 0; k <= 30; k++) { const p = bez(ax, k / 30); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    ctx.stroke();
    ctx.fillStyle = C.tissue; soma(ctx, n); ctx.fill();
    if (act > .01) {
      ctx.save(); ctx.globalAlpha = act; ctx.shadowColor = C.current; ctx.shadowBlur = 26 * act;
      ctx.fillStyle = C.spike; soma(ctx, n); ctx.fill();
      ctx.strokeStyle = C.spike; ctx.lineWidth = 2.4; neuronPath(ctx, n); ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    ctx.font = `500 13px ${MONO}`; ctx.fillStyle = C.muted; ctx.textAlign = 'left';
    ctx.fillText(n.name, n.x + 20, n.y + 4);
  }
  function drawAP(ctx, ax, u) {
    if (u <= 0 || u >= 1) return;
    const u0 = Math.max(0, u - .2);
    ctx.save(); ctx.strokeStyle = C.spike; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.shadowColor = C.current; ctx.shadowBlur = 16;
    ctx.beginPath();
    for (let k = 0; k <= 12; k++) { const p = bez(ax, u0 + (u - u0) * k / 12); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    ctx.stroke();
    const p = bez(ax, u); ctx.fillStyle = C.spike;
    ctx.beginPath(); ctx.arc(p[0], p[1], 5.5, 0, 7); ctx.fill();
    ctx.restore();
  }
  function drawVesicles(ctx, from, to, u) {
    if (u <= 0 || u >= 1) return;
    ctx.fillStyle = C.current;
    for (let k = 0; k < 6; k++) {
      const w = clamp(u * 1.6 - k * .12, 0, 1);
      if (w <= 0 || w >= 1) continue;
      const jx = Math.sin(k * 2.3) * 5, jy = Math.cos(k * 1.7) * 5;
      ctx.globalAlpha = 1 - w * .5;
      ctx.beginPath(); ctx.arc(from[0] + (to[0] - from[0]) * w + jx, from[1] + (to[1] - from[1]) * w + jy, 2.6, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  const actOf = (t, tf, pre = 0) => t >= tf ? Math.exp(-(t - tf) * 2.2) : pre;

  function drawMicro(v, t) {
    const ctx = v.ctx;
    // cortical layers
    ctx.fillStyle = C.skin; ctx.fillRect(0, 0, W, 38);
    ctx.strokeStyle = C.bone; ctx.globalAlpha = .5; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, 38); ctx.lineTo(W, 38); ctx.stroke(); ctx.globalAlpha = 1;
    ctx.font = `400 12px ${FONT}`; ctx.fillStyle = C.muted; ctx.textAlign = 'right';
    ctx.fillText(L.surface, W - 14, 28);
    ctx.strokeStyle = C.edge; ctx.lineWidth = 1;
    [80, 170, 235, 305, 385].forEach(y => { ctx.beginPath(); ctx.moveTo(34, y); ctx.lineTo(W, y); ctx.stroke(); });
    ctx.font = `500 11px ${MONO}`; ctx.textAlign = 'left'; ctx.fillStyle = C.muted;
    [['I', 62], ['II–III', 128], ['IV', 206], ['V', 274], ['VI', 348]].forEach(([s, y]) => ctx.fillText(s, 8, y));

    // faint background neurons
    ghost.forEach(g => {
      ctx.globalAlpha = .13; ctx.strokeStyle = C.tissue; ctx.fillStyle = C.tissue; ctx.lineWidth = 1.5;
      const n = { x: g.x, y: g.y, top: g.y - 70 * g.s };
      neuronPath(ctx, n, g.s); ctx.stroke(); soma(ctx, n, g.s); ctx.fill();
    });
    ctx.globalAlpha = 1;

    // magnetic field penetrating from above
    const I2 = bell(prog(t, P[1], P[2] + .5));
    if (I2 > 0) {
      ctx.save(); ctx.strokeStyle = C.field; ctx.lineWidth = 1.6; ctx.globalAlpha = .7 * I2;
      ctx.setLineDash([10, 14]); ctx.lineDashOffset = -t * 70;
      for (let x = 60; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 400 * ease(prog(t, P[1], P[2]))); ctx.stroke(); }
      ctx.restore();
    }
    // induced electric field sweeping parallel to the surface
    const I3 = bell(prog(t, P[2], P[3] + .5));
    if (I3 > 0) {
      ctx.save(); ctx.strokeStyle = C.current; ctx.fillStyle = C.current; ctx.lineWidth = 2; ctx.globalAlpha = .85 * I3;
      [100, 150, 200, 260].forEach((y, r) => {
        for (let j = 0; j < 4; j++) {
          const x = ((t * 130 + j * 160 + r * 45) % 680) - 40;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 30, y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x + 36, y); ctx.lineTo(x + 27, y - 5); ctx.lineTo(x + 27, y + 5); ctx.closePath(); ctx.fill();
        }
      });
      ctx.restore();
    }

    const preA = t >= P[2] && t < fires.A ? .35 * prog(t, P[2], fires.A) : 0;
    drawNeuron(ctx, NA, axA, actOf(t, fires.A, preA));
    drawNeuron(ctx, NB, axB, actOf(t, fires.B));
    drawNeuron(ctx, NC, axC, actOf(t, fires.C));
    drawAP(ctx, axA, prog(t, 5.1, 6.0));
    drawVesicles(ctx, axA[3], [NB.x - 14, NB.y - 2], prog(t, 6.0, 6.4));
    drawAP(ctx, axB, prog(t, 6.5, 7.3));
    drawVesicles(ctx, axB[3], [NC.x - 12, NC.y + 6], prog(t, 7.3, 7.65));
    drawAP(ctx, axC, prog(t, 7.75, 8.6));
    if (t > 8.2) {
      ctx.font = `400 12px ${FONT}`; ctx.fillStyle = C.muted; ctx.textAlign = 'right';
      ctx.globalAlpha = prog(t, 8.2, 8.5) * (1 - prog(t, 8.8, T));
      ctx.fillText(L.deeper, 580, 400); ctx.globalAlpha = 1;
    }

    drawTrace(ctx, t);
  }

  function drawTrace(ctx, t) {
    const x0 = 64, x1 = 584, y0 = 424, y1 = 506;
    const my = v => y1 - (v + 90) / 130 * (y1 - y0);
    ctx.fillStyle = C.bg; ctx.globalAlpha = .7; ctx.fillRect(0, 410, W, H - 410); ctx.globalAlpha = 1;
    ctx.font = `400 12px ${FONT}`; ctx.fillStyle = C.muted; ctx.textAlign = 'left';
    ctx.fillText(L.trace, x0, 420);
    ctx.font = `400 11px ${MONO}`; ctx.textAlign = 'right';
    [[30, '+30'], [-55, '−55'], [-70, '−70']].forEach(([v, s]) => ctx.fillText(s, x0 - 8, my(v) + 4));
    ctx.strokeStyle = C.edge; ctx.setLineDash([4, 5]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, my(-55)); ctx.lineTo(x1, my(-55)); ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'right'; ctx.font = `400 11px ${FONT}`; ctx.fillStyle = C.muted;
    ctx.fillText(L.threshold, x1, my(-55) - 5);
    ctx.strokeStyle = C.current; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath();
    const steps = Math.max(2, Math.ceil(t / .01));
    for (let k = 0; k <= steps; k++) {
      const tt = t * k / steps, x = x0 + tt / T * (x1 - x0), y = my(Vm(tt));
      k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    const xe = x0 + t / T * (x1 - x0);
    ctx.fillStyle = C.spike; ctx.beginPath(); ctx.arc(xe, my(Vm(t)), 3.5, 0, 7); ctx.fill();
  }

  /* ---------- story timeline (master clock τ, seconds) ----------
     0–5.2 head: coil → field → current · 5.2–5.9 zoom into the cortex · 5.9–9.0 neurons fire
     9.0–9.6 zoom back out · 9.6–12 activation spreads through the network */
  const TT = 12;
  const SP = [0, 1.3, 3.1, 5.2, TT];          // where each step of the steps card starts
  function scenes(tau) {                       // [scene, scene time, alpha, zoom]
    if (tau < 5.2) return [['mac', tau, 1, 1]];
    if (tau < 5.9) {
      const u = ease(prog(tau, 5.2, 5.9));
      return [['mac', tau, 1 - u, 1 + 3 * u], ['mic', 4.6 + (tau - 5.2), u, .6 + .4 * u]];
    }
    if (tau < 9.0) return [['mic', tau - .6, 1, 1]];
    if (tau < 9.6) {
      const u = ease(prog(tau, 9.0, 9.6));
      return [['mic', tau - .6, 1 - u, 1 + .3 * u], ['mac', 5.3 + (tau - 9.0) * 1.2, u, 2.2 - 1.2 * u]];
    }
    return [['mac', 6.0 + (tau - 9.6) * (2.6 / 2.4), 1, 1]];
  }
  function compose(tau) {
    const S = view.s, c = view.ctx;
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.globalAlpha = 1;
    sctx.clearRect(0, 0, stage.width, stage.height);
    scenes(tau).forEach(([name, st, alpha, zoom]) => {
      if (alpha <= .01) return;
      const F = name === 'mac' ? MAC : MIC;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalAlpha = 1;
      c.clearRect(0, 0, off.width, off.height);
      c.setTransform(S * F.s, 0, 0, S * F.s, S * F.x, S * F.y);
      (name === 'mac' ? drawMacro : drawMicro)(view, st);
      // zoom about the cortical hotspot (head) or the stage centre (neurons)
      const fx = name === 'mac' ? S * (F.x + F.s * hotG.x) : stage.width / 2;
      const fy = name === 'mac' ? S * (F.y + F.s * hotG.y) : stage.height / 2;
      sctx.setTransform(zoom, 0, 0, zoom, fx - fx * zoom, fy - fy * zoom);
      sctx.globalAlpha = alpha;
      sctx.drawImage(off, 0, 0);
    });
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.globalAlpha = 1;
  }

  /* ---------- steps card + controls ---------- */
  const stepsCard = document.getElementById('tms-how-steps');
  const stepEls = stepsCard ? [...stepsCard.querySelectorAll('.tms-how__step')] : [];
  const playBtn = document.getElementById('tms-how-play');
  const DOM_TEXT = {
    ka: { h: 'როგორ მუშაობს', hs: 'მექანიზმი', caption: 'შენელებული ჩვენება · რეალურად ეს მილიწამებში ხდება',
          s1: 'იმპულსი კოჭში', s1p: 'აპარატი კოჭში ძლიერ დენს უშვებს, წამის ათასედზე ნაკლები ხნით.',
          s2: 'მაგნიტური ველი', s2p: '1.5–2 ტესლა ველი უმტკივნეულოდ გადის კანსა და თავის ქალაში.',
          s3: 'დენი ქერქში', s3p: 'ცვალებადი ველი ქერქში, დაახლოებით 2 სმ სიღრმეზე, სუსტ ელექტრულ დენს ქმნის.',
          s4: 'ნეირონები და ქსელი', s4p: 'ნეირონები იმპულსს გასცემენ და სიგნალი ღრმა ქსელებს გადაეცემა. პროტოკოლის მიხედვით ზონა აქტიურდება ან ითრგუნება.',
          foot: 'rTMS-ზე იმპულსი წამში რამდენჯერმე მეორდება (მაგ. 10 Hz). სესიების კურსში ქსელები ნეიროპლასტიურობის გზით გადაეწყობა.' },
    en: { h: 'How it works', hs: 'Mechanism', caption: 'Slow motion · in reality this takes milliseconds',
          s1: 'Pulse in the coil', s1p: 'The device sends a strong current through the coil for less than a thousandth of a second.',
          s2: 'Magnetic field', s2p: 'A 1.5–2 tesla field passes painlessly through the scalp and skull.',
          s3: 'Current in the cortex', s3p: 'The changing field induces a weak electric current in the cortex, about 2 cm deep.',
          s4: 'Neurons and networks', s4p: 'Neurons fire and the signal travels on to deeper networks. Depending on the protocol, the area is excited or inhibited.',
          foot: 'In rTMS the pulse repeats several times per second (e.g. 10 Hz). Over a course of sessions, networks reorganise through neuroplasticity.' },
    ru: { h: 'Как работает', hs: 'Механизм', caption: 'Замедленный показ · в реальности это занимает миллисекунды',
          s1: 'Импульс в катушке', s1p: 'Аппарат пропускает через катушку мощный ток менее чем на тысячную долю секунды.',
          s2: 'Магнитное поле', s2p: 'Поле 1,5–2 тесла безболезненно проходит через кожу и череп.',
          s3: 'Ток в коре', s3p: 'Меняющееся поле наводит в коре, на глубине около 2 см, слабый электрический ток.',
          s4: 'Нейроны и сети', s4p: 'Нейроны генерируют импульс, и сигнал передаётся глубоким сетям. В зависимости от протокола зона возбуждается или тормозится.',
          foot: 'При rTMS импульс повторяется несколько раз в секунду (например, 10 Гц). За курс сеансов сети перестраиваются благодаря нейропластичности.' },
  };
  let playing = false;
  const setPlayLabel = () => {
    playBtn.textContent = playing ? L.pause : L.play;
    playBtn.setAttribute('aria-pressed', String(!playing));
  };
  function applyLang() {
    const lang = langOf();
    L = TEXT[lang];
    const D = DOM_TEXT[lang];
    [root, stepsCard].forEach(box => {
      if (!box) return;
      box.querySelectorAll('[data-tms-t]').forEach(el => {
        const k = el.getAttribute('data-tms-t');
        if (D[k]) el.textContent = D[k];
      });
    });
    setPlayLabel();
  }
  new MutationObserver(applyLang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let t = reduce ? 7.0 : 0, last = performance.now();
  playing = !reduce;
  playBtn.addEventListener('click', () => { playing = !playing; setPlayLabel(); });
  stepEls.forEach(el => el.addEventListener('click', () => { t = SP[+el.dataset.i] + .01; }));
  applyLang();

  // skip all drawing while the TMS tab is closed or the animation is scrolled out of view
  let onScreen = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }).observe(root);

  function updateSteps() {
    const i = SP.findIndex((p, k) => t >= p && t < SP[k + 1]);
    stepEls.forEach((el, k) => {
      el.classList.toggle('on', k === i);
      el.style.setProperty('--p', k === i ? prog(t, SP[k], SP[k + 1]).toFixed(3) : (k < i ? 1 : 0));
    });
  }
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!onScreen || !root.offsetParent) { requestAnimationFrame(frame); return; }
    if (playing) { t += dt; if (t >= TT) t -= TT; }
    compose(t);
    updateSteps();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
