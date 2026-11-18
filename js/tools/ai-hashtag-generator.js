document.addEventListener('DOMContentLoaded', () => {
  const hashTopic = document.getElementById('hashTopic');
  const hashPlatform = document.getElementById('hashPlatform');
  const generateHashBtn = document.getElementById('generateHashBtn');
  const hashOutput = document.getElementById('hashOutput');
  const copyHashBtn = document.getElementById('copyHashBtn');

  SmartToolzAI.addRecentTool('AI Hashtag Generator', 'ai-hashtag-generator.html', '#️⃣');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Hashtag Generator');
  }

  async function generateHashtags() {
    const query = hashTopic.value.trim();
    if (!query) {
      SmartToolzAI.showToast('Please enter a keyword or topic', 'error');
      return;
    }

    const platform = hashPlatform.value;
    const origBtn = generateHashBtn.innerHTML;
    generateHashBtn.disabled = true;
    generateHashBtn.innerHTML = '⏳ Generating Viral Hashtags...';

    try {
      const prompt = `Generate 25 high-reach, trending hashtags for ${platform} about "${query}". Mix high-volume and niche-specific tags. Output ONLY the hashtags separated by spaces (e.g. #tag1 #tag2).`;
      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      const matches = aiRes.match(/#[a-zA-Z0-9_]+/g);
      if (matches && matches.length >= 8) {
        hashOutput.textContent = [...new Set(matches)].slice(0, 25).join(' ');
        SmartToolzAI.showToast('Viral hashtags generated!');
        return;
      }
      throw new Error('Fallback');
    } catch {
      const words = query.toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z0-9]/g, '')).filter(Boolean);
      const base = words.flatMap(w => [`#${w}`, `#${w}tips`, `#${w}trends`, `#${w}community`, `#${w}2026`]);
      const extra = ['#trending', '#viral', '#growth', '#creators', '#digitalmarketing', '#innovation', '#fyp', '#explorepage'];
      hashOutput.textContent = [...new Set([...base, ...extra])].slice(0, 22).join(' ');
      SmartToolzAI.showToast('Hashtags generated!');
    } finally {
      generateHashBtn.disabled = false;
      generateHashBtn.innerHTML = origBtn;
    }
  }

  generateHashBtn.addEventListener('click', generateHashtags);

  copyHashBtn.addEventListener('click', () => {
    if (hashOutput.textContent && hashOutput.textContent !== 'Enter your keyword and click Generate.') {
      SmartToolzAI.copyToClipboard(hashOutput.textContent);
    }
  });
});
