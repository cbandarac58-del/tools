document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Area Converter');
  }
  SmartToolzAI.addRecentTool('Area Converter', 'tools/area-converter.html', '📐');
  
  const units = [
    { id: 'm2', name: 'Square Meter', factor: 1 },
    { id: 'km2', name: 'Square Kilometer', factor: 1e6 },
    { id: 'cm2', name: 'Square Centimeter', factor: 0.0001 },
    { id: 'mm2', name: 'Square Millimeter', factor: 0.000001 },
    { id: 'um2', name: 'Square Micrometer', factor: 1e-12 },
    { id: 'ha', name: 'Hectare', factor: 10000 },
    { id: 'acre', name: 'Acre', factor: 4046.86 },
    { id: 'mi2', name: 'Square Mile', factor: 2589988.11 },
    { id: 'yd2', name: 'Square Yard', factor: 0.836127 },
    { id: 'ft2', name: 'Square Foot', factor: 0.0929030 },
    { id: 'in2', name: 'Square Inch', factor: 0.00064516 }
  ];
  const popular = [['m2', 'ft2'], ['km2', 'mi2'], ['ha', 'acre'], ['m2', 'yd2'], ['ft2', 'm2']];
  const defaultFrom = 'm2';
  const defaultTo = 'ft2';
  
  const amountInput = document.getElementById('amount');
  const fromSelect = document.getElementById('fromUnit');
  const toSelect = document.getElementById('toUnit');
  const swapBtn = document.getElementById('swapBtn');
  const resultValue = document.getElementById('resultValue');
  const resultLabel = document.getElementById('resultLabel');
  const copyBtn = document.getElementById('copyBtn');
  const popularTable = document.getElementById('popularTable').querySelector('tbody');
  
  function populateSelects() {
    units.forEach(u => {
      fromSelect.add(new Option(u.name, u.id));
      toSelect.add(new Option(u.name, u.id));
    });
    fromSelect.value = defaultFrom;
    toSelect.value = defaultTo;
  }
  
  function convert(val, fromId, toId) {
    const from = units.find(u => u.id === fromId);
    const to = units.find(u => u.id === toId);
    if (!from || !to) return 0;
    const baseVal = val * from.factor;
    return baseVal / to.factor;
  }
  
  function formatNumber(num) {
    if (Math.abs(num) < 0.000001 && num !== 0) return num.toExponential(6);
    return parseFloat(num.toFixed(6)).toString();
  }
  
  function updateConversion() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) {
      resultValue.textContent = '0';
      resultLabel.textContent = '';
      return;
    }
    const fromId = fromSelect.value;
    const toId = toSelect.value;
    
    const result = convert(amount, fromId, toId);
    const formatted = formatNumber(result);
    
    const fromName = units.find(u => u.id === fromId).name;
    const toName = units.find(u => u.id === toId).name;
    
    resultValue.textContent = formatted;
    resultLabel.textContent = `${amount} ${fromName} = ${formatted} ${toName}`;
  }
  
  function populateTable() {
    popularTable.innerHTML = '';
    popular.forEach(pair => {
      const fromId = pair[0];
      const toId = pair[1];
      const res = convert(1, fromId, toId);
      const fromName = units.find(u => u.id === fromId).name;
      const toName = units.find(u => u.id === toId).name;
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>1 ${fromName} to ${toName}</td>
        <td>${formatNumber(res)} ${toName}</td>
      `;
      popularTable.appendChild(tr);
    });
  }
  
  swapBtn.addEventListener('click', () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateConversion();
  });
  
  amountInput.addEventListener('input', updateConversion);
  fromSelect.addEventListener('change', updateConversion);
  toSelect.addEventListener('change', updateConversion);
  
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultValue.textContent).then(() => {
      SmartToolzAI.showToast('Result copied to clipboard!');
    });
  });
  
  populateSelects();
  updateConversion();
  populateTable();
});
