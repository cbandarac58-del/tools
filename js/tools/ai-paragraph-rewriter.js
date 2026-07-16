document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidebar
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Paragraph Writer');
  }

  // Register recent tool
  SmartToolzAI.addRecentTool('AI Paragraph Writer', 'tools/ai-paragraph-rewriter.html', '✍️');

  const originalText = document.getElementById('originalText');
  const rewriteAction = document.getElementById('rewriteAction');
  const rewriteTone = document.getElementById('rewriteTone');
  const rewriteBtn = document.getElementById('rewriteBtn');
  const outputContent = document.getElementById('outputContent');
  const copyOutputBtn = document.getElementById('copyOutputBtn');

  // Simple synonym mapping for simplification
  const simpleSynonyms = {
    "utilize": "use",
    "facilitate": "help",
    "subsequently": "later",
    "consequently": "so",
    "advantageous": "helpful",
    "terminate": "end",
    "erroneous": "wrong",
    "expedite": "speed up",
    "commence": "start",
    "implement": "run",
    "optimum": "best",
    "numerous": "many",
    "additional": "more",
    "demonstrate": "show",
    "magnificent": "great",
    "request": "ask for"
  };

  const rephraseTemplates = {
    professional: [
      "From a professional perspective, {sentence}",
      "It is worth noting that {sentence_lc}",
      "Crucially, {sentence_lc}",
      "Furthermore, {sentence_lc}",
      "We can observe that {sentence_lc}"
    ],
    casual: [
      "Basically, {sentence_lc}",
      "Honestly, {sentence_lc}",
      "Here is the thing: {sentence_lc}",
      "You see, {sentence_lc}",
      "To be fair, {sentence_lc}"
    ],
    creative: [
      "Imagine a scenario where {sentence_lc}",
      "Interestingly enough, {sentence_lc}",
      "Like a breath of fresh air, {sentence_lc}",
      "Remarkably, {sentence_lc}",
      "Stepping back, we find that {sentence_lc}"
    ]
  };

  const expandTemplates = {
    professional: [
      "In analyzing this further, it becomes clear that {sentence_lc}",
      "Furthermore, a key aspect to consider is that {sentence_lc}",
      "Consistent with this view, one must emphasize that {sentence_lc}"
    ],
    casual: [
      "If you think about it, what this really means is that {sentence_lc}",
      "And honestly, it's pretty clear that {sentence_lc}",
      "What is even more interesting is that {sentence_lc}"
    ],
    creative: [
      "Diving deeper into this concept, we discover that {sentence_lc}",
      "Unlocking this idea reveals a fascinating truth: {sentence_lc}",
      "In a world where this holds true, {sentence_lc}"
    ]
  };

  const summaryTemplates = {
    professional: [
      "In short, the key takeaway is that {main_idea}.",
      "Ultimately, this demonstrates that {main_idea}.",
      "Conclusively, the primary focus is on {main_idea}."
    ],
    casual: [
      "Long story short, {main_idea}.",
      "Basically, it all comes down to {main_idea}.",
      "To wrap it up, {main_idea}."
    ],
    creative: [
      "In a nutshell, {main_idea}.",
      "The moral of the story is that {main_idea}.",
      "Looking at the big picture, {main_idea}."
    ]
  };

  rewriteBtn.addEventListener('click', () => {
    const text = originalText.value.trim();
    if (!text) {
      SmartToolzAI.showToast('Please enter a paragraph to transform!');
      return;
    }

    const action = rewriteAction.value;
    const tone = rewriteTone.value;

    // Split paragraph into sentences
    const sentences = text.split(/(?<=[.!?])\s+/);
    let output = "";

    if (action === 'rewrite') {
      const templates = rephraseTemplates[tone];
      const rephrased = sentences.map((s, index) => {
        if (!s.trim()) return "";
        let clean = s.trim();
        // Lowercase first letter of sentence for template insertion
        let cleanLc = clean.charAt(0).toLowerCase() + clean.slice(1);
        
        // Remove trailing period for formatting if template adds punctuation
        if (cleanLc.endsWith('.')) cleanLc = cleanLc.slice(0, -1);

        const template = templates[index % templates.length];
        let res = template.replace('{sentence}', clean).replace('{sentence_lc}', cleanLc);
        if (!res.endsWith('.') && !res.endsWith('!') && !res.endsWith('?')) res += '.';
        return res;
      });
      output = rephrased.join(' ');

    } else if (action === 'expand') {
      const templates = expandTemplates[tone];
      const expanded = sentences.map((s, index) => {
        if (!s.trim()) return "";
        let clean = s.trim();
        let cleanLc = clean.charAt(0).toLowerCase() + clean.slice(1);
        if (cleanLc.endsWith('.')) cleanLc = cleanLc.slice(0, -1);

        const template = templates[index % templates.length];
        let res = template.replace('{sentence_lc}', cleanLc);
        if (!res.endsWith('.') && !res.endsWith('!') && !res.endsWith('?')) res += '.';
        return res;
      });
      output = expanded.join(' ');

    } else if (action === 'summarize') {
      // Pick the longest sentence as the "main idea"
      let longest = "";
      sentences.forEach(s => {
        if (s.trim().length > longest.length) {
          longest = s.trim();
        }
      });
      if (longest.endsWith('.')) longest = longest.slice(0, -1);
      let mainIdea = longest.charAt(0).toLowerCase() + longest.slice(1);

      const templates = summaryTemplates[tone];
      const template = templates[Math.floor(Math.random() * templates.length)];
      output = template.replace('{main_idea}', mainIdea);

    } else if (action === 'simplify') {
      // Replace complex words with simpler synonyms
      const simplified = sentences.map(s => {
        if (!s.trim()) return "";
        let words = s.trim().split(/\s+/);
        let newWords = words.map(w => {
          let cleanW = w.toLowerCase().replace(/[^a-z]/g, '');
          if (simpleSynonyms[cleanW]) {
            // Keep capitalization if original word had it
            let replacement = simpleSynonyms[cleanW];
            if (w.charAt(0) === w.charAt(0).toUpperCase()) {
              replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            // Retain punctuation
            let lastChar = w.slice(-1);
            if (/[^a-zA-Z]/.test(lastChar)) {
              replacement += lastChar;
            }
            return replacement;
          }
          return w;
        });
        return newWords.join(' ');
      });
      output = simplified.join(' ');
    }

    outputContent.textContent = output;
    SmartToolzAI.showToast('Paragraph transformed successfully!');
  });

  // Copy functionality
  copyOutputBtn.addEventListener('click', () => {
    const text = outputContent.textContent;
    if (text === 'Your transformed text will appear here...' || !text) {
      SmartToolzAI.showToast('Nothing to copy yet!');
      return;
    }
    SmartToolzAI.copyToClipboard(text);
  });
});
