document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Privacy Policy Generator (GDPR)', 'privacy-policy-generator.html', '⚖️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Privacy Policy Generator (GDPR)');
  }

  const nameEl = document.getElementById('ppSiteName');
  const urlEl = document.getElementById('ppSiteUrl');
  const emailEl = document.getElementById('ppEmail');
  const countryEl = document.getElementById('ppCountry');
  const adsEl = document.getElementById('ppUsesAds');
  const genBtn = document.getElementById('btnGenPrivacy');
  const outEl = document.getElementById('ppOutput');
  const copyBtn = document.getElementById('btnCopyPrivacy');

  function generate() {
    const site = nameEl.value.trim() || 'SmartToolzAI';
    const url = urlEl.value.trim() || 'https://smarttoolzai.com';
    const email = emailEl.value.trim() || 'privacy@smarttoolzai.com';
    const country = countryEl.value.trim() || 'United States';
    const usesAds = adsEl.checked;
    const today = new Date().toISOString().split('T')[0];

    const adSection = usesAds
      ? `\n4. ADVERTISING & ANALYTICS PARTNERS\nWe may partner with third-party advertising networks (such as Google AdSense) and analytics providers to display relevant ads and measure traffic. These third parties may use cookies or web beacons in accordance with their own privacy policies. You may opt out of personalized advertising via Google Ad Settings.\n`
      : '';

    outEl.textContent = `PRIVACY POLICY FOR ${site.toUpperCase()}
Last Updated: ${today}

1. INTRODUCTION
Welcome to ${site} (${url}). We respect your privacy and are committed to protecting your personal data in compliance with GDPR (EU) and CCPA (California) regulations.

2. INFORMATION WE COLLECT
We collect minimal technical data required to operate and improve our services, including browser type, device information, and anonymized usage logs. When you contact us directly via email, we only use your contact information to respond to your inquiry.

3. COOKIES & LOCAL STORAGE
${site} uses essential browser cookies and LocalStorage to remember user preferences and enhance site performance. You can disable cookies at any time through your browser settings.
${adSection}
5. YOUR GDPR & CCPA RIGHTS
Depending on your jurisdiction (${country} and international users), you have the right to request access to, correction of, or deletion of any personal data we hold about you.

6. CONTACT US
If you have any questions about this Privacy Policy, please contact us at: ${email}`;
  }

  genBtn.addEventListener('click', () => {
    generate();
    SmartToolzAI.showToast('GDPR/CCPA Privacy Policy generated!');
  });
  copyBtn.addEventListener('click', () => SmartToolzAI.copyToClipboard(outEl.textContent));
  generate();
});
