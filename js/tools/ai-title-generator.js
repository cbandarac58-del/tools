
document.addEventListener('DOMContentLoaded', () => {
  const titleTopic = document.getElementById('titleTopic');
  const titleStyle = document.getElementById('titleStyle');
  const generateTitlesBtn = document.getElementById('generateTitlesBtn');
  const titlesOutput = document.getElementById('titlesOutput');

  SmartToolzAI.addRecentTool('AI Title Generator', 'ai-title-generator.html', '✍️');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Title Generator');

  const formulas = {
    listicle: [
      '[N] Essential [Topic] Tips for Beginners',
      'The [N] Best [Topic] Hacks You Should Try Today',
      '[N] Proven Ways to Improve Your [Topic]',
      '[N] Mistakes You Are Making in [Topic] (And How to Fix Them)',
      '[N] Free Tools to Supercharge Your [Topic]'
    ],
    howto: [
      'How to Master [Topic] in Less Than [N] Days',
      'The Ultimate Guide to [Topic]: From Zero to Hero',
      'A Step-by-Step Tutorial on [Topic] for Dummies',
      'How to Get Better Results with [Topic] Instantly',
      'Mastering [Topic]: Everything You Need to Know'
    ],
    clickbait: [
      'Why [Topic] Is the Secret to Success in 2026',
      'The Shocking Truth About [Topic] Nobody Tells You',
      'What I Learned Doing [Topic] for [N] Days',
      'Is [Topic] Dead? Here Is What the Experts Say',
      'Stop Doing [Topic] the Wrong Way! Do This Instead'
    ]
  };

  function generateTitles() {
    const topicInput = titleTopic.value.trim();
    if (!topicInput) {
      SmartToolzAI.showToast('Please enter a topic/keyword', 'error');
      return;
    }

    // Capitalize topic
    const topic = topicInput.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const style = titleStyle.value;
    let selectedFormulas = [];

    if (style === 'all') {
      selectedFormulas = [...formulas.listicle, ...formulas.howto, ...formulas.clickbait];
    } else {
      selectedFormulas = formulas[style];
    }

    // Shuffle
    selectedFormulas.sort(() => Math.random() - 0.5);

    const nums = [5, 7, 10, 15, 20];
    const generated = [];

    for (let i = 0; i < Math.min(10, selectedFormulas.length); i++) {
      const randNum = nums[Math.floor(Math.random() * nums.length)];
      const title = selectedFormulas[i]
        .replace(/\[Topic\]/g, topic)
        .replace(/\[N\]/g, randNum);
      
      generated.push(title);
    }

    titlesOutput.innerHTML = generated.map((title, idx) => `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding: 0.5rem 0;">
        <span>${idx + 1}. <strong>${title}</strong></span>
        <button class="btn btn-ghost btn-sm" onclick="SmartToolzAI.copyToClipboard('${title.replace(/'/g, "\'")}')">Copy</button>
      </div>
    `).join('');
  }

  generateTitlesBtn.addEventListener('click', generateTitles);
});
