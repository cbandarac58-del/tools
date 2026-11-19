document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Mortgage & Loan EMI Calculator', 'mortgage-calculator.html', '🏠');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Mortgage & Loan EMI Calculator');
  }

  const priceEl = document.getElementById('mgHomePrice');
  const downEl = document.getElementById('mgDownPayment');
  const rateEl = document.getElementById('mgRate');
  const termEl = document.getElementById('mgYears');
  const taxEl = document.getElementById('mgMonthlyTax');

  const outMonthly = document.getElementById('mgOutMonthly');
  const outLoanAmt = document.getElementById('mgOutLoanAmt');
  const outTotalInt = document.getElementById('mgOutTotalInt');
  const outTotalPay = document.getElementById('mgOutTotalPay');
  const tableBody = document.getElementById('mgAmortBody');

  function fmt(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const price = Math.max(0, parseFloat(priceEl.value) || 0);
    const down = Math.max(0, parseFloat(downEl.value) || 0);
    const principal = Math.max(0, price - down);
    const annualRate = Math.max(0, parseFloat(rateEl.value) || 0) / 100;
    const years = Math.min(50, Math.max(1, parseInt(termEl.value) || 30));
    const monthlyExtra = Math.max(0, parseFloat(taxEl.value) || 0);

    const n = years * 12;
    const r = annualRate / 12;
    let monthlyPI = 0;
    if (r === 0) {
      monthlyPI = principal / n;
    } else {
      monthlyPI = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalMonthly = monthlyPI + monthlyExtra;
    const totalPayment = monthlyPI * n;
    const totalInterest = Math.max(0, totalPayment - principal);

    outMonthly.textContent = fmt(totalMonthly);
    outLoanAmt.textContent = fmt(principal);
    outTotalInt.textContent = fmt(totalInterest);
    outTotalPay.textContent = fmt(totalPayment);

    let bal = principal;
    let rows = '';
    for (let y = 1; y <= years; y++) {
      let yrInt = 0, yrPrin = 0;
      for (let m = 1; m <= 12; m++) {
        const interestM = bal * r;
        const prinM = Math.min(bal, monthlyPI - interestM);
        yrInt += interestM;
        yrPrin += prinM;
        bal = Math.max(0, bal - prinM);
      }
      rows += `
        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <td style="padding:0.55rem 0.65rem;font-weight:600;">Year ${y}</td>
          <td style="padding:0.55rem 0.65rem;color:#34d399;">${fmt(yrPrin)}</td>
          <td style="padding:0.55rem 0.65rem;color:#f87171;">${fmt(yrInt)}</td>
          <td style="padding:0.55rem 0.65rem;font-weight:700;">${fmt(bal)}</td>
        </tr>
      `;
    }
    tableBody.innerHTML = rows;
  }

  [priceEl, downEl, rateEl, termEl, taxEl].forEach(el => {
    if (el) el.addEventListener('input', calc);
  });

  calc();
});
