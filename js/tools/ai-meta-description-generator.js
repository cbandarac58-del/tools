document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Meta Description Generator');
  }
  SmartToolzAI.addRecentTool('AI Meta Description Generator', 'tools/ai-meta-description-generator.html', '🔍');

  const metaTitle = document.getElementById('metaTitle');
  const metaKeywords = document.getElementById('metaKeywords');
  const metaCta = document.getElementById('metaCta');
  const generateMetaBtn = document.getElementById('generateMetaBtn');
  const metaResultsContainer = document.getElementById('metaResultsContainer');
  const metaList = document.getElementById('metaList');

  function renderDescriptions(descriptions) {
    metaList.innerHTML = '';
    descriptions.forEach(description => {
      const length = description.length;
      const isGood = length >= 110 && length <= 160;
      const lengthStatus = length <= 160 ? 'Optimal for Google SERP' : 'Slightly Long (>160 chars)';
      const statusColor = isGood ? '#22c55e' : (length <= 165 ? '#f59e0b' : '#ef4444');

      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.cssText = 'position:relative;margin-bottom:1.25rem;padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;';
      card.innerHTML = `
        <div style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-normal);">${description}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
          <span style="color: ${statusColor}; font-weight: 600;">📏 ${length} characters (${lengthStatus})</span>
          <button class="btn btn-ghost btn-sm copy-meta-btn">Copy Meta Description</button>
        </div>
      `;
      card.querySelector('.copy-meta-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(description);
      });
      metaList.appendChild(card);
    });
    metaResultsContainer.style.display = 'block';
  }

  generateMetaBtn.addEventListener('click', async () => {
    const title = metaTitle.value.trim() || 'Free Online AI & Utility Tools';
    const keywords = metaKeywords.value.trim() || 'free online tools, SEO utilities';
    const ctaKey = metaCta.value;

    const origBtn = generateMetaBtn.innerHTML;
    generateMetaBtn.disabled = true;
    generateMetaBtn.innerHTML = '⏳ Generating SEO Meta Descriptions...';

    try {
      const prompt = `Write 4 high-CTR SEO meta descriptions for a webpage titled "${title}".
Target keywords: ${keywords}.
Call-to-action focus: ${ctaKey}.
Each meta description MUST be between 135 and 155 characters long.
Return ONLY the 4 meta descriptions, one per line, without numbering or quotes.`;
      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      const list = aiRes.split('\n')
        .map(s => s.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').replace(/^["']|["']$/g, '').trim())
        .filter(s => s.length >= 70)
        .slice(0, 4);
      if (list.length >= 2) {
        renderDescriptions(list);
        SmartToolzAI.showToast('AI SEO Meta descriptions generated!');
        return;
      }
      throw new Error('Fallback');
    } catch {
      const fallback = [
        `Discover ${title}. Easily manage ${keywords} with our fast, 100% free online utility. No signup required—get started instantly!`,
        `Boost your workflow with ${title}. Handle ${keywords} in seconds directly in your browser. Private, secure & free forever!`,
        `${title}: The fastest way to optimize ${keywords} online. Zero limits, instant results, and 100% client-side privacy. Try it now!`
      ].map(d => d.length > 158 ? d.slice(0, 155) + '...' : d);
      renderDescriptions(fallback);
      SmartToolzAI.showToast('SEO Meta descriptions generated!');
    } finally {
      generateMetaBtn.disabled = false;
      generateMetaBtn.innerHTML = origBtn;
    }
  });
});
