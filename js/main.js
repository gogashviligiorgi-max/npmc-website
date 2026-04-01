/* ============================================================
   NPMC — Main JavaScript
   ============================================================ */

// ---- NAV SCROLL EFFECT ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- MOBILE BURGER MENU ----
const burger = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ---- FADE-UP ANIMATIONS ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ---- METHODS TABS ----
const tabs = document.querySelectorAll('.methods__tab');
const panels = document.querySelectorAll('.methods__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const panel = document.getElementById('tab-' + target);
    if (panel) {
      panel.classList.add('active');
      // Animate cards inside
      panel.querySelectorAll('.methods__detail-card, .methods__panel-intro').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }
  });
});

// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq__answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq__item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq__answer').classList.remove('open');
      i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ---- CONDITION MODAL ----
const conditionData = {
  adhd: {
    title: 'ADHD',
    subtitle: 'ყურადღების დეფიციტი და ჰიპერაქტივობა',
    icon: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5"/><path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="20" cy="20" r="3" fill="currentColor"/></svg>`,
    description: 'ADHD (Attention Deficit Hyperactivity Disorder) — ნეიროლოგიური განვითარების აშლილობა, რომელიც გავლენას ახდენს ყურადღებაზე, იმპულსის კონტროლსა და აქტივობის დონეზე. გვხვდება ბავშვებსა და მოზრდილებში. ხშირად მკურნალობა მხოლოდ მედიკამენტით ნაწილობრივ ეფექტურია.',
    symptoms: ['სირთულე ფოკუსის შენარჩუნებასა', 'იმპულსური გადაწყვეტილებები', 'ჰიპერაქტივობა ან ქოშინი', 'ორგანიზაციის სირთულე', 'დავიწყება, ყოველდღიური ამოცანების ჩავარდნა'],
    qeeg: [
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'მომატებული ფრონტალურ ზონაში — კლასიკური ADHD ნიმუში' },
      { name: 'Beta', hz: '13–30 Hz', status: 'low', desc: 'შემცირებული — ყურადღებისა და ფოკუსის დეფიციტი' },
      { name: 'Alpha', hz: '8–12 Hz', status: 'normal', desc: 'ხშირად ნორმაში, ან მსუბუქი ასიმეტრია' },
      { name: 'Delta', hz: '0.5–4 Hz', status: 'high', desc: 'ზოგჯერ მომატებული — ფრონტალური ჰიპოაქტივაცია' }
    ],
    treatment: 'ნეიროფიდბექი ADHD-ის ერთ-ერთი ყველაზე კარგად შესწავლილი გამოყენებაა — 50+ წელია კვლევა. TMS ფრონტალური Beta-ს გასაძლიერებლად. QEEG Theta/Beta ratio-ს ობიექტური გაზომვა — და შემდეგ მიზნობრივი ნეიროფიდბექი.'
  },
  depression: {
    title: 'დეპრესია',
    subtitle: 'კლინიკური დეპრესია, მათ შორის მედიკამენტ-რეზისტენტული ფორმები',
    icon: `<svg viewBox="0 0 40 40" fill="none"><path d="M20 8c-6.6 0-12 5.4-12 12 0 3.5 1.5 6.6 3.8 8.8L10 32h8c.7.2 1.3.3 2 .3 6.6 0 12-5.4 12-12S26.6 8 20 8z" stroke="currentColor" stroke-width="1.5"/></svg>`,
    description: 'კლინიკური დეპრესია — ტვინის ქიმიისა და ელექტრული ნიმუშების დარღვევა. ტრადიციული მიდგომა (ანტიდეპრესანტები) ეხმარება ~50%-ს. დანარჩენებისთვის — ტვინის ნეიოლოგიური ნიმუშის პირდაპირი ცვლა საჭიროა.',
    symptoms: ['მუდმივი სევდა, სიცარიელე', 'ინტერესის, სიამოვნების დაკარგვა', 'ენერგიის ნაკლებობა, დაღლილობა', 'ძილის დარღვევა', 'კონცენტრაციის სირთულე', 'სომატური ჩივილები'],
    qeeg: [
      { name: 'Alpha', hz: '8–12 Hz', status: 'high', desc: 'ასიმეტრია: მარჯვენა ფრონტალური ჭარბი vs მარცხენა — კლასიკური დეპრესიის ნიმუში' },
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'გაზრდილი ანტერიორულ ზონაში — მუმინაციის (rumination) კავშირი' },
      { name: 'Beta', hz: '13–30 Hz', status: 'low', desc: 'შემცირებული — ენერგიის, მოტივაციის დეფიციტი' },
      { name: 'Delta', hz: '0.5–4 Hz', status: 'normal', desc: 'ძირითადად ნორმაში, თუ ძილი ძლიერ დარღვეული არ არის' }
    ],
    treatment: 'TMS — FDA-დამტკიცებული დეპრესიის მკურნალობისთვის. მარცხენა DLPFC-ის სტიმულაცია Alpha ასიმეტრიის გამოსასწორებლად. QEEG-ზე მორგებული პროტოკოლი — სადაც ზუსტად გვჭირდება, იქ ვმოქმედებთ.'
  },
  anxiety: {
    title: 'შფოთვა',
    subtitle: 'გენერალიზებული შფოთვის აშლილობა (GAD), სოციალური შფოთვა',
    icon: `<svg viewBox="0 0 40 40" fill="none"><path d="M20 6v4M32 20h-4M8 20H4M28.5 11.5l-2.8 2.8M14.3 25.7l-2.8 2.8M28.5 28.5l-2.8-2.8M14.3 14.3l-2.8-2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="20" cy="20" r="7" stroke="currentColor" stroke-width="1.5"/></svg>`,
    description: 'შფოთვის აშლილობა — ტვინის ჰიპერ-ვიგილანტური მდგომარეობა. ამიგდალა (შიშის ცენტრი) ქრონიკულად გადააქტიურებულია, Alpha ბარიერი — სუსტი. ადამიანი "საფრთხეს" ხედავს მაშინაც, როდესაც საფრთხე არ არსებობს.',
    symptoms: ['მუდმივი, გაუკონტროლებელი შეშფოთება', 'მუდმივი კუნთური დაძაბულობა', 'ძილის სირთულე', 'ფიზიკური სიმპტომები: გულის ცემა, ოფლიანობა', 'კონცენტრაციის სირთულე'],
    qeeg: [
      { name: 'Beta', hz: '13–30 Hz', status: 'high', desc: 'მომატებული ფრონტალურ და ცენტრალურ ზონებში — ჰიპერ-ვიგილანსი' },
      { name: 'High Beta', hz: '20–30 Hz', status: 'high', desc: 'განსაკუთრებით მომატებული — "არ მახსოვს გამოსვლა" ეფექტი' },
      { name: 'Alpha', hz: '8–12 Hz', status: 'low', desc: 'შემცირებული — სიმშვიდის დეფიციტი, Alpha-ს ბარიერი სუსტი' },
      { name: 'Theta', hz: '4–8 Hz', status: 'normal', desc: 'ძირითადად ნორმაში, ან მსუბუქი გადახრა' }
    ],
    treatment: 'ნეიროფიდბექი Alpha-ს გამაძლიერებელი პროტოკოლით — ტვინს ვასწავლით სიმშვიდე. TMS ფრონტალური Beta-ს შესამცირებლად. Alpha/Beta თანაფარდობის ნორმალიზება QEEG კონტროლით.'
  },
  panic: {
    title: 'პანიკური შეტევები',
    subtitle: 'მწვავე პანიკური ეპიზოდები, ავტონომიური სისტემის დისრეგულაცია',
    icon: `<svg viewBox="0 0 40 40" fill="none"><path d="M8 20h6l3-6 5 12 3-8 3 6h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    description: 'პანიკური შეტევა — ტვინის ემოციური სისტემის მოულოდნელი გადატვირთვა. ამიგდალა "სიგნალ" გაშვებს, ფრონტალური კორტექსი ვერ ახდენს მის ჩაქრობას. ადამიანი ფიზიკურ "კვდომას" გრძნობს — რეალური ბიოქიმიური პროცესია.',
    symptoms: ['მოულოდნელი გულის ცემის გაჩქარება', 'სუნთქვის გაძნელება, ქოშინი', 'გულის სისპეტე, ან ტკივილი', 'თავბრუსხვევა, არარეალობის შეგრძნება', 'სიკვდილის ან "გახელის" შიში'],
    qeeg: [
      { name: 'High Beta', hz: '20–30 Hz', status: 'high', desc: 'ძლიერ მომატებული — ამიგდალა ჰიპერაქტიურია' },
      { name: 'Alpha', hz: '8–12 Hz', status: 'low', desc: 'ბლოკირებული — ფრონტალური კონტროლი სუსტი' },
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'ზოგჯერ მომატებული ამიგდალის ზონაში' },
      { name: 'Beta', hz: '13–20 Hz', status: 'high', desc: 'ჭარბი — ჰიპერ-ვიგილანტური მდგომარეობა' }
    ],
    treatment: 'TMS Alpha-ს გასაძლიერებლად და High Beta-ს შესამცირებლად. ნეიროფიდბექი Alpha Theta პროტოკოლით — ღრმა რელაქსაციის ნეიოლოგიური სწავლება. QEEG-ი ამა და თვით მდგომარეობის ობიექტური ზომვა.'
  },
  ocd: {
    title: 'OCD',
    subtitle: 'ობსესიურ-კომპულსიური აშლილობა',
    icon: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="1.5"/><path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" stroke="currentColor" stroke-width="1.5"/></svg>`,
    description: 'OCD — ტვინის ფრონტო-სტრიატო-თალამური წრის ჰიპერაქტივობა. ობსესიური ფიქრები "წრიულ" ნიმუშს ქმნის — ტვინი ვერ "ჩახერგავს" ამ ციკლს. TMS OCD-ის ერთ-ერთი ყველაზე კარგად შესწავლილი გამოყენებაა — FDA-დამტკიცებული.',
    symptoms: ['განმეორებადი, გაუკონტროლებელი ფიქრები', 'კომპულსიური რიტუალები', 'სიმეტრიის, სიწმინდის, კონტროლის ობსესია', 'შფოთვა, თუ რიტუალი არ სრულდება', 'ყოველდღიური ფუნქციონირების დარღვევა'],
    qeeg: [
      { name: 'Beta', hz: '13–30 Hz', status: 'high', desc: 'ჭარბი ფრონტო-ცენტრალურ ზონაში — ობსესიური ციკლი' },
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'მომატებული — ობსესიური ფიქრების "ჩაკეტვა"' },
      { name: 'Alpha', hz: '8–12 Hz', status: 'low', desc: 'შემცირებული — სიმშვიდის, "გაუშვების" სიძნელე' },
      { name: 'Gamma', hz: '30–100 Hz', status: 'high', desc: 'ჭარბი — ჰიპერ-სინქრონია ბაზალური განგლია-ფრონტალურ ქსელში' }
    ],
    treatment: 'TMS — FDA-დამტკიცებული OCD-ისთვის. Supplementary Motor Area (SMA) სტიმულაცია კომპულსიური ქცევის შესამცირებლად. ნეიროფიდბექი Alpha გაძლიერებით — ფიქრების "გაუშვება". QEEG კავშირის ანალიზი — ზუსტი სამიზნე.'
  },
  sleep: {
    title: 'ძილის პრობლემები',
    subtitle: 'ინსომნია, ქრონიკული დაღლილობა, ძილის ხარისხის დარღვევა',
    icon: `<svg viewBox="0 0 40 40" fill="none"><path d="M20 8c-1 4-4 6-6 10a10 10 0 1 0 12 0c-2-4-5-6-6-10z" stroke="currentColor" stroke-width="1.5"/></svg>`,
    description: 'ძილის დარღვევა ხშირად ტვინის ელექტრული ნიმუშის პრობლემაა — არა მხოლოდ სტრესი ან ჩვევა. Delta ტალღების დეფიციტი ღრმა ძილის ფაზაში, Beta ჭარბი ღამით — ტვინი ვერ "გამორთვას" ახდენს.',
    symptoms: ['სირთულე დაძინებაში', 'ხშირი გამოღვიძება ღამით', 'არ ეძინება, ადრე იღვიძებს', 'დილით დაღლილობა', 'ქრონიკული სისუსტე, ნისლი'],
    qeeg: [
      { name: 'Beta', hz: '13–30 Hz', status: 'high', desc: 'ჭარბი ფრონტალურ ზონაში — "ჩართული" ტვინი, ვერ გამორთვა' },
      { name: 'Delta', hz: '0.5–4 Hz', status: 'low', desc: 'შემცირებული — ღრმა ძილის ფაზა სუსტი, ორგანიზმი ვერ აღდგება' },
      { name: 'Alpha', hz: '8–12 Hz', status: 'low', desc: 'Alpha-Delta ბარიერი სუსტი — ძილი ზედაპირული' },
      { name: 'Theta', hz: '4–8 Hz', status: 'normal', desc: 'ნორმაში ან ოდნავ შემცირებული — ძილ-ბიდუბუ გადასვლა შეფერხებული' }
    ],
    treatment: 'ნეიროფიდბექი Delta/Theta პროტოკოლით — ტვინს ვასწავლით ღრმა ძილი. Alpha Theta Training — სიღრმისეული რელაქსაცია. TMS Beta-ს შესამცირებლად. PEMF თერაპია — ელექტრომაგნიტური ველი ძილის ხარისხზე.'
  },
  ptsd: {
    title: 'PTSD / ტრავმა',
    subtitle: 'პოსტტრავმული სტრესის აშლილობა',
    icon: `<svg viewBox="0 0 40 40" fill="none"><path d="M20 10l-8 14h16L20 10z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 18v4M20 25v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    description: 'PTSD — ტრავმული მოვლენის შემდეგ ტვინი "ჩარჩება" საფრთხის რეჟიმში. ამიგდალა გადააქტიურებულია, ჰიპოკამპუსი — სუსტი. ტრავმის ხსოვნა ვერ "ინტეგრირდება". ეს ბიოლოგიური, არა "სუსტი ნება" — ტვინის სტრუქტურული ცვლილებაა.',
    symptoms: ['ფლეშბექი, კოშმარები', 'ჰიპერ-ვიგილანსი, შეშინებება', 'ემოციური გაყინვა, გაუცხოება', 'სიხარულის გრძნობის უუნარობა', 'ტრიგერები — მოვლენების მოხსენება'],
    qeeg: [
      { name: 'Alpha', hz: '8–12 Hz', status: 'low', desc: 'ასიმეტრია — მარჯვენა ჰიპოაქტიური, მარცხენა ჭარბი. ტრავმის კლასიკური ნიმუში' },
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'ჭარბი — ტრავმული ხსოვნის "ჩარჩება", განმეორება' },
      { name: 'High Beta', hz: '20–30 Hz', status: 'high', desc: 'ძლიერ მომატებული — ქრონიკული ჰიპერ-ვიგილანსი' },
      { name: 'Delta', hz: '0.5–4 Hz', status: 'normal', desc: 'ნორმაში, ან შეფერხება ღრმა ძილში' }
    ],
    treatment: 'ნეიროფიდბექი Alpha Theta პროტოკოლი — PTSD-ის ყველაზე კარგად შესწავლილი ნეიოფიდბექ გამოყენება. EMDR + QEEG-ზე მორგებული ფსიქოთერაპია. TMS Alpha ასიმეტრიის გამოსასწორებლად. კომბინირებული კურსი — ყველა სტრუქტურული დარღვევის ერთდროული მხედველობა.'
  },
  phobia: {
    title: 'ფობიები',
    subtitle: 'სპეციფიური ფობიები, სოციალური ფობია, შიშის სისტემის ნეიოლოგიური საფუძველი',
    icon: `<svg viewBox="0 0 40 40" fill="none"><rect x="10" y="8" width="20" height="24" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M15 16h10M15 21h10M15 26h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    description: 'ფობია — ამიგდალის ჰიპერ-რეაქცია კონკრეტულ სტიმულზე. ეს "სწავლა" ნეირონულ დონეზეა ჩაწერილი — ფრონტალური კორტექსი ვერ ახდენს ამის ლოგიკურ ჩაქრობას. QEEG ზუსტად ასახავს სად არის ეს ჰიპერ-რეაქცია.',
    symptoms: ['ინტენსიური, გაუკონტროლებელი შიში', 'სტიმულის თავიდან არიდება', 'ცოდნა, რომ შიში "ირაციონალურია" — მაგრამ ვერ გაქრება', 'ფიზიკური პანიკა კონტაქტისას', 'ყოველდღიური ცხოვრების შეზღუდვა'],
    qeeg: [
      { name: 'High Beta', hz: '20–30 Hz', status: 'high', desc: 'ჭარბი ფრონტო-ამიგდალა ქსელში — ჰიპერ-სენსიტიზაცია' },
      { name: 'Alpha', hz: '8–12 Hz', status: 'low', desc: 'ბლოკირებული — ფრონტალური "ჩამქრობი" სუსტი' },
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'ზოგჯერ მომატებული — ემოციური ხსოვნის სტრუქტურა' },
      { name: 'Beta', hz: '13–20 Hz', status: 'high', desc: 'ჭარბი — შფოთვა კონდიციონირებულ სტიმულთან' }
    ],
    treatment: 'ნეიროფიდბექი Alpha-ს გაძლიერებით — ტვინის "ჩამქრობი" სისტემის გაძლიერება. TMS ამიგდალა-ფრონტალური კავშირის ნორმალიზებისთვის. QEEG-ზე მორგებული ექსპოზიციური თერაპია — ფიზიოლოგიური პასუხის ობიექტური კონტროლით.'
  }
};

