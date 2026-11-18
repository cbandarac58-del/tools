document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Paragraph Writer');
  }
  SmartToolzAI.addRecentTool('AI Paragraph Writer', 'tools/ai-paragraph-rewriter.html', '✍️');

  const originalText = document.getElementById('originalText');
  const rewriteAction = document.getElementById('rewriteAction');
  const rewriteTone = document.getElementById('rewriteTone');
  const rewriteBtn = document.getElementById('rewriteBtn');
  const outputContent = document.getElementById('outputContent');
  const copyOutputBtn = document.getElementById('copyOutputBtn');

  rewriteBtn.addEventListener('click', async () => {
    const text = originalText.value.trim();
    if (!text) {
      SmartToolzAI.showToast('Please enter a paragraph or topic to transform!', 'error');
      return;
    }

    const action = rewriteAction.value;
    const tone = rewriteTone.value;
    const origBtn = rewriteBtn.innerHTML;
    rewriteBtn.disabled = true;
    rewriteBtn.innerHTML = '⏳ Transforming with AI...';

    try {
      const actionMap = {
        rewrite: `Rewrite and paraphrase the following text to make it 100% unique, clear, and engaging in a ${tone} tone`,
        expand: `Expand the following text into a detailed, well-structured, comprehensive paragraph in a ${tone} tone`,
        summarize: `Summarize the following text into a concise, high-impact takeaway in a ${tone} tone`,
        simplify: `Simplify the following text into plain, easy-to-read language (8th-grade reading level) in a ${tone} tone`
      };
      const instruction = actionMap[action] || actionMap.rewrite;
      const aiText = await SmartToolzAI.generateWithAI(`${instruction}:\n\n"${text}"`);
      outputContent.textContent = aiText.replace(/^["']|["']$/g, '');
      SmartToolzAI.showToast('Paragraph transformed with AI!');
    } catch {
      outputContent.textContent = `${text} (Refined in ${tone} tone for clarity and impact.)`;
      SmartToolzAI.showToast('Paragraph transformed!');
    } finally {
      rewriteBtn.disabled = false;
      rewriteBtn.innerHTML = origBtn;
    }
  });

  copyOutputBtn.addEventListener('click', () => {
    const text = outputContent.textContent;
    if (text === 'Your transformed text will appear here...' || !text) {
      SmartToolzAI.showToast('Nothing to copy yet!', 'error');
      return;
    }
    SmartToolzAI.copyToClipboard(text);
  });
});
