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

// Close menu when a link is clicked (mobile fix: manual scroll after menu closes)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      navMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      navMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
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

// ---- TEAM MODAL ----
const teamData = {
  gg: {
    initials: 'GG',
    name: 'George Gogashvili',
    role: 'ნეიროფსიქომოდულაციის დირექტორი',
    content: `
      <div class="modal-section">
        <p>ნეიროფსიქომოდულაციის ცენტრის დირექტორი. სპეციალიზება: QEEG ანალიზი, TMS პროტოკოლი, ნეიროფიდბექი. საქართველოში ამ მეთოდის პიონერი. 10+ წლიანი გამოცდილება.</p>
      </div>
      <div class="modal-section">
        <h4>სერტიფიკაციები</h4>
        <ul><li>QEEG სპეციალისტი</li><li>TMS სერტიფიცირებული</li><li>ნეიროფიდბექი</li></ul>
      </div>
    `
  },
  am: {
    initials: 'AM',
    name: 'Dr. Aza Mantasashvili (MD, M.S.)',
    role: 'ნეიროფსიქოთერაპევტი | Mental Azademy-ს დამფუძნებელი',
    content: `
      <div class="modal-section">
        <p>Dr. აზა მანთაშაშვილი წარმოადგენს ნეირომეცნიერებაზე დაფუძნებული ინტეგრაციული მენტალური ჯანმრთელობის მიმართულების წამყვან სპეციალისტს. მისი საქმიანობა აერთიანებს კლასიკურ მედიცინას, ფსიქოლოგიასა და თანამედროვე ნეირომოდულაციურ ტექნოლოგიებს.</p>
        <p><em>მისი პროფესიული ფილოსოფია მარტივია: მენტალური ჯანმრთელობის საფუძველი ტვინის ფუნქციური რეგულაციაა.</em></p>
      </div>
      <div class="modal-section">
        <h4>🛡️ პროფესიული გამოცდილება</h4>
        <ul>
          <li>ექიმი (MD) — თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი</li>
          <li>M.S. კლინიკური მენტალური ჯანმრთელობის კონსულტირებაში — Capella University (USA)</li>
          <li>ნეიროფიდბექის დირექტორი (ნიუ-იორკი)</li>
          <li>Mental Azademy-ს დამფუძნებელი (ნიუ-იორკი და თბილისი)</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>🧬 მეთოდოლოგია: Neuropsychomodulation Therapy (NPMT)</h4>
        <ul>
          <li>QEEG Brain Mapping — ტვინის ფუნქციური დიაგნოსტიკა და "რუკის" შექმნა</li>
          <li>Neurofeedback — ტვინის თვითრეგულაციის სწავლება და ტრენინგი</li>
          <li>Neuromodulation — არაინვაზიური ტექნოლოგიები: TMS, tDCS და PEMF</li>
          <li>Evidence-based Psychotherapy — მტკიცებულებებზე დაფუძნებული თერაპია (CBT)</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>📑 კლინიკური ინტერესის სფეროები</h4>
        <ul>
          <li>დეპრესია და შფოთვითი აშლილობები</li>
          <li>ADHD (ყურადღების დეფიციტისა და ჰიპერაქტივობის სინდრომი)</li>
          <li>OCD (ობსესიურ-კომპულსიური აშლილობა)</li>
          <li>ძილის დარღვევები და სტრესული მდგომარეობები</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>💡 პროფესიული ხედვა</h4>
        <p>„მენტალური ჯანმრთელობის პრობლემები ხშირად ტვინის აქტივობის დისბალანსის შედეგია. ჩვენი მიზანია არა მხოლოდ სიმპტომების შემცირება, არამედ ტვინის ფუნქციური მდგომარეობის ღრმა და მდგრადი ცვლილება ნეიროპლასტიურობის პრინციპების გამოყენებით."</p>
      </div>
      <div class="modal-section">
        <h4>✨ რატომ უნდა აირჩიოთ ჩვენი ცენტრი?</h4>
        <ul>
          <li><strong>ობიექტურობა:</strong> ტვინის აქტივობა არის გაზომვადი (QEEG)</li>
          <li><strong>ინდივიდუალიზმი:</strong> ყოველი მკურნალობის გეგმა იქმნება პაციენტის ტვინის "რუკის" მიხედვით</li>
          <li><strong>ინოვაცია:</strong> თანამედროვე, არაინვაზიური და სრულიად უსაფრთხო ტექნოლოგიები</li>
          <li><strong>საერთაშორისო სტანდარტი:</strong> ამერიკული გამოცდილება და სამეცნიერო მიდგომა</li>
        </ul>
      </div>
      <div class="modal-section">
        <p><em>მომავალი ნეირომეცნიერებაშია.</em></p>
      </div>
    `
  }
};

