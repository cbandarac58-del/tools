document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Etsy, eBay & TikTok Shop Calculator', 'ecommerce-fee-calculator.html', '🛍️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Etsy, eBay & TikTok Shop Calculator');
  }

  const platformEl = document.getElementById('ecPlatform');
  const salePriceEl = document.getElementById('ecSalePrice');
  const shippingChargeEl = document.getElementById('ecShippingCharge');
  const itemCostEl = document.getElementById('ecItemCost');
  const shippingCostEl = document.getElementById('ecShippingCost');
  const adSpendEl = document.getElementById('ecAdSpend');

  const outRevenue = document.getElementById('ecOutRevenue');
  const outFees = document.getElementById('ecOutFees');
  const outProfit = document.getElementById('ecOutProfit');
  const outMargin = document.getElementById('ecOutMargin');
  const feeBreakdownText = document.getElementById('ecFeeBreakdownText');

  // 2026 Marketplace Fee Structures: [referralPct, paymentPct, fixedFee, listingFee, name]
  const platforms = {
    etsy: { ref: 0.065, pay: 0.03, fixed: 0.25, listing: 0.20, name: 'Etsy (6.5% Transaction + 3% + $0.25 Payment + $0.20 Listing)' },
    ebay: { ref: 0.1325, pay: 0.0, fixed: 0.30, listing: 0.0, name: 'eBay Standard (13.25% Final Value Fee + $0.30 Order Fee)' },
    tiktok: { ref: 0.06, pay: 0.0, fixed: 0.30, listing: 0.0, name: 'TikTok Shop (6.0% Referral Commission + $0.30 Processing)' },
    shopify: { ref: 0.0, pay: 0.029, fixed: 0.30, listing: 0.0, name: 'Shopify Payments (2.9% + $0.30 Card Processing)' },
    amazon: { ref: 0.15, pay: 0.0, fixed: 0.0, listing: 0.0, name: 'Amazon Referral Standard (15% Category Referral Fee)' }
  };

  function calc() {
    const p = platforms[platformEl.value] || platforms.etsy;
    const price = Math.max(0, parseFloat(salePriceEl.value) || 0);
    const shipCharged = Math.max(0, parseFloat(shippingChargeEl.value) || 0);
    const cogs = Math.max(0, parseFloat(itemCostEl.value) || 0);
    const shipActual = Math.max(0, parseFloat(shippingCostEl.value) || 0);
    const adCost = Math.max(0, parseFloat(adSpendEl.value) || 0);

    const grossRev = price + shipCharged;
    const refFee = grossRev * p.ref;
    const payFee = grossRev > 0 ? (grossRev * p.pay) + p.fixed : 0;
    const totalMarketplaceFees = grossRev > 0 ? (refFee + payFee + p.listing) : 0;

    const netProfit = grossRev - totalMarketplaceFees - cogs - shipActual - adCost;
    const margin = grossRev > 0 ? (netProfit / grossRev) * 100 : 0;

    outRevenue.textContent = `$${grossRev.toFixed(2)}`;
    outFees.textContent = `$${totalMarketplaceFees.toFixed(2)}`;
    outProfit.textContent = `${netProfit >= 0 ? '$' : '-$'}${Math.abs(netProfit).toFixed(2)}`;
    outProfit.style.color = netProfit >= 0 ? '#34d399' : '#f87171';
    outMargin.textContent = `${margin.toFixed(1)}%`;
    feeBreakdownText.textContent = `${p.name} | Platform Commission: $${refFee.toFixed(2)} | Payment/Fixed Fee: $${(payFee + p.listing).toFixed(2)}`;
  }

  [platformEl, salePriceEl, shippingChargeEl, itemCostEl, shippingCostEl, adSpendEl].forEach(el => {
    if (el) el.addEventListener('input', calc);
    if (el) el.addEventListener('change', calc);
  });

  calc();
});
