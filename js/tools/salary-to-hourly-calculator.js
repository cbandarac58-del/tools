document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Salary to Hourly Calculator', 'salary-to-hourly-calculator.html', '💵');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Salary to Hourly Calculator');
  }

  const amountEl = document.getElementById('salAmount');
  const periodEl = document.getElementById('salPeriod');
  const hoursEl = document.getElementById('salHoursPerWeek');
  const weeksEl = document.getElementById('salWeeksPerYear');

  const outHourly = document.getElementById('salOutHourly');
  const outDaily = document.getElementById('salOutDaily');
  const outWeekly = document.getElementById('salOutWeekly');
  const outBiweekly = document.getElementById('salOutBiweekly');
  const outMonthly = document.getElementById('salOutMonthly');
  const outAnnual = document.getElementById('salOutAnnual');

  function fmt(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const val = Math.max(0, parseFloat(amountEl.value) || 0);
    const hrs = Math.max(1, parseFloat(hoursEl.value) || 40);
    const wks = Math.max(1, parseFloat(weeksEl.value) || 52);
    const per = periodEl.value;

    let annual = 0;
    if (per === 'annual') annual = val;
    else if (per === 'monthly') annual = val * 12;
    else if (per === 'weekly') annual = val * wks;
    else if (per === 'daily') annual = val * 5 * wks;
    else if (per === 'hourly') annual = val * hrs * wks;

    const totalHours = hrs * wks;
    const hourly = annual / totalHours;
    const daily = (annual / wks) / 5;
    const weekly = annual / wks;
    const biweekly = weekly * 2;
    const monthly = annual / 12;

    outHourly.textContent = fmt(hourly);
    outDaily.textContent = fmt(daily);
    outWeekly.textContent = fmt(weekly);
    outBiweekly.textContent = fmt(biweekly);
    outMonthly.textContent = fmt(monthly);
    outAnnual.textContent = fmt(annual);
  }

  [amountEl, periodEl, hoursEl, weeksEl].forEach(el => {
    if (el) el.addEventListener('input', calc);
    if (el) el.addEventListener('change', calc);
  });

  calc();
});
