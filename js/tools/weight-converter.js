document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Weight & Mass Converter');
  }
  SmartToolzAI.addRecentTool('Weight & Mass Converter', 'tools/weight-converter.html', '⚖️');
  
  const units = [
    { id: 'kg', name: 'Kilogram', factor: 1 },
    { id: 'g', name: 'Gram', factor: 0.001 },
    { id: 'mg', name: 'Milligram', factor: 0.000001 },
    { id: 'ug', name: 'Microgram', factor: 1e-9 },
    { id: 't', name: 'Metric Ton', factor: 1000 },
    { id: 'ton_imp', name: 'Imperial Ton', factor: 1016.05 },
    { id: 'ton_us', name: 'US Ton', factor: 907.185 },
    { id: 'lb', name: 'Pound', factor: 0.453592 },
    { id: 'oz', name: 'Ounce', factor: 0.0283495 },
    { id: 'stone', name: 'Stone', factor: 6.35029 }
  ];
  const popular = [['kg', 'lb'], ['kg', 'oz'], ['g', 'oz'], ['lb', 'kg'], ['t', 'kg']];
  const defaultFrom = 'kg';
  const defaultTo = 'lb';
  
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
