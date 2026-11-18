document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Business Name Generator');
  }
  SmartToolzAI.addRecentTool('AI Business Name Generator', 'tools/ai-business-name-generator.html', '💡');

  const bizKeywords = document.getElementById('bizKeywords');
  const bizIndustry = document.getElementById('bizIndustry');
  const bizStyle = document.getElementById('bizStyle');
  const generateBizBtn = document.getElementById('generateBizBtn');
  const bizResultsContainer = document.getElementById('bizResultsContainer');
  const bizNameGrid = document.getElementById('bizNameGrid');

  function renderNames(names) {
    bizNameGrid.innerHTML = '';
    names.forEach(name => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.cssText = 'display:flex;flex-direction:column;justify-content:space-between;padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;text-align:center;';
      card.innerHTML = `
        <div style="font-weight: bold; font-size: 1.1rem; color: var(--text-accent); margin-bottom: 0.75rem;">${name}</div>
        <button class="btn btn-ghost btn-sm copy-name-btn" style="width: 100%;">Copy Name</button>
      `;
      card.querySelector('.copy-name-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(name);
      });
      bizNameGrid.appendChild(card);
    });
    bizResultsContainer.style.display = 'block';
  }

  generateBizBtn.addEventListener('click', async () => {
    const keywordsInput = bizKeywords.value.trim() || 'Nova';
    const industry = bizIndustry.value;
    const style = bizStyle.value;

    const origBtn = generateBizBtn.innerHTML;
    generateBizBtn.disabled = true;
    generateBizBtn.innerHTML = '⏳ Generating Brand Names...';

    try {
      const prompt = `Generate 15 creative, memorable, brandable startup/business names for the "${industry}" industry based on keywords: "${keywordsInput}". Naming style: "${style}". Return ONLY the 15 names, one per line, with no numbering or extra text.`;
      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      const names = aiRes.split('\n')
        .map(n => n.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').trim())
        .filter(n => n.length >= 3 && n.length <= 28)
        .slice(0, 15);
      if (names.length >= 6) {
        renderNames(names);
        SmartToolzAI.showToast('AI Brand names generated!');
        return;
      }
      throw new Error('Fallback');
    } catch {
      const base = keywordsInput.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '') || 'Nexus';
      const cap = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
      const fallback = [
        `${cap}ify`, `${cap}Flow`, `Nova${cap}`, `${cap}Labs`, `Apex${cap}`,
        `${cap}Grid`, `Pulse${cap}`, `${cap}Sphere`, `Zenith${cap}`, `${cap}Core`,
        `Velo${cap}`, `${cap}Forge`, `Aura${cap}`, `${cap}Wave`, `Hyper${cap}`
      ];
      renderNames(fallback);
      SmartToolzAI.showToast('Brand names generated!');
    } finally {
      generateBizBtn.disabled = false;
      generateBizBtn.innerHTML = origBtn;
    }
  });
});
