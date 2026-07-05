document.addEventListener('DOMContentLoaded', () => {
  const caseInput = document.getElementById('caseInput');
  const clearCaseBtn = document.getElementById('clearCaseBtn');
  const pasteCaseBtn = document.getElementById('pasteCaseBtn');

  // Outputs
  const outUpper = document.getElementById('outUpper');
  const outLower = document.getElementById('outLower');
  const outTitle = document.getElementById('outTitle');
  const outSentence = document.getElementById('outSentence');
  const outCamel = document.getElementById('outCamel');
  const outSnake = document.getElementById('outSnake');
  const outKebab = document.getElementById('outKebab');
  const outPascal = document.getElementById('outPascal');
  const outAlternating = document.getElementById('outAlternating');
  const outReverse = document.getElementById('outReverse');
  const outBubble = document.getElementById('outBubble');
  const outBinary = document.getElementById('outBinary');

  SmartToolzAI.addRecentTool('Case Converter', 'case-converter.html', '🔤');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Case Converter');

  // Case Conversion Functions
  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function toSentenceCase(str) {
    return str.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
  }

  function toCamelCase(str) {
    return str.toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[A-Z]/, c => c.toLowerCase());
  }

  function toSnakeCase(str) {
    return str.toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  function toKebabCase(str) {
    return str.toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function toPascalCase(str) {
    return str.toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[a-z]/, c => c.toUpperCase());
  }

  function toAlternatingCase(str) {
    return str.split('').map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
  }

  function toReverseCase(str) {
    return str.split('').reverse().join('');
  }

  function toBubbleCase(str) {
    const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const bubble = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨';
    return str.split('').map(char => {
      const index = normal.indexOf(char);
      return index > -1 ? bubble[index] : char;
    }).join('');
  }

  function toBinaryCode(str) {
    return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  }

  function performConversion() {
    const text = caseInput.value;

    if (!text) {
      const emptyMsg = '<span style="color: var(--text-muted); font-style: italic;">Awaiting text...</span>';
      outUpper.innerHTML = emptyMsg;
      outLower.innerHTML = emptyMsg;
      outTitle.innerHTML = emptyMsg;
      outSentence.innerHTML = emptyMsg;
      outCamel.innerHTML = emptyMsg;
      outSnake.innerHTML = emptyMsg;
      outKebab.innerHTML = emptyMsg;
      outPascal.innerHTML = emptyMsg;
      outAlternating.innerHTML = emptyMsg;
      outReverse.innerHTML = emptyMsg;
      outBubble.innerHTML = emptyMsg;
      outBinary.innerHTML = emptyMsg;
      return;
    }

    // Assign text conversions
    outUpper.textContent = text.toUpperCase();
    outLower.textContent = text.toLowerCase();
    outTitle.textContent = toTitleCase(text);
    outSentence.textContent = toSentenceCase(text);
    outCamel.textContent = toCamelCase(text);
    outSnake.textContent = toSnakeCase(text);
    outKebab.textContent = toKebabCase(text);
    outPascal.textContent = toPascalCase(text);
    outAlternating.textContent = toAlternatingCase(text);
    outReverse.textContent = toReverseCase(text);
    outBubble.textContent = toBubbleCase(text);
    outBinary.textContent = toBinaryCode(text);
  }

  // Event Listeners
  caseInput.addEventListener('input', performConversion);

  clearCaseBtn.addEventListener('click', () => {
    caseInput.value = '';
    performConversion();
  });

  pasteCaseBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      caseInput.value = text;
      performConversion();
      SmartToolzAI.showToast('Text pasted from clipboard!');
    } catch {
      SmartToolzAI.showToast('Failed to paste text. Please paste manually.', 'error');
    }
  });

  // Handle Copy buttons on cards
  document.querySelectorAll('.copy-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.target.dataset.target;
      const targetEl = document.getElementById(targetId);
      
      if (targetEl && targetEl.textContent && !targetEl.querySelector('span')) {
        SmartToolzAI.copyToClipboard(targetEl.textContent);
        
        // Show local copied status
        const originalText = e.target.textContent;
        e.target.textContent = 'Copied! ✅';
        e.target.style.color = '#22c55e';
        e.target.style.borderColor = '#22c55e';
        
        setTimeout(() => {
          e.target.textContent = originalText;
          e.target.style.color = '';
          e.target.style.borderColor = '';
        }, 2000);
      } else {
        SmartToolzAI.showToast('Nothing to copy!', 'error');
      }
    });
  });

  // Run initially
  performConversion();
});
