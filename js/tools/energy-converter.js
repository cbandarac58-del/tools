document.addEventListener('DOMContentLoaded', () => {
  const toolName = 'Energy Converter';
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = window.SmartToolzAI ? SmartToolzAI.createToolSidebar(toolName) : '';
  }
  if (window.SmartToolzAI) {
    SmartToolzAI.addRecentTool(toolName, 'tools/energy-converter.html', '⚡');
  }

  const factors = {
    J: 1,
    kJ: 1000,
    MJ: 1e6,
    cal: 4.184,
    kcal: 4184,
    Wh: 3600,
    kWh: 3600000,
    eV: 1.60218e-19,
    BTU: 1055.06,
    ft_lb: 1.35582,
    erg: 1e-7
  };

  const inputEl = document.getElementById('convertInput');
  const fromEl = document.getElementById('fromUnit');
  const toEl = document.getElementById('toUnit');
  const resultValue = document.getElementById('resultValue');
  const resultLabel = document.getElementById('resultLabel');
  const swapBtn = document.getElementById('swapBtn');
  const copyBtn = document.getElementById('copyBtn');

  function updateConversion() {
    const amount = parseFloat(inputEl.value) || 0;
    const fromFactor = factors[fromEl.value];
    const toFactor = factors[toEl.value];
    
    const baseValue = amount * fromFactor;
    const finalValue = baseValue / toFactor;
    
    let displayValue = finalValue;
    if (Math.abs(displayValue) > 0 && (Math.abs(displayValue) < 0.000001 || Math.abs(displayValue) > 10000000)) {
      displayValue = finalValue.toExponential(6);
    } else {
      displayValue = finalValue.toLocaleString('en-US', { maximumFractionDigits: 6 });
    }
    
    resultValue.textContent = displayValue;
    resultLabel.textContent = toEl.options[toEl.selectedIndex].text;
  }

  inputEl.addEventListener('input', updateConversion);
  fromEl.addEventListener('change', updateConversion);
  toEl.addEventListener('change', updateConversion);

  swapBtn.addEventListener('click', () => {
    const temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;
    updateConversion();
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(`${resultValue.textContent} ${resultLabel.textContent}`).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
  });

  updateConversion();
});
