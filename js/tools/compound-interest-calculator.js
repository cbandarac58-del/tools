document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Compound Interest Calculator', 'compound-interest-calculator.html', '📈');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Compound Interest Calculator');
  }

  const ciInitial = document.getElementById('ciInitial');
  const ciMonthly = document.getElementById('ciMonthly');
  const ciRate = document.getElementById('ciRate');
  const ciYears = document.getElementById('ciYears');
  const ciFutureOut = document.getElementById('ciFutureOut');
  const ciPrincipalOut = document.getElementById('ciPrincipalOut');
  const ciInterestOut = document.getElementById('ciInterestOut');
  const ciTableBody = document.getElementById('ciTableBody');

  function fmt(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculateCI() {
    const initial = Math.max(0, parseFloat(ciInitial.value) || 0);
    const monthly = Math.max(0, parseFloat(ciMonthly.value) || 0);
    const rate = Math.max(0, parseFloat(ciRate.value) || 0) / 100;
    const years = Math.min(60, Math.max(1, parseInt(ciYears.value) || 1));

    const monthlyRate = rate / 12;
    let balance = initial;
    let contributed = initial;
    let rowsHtml = '';

    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        balance = (balance + monthly) * (1 + monthlyRate);
        contributed += monthly;
      }
      const interest = balance - contributed;
      rowsHtml += `
        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <td style="padding:0.55rem 0.65rem;font-weight:600;">Year ${y}</td>
          <td style="padding:0.55rem 0.65rem;">${fmt(contributed)}</td>
          <td style="padding:0.55rem 0.65rem;color:#818cf8;">+${fmt(interest)}</td>
          <td style="padding:0.55rem 0.65rem;font-weight:700;color:#34d399;">${fmt(balance)}</td>
        </tr>
      `;
    }

    ciFutureOut.textContent = fmt(balance);
    ciPrincipalOut.textContent = fmt(contributed);
    ciInterestOut.textContent = fmt(balance - contributed);
    ciTableBody.innerHTML = rowsHtml;
  }

  [ciInitial, ciMonthly, ciRate, ciYears].forEach(el => {
    if (el) el.addEventListener('input', calculateCI);
  });

  calculateCI();
});
