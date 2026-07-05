
document.addEventListener('DOMContentLoaded', () => {
  const qrInput = document.getElementById('qrInput');
  const qrSize = document.getElementById('qrSize');
  const qrColor = document.getElementById('qrColor');
  const qrBg = document.getElementById('qrBg');
  const generateQrBtn = document.getElementById('generateQrBtn');
  const qrcodeContainer = document.getElementById('qrcode');
  const downloadQrBtn = document.getElementById('downloadQrBtn');

  SmartToolzAI.addRecentTool('QR Code Generator', 'qr-generator.html', '📱');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('QR Code Generator');

  let qr = null;

  function generateQR() {
    qrcodeContainer.innerHTML = '';
    const text = qrInput.value;
    const size = parseInt(qrSize.value);
    const color = qrColor.value;
    const bg = qrBg.value;

    if (!text) {
      SmartToolzAI.showToast('Please enter URL or Text', 'error');
      return;
    }

    qr = new QRCode(qrcodeContainer, {
      text: text,
      width: size,
      height: size,
      colorDark: color,
      colorLight: bg,
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  generateQrBtn.addEventListener('click', generateQR);

  downloadQrBtn.addEventListener('click', () => {
    const img = qrcodeContainer.querySelector('img');
    if (!img) return;

    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'qrcode-smarttoolzai.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  generateQR();
});
