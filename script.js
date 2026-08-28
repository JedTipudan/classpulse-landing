// ── OS Tab switching ──
document.querySelectorAll('.os-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.os-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + target).classList.add('active');
  });
});

// ── Scroll fade-up animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step, .tutorial-step, .download-card, .phone-mockup, .ios-banner')
  .forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    observer.observe(el);
  });

// ── Navbar scroll shrink + active link ──
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id], .install-section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── Auto-detect OS and pre-select tab ──
const ua = navigator.userAgent || navigator.vendor;
if (/iPad|iPhone|iPod/.test(ua)) {
  document.querySelector('[data-tab="ios"]')?.click();
}

// ── Fetch latest version from version.txt (same domain on Vercel) ──
fetch('/version.txt')
  .then(r => r.text())
  .then(text => {
    const match = text.match(/version=([^\n]+)/);
    if (!match) return;
    const version = match[1].trim();
    document.querySelectorAll('#apk-download, #apk-download-2').forEach(btn => {
      const sub = btn.querySelector('.btn-sub');
      if (sub) sub.textContent = `APK \u00b7 v${version} \u00b7 Free`;
    });
  })
  .catch(() => {});