const conditionModal = document.getElementById('conditionModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

function openConditionModal(key) {
  const d = conditionData[key];
  if (!d) return;

  const wavesHTML = d.qeeg.map(w => `
    <div class="modal-wave-row">
      <span class="modal-wave-name">${w.name}</span>
      <span class="modal-wave-hz">${w.hz}</span>
      <span class="modal-wave-status modal-wave-status--${w.status}">${w.status === 'high' ? '↑ მომატებული' : w.status === 'low' ? '↓ შემცირებული' : '✓ ნორმა'}</span>
      <span class="modal-wave-desc">${w.desc}</span>
    </div>
  `).join('');

  const symptomsHTML = d.symptoms.map(s => `<li>${s}</li>`).join('');

  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-header__icon">${d.icon}</div>
      <div>
        <h2 id="modalTitle">${d.title}</h2>
        <p>${d.subtitle}</p>
      </div>
    </div>
    <div class="modal-section">
      <h4>რა არის?</h4>
      <p>${d.description}</p>
    </div>
    <div class="modal-section">
      <h4>ძირითადი სიმპტომები</h4>
      <ul>${symptomsHTML}</ul>
    </div>
    <div class="modal-qeeg">
      <h4>QEEG სურათი — ტვინში რას ვხედავთ</h4>
      ${wavesHTML}
    </div>
    <div class="modal-section">
      <h4>მკურნალობა NPMC-ში</h4>
      <p>${d.treatment}</p>
    </div>
    <div class="modal-cta">
      <a href="#contact" class="btn btn--primary" onclick="closeConditionModal()">დაჯავშნე კონსულტაცია</a>
      <a href="#pricing" class="btn btn--ghost" onclick="closeConditionModal()">ნახე ფასები</a>
    </div>
  `;

  conditionModal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeConditionModal() {
  conditionModal.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.condition-card--clickable').forEach(card => {
  card.addEventListener('click', () => openConditionModal(card.dataset.condition));
});

if (modalClose) modalClose.addEventListener('click', closeConditionModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeConditionModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !conditionModal.hidden) closeConditionModal();
});

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'იგზავნება...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('visible');
    }, 1200);
  });
}

// ---- SMOOTH ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const isDecimal = target.toString().includes(',');

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(ease * parseFloat(target.toString().replace(',', '.')));
    el.textContent = isDecimal ? value.toLocaleString() + suffix : value + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stats__number');
      nums.forEach(num => {
        const text = num.textContent;
        if (text.includes('+')) {
          animateCounter(num, text.replace('+', ''), '+');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);
