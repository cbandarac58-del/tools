document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Digital Signature Maker (PNG)', 'digital-signature-maker.html', '✒️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Digital Signature Maker (PNG)');
  }

  const canvas = document.getElementById('sigCanvas');
  const ctx = canvas.getContext('2d');
  const colorInput = document.getElementById('sigColor');
  const widthInput = document.getElementById('sigStrokeWidth');
  const typedInput = document.getElementById('sigTypedText');
  const renderTypedBtn = document.getElementById('btnRenderTypedSig');
  const clearBtn = document.getElementById('btnClearSig');
  const downloadBtn = document.getElementById('btnDownloadSig');

  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function moveDraw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.strokeStyle = colorInput.value || '#000000';
    ctx.lineWidth = parseFloat(widthInput.value) || 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
  }

  function endDraw() { drawing = false; }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', moveDraw);
  window.addEventListener('mouseup', endDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', moveDraw, { passive: false });
  window.addEventListener('touchend', endDraw);

  renderTypedBtn.addEventListener('click', () => {
    const txt = typedInput.value.trim() || 'Alex Morgan';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colorInput.value || '#000000';
    ctx.font = 'italic 54px "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, canvas.width / 2, canvas.height / 2);
    SmartToolzAI.showToast('Cursive signature rendered!');
  });

  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    SmartToolzAI.showToast('Signature pad cleared!');
  });

  downloadBtn.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'digital-signature-transparent.png';
    a.click();
    SmartToolzAI.showToast('Transparent PNG Signature downloaded!');
  });
});
