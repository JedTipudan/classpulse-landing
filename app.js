/* ── CONFIG ── */
const CONFIG = {
  version: "1.1.8",
  apkUrl: "https://github.com/JedTipudan/classpulse-privacy/releases/download/v1.1.8/app-release.apk",
  youtubeEmbedUrl: "https://www.youtube.com/embed/8MOzgcf423A",
  gcash: { number: "09755918109", name: "Jed Tipudan" },
};

/* ── TOAST ── */
let toastTimer;
function showToast(msg, type = "info") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = "toast"; }, 3500);
}

/* ── MODAL ── */
function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(m => {
      m.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
});

/* ── NAV MOBILE ── */
function toggleNav() {
  const links = document.getElementById("nav-links");
  const ham = document.getElementById("hamburger");
  links.classList.toggle("open");
  ham.classList.toggle("active");
}
function closeNav() {
  document.getElementById("nav-links").classList.remove("open");
  document.getElementById("hamburger").classList.remove("active");
}

/* ── NAV SCROLL ── */
window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

/* ── FEATURES DATA ── */
const FEATURES = [
  { icon: "🔔", title: "Smart Notifications", desc: "Get alerted 10 minutes before class AND at the exact start time — even when the app is closed." },
  { icon: "📅", title: "Weekly Schedule View", desc: "See your full week at a glance with color-coded subjects and day tabs." },
  { icon: "🎯", title: "Today's NEXT Class", desc: "Home screen highlights your next upcoming class so you always know what's coming." },
  { icon: "✏️", title: "Easy Add & Edit", desc: "Swipe left on any card to edit or delete. Add classes with multi-day selection in seconds." },
  { icon: "🎨", title: "Color-Coded Subjects", desc: "Assign colors to subjects for instant visual recognition across your schedule." },
  { icon: "📝", title: "Notes & Events", desc: "Built-in notes and calendar events so everything school-related lives in one place." },
  { icon: "🤖", title: "AI Assistant", desc: "Ask questions about your schedule or get study tips powered by Google Gemini AI." },
  { icon: "☁️", title: "Google Drive Backup", desc: "Back up and restore your schedule to Google Drive — never lose your data." },
  { icon: "📴", title: "Works Offline", desc: "No internet needed for your schedule. Everything is stored locally on your device." },
];

/* ── STEPS DATA ── */
const STEPS = [
  { num: "1", title: "Download & Install", desc: "Download the APK, enable 'Install Unknown Apps' in settings, and install ClassPulse." },
  { num: "2", title: "Add Your Classes", desc: "Tap the + button, fill in subject, time, room, and select which days it repeats." },
  { num: "3", title: "Allow Notifications", desc: "Grant notification permission when prompted so ClassPulse can remind you on time." },
  { num: "4", title: "Never Miss a Class", desc: "ClassPulse automatically schedules reminders for the next 14 days. You're all set!" },
];

/* ── RENDER FEATURES ── */
function renderFeatures() {
  const grid = document.getElementById("features-grid");
  grid.innerHTML = FEATURES.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join("");
}

