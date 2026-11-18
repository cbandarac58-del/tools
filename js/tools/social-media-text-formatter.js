document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('LinkedIn & IG Text Formatter', 'social-media-text-formatter.html', '✨');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('LinkedIn & IG Text Formatter');
  }

  const inputEl = document.getElementById('smInputText');
  const gridEl = document.getElementById('smStylesGrid');

  function mapText(str, upperStart, lowerStart, digitStart) {
    return Array.from(str).map(ch => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90 && upperStart) return String.fromCodePoint(upperStart + (code - 65));
      if (code >= 97 && code <= 122 && lowerStart) return String.fromCodePoint(lowerStart + (code - 97));
      if (code >= 48 && code <= 57 && digitStart) return String.fromCodePoint(digitStart + (code - 48));
      return ch;
    }).join('');
  }

  function strikeText(str) {
    return Array.from(str).map(ch => ch === ' ' ? ' ' : ch + '\u0336').join('');
  }

  function render() {
    const raw = inputEl.value || 'Level Up Your LinkedIn & Instagram Posts in 2026!';
    const variants = [
      { name: 'Sans Bold (Best for LinkedIn Headlines)', text: mapText(raw, 0x1D5D4, 0x1D5EE, 0x1D7EC) },
      { name: 'Sans Italic (Emphasis & Quotes)', text: mapText(raw, 0x1D608, 0x1D622, null) },
      { name: 'Sans Bold Italic (High-Impact Hooks)', text: mapText(raw, 0x1D63C, 0x1D656, null) },
      { name: 'Serif Bold (Editorial & Luxury Style)', text: mapText(raw, 0x1D400, 0x1D41A, 0x1D7CE) },
      { name: 'Monospace / Code Font', text: mapText(raw, 0x1D670, 0x1D68A, 0x1D7F6) },
      { name: 'Strikethrough Effect', text: strikeText(raw) }
    ];

    gridEl.innerHTML = variants.map(v => {
      const safe = v.text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:1rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;">
          <div>
            <div style="font-size:0.78rem;color:rgba(255,255,255,0.5);margin-bottom:0.3rem;">${v.name}</div>
            <div style="font-size:1.05rem;word-break:break-word;">${v.text}</div>
          </div>
          <button type="button" class="btn btn-primary btn-sm" style="flex-shrink:0;" onclick="SmartToolzAI.copyToClipboard('${safe}')">📋 Copy</button>
        </div>
      `;
    }).join('');
  }

  inputEl.addEventListener('input', render);
  render();
});
