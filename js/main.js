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
          const val = text.replace('+', '').replace(',', '');
          animateCounter(num, text.replace('+', ''), '+');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);
