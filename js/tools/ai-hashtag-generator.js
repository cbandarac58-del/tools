
document.addEventListener('DOMContentLoaded', () => {
  const hashTopic = document.getElementById('hashTopic');
  const hashPlatform = document.getElementById('hashPlatform');
  const generateHashBtn = document.getElementById('generateHashBtn');
  const hashOutput = document.getElementById('hashOutput');
  const copyHashBtn = document.getElementById('copyHashBtn');

  SmartToolzAI.addRecentTool('AI Hashtag Generator', 'ai-hashtag-generator.html', '#️⃣');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Hashtag Generator');

  const baseHashtags = {
    tech: ['technology', 'programming', 'code', 'ai', 'developer', 'startup', 'webdev', 'cybersecurity', 'techworld', 'gadgets'],
    business: ['business', 'marketing', 'entrepreneur', 'success', 'mindset', 'motivation', 'finance', 'branding', 'sales', 'growth'],
    travel: ['travel', 'wanderlust', 'nature', 'photography', 'adventure', 'explore', 'vacation', 'trip', 'landscape', 'travelgram'],
    food: ['foodie', 'instafood', 'yummy', 'delicious', 'cooking', 'recipe', 'healthyfood', 'foodporn', 'dinner', 'homemade'],
    fitness: ['fitness', 'gym', 'workout', 'motivation', 'health', 'training', 'healthy', 'lifestyle', 'fitfam', 'cardio']
  };

  function generateHashtags() {
    const query = hashTopic.value.trim().toLowerCase();
    if (!query) {
      SmartToolzAI.showToast('Please enter a keyword/topic', 'error');
      return;
    }

    const words = query.split(/\s+/).map(w => w.replace(/[^a-z0-9]/g, ''));
    let generated = [];

    // Core tags from input
    words.forEach(w => {
      if (w.length > 2) {
        generated.push(`#${w}`);
        generated.push(`#${w}tips`);
        generated.push(`#${w}life`);
      }
    });

    // Detect category
    let category = 'business';
    if (query.includes('tech') || query.includes('code') || query.includes('app') || query.includes('software')) {
      category = 'tech';
    } else if (query.includes('travel') || query.includes('photo') || query.includes('trip') || query.includes('nature')) {
      category = 'travel';
    } else if (query.includes('food') || query.includes('cook') || query.includes('eat') || query.includes('recipe')) {
      category = 'food';
    } else if (query.includes('fit') || query.includes('gym') || query.includes('workout') || query.includes('health')) {
      category = 'fitness';
    }

    const platform = hashPlatform.value;
    const catTags = baseHashtags[category];
    catTags.forEach(t => generated.push(`#${t}`));

    // Platform specific
    if (platform === 'tiktok') {
      generated.push('#fyp', '#foryou', '#trending', '#viral');
    } else if (platform === 'instagram') {
      generated.push('#instagood', '#picoftheday', '#viralpost');
    } else if (platform === 'linkedin') {
      generated.push('#networking', '#management', '#professional');
    } else if (platform === 'youtube') {
      generated.push('#youtube', '#youtubeshorts', '#subscribe', '#video');
    } else if (platform === 'twitter') {
      generated.push('#trending', '#breaking', '#news', '#discussion');
    } else if (platform === 'pinterest') {
      generated.push('#pinterest', '#diy', '#inspiration', '#aesthetic');
    } else if (platform === 'quora') {
      generated.push('#quora', '#knowledge', '#answers', '#learning');
    } else if (platform === 'reddit') {
      generated.push('#reddit', '#community', '#discussion', '#todayilearned');
    }

    // Filter duplicates
    generated = [...new Set(generated)].slice(0, 20);

    hashOutput.textContent = generated.join(' ');
  }

  generateHashBtn.addEventListener('click', generateHashtags);

  copyHashBtn.addEventListener('click', () => {
    if (hashOutput.textContent !== 'Enter your keyword and click Generate.') {
      SmartToolzAI.copyToClipboard(hashOutput.textContent);
    }
  });
});
