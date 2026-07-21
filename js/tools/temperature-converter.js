document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Temperature Converter');
  }
  SmartToolzAI.addRecentTool('Temperature Converter', 'tools/temperature-converter.html', '🌡️');
  
  const units = [
    { id: 'C', name: 'Celsius' },
    { id: 'F', name: 'Fahrenheit' },
    { id: 'K', name: 'Kelvin' },
    { id: 'Ra', name: 'Rankine' },
    { id: 'Re', name: 'Reaumur' }
  ];
  
  const popular = [ 
    { label: '0 °C to °F', from: 'C', to: 'F', val: 0 },
    { label: '100 °C to °F', from: 'C', to: 'F', val: 100 },
    { label: '37 °C to °F', from: 'C', to: 'F', val: 37 },
    { label: '-40 °C to °F', from: 'C', to: 'F', val: -40 },
    { label: '0 K to °C', from: 'K', to: 'C', val: 0 }
  ];
  const defaultFrom = 'C';
  const defaultTo = 'F';
  
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
  
  function toCelsius(val, fromId) {
    if (fromId === 'C') return val;
    if (fromId === 'F') return (val - 32) * 5/9;
    if (fromId === 'K') return val - 273.15;
    if (fromId === 'Ra') return (val - 491.67) * 5/9;
    if (fromId === 'Re') return val * 5/4;
    return val;
  }
  
  function fromCelsius(c, toId) {
    if (toId === 'C') return c;
    if (toId === 'F') return (c * 9/5) + 32;
    if (toId === 'K') return c + 273.15;
    if (toId === 'Ra') return (c + 273.15) * 9/5;
    if (toId === 'Re') return c * 4/5;
    return c;
  }

  function convert(val, fromId, toId) {
    if (fromId === toId) return val;
    const c = toCelsius(val, fromId);
    return fromCelsius(c, toId);
  }
  
  function formatNumber(num) {
    return parseFloat(num.toFixed(6)).toString();
  }
  
  function updateConversion() {
    const amount = parseFloat(amountInput.value);
    if(isNaN(amount)) {
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
    resultLabel.textContent = `${amount} °${fromId} = ${formatted} °${toId}`;
  }
  
  function populateTable() {
    popularTable.innerHTML = '';
    popular.forEach(pair => {
      const res = convert(pair.val, pair.from, pair.to);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${pair.label}</td>
        <td>${formatNumber(res)} °${pair.to}</td>
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
