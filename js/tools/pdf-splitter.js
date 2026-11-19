document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('PDF Splitter & Page Extractor', 'pdf-splitter.html', '✂️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('PDF Splitter & Page Extractor');
  }

  const dropzone = document.getElementById('splitDropzone');
  const fileInput = document.getElementById('splitFileInput');
  const infoBox = document.getElementById('splitInfoBox');
  const pageCountEl = document.getElementById('splitPageCount');
  const rangeInput = document.getElementById('splitPageRange');
  const splitBtn = document.getElementById('btnSplitPdf');

  let loadedBytes = null;
  let totalPages = 0;
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
      totalPages = doc.getPageCount();
      pageCountEl.textContent = `${file.name} — ${totalPages} Pages Detected`;
      rangeInput.value = totalPages > 1 ? `1-${Math.min(3, totalPages)}` : '1';
      infoBox.style.display = 'block';
      SmartToolzAI.showToast(`Loaded PDF (${totalPages} pages)`);
    } catch {
      SmartToolzAI.showToast('Could not read PDF file', 'error');
    }
  }

  function parseRanges(str, maxPage) {
    const indices = new Set();
    str.split(',').forEach(part => {
      const p = part.trim();
      if (p.includes('-')) {
        const [a, b] = p.split('-').map(n => parseInt(n.trim()));
        if (!isNaN(a) && !isNaN(b)) {
          for (let i = Math.max(1, a); i <= Math.min(maxPage, b); i++) indices.add(i - 1);
        }
      } else {
        const num = parseInt(p);
        if (!isNaN(num) && num >= 1 && num <= maxPage) indices.add(num - 1);
      }
    });
    return Array.from(indices).sort((a, b) => a - b);
  }

  splitBtn.addEventListener('click', async () => {
    if (!loadedBytes) {
      SmartToolzAI.showToast('Please upload a PDF first!', 'error');
      return;
    }
    const pageIndices = parseRanges(rangeInput.value, totalPages);
    if (pageIndices.length === 0) {
      SmartToolzAI.showToast(`Enter valid pages between 1 and ${totalPages}`, 'error');
      return;
    }
    splitBtn.disabled = true;
    splitBtn.textContent = '⏳ Extracting Pages...';
    try {
      const srcDoc = await window.PDFLib.PDFDocument.load(loadedBytes, { ignoreEncryption: true });
      const newDoc = await window.PDFLib.PDFDocument.create();
      const copied = await newDoc.copyPages(srcDoc, pageIndices);
      copied.forEach(p => newDoc.addPage(p));
      const outBytes = await newDoc.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${origName}_pages_${rangeInput.value.replace(/[^0-9,-]/g, '')}.pdf`;
      a.click();
      SmartToolzAI.showToast(`Extracted ${pageIndices.length} page(s) to new PDF!`);
    } catch {
      SmartToolzAI.showToast('Error splitting PDF', 'error');
    } finally {
      splitBtn.disabled = false;
      splitBtn.textContent = '✂️ Extract Selected Pages as PDF';
    }
  });
});
