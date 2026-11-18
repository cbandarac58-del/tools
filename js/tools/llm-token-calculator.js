document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('LLM Token & API Cost Calculator', 'llm-token-calculator.html', '🤖');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('LLM Token & API Cost Calculator');
  }

  const promptText = document.getElementById('llmPromptText');
  const expectedOutTokens = document.getElementById('llmOutTokens');
  const numCalls = document.getElementById('llmNumCalls');
  const outTokenCount = document.getElementById('llmTokenCountOut');
  const outWordCount = document.getElementById('llmWordCountOut');
  const outCharCount = document.getElementById('llmCharCountOut');
  const tableBody = document.getElementById('llmPriceTableBody');

  // 2026 API Pricing per 1 Million tokens (Input $, Output $)
  const models = [
    { name: 'OpenAI GPT-4o', inPrice: 2.50, outPrice: 10.00, badge: 'Popular' },
    { name: 'OpenAI GPT-4o-mini', inPrice: 0.15, outPrice: 0.60, badge: 'Budget' },
    { name: 'Anthropic Claude 3.7 Sonnet', inPrice: 3.00, outPrice: 15.00, badge: 'Coding' },
    { name: 'Anthropic Claude 3.5 Haiku', inPrice: 0.80, outPrice: 4.00, badge: 'Fast' },
    { name: 'Google Gemini 2.5 Pro', inPrice: 1.25, outPrice: 10.00, badge: '2M Context' },
    { name: 'Google Gemini 2.5 Flash', inPrice: 0.10, outPrice: 0.40, badge: 'Ultra Fast' },
    { name: 'DeepSeek R1 / V3', inPrice: 0.27, outPrice: 1.10, badge: 'Open Reasoning' }
  ];

  function estimateTokens(str) {
    if (!str) return 0;
    const words = str.trim().split(/\s+/).filter(Boolean).length;
    const chars = str.length;
    return Math.max(words, Math.ceil(chars / 3.85));
  }

  function update() {
    const text = promptText.value || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const inTokens = estimateTokens(text) || 250;
    const outTokens = Math.max(0, parseInt(expectedOutTokens.value) || 500);
    const calls = Math.max(1, parseInt(numCalls.value) || 1000);

    outTokenCount.textContent = inTokens.toLocaleString();
    outWordCount.textContent = words.toLocaleString();
    outCharCount.textContent = chars.toLocaleString();

    tableBody.innerHTML = models.map(m => {
      const singleCost = ((inTokens / 1e6) * m.inPrice) + ((outTokens / 1e6) * m.outPrice);
      const batchCost = singleCost * calls;
      return `
        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <td style="padding:0.65rem;font-weight:600;">${m.name} <span style="font-size:0.75rem;padding:0.15rem 0.5rem;background:rgba(79,70,229,0.2);color:#818cf8;border-radius:10px;margin-left:0.35rem;">${m.badge}</span></td>
          <td style="padding:0.65rem;">$${m.inPrice.toFixed(2)} / $${m.outPrice.toFixed(2)}</td>
          <td style="padding:0.65rem;color:#38bdf8;">$${singleCost < 0.01 ? singleCost.toFixed(5) : singleCost.toFixed(4)}</td>
          <td style="padding:0.65rem;font-weight:700;color:#34d399;">$${batchCost.toFixed(2)}</td>
        </tr>
      `;
    }).join('');
  }

  [promptText, expectedOutTokens, numCalls].forEach(el => {
    if (el) el.addEventListener('input', update);
  });

  update();
});
