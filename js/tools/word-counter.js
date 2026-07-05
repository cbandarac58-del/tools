
document.addEventListener('DOMContentLoaded', () => {
  const wordInput = document.getElementById('wordInput');
  const valWords = document.getElementById('valWords');
  const valChars = document.getElementById('valChars');
  const valSentences = document.getElementById('valSentences');
  const valParagraphs = document.getElementById('valParagraphs');
  const valReadingTime = document.getElementById('valReadingTime');
  const densityList = document.getElementById('densityList');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');

  // Track recently used
  SmartToolzAI.addRecentTool('Word Counter', 'word-counter.html', '📝');

  // Load Sidebar
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Word Counter');

  function analyzeText() {
    const text = wordInput.value;
    
    // Characters
    valChars.textContent = text.length;

    // Words
    const wordsArray = text.trim().split(/\s+/).filter(w => w.length > 0);
    valWords.textContent = wordsArray.length;

    // Sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    valSentences.textContent = sentences.length;

    // Paragraphs
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    valParagraphs.textContent = paragraphs.length;

    // Reading time (avg 200 words per minute)
    const readMinutes = Math.ceil(wordsArray.length / 200);
    valReadingTime.textContent = wordsArray.length > 0 ? `${readMinutes} min` : '0 min';

    // Keyword density
    if (wordsArray.length === 0) {
      densityList.innerHTML = 'No keywords detected yet.';
      return;
    }

    const freq = {};
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'this', 'that', 'it', 'he', 'she', 'they', 'we', 'i', 'you']);
    
    wordsArray.forEach(w => {
      const cleanWord = w.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        freq[cleanWord] = (freq[cleanWord] || 0) + 1;
      }
    });

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);

    if (sorted.length === 0) {
      densityList.innerHTML = 'Type more words to see density.';
    } else {
      densityList.innerHTML = sorted.map(([word, count]) => {
        const pct = ((count / wordsArray.length) * 100).toFixed(1);
        return `<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-weight: 500;">${word}</span>
          <span style="color: var(--text-secondary);">${count} times (${pct}%)</span>
        </div>`;
      }).join('');
    }
  }

  wordInput.addEventListener('input', analyzeText);

  clearBtn.addEventListener('click', () => {
    wordInput.value = '';
    analyzeText();
  });

  copyBtn.addEventListener('click', () => {
    SmartToolzAI.copyToClipboard(wordInput.value);
  });
});
