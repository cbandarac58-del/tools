document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Social Bio Generator');
  }
  SmartToolzAI.addRecentTool('AI Social Bio Generator', 'tools/ai-bio-generator.html', '👤');

  const bioKeywords = document.getElementById('bioKeywords');
  const bioPlatform = document.getElementById('bioPlatform');
  const bioStyle = document.getElementById('bioStyle');
  const bioEmojis = document.getElementById('bioEmojis');
  const generateBioBtn = document.getElementById('generateBioBtn');
  const bioResultsContainer = document.getElementById('bioResultsContainer');
  const bioList = document.getElementById('bioList');

  function renderBios(bios) {
    bioList.innerHTML = '';
    bios.forEach((generatedBio) => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.cssText = 'position:relative;margin-bottom:1rem;padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;';
      card.innerHTML = `
        <div style="white-space: pre-wrap; font-size: 0.95rem; margin-bottom: 0.75rem;">${generatedBio}</div>
        <button class="btn btn-ghost btn-sm copy-bio-btn" style="position: absolute; right: 10px; bottom: 10px;">Copy Bio</button>
      `;
      card.querySelector('.copy-bio-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(generatedBio);
      });
      bioList.appendChild(card);
    });
    bioResultsContainer.style.display = 'block';
  }

  generateBioBtn.addEventListener('click', async () => {
    const keywords = bioKeywords.value.trim();
    if (!keywords) {
      SmartToolzAI.showToast('Please enter some keywords about yourself!', 'error');
      return;
    }

    const platform = bioPlatform.value;
    const style = bioStyle.value;
    const includeEmojis = bioEmojis.checked;

    const origBtn = generateBioBtn.innerHTML;
    generateBioBtn.disabled = true;
    generateBioBtn.innerHTML = '⏳ Generating AI Bios...';

    try {
      const prompt = `Generate 5 distinct, high-converting ${platform} profile bios for someone described as: "${keywords}".
Style/Tone: ${style}.
${includeEmojis ? 'Include relevant emojis.' : 'Do NOT use any emojis.'}
Separate each bio with the delimiter "---" on its own line. Output ONLY the 5 bios.`;
      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      const bios = aiRes.split(/---+/).map(b => b.trim()).filter(b => b.length > 10).slice(0, 5);
      if (bios.length >= 3) {
        renderBios(bios);
        SmartToolzAI.showToast('AI Bios generated successfully!');
        return;
      }
      throw new Error('Fallback');
    } catch {
      const fallback = [
        `🚀 ${keywords} | Helping brands & creators scale faster\n💡 Sharing actionable insights daily\n👇 Let's connect & collaborate`,
        `✨ Passionate about ${keywords}\n📈 Turning ideas into measurable results\n📬 DM for inquiries & partnerships`,
        `🎯 Specialist in ${keywords}\n⚡ Building the future one project at a time\n🔗 Check out my latest work below`,
        `💡 ${keywords} Enthusiast & Strategist\n🌍 Working globally | Digital creator\n👇 Grab my free resources`,
        `🌟 Elevating standards in ${keywords}\n📊 Data-driven mindset, human-first design\n💬 Always open to great conversations`
      ];
      renderBios(fallback);
      SmartToolzAI.showToast('Bios generated!');
    } finally {
      generateBioBtn.disabled = false;
      generateBioBtn.innerHTML = origBtn;
    }
  });
});
