document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Rotate PDF Pages Online', 'pdf-rotator.html', '🔄');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Rotate PDF Pages Online');
  }

  const dropzone = document.getElementById('rotDropzone');
  const fileInput = document.getElementById('rotFileInput');
  const infoBox = document.getElementById('rotInfoBox');
  const fileLabel = document.getElementById('rotFileLabel');
  const angleSelect = document.getElementById('rotAngleSelect');
  const rotateBtn = document.getElementById('btnRotatePdf');

  let loadedBytes = null;
  let origName = 'document';

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.style.borderColor = '#818cf8'; });
  dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(79,70,229,0.45)'; });
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.style.borderColor = 'rgba(79,70,229,0.45)';
    if (e.dataTransfer.files[0]) loadPdf(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) loadPdf(e.target.files[0]);
  });

  async function loadPdf(file) {
    try {
      origName = file.name.replace(/\.pdf$/i, '');
      loadedBytes = new Uint8Array(await file.arrayBuffer());
      const doc = await window.PDFLib.PDFDocument.load(loadedBytes, { ignoreEncryption: true });
      fileLabel.textContent = `${file.name} (${doc.getPageCount()} Pages)`;
      infoBox.style.display = 'block';
      SmartToolzAI.showToast('PDF loaded! Select rotation angle.');
    } catch {
      SmartToolzAI.showToast('Invalid PDF file', 'error');
    }
  }

  rotateBtn.addEventListener('click', async () => {
    if (!loadedBytes) return;
    rotateBtn.disabled = true;
    rotateBtn.textContent = '⏳ Rotating PDF...';
    try {
      const { PDFDocument, degrees } = window.PDFLib;
      const pdfDoc = await PDFDocument.load(loadedBytes, { ignoreEncryption: true });
      const addAngle = parseInt(angleSelect.value) || 90;
      pdfDoc.getPages().forEach(page => {
        const cur = page.getRotation().angle || 0;
        page.setRotation(degrees((cur + addAngle) % 360));
      });
      const outBytes = await pdfDoc.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${origName}_rotated_${addAngle}deg.pdf`;
      a.click();
      SmartToolzAI.showToast('Rotated PDF downloaded!');
    } catch {
      SmartToolzAI.showToast('Error rotating PDF', 'error');
    } finally {
      rotateBtn.disabled = false;
      rotateBtn.textContent = '🔄 Rotate & Download PDF';
    }
  });
});
