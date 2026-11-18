document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('WEBP / PNG / JPG Converter', 'webp-to-png-jpg-converter.html', '🔄');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('WEBP / PNG / JPG Converter');
  }

  const dropzone = document.getElementById('fmtDropzone');
  const fileInput = document.getElementById('fmtFileInput');
  const targetFormat = document.getElementById('fmtTargetSelect');
  const qualitySlider = document.getElementById('fmtQuality');
  const qualityLabel = document.getElementById('fmtQualityVal');
  const convertBtn = document.getElementById('btnFmtConvert');
  const resultBox = document.getElementById('fmtResultBox');
  const previewImg = document.getElementById('fmtPreviewImg');
  const downloadBtn = document.getElementById('btnFmtDownload');
  const infoText = document.getElementById('fmtInfoText');

  let loadedImg = null;
  let origFile = null;
  let convertedUrl = null;
  let outExt = 'png';

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.style.borderColor = '#818cf8'; });
  dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(79,70,229,0.4)'; });
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.style.borderColor = 'rgba(79,70,229,0.4)';
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', e => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  });

  qualitySlider.addEventListener('input', () => {
    qualityLabel.textContent = `${qualitySlider.value}%`;
  });

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      SmartToolzAI.showToast('Please select a valid image file', 'error');
      return;
    }
    origFile = file;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        loadedImg = img;
        dropzone.querySelector('h3').textContent = `Loaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        SmartToolzAI.showToast('Image ready to convert!');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  convertBtn.addEventListener('click', () => {
    if (!loadedImg) {
      SmartToolzAI.showToast('Please select an image first!', 'error');
      return;
    }
    const mime = targetFormat.value;
    outExt = mime === 'image/png' ? 'png' : (mime === 'image/webp' ? 'webp' : 'jpg');
    const q = (parseInt(qualitySlider.value) || 92) / 100;

    const canvas = document.createElement('canvas');
    canvas.width = loadedImg.width;
    canvas.height = loadedImg.height;
    const ctx = canvas.getContext('2d');

    if (mime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(loadedImg, 0, 0);

    canvas.toBlob(blob => {
      if (!blob) return;
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
      convertedUrl = URL.createObjectURL(blob);
      previewImg.src = convertedUrl;
      infoText.textContent = `Converted to ${outExt.toUpperCase()} • ${loadedImg.width}×${loadedImg.height}px • ${(blob.size / 1024).toFixed(1)} KB`;
      resultBox.style.display = 'block';
      SmartToolzAI.showToast(`Converted to ${outExt.toUpperCase()}!`);
    }, mime, q);
  });

  downloadBtn.addEventListener('click', () => {
    if (!convertedUrl) return;
    const a = document.createElement('a');
    a.href = convertedUrl;
    const baseName = origFile ? origFile.name.replace(/\.[^/.]+$/, '') : 'converted';
    a.download = `${baseName}.${outExt}`;
    a.click();
  });
});