/* ── RENDER STEPS ── */
function renderSteps() {
  const steps = document.getElementById("steps");
  steps.innerHTML = STEPS.map(s => `
    <div class="step">
      <div class="step-num">${s.num}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join("");
}

/* ── RENDER PHONE MOCKUP ── */
function renderPhone() {
  return `
    <div class="phone-mockup">
      <div class="phone-notch"></div>
      <div class="phone-screen">
        <div class="phone-header">📚 Today — Monday</div>
        <div class="phone-card next">
          <div class="pc-label">▶ NEXT</div>
          <div class="pc-subject">Mathematics</div>
          <div class="pc-time">⏰ 11:00 AM – 12:00 PM</div>
          <div class="pc-room">📍 Room 201</div>
        </div>
        <div class="phone-card">
          <div class="pc-subject">Physics</div>
          <div class="pc-time">⏰ 1:00 PM – 2:30 PM</div>
          <div class="pc-room">📍 Lab 3</div>
        </div>
        <div class="phone-card">
          <div class="pc-subject">English</div>
          <div class="pc-time">⏰ 3:00 PM – 4:00 PM</div>
          <div class="pc-room">📍 Room 105</div>
        </div>
        <div class="phone-notif">🔔 Math starts in 10 minutes!</div>
      </div>
    </div>
  `;
}

/* ── SKELETON → REAL CONTENT ── */
function revealHero() {
  // Badge
  const badge = document.getElementById("badge");
  badge.innerHTML = `<span class="badge-pill"><span class="badge-dot"></span> v${CONFIG.version} — Latest Release</span>`;
  badge.style.display = "block";

  // Title
  const title = document.getElementById("hero-title");
  title.innerHTML = `Never Miss a<br><span class="accent">Class Again.</span>`;
  title.style.display = "block";

  // Sub
  const sub = document.getElementById("hero-sub");
  sub.innerHTML = `ClassPulse is a smart student schedule reminder app. Add your classes once — get notified 10 minutes before and right at the start, even when your phone is locked.`;
  sub.style.display = "block";

  // Actions
  const actions = document.getElementById("hero-actions");
  actions.innerHTML = `
    <button class="btn btn-lg" onclick="handleDownload()">📲 Download Free</button>
    <a href="#how-it-works" class="btn btn-outline btn-lg">How It Works</a>
  `;

  // Stats
  const stats = document.getElementById("hero-stats");
  stats.innerHTML = `
    <div class="stat"><div class="stat-num">Free</div><div class="stat-label">Always</div></div>
    <div class="stat"><div class="stat-num">14d</div><div class="stat-label">Reminders</div></div>
    <div class="stat"><div class="stat-num">0 Ads</div><div class="stat-label">No Tracking</div></div>
  `;

  // Phone
  const phone = document.getElementById("hero-phone");
  phone.innerHTML = renderPhone();
}

/* ── DOWNLOAD ── */
function revealDownload() {
  const nameEl = document.getElementById("dl-name");
  const metaEl = document.getElementById("dl-meta");
  const btn = document.getElementById("dl-btn");

  nameEl.innerHTML = `ClassPulse v${CONFIG.version}`;
  metaEl.innerHTML = `Android 8.0+ &nbsp;·&nbsp; ~15 MB &nbsp;·&nbsp; Free`;
  btn.innerHTML = `📲 Download APK`;
  btn.disabled = false;
}

function handleDownload() {
  openModal("dl-modal");
  // Start actual download
  const a = document.createElement("a");
  a.href = CONFIG.apkUrl;
  a.download = `ClassPulse-v${CONFIG.version}.apk`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("Download started! ✅", "success");
}

/* ── VIDEO ── */
function openVideoModal() {
  document.getElementById("video-placeholder").classList.add("hidden");
  const embed = document.getElementById("yt-embed");
  embed.src = CONFIG.youtubeEmbedUrl + "?autoplay=1";
  embed.classList.remove("hidden");
}

/* ── SOCIAL TRACKING ── */
function trackSocial(platform) {
  showToast(`Opening ${platform}... 👋`);
}

/* ── DONATE MODAL ── */
function openDonateModal() {
  openModal("donate-modal");
}

function copyGcash() {
  navigator.clipboard.writeText(CONFIG.gcash.number).then(() => {
    showToast("GCash number copied! 📋", "success");
    const btn = document.getElementById("copy-gcash-btn");
    btn.textContent = "✅ Copied!";
    setTimeout(() => { btn.textContent = "📋 Copy Number"; }, 2500);
  }).catch(() => {
    showToast("Copy failed — number: " + CONFIG.gcash.number);
  });
}

/* ── INTERSECTION OBSERVER (card animations) ── */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".feature-card, .step, .social-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
    observer.observe(el);
  });
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  renderFeatures();
  renderSteps();

  // Simulate async load (mimics fetching latest release from GitHub API)
  setTimeout(() => {
    revealHero();
    revealDownload();
    initAnimations();
    showToast(`ClassPulse v${CONFIG.version} is ready to download! 🎉`, "success");
  }, 1200);
});
