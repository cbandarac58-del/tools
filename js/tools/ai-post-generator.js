
document.addEventListener('DOMContentLoaded', () => {
  const postTopic = document.getElementById('postTopic');
  const postPlatform = document.getElementById('postPlatform');
  const postTone = document.getElementById('postTone');
  const generatePostBtn = document.getElementById('generatePostBtn');
  const postOutput = document.getElementById('postOutput');
  const copyPostBtn = document.getElementById('copyPostBtn');

  SmartToolzAI.addRecentTool('AI Social Post Generator', 'ai-post-generator.html', '📱');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Social Post Generator');

  const templates = {
    twitter: {
      inspirational: 'Belief is the first step to achieving your dreams. 🚀 Let us talk about [Topic]. Remember: consistent small steps lead to massive results. What is holding you back today?',
      educational: 'Looking to learn about [Topic]? Here is a quick tip: Focus on understanding the core fundamentals first, then build up. Clean systems win every time. 🧠',
      humorous: 'Me: I will easily master [Topic] in 10 minutes.\n\n10 minutes later: *Searching Google how to exit Vim again* 💀'
    },
    linkedin: {
      inspirational: 'Yesterday I was thinking about [Topic].\n\nIn my career, I have realized that the best investments we make are not in software or marketing — they are in our own growth and learning.\n\nLet us commit to leveling up today. 🚀\n\nAgree? 👇',
      educational: 'Here is what nobody tells you about [Topic]:\n\n1. Simple beats complex every single day.\n2. Systems are more important than goals.\n3. Consistency is the ultimate secret weapon.\n\nTake action today. 💡',
      humorous: 'My resume: "Expert in [Topic]"\n\nMy actual daily work: Coping and pasting code from stackoverflow and hoping it runs without crashing my system. 😂\n\nKeep it real, folks.'
    },
    instagram: {
      inspirational: 'Believe you can and you are halfway there. 🌟 Thinking deeply about [Topic] today and how we can all push our limits to achieve what we want.\n\nDouble tap if you are ready to hustle! 💥\n\n#motivation #hustle #success #dailyinspiration',
      educational: 'Knowledge is power. 🧠 Swipe to see how to master [Topic] like a pro! Save this post for later reference.\n\n#education #learning #productivitytips #knowledge',
      humorous: 'Trying to manage [Topic] like: 🤡\n\nTag a friend who can relate to this struggle! 👇\n\n#meme #humor #dailyfun #relatable'
    },
    youtube: {
      inspirational: '🎥 YouTube Idea: How [Topic] Changed My Life\n\n[Intro]: Share a personal story related to [Topic] and the exact moment things clicked.\n[Key point 1]: The initial struggle.\n[Key point 2]: The breakthrough strategy.\n[Call to Action]: Subscribe for more inspirational content! 🚀',
      educational: '🎥 YouTube Tutorial Outline: Ultimate Guide to [Topic]\n\n[Hook]: Explain why mastering [Topic] is essential in 2026.\n[Body]: Break down the top 3 actionable tips step-by-step.\n[Outro]: Sum up, ask viewers to comment their thoughts, and hit subscribe! 🧠',
      humorous: '🎥 YouTube Shorts Idea: Expectation vs Reality of [Topic] 💀\n\n[Clip 1]: Expectation - doing [Topic] flawlessly with cinematic background music.\n[Clip 2]: Reality - absolute chaos, things breaking, and looking confused.\n[Text Overlay]: Tag someone who does this! 😂'
    },
    pinterest: {
      inspirational: 'Pin description: Dream big, plan smart, and take action on [Topic] today. 🚀 Perfect inspiration for your daily boards. Save this pin for later motivation!',
      educational: 'Pin description: The ultimate guide to [Topic]! Learn the step-by-step hacks that actually work. 💡 Click to read the full guide. #diy #how-to #learning',
      humorous: 'Pin description: Trying to look like an expert in [Topic] but having no idea what is actually happening. 🤡 Save this for a laugh! #meme #funny'
    },
    quora: {
      inspirational: 'Question: What is the most inspiring advice regarding [Topic]?\n\nAnswer: From my experience, the key to [Topic] is not talent, but perseverance. When you focus on long-term growth, every setback becomes a lesson. Start small, stay consistent, and believe in the process! 🌟',
      educational: 'Question: How do I get started with [Topic]?\n\nAnswer: Here is the exact step-by-step framework to master [Topic]:\n1. Learn the basics thoroughly.\n2. Practice daily with real-world examples.\n3. Join communities and ask for feedback. 🧠',
      humorous: 'Question: Why is [Topic] so difficult to understand?\n\nAnswer: Because it is designed to test your sanity! 😂 We all start thinking it is simple, only to end up in a rabbit hole of complicated terminology. Just laugh it off and take one step at a time.'
    },
    reddit: {
      inspirational: 'r/productivity: How [Topic] helped me turn things around.\n\nHey everyone, just wanted to share how focusing on [Topic] completely changed my daily routine. If you are struggling, keep pushing — it is worth it! 🚀',
      educational: 'r/learnprogramming: My ultimate cheat sheet for [Topic]\n\nHere is a simple breakdown of how to get started with [Topic]. Ask me anything in the comments! 💡',
      humorous: 'r/memes: When you finally understand [Topic] but the server crashes 💀\n\nWe have all been there. It works on localhost, but production is a completely different story. Send help! 😂'
    }
  };

  function generatePost() {
    const topic = postTopic.value.trim();
    if (!topic) {
      SmartToolzAI.showToast('Please enter a topic/idea', 'error');
      return;
    }

    const platform = postPlatform.value;
    const tone = postTone.value;

    const baseTemplate = templates[platform][tone];
    const generated = baseTemplate.replace(/\[Topic\]/g, topic).replace(/\\n/g, '\n');

    postOutput.innerHTML = generated.replace(/\n/g, '<br>');
  }

  generatePostBtn.addEventListener('click', generatePost);

  copyPostBtn.addEventListener('click', () => {
    if (postOutput.textContent !== 'Enter your idea and click Generate.') {
      SmartToolzAI.copyToClipboard(postOutput.textContent);
    }
  });
});
