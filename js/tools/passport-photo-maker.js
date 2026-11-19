document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Passport & Visa Photo Maker', 'passport-photo-maker.html', '🛂');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Passport & Visa Photo Maker');
  }

  const dropzone = document.getElementById('ppDropzone');
  const fileInput = document.getElementById('ppFileInput');
  const presetSelect = document.getElementById('ppPresetSelect');
  const generateBtn = document.getElementById('btnPpGenerate');
  const resultBox = document.getElementById('ppResultBox');
  const singlePreview = document.getElementById('ppSinglePreview');
  const sheetPreview = document.getElementById('ppSheetPreview');
  const dlSingleBtn = document.getElementById('btnPpDownloadSingle');
  const dlSheetBtn = document.getElementById('btnPpDownloadSheet');

  let loadedImg = null;
  let singleUrl = null;
  let sheetUrl = null;

  // Dimensions at 300 DPI
  const presets = {
    us: { w: 600, h: 600, label: 'US_2x2_inch' },
    eu: { w: 413, h: 531, label: 'EU_UK_Schengen_35x45mm' },
    in: { w: 413, h: 413, label: 'India_35x35mm' },
    ca: { w: 591, h: 827, label: 'Canada_50x70mm' }
  };

  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) loadImg(e.target.files[0]);
  });

  function loadImg(file) {
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        loadedImg = img;
        dropzone.querySelector('h3').textContent = `Loaded: ${file.name} (${img.width}×${img.height}px)`;
        SmartToolzAI.showToast('Photo loaded! Click Generate Passport Photo.');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  generateBtn.addEventListener('click', () => {
    if (!loadedImg) {
      SmartToolzAI.showToast('Please upload a portrait photo first!', 'error');
      return;
    }
    const spec = presets[presetSelect.value] || presets.us;
    const c = document.createElement('canvas');
    c.width = spec.w;
    c.height = spec.h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, spec.w, spec.h);

    // Center-top cover crop (keeps head centered)
    const targetRatio = spec.w / spec.h;
    const srcRatio = loadedImg.width / loadedImg.height;
    let sx = 0, sy = 0, sw = loadedImg.width, sh = loadedImg.height;
    if (srcRatio > targetRatio) {
      sw = loadedImg.height * targetRatio;
      sx = (loadedImg.width - sw) / 2;
    } else {
      sh = loadedImg.width / targetRatio;
      sy = Math.max(0, (loadedImg.height - sh) * 0.25);
    }
    ctx.drawImage(loadedImg, sx, sy, sw, sh, 0, 0, spec.w, spec.h);

    // Printable 4x6 inch sheet at 300 DPI (1800x1200 px) with 6 or 8 photos
    const sheet = document.createElement('canvas');
    sheet.width = 1800;
    sheet.height = 1200;
    const sctx = sheet.getContext('2d');
    sctx.fillStyle = '#FFFFFF';
    sctx.fillRect(0, 0, 1800, 1200);

    const cols = Math.floor(1740 / (spec.w + 24));
    const rows = Math.floor(1140 / (spec.h + 24));
    const startX = (1800 - (cols * spec.w + (cols - 1) * 24)) / 2;
    const startY = (1200 - (rows * spec.h + (rows - 1) * 24)) / 2;

    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const px = startX + col * (spec.w + 24);
        const py = startY + r * (spec.h + 24);
        sctx.drawImage(c, px, py);
        sctx.strokeStyle = '#cbd5e1';
        sctx.lineWidth = 2;
        sctx.strokeRect(px, py, spec.w, spec.h);
      }
    }

    singleUrl = c.toDataURL('image/jpeg', 0.95);
    sheetUrl = sheet.toDataURL('image/jpeg', 0.95);
    singlePreview.src = singleUrl;
    sheetPreview.src = sheetUrl;
    resultBox.style.display = 'block';
    SmartToolzAI.showToast('Passport photo & printable 4×6 sheet ready!');
  });

  dlSingleBtn.addEventListener('click', () => {
    if (!singleUrl) return;
    const a = document.createElement('a');
    a.href = singleUrl;
    a.download = `passport_photo_${presetSelect.value}.jpg`;
    a.click();
  });

  dlSheetBtn.addEventListener('click', () => {
    if (!sheetUrl) return;
    const a = document.createElement('a');
    a.href = sheetUrl;
    a.download = `passport_printable_4x6_sheet_${presetSelect.value}.jpg`;
    a.click();
  });
});
