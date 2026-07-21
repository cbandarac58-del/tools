document.addEventListener('DOMContentLoaded', () => {
  const toolName = 'Speed Converter';
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = window.SmartToolzAI ? SmartToolzAI.createToolSidebar(toolName) : '';
  }
  if (window.SmartToolzAI) {
    SmartToolzAI.addRecentTool(toolName, 'tools/speed-converter.html', '🚀');
  }

  const factors = {
    m_s: 1,
    km_h: 0.277778,
    mph: 0.44704,
    knot: 0.514444,
    ft_s: 0.3048,
    mach: 340.29
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
