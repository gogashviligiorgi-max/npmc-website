/**
 * NPMC — Screening Tests
 * PHQ-9 (Depression) · GAD-7 (Anxiety) · ASRS-v1.1 (ADHD) · CBI (Burnout)
 *
 * To enable form submission, replace FORMSPREE_ID with your
 * Formspree form ID from https://formspree.io
 */
(function () {
  'use strict';

  const FORMSPREE_ID = 'xjgpadwp';

  /* ── Test Definitions ─────────────────────────────────────── */
  const TESTS = {
    phq9: {
      name: 'PHQ-9',
      title: 'PHQ-9 — დეპრესიის სკრინინგი',
      source: 'Patient Health Questionnaire-9 (Kroenke et al., 2001)',
      preamble: 'ბოლო 2 კვირის განმავლობაში, რამდენად ხშირად შეგაწუხეთ შემდეგი პრობლემები?',
      options: ['საერთოდ არ', 'რამდენიმე დღე', 'ნახევარზე\nმეტი', 'თითქმის\nყოველდღე'],
      values: [0, 1, 2, 3],
      questions: [
        'ინტერესისა და სიამოვნების დაკარგვა საქმეებისადმი',
        'სევდა, დეპრესია ან უიმედობა',
        'ძილის პრობლემები — ძნელად ეძინება ან ბევრი სძინავს',
        'დაღლილობა ან ენერგიის ნაკლებობა',
        'კვების პრობლემები — ნაკლები ან ზედმეტი მადა',
        'უარყოფითი დამოკიდებულება საკუთარი თავისადმი — წარუმატებლობის ან ოჯახის ტვირთის განცდა',
        'კონცენტრაციის გაძნელება (მაგ. წიგნის კითხვა, ტელევიზიის ყურება, გადაწყვეტილების მიღება)',
        'ისეთი ნელი მოძრაობა ან ლაპარაკი, რომ სხვებს შეამჩნევდნენ — ან პირიქით, განსაკუთრებული მოუსვენრობა',
        'ფიქრები, რომ სჯობს მოკვდეთ, ან სურვილი საკუთარ თავს ვნება მიაყენოთ',
      ],
      score(total) {
        if (total <= 4)  return { level: 'მინიმალური ან არ არის',   band: 'green',  desc: 'დეპრესიის სიმპტომები პრაქტიკულად არ გამოვლინდა. ეს კარგი ნიშანია — გააგრძელეთ ჯანმრთელი ცხოვრების წესი.', cta: 'გირჩევთ პრევენციული QEEG Brain Check-ის გაკეთებას ტვინის ფუნქციური პოტენციალის შეფასებისთვის.' };
        if (total <= 9)  return { level: 'მსუბუქი დეპრესია',         band: 'yellow', desc: 'გამოვლინდა მსუბუქი სიმპტომები. მდგომარეობა მართვადია, თუმცა ყურადღება სასარგებლო იქნება.', cta: 'რეკომენდებულია კონსულტაცია სპეციალისტთან. NPMC-ში QEEG დიაგნოსტიკა გეხმარებათ ზუსტი სურათის მიღებაში.' };
        if (total <= 14) return { level: 'ზომიერი დეპრესია',        band: 'orange', desc: 'სიმპტომები საგრძნობია და ყოველდღიურ ფუნქციონირებაზე შეიძლება ახდენდეს გავლენა.', cta: 'მნიშვნელოვანია სპეციალისტთან კონსულტაცია. NPMC გთავაზობთ QEEG + ნეიროფსიქომოდულაციის პროტოკოლს.' };
        if (total <= 19) return { level: 'ზომიერად მძიმე დეპრესია', band: 'red',    desc: 'სიმპტომები მნიშვნელოვანია. ეს მაჩვენებელი მიუთითებს კლინიკური შეფასების საჭიროებაზე.', cta: 'გთხოვთ, რაც შეიძლება მალე მიმართეთ სპეციალისტს. NPMC-ში ჩვენ მზად ვართ დაგეხმაროთ.' };
        return             { level: 'მძიმე დეპრესია',               band: 'red',    desc: 'სიმპტომები სერიოზულია. გთხოვთ, დაუყოვნებლივ მიმართეთ სპეციალისტს.', cta: 'გთხოვთ, დღეს დაგვიკავშირდეთ. NPMC-ი მზადაა გადაუდებელ კონსულტაციაზე.' };
      },
    },

    gad7: {
      name: 'GAD-7',
      title: 'GAD-7 — შფოთვის სკრინინგი',
      source: 'Generalized Anxiety Disorder-7 (Spitzer et al., 2006)',
      preamble: 'ბოლო 2 კვირის განმავლობაში, რამდენად ხშირად შეგაწუხეთ შემდეგი პრობლემები?',
      options: ['საერთოდ არ', 'რამდენიმე დღე', 'ნახევარზე\nმეტი', 'თითქმის\nყოველდღე'],
      values: [0, 1, 2, 3],
      questions: [
        'ნერვიულობის, შეშინებულობის ან ზღვარზე ყოფნის განცდა',
        'შფოთვის ან ნერვიულობის კონტროლის უუნარობა',
        'გადაჭარბებული ფიქრი სხვადასხვა საგნებზე',
        'სიმშვიდის პოვნის სიძნელე',
        'ჯდომის უუნარობა — განსაკუთრებული მოუსვენრობა',
        'ადვილი გაღიზიანება ან გაბრაზება',
        'ცუდი მოვლენის მოხდენის შიში',
      ],
      score(total) {
        if (total <= 4)  return { level: 'მინიმალური შფოთვა', band: 'green',  desc: 'შფოთვის სიმპტომები მინიმალურია. ეს კარგი მაჩვენებელია.', cta: 'გირჩევთ Brain Check-ის გაკეთებას პრევენციული მიზნით.' };
        if (total <= 9)  return { level: 'მსუბუქი შფოთვა',   band: 'yellow', desc: 'მსუბუქი შფოთვის სიმპტომები გამოვლინდა. ყოველდღიურ ცხოვრებაზე გავლენა შეიძლება ჰქონდეს.', cta: 'გირჩევთ კონსულტაციას. NPMC-ში ნეიროფიდბექი ეფექტური საშუალებაა შფოთვის საწინააღმდეგოდ.' };
        if (total <= 14) return { level: 'ზომიერი შფოთვა',   band: 'orange', desc: 'შფოთვის სიმპტომები საგრძნობია. კლინიკური შეფასება რეკომენდებულია.', cta: 'მნიშვნელოვანია სპეციალისტთან ვიზიტი. NPMC-ი გთავაზობთ QEEG + TMS + ნეიროფიდბექ პროტოკოლს.' };
        return             { level: 'მძიმე შფოთვა',          band: 'red',    desc: 'შფოთვის სიმპტომები სერიოზულია. გთხოვთ, მიმართეთ სპეციალისტს.', cta: 'გთხოვთ, დაგვიკავშირდეთ — NPMC-ი მზადაა გეხმაროთ.' };
      },
    },

    asrs: {
      name: 'ASRS-v1.1',
      title: 'ASRS-v1.1 — ADHD სკრინინგი',
      source: 'Adult ADHD Self-Report Scale v1.1, Part A (WHO/Kessler et al., 2005)',
      preamble: 'ბოლო 6 თვის განმავლობაში, რამდენად ხშირად...',
      options: ['არასდროს', 'იშვიათად', 'ზოგჯერ', 'ხშირად', 'ძალიან ხშირად'],
      values: [0, 1, 2, 3, 4],
      // Part A scoring: Q1-3 positive if ≥2 (ზოგჯერ+); Q4-6 positive if ≥3 (ხშირად+)
      thresholds: [2, 2, 2, 3, 3, 3],
      questions: [
        'ახალი პროექტის ბოლო ეტაპის გადალახვა გიჭირდათ, მას შემდეგ რაც დასაწყისის ყველაზე საინტერესო ნაწილი გავიდა?',
        'ამოცანის ორგანიზება გიჭირდათ, როდესაც ის ყველაფრის მოწესრიგებას მოითხოვდა?',
        'პაემნების ან ვალდებულებების დამახსოვრება გიჭირდათ?',
        'ინტენსიური ფიქრის მოთხოვნის შემთხვევაში ამოცანის დაწყება გადაგდებდეთ?',
        'გრძელ სხდომებზე ჯდომისას ადგილის პოვნა გიჭირდათ, ფეხი იფარშევდებოდათ ან ადვილად ყურადღება გიფანტებოდათ?',
        'ზედმეტ ენერგიულად გრძნობდით თავს ან ვერ ახერხებდით შეჩერებას?',
      ],
      score(_total, raw) {
        // raw = array of answer values per question
        const thresholds = [2, 2, 2, 3, 3, 3];
        const positives = raw.filter((v, i) => v >= thresholds[i]).length;
        if (positives >= 4) {
          return { level: 'ADHD-ის სიმპტომებთან შესაბამისი', band: 'orange', desc: `${positives} კითხვაზე 6-დან დადებითი პასუხი. ეს შედეგი მაღალ შესაბამისობაზე მიუთითებს მოზრდილ ADHD-თან.`, cta: 'QEEG დიაგნოსტიკა + ნეიროფიდბექი ADHD-ის ერთ-ერთი ყველაზე კვლევით დასაბუთებული მეთოდია. NPMC-ი მოგამზადებთ ინდივიდუალურ გეგმას.' };
        }
        return { level: 'ADHD-ის სიმპტომები ნაკლებად გამოხატული', band: 'green', desc: `${positives} კითხვაზე 6-დან დადებითი პასუხი. სიმპტომები ADHD-ისთვის დამახასიათებელ ზღვარს ქვემოთ არის.`, cta: 'თუ მაინც გაქვთ კითხვები ყურადღებისა და ფოკუსის შესახებ, NPMC-ში Brain Check გეხმარებათ პასუხის პოვნაში.' };
      },
    },
    cbi: {
      name: 'CBI',
      title: 'CBI — გადაწვის სკრინინგი',
      source: 'Copenhagen Burnout Inventory — Personal & Work Burnout (Kristensen et al., 2005)',
      preamble: 'ბოლო 4 კვირის განმავლობაში, რამდენად ხშირად განიცადეთ შემდეგი?',
      options: ['ყოველთვის', 'ხშირად', 'ზოგჯერ', 'იშვიათად', 'არასდროს'],
      values: [4, 3, 2, 1, 0],
      questions: [
        'ფიზიკურად დაღლილად გრძნობთ თავს?',
        'ემოციურად გამოფიტული ხართ?',
        'სხეული გიმოწმებს — ძლიერი დაღლილობა, სიმძიმე?',
        'გიჭირდათ ჩვეული ამოცანების შესრულება?',
        '"ვეღარ ვიტანს" — ასეთი ფიქრი გეუფლება?',
        'სამუშაო/ყოველდღიური ვალდებულება გამოფიტვის განცდას გიქმნის?',
        'სამუშაოს შემდეგ ვეღარ ახერხებთ "გამორთვას"?',
        'სამუშაო/ძირითადი სფერო სულ უფრო მოსაბეზრებლად გეჩვენება?',
        'ენთუზიაზმი, რომელიც ადრე გქონდათ, შემცირებულია?',
        'გრძნობთ, რომ ენერგია სრულად გამოლეულია?',
      ],
      score(total) {
        if (total <= 10) return { level: 'გადაწვა არ გამოვლინდა',     band: 'green',  desc: 'გადაწვის სიმპტომები მინიმალურია. ენერგიის ბალანსი კარგ მდგომარეობაშია.', cta: 'გირჩევთ Brain Check-ს — ტვინის ფუნქციური პოტენციალის შეფასებისთვის.' };
        if (total <= 20) return { level: 'მსუბუქი გადაწვა',            band: 'yellow', desc: 'ფიზიკური ან ემოციური დაღლილობის სიმპტომები გამოვლინდა. ყურადღება სასარგებლო იქნება.', cta: 'ნეიროფიდბექი ეფექტური საშუალებაა სტრეს-რეგულაციისთვის. NPMC-ი მოგამზადებთ ინდივიდუალურ გეგმას.' };
        if (total <= 30) return { level: 'ზომიერი გადაწვა',            band: 'orange', desc: 'გადაწვის სიმპტომები მნიშვნელოვანია. ყოველდღიური ფუნქციონირება შეიძლება ზარალდებოდეს.', cta: 'კლინიკური შეფასება რეკომენდებულია. NPMC-ი გთავაზობთ QEEG + TMS + ნეიროფიდბექ პროტოკოლს.' };
        return             { level: 'მძიმე გადაწვა',                   band: 'red',    desc: 'გადაწვის სიმპტომები სერიოზულია. გთხოვთ, არ გადადოთ სპეციალისტთან ვიზიტი.', cta: 'გთხოვთ, დაგვიკავშირდეთ. NPMC-ი მზადაა გეხმაროთ.' };
      },
    },
  };

  /* ── DOM Refs ────────────────────────────────────────────── */
  const section    = document.getElementById('screening');
  if (!section) return;

  const tabsEl     = section.querySelector('.scr-tabs');
  const questionsEl= section.querySelector('#scrQuestions');
  const resultEl   = section.querySelector('#scrResult');
  const submitBtn  = section.querySelector('#scrSubmit');
  const errorMsg   = section.querySelector('#scrErrorMsg');

  let activeTest = 'phq9';

  /* ── Render Questions ───────────────────────────────────── */
  function renderQuestions(testKey) {
    const t = TESTS[testKey];
    const cols = t.options.length;

    // Legend
    const legend = document.createElement('div');
    legend.className = 'scr-options-legend';
    legend.style.setProperty('--cols', cols);
    legend.innerHTML = `<div class="scr-opt-label"></div>` +
      t.options.map(o => `<div class="scr-opt-label">${o.replace('\n','<br>')}</div>`).join('');

    // Questions
    const rows = t.questions.map((q, qi) => {
      const cells = t.values.map((v, vi) =>
        `<div class="scr-radio-cell" data-label="${t.options[vi].replace('\n',' ')}">
          <input type="radio" class="scr-radio" name="q${qi}" value="${v}" required aria-label="${t.options[vi].replace('\n',' ')}">
        </div>`
      ).join('');
      return `<div class="scr-question" style="--cols:${cols}">
        <div class="scr-q-text"><span class="scr-q-num">${qi + 1}.</span>${q}</div>
        ${cells}
      </div>`;
    }).join('');

    // Description
    const descHtml = `
      <p class="scr-test-desc">${t.source}</p>
      <p class="scr-preamble">${t.preamble}</p>
    `;

    questionsEl.innerHTML = descHtml + legend.outerHTML + rows;
  }

  /* ── Tab Switching ──────────────────────────────────────── */
  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.scr-tab');
    if (!btn) return;
    tabsEl.querySelectorAll('.scr-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTest = btn.dataset.test;
    renderQuestions(activeTest);
    resultEl.hidden = true;
    resultEl.innerHTML = '';
    errorMsg.classList.remove('visible');
  });

  /* ── Validate Info ──────────────────────────────────────── */
  function getInfo() {
    const fields = {
      name:    section.querySelector('#scrName'),
      surname: section.querySelector('#scrSurname'),
      email:   section.querySelector('#scrEmail'),
      phone:   section.querySelector('#scrPhone'),
    };
    let valid = true;
    Object.values(fields).forEach(f => {
      f.classList.remove('error');
      if (!f.value.trim()) { f.classList.add('error'); valid = false; }
    });
    if (!valid) return null;
    return {
      name:    fields.name.value.trim(),
      surname: fields.surname.value.trim(),
      email:   fields.email.value.trim(),
      phone:   fields.phone.value.trim(),
    };
  }

  /* ── Get Answers ────────────────────────────────────────── */
  function getAnswers(testKey) {
    const t = TESTS[testKey];
    const raw = [];
    let complete = true;
    for (let i = 0; i < t.questions.length; i++) {
      const checked = questionsEl.querySelector(`input[name="q${i}"]:checked`);
      if (!checked) { complete = false; break; }
      raw.push(parseInt(checked.value, 10));
    }
    if (!complete) return null;
    return raw;
  }

  /* ── Show Result ────────────────────────────────────────── */
  function showResult(testKey, raw) {
    const t = TESTS[testKey];
    const total = raw.reduce((s, v) => s + v, 0);
    const res = t.score(total, raw);
    const maxScore = t.values[t.values.length - 1] * t.questions.length;

    resultEl.className = `scr-result scr-result--${res.band}`;
    resultEl.innerHTML = `
      <div class="scr-result__badge">${t.name}</div>
      <div class="scr-result__score">${total} <span>/ ${maxScore}</span></div>
      <div class="scr-result__level">${res.level}</div>
      <div class="scr-result__desc">${res.desc}</div>
      <div class="scr-result__cta">${res.cta}</div>
    `;
    resultEl.hidden = false;
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ── Submit ─────────────────────────────────────────────── */
  submitBtn.addEventListener('click', async () => {
    errorMsg.classList.remove('visible');

    const info = getInfo();
    if (!info) {
      errorMsg.textContent = 'გთხოვთ შეავსოთ სახელი, გვარი, ელ-ფოსტა და ტელეფონი.';
      errorMsg.classList.add('visible');
      return;
    }

    const raw = getAnswers(activeTest);
    if (!raw) {
      errorMsg.textContent = 'გთხოვთ უპასუხოთ ყველა კითხვას.';
      errorMsg.classList.add('visible');
      return;
    }

    showResult(activeTest, raw);

    // Send data
    const t = TESTS[activeTest];
    const total = raw.reduce((s, v) => s + v, 0);
    const res = t.score(total, raw);
    const payload = {
      test:    t.name,
      name:    `${info.name} ${info.surname}`,
      email:   info.email,
      phone:   info.phone,
      score:   total,
      level:   res.level,
      answers: raw.map((v, i) => `${i + 1}. ${t.questions[i]}: ${t.options[v] || v}`).join('\n'),
    };

    if (FORMSPREE_ID === 'YOUR_FORM_ID') return; // not configured yet

    submitBtn.disabled = true;
    try {
      const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const notice = document.createElement('p');
      notice.className = 'scr-sent-notice ' + (r.ok ? 'ok' : 'err');
      notice.textContent = r.ok
        ? '✓ შედეგები წარმატებით გაიგზავნა. ჩვენ დაგიკავშირდებით.'
        : 'გაგზავნა ვერ მოხერხდა. გთხოვთ, დაგვიკავშირდეთ პირდაპირ.';
      resultEl.appendChild(notice);
    } catch {
      /* silent — result is already shown */
    } finally {
      submitBtn.disabled = false;
    }
  });

  /* ── Init ────────────────────────────────────────────────── */
  renderQuestions(activeTest);

})();
