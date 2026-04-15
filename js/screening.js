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
      title: 'PHQ-9 — Depression Screening',
      source: 'Patient Health Questionnaire-9 (Kroenke et al., 2001)',
      preamble: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      options: ['Not at all', 'Several days', 'More than\nhalf the days', 'Nearly\nevery day'],
      values: [0, 1, 2, 3],
      questions: [
        'Little interest or pleasure in doing things.',
        'Feeling down, depressed, or hopeless.',
        'Trouble falling or staying asleep, or sleeping too much.',
        'Feeling tired or having little energy.',
        'Poor appetite or overeating.',
        'Feeling bad about yourself — or feeling like a failure, or feeling that you have let yourself or your family down.',
        'Trouble concentrating on things, such as reading, watching television, or making decisions.',
        'Moving or speaking so slowly that other people could have noticed — or the opposite: being so fidgety or restless that you have been moving around a lot more than usual.',
        'Thoughts that you would be better off dead, or thoughts of hurting yourself in some way.',
      ],
      score(total) {
        if (total <= 4)  return { level: 'Minimal or none',          band: 'green',  desc: 'Depression symptoms are practically absent. This is a good sign — continue with a healthy lifestyle.', cta: 'We recommend a preventive QEEG Brain Check to assess your brain\'s functional potential.' };
        if (total <= 9)  return { level: 'Mild depression',          band: 'yellow', desc: 'Mild symptoms were detected. The condition is manageable, but some attention would be beneficial.', cta: 'A consultation with a specialist is recommended. At NPMC, QEEG diagnostics will help you get a clear picture.' };
        if (total <= 14) return { level: 'Moderate depression',      band: 'orange', desc: 'Symptoms are noticeable and may be affecting daily functioning.', cta: 'A specialist consultation is important. NPMC offers a QEEG + Neuropsychomodulation protocol.' };
        if (total <= 19) return { level: 'Moderately severe depression', band: 'red', desc: 'Symptoms are significant. This score indicates the need for clinical evaluation.', cta: 'Please consult a specialist as soon as possible. At NPMC, we are ready to help you.' };
        return             { level: 'Severe depression',             band: 'red',    desc: 'Symptoms are serious. Please seek specialist help immediately.', cta: 'Please contact us today. NPMC is available for an urgent consultation.' };
      },
    },

    gad7: {
      name: 'GAD-7',
      title: 'GAD-7 — Anxiety Screening',
      source: 'Generalized Anxiety Disorder-7 (Spitzer et al., 2006)',
      preamble: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      options: ['Not at all', 'Several days', 'More than\nhalf the days', 'Nearly\nevery day'],
      values: [0, 1, 2, 3],
      questions: [
        'Feeling nervous, anxious, or on edge.',
        'Not being able to stop or control worrying.',
        'Worrying too much about different things.',
        'Trouble relaxing.',
        'Being so restless that it is hard to sit still.',
        'Becoming easily annoyed or irritable.',
        'Feeling afraid, as if something awful might happen.',
      ],
      score(total) {
        if (total <= 4)  return { level: 'Minimal anxiety',  band: 'green',  desc: 'Anxiety symptoms are minimal. This is a good score.', cta: 'We recommend a Brain Check for preventive purposes.' };
        if (total <= 9)  return { level: 'Mild anxiety',     band: 'yellow', desc: 'Mild anxiety symptoms were detected. They may have some impact on daily life.', cta: 'We recommend a consultation. At NPMC, neurofeedback is an effective tool against anxiety.' };
        if (total <= 14) return { level: 'Moderate anxiety', band: 'orange', desc: 'Anxiety symptoms are noticeable. Clinical evaluation is recommended.', cta: 'A specialist visit is important. NPMC offers a QEEG + TMS + Neurofeedback protocol.' };
        return             { level: 'Severe anxiety',        band: 'red',    desc: 'Anxiety symptoms are serious. Please consult a specialist.', cta: 'Please contact us — NPMC is ready to help you.' };
      },
    },

    asrs: {
      name: 'ASRS-v1.1',
      title: 'ASRS-v1.1 — ADHD Screening',
      source: 'Adult ADHD Self-Report Scale v1.1, Part A (WHO/Kessler et al., 2005)',
      preamble: 'Over the past 6 months, how often have you...',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'],
      values: [0, 1, 2, 3, 4],
      // Part A scoring: Q1-3 positive if ≥2 (Sometimes+); Q4-6 positive if ≥3 (Often+)
      thresholds: [2, 2, 2, 3, 3, 3],
      questions: [
        'Had trouble wrapping up the final details of a project, once the challenging parts have been done?',
        'Had difficulty getting things in order when you have to do a task that requires organization?',
        'Had problems remembering appointments or obligations?',
        'When a task requires a lot of mental effort, how often do you avoid or delay getting started?',
        'Fidgeted or squirmed with your hands or feet when you had to sit down for a long time?',
        'Felt overly active and compelled to do things, as if you were driven by a motor and couldn\'t stop?',
      ],
      score(_total, raw) {
        // raw = array of answer values per question
        const thresholds = [2, 2, 2, 3, 3, 3];
        const positives = raw.filter((v, i) => v >= thresholds[i]).length;
        if (positives >= 4) {
          return { level: 'Consistent with ADHD symptoms', band: 'orange', desc: `${positives} out of 6 questions answered positively. This result indicates high consistency with adult ADHD.`, cta: 'QEEG diagnostics + neurofeedback is one of the most research-supported methods for ADHD. NPMC will prepare an individualized plan for you.' };
        }
        return { level: 'ADHD symptoms less pronounced', band: 'green', desc: `${positives} out of 6 questions answered positively. Symptoms are below the threshold characteristic of ADHD.`, cta: 'If you still have questions about attention and focus, a Brain Check at NPMC will help you find answers.' };
      },
    },
    cbi: {
      name: 'CBI',
      title: 'CBI — Burnout Screening',
      source: 'Copenhagen Burnout Inventory — Personal & Work Burnout (Kristensen et al., 2005)',
      preamble: 'Over the past 4 weeks, how often have you experienced the following?',
      options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
      values: [4, 3, 2, 1, 0],
      questions: [
        'Do you feel physically fatigued?',
        'Do you feel emotionally exhausted?',
        'Do you feel weak and heavy throughout your body?',
        'Do you find it hard to carry out your daily tasks?',
        'Do you find yourself thinking "I can\'t take it anymore" or "I can\'t cope"?',
        'Does your work or daily obligations leave you feeling drained?',
        'After a working day, do you find it difficult to rest and switch to other activities?',
        'Does your field of work seem increasingly monotonous and exhausting?',
        'Has the enthusiasm you once had diminished?',
        'Do you feel that your energy has been completely depleted?',
      ],
      score(total) {
        if (total <= 10) return { level: 'No burnout detected', band: 'green',  desc: 'Burnout symptoms are minimal. Your energy balance is in good shape.', cta: 'We recommend a Brain Check to assess your brain\'s functional potential.' };
        if (total <= 20) return { level: 'Mild burnout',        band: 'yellow', desc: 'Symptoms of physical or emotional fatigue were detected. Some attention would be beneficial.', cta: 'Neurofeedback is an effective tool for stress regulation. NPMC will prepare an individualized plan for you.' };
        if (total <= 30) return { level: 'Moderate burnout',    band: 'orange', desc: 'Burnout symptoms are significant. Daily functioning may be affected.', cta: 'Clinical evaluation is recommended. NPMC offers a QEEG + TMS + Neurofeedback protocol.' };
        return             { level: 'Severe burnout',           band: 'red',    desc: 'Burnout symptoms are serious. Please do not delay visiting a specialist.', cta: 'Please contact us. NPMC is ready to help you.' };
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
      errorMsg.textContent = 'Please fill in your first name, last name, email, and phone number.';
      errorMsg.classList.add('visible');
      return;
    }

    const raw = getAnswers(activeTest);
    if (!raw) {
      errorMsg.textContent = 'Please answer all questions.';
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
        ? '✓ Results sent successfully. We will contact you.'
        : 'Sending failed. Please contact us directly.';
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
