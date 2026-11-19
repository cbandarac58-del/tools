document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Printable WiFi QR Sign Maker', 'wifi-qr-sign-generator.html', '📶');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Printable WiFi QR Sign Maker');
  }

  const ssidEl = document.getElementById('wifiSsid');
  const passEl = document.getElementById('wifiPass');
  const encEl = document.getElementById('wifiEnc');
  const titleEl = document.getElementById('wifiCardTitle');
  const canvas = document.getElementById('wifiSignCanvas');
  const genBtn = document.getElementById('btnGenWifiSign');
  const dlBtn = document.getElementById('btnDlWifiSign');

  function renderSign() {
    const ssid = ssidEl.value.trim() || 'Guest_WiFi_5G';
    const pass = passEl.value.trim() || 'Welcome2026!';
    const enc = encEl.value || 'WPA';
    const title = titleEl.value.trim() || 'FREE GUEST WI-FI';
    const wifiPayload = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=10&data=${encodeURIComponent(wifiPayload)}`;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 600, 820);

    // Top Accent Header
    const grad = ctx.createLinearGradient(0, 0, 600, 150);
    grad.addColorStop(0, '#312e81');
    grad.addColorStop(1, '#7c3aed');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 150);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 300, 88);
    ctx.font = '18px Inter, Arial, sans-serif';
    ctx.fillStyle = '#e0e7ff';
    ctx.fillText('Scan with your phone camera to connect instantly', 300, 124);

    // Network Details Box
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.fillRect(50, 575, 500, 165);
    ctx.strokeRect(50, 575, 500, 165);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 16px Inter, Arial, sans-serif';
    ctx.fillText('NETWORK NAME (SSID):', 80, 618);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(ssid, 80, 650);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 16px Inter, Arial, sans-serif';
    ctx.fillText('PASSWORD:', 80, 692);
    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(enc === 'nopass' ? '(No Password Required)' : pass, 80, 724);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Inter, Arial, sans-serif';
    ctx.fillText('Created with SmartToolzAI.com', 300, 785);

    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = () => {
      ctx.drawImage(qrImg, 120, 185, 360, 360);
    };
    qrImg.src = qrApiUrl;
  }

  genBtn.addEventListener('click', () => {
    renderSign();
    SmartToolzAI.showToast('Printable WiFi QR Sign updated!');
  });

  dlBtn.addEventListener('click', () => {
    try {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `WiFi_Sign_${(ssidEl.value || 'Guest').replace(/\s+/g, '_')}.png`;
      a.click();
      SmartToolzAI.showToast('Printable WiFi Sign PNG downloaded!');
    } catch {
      SmartToolzAI.showToast('Right-click the card above to save image', 'error');
    }
  });

  renderSign();
});
