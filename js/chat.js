/* NPMC — website chat (replaces the WhatsApp button).
   Talks to n8n "NPMC - 13. Website Chat", the same assistant as Facebook / Instagram,
   in Georgian, English or Russian. The conversation lives only in this browser tab. */
(function () {
  'use strict';

  const ENDPOINT = 'https://primary-production-ec5ee.up.railway.app/webhook/npmc-site-chat';
  const STORE = 'npmc-chat-v1';
  const MAX_SENT = 12;          // messages sent with each question (the server keeps the same limit)
  const TIMEOUT_MS = 50000;

  const T = {
    ka: {
      title: 'NPMC ასისტენტი', status: 'ონლაინ · პასუხობს წამებში',
      hello: 'გამარჯობა! 👋 მე ვარ NPMC-ის ასისტენტი. მკითხეთ მეთოდებზე, ჩაწერაზე ან კლინიკაზე — ან მოგვწერეთ ნომერი და სპეციალისტი დაგიკავშირდებათ.',
      quick: ['რა სერვისები გაქვთ?', 'როგორ ჩავეწერო?', 'სად მდებარეობთ?'],
      placeholder: 'დაწერეთ შეტყობინება…', send: 'გაგზავნა', open: 'ჩატი', close: 'დახურვა',
      note: 'ავტომატური ასისტენტი · სამედიცინო რჩევას არ იძლევა · ნომრის მოწერით თანხმდებით, რომ დაგიკავშირდეთ. <a href="/privacy.html" target="_blank" rel="noopener">კონფიდენციალურობა</a>',
      error: 'ვერ დავუკავშირდი. სცადეთ თავიდან ან დაგვირეკეთ: +995 511 44 00 99',
      newChat: 'ახალი საუბარი',
    },
    en: {
      title: 'NPMC Assistant', status: 'Online · replies in seconds',
      hello: 'Hello! 👋 I am the NPMC assistant. Ask about our methods, booking or the clinic — or leave your phone number and a specialist will call you.',
      quick: ['What services do you offer?', 'How do I book?', 'Where are you located?'],
      placeholder: 'Write a message…', send: 'Send', open: 'Chat', close: 'Close',
      note: 'Automated assistant · no medical advice · by sharing your number you agree that we contact you. <a href="/privacy.html" target="_blank" rel="noopener">Privacy</a>',
      error: 'Could not connect. Please try again or call: +995 511 44 00 99',
      newChat: 'New chat',
    },
    ru: {
      title: 'Ассистент NPMC', status: 'Онлайн · отвечает за секунды',
      hello: 'Здравствуйте! 👋 Я ассистент NPMC. Спросите о методах, записи или клинике — или оставьте номер, и специалист вам перезвонит.',
      quick: ['Какие у вас услуги?', 'Как записаться?', 'Где вы находитесь?'],
      placeholder: 'Напишите сообщение…', send: 'Отправить', open: 'Чат', close: 'Закрыть',
      note: 'Автоматический ассистент · не даёт медицинских советов · оставляя номер, вы соглашаетесь, чтобы мы связались с вами. <a href="/privacy.html" target="_blank" rel="noopener">Конфиденциальность</a>',
      error: 'Не удалось подключиться. Попробуйте ещё раз или позвоните: +995 511 44 00 99',
      newChat: 'Новый чат',
    },
  };

  const ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z"/></svg>';
  const ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  const ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const ICON_NEW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';

  function lang() {
    let l = '';
    try { l = localStorage.getItem('npmc-lang') || ''; } catch (e) { /* storage blocked */ }
    l = l || document.documentElement.lang || 'ka';
    return T[l] ? l : 'ka';
  }
  const t = () => T[lang()];

  function load() {
    try {
      const s = JSON.parse(sessionStorage.getItem(STORE) || 'null');
      if (s && Array.isArray(s.messages) && typeof s.sid === 'string') return s;
    } catch (e) { /* ignore */ }
    return { sid: newSid(), messages: [] };
  }
  function save() {
    try { sessionStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  function newSid() {
    const a = new Uint8Array(9);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Bot text → safe HTML with clickable phone and site links.
  function format(text) {
    const esc = String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    return esc
      .replace(/(\+995[\d\s]{9,14}\d)/g, (m) => '<a href="tel:' + m.replace(/\s/g, '') + '">' + m + '</a>')
      .replace(/\b((?:https?:\/\/)?(?:www\.)?npmc\.ge(?:\/[\w\-./#?=&]*)?)/g, (m) => '<a href="' + (m.startsWith('http') ? m : 'https://' + m) + '" target="_blank" rel="noopener">' + m + '</a>')
      .replace(/\b(info@npmc\.ge)\b/g, '<a href="mailto:$1">$1</a>')
      .replace(/\n/g, '<br>');
  }

  let state = load();
  let busy = false;
  let fab, panel, list, input, sendBtn, quick;

  function build() {
    fab = document.createElement('button');
    fab.type = 'button';
    fab.id = 'chatFab';
    fab.className = 'chat-fab';
    fab.innerHTML = ICON_CHAT + '<span class="chat-fab__label"></span>';
    document.body.appendChild(fab);

    panel = document.createElement('section');
    panel.id = 'chatPanel';
    panel.className = 'chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.hidden = true;
    panel.innerHTML =
      '<header class="chat-head">' +
        '<div class="chat-avatar" aria-hidden="true">N</div>' +
        '<div class="chat-head__text"><strong class="chat-title"></strong><span class="chat-status"><i></i><span></span></span></div>' +
        '<button type="button" class="chat-icon-btn chat-new">' + ICON_NEW + '</button>' +
        '<button type="button" class="chat-icon-btn chat-close">' + ICON_X + '</button>' +
      '</header>' +
      '<div class="chat-list" aria-live="polite"></div>' +
      '<div class="chat-quick"></div>' +
      '<form class="chat-form" autocomplete="off">' +
        '<textarea class="chat-input" rows="1" maxlength="800"></textarea>' +
        '<button type="submit" class="chat-send">' + ICON_SEND + '</button>' +
      '</form>' +
      '<p class="chat-note"></p>';
    document.body.appendChild(panel);

    list = panel.querySelector('.chat-list');
    input = panel.querySelector('.chat-input');
    sendBtn = panel.querySelector('.chat-send');
    quick = panel.querySelector('.chat-quick');

    fab.addEventListener('click', () => (panel.hidden ? open() : close()));
    panel.querySelector('.chat-close').addEventListener('click', close);
    panel.querySelector('.chat-new').addEventListener('click', () => {
      if (busy) return;
      state = { sid: newSid(), messages: [] };
      save();
      render();
      input.focus();
    });
    panel.querySelector('.chat-form').addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
    });
    input.addEventListener('input', grow);
    quick.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b) send(b.textContent);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
    document.addEventListener('click', (e) => {
      const opener = e.target.closest('[data-chat-open]');
      if (opener) { e.preventDefault(); open(); }
      if (e.target.closest('.lang-btn')) setTimeout(labels, 120);
    });
    labels();
    render();
  }

  function labels() {
    const L = t();
    fab.setAttribute('aria-label', L.open);
    fab.querySelector('.chat-fab__label').textContent = L.open;
    panel.setAttribute('aria-label', L.title);
    panel.querySelector('.chat-title').textContent = L.title;
    panel.querySelector('.chat-status span').textContent = L.status;
    panel.querySelector('.chat-close').setAttribute('aria-label', L.close);
    panel.querySelector('.chat-new').setAttribute('aria-label', L.newChat);
    panel.querySelector('.chat-new').title = L.newChat;
    input.placeholder = L.placeholder;
    input.setAttribute('aria-label', L.placeholder);
    sendBtn.setAttribute('aria-label', L.send);
    panel.querySelector('.chat-note').innerHTML = L.note;
    render();
  }

  function bubble(role, html, extra) {
    const d = document.createElement('div');
    d.className = 'chat-msg chat-msg--' + role + (extra ? ' ' + extra : '');
    d.innerHTML = html;
    list.appendChild(d);
    return d;
  }

  function render() {
    const L = t();
    list.innerHTML = '';
    bubble('bot', format(L.hello));
    state.messages.forEach((m) => bubble(m.role === 'user' ? 'user' : 'bot', format(m.content)));
    quick.innerHTML = state.messages.length ? '' : L.quick.map((q) => '<button type="button">' + q + '</button>').join('');
    quick.hidden = !!state.messages.length;
    list.scrollTop = list.scrollHeight;
  }

  function grow() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }

  function open() {
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    document.documentElement.classList.add('chat-open');
    fab.setAttribute('aria-expanded', 'true');
    list.scrollTop = list.scrollHeight;
    if (window.matchMedia('(min-width: 601px)').matches) input.focus();
  }

  function close() {
    panel.classList.remove('is-open');
    document.documentElement.classList.remove('chat-open');
    fab.setAttribute('aria-expanded', 'false');
    setTimeout(() => { if (!panel.classList.contains('is-open')) panel.hidden = true; }, 260);
  }

  async function send(raw) {
    const text = String(raw || '').trim().slice(0, 800);
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    input.value = '';
    grow();
    state.messages.push({ role: 'user', content: text });
    save();
    quick.hidden = true;
    bubble('user', format(text));
    const typing = bubble('bot', '<span></span><span></span><span></span>', 'chat-typing');
    list.scrollTop = list.scrollHeight;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: lang(), sid: state.sid, messages: state.messages.slice(-MAX_SENT) }),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const reply = data && typeof data.reply === 'string' && data.reply.trim();
      if (!reply) throw new Error('empty reply');
      state.messages.push({ role: 'assistant', content: reply });
      save();
      typing.remove();
      bubble('bot', format(reply));
    } catch (err) {
      typing.remove();
      bubble('bot', format(t().error), 'chat-msg--error');
      // The question stays in the history only if it was answered.
      state.messages.pop();
      save();
    } finally {
      clearTimeout(timer);
      busy = false;
      sendBtn.disabled = false;
      list.scrollTop = list.scrollHeight;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
