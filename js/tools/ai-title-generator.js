document.addEventListener('DOMContentLoaded', () => {
  const titleTopic = document.getElementById('titleTopic');
  const titleStyle = document.getElementById('titleStyle');
  const generateTitlesBtn = document.getElementById('generateTitlesBtn');
  const titlesOutput = document.getElementById('titlesOutput');

  SmartToolzAI.addRecentTool('AI Title Generator', 'ai-title-generator.html', '✍️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Title Generator');
  }

  const formulas = {
    listicle: [
      '[N] Essential [Topic] Strategies for Beginners (2026 Guide)',
      'The [N] Best [Topic] Hacks You Need to Try Today',
      '[N] Proven Ways to Improve Your [Topic] Fast',
      '[N] Costly [Topic] Mistakes (And How to Fix Them)',
      '[N] Free Tools to Supercharge Your [Topic] Workflow'
    ],
    howto: [
      'How to Master [Topic] in Less Than [N] Days (Step-by-Step)',
      'The Ultimate Guide to [Topic]: From Beginner to Pro',
      'How to Get 10x Better Results with [Topic] Instantly',
      'Mastering [Topic]: Everything You Need to Know in 2026',
      'How to Build a Profitable [Topic] System from Scratch'
    ],
    clickbait: [
      'Why [Topic] Is the #1 Secret to Growth in 2026',
      'The Surprising Truth About [Topic] Nobody Tells You',
      'What I Learned Testing [Topic] for 30 Days Straight',
      'Is Traditional [Topic] Dead? Here Is What Works Now',
      'Stop Doing [Topic] the Old Way! Do This Instead'
    ]
  };

  function renderTitles(list) {
    titlesOutput.innerHTML = list.map((title, idx) => {
      const safeTitle = title.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0.65rem 0; gap: 1rem;">
          <span>${idx + 1}. <strong>${title}</strong></span>
          <button class="btn btn-ghost btn-sm" onclick="SmartToolzAI.copyToClipboard('${safeTitle}')">Copy</button>
        </div>
      `;
    }).join('');
  }

  async function generateTitles() {
    const topicInput = titleTopic.value.trim();
    if (!topicInput) {
      SmartToolzAI.showToast('Please enter a topic or keyword', 'error');
      return;
    }

    const style = titleStyle.value;
    const origText = generateTitlesBtn.innerHTML;
    generateTitlesBtn.disabled = true;
    generateTitlesBtn.innerHTML = '⏳ Generating 10 SEO Titles...';

    try {
      const styleDesc = style === 'all' ? 'a mix of listicles, how-to guides, and high-CTR viral hooks' : style;
      const prompt = `Generate exactly 10 high-CTR, SEO-optimized blog/YouTube titles about "${topicInput}" using ${styleDesc} style. Return ONLY the 10 titles, one per line, without numbering or bullets.`;
      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      const lines = aiRes.split('\n')
        .map(l => l.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').replace(/^["']|["']$/g, '').trim())
        .filter(l => l.length > 8)
        .slice(0, 10);

      if (lines.length >= 5) {
        renderTitles(lines);
        SmartToolzAI.showToast('10 AI Titles generated!');
        return;
      }
      throw new Error('Fallback');
    } catch {
      const topic = topicInput.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      let selected = style === 'all'
        ? [...formulas.listicle, ...formulas.howto, ...formulas.clickbait]
        : (formulas[style] || formulas.listicle);
      selected = [...selected].sort(() => Math.random() - 0.5);
      const nums = [5, 7, 10, 12, 15, 21];
      const generated = selected.slice(0, 10).map(tpl => {
        const randNum = nums[Math.floor(Math.random() * nums.length)];
        return tpl.replace(/\[Topic\]/g, topic).replace(/\[N\]/g, randNum);
      });
      renderTitles(generated);
      SmartToolzAI.showToast('Titles generated!');
    } finally {
      generateTitlesBtn.disabled = false;
      generateTitlesBtn.innerHTML = origText;
    }
  }

  generateTitlesBtn.addEventListener('click', generateTitles);
});
