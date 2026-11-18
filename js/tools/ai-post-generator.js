document.addEventListener('DOMContentLoaded', () => {
  const postTopic = document.getElementById('postTopic');
  const postPlatform = document.getElementById('postPlatform');
  const postTone = document.getElementById('postTone');
  const generatePostBtn = document.getElementById('generatePostBtn');
  const postOutput = document.getElementById('postOutput');
  const copyPostBtn = document.getElementById('copyPostBtn');

  SmartToolzAI.addRecentTool('AI Social Post Generator', 'ai-post-generator.html', '📱');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Social Post Generator');
  }

  async function generatePost() {
    const topic = postTopic.value.trim();
    if (!topic) {
      SmartToolzAI.showToast('Please enter a topic or idea', 'error');
      return;
    }

    const platform = postPlatform.value;
    const tone = postTone.value;
    const origBtn = generatePostBtn.innerHTML;
    generatePostBtn.disabled = true;
    generatePostBtn.innerHTML = '⏳ Writing Viral Post...';

    try {
      const prompt = `Write a highly engaging, scroll-stopping ${platform} post about "${topic}".
Tone: ${tone}.
Use platform-native formatting (strong hook on line 1, clean spacing, bullet points if appropriate, engaging call-to-action at the end, and 3-5 relevant hashtags). Output ONLY the post content.`;
      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      postOutput.innerHTML = aiRes.replace(/\n/g, '<br>');
      SmartToolzAI.showToast('AI Social Post generated!');
    } catch {
      const fallback = `🚀 Let's talk about ${topic}!\n\nMost people overcomplicate ${topic}, but success comes down to 3 fundamentals:\n1️⃣ Focus on high-leverage actions daily\n2️⃣ Use the right systems and tools\n3️⃣ Stay consistent even when results take time\n\nWhat's your #1 takeaway on ${topic}? Drop your thoughts below! 👇\n\n#${topic.replace(/\s+/g, '')} #Growth #Productivity`;
      postOutput.innerHTML = fallback.replace(/\n/g, '<br>');
      SmartToolzAI.showToast('Social Post generated!');
    } finally {
      generatePostBtn.disabled = false;
      generatePostBtn.innerHTML = origBtn;
    }
  }

  generatePostBtn.addEventListener('click', generatePost);

  copyPostBtn.addEventListener('click', () => {
    const txt = postOutput.innerText || postOutput.textContent;
    if (txt && txt !== 'Enter your idea and click Generate.') {
      SmartToolzAI.copyToClipboard(txt);
    }
  });
});
