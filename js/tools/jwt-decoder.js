document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('JWT Token Decoder & Debugger', 'jwt-decoder.html', '🔑');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('JWT Token Decoder & Debugger');
  }

  const jwtInput = document.getElementById('jwtInput');
  const jwtHeaderOut = document.getElementById('jwtHeaderOut');
  const jwtPayloadOut = document.getElementById('jwtPayloadOut');
  const jwtStatusBanner = document.getElementById('jwtStatusBanner');

  function b64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return decodeURIComponent(escape(atob(base64)));
  }

  function decodeJwt() {
    const raw = (jwtInput.value || '').trim();
    const parts = raw.split('.');
    if (parts.length !== 3) {
      jwtStatusBanner.style.background = 'rgba(239,68,68,0.12)';
      jwtStatusBanner.style.color = '#f87171';
      jwtStatusBanner.textContent = '❌ Invalid JWT Format (Must have 3 dot-separated segments: Header.Payload.Signature)';
      return;
    }

    try {
      const headerObj = JSON.parse(b64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(b64UrlDecode(parts[1]));
      jwtHeaderOut.textContent = JSON.stringify(headerObj, null, 2);
      jwtPayloadOut.textContent = JSON.stringify(payloadObj, null, 2);

      let expMsg = '✅ Valid JWT Structure (No exp claim present)';
      jwtStatusBanner.style.background = 'rgba(16,185,129,0.12)';
      jwtStatusBanner.style.color = '#34d399';

      if (payloadObj.exp) {
        const expDate = new Date(payloadObj.exp * 1000);
        const now = new Date();
        if (expDate > now) {
          expMsg = `✅ Valid & Active Token — Expires on ${expDate.toUTCString()}`;
        } else {
          expMsg = `⚠️ Token Expired on ${expDate.toUTCString()}`;
          jwtStatusBanner.style.background = 'rgba(245,158,11,0.15)';
          jwtStatusBanner.style.color = '#fbbf24';
        }
      }
      jwtStatusBanner.textContent = expMsg;
    } catch (e) {
      jwtStatusBanner.style.background = 'rgba(239,68,68,0.12)';
      jwtStatusBanner.style.color = '#f87171';
      jwtStatusBanner.textContent = '❌ Unable to parse JSON from JWT Base64URL segments';
    }
  }

  jwtInput.addEventListener('input', decodeJwt);
  decodeJwt();
});
