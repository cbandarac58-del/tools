
document.addEventListener('DOMContentLoaded', () => {
  const birthDate = document.getElementById('birthDate');
  const calculateAgeBtn = document.getElementById('calculateAgeBtn');
  const ageOutput = document.getElementById('ageOutput');

  SmartToolzAI.addRecentTool('Age Calculator', 'age-calculator.html', '🎂');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Age Calculator');

  const zodiacSigns = [
    { name: 'Capricorn', start: '12-22', end: '01-19' },
    { name: 'Aquarius', start: '01-20', end: '02-18' },
    { name: 'Pisces', start: '02-19', end: '03-20' },
    { name: 'Aries', start: '03-21', end: '04-19' },
    { name: 'Taurus', start: '04-20', end: '05-20' },
    { name: 'Gemini', start: '05-21', end: '06-20' },
    { name: 'Cancer', start: '06-21', end: '07-22' },
    { name: 'Leo', start: '07-23', end: '08-22' },
    { name: 'Virgo', start: '08-23', end: '09-22' },
    { name: 'Libra', start: '09-23', end: '10-22' },
    { name: 'Scorpio', start: '10-23', end: '11-21' },
    { name: 'Sagittarius', start: '11-22', end: '12-21' }
  ];

  function getZodiacSign(day, month) {
    const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    for (const sign of zodiacSigns) {
      if (sign.start <= sign.end) {
        if (dateStr >= sign.start && dateStr <= sign.end) return sign.name;
      } else {
        if (dateStr >= sign.start || dateStr <= sign.end) return sign.name;
      }
    }
    return 'Capricorn';
  }

  function calculateAge() {
    const birthVal = birthDate.value;
    if (!birthVal) return;

    const [year, month, day] = birthVal.split('-').map(Number);
    const dob = new Date(year, month - 1, day);
    const today = new Date();

    if (dob > today) {
      ageOutput.innerHTML = 'Birthdate cannot be in the future!';
      return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Next birthday countdown
    let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(nextBday - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Stats
    const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;
    const bornDay = dob.toLocaleDateString('en-US', { weekday: 'long' });
    const zodiac = getZodiacSign(dob.getDate(), dob.getMonth() + 1);

    ageOutput.innerHTML = `
      <p style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--text-accent); font-weight: bold;">
        ${years} Years, ${months} Months, ${days} Days old
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; font-size: 0.95rem;">
        <div>📅 Born on: <strong>${bornDay}</strong></div>
        <div>🌟 Zodiac Sign: <strong>${zodiac}</strong></div>
        <div>🎂 Next Birthday in: <strong>${diffDays} days</strong></div>
        <div>🗓️ Total Months lived: <strong>${totalMonths.toLocaleString()}</strong></div>
        <div>🔗 Total Weeks lived: <strong>${totalWeeks.toLocaleString()}</strong></div>
        <div>⏱️ Total Days lived: <strong>${totalDays.toLocaleString()}</strong></div>
      </div>
    `;
  }

  birthDate.addEventListener('change', calculateAge);
  calculateAgeBtn.addEventListener('click', calculateAge);
  calculateAge();
});
