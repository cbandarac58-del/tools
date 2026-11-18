document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('YouTube & TikTok Money Calculator', 'youtube-money-calculator.html', '▶️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('YouTube & TikTok Money Calculator');
  }

  const ytDailyViews = document.getElementById('ytDailyViews');
  const ytNichePreset = document.getElementById('ytNichePreset');
  const ytCustomRpm = document.getElementById('ytCustomRpm');
  const ytDailyOut = document.getElementById('ytDailyOut');
  const ytMonthlyOut = document.getElementById('ytMonthlyOut');
  const ytYearlyOut = document.getElementById('ytYearlyOut');
  const copyYtStatsBtn = document.getElementById('copyYtStatsBtn');

  function formatMoney(num) {
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updateCalc() {
    const views = Math.max(0, parseFloat(ytDailyViews.value) || 0);
    const rpm = Math.max(0, parseFloat(ytCustomRpm.value) || 0);
    const daily = (views / 1000) * rpm;
    const monthly = daily * 30;
    const yearly = daily * 365;

    ytDailyOut.textContent = formatMoney(daily);
    ytMonthlyOut.textContent = formatMoney(monthly);
    ytYearlyOut.textContent = formatMoney(yearly);
  }

  ytNichePreset.addEventListener('change', () => {
    ytCustomRpm.value = ytNichePreset.value;
    updateCalc();
  });

  ytDailyViews.addEventListener('input', updateCalc);
  ytCustomRpm.addEventListener('input', updateCalc);

  if (copyYtStatsBtn) {
    copyYtStatsBtn.addEventListener('click', () => {
      const txt = `Daily Views: ${ytDailyViews.value} | RPM: $${ytCustomRpm.value} | Daily: ${ytDailyOut.textContent} | Monthly: ${ytMonthlyOut.textContent} | Yearly: ${ytYearlyOut.textContent}`;
      SmartToolzAI.copyToClipboard(txt);
    });
  }

  updateCalc();
});
