document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('JSON Formatter & Validator', 'json-formatter.html', '💻');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('JSON Formatter & Validator');
  }

  const jsonInput = document.getElementById('jsonInput');
  const jsonOutput = document.getElementById('jsonOutput');
  const jsonStatusBanner = document.getElementById('jsonStatusBanner');
  const btnFormatJson2 = document.getElementById('btnFormatJson2');
  const btnFormatJson4 = document.getElementById('btnFormatJson4');
  const btnMinifyJson = document.getElementById('btnMinifyJson');
  const btnSampleJson = document.getElementById('btnSampleJson');
  const copyJsonBtn = document.getElementById('copyJsonBtn');

  function processJson(indent) {
    const raw = jsonInput.value.trim();
    if (!raw) {
      SmartToolzAI.showToast('Please paste JSON input first', 'error');
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      const formatted = indent === 0 ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
      jsonOutput.textContent = formatted;
      jsonStatusBanner.style.display = 'block';
      jsonStatusBanner.style.background = 'rgba(16,185,129,0.12)';
      jsonStatusBanner.style.border = '1px solid rgba(16,185,129,0.35)';
      jsonStatusBanner.style.color = '#34d399';
      jsonStatusBanner.textContent = `✅ Valid JSON — ${formatted.length.toLocaleString()} characters`;
    } catch (err) {
      jsonStatusBanner.style.display = 'block';
      jsonStatusBanner.style.background = 'rgba(239,68,68,0.12)';
      jsonStatusBanner.style.border = '1px solid rgba(239,68,68,0.35)';
      jsonStatusBanner.style.color = '#f87171';
      jsonStatusBanner.textContent = `❌ Invalid JSON Syntax: ${err.message}`;
    }
  }

  btnFormatJson2.addEventListener('click', () => processJson(2));
  btnFormatJson4.addEventListener('click', () => processJson(4));
  btnMinifyJson.addEventListener('click', () => processJson(0));
  btnSampleJson.addEventListener('click', () => {
    jsonInput.value = JSON.stringify({
      platform: "SmartToolzAI",
      version: "2.0",
      privacy: "100% Client-Side",
      supportedLanguages: ["en", "es", "pt", "de", "fr", "ja"],
      metrics: { lighthouseScore: 100, signupRequired: false }
    });
    processJson(2);
  });

  copyJsonBtn.addEventListener('click', () => {
    if (jsonOutput.textContent && jsonOutput.textContent !== 'Formatted JSON will appear here...') {
      SmartToolzAI.copyToClipboard(jsonOutput.textContent);
    }
  });
});
