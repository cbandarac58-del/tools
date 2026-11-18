document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Base64 Encoder & Decoder', 'base64-encoder-decoder.html', '🔐');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Base64 Encoder & Decoder');
  }

  const inputEl = document.getElementById('b64Input');
  const outputEl = document.getElementById('b64Output');
  const btnEncode = document.getElementById('btnB64Encode');
  const btnDecode = document.getElementById('btnB64Decode');
  const btnCopy = document.getElementById('btnB64Copy');
  const fileInput = document.getElementById('b64FileInput');

  btnEncode.addEventListener('click', () => {
    const raw = inputEl.value;
    if (!raw) {
      SmartToolzAI.showToast('Please enter text to encode', 'error');
      return;
    }
    try {
      const encoded = btoa(unescape(encodeURIComponent(raw)));
      outputEl.textContent = encoded;
      SmartToolzAI.showToast('Text encoded to Base64!');
    } catch (e) {
      SmartToolzAI.showToast('Error encoding text', 'error');
    }
  });

  btnDecode.addEventListener('click', () => {
    const raw = inputEl.value.trim().replace(/^data:[^;]+;base64,/, '');
    if (!raw) {
      SmartToolzAI.showToast('Please paste Base64 string to decode', 'error');
      return;
    }
    try {
      const decoded = decodeURIComponent(escape(atob(raw)));
      outputEl.textContent = decoded;
      SmartToolzAI.showToast('Base64 decoded successfully!');
    } catch (e) {
      SmartToolzAI.showToast('Invalid Base64 string', 'error');
    }
  });

  if (fileInput) {
    fileInput.addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ev => {
          outputEl.textContent = ev.target.result;
          SmartToolzAI.showToast(`Converted ${file.name} to Base64 Data URI!`);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  btnCopy.addEventListener('click', () => {
    if (outputEl.textContent && outputEl.textContent !== 'Base64 result will appear here...') {
      SmartToolzAI.copyToClipboard(outputEl.textContent);
    }
  });
});
