
document.addEventListener('DOMContentLoaded', () => {
  const loremType = document.getElementById('loremType');
  const loremCount = document.getElementById('loremCount');
  const generateLoremBtn = document.getElementById('generateLoremBtn');
  const loremOutput = document.getElementById('loremOutput');
  const copyLoremBtn = document.getElementById('copyLoremBtn');

  SmartToolzAI.addRecentTool('Lorem Ipsum Generator', 'lorem-generator.html', '📄');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Lorem Ipsum Generator');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
    'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
    'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in',
    'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
    'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in',
    'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  function randomWord() {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  }

  function generateSentence() {
    const length = Math.floor(Math.random() * 8) + 6; // 6-14 words
    const sentence = [];
    for (let i = 0; i < length; i++) sentence.push(randomWord());
    const text = sentence.join(' ');
    return text.charAt(0).toUpperCase() + text.slice(1) + '.';
  }

  function generateParagraph() {
    const sentences = [];
    const count = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
    for (let i = 0; i < count; i++) sentences.push(generateSentence());
    return sentences.join(' ');
  }

  function generateLorem() {
    const type = loremType.value;
    const count = parseInt(loremCount.value) || 1;
    let result = '';

    if (type === 'words') {
      const words = [];
      for (let i = 0; i < count; i++) words.push(randomWord());
      result = words.join(' ');
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < count; i++) sentences.push(generateSentence());
      result = sentences.join(' ');
    } else {
      const paragraphs = [];
      for (let i = 0; i < count; i++) paragraphs.push(generateParagraph());
      result = paragraphs.map(p => `<p style="margin-bottom: 1rem;">${p}</p>`).join('');
    }

    loremOutput.innerHTML = result;
  }

  generateLoremBtn.addEventListener('click', generateLorem);
  copyLoremBtn.addEventListener('click', () => {
    SmartToolzAI.copyToClipboard(loremOutput.textContent.trim());
  });

  generateLorem();
});
