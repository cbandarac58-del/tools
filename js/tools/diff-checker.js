document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Text & Code Diff Checker', 'diff-checker.html', '🔀');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Text & Code Diff Checker');
  }

  const leftEl = document.getElementById('diffLeft');
  const rightEl = document.getElementById('diffRight');
  const btnCompare = document.getElementById('btnRunDiff');
  const statsEl = document.getElementById('diffStats');
  const outputEl = document.getElementById('diffOutput');

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function runDiff() {
    const linesA = leftEl.value.split('\n');
    const linesB = rightEl.value.split('\n');
    const maxLen = Math.max(linesA.length, linesB.length);

    let added = 0, removed = 0, unchanged = 0;
    let html = '';

    for (let i = 0; i < maxLen; i++) {
      const a = linesA[i];
      const b = linesB[i];
      if (a === b) {
        unchanged++;
        html += `<div style="padding:0.2rem 0.6rem;color:rgba(255,255,255,0.65);font-family:monospace;font-size:0.88rem;"><span style="opacity:0.4;margin-right:0.8rem;">${i + 1}</span>  ${escapeHtml(a || '')}</div>`;
      } else {
        if (a !== undefined) {
          removed++;
          html += `<div style="padding:0.2rem 0.6rem;background:rgba(239,68,68,0.16);color:#fca5a5;font-family:monospace;font-size:0.88rem;"><span style="opacity:0.6;margin-right:0.8rem;">${i + 1}</span>- ${escapeHtml(a)}</div>`;
        }
        if (b !== undefined) {
          added++;
          html += `<div style="padding:0.2rem 0.6rem;background:rgba(16,185,129,0.16);color:#6ee7b7;font-family:monospace;font-size:0.88rem;"><span style="opacity:0.6;margin-right:0.8rem;">${i + 1}</span>+ ${escapeHtml(b)}</div>`;
        }
      }
    }

    statsEl.innerHTML = `<span style="color:#34d399;margin-right:1rem;">+${added} Added/Modified</span> <span style="color:#f87171;margin-right:1rem;">-${removed} Removed</span> <span style="color:rgba(255,255,255,0.6);">${unchanged} Unchanged</span>`;
    outputEl.innerHTML = html;
  }

  btnCompare.addEventListener('click', runDiff);
  runDiff();
});
