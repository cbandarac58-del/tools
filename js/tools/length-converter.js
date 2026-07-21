document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Length Converter');
  }
  SmartToolzAI.addRecentTool('Length Converter', 'tools/length-converter.html', '📏');
  
  const units = [
    { id: 'km', name: 'Kilometer', factor: 1000 },
    { id: 'm', name: 'Meter', factor: 1 },
    { id: 'cm', name: 'Centimeter', factor: 0.01 },
    { id: 'mm', name: 'Millimeter', factor: 0.001 },
    { id: 'um', name: 'Micrometer', factor: 0.000001 },
    { id: 'nm', name: 'Nanometer', factor: 1e-9 },
    { id: 'mi', name: 'Mile', factor: 1609.344 },
    { id: 'yd', name: 'Yard', factor: 0.9144 },
    { id: 'ft', name: 'Foot', factor: 0.3048 },
    { id: 'in', name: 'Inch', factor: 0.0254 },
    { id: 'nmi', name: 'Nautical Mile', factor: 1852 }
  ];
  const popular = [['km', 'mi'], ['m', 'ft'], ['cm', 'in'], ['ft', 'm'], ['mi', 'km']];
  const defaultFrom = 'm';
  const defaultTo = 'ft';
  
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
