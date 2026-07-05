document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('dropZone');
  const dropZoneIcon = document.getElementById('dropZoneIcon');
  const imageUpload = document.getElementById('imageUpload');
  const settingsPanel = document.getElementById('settingsPanel');
  const compressQuality = document.getElementById('compressQuality');
  const qualityVal = document.getElementById('qualityVal');
  const convertFormat = document.getElementById('convertFormat');
  const customWidth = document.getElementById('customWidth');
  const customHeight = document.getElementById('customHeight');
  const chkAspect = document.getElementById('chkAspect');
  
  // Results
  const resultsArea = document.getElementById('resultsArea');
  const valOriginalSize = document.getElementById('valOriginalSize');
  const valOptimizedSize = document.getElementById('valOptimizedSize');
  const valSavings = document.getElementById('valSavings');
  
  // Comparison
  const originalSplit = document.getElementById('originalSplit');
  const compressedSplit = document.getElementById('compressedSplit');
  const dividerLine = document.getElementById('dividerLine');
  const splitSlider = document.getElementById('splitSlider');
  const pngWarning = document.getElementById('pngWarning');
  
  // Buttons
  const downloadImgBtn = document.getElementById('downloadImgBtn');
  const resetBtn = document.getElementById('resetBtn');

  SmartToolzAI.addRecentTool('Image Compressor', 'image-compressor.html', '🖼️');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Image Compressor');

  let activeFile = null;
  let originalImage = null; // HTMLImageElement
  let compressedBlob = null;
  let originalAspectRatio = 1;
  let isUpdatingDimensions = false;

  // -------------------------------------------------------------
  // Prevent default window drag/drop behavior to avoid opening files in tabs
  // -------------------------------------------------------------
  window.addEventListener('dragover', (e) => e.preventDefault(), false);
  window.addEventListener('drop', (e) => e.preventDefault(), false);

  // -------------------------------------------------------------
  // Drag & Drop Handlers
  // -------------------------------------------------------------
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--accent-purple)';
    dropZone.style.background = 'rgba(124, 58, 237, 0.05)';
    dropZoneIcon.style.transform = 'scale(1.2) translateY(-5px)';
  });

  dropZone.addEventListener('dragleave', () => {
    resetDropZoneStyle();
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    resetDropZoneStyle();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    } else {
      SmartToolzAI.showToast('Please upload a valid image file!', 'error');
    }
  });

  dropZone.addEventListener('click', () => {
    imageUpload.click();
  });

  imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });

  function resetDropZoneStyle() {
    dropZone.style.borderColor = 'var(--border-color)';
    dropZone.style.background = 'var(--bg-glass)';
    dropZoneIcon.style.transform = 'none';
  }

  // -------------------------------------------------------------
  // File Handler
  // -------------------------------------------------------------
  function handleFile(file) {
    activeFile = file;
    valOriginalSize.textContent = formatBytes(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage = new Image();
      originalImage.src = e.target.result;
      
      originalImage.onload = () => {
        originalAspectRatio = originalImage.width / originalImage.height;
        
        // Populate custom dimensions
        isUpdatingDimensions = true;
        customWidth.value = originalImage.width;
        customHeight.value = originalImage.height;
        isUpdatingDimensions = false;

        // Reset compare slider to 50%
        splitSlider.value = 50;
        compressedSplit.style.clipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
        dividerLine.style.left = '50%';

        // Set Split Previews
        originalSplit.src = e.target.result;
        compressedSplit.src = e.target.result;

        // Show UI elements
        dropZone.style.display = 'none';
        settingsPanel.style.display = 'block';
        resultsArea.style.display = 'block';

        optimizeImage();
      };
    };
    reader.readAsDataURL(file);
  }

  // -------------------------------------------------------------
  // Dimension Resizing with Aspect Ratio Lock
  // -------------------------------------------------------------
  customWidth.addEventListener('input', () => {
    if (isUpdatingDimensions || !chkAspect.checked) return;
    isUpdatingDimensions = true;
    const w = parseInt(customWidth.value) || 0;
    if (w > 0) {
      customHeight.value = Math.round(w / originalAspectRatio);
    }
    isUpdatingDimensions = false;
    optimizeImage();
  });

  customHeight.addEventListener('input', () => {
    if (isUpdatingDimensions || !chkAspect.checked) return;
    isUpdatingDimensions = true;
    const h = parseInt(customHeight.value) || 0;
    if (h > 0) {
      customWidth.value = Math.round(h * originalAspectRatio);
    }
    isUpdatingDimensions = false;
    optimizeImage();
  });

  // Re-optimize on checkbox/format/quality updates
  chkAspect.addEventListener('change', optimizeImage);
  convertFormat.addEventListener('change', optimizeImage);
  
  compressQuality.addEventListener('input', (e) => {
    qualityVal.textContent = `${e.target.value}%`;
    optimizeImage();
  });

  // -------------------------------------------------------------
  // Visual Compare Slider Logic
  // -------------------------------------------------------------
  splitSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    // Left side (0 to value%) is original, right side (value% to 100%) is optimized (clipped)
    compressedSplit.style.clipPath = `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
    // Place divider exactly on the split point
    dividerLine.style.left = `${value}%`;
  });

  // -------------------------------------------------------------
  // Main Optimization Function
  // -------------------------------------------------------------
  let debounceTimeout;
  function optimizeImage() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (!originalImage) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Use settings size, fallback to original
      const width = parseInt(customWidth.value) || originalImage.width;
      const height = parseInt(customHeight.value) || originalImage.height;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(originalImage, 0, 0, width, height);

      const quality = parseFloat(compressQuality.value) / 100;
      
      // Determine format
      let format = activeFile.type;
      if (convertFormat.value !== 'original') {
        format = convertFormat.value;
      }

      canvas.toBlob((blob) => {
        if (!blob) return;
        compressedBlob = blob;

        // Render optimized preview
        const objUrl = URL.createObjectURL(blob);
        compressedSplit.src = objUrl;

        // Render stats
        valOptimizedSize.textContent = formatBytes(blob.size);
        const savings = ((activeFile.size - blob.size) / activeFile.size) * 100;
        
        if (savings > 0) {
          valSavings.textContent = `${Math.round(savings)}%`;
          valSavings.style.color = '#22c55e';
          pngWarning.style.display = 'none'; // Hide warning if savings are positive
        } else {
          valSavings.textContent = '0%';
          valSavings.style.color = 'var(--text-muted)';
          
          // Show Pro Tip warning if it is PNG and we saved 0% space
          if (format === 'image/png') {
            pngWarning.style.display = 'block';
          } else {
            pngWarning.style.display = 'none';
          }
        }
      }, format, quality);
    }, 150); // 150ms debounce for smoother sliders
  }

  // Helper
  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // -------------------------------------------------------------
  // Download / Resets
  // -------------------------------------------------------------
  downloadImgBtn.addEventListener('click', () => {
    if (!compressedBlob) return;
    
    // File extension mapping
    let ext = activeFile.name.split('.').pop();
    if (convertFormat.value === 'image/webp') ext = 'webp';
    else if (convertFormat.value === 'image/jpeg') ext = 'jpg';
    else if (convertFormat.value === 'image/png') ext = 'png';

    const filename = activeFile.name.substring(0, activeFile.name.lastIndexOf('.'));
    const downloadName = `${filename}-optimized.${ext}`;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(compressedBlob);
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    SmartToolzAI.showToast('Optimized image downloaded!');
  });

  resetBtn.addEventListener('click', () => {
    activeFile = null;
    originalImage = null;
    compressedBlob = null;
    imageUpload.value = '';
    
    dropZone.style.display = 'block';
    settingsPanel.style.display = 'none';
    resultsArea.style.display = 'none';
  });
});