const teamModal = document.getElementById('teamModal');
const teamModalBody = document.getElementById('teamModalBody');
const teamModalClose = document.getElementById('teamModalClose');
const teamModalOverlay = document.getElementById('teamModalOverlay');

function openTeamModal(key) {
  const d = teamData[key];
  if (!d) return;
  teamModalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-header__icon" style="font-size:1.4rem;font-weight:700;color:var(--accent)">${d.initials}</div>
      <div>
        <h2 id="teamModalTitle">${d.name}</h2>
        <p>${d.role}</p>
      </div>
    </div>
    ${d.content}
    <div class="modal-cta">
      <a href="#contact" class="btn btn--primary" onclick="closeTeamModal()">დაჯავშნე კონსულტაცია</a>
    </div>
  `;
  teamModal.hidden = false;
  document.body.style.overflow = 'hidden';
  teamModalClose.focus();
}

function closeTeamModal() {
  teamModal.hidden = true;
  document.body.style.overflow = '';
}

if (teamModalClose) teamModalClose.addEventListener('click', closeTeamModal);
if (teamModalOverlay) teamModalOverlay.addEventListener('click', closeTeamModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && teamModal && !teamModal.hidden) closeTeamModal();
});

// ---- CONDITION MODAL ----
const conditionData = {
  adhd: {
    title: 'ADHD',
    subtitle: 'ყურადღების დეფიციტისა და ჰიპერაქტივობის სინდრომი',
    icon: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5"/><path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="20" cy="20" r="3" fill="currentColor"/></svg>`,
    description: 'ADHD (Attention Deficit Hyperactivity Disorder) — ნეიროგანვითარების აშლილობაა, რომელიც გავლენას ახდენს ყურადღების კონცენტრაციაზე, იმპულსების კონტროლსა და ფიზიკური აქტივობის დონეზე. ის გვხვდება როგორც ბავშვებში, ისე მოზრდილებში. ხშირ შემთხვევაში, მხოლოდ მედიკამენტური მკურნალობა ნაწილობრივ ეფექტურია, რადგან ის სიმპტომებს ნიღბავს, მაგრამ არ ცვლის ტვინის მუშაობის პატერნს.',
    symptoms: ['ფოკუსის შენარჩუნების სირთულე და ყურადღების გაფანტულობა', 'იმპულსური გადაწყვეტილებები და ქცევები', 'ფიზიკური ჰიპერაქტივობა ან შინაგანი მოუსვენრობა', 'დროის მართვისა და ორგანიზების პრობლემები', 'გულმავიწყობა და ყოველდღიური ამოცანების შესრულების სირთულე'],
    qeeg: [
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'ჭარბი აქტივობა ფრონტალურ ზონაში — კლასიკური ADHD ნიმუში' },
      { name: 'Beta', hz: '13–30 Hz', status: 'low', desc: 'დეფიციტი შუბლის წილში, რაც იწვევს ფოკუსირების სირთულეს' },
      { name: 'Alpha', hz: '8–12 Hz', status: 'normal', desc: 'ხშირად ნორმის ფარგლებშია, ზოგჯერ ვლინდება მსუბუქი ასიმეტრია' },
      { name: 'Delta', hz: '0.5–4 Hz', status: 'high', desc: 'ზოგჯერ მომატებულია, რაც მიუთითებს ფრონტალურ ჰიპოაქტივაციაზე' }
    ],
    treatment: 'ნეიროფიდბექი — ADHD-ის მკურნალობის ერთ-ერთი ყველაზე კარგად შესწავლილი მეთოდი, 50-წლიანი კვლევითი ბაზით. TMS — ფრონტალური Beta-ტალღების გასაძლიერებლად, გონებრივი სიმკვეთრისა და მობილიზებისთვის. Theta/Beta ratio-ს ობიექტური გაზომვა QEEG-ით — ინდივიდუალური, მიზნობრივი თერაპიის გეგმა.'
  },
  depression: {
    title: 'დეპრესია',
    subtitle: 'კლინიკური დეპრესია და მედიკამენტ-რეზისტენტული ფორმები',
    icon: `<svg viewBox="0 0 40 40" fill="none"><path d="M20 8c-6.6 0-12 5.4-12 12 0 3.5 1.5 6.6 3.8 8.8L10 32h8c.7.2 1.3.3 2 .3 6.6 0 12-5.4 12-12S26.6 8 20 8z" stroke="currentColor" stroke-width="1.5"/></svg>`,
    description: 'კლინიკური დეპრესია არ არის უბრალოდ „ცუდი განწყობა" — ეს არის თავის ტვინის ბიოქიმიური და ელექტრული აქტივობის კომპლექსური დარღვევა. ტრადიციული მიდგომა (ანტიდეპრესანტები) პაციენტების მხოლოდ დაახლოებით 50%-ს ეხმარება. მათთვის კი, ვისზეც მედიკამენტები არ მოქმედებს, აუცილებელია ტვინის ნეირონული ნიმუშების პირდაპირი, მიზნობრივი კორექცია.',
    symptoms: [
      'მუდმივი სევდა, სიცარიელის შეგრძნება და სასოწარკვეთა',
      'ინტერესის დაკარგვა იმ აქტივობების მიმართ, რაც ადრე სიამოვნებას განიჭებდათ',
      'ენერგიის მკვეთრი დაქვეითება და ქრონიკული დაღლილობა',
      'ძილის დარღვევები (ინსომნია ან პირიქით — ზედმეტი ძილიანობა)',
      'კონცენტრაციის სირთულე და გადაწყვეტილების მიღების გაძნელება',
      'სომატური ჩივილები (უხსნელი ტკივილები, სიმძიმე სხეულში)'
    ],
    qeeg: [
      { name: 'Alpha', hz: '8–12 Hz', status: 'high', desc: 'ასიმეტრია: მარჯვენა ფრონტალური აქტივობის სიჭარბე მარცხენასთან შედარებით — კლასიკური დეპრესიის ნიშანი' },
      { name: 'Theta', hz: '4–8 Hz', status: 'high', desc: 'მატება ანტერიორულ (წინა) ზონაში — დაკავშირებულია რუმინაციასთან (ნეგატიური აზრების აკვიატებული ტრიალი)' },
      { name: 'Beta', hz: '13–30 Hz', status: 'low', desc: 'დაბალი აქტივობა, რაც განაპირობებს ენერგიისა და მოტივაციის დეფიციტს' },
      { name: 'Delta', hz: '0.5–4 Hz', status: 'normal', desc: 'ძირითადად ნორმაშია, თუ ადგილი არ აქვს ძილის მძიმე, ორგანულ დარღვევებს' }
    ],
    treatment: 'TMS — FDA-ის მიერ დამტკიცებული მეთოდი, რომელიც ეფექტურად ებრძვის მედიკამენტ-რეზისტენტულ დეპრესიას. ვახდენთ მარცხენა DLPFC-ის (დორსოლატერალური პრეფრონტალური ქერქის) სტიმულაციას ალფა-ასიმეტრიის გამოსასწორებლად. QEEG-ზე მორგებული პროტოკოლი + ნეიროფიდბექი + მიზნობრივი ფსიქოთერაპია — სინერგია, რომელიც მოქმედებს იქ, სადაც სხვა მეთოდები უძლური აღმოჩნდა.'
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

  const brainMapHTML = key === 'adhd' ? `
    <div class="modal-brain-wrap">
      <div class="modal-brain-map-box">
        <canvas id="adhdModalMap" width="180" height="180"></canvas>
        <div class="modal-brain-rec"><span class="modal-brain-dot"></span>LIVE EEG</div>
      </div>
      <div class="modal-brain-legend">
        <div class="modal-brain-legend-row"><span class="modal-brain-swatch" style="background:linear-gradient(90deg,#ff2200,#ff8800)"></span>Theta ↑ ფრონტალური</div>
        <div class="modal-brain-legend-row"><span class="modal-brain-swatch" style="background:linear-gradient(90deg,#ffdd00,#00ee88)"></span>ნორმა</div>
        <div class="modal-brain-legend-row"><span class="modal-brain-swatch" style="background:linear-gradient(90deg,#0088ff,#0044cc)"></span>Beta ↓ პარიეტ./ოქციპ.</div>
      </div>
    </div>
  ` : '';

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
      ${brainMapHTML}
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

  if (key === 'adhd') startAdhdBrainMap('adhdModalMap');
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

// ---- CONTACT FORM → WHATSAPP ----
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const message = document.getElementById('message').value.trim();

    let text = `🏥 *NPMC — ახალი მომართვა*\n\n`;
    text += `👤 სახელი: ${name}\n`;
    text += `📞 ტელეფონი: ${phone}\n`;
    if (service) text += `🔬 სერვისი: ${service}\n`;
    if (message) text += `💬 შეტყობინება: ${message}\n`;

    const url = `https://wa.me/995511440099?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    form.style.display = 'none';
    formSuccess.classList.add('visible');
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

// ---- EEG WAVE ANIMATIONS ----
(function () {
  const waves = [
    { id: 'wave-delta', color: '#7b6ff0', freq: 1.8,  amp: 16, speed: 0.4 },
    { id: 'wave-theta', color: '#4fa8e8', freq: 4.0,  amp: 13, speed: 0.9 },
    { id: 'wave-alpha', color: '#3fcca0', freq: 8.0,  amp: 11, speed: 1.6 },
    { id: 'wave-beta',  color: '#e8c94f', freq: 18.0, amp: 8,  speed: 3.2 },
    { id: 'wave-gamma', color: '#e85a5a', freq: 35.0, amp: 5,  speed: 6.0 },
  ];

  const offsets = {};
  let running = false;

  waves.forEach(w => { offsets[w.id] = 0; });

  function drawAll() {
    waves.forEach(w => {
      const canvas = document.getElementById(w.id);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.width;
      const H = canvas.height;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);

      // glow effect
      ctx.shadowColor = w.color;
      ctx.shadowBlur = 6;
      ctx.strokeStyle = w.color;
      ctx.lineWidth = 1.8;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const angle = ((x + offsets[w.id]) / W) * Math.PI * 2 * w.freq;
        const y = cy + Math.sin(angle) * w.amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      offsets[w.id] += w.speed;
    });

    requestAnimationFrame(drawAll);
  }

  // Start only when QEEG tab is visible
  const qeegPanel = document.getElementById('tab-qeeg');
  if (qeegPanel) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !running) {
        running = true;
        drawAll();
      }
    }, { threshold: 0.1 });
    observer.observe(qeegPanel);
  } else {
    drawAll();
  }
})();

/* ============================================================
   QEEG TWO-PANEL VISUAL
   Left:  EEG head recording animation
   Right: Topographic brain map (IDW colour interpolation)
   ============================================================ */
(function () {

  /* shared electrode layout */
  const ELEC_DEF = [
    {n:'Fp1',x:-.28,y:-.85,ph:0.00,fr:.72},
    {n:'Fp2',x: .28,y:-.85,ph:0.80,fr:.72},
    {n:'F7', x:-.72,y:-.52,ph:1.60,fr:.65},
    {n:'F3', x:-.38,y:-.46,ph:2.30,fr:.68},
    {n:'Fz', x: .00,y:-.50,ph:3.00,fr:.70},
    {n:'F4', x: .38,y:-.46,ph:3.70,fr:.68},
    {n:'F8', x: .72,y:-.52,ph:4.40,fr:.65},
    {n:'T3', x:-.96,y: .02,ph:1.20,fr:.60},
    {n:'C3', x:-.50,y: .00,ph:2.00,fr:.75},
    {n:'Cz', x: .00,y: .00,ph:2.70,fr:.80},
    {n:'C4', x: .50,y: .00,ph:3.40,fr:.75},
    {n:'T4', x: .96,y: .02,ph:0.50,fr:.60},
    {n:'T5', x:-.78,y: .55,ph:1.80,fr:.62},
    {n:'P3', x:-.38,y: .44,ph:4.20,fr:.78},
    {n:'Pz', x: .00,y: .44,ph:0.30,fr:.82},
    {n:'P4', x: .38,y: .44,ph:1.10,fr:.78},
    {n:'T6', x: .78,y: .55,ph:2.60,fr:.62},
    {n:'O1', x:-.24,y: .86,ph:3.30,fr:.90},
    {n:'O2', x: .24,y: .86,ph:4.00,fr:.90},
  ];

  /* ── LEFT: EEG head ── */
  const headCv = document.getElementById('qeegEegHead');
  if (headCv) {
    const hx   = headCv.getContext('2d');
    const HW   = 200, HH = 200;
    const hCX  = 100, hCY = 100, hRX = 82, hRY = 88;
    const elecs = ELEC_DEF.map(e => ({
      ...e,
      px: hCX + e.x * hRX * 0.93,
      py: hCY + e.y * hRY * 0.93,
    }));

    window._drawQeegHead = function(t) {
      hx.clearRect(0, 0, HW, HH);

      /* head fill */
      const bg = hx.createRadialGradient(hCX, hCY-10, 10, hCX, hCY, 96);
      bg.addColorStop(0, 'rgba(22,18,50,.95)');
      bg.addColorStop(1, 'rgba(8,8,20,.98)');
      hx.save();
      hx.beginPath(); hx.ellipse(hCX, hCY, hRX, hRY, 0, 0, Math.PI*2);
      hx.fillStyle = bg; hx.fill(); hx.restore();

      /* connection lines */
      const rows = [
        ['Fp1','F3','C3','P3','O1'],['Fp2','F4','C4','P4','O2'],
        ['F7','T3','T5'],['F8','T4','T6'],['Fz','Cz','Pz'],
      ];
      hx.save();
      hx.beginPath(); hx.ellipse(hCX, hCY, hRX, hRY, 0, 0, Math.PI*2); hx.clip();
      rows.forEach(r => {
        const pts = r.map(n => elecs.find(e => e.n===n)).filter(Boolean);
        if (pts.length < 2) return;
        hx.beginPath(); hx.moveTo(pts[0].px, pts[0].py);
        pts.slice(1).forEach(p => hx.lineTo(p.px, p.py));
        hx.strokeStyle = 'rgba(100,120,200,.10)';
        hx.lineWidth = 1; hx.stroke();
      });
      hx.restore();

      /* head outline */
      hx.beginPath(); hx.ellipse(hCX, hCY, hRX, hRY, 0, 0, Math.PI*2);
      hx.strokeStyle = 'rgba(201,169,110,.5)'; hx.lineWidth = 2; hx.stroke();

      /* nose */
      hx.beginPath();
      hx.moveTo(hCX-7, hCY-hRY+2);
      hx.quadraticCurveTo(hCX, hCY-hRY-14, hCX+7, hCY-hRY+2);
      hx.strokeStyle = 'rgba(201,169,110,.3)'; hx.lineWidth = 1.5; hx.stroke();

      /* ears */
      [-1,1].forEach(s => {
        hx.beginPath(); hx.ellipse(hCX+s*(hRX+5), hCY+4, 6, 11, 0, 0, Math.PI*2);
        const eg = hx.createRadialGradient(hCX+s*(hRX+5), hCY+4, 0, hCX+s*(hRX+5), hCY+4, 12);
        eg.addColorStop(0,'rgba(22,18,50,1)'); eg.addColorStop(1,'rgba(8,8,20,1)');
        hx.fillStyle = eg; hx.fill();
        hx.strokeStyle = 'rgba(201,169,110,.3)'; hx.lineWidth = 1.5; hx.stroke();
      });

      /* animated electrode dots */
      elecs.forEach((e, i) => {
        const act   = Math.sin(t * e.fr + e.ph) * .5 + .5;
        const pulse = Math.sin(t * 1.1 + i * 1.3);
        if (pulse > .6) {
          const rr = (pulse - .6) * 16;
          hx.beginPath(); hx.arc(e.px, e.py, 3 + rr, 0, Math.PI*2);
          hx.strokeStyle = `rgba(99,179,237,${(1-rr/16)*.28})`; hx.lineWidth=1; hx.stroke();
        }
        const col = `hsl(${200+act*70},85%,${40+act*30}%)`;
        hx.shadowColor = col; hx.shadowBlur = 8;
        hx.beginPath(); hx.arc(e.px, e.py, 3, 0, Math.PI*2);
        hx.fillStyle = col; hx.fill(); hx.shadowBlur = 0;
      });
    };
  }

  /* ── RIGHT: Topo map ── */
  const cv = document.getElementById('qeegTopoMap');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = 200, H = 200;
  const CX = 100, CY = 100, HR = 90;

  const ELEC = ELEC_DEF.map(e => ({
    ...e,
    px: CX + e.x * HR * 0.94,
    py: CY + e.y * HR * 0.94,
  }));

  function topoRGB(v) {
    v = Math.max(0, Math.min(1, v));
    if (v < .20) { const u=v/.20;        return [Math.round(u*10),   Math.round(u*90),   220]; }
    if (v < .40) { const u=(v-.20)/.20;  return [0, Math.round(90+u*165), Math.round(220*(1-u))]; }
    if (v < .60) { const u=(v-.40)/.20;  return [Math.round(u*255), 240, 0]; }
    if (v < .80) { const u=(v-.60)/.20;  return [255, Math.round(240-u*240), 0]; }
    return [255, 0, 0];
  }

  /* offscreen canvas for IDW render (half-res for speed) */
  const OS = 110;
  const oc = document.createElement('canvas');
  oc.width = oc.height = OS;
  const ox = oc.getContext('2d');
  const scale = (HR * 2 * 1.02) / OS;
  const ox0 = CX - HR * 1.02;
  const oy0 = CY - HR * 1.02;

  function renderMap(acts) {
    const imgd = ox.createImageData(OS, OS);
    const d = imgd.data;
    for (let row = 0; row < OS; row++) {
      for (let col = 0; col < OS; col++) {
        const cpx = ox0 + col * scale;
        const cpy = oy0 + row * scale;
        const dx0 = cpx - CX, dy0 = cpy - CY;
        if (dx0*dx0 + dy0*dy0 > HR*HR) continue;
        let wSum = 0, vSum = 0;
        for (let i = 0; i < ELEC.length; i++) {
          const dx = cpx - ELEC[i].px, dy = cpy - ELEC[i].py;
          const d2 = dx*dx + dy*dy;
          const w = d2 < 1 ? 1e6 : 1 / d2;
          wSum += w; vSum += w * acts[i];
        }
        const v = wSum > 0 ? vSum / wSum : 0.5;
        const [r, g, b] = topoRGB(v);
        const idx = (row * OS + col) * 4;
        d[idx]=r; d[idx+1]=g; d[idx+2]=b; d[idx+3]=255;
      }
    }
    ox.putImageData(imgd, 0, 0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const acts = ELEC.map(e => 0.5 + 0.46 * Math.sin(t * e.fr + e.ph));
    renderMap(acts);

    /* colour map clipped to circle */
    ctx.save();
    ctx.beginPath(); ctx.arc(CX, CY, HR, 0, Math.PI * 2); ctx.clip();
    ctx.drawImage(oc, ox0, oy0, HR*2*1.02, HR*2*1.02);
    ctx.restore();

    /* head outline + ears + nose */
    [[-1], [1]].forEach(([sx]) => {
      ctx.beginPath();
      ctx.ellipse(CX + sx*(HR+4), CY+8, 7, 12, 0, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(200,185,175,0.80)';
      ctx.lineWidth = 2; ctx.stroke();
    });
    ctx.beginPath();
    ctx.moveTo(CX-9, CY-HR+4);
    ctx.quadraticCurveTo(CX, CY-HR-15, CX+9, CY-HR+4);
    ctx.strokeStyle = 'rgba(200,185,175,0.80)';
    ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(CX, CY, HR, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(200,185,175,0.88)'; ctx.lineWidth = 2; ctx.stroke();

    /* electrode dots */
    ELEC.forEach(e => {
      ctx.beginPath(); ctx.arc(e.px, e.py, 2.5, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(0,0,0,0.70)'; ctx.fill();
      ctx.beginPath(); ctx.arc(e.px, e.py, 1.5, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.88)'; ctx.fill();
    });
  }

  let running = false;
  let startTime = null;
  function loop(ts) {
    if (!startTime) startTime = ts;
    const t = (ts - startTime) / 1000;
    draw(t);
    if (window._drawQeegHead) window._drawQeegHead(t);
    requestAnimationFrame(loop);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }, { threshold: 0.1 });
  obs.observe(cv);
})();

/* ── ADHD Modal Brain Map ── */
function startAdhdBrainMap(canvasId) {
  const cv = document.getElementById(canvasId);
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = 180, H = 180, CX = 90, CY = 90, HR = 80;
  const OS = 100;

  const ELEC_DEF2 = [
    {n:'Fp1',x:-.18,y:-.92},{n:'Fp2',x:.18,y:-.92},
    {n:'F7',x:-.72,y:-.52},{n:'F3',x:-.38,y:-.46},
    {n:'Fz',x:.00,y:-.50},{n:'F4',x:.38,y:-.46},
    {n:'F8',x:.72,y:-.52},
    {n:'T3',x:-.96,y:.02},{n:'C3',x:-.50,y:.00},
    {n:'Cz',x:.00,y:.00},{n:'C4',x:.50,y:.00},
    {n:'T4',x:.96,y:.02},
    {n:'T5',x:-.78,y:.55},{n:'P3',x:-.38,y:.44},
    {n:'Pz',x:.00,y:.44},{n:'P4',x:.38,y:.44},
    {n:'T6',x:.78,y:.55},
    {n:'O1',x:-.24,y:.86},{n:'O2',x:.24,y:.86},
  ];
  const PARAMS = {
    Fp1:[0.88,0.09,0.01,0.03,0.00],Fp2:[0.87,0.09,0.01,0.03,0.30],
    F7:[0.82,0.10,0.01,0.03,0.70],F3:[0.86,0.10,0.01,0.03,1.10],
    Fz:[0.90,0.08,0.01,0.02,1.50],F4:[0.85,0.10,0.01,0.03,1.90],
    F8:[0.81,0.10,0.01,0.03,2.30],
    T3:[0.55,0.04,0.03,0.04,2.60],C3:[0.50,0.03,0.04,0.04,3.00],
    Cz:[0.48,0.03,0.04,0.03,3.40],C4:[0.50,0.03,0.04,0.04,3.80],
    T4:[0.54,0.04,0.03,0.04,0.90],
    T5:[0.32,0.02,0.05,0.04,4.20],P3:[0.22,0.02,0.06,0.04,4.60],
    Pz:[0.20,0.01,0.06,0.03,5.00],P4:[0.23,0.02,0.06,0.04,5.40],
    T6:[0.33,0.02,0.05,0.04,5.80],
    O1:[0.14,0.01,0.07,0.04,6.20],O2:[0.15,0.01,0.07,0.04,6.60],
  };

  const elecs = ELEC_DEF2.map(e => ({
    ...e, params: PARAMS[e.n],
    noise: Math.random() * Math.PI * 2,
    px: CX + e.x * HR * 0.93,
    py: CY + e.y * HR * 0.93,
  }));

  const oc = document.createElement('canvas');
  oc.width = oc.height = OS;
  const ox = oc.getContext('2d');
  const scale2 = (HR * 2 * 1.02) / OS;
  const ox0 = CX - HR * 1.02, oy0 = CY - HR * 1.02;

  function topoRGB2(v) {
    v = Math.max(0, Math.min(1, v));
    if (v < .20){const u=v/.20;return[Math.round(u*10),Math.round(u*90),220];}
    if (v < .40){const u=(v-.20)/.20;return[0,Math.round(90+u*165),Math.round(220*(1-u))];}
    if (v < .60){const u=(v-.40)/.20;return[Math.round(u*255),240,0];}
    if (v < .80){const u=(v-.60)/.20;return[255,Math.round(240-u*240),0];}
    return [255,0,0];
  }

  function renderMap2(acts) {
    const imgd = ox.createImageData(OS, OS);
    const d = imgd.data;
    for (let row = 0; row < OS; row++) {
      for (let col = 0; col < OS; col++) {
        const cpx = ox0 + col * scale2, cpy = oy0 + row * scale2;
        const dx0 = cpx - CX, dy0 = cpy - CY;
        if (dx0*dx0 + dy0*dy0 > HR*HR) continue;
        let wSum = 0, vSum = 0;
        for (let i = 0; i < elecs.length; i++) {
          const dx = cpx - elecs[i].px, dy = cpy - elecs[i].py;
          const d2 = dx*dx + dy*dy;
          const w = d2 < 1 ? 1e6 : 1/d2;
          wSum += w; vSum += w * acts[i];
        }
        const v = wSum > 0 ? vSum/wSum : 0.5;
        const [r,g,b] = topoRGB2(v);
        const idx = (row*OS+col)*4;
        d[idx]=r;d[idx+1]=g;d[idx+2]=b;d[idx+3]=255;
      }
    }
    ox.putImageData(imgd, 0, 0);
  }

  let _raf = null;
  function loop2(ts) {
    const t = ts / 1000;
    elecs.forEach(e => { e.noise += 0.008 + Math.random()*0.004; });
    const acts = elecs.map(e => {
      const [base,tAmp,bAmp,nAmp,ph] = e.params;
      return Math.max(0, Math.min(1,
        base + tAmp*Math.sin(t*0.75*Math.PI*2+ph)
             + bAmp*Math.sin(t*2.1*Math.PI*2+ph*1.3)
             + nAmp*Math.sin(e.noise)
      ));
    });
    renderMap2(acts);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.beginPath(); ctx.arc(CX,CY,HR,0,Math.PI*2); ctx.clip();
    ctx.drawImage(oc, ox0, oy0, HR*2*1.02, HR*2*1.02);
    ctx.restore();
    [[-1],[1]].forEach(([sx]) => {
      ctx.beginPath();
      ctx.ellipse(CX+sx*(HR+4),CY+8,6,10,0,0,Math.PI*2);
      ctx.strokeStyle='rgba(200,185,175,.7)';ctx.lineWidth=1.5;ctx.stroke();
    });
    ctx.beginPath();
    ctx.moveTo(CX-8,CY-HR+3);
    ctx.quadraticCurveTo(CX,CY-HR-12,CX+8,CY-HR+3);
    ctx.strokeStyle='rgba(200,185,175,.7)';ctx.lineWidth=1.5;ctx.stroke();
    ctx.beginPath();ctx.arc(CX,CY,HR,0,Math.PI*2);
    ctx.strokeStyle='rgba(200,185,175,.8)';ctx.lineWidth=1.5;ctx.stroke();
    elecs.forEach(e => {
      ctx.beginPath();ctx.arc(e.px,e.py,2.4,0,Math.PI*2);
      ctx.fillStyle='rgba(0,0,0,.65)';ctx.fill();
      ctx.beginPath();ctx.arc(e.px,e.py,1.3,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,.88)';ctx.fill();
    });
    if (document.getElementById(canvasId)) {
      _raf = requestAnimationFrame(loop2);
    }
  }
  _raf = requestAnimationFrame(loop2);
}
