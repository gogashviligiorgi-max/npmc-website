/* NPMC — small labels the main translation file does not cover (added in the redesign).
   Elements carry data-tx="key"; text follows the language buttons (ka / en / ru). */
(function () {
  'use strict';
  const TX = {
    chatBtn:  { ka: 'ჩატი', en: 'Chat', ru: 'Чат' },
    statPers: { ka: 'პერსონალური', en: 'Personal', ru: 'Персонально' },
    statPain: { ka: 'უმტკივნეულო', en: 'Painless', ru: 'Безболезненно' },
    eegRec:   { ka: 'EEG ჩაწერა', en: 'EEG recording', ru: 'Запись ЭЭГ' },
    brainMap: { ka: 'ტვინის ციფრული რუკა', en: 'Digital brain map', ru: 'Цифровая карта мозга' },
    waTip:    { ka: 'WhatsApp-ზე დაწერე', en: 'Write on WhatsApp', ru: 'Написать в WhatsApp' },
    formNote: {
      ka: 'გაგზავნისას გაიხსნება WhatsApp. <a href="privacy.html" target="_blank" rel="noopener">კონფიდენციალურობის პოლიტიკა</a>',
      en: 'Sending opens WhatsApp. <a href="privacy.html" target="_blank" rel="noopener">Privacy policy</a>',
      ru: 'При отправке откроется WhatsApp. <a href="privacy.html" target="_blank" rel="noopener">Политика конфиденциальности</a>',
    },
  };
  function lang() {
    try { return localStorage.getItem('npmc-lang') || document.documentElement.lang || 'ka'; } catch (e) { return 'ka'; }
  }
  function apply() {
    const l = lang();
    document.querySelectorAll('[data-tx]').forEach((el) => {
      const v = TX[el.dataset.tx];
      if (v) el.innerHTML = v[l] || v.ka;
    });
  }
  document.addEventListener('click', (e) => { if (e.target.closest('.lang-btn')) setTimeout(apply, 80); });
  apply();
})();
