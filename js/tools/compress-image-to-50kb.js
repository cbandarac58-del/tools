document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Compress Image to 50KB / 20KB', 'compress-image-to-50kb.html', '🗜️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Compress Image to 50KB / 20KB');
  }

  const dropzone = document.getElementById('exactImgDropzone');
  const fileInput = document.getElementById('exactImgInput');
  const targetKbSelect = document.getElementById('targetKbSelect');
  const customKbInput = document.getElementById('customKbInput');
  const formatSelect = document.getElementById('outFormatSelect');
  const compressBtn = document.getElementById('btnExactCompress');
  const resultBox = document.getElementById('exactResultBox');
  const origSizeEl = document.getElementById('exactOrigSize');
  const finalSizeEl = document.getElementById('exactFinalSize');
  const finalDimEl = document.getElementById('exactFinalDim');
  const previewImg = document.getElementById('exactPreviewImg');
  const downloadBtn = document.getElementById('btnExactDownload');

  let loadedImg = null;
  let origFile = null;
  let finalBlobUrl = null;
  let finalExt = 'jpg';

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.style.borderColor = '#818cf8'; });
  dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(79,70,229,0.4)'; });
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.style.borderColor = 'rgba(79,70,229,0.4)';
    if (e.dataTransfer.files && e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', e => {
    if (e.target.files && e.target.files[0]) loadFile(e.target.files[0]);
  });

  targetKbSelect.addEventListener('change', () => {
    if (targetKbSelect.value === 'custom') {
      customKbInput.style.display = 'block';
    } else {
      customKbInput.style.display = 'none';
      customKbInput.value = targetKbSelect.value;
    }
  });

  function loadFile(file) {
    if (!file.type.startsWith('image/')) {
      SmartToolzAI.showToast('Please select a valid image file (JPG, PNG, WEBP)', 'error');
      return;
    }
    origFile = file;
    origSizeEl.textContent = (file.size / 1024).toFixed(1) + ' KB';
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        loadedImg = img;
        dropzone.querySelector('h3').textContent = `Loaded: ${file.name} (${img.width}x${img.height}px)`;
        SmartToolzAI.showToast('Image loaded! Click Compress to Target KB.');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function canvasToBlob(canvas, mime, quality) {
    return new Promise(resolve => canvas.toBlob(b => resolve(b), mime, quality));
  }

  compressBtn.addEventListener('click', async () => {
    if (!loadedImg) {
      SmartToolzAI.showToast('Please upload an image first!', 'error');
      return;
    }
    const targetKB = Math.max(5, parseFloat(targetKbSelect.value === 'custom' ? customKbInput.value : targetKbSelect.value) || 50);
    const targetBytes = targetKB * 1024;
    const mime = formatSelect.value;
    finalExt = mime === 'image/webp' ? 'webp' : 'jpg';

    compressBtn.disabled = true;
    compressBtn.textContent = `⏳ Optimizing to under ${targetKB} KB...`;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let scale = 1.0;
      let bestBlob = null;

      for (let sAttempt = 0; sAttempt < 6; sAttempt++) {
        const w = Math.max(120, Math.round(loadedImg.width * scale));
        const h = Math.max(120, Math.round(loadedImg.height * scale));
        canvas.width = w;
        canvas.height = h;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(loadedImg, 0, 0, w, h);

        let low = 0.08, high = 0.95;
        let candidate = null;
        for (let iter = 0; iter < 7; iter++) {
          const mid = (low + high) / 2;
          const blob = await canvasToBlob(canvas, mime, mid);
          if (blob && blob.size <= targetBytes) {
            candidate = blob;
            low = mid;
          } else {
            high = mid;
          }
        }
        if (candidate) {
          bestBlob = candidate;
          finalDimEl.textContent = `${w} × ${h} px`;
          break;
        }
        scale *= 0.72;
        if (sAttempt === 5) {
          bestBlob = await canvasToBlob(canvas, mime, 0.1);
          finalDimEl.textContent = `${w} × ${h} px`;
        }
      }

      if (finalBlobUrl) URL.revokeObjectURL(finalBlobUrl);
      finalBlobUrl = URL.createObjectURL(bestBlob);
      finalSizeEl.textContent = (bestBlob.size / 1024).toFixed(1) + ' KB';
      previewImg.src = finalBlobUrl;
      resultBox.style.display = 'block';
      SmartToolzAI.showToast(`Compressed to ${(bestBlob.size / 1024).toFixed(1)} KB!`);
    } catch (e) {
      SmartToolzAI.showToast('Error compressing image', 'error');
    } finally {
      compressBtn.disabled = false;
      compressBtn.textContent = '🗜️ Compress to Exact Target KB';
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (!finalBlobUrl) return;
    const a = document.createElement('a');
    a.href = finalBlobUrl;
    const baseName = origFile ? origFile.name.replace(/\.[^/.]+$/, '') : 'image';
    a.download = `${baseName}_compressed.${finalExt}`;
    a.click();
  });
});
