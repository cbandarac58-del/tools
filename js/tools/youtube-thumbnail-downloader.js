document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('YouTube Thumbnail Downloader', 'youtube-thumbnail-downloader.html', '🖼️');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('YouTube Thumbnail Downloader');
  }

  const urlInput = document.getElementById('ytThumbUrl');
  const fetchBtn = document.getElementById('btnFetchYtThumb');
  const grid = document.getElementById('ytThumbGrid');
  const resultsBox = document.getElementById('ytThumbResults');

  function extractVideoId(input) {
    const str = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
    const match = str.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  function renderThumbnails() {
    const vid = extractVideoId(urlInput.value || 'dQw4w9WgXcQ');
    if (!vid) {
      SmartToolzAI.showToast('Please enter a valid YouTube video or Shorts URL', 'error');
      return;
    }

    const variants = [
      { label: 'Max Resolution HD / 4K (1280×720)', code: 'maxresdefault', url: `https://img.youtube.com/vi/${vid}/maxresdefault.jpg` },
      { label: 'Standard HD (640×480)', code: 'sddefault', url: `https://img.youtube.com/vi/${vid}/sddefault.jpg` },
      { label: 'High Quality (480×360)', code: 'hqdefault', url: `https://img.youtube.com/vi/${vid}/hqdefault.jpg` },
      { label: 'Medium Quality (320×180)', code: 'mqdefault', url: `https://img.youtube.com/vi/${vid}/mqdefault.jpg` }
    ];

    grid.innerHTML = variants.map(v => `
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">
          <strong>📸 ${v.label}</strong>
          <div style="display:flex;gap:0.5rem;">
            <a href="${v.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">⬇️ Open / Save JPG</a>
            <button type="button" class="btn btn-ghost btn-sm" onclick="SmartToolzAI.copyToClipboard('${v.url}')">📋 Copy URL</button>
          </div>
        </div>
        <img src="${v.url}" alt="${v.label}" style="width:100%;border-radius:8px;display:block;border:1px solid rgba(255,255,255,0.1);">
      </div>
    `).join('');

    resultsBox.style.display = 'block';
  }

  fetchBtn.addEventListener('click', renderThumbnails);
  renderThumbnails();
});
