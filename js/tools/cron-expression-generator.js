document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Cron Expression Generator', 'cron-expression-generator.html', '⏰');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Cron Expression Generator');
  }

  const minEl = document.getElementById('cronMin');
  const hrEl = document.getElementById('cronHour');
  const domEl = document.getElementById('cronDom');
  const monEl = document.getElementById('cronMon');
  const dowEl = document.getElementById('cronDow');
  const outExpr = document.getElementById('cronOutExpr');
  const outHuman = document.getElementById('cronOutHuman');
  const copyBtn = document.getElementById('btnCopyCron');

  function explainField(val, unit) {
    if (val === '*') return `every ${unit}`;
    if (val.startsWith('*/')) return `every ${val.slice(2)} ${unit}s`;
    return `at ${unit} ${val}`;
  }

  function updateCron() {
    const m = minEl.value.trim() || '*';
    const h = hrEl.value.trim() || '*';
    const d = domEl.value.trim() || '*';
    const mo = monEl.value.trim() || '*';
    const dw = dowEl.value.trim() || '*';
    const expr = `${m} ${h} ${d} ${mo} ${dw}`;
    outExpr.textContent = expr;

    if (expr === '* * * * *') outHuman.textContent = 'Runs every single minute.';
    else if (expr === '0 * * * *') outHuman.textContent = 'Runs once every hour at minute 0.';
    else if (expr === '0 0 * * *') outHuman.textContent = 'Runs daily at midnight (00:00).';
    else if (expr === '0 9 * * 1-5') outHuman.textContent = 'Runs at 9:00 AM every weekday (Monday through Friday).';
    else if (expr === '0 0 * * 0') outHuman.textContent = 'Runs once a week on Sunday at midnight.';
    else if (expr === '0 0 1 * *') outHuman.textContent = 'Runs once a month on the 1st at midnight.';
    else {
      outHuman.textContent = `Runs ${explainField(m, 'minute')}, ${explainField(h, 'hour')}, ${explainField(d, 'day-of-month')}, ${explainField(mo, 'month')}, ${explainField(dw, 'day-of-week')}.`;
    }
  }

  document.querySelectorAll('[data-cron-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parts = btn.dataset.cronPreset.split(' ');
      minEl.value = parts[0];
      hrEl.value = parts[1];
      domEl.value = parts[2];
      monEl.value = parts[3];
      dowEl.value = parts[4];
      updateCron();
    });
  });

  [minEl, hrEl, domEl, monEl, dowEl].forEach(el => {
    if (el) el.addEventListener('input', updateCron);
  });

  copyBtn.addEventListener('click', () => SmartToolzAI.copyToClipboard(outExpr.textContent));
  updateCron();
});
