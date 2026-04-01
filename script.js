// ===========================
// Header scroll effect
// ===========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===========================
// Hamburger / Mobile menu
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===========================
// Scroll reveal (AOS-lite)
// ===========================
const aosEls = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
aosEls.forEach(el => observer.observe(el));

// ===========================
// Contact form
// ===========================
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formNote.textContent = '必須項目をご入力ください。';
    formNote.style.color = '#c0392b';
    return;
  }

  // Simulate send
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = '送信中…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = '送信する';
    btn.disabled = false;
    formNote.style.color = '#27ae60';
    formNote.textContent = 'お問い合わせを受け付けました。ありがとうございます。';
    setTimeout(() => { formNote.textContent = ''; }, 5000);
  }, 1200);
});

// ===========================
// Smooth active nav highlight
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    if (
      scrollY >= section.offsetTop &&
      scrollY < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + section.id) {
          link.style.color = 'var(--clr-accent2)';
        }
      });
    }
  });
}, { passive: true });
