document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('PayPal & Stripe Fee Calculator', 'paypal-fee-calculator.html', '💳');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('PayPal & Stripe Fee Calculator');
  }

  const feeAmount = document.getElementById('feeAmount');
  const feeRatePreset = document.getElementById('feeRatePreset');
  const customRateBox = document.getElementById('customRateBox');
  const customPercent = document.getElementById('customPercent');
  const customFixed = document.getElementById('customFixed');
  const outTotalFee = document.getElementById('outTotalFee');
  const outEffectiveRate = document.getElementById('outEffectiveRate');
  const outYouReceive = document.getElementById('outYouReceive');
  const outAskFor = document.getElementById('outAskFor');
  const outToReceiveExact = document.getElementById('outToReceiveExact');
  const copyFeeReportBtn = document.getElementById('copyFeeReportBtn');

  function calculateFees() {
    const amount = Math.max(0, parseFloat(feeAmount.value) || 0);
    let pct = 3.49;
    let fixed = 0.49;

    if (feeRatePreset.value === 'custom') {
      customRateBox.style.display = 'grid';
      pct = Math.max(0, parseFloat(customPercent.value) || 0);
      fixed = Math.max(0, parseFloat(customFixed.value) || 0);
    } else {
      customRateBox.style.display = 'none';
      const parts = feeRatePreset.value.split('|');
      pct = parseFloat(parts[0]);
      fixed = parseFloat(parts[1]);
    }

    const rateDec = pct / 100;
    const totalFee = amount > 0 ? (amount * rateDec) + fixed : 0;
    const netReceive = Math.max(0, amount - totalFee);
    const askFor = (amount > 0 && rateDec < 1) ? (amount + fixed) / (1 - rateDec) : 0;
    const effRate = amount > 0 ? (totalFee / amount) * 100 : 0;

    outTotalFee.textContent = `$${totalFee.toFixed(2)}`;
    outEffectiveRate.textContent = `Effective Rate: ${effRate.toFixed(2)}%`;
    outYouReceive.textContent = `$${netReceive.toFixed(2)}`;
    outAskFor.textContent = `$${askFor.toFixed(2)}`;
    outToReceiveExact.textContent = `To receive $${amount.toFixed(2)} net`;
  }

  [feeAmount, feeRatePreset, customPercent, customFixed].forEach(el => {
    if (el) el.addEventListener('input', calculateFees);
    if (el) el.addEventListener('change', calculateFees);
  });

  if (copyFeeReportBtn) {
    copyFeeReportBtn.addEventListener('click', () => {
      const amt = parseFloat(feeAmount.value) || 0;
      const summary = `Amount: $${amt.toFixed(2)} | Fee: ${outTotalFee.textContent} | Net Payout: ${outYouReceive.textContent} | Ask Client For: ${outAskFor.textContent}`;
      SmartToolzAI.copyToClipboard(summary);
    });
  }

  calculateFees();
});
