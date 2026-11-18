/* ============================================
   SmartToolzAI — Main JavaScript
   Navigation, Animations, Search, Recently Used,
   Real AI Cloud Engine & Multi-Language Switcher
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
if (document.body) {
  document.body.appendChild(yandexNoscript);
}

// ==========================================
// GLOBAL LANGUAGE SWITCHER INJECTION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  if (navLinks && !document.getElementById('langSwitcher')) {
    const supportedLangs = [
      { code: 'en', label: '🌐 EN', name: 'English' },
      { code: 'es', label: '🇪🇸 ES', name: 'Español' },
      { code: 'pt', label: '🇧🇷 PT', name: 'Português' },
      { code: 'de', label: '🇩🇪 DE', name: 'Deutsch' },
      { code: 'fr', label: '🇫🇷 FR', name: 'Français' },
      { code: 'ja', label: '🇯🇵 JA', name: '日本語' }
    ];

    const path = window.location.pathname || '/';
    const langMatch = path.match(/^\/(es|pt|de|fr|ja)(\/.*|$)/);
    const currentLang = langMatch ? langMatch[1] : 'en';
    const baseSubpath = langMatch ? (langMatch[2] || '/index.html') : path;

    const select = document.createElement('select');
    select.id = 'langSwitcher';
    select.setAttribute('aria-label', 'Select Language');
    select.style.cssText = 'background:rgba(255,255,255,0.06);color:#f8fafc;border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:0.35rem 0.6rem;font-size:0.85rem;font-weight:600;cursor:pointer;margin-left:0.5rem;outline:none;';

    supportedLangs.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l.code;
      opt.textContent = `${l.label} (${l.name})`;
      opt.style.background = '#0f172a';
      opt.style.color = '#f8fafc';
      if (l.code === currentLang) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener('change', (e) => {
      const targetLang = e.target.value;
      let cleanSub = baseSubpath;
      if (cleanSub === '/' || cleanSub === '') cleanSub = '/index.html';
      if (targetLang === 'en') {
        window.location.href = cleanSub === '/index.html' ? '/' : cleanSub;
      } else {
        window.location.href = `/${targetLang}${cleanSub}`;
      }
    });

    navLinks.appendChild(select);
  }

  // Hide empty ad-placeholder boxes if no ad network fills them so UI looks clean & trustworthy
  document.querySelectorAll('.ad-placeholder').forEach(el => {
    el.style.display = 'none';
  });
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.getElementById('header');

function handleScroll() {
  if (!header) return;
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
  const cleanFile = toolUrl.split('/').pop();
  const normalizedUrl = `tools/${cleanFile}`;
  recent = recent.filter(t => t.name !== toolName);
  recent.unshift({ name: toolName, url: normalizedUrl, icon: toolIcon });
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
      <p>Recently used tool — click to launch instantly</p>
      <div class="card-arrow">→</div>
    </a>
  `).join('');
}

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
// REAL AI CLOUD GENERATION ENGINE (Zero-Key LLM)
// ==========================================
async function generateWithAI(prompt, systemInstruction = 'You are SmartToolzAI, a helpful, concise expert AI assistant. Output only the requested result without markdown code fences or meta commentary.') {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ],
        model: 'openai',
        seed: Math.floor(Math.random() * 100000)
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (!text || text.trim().length < 5) throw new Error('Empty AI response');
    return text.trim();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ==========================================
// DYNAMIC TOOL COUNT AUTO-UPDATER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const mainToolCards = document.querySelectorAll('.section:not(#recentlyUsed) .tools-grid > .tool-card');
  if (mainToolCards.length > 0) {
    const uniqueHrefs = new Set();
    mainToolCards.forEach(card => {
      const href = card.getAttribute('href');
      if (href) {
        const filename = href.split('/').pop();
        if (filename && filename.includes('.html')) {
          uniqueHrefs.add(filename);
        }
      }
    });

    const count = uniqueHrefs.size > 0 ? uniqueHrefs.size : 36;
    const counterTools = document.getElementById('counterTools');
    if (counterTools) counterTools.textContent = `${count}+`;
    const totalToolsCount = document.getElementById('totalToolsCount');
    if (totalToolsCount) totalToolsCount.textContent = `${count}+`;
  }
});

// ==========================================
// TOOL PAGE HELPER: Create sidebar HTML
// ==========================================
function createToolSidebar(currentTool) {
  const allTools = [
    { name: 'Compress Image to 20KB/50KB', url: 'compress-image-to-50kb.html', icon: '🗜️' },
    { name: 'Etsy, eBay & TikTok Fee Calculator', url: 'ecommerce-fee-calculator.html', icon: '🛍️' },
    { name: 'LLM Token & API Cost Calculator', url: 'llm-token-calculator.html', icon: '🤖' },
    { name: 'YouTube Thumbnail Downloader', url: 'youtube-thumbnail-downloader.html', icon: '🖼️' },
    { name: 'WEBP to PNG & JPG Converter', url: 'webp-to-png-jpg-converter.html', icon: '🔄' },
    { name: 'Digital Signature Maker (PNG)', url: 'digital-signature-maker.html', icon: '✒️' },
    { name: 'Free PDF Receipt Maker', url: 'receipt-generator.html', icon: '🧾' },
    { name: 'LinkedIn & IG Text Formatter', url: 'social-media-text-formatter.html', icon: '✨' },
    { name: 'Base64 Encoder & Image URI', url: 'base64-encoder-decoder.html', icon: '🔐' },
    { name: 'JWT Token Decoder & Debugger', url: 'jwt-decoder.html', icon: '🔑' },
    { name: 'Free Invoice Generator (PDF)', url: 'invoice-generator.html', icon: '🧾' },
    { name: 'PayPal & Stripe Fee Calculator', url: 'paypal-fee-calculator.html', icon: '💳' },
    { name: 'YouTube & TikTok Money Calculator', url: 'youtube-money-calculator.html', icon: '▶️' },
    { name: 'AI Prompt Generator & Optimizer', url: 'ai-prompt-generator.html', icon: '🧠' },
    { name: 'JSON Formatter & Validator', url: 'json-formatter.html', icon: '💻' },
    { name: 'Compound Interest Calculator', url: 'compound-interest-calculator.html', icon: '📈' },
    { name: 'PDF Compressor', url: 'pdf-compressor.html', icon: '📉' },
    { name: 'PDF Merger', url: 'pdf-merger.html', icon: '📑' },
    { name: 'Word Counter', url: 'word-counter.html', icon: '📝' },
    { name: 'Password Generator', url: 'password-generator.html', icon: '🔐' },
    { name: 'Case Converter', url: 'case-converter.html', icon: '🔤' },
    { name: 'Age Calculator', url: 'age-calculator.html', icon: '🎂' },
    { name: 'Lorem Ipsum Generator', url: 'lorem-generator.html', icon: '📄' },
    { name: 'QR Code Generator', url: 'qr-generator.html', icon: '📱' },
    { name: 'Color Picker', url: 'color-picker.html', icon: '🎨' },
    { name: 'Image Compressor', url: 'image-compressor.html', icon: '🖼️' },
    { name: 'Website Widget Generator', url: 'embed-widget.html', icon: '🧩' },
    { name: 'Length Converter', url: 'length-converter.html', icon: '📏' },
    { name: 'Weight Converter', url: 'weight-converter.html', icon: '⚖️' },
    { name: 'Temperature Converter', url: 'temperature-converter.html', icon: '🌡️' },
    { name: 'Speed Converter', url: 'speed-converter.html', icon: '🚀' },
    { name: 'AI Email Generator', url: 'ai-email-generator.html', icon: '📧' },
    { name: 'AI Title Generator', url: 'ai-title-generator.html', icon: '✍️' },
    { name: 'AI Paragraph Writer', url: 'ai-paragraph-rewriter.html', icon: '✍️' },
    { name: 'AI Social Bio Generator', url: 'ai-bio-generator.html', icon: '👤' },
    { name: 'AI Business Name Generator', url: 'ai-business-name-generator.html', icon: '💡' },
    { name: 'AI Brand Slogan Generator', url: 'ai-slogan-generator.html', icon: '📢' },
    { name: 'AI Meta Description Generator', url: 'ai-meta-description-generator.html', icon: '🔍' },
    { name: 'AI Hashtag Generator', url: 'ai-hashtag-generator.html', icon: '#️⃣' },
    { name: 'AI Post Generator', url: 'ai-post-generator.html', icon: '📱' }
  ];

  const otherTools = allTools.filter(t => t.name !== currentTool);
  const shuffled = otherTools.sort(() => Math.random() - 0.5).slice(0, 6);

  return `
    <div class="sidebar-card">
      <h3>🔥 High-Demand Pro Tools</h3>
      <a href="invoice-generator.html" class="sidebar-tool-link"><span>🧾</span> Free PDF Invoice Maker</a>
      <a href="paypal-fee-calculator.html" class="sidebar-tool-link"><span>💳</span> PayPal & Stripe Calculator</a>
      <a href="youtube-money-calculator.html" class="sidebar-tool-link"><span>▶️</span> YouTube Money Calculator</a>
      <a href="ai-prompt-generator.html" class="sidebar-tool-link"><span>🧠</span> AI Prompt Engineer</a>
      <a href="compound-interest-calculator.html" class="sidebar-tool-link"><span>📈</span> Investment ROI Calculator</a>
      <a href="pdf-compressor.html" class="sidebar-tool-link"><span>📉</span> Private PDF Compressor</a>
    </div>

    <div class="sidebar-card">
      <h3>🔧 Related Tools</h3>
      ${shuffled.map(t => `
        <a href="${t.url}" class="sidebar-tool-link">
          <span>${t.icon}</span> ${t.name}
        </a>
      `).join('')}
    </div>
  `;
}

// Expose utilities globally
window.SmartToolzAI = {
  showToast,
  copyToClipboard,
  addRecentTool,
  createToolSidebar,
  generateWithAI
};
