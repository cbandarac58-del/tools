document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidebar
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Brand Slogan Generator');
  }

  // Register recent tool
  SmartToolzAI.addRecentTool('AI Brand Slogan Generator', 'tools/ai-slogan-generator.html', '📢');

  const sloganBrand = document.getElementById('sloganBrand');
  const sloganKeywords = document.getElementById('sloganKeywords');
  const sloganStyle = document.getElementById('sloganStyle');
  const generateSloganBtn = document.getElementById('generateSloganBtn');
  const sloganResultsContainer = document.getElementById('sloganResultsContainer');
  const sloganGrid = document.getElementById('sloganGrid');

  // Slogan Templates Database
  const templates = {
    bold: [
      "{brand}: Redefining {keywords}.",
      "The power of {keywords}, built for leaders.",
      "Take your world to the next level with {brand}.",
      "Unleash the potential of {keywords}.",
      "{brand}: Built to lead, designed to win.",
      "Don't just do it. Excel in {keywords} with {brand}.",
      "{brand}: Bold ideas. High performance.",
      "Revolutionize your {keywords} strategy.",
      "Breaking limits, setting standards: {brand}.",
      "{brand}: Rise above the noise.",
      "The ultimate standard in {keywords}.",
      "{brand}: Because compromises aren't an option."
    ],
    trustworthy: [
      "{brand}: Your trusted partner in {keywords}.",
      "Quality you can rely on. Expert {keywords}.",
      "Securing your future in {keywords}.",
      "Experience. Trust. Excellence. That's {brand}.",
      "Professional {keywords} solutions you can count on.",
      "{brand}: Integrity in every detail.",
      "Guiding you forward through {keywords}.",
      "Your success, secured by {brand}.",
      "Honest values. Expert {keywords}.",
      "{brand}: Building trust, delivering results.",
      "Where expertise meets dedication.",
      "Dependable {keywords} for modern businesses."
    ],
    catchy: [
      "Got {keywords}? Get {brand}.",
      "{brand}: Smart choices, simple solutions.",
      "The future of {keywords} is here.",
      "Think {keywords}. Think {brand}.",
      "{brand}: Simply better {keywords}.",
      "Making {keywords} easier than ever.",
      "The smart way to handle {keywords}.",
      "{brand}: Sparking creativity, delivering value.",
      "Uncomplicate your {keywords}.",
      "Fast. Smart. Simple. {brand}.",
      "Where {keywords} meets innovation.",
      "Your day, made better with {brand}."
    ],
    rhyming: [
      "Make a splash, grow your cash with {brand}.",
      "{brand}: Done right, day and night.",
      "Save your time, make it prime with {brand}.",
      "Bright minds, best finds: {brand}.",
      "{brand}: The smart choice for your voice.",
      "Speed and style, worth your while.",
      "No more stress, only success with {brand}.",
      "Grow your plan in the best way you can.",
      "{brand}: A touch of grace in a busy space.",
      "Aim high, touch the sky with {brand}.",
      "{brand}: Clear and bright, working just right.",
      "Your quest, our best: {brand}."
    ]
  };

  generateSloganBtn.addEventListener('click', () => {
    let brand = sloganBrand.value.trim();
    let keywords = sloganKeywords.value.trim();

    if (!brand) brand = 'Our Brand';
    if (!keywords) keywords = 'excellence';

    // Capitalize brand name
    brand = brand.charAt(0).toUpperCase() + brand.slice(1);
    
    // Lowercase keywords for middle sentence insertions
    keywords = keywords.toLowerCase();

    const style = sloganStyle.value;
    const selectedTemplates = templates[style];

    sloganGrid.innerHTML = '';
    selectedTemplates.forEach(tpl => {
      const slogan = tpl.replace(/{brand}/g, brand).replace(/{keywords}/g, keywords);

      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.display = 'flex';
      card.style.justifyContent = 'space-between';
      card.style.alignItems = 'center';
      card.style.padding = '0.75rem 1rem';
      card.style.background = 'rgba(255, 255, 255, 0.03)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      card.style.borderRadius = '8px';

      card.innerHTML = `
        <div style="font-size: 1rem; font-weight: 500; color: var(--text-normal);">${slogan}</div>
        <button class="btn btn-ghost btn-sm copy-slogan-btn" style="flex-shrink: 0; margin-left: 1rem;">Copy</button>
      `;

      card.querySelector('.copy-slogan-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(slogan);
      });

      sloganGrid.appendChild(card);
    });

    sloganResultsContainer.style.display = 'block';
    SmartToolzAI.showToast('Slogans generated successfully!');
  });
});
