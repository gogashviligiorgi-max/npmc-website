/* ============================================================
   NPMC — compact home page blocks
   "რა გაწუხებს?"  — tabs: a condition → short explanation → how we help → book / details
   "როგორ ვმუშაობთ" — 3 steps in a row + 6 method tiles
   Text in Georgian, English and Russian; follows the language buttons.
   "დაწვრილებით" opens the existing condition window (openConditionModal in main.js).
   ============================================================ */
(function () {
  'use strict';

  const ORDER = ['depression', 'anxiety', 'adhd', 'panic', 'ocd', 'sleep', 'ptsd', 'phobia'];

  const T = {
    ka: {
      chipsLabel: 'რა გაწუხებს?',
      helpLabel: 'რა გაწუხებს?',
      helpTitle: 'აირჩიეთ — და ნახეთ, როგორ დაგეხმარებით',
      howWeHelp: 'რით გეხმარებით',
      book: 'დაჯავშნე კონსულტაცია',
      details: 'დაწვრილებით',
      note: 'არ ხართ დარწმუნებული? <a href="/screening.html">შეავსეთ 3-წუთიანი უფასო ტესტი →</a>',
      howLabel: 'როგორ ვმუშაობთ',
      howTitle: 'სამი ნაბიჯი შედეგამდე',
      methodsTitle: 'მეთოდები',
      more: 'დაწვრილებით →',
      steps: [
        ['QEEG — ტვინის რუკა', '60 წუთი, სრულიად უმტკივნეულო. ვხედავთ, როგორ მუშაობს თქვენი ტვინი.'],
        ['ინდივიდუალური გეგმა', 'მკურნალობას ვაგებთ თქვენს მონაცემებზე — არა ვარაუდზე.'],
        ['მკურნალობის კურსი', '10–20 სესია, პროგრესის რეგულარული გაზომვით.'],
      ],
      cond: {
        depression: ['დეპრესია', 'დაქვეითებული განწყობა, ენერგიისა და ინტერესის დაკარგვა. QEEG გვიჩვენებს, რა ხდება ტვინში, და მკურნალობას ამაზე ვაგებთ.', ['TMS — FDA-ს მიერ დაშვებული', 'ნეიროფიდბექი', 'ფსიქოთერაპია']],
        anxiety: ['შფოთვა', 'მუდმივი დაძაბულობა, ნერვიულობა, სხეულის სიმპტომები. ტვინს ვასწავლით, უფრო მშვიდ რეჟიმში იმუშაოს.', ['ნეიროფიდბექი', 'ფსიქოთერაპია', 'TMS (კვლევებზე დაყრდნობით)']],
        adhd: ['ADHD', 'ყურადღების გაფანტულობა, იმპულსურობა, ჰიპერაქტივობა — ბავშვებსა და მოზრდილებში. ნეიროფიდბექი 6 წლიდან.', ['QEEG დიაგნოსტიკა', 'ნეიროფიდბექი', 'ფსიქოთერაპია']],
        panic: ['პანიკური შეტევები', 'მოულოდნელი შიში, აჩქარებული გულისცემა, ჰაერის უკმარისობა. ვამშვიდებთ ნერვული სისტემის „განგაშის“ რეჟიმს.', ['ნეიროფიდბექი', 'ფსიქოთერაპია', 'TMS (კვლევებზე დაყრდნობით)']],
        ocd: ['OCD', 'აკვიატებული ფიქრები და განმეორებადი ქცევები, რომლებსაც ვერ აკონტროლებთ.', ['TMS — FDA-ს მიერ დაშვებული (2018)', 'ფსიქოთერაპია']],
        sleep: ['ძილის პრობლემები', 'უძილობა, ღამით ხშირი გაღვიძება, დილით დაღლილობა.', ['ნეიროფიდბექი', 'PEMF', 'ფსიქოთერაპია']],
        ptsd: ['PTSD / ტრავმა', 'ტრავმის შემდეგ — კოშმარები, მუდმივი სიფხიზლე, მოგონებებისგან თავის არიდება.', ['ნეიროფიდბექი (Alpha-Theta)', 'EMDR / ფსიქოთერაპია', 'TMS (კვლევებზე დაყრდნობით)']],
        phobia: ['ფობიები', 'ძლიერი შიში კონკრეტული სიტუაციების ან საგნების მიმართ, რომელიც ცხოვრებას ზღუდავს.', ['ფსიქოთერაპია', 'ნეიროფიდბექი']],
      },
      tiles: [
        ['QEEG დიაგნოსტიკა', 'ტვინის ციფრული რუკა — ყველაფრის საწყისი', '/qeeg.html'],
        ['TMS', 'მაგნიტური სტიმულაცია, უმტკივნეულო', '/tms.html'],
        ['ნეიროფიდბექი', 'ტვინის ვარჯიში რეალურ დროში', '/neurofeedback.html'],
        ['ფსიქოთერაპია', 'QEEG-ზე დაფუძნებული: CBT, ACT, EMDR', '/methods.html'],
        ['PEMF', 'რელაქსაცია, სტრესი და ძილი', '/methods.html'],
        ['ფსიქიატრის კონსულტაცია', 'სრული კლინიკური შეფასება', '/#contact'],
      ],
    },
    en: {
      chipsLabel: 'What troubles you?',
      helpLabel: 'What troubles you?',
      helpTitle: 'Choose one — and see how we can help',
      howWeHelp: 'How we help',
      book: 'Book a consultation',
      details: 'Details',
      note: 'Not sure? <a href="/screening.html">Take a free 3-minute test →</a>',
      howLabel: 'How we work',
      howTitle: 'Three steps to results',
      methodsTitle: 'Methods',
      more: 'Learn more →',
      steps: [
        ['QEEG — brain map', '60 minutes, completely painless. We see how your brain works.'],
        ['A personal plan', 'Treatment built on your data — not on guesswork.'],
        ['Treatment course', '10–20 sessions, with progress measured regularly.'],
      ],
      cond: {
        depression: ['Depression', 'Low mood, loss of energy and interest. QEEG shows what is happening in the brain, and we build treatment on it.', ['TMS — FDA-cleared', 'Neurofeedback', 'Psychotherapy']],
        anxiety: ['Anxiety', 'Constant tension, worry, physical symptoms. We train the brain to work in a calmer mode.', ['Neurofeedback', 'Psychotherapy', 'TMS (research-based)']],
        adhd: ['ADHD', 'Distractibility, impulsivity, hyperactivity — in children and adults. Neurofeedback from age 6.', ['QEEG diagnostics', 'Neurofeedback', 'Psychotherapy']],
        panic: ['Panic attacks', 'Sudden fear, racing heart, shortness of breath. We calm the nervous system’s “alarm” mode.', ['Neurofeedback', 'Psychotherapy', 'TMS (research-based)']],
        ocd: ['OCD', 'Intrusive thoughts and repetitive behaviours that feel impossible to control.', ['TMS — FDA-cleared (2018)', 'Psychotherapy']],
        sleep: ['Sleep problems', 'Insomnia, waking up at night, tired in the morning.', ['Neurofeedback', 'PEMF', 'Psychotherapy']],
        ptsd: ['PTSD / trauma', 'After trauma — nightmares, constant alertness, avoiding memories.', ['Neurofeedback (Alpha-Theta)', 'EMDR / psychotherapy', 'TMS (research-based)']],
        phobia: ['Phobias', 'Strong fear of specific situations or objects that limits your life.', ['Psychotherapy', 'Neurofeedback']],
      },
      tiles: [
        ['QEEG diagnostics', 'A digital brain map — where everything starts', '/qeeg.html'],
        ['TMS', 'Magnetic stimulation, painless', '/tms.html'],
        ['Neurofeedback', 'Brain training in real time', '/neurofeedback.html'],
        ['Psychotherapy', 'QEEG-guided: CBT, ACT, EMDR', '/methods.html'],
        ['PEMF', 'Relaxation, stress and sleep', '/methods.html'],
        ['Psychiatrist consultation', 'A full clinical assessment', '/#contact'],
      ],
    },
    ru: {
      chipsLabel: 'Что вас беспокоит?',
      helpLabel: 'Что вас беспокоит?',
      helpTitle: 'Выберите — и узнайте, как мы поможем',
      howWeHelp: 'Чем мы помогаем',
      book: 'Записаться на консультацию',
      details: 'Подробнее',
      note: 'Не уверены? <a href="/screening.html">Пройдите бесплатный 3-минутный тест →</a>',
      howLabel: 'Как мы работаем',
      howTitle: 'Три шага к результату',
      methodsTitle: 'Методы',
      more: 'Подробнее →',
      steps: [
        ['QEEG — карта мозга', '60 минут, совершенно безболезненно. Видим, как работает ваш мозг.'],
        ['Индивидуальный план', 'Лечение строится на ваших данных, а не на догадках.'],
        ['Курс лечения', '10–20 сеансов с регулярной оценкой прогресса.'],
      ],
      cond: {
        depression: ['Депрессия', 'Сниженное настроение, потеря энергии и интереса. QEEG показывает, что происходит в мозге, и на этом мы строим лечение.', ['ТМС — разрешено FDA', 'Нейробиоуправление', 'Психотерапия']],
        anxiety: ['Тревога', 'Постоянное напряжение, беспокойство, телесные симптомы. Учим мозг работать в более спокойном режиме.', ['Нейробиоуправление', 'Психотерапия', 'ТМС (по данным исследований)']],
        adhd: ['СДВГ', 'Рассеянность, импульсивность, гиперактивность — у детей и взрослых. Нейробиоуправление с 6 лет.', ['QEEG-диагностика', 'Нейробиоуправление', 'Психотерапия']],
        panic: ['Панические атаки', 'Внезапный страх, учащённое сердцебиение, нехватка воздуха. Успокаиваем «тревожный» режим нервной системы.', ['Нейробиоуправление', 'Психотерапия', 'ТМС (по данным исследований)']],
        ocd: ['ОКР', 'Навязчивые мысли и повторяющиеся действия, которые трудно контролировать.', ['ТМС — разрешено FDA (2018)', 'Психотерапия']],
        sleep: ['Проблемы со сном', 'Бессонница, частые пробуждения ночью, усталость утром.', ['Нейробиоуправление', 'PEMF', 'Психотерапия']],
        ptsd: ['ПТСР / травма', 'После травмы — кошмары, постоянная настороженность, избегание воспоминаний.', ['Нейробиоуправление (Alpha-Theta)', 'EMDR / психотерапия', 'ТМС (по данным исследований)']],
        phobia: ['Фобии', 'Сильный страх определённых ситуаций или предметов, который ограничивает жизнь.', ['Психотерапия', 'Нейробиоуправление']],
      },
      tiles: [
        ['QEEG-диагностика', 'Цифровая карта мозга — с неё всё начинается', '/qeeg.html'],
        ['ТМС', 'Магнитная стимуляция, безболезненно', '/tms.html'],
        ['Нейробиоуправление', 'Тренировка мозга в реальном времени', '/neurofeedback.html'],
        ['Психотерапия', 'На основе QEEG: КПТ, ACT, EMDR', '/methods.html'],
        ['PEMF', 'Расслабление, стресс и сон', '/methods.html'],
        ['Консультация психиатра', 'Полная клиническая оценка', '/#contact'],
      ],
    },
  };

  const ICONS = [
    '<circle cx="12" cy="12" r="9"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4M12 12v5"/>',
    '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    '<path d="M3 12h3l2-5 4 10 2-5h7"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 4.5a3.5 3.5 0 0 1 0 7"/>',
    '<path d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M10 12a2 2 0 0 1 4 0"/>',
    '<path d="M9 3h6v4H9zM5 7h14v14H5z"/><path d="M12 11v6M9 14h6"/>',
  ];
  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

  let current = 'depression';

  function lang() {
    try { return localStorage.getItem('npmc-lang') || document.documentElement.lang || 'ka'; } catch (e) { return document.documentElement.lang || 'ka'; }
  }
  const t = () => T[lang()] || T.ka;
  const set = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };

  function renderPanel() {
    const L = t(); const c = L.cond[current];
    set('.help__panel', `
      <h3 class="help__panel-title">${c[0]}</h3>
      <p class="help__panel-text">${c[1]}</p>
      <div class="help__panel-label">${L.howWeHelp}</div>
      <ul class="help__methods">${c[2].map(m => `<li>${m}</li>`).join('')}</ul>
      <div class="help__actions">
        <button type="button" class="btn btn--primary help__details">${L.details} →</button>
      </div>`);
    document.querySelectorAll('.help__tab').forEach(b => {
      const on = b.dataset.cond === current;
      b.classList.toggle('active', on); b.setAttribute('aria-selected', on ? 'true' : 'false');
      // Phone: the tabs scroll sideways — bring the chosen one into view (without moving the page).
      const row = b.parentElement;
      if (on && row && row.scrollWidth > row.clientWidth) row.scrollTo({ left: b.offsetLeft - 16, behavior: 'smooth' });
    });
  }

  function render() {
    const L = t();
    set('.hero-chips__label', L.chipsLabel);
    set('.hero-chips__list', ORDER.map(k => `<button type="button" class="hero-chip" data-cond="${k}">${L.cond[k][0]}</button>`).join(''));
    set('[data-h="helpLabel"]', L.helpLabel);
    set('[data-h="helpTitle"]', L.helpTitle);
    set('.help__tabs', ORDER.map(k => `<button type="button" class="help__tab" role="tab" data-cond="${k}">${L.cond[k][0]}</button>`).join(''));
    set('[data-h="note"]', L.note);
    set('[data-h="book"]', L.book);
    set('[data-h="howLabel"]', L.howLabel);
    set('[data-h="howTitle"]', L.howTitle);
    set('[data-h="methodsTitle"]', L.methodsTitle);
    set('.how__steps', L.steps.map((s, i) => `<div class="how__step"><span class="how__num">0${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join(''));
    set('.how__tiles', L.tiles.map((x, i) => `<a class="how__tile" href="${x[2]}"><span class="ico">${svg(ICONS[i])}</span><span><strong>${x[0]}</strong><small>${x[1]}</small></span></a>`).join(''));
    renderPanel();
    // Testimonial avatars follow the translated names.
    document.querySelectorAll('.testi-avatar').forEach(a => {
      const author = a.closest('.testi-author');
      const name = author && author.querySelector('.testi-name');
      if (name && name.textContent.trim()) { const ch = name.textContent.trim().charAt(0); a.textContent = /[ა-ჿ]/.test(ch) ? ch : ch.toUpperCase(); }
    });
  }

  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.hero-chip, .help__tab');
    if (chip) {
      current = chip.dataset.cond;
      renderPanel();
      if (chip.classList.contains('hero-chip')) {
        const help = document.getElementById('help');
        if (help) help.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (e.target.closest('.help__details') && typeof window.openConditionModal === 'function') {
      window.openConditionModal(current);
      return;
    }
    if (e.target.closest('.lang-btn')) setTimeout(render, 80);
  });

  render();
})();
