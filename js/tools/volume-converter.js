document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Volume Converter');
  }
  SmartToolzAI.addRecentTool('Volume Converter', 'tools/volume-converter.html', '🧪');
  
  const units = [
    { id: 'm3', name: 'Cubic Meter', factor: 1 },
    { id: 'km3', name: 'Cubic Kilometer', factor: 1e9 },
    { id: 'cm3', name: 'Cubic Centimeter', factor: 1e-6 },
    { id: 'mm3', name: 'Cubic Millimeter', factor: 1e-9 },
    { id: 'L', name: 'Liter', factor: 0.001 },
    { id: 'mL', name: 'Milliliter', factor: 0.000001 },
    { id: 'gal_us', name: 'US Gallon', factor: 0.00378541 },
    { id: 'qt_us', name: 'US Quart', factor: 0.000946353 },
    { id: 'pt_us', name: 'US Pint', factor: 0.000473176 },
    { id: 'cup', name: 'US Cup', factor: 0.000236588 },
    { id: 'fl_oz_us', name: 'US Fluid Ounce', factor: 2.9574e-5 },
    { id: 'tbsp', name: 'US Tablespoon', factor: 1.4787e-5 },
    { id: 'tsp', name: 'US Teaspoon', factor: 4.9289e-6 },
    { id: 'gal_imp', name: 'Imperial Gallon', factor: 0.00454609 },
    { id: 'qt_imp', name: 'Imperial Quart', factor: 0.00113652 },
    { id: 'pt_imp', name: 'Imperial Pint', factor: 0.000568261 },
    { id: 'fl_oz_imp', name: 'Imperial Fluid Ounce', factor: 2.8413e-5 },
    { id: 'ft3', name: 'Cubic Foot', factor: 0.0283168 },
    { id: 'in3', name: 'Cubic Inch', factor: 1.6387e-5 }
  ];
  const popular = [['L', 'gal_us'], ['mL', 'fl_oz_us'], ['L', 'qt_us'], ['gal_us', 'L'], ['m3', 'ft3']];
  const defaultFrom = 'L';
  const defaultTo = 'gal_us';
  
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
