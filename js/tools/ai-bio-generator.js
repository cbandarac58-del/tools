document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidebar
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Social Bio Generator');
  }

  // Register recent tool
  SmartToolzAI.addRecentTool('AI Social Bio Generator', 'tools/ai-bio-generator.html', '👤');

  const bioKeywords = document.getElementById('bioKeywords');
  const bioPlatform = document.getElementById('bioPlatform');
  const bioStyle = document.getElementById('bioStyle');
  const bioEmojis = document.getElementById('bioEmojis');
  const generateBioBtn = document.getElementById('generateBioBtn');
  const bioResultsContainer = document.getElementById('bioResultsContainer');
  const bioList = document.getElementById('bioList');

  // Emojis stripping regex helper
  function stripEmojis(text) {
    return text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '');
  }

  // Templates Database
  const templates = {
    instagram: {
      creative: [
        "✨ Living life in full color.\n🎨 {keywords}\n📍 Sri Lanka\n📬 DM for collabs",
        "Turning caffeine into content ☕\n🔥 {keywords}\n💫 Dreamer & Doer.",
        "Creating my own sunshine ☀️\n🌟 Specialized in {keywords}\n👇 Check my latest work",
        "🚀 Space cadet exploring the digital universe.\n👾 Mind: {keywords}\n💌 Say hi!",
        "Stardust mixed with a little bit of magic ✨\n🌿 Passionate about {keywords}\n👇 Let's connect!"
      ],
      professional: [
        "💼 Professional {keywords}\n📈 Helping brands grow & scale\n📍 Colombo, Sri Lanka\n📧 email@domain.com",
        "🎯 Certified specialist in {keywords}\n🚀 5+ Years Experience\n💼 CEO @ MyCompany\n👇 Let's work together!",
        "💡 Business Architect | {keywords}\n📊 Driven by results & data\n🌟 Partner @ Agency\n👇 Book a call",
        "📈 Helping entrepreneurs achieve financial freedom.\n🛠️ Focus: {keywords}\n🎯 Direct message for consulting",
        "🚀 Scaled 10+ startups to 7-figures\n💡 Expert in {keywords}\n📍 Sri Lanka | Global\n📬 Work with me 👇"
      ],
      humorous: [
        "🔋 99% caffeine, 1% talent.\n🤪 Dealing with {keywords}\n⚠️ Do not try this at home",
        "An absolute amateur at life 🤷‍♂️\n🍕 Professional at eating, rookie at {keywords}\n💬 DM me memes",
        "Professional overthinker and part-time {keywords} wizard 🧙‍♂️\n📦 Unboxing life daily\n📍 Lost in Sri Lanka",
        "My life is controlled by Ctrl+Z ⌨️\n👾 Doing {keywords} just for the cookies\n👇 Scroll down for magic",
        "Currently holding a master's degree in sarcasm 🎓\n⚡ Focused on {keywords}\n📬 Business inquiries: Ask my cat"
      ],
      aesthetic: [
        "• {keywords}\n• collector of quiet moments ☕\n• based in SL 🌿\n• visual diary.",
        "minimalist thoughts ☁️\nexploring {keywords} with grace.\nsoft shadows & warm tea ✨",
        "soft light | {keywords} | visual notes 📖\ncurating my space in the universe ✨",
        "whispering winds & warm tones 🌿\n{keywords} advocate.\nkeeping it simple 🕊️",
        "chasing sunsets & clean code 🌅\n🌿 {keywords}\n✨ quiet reflections"
      ]
    },
    linkedin: {
      creative: [
        "🚀 Reimagining the future of {keywords} | Creative Consultant & Strategist. Let's build something epic! 🎨",
        "💡 Bridging the gap between imagination and execution in {keywords}. Transforming ideas into scale. ⚡",
        "🌟 Innovator. Speaker. Developer. Driven by high-impact ideas and pioneering {keywords} solutions. 🚀",
        "🎨 Creative Engineer | Crafting human-centered designs with a focus on {keywords}. Let's collaborate! 🚀",
        "🧠 Mindset of a builder, heart of an artist. Leading the next wave of {keywords} innovations. ✨"
      ],
      professional: [
        "💼 Senior Executive specializing in {keywords} | 8+ Years of driving corporate growth & leadership. 📈",
        "📊 Data-Driven Specialist | Helping enterprises optimize performance and scale in {keywords}. 🚀",
        "🎯 Managing Partner. Focused on delivering premium solutions in {keywords}. Sri Lanka & APAC. 💼",
        "💡 Industry Pioneer | Passionate about building highly efficient teams and systems in {keywords}. 📈",
        "📈 Growth Officer | Dedicated to scaling business portfolios, customer relations, and {keywords}. 🎯"
      ],
      humorous: [
        "🤪 I do {keywords} so you don't have to. Professional problem solver (mostly problems I created). 🧙‍♂️",
        "⌨️ Translating corporate buzzwords into actual working code. Specialized in {keywords}. Let's chat! ☕",
        "🚀 Senior {keywords} Specialist. I speak fluent English, HTML, and corporate sarcasm. 📈",
        "💡 I get paid to think about {keywords}. Sometimes those thoughts actually work. Let's connect! 🎯",
        "🔋 Fueled by coffee, client feedback, and deadline panic. Crafting premium {keywords} solutions. ⚡"
      ],
      aesthetic: [
        "Minimalist approach to complex corporate problems. Focused on {keywords}. | Sri Lanka 🕊️",
        "Simplicity is the ultimate sophistication. Curating strategic operations in {keywords}. ✨",
        "Clean designs. Clear strategies. Effective outcomes in {keywords}. | Professional Profile 🌿",
        "Quiet leadership. High-impact results. Specialist in {keywords} and organizational culture. 🕊️",
        "Curating minimal, highly-efficient workflows for enterprise-level projects in {keywords}. ✨"
      ]
    },
    twitter: {
      creative: [
        "⚡ Coding the future. Building startup hubs & writing about {keywords}. Retweets are recommendations! 🚀",
        "🎨 Pixel pusher. Thought creator. Exploring {keywords} and Web3 possibilities. 🌐",
        "🧠 Obsessed with tech, AI, and {keywords}. Let's build the next generation of software together. 💻",
        "🚀 Launching new products every month. Currently hacking {keywords}. Join the journey! ✨",
        "✍️ Writer by night, {keywords} wizard by day. Sharing raw thoughts on tech & lifestyle. 🌿"
      ],
      professional: [
        "💼 CEO at TechCo. Sharing insights on startup scaling, venture capital, and {keywords}. Colombo, SL. 📈",
        "🎯 Help brands grow. Focus: SEO, SaaS marketing, and {keywords}. Follow for daily tips! 📊",
        "📊 Senior Advisor. Helping businesses pivot and transform digital operations in {keywords}. 🚀",
        "📈 Scale Specialist | Tweeting about marketing automation, product design, and {keywords}. 💻",
        "💡 Consultant. Speaker. Author. Direct Message (DM) for coaching and {keywords} inquiries. 📬"
      ],
      humorous: [
        "🤪 Running on 90% anxiety and 10% {keywords} expertise. Follow for chaotic coding updates! ⌨️",
        "🍕 Professional pizza critic. I also do some {keywords} work on the side to support my habit. 💬",
        "⚠️ Warning: Tweeting out of context. Doing {keywords} and hoping for the best. 🧙‍♂️",
        "👾 I'm not lazy, I'm just in battery-saving mode. Solving {keywords} bugs day in, day out. ☕",
        "💬 My code works, but I don't know why. Senior {keywords} engineer. Let's debug life. 🤷‍♂️"
      ],
      aesthetic: [
        "🌿 quiet mornings | coding {keywords} | capturing light.\n✨ minimalist reflections.",
        "chasing slow sunsets 🌅\nbuilding {keywords} systems with intent.\nsimply exist 🕊️",
        "warm tones | coffee cups | {keywords} notes.\n🕊️ curating space.",
        "🕊️ soft aesthetics & clean design.\n🌿 currently exploring {keywords}.\n✨ simplicity is home.",
        "✨ digital minimalist.\n🌱 observing life through the lens of {keywords}.\n☕ slow days."
      ]
    },
    tiktok: {
      creative: [
        "👾 Behind the scenes of a creator.\n⚡ {keywords} tutorials daily!\n👇 Get my templates!",
        "🎨 Aesthetic edits & daily vlogs.\n🌟 Passionate about {keywords}\n🚀 Join the squad!",
        "🚀 Hacking my way through {keywords}.\n⚡ Daily tips & tricks!\n👇 Link in bio!",
        "⚡ Making tech simple.\n👾 Exploring {keywords} hacks you didn't know existed.\n💬 Drop a comment!",
        "🎨 Creative director sharing my visual secrets.\n🌿 Focus: {keywords}\n📬 Collabs: DM me!"
      ],
      professional: [
        "📈 Learn {keywords} in 60 seconds!\n💼 Career advice & business tips.\n👇 Join my free newsletter",
        "📊 Daily marketing tips for startups.\n💡 Specialized in {keywords}\n📬 Work with me below!",
        "💡 Corporate survival tips & {keywords} hacks.\n📈 Certified Consultant.\n👇 Book a 1:1 call",
        "📈 Helping you build your digital empire.\n🛠️ Learn {keywords} from scratch.\n👇 Free resources!",
        "💼 Senior Recruiter sharing HR secrets.\n🌟 Elevate your career in {keywords}.\n💬 Ask me anything!"
      ],
      humorous: [
        "🤪 Doing {keywords} badly so you feel better about yourself.\n🍿 Entertainment purposes only!",
        "🤷‍♂️ Just another creator crying over code.\n👾 {keywords} fails & comedy sketches.\n👇 Click at your own risk!",
        "⚠️ Do not take my advice.\n🍕 Sarcastic tutorials on {keywords} & life.\n💬 Tell me your worst coding story!",
        "👾 Fighting bugs in my code and real life.\n☕ Powered entirely by iced coffee and {keywords} dreams.\n👇",
        "🎓 Holding a PhD in wasting time.\n⚡ Part-time {keywords} hacker.\n📬 Business: Ask my cat."
      ],
      aesthetic: [
        "🌿 slow edits & quiet days.\n☕ study with me: {keywords}.\n✨ safe space.",
        "soft aesthetics ☁️\ndaily visual logs of {keywords}.\n🌿 calm mind.",
        "🕊️ quiet mornings and visual notes.\n✨ learning {keywords}.\n🌱 slow living.",
        "🌅 warm sunsets & clean study desk.\n☕ specializing in {keywords}.\n✨ peace.",
        "✨ curating simple moments.\n🌱 coding diary: {keywords}.\n🕊️ soft beats."
      ]
    }
  };

  generateBioBtn.addEventListener('click', () => {
    const keywords = bioKeywords.value.trim();
    if (!keywords) {
      SmartToolzAI.showToast('Please enter some keywords about yourself!');
      return;
    }

    const platform = bioPlatform.value;
    const style = bioStyle.value;
    const includeEmojis = bioEmojis.checked;

    const selectedTemplates = templates[platform][style];
    bioList.innerHTML = '';

    selectedTemplates.forEach((tpl, index) => {
      let generatedBio = tpl.replace(/{keywords}/g, keywords);
      if (!includeEmojis) {
        generatedBio = stripEmojis(generatedBio);
      }

      // Create card UI for each generated bio
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.position = 'relative';
      card.style.marginBottom = '1rem';
      card.style.padding = '1rem';
      card.style.background = 'rgba(255, 255, 255, 0.03)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      card.style.borderRadius = '8px';

      card.innerHTML = `
        <div style="white-space: pre-wrap; font-size: 0.95rem; margin-bottom: 0.75rem;">${generatedBio}</div>
        <button class="btn btn-ghost btn-sm copy-bio-btn" style="position: absolute; right: 10px; bottom: 10px;">Copy Bio</button>
      `;

      // Copy individual bio event listener
      card.querySelector('.copy-bio-btn').addEventListener('click', () => {
        SmartToolzAI.copyToClipboard(generatedBio);
      });

      bioList.appendChild(card);
    });

    bioResultsContainer.style.display = 'block';
    SmartToolzAI.showToast('AI Bios generated successfully!');
  });
});
