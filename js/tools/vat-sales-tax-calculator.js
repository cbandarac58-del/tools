document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('VAT & Sales Tax Calculator', 'vat-sales-tax-calculator.html', '🧾');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('VAT & Sales Tax Calculator');
  }

  const amtEl = document.getElementById('taxAmount');
  const rateEl = document.getElementById('taxRate');
  const presetEl = document.getElementById('taxPreset');
  const modeEl = document.getElementById('taxMode');

  const outNet = document.getElementById('taxOutNet');
  const outTax = document.getElementById('taxOutTax');
  const outGross = document.getElementById('taxOutGross');

  function calc() {
    const amt = Math.max(0, parseFloat(amtEl.value) || 0);
    const rate = Math.max(0, parseFloat(rateEl.value) || 0) / 100;
    let net = 0, tax = 0, gross = 0;

    if (modeEl.value === 'add') {
      net = amt;
      tax = amt * rate;
      gross = net + tax;
    } else {
      gross = amt;
      net = amt / (1 + rate);
      tax = gross - net;
    }

    outNet.textContent = `$${net.toFixed(2)}`;
    outTax.textContent = `$${tax.toFixed(2)}`;
    outGross.textContent = `$${gross.toFixed(2)}`;
  }

  presetEl.addEventListener('change', () => {
    if (presetEl.value !== 'custom') {
      rateEl.value = presetEl.value;
      calc();
    }
  });

  [amtEl, rateEl, modeEl].forEach(el => {
    if (el) el.addEventListener('input', calc);
    if (el) el.addEventListener('change', calc);
  });

  calc();
});
