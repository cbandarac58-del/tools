document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('AI Prompt Generator & Optimizer', 'ai-prompt-generator.html', '🧠');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Prompt Generator & Optimizer');
  }

  const promptTargetModel = document.getElementById('promptTargetModel');
  const promptFramework = document.getElementById('promptFramework');
  const promptGoal = document.getElementById('promptGoal');
  const generatePromptBtn = document.getElementById('generatePromptBtn');
  const promptOutput = document.getElementById('promptOutput');
  const copyPromptBtn = document.getElementById('copyPromptBtn');

  generatePromptBtn.addEventListener('click', async () => {
    const goal = promptGoal.value.trim();
    if (!goal) {
      SmartToolzAI.showToast('Please enter your rough idea or goal first!', 'error');
      return;
    }

    const model = promptTargetModel.value;
    const framework = promptFramework.value;
    const origBtn = generatePromptBtn.innerHTML;
    generatePromptBtn.disabled = true;
    generatePromptBtn.innerHTML = '⏳ Engineering Master Prompt...';

    try {
      const req = `You are a world-class AI Prompt Engineer. Convert the user's rough idea into a comprehensive, copy-paste-ready Master Prompt optimized for "${model}" using the "${framework}" methodology.
User's Rough Idea: "${goal}"
Output ONLY the ready-to-use prompt with clear sections (# ROLE, # CONTEXT, # TASK, # CONSTRAINTS, # OUTPUT FORMAT).`;
      const res = await SmartToolzAI.generateWithAI(req);
      promptOutput.textContent = res;
      SmartToolzAI.showToast('Master AI Prompt engineered!');
    } catch {
      promptOutput.textContent = `# ROLE & PERSONA\nAct as a world-class senior specialist with 15+ years of hands-on experience in ${goal}.\n\n# OBJECTIVE & TASK\nYour mission is to execute the following request with extreme precision and depth:\n"${goal}"\n\n# FRAMEWORK (${framework})\n1. Analyze the core problem and target audience first.\n2. Provide concrete, actionable, high-leverage recommendations (avoid generic fluff).\n3. Include real-world examples, metrics, or edge cases.\n\n# OUTPUT FORMAT\n- Use clear Markdown headings, bullet points, and bold key takeaways.\n- End with a 3-step immediate action checklist.`;
      SmartToolzAI.showToast('Master Prompt generated!');
    } finally {
      generatePromptBtn.disabled = false;
      generatePromptBtn.innerHTML = origBtn;
    }
  });

  copyPromptBtn.addEventListener('click', () => {
    const txt = promptOutput.textContent;
    if (txt && !txt.startsWith('Enter your rough goal')) {
      SmartToolzAI.copyToClipboard(txt);
    }
  });
});
