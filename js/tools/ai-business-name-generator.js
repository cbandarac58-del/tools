document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidebar
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Business Name Generator');
  }

  // Register recent tool
  SmartToolzAI.addRecentTool('AI Business Name Generator', 'tools/ai-business-name-generator.html', '💡');

  const bizKeywords = document.getElementById('bizKeywords');
  const bizIndustry = document.getElementById('bizIndustry');
  const bizStyle = document.getElementById('bizStyle');
  const generateBizBtn = document.getElementById('generateBizBtn');
  const bizResultsContainer = document.getElementById('bizResultsContainer');
  const bizNameGrid = document.getElementById('bizNameGrid');

  // Prefix and Suffix Database
  const modifiers = {
    tech: {
      modern: { pre: ['Cyber', 'Quantum', 'Nexus', 'Vertex', 'Synthetix', 'Sync', 'Neural', 'Apex'], post: ['ify', 'io', 'on', 'ux', 'ex', 'ly'] },
      compound: { stems: ['Grid', 'Node', 'Loop', 'Pulse', 'Wave', 'Flow', 'Core', 'Byte', 'Logic'] },
      short: { pre: ['K', 'V', 'Z', 'X', 'Q'], post: ['is', 'ix', 'on', 'ar'] },
      playful: { pre: ['Pixel', 'Bubble', 'Gizmo', 'Glitch', 'Spark', 'Ping'], post: ['ly', 'bee', 'pop', 'bot'] }
    },
    food: {
      modern: { pre: ['Aura', 'Zenith', 'Origin', 'Pure', 'Velvet', 'Prime', 'Nectar'], post: ['o', 'ia', 'a', 'um', 'us'] },
      compound: { stems: ['Brew', 'Bite', 'Plate', 'Cup', 'Beans', 'Crave', 'Crumb', 'Fork', 'Sip'] },
      short: { pre: ['J', 'M', 'T', 'G'], post: ['ea', 'ox', 'ip', 'um'] },
      playful: { pre: ['Zesty', 'Nom', 'Yum', 'Happy', 'Nibble', 'Spiced'], post: ['o', 'bee', 'box', 'loop'] }
    },
    fashion: {
      modern: { pre: ['Elegance', 'Vogue', 'Chic', 'Velvet', 'Silk', 'Urban', 'Aura'], post: ['a', 'ia', 'ux', 'o', 'ly'] },
      compound: { stems: ['Thread', 'Stitch', 'Loom', 'Style', 'Wear', 'Fit', 'Fitment', 'Trend'] },
      short: { pre: ['V', 'L', 'S', 'D'], post: ['a', 'ex', 'ia', 'on'] },
      playful: { pre: ['Glam', 'Retro', 'Fringe', 'Bold', 'Zippy'], post: ['pop', 'wear', 'box', 'loop'] }
    },
    agency: {
      modern: { pre: ['Apex', 'Zenith', 'Elevate', 'Aura', 'Prime', 'Focus', 'Alpha'], post: ['ify', 'ly', 'ex', 'on'] },
      compound: { stems: ['Grow', 'Lead', 'Flow', 'Scale', 'Shift', 'Edge', 'Link', 'Forge'] },
      short: { pre: ['X', 'Q', 'V', 'K'], post: ['on', 'ux', 'is', 'a'] },
      playful: { pre: ['Spark', 'Bold', 'Banter', 'Rocket', 'Pulse'], post: ['ly', 'pop', 'bee', 'box'] }
    },
    fitness: {
      modern: { pre: ['Iron', 'Titan', 'Apex', 'Zenith', 'Pulse', 'Alpha', 'Force'], post: ['ify', 'ex', 'on', 'us'] },
      compound: { stems: ['Fit', 'Lift', 'Grip', 'Core', 'Zone', 'Pace', 'Burn', 'Power'] },
      short: { pre: ['Z', 'K', 'V', 'F'], post: ['it', 'ox', 'ar', 'on'] },
      playful: { pre: ['Flex', 'Spring', 'Bounce', 'Happy', 'Zippy'], post: ['it', 'pop', 'bee'] }
    },
    general: {
      modern: { pre: ['Apex', 'Zenith', 'Aura', 'Nova', 'Echo', 'Shift', 'Prime'], post: ['ify', 'io', 'ly', 'ex', 'on'] },
      compound: { stems: ['Hub', 'Lab', 'Forge', 'Link', 'Core', 'Flow', 'Zone', 'Edge'] },
      short: { pre: ['X', 'Z', 'V', 'K'], post: ['on', 'is', 'ix', 'a'] },
      playful: { pre: ['Spark', 'Happy', 'Gizmo', 'Bubble', 'Jolly'], post: ['pop', 'ly', 'bee', 'box'] }
    }
  };

  generateBizBtn.addEventListener('click', () => {
    const keywordsInput = bizKeywords.value.trim();
    const industry = bizIndustry.value;
    const style = bizStyle.value;

    let baseWord = 'brand';
    if (keywordsInput) {
      // Pick first word as base
      baseWord = keywordsInput.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
    }
    
    // Capitalize first letter of base word
    baseWord = baseWord.charAt(0).toUpperCase() + baseWord.slice(1).toLowerCase();

    const selectedMods = modifiers[industry][style] || modifiers['general'][style];
    const generatedNames = [];

    if (style === 'modern') {
      const preList = selectedMods.pre;
      const postList = selectedMods.post;

      // Combinations of Pre + Base
      preList.forEach(pre => {
        generatedNames.push(`${pre}${baseWord}`);
      });
      // Combinations of Base + Post
      postList.forEach(post => {
        generatedNames.push(`${baseWord}${post}`);
      });

    } else if (style === 'compound') {
      const stems = selectedMods.stems;
      stems.forEach(stem => {
        // e.g. Base + Stem, or Stem + Base
        generatedNames.push(`${baseWord}${stem}`);
        generatedNames.push(`${stem}${baseWord}`);
      });

    } else if (style === 'short') {
      const preList = selectedMods.pre;
      const postList = selectedMods.post;
      
      const shortBase = baseWord.slice(0, 4); // Keep it short
      preList.forEach(pre => {
        generatedNames.push(`${pre}${shortBase}`);
      });
      postList.forEach(post => {
        generatedNames.push(`${shortBase}${post}`);
      });

    } else if (style === 'playful') {
      const preList = selectedMods.pre;
      const postList = selectedMods.post;

      preList.forEach(pre => {
        generatedNames.push(`${pre} ${baseWord}`);
      });
      postList.forEach(post => {
        generatedNames.push(`${baseWord} ${post}`);
      });
    }

    // Pick top 15 unique names
    const uniqueNames = [...new Set(generatedNames)].slice(0, 15);

    bizNameGrid.innerHTML = '';
    uniqueNames.forEach(name => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';
      card.style.padding = '1rem';
      card.style.background = 'rgba(255, 255, 255, 0.03)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      card.style.borderRadius = '8px';
      card.style.textAlign = 'center';

      card.innerHTML = `
        <div style="font-weight: bold; font-size: 1.1rem; color: var(--text-accent); margin-bottom: 0.75rem;">${name}</div>
        <button class="btn btn-ghost btn-sm copy-name-btn" style="width: 100%;">Copy Name</button>
      `;

      card.querySelector('.copy-name-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(name);
      });

      bizNameGrid.appendChild(card);
    });

    bizResultsContainer.style.display = 'block';
    SmartToolzAI.showToast('Brand names generated successfully!');
  });
});
