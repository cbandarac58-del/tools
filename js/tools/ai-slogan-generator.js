document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Brand Slogan Generator');
  }
  SmartToolzAI.addRecentTool('AI Brand Slogan Generator', 'tools/ai-slogan-generator.html', '📢');

  const sloganBrand = document.getElementById('sloganBrand');
  const sloganKeywords = document.getElementById('sloganKeywords');
  const sloganStyle = document.getElementById('sloganStyle');
  const generateSloganBtn = document.getElementById('generateSloganBtn');
  const sloganResultsContainer = document.getElementById('sloganResultsContainer');
  const sloganGrid = document.getElementById('sloganGrid');

  function renderSlogans(slogans) {
    sloganGrid.innerHTML = '';
    slogans.forEach(slogan => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;';
      card.innerHTML = `
        <div style="font-size: 1rem; font-weight: 500; color: var(--text-normal);">${slogan}</div>
        <button class="btn btn-ghost btn-sm copy-slogan-btn" style="flex-shrink: 0; margin-left: 1rem;">Copy</button>
      `;
      card.querySelector('.copy-slogan-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(slogan);
      });
      sloganGrid.appendChild(card);
    });
    sloganResultsContainer.style.display = 'block';
  }

  generateSloganBtn.addEventListener('click', async () => {
    const brand = sloganBrand.value.trim() || 'SmartBrand';
    const keywords = sloganKeywords.value.trim() || 'innovation and quality';
    const style = sloganStyle.value;

    const origBtn = generateSloganBtn.innerHTML;
    generateSloganBtn.disabled = true;
    generateSloganBtn.innerHTML = '⏳ Crafting AI Slogans...';

    try {
      const prompt = `Generate 10 catchy, memorable brand slogans/taglines for a brand named "${brand}" focused on "${keywords}". Style: ${style}. Return ONLY the 10 slogans, one per line, without numbering or quotes.`;
      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      const list = aiRes.split('\n')
        .map(s => s.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').replace(/^["']|["']$/g, '').trim())
        .filter(s => s.length > 6)
        .slice(0, 10);
      if (list.length >= 5) {
        renderSlogans(list);
        SmartToolzAI.showToast('AI Slogans generated!');
        return;
      }
      throw new Error('Fallback');
    } catch {
      const fallback = [
        `${brand}: Redefining ${keywords}.`,
        `The smarter way to experience ${keywords} — ${brand}.`,
        `${brand}: Built for performance, designed for you.`,
        `Unleash the full potential of ${keywords} with ${brand}.`,
        `Think ${keywords}. Think ${brand}.`,
        `${brand}: Where innovation meets ${keywords}.`
      ];
      renderSlogans(fallback);
      SmartToolzAI.showToast('Slogans generated!');
    } finally {
      generateSloganBtn.disabled = false;
      generateSloganBtn.innerHTML = origBtn;
    }
  });
});
