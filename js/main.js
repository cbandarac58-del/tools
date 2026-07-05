/* ============================================
   SmartToolzAI — Main JavaScript
   Navigation, Animations, Search, Recently Used
   ============================================ */

// ==========================================
// YANDEX METRIKA COUNTER (Analytics)
// ==========================================
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110425579', 'ym');

ym(110425579, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});

// Append Yandex noscript fallback
const yandexNoscript = document.createElement('noscript');
yandexNoscript.innerHTML = '<div><img src="https://mc.yandex.ru/watch/110425579" style="position:absolute; left:-9999px;" alt="" /></div>';
document.body.appendChild(yandexNoscript);

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.getElementById('header');

function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-in, .stagger-children').forEach(el => {
  observer.observe(el);
});

// ==========================================
// TOOL SEARCH (Homepage)
// ==========================================
const toolSearch = document.getElementById('toolSearch');

if (toolSearch) {
  const allToolCards = document.querySelectorAll('.tool-card');

  toolSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    allToolCards.forEach(card => {
      const toolName = (card.dataset.tool || '').toLowerCase();
      const toolText = card.textContent.toLowerCase();
      const match = !query || toolName.includes(query) || toolText.includes(query);
      card.style.display = match ? '' : 'none';
    });
  });
}

// ==========================================
// RECENTLY USED TOOLS (LocalStorage)
// ==========================================
const RECENT_KEY = 'smarttoolzai_recent';
const MAX_RECENT = 6;

function getRecentTools() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}

function addRecentTool(toolName, toolUrl, toolIcon) {
  let recent = getRecentTools();
  // Remove if already exists
  recent = recent.filter(t => t.name !== toolName);
  // Add to beginning
  recent.unshift({ name: toolName, url: toolUrl, icon: toolIcon });
  // Keep max
  if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

function renderRecentTools() {
  const section = document.getElementById('recentlyUsed');
  const grid = document.getElementById('recentToolsGrid');
  if (!section || !grid) return;

  const recent = getRecentTools();
  if (recent.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = '';
  grid.innerHTML = recent.map(tool => `
    <a href="${tool.url}" class="tool-card" data-tool="${tool.name}">
      <div class="tool-card-icon blue">${tool.icon}</div>
      <h3>${tool.name}</h3>
      <p>Recently used tool — click to use again</p>
      <div class="card-arrow">→</div>
    </a>
  `).join('');
}

// Render on homepage
renderRecentTools();

// ==========================================
// COOKIE BANNER
// ==========================================
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

function checkCookieConsent() {
  if (!cookieBanner) return;
  const consent = localStorage.getItem('smarttoolzai_cookies');
  if (!consent) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 2000);
  }
}

if (acceptCookies) {
  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('smarttoolzai_cookies', 'accepted');
    cookieBanner.classList.remove('show');
  });
}

if (declineCookies) {
  declineCookies.addEventListener('click', () => {
    localStorage.setItem('smarttoolzai_cookies', 'declined');
    cookieBanner.classList.remove('show');
  });
}

checkCookieConsent();

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icon = type === 'success' ? '✅' : '❌';
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icon} ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ==========================================
// COPY TO CLIPBOARD UTILITY
// ==========================================
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
    return true;
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied to clipboard!');
    return true;
  }
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// TOOL PAGE HELPER: Create sidebar HTML
// ==========================================
function createToolSidebar(currentTool) {
  const allTools = [
    { name: 'Word Counter', url: 'word-counter.html', icon: '📝' },
    { name: 'Password Generator', url: 'password-generator.html', icon: '🔐' },
    { name: 'Case Converter', url: 'case-converter.html', icon: '🔤' },
    { name: 'Age Calculator', url: 'age-calculator.html', icon: '🎂' },
    { name: 'Lorem Ipsum Generator', url: 'lorem-generator.html', icon: '📄' },
    { name: 'QR Code Generator', url: 'qr-generator.html', icon: '📱' },
    { name: 'Color Picker', url: 'color-picker.html', icon: '🎨' },
    { name: 'Image Compressor', url: 'image-compressor.html', icon: '🖼️' },
    { name: 'AI Email Generator', url: 'ai-email-generator.html', icon: '📧' },
    { name: 'AI Title Generator', url: 'ai-title-generator.html', icon: '✍️' },
    { name: 'AI Hashtag Generator', url: 'ai-hashtag-generator.html', icon: '#️⃣' },
    { name: 'AI Post Generator', url: 'ai-post-generator.html', icon: '📱' },
  ];

  const otherTools = allTools.filter(t => t.name !== currentTool);
  // Shuffle and pick 5
  const shuffled = otherTools.sort(() => Math.random() - 0.5).slice(0, 5);

  return `
    <!-- ADSTERRA AD SLOT: Sidebar Banner 300x250 -->
    <div class="sidebar-card ad-placeholder">
      <span>Ad Space — 300×250</span>
    </div>

    <div class="sidebar-card">
      <h4>🔧 Related Tools</h4>
      ${shuffled.map(t => `
        <a href="${t.url}" class="sidebar-tool-link">
          <span>${t.icon}</span> ${t.name}
        </a>
      `).join('')}
    </div>

    <div class="sidebar-card">
      <h4>⭐ Popular Tools</h4>
      <a href="word-counter.html" class="sidebar-tool-link"><span>📝</span> Word Counter</a>
      <a href="password-generator.html" class="sidebar-tool-link"><span>🔐</span> Password Generator</a>
      <a href="qr-generator.html" class="sidebar-tool-link"><span>📱</span> QR Code Generator</a>
      <a href="ai-email-generator.html" class="sidebar-tool-link"><span>📧</span> AI Email Generator</a>
    </div>
  `;
}

// Expose utilities globally
window.SmartToolzAI = {
  showToast,
  copyToClipboard,
  addRecentTool,
  createToolSidebar
};
