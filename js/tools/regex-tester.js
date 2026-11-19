document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Regex Tester & Live Debugger', 'regex-tester.html', '🔎');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Regex Tester & Live Debugger');
  }

  const patternEl = document.getElementById('rxPattern');
  const flagsEl = document.getElementById('rxFlags');
  const textEl = document.getElementById('rxTestText');
  const statusEl = document.getElementById('rxStatus');
  const highlightEl = document.getElementById('rxHighlighted');
  const matchesListEl = document.getElementById('rxMatchesList');

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function runRegex() {
    const pat = patternEl.value;
    const flg = flagsEl.value || 'g';
    const txt = textEl.value;

    if (!pat) {
      statusEl.textContent = 'Enter a regular expression pattern above.';
      highlightEl.textContent = txt;
      matchesListEl.innerHTML = '';
      return;
    }

    try {
      const re = new RegExp(pat, flg.includes('g') ? flg : flg + 'g');
      const matches = [...txt.matchAll(re)];
      statusEl.style.color = '#34d399';
      statusEl.textContent = `✅ Valid Regex — Found ${matches.length} match(es)`;

      let lastIdx = 0;
      let highlighted = '';
      matches.forEach(m => {
        highlighted += escapeHtml(txt.slice(lastIdx, m.index));
        highlighted += `<mark style="background:rgba(129,140,248,0.45);color:#fff;padding:0.1rem 0.2rem;border-radius:4px;">${escapeHtml(m[0])}</mark>`;
        lastIdx = m.index + m[0].length;
      });
      highlighted += escapeHtml(txt.slice(lastIdx));
      highlightEl.innerHTML = highlighted;

      matchesListEl.innerHTML = matches.slice(0, 50).map((m, idx) => `
        <div style="padding:0.4rem 0.75rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;margin-bottom:0.4rem;font-family:monospace;font-size:0.85rem;">
          <strong>Match ${idx + 1}</strong> (index ${m.index}): <span style="color:#34d399;">${escapeHtml(m[0])}</span>
        </div>
      `).join('');
    } catch (e) {
      statusEl.style.color = '#f87171';
      statusEl.textContent = `❌ Regex Error: ${e.message}`;
      highlightEl.textContent = txt;
      matchesListEl.innerHTML = '';
    }
  }

  document.querySelectorAll('[data-rx-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      patternEl.value = btn.dataset.rxPreset;
      runRegex();
    });
  });

  [patternEl, flagsEl, textEl].forEach(el => {
    if (el) el.addEventListener('input', runRegex);
  });

  runRegex();
});
