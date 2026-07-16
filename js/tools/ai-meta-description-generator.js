document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidebar
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Meta Description Generator');
  }

  // Register recent tool
  SmartToolzAI.addRecentTool('AI Meta Description Generator', 'tools/ai-meta-description-generator.html', '🔍');

  const metaTitle = document.getElementById('metaTitle');
  const metaKeywords = document.getElementById('metaKeywords');
  const metaCta = document.getElementById('metaCta');
  const generateMetaBtn = document.getElementById('generateMetaBtn');
  const metaResultsContainer = document.getElementById('metaResultsContainer');
  const metaList = document.getElementById('metaList');

  const ctaPhrases = {
    learn: "Learn more and boost your reach today!",
    start: "Get started instantly for free!",
    shop: "Shop now for the best deals!",
    download: "Free download. Try it now!",
    general: "Try it completely free today!"
  };

  generateMetaBtn.addEventListener('click', () => {
    let title = metaTitle.value.trim();
    let keywords = metaKeywords.value.trim();
    const ctaKey = metaCta.value;

    if (!title) title = 'Our Free Tools Page';
    if (!keywords) keywords = 'free tools, online utility';

    const cta = ctaPhrases[ctaKey] || ctaPhrases.general;

    // Define 3 highly optimized SEO structures
    const templates = [
      "Looking for a reliable {title} solution? Easily manage {keywords} with our fast, free online utility. {cta}",
      "Maximize your efficiency. Utilize our free {title} to handle {keywords} instantly. 100% secure with no signup. {cta}",
      "{title}: The easiest way to manage {keywords} directly in your browser. No limits, free forever. {cta}"
    ];

    metaList.innerHTML = '';

    templates.forEach((tpl, index) => {
      let description = tpl.replace(/{title}/g, title).replace(/{keywords}/g, keywords).replace(/{cta}/g, cta);

      // Force limit to 155 chars to prevent Google truncation
      if (description.length > 155) {
        description = description.slice(0, 152) + '...';
      }

      const length = description.length;
      const lengthStatus = length <= 155 ? 'Perfect' : 'Too Long';
      const statusColor = length <= 155 ? '#22c55e' : '#ef4444';

      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.position = 'relative';
      card.style.marginBottom = '1.5rem';
      card.style.padding = '1rem';
      card.style.background = 'rgba(255, 255, 255, 0.03)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      card.style.borderRadius = '8px';

      card.innerHTML = `
        <div style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-normal);">${description}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
          <span style="color: ${statusColor}; font-weight: 500;">📏 Length: ${length} chars (${lengthStatus})</span>
          <button class="btn btn-ghost btn-sm copy-meta-btn">Copy Description</button>
        </div>
      `;

      card.querySelector('.copy-meta-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(description);
      });

      metaList.appendChild(card);
    });

    metaResultsContainer.style.display = 'block';
    SmartToolzAI.showToast('SEO Meta descriptions generated!');
  });
});
