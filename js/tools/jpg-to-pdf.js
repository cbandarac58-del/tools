document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('JPG / PNG to PDF Converter', 'jpg-to-pdf.html', '🖼️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('JPG / PNG to PDF Converter');
  }

  const dropzone = document.getElementById('j2pDropzone');
  const fileInput = document.getElementById('j2pFileInput');
  const fileListEl = document.getElementById('j2pFileList');
  const pageSizeEl = document.getElementById('j2pPageSize');
  const convertBtn = document.getElementById('btnJ2pConvert');
  const clearBtn = document.getElementById('btnJ2pClear');

  let imageFiles = [];

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.style.borderColor = '#818cf8'; });
  dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(79,70,229,0.45)'; });
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.style.borderColor = 'rgba(79,70,229,0.45)';
    addFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener('change', e => addFiles(e.target.files));

  function addFiles(files) {
    Array.from(files).forEach(f => {
      if (f.type.startsWith('image/')) imageFiles.push(f);
    });
    renderList();
  }

  function renderList() {
    if (imageFiles.length === 0) {
      fileListEl.innerHTML = '';
      return;
    }
    fileListEl.innerHTML = imageFiles.map((f, idx) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.65rem 1rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;margin-bottom:0.5rem;">
        <span>${idx + 1}. <strong>${f.name}</strong> (${(f.size / 1024).toFixed(1)} KB)</span>
        <button type="button" class="btn btn-ghost btn-sm" data-rm="${idx}">✕</button>
      </div>
    `).join('');
    fileListEl.querySelectorAll('[data-rm]').forEach(btn => {
      btn.addEventListener('click', () => {
        imageFiles.splice(parseInt(btn.dataset.rm), 1);
        renderList();
      });
    });
  }

  clearBtn.addEventListener('click', () => {
    imageFiles = [];
    renderList();
    SmartToolzAI.showToast('Image queue cleared!');
  });

  function fileToJpegBytes(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.width;
          c.height = img.height;
          const ctx = c.getContext('2d');
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(img, 0, 0);
          c.toBlob(async blob => {
            const buf = await blob.arrayBuffer();
            resolve({ bytes: new Uint8Array(buf), width: img.width, height: img.height });
          }, 'image/jpeg', 0.92);
        };
        img.onerror = reject;
        img.src = ev.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  convertBtn.addEventListener('click', async () => {
    if (imageFiles.length === 0) {
      SmartToolzAI.showToast('Please add at least one image first!', 'error');
      return;
    }
    convertBtn.disabled = true;
    convertBtn.textContent = '⏳ Compiling PDF locally...';
    try {
      const { PDFDocument } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const mode = pageSizeEl.value;

      for (const f of imageFiles) {
        const { bytes, width, height } = await fileToJpegBytes(f);
        const embedded = await pdfDoc.embedJpg(bytes);
        if (mode === 'a4') {
          const page = pdfDoc.addPage([595.28, 841.89]);
          const margin = 24;
          const maxW = 595.28 - margin * 2;
          const maxH = 841.89 - margin * 2;
          const scale = Math.min(maxW / width, maxH / height);
          const drawW = width * scale;
          const drawH = height * scale;
          page.drawImage(embedded, {
            x: (595.28 - drawW) / 2,
            y: (841.89 - drawH) / 2,
            width: drawW,
            height: drawH
          });
        } else {
          const page = pdfDoc.addPage([width, height]);
          page.drawImage(embedded, { x: 0, y: 0, width, height });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `SmartToolzAI_Images_${imageFiles.length}pages.pdf`;
      a.click();
      SmartToolzAI.showToast(`Created ${imageFiles.length}-page PDF successfully!`);
    } catch (err) {
      SmartToolzAI.showToast('Error compiling PDF', 'error');
    } finally {
      convertBtn.disabled = false;
      convertBtn.textContent = '📄 Convert Images to PDF';
    }
  });
});
