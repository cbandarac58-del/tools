document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('PDF Merger');
  }
  SmartToolzAI.addRecentTool('PDF Merger', 'tools/pdf-merger.html', '📑');

  const pdfDropzone = document.getElementById('pdfDropzone');
  const pdfInput = document.getElementById('pdfInput');
  const fileList = document.getElementById('fileList');
  const btnMerge = document.getElementById('btnMerge');

  let selectedFiles = [];

  pdfDropzone.addEventListener('click', () => pdfInput.click());

  pdfDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    pdfDropzone.classList.add('dragover');
  });

  pdfDropzone.addEventListener('dragleave', () => {
    pdfDropzone.classList.remove('dragover');
  });

  pdfDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    pdfDropzone.classList.remove('dragover');
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  });

  pdfInput.addEventListener('change', (e) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  });

  function addFiles(files) {
    const pdfs = files.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    if (pdfs.length === 0) {
      SmartToolzAI.showToast('Please select valid PDF files.');
      return;
    }
    selectedFiles = selectedFiles.concat(pdfs);
    renderFileList();
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function renderFileList() {
    fileList.innerHTML = '';
    if (selectedFiles.length === 0) {
      btnMerge.disabled = true;
      return;
    }

    btnMerge.disabled = false;

    selectedFiles.forEach((file, index) => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `
        <div>
          <span style="font-weight:700; color:#818cf8; margin-right:8px;">${index + 1}.</span>
          <span class="file-name" title="${file.name}">${file.name}</span>
          <span style="font-size:0.8rem; color:rgba(255,255,255,0.5); margin-left:8px;">(${formatBytes(file.size)})</span>
        </div>
        <div class="file-actions">
          <button class="btn-icon btn-up" data-index="${index}">⬆️</button>
          <button class="btn-icon btn-down" data-index="${index}">⬇️</button>
          <button class="btn-icon btn-delete" data-index="${index}">🗑️</button>
        </div>
      `;
      fileList.appendChild(item);
    });

    // Attach event listeners for up, down, delete
    document.querySelectorAll('.btn-up').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        if (idx > 0) {
          const temp = selectedFiles[idx];
          selectedFiles[idx] = selectedFiles[idx - 1];
          selectedFiles[idx - 1] = temp;
          renderFileList();
        }
      });
    });

    document.querySelectorAll('.btn-down').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        if (idx < selectedFiles.length - 1) {
          const temp = selectedFiles[idx];
          selectedFiles[idx] = selectedFiles[idx + 1];
          selectedFiles[idx + 1] = temp;
          renderFileList();
        }
      });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        selectedFiles.splice(idx, 1);
        renderFileList();
      });
    });
  }

  btnMerge.addEventListener('click', async () => {
    if (selectedFiles.length < 1) {
      SmartToolzAI.showToast('Please add at least one PDF file.');
      return;
    }

    btnMerge.disabled = true;
    btnMerge.textContent = '⏳ Merging PDFs locally...';

    try {
      const mergedPdf = await PDFLib.PDFDocument.create();

      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();

      // Trigger download
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged_document.pdf';
      link.click();

      SmartToolzAI.showToast('PDF files merged successfully! Download started.');
    } catch (err) {
      console.error(err);
      SmartToolzAI.showToast('Error merging PDF files. Please try again.');
    } finally {
      btnMerge.disabled = false;
      btnMerge.textContent = '⚡ Merge PDFs Now';
    }
  });
});
