document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Markdown to HTML & PDF Editor', 'markdown-to-html-editor.html', '📝');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Markdown to HTML & PDF Editor');
  }

  const mdInput = document.getElementById('mdInput');
  const mdPreview = document.getElementById('mdPreview');
  const btnCopyHtml = document.getElementById('btnCopyMdHtml');
  const btnDlHtml = document.getElementById('btnDlMdHtml');

  function mdToHtml(md) {
    let html = md
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code style="background:rgba(79,70,229,0.2);padding:0.15rem 0.35rem;border-radius:4px;">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener" style="color:#818cf8;">$1</a>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    return `<p>${html}</p>`;
  }

  function render() {
    mdPreview.innerHTML = mdToHtml(mdInput.value || '');
  }

  mdInput.addEventListener('input', render);
  btnCopyHtml.addEventListener('click', () => SmartToolzAI.copyToClipboard(mdPreview.innerHTML));
  btnDlHtml.addEventListener('click', () => {
    const full = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Markdown Export</title><style>body{font-family:system-ui,sans-serif;max-width:780px;margin:2rem auto;line-height:1.7;padding:0 1rem;}</style></head><body>${mdPreview.innerHTML}</body></html>`;
    const blob = new Blob([full], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'markdown-export.html';
    a.click();
    SmartToolzAI.showToast('Clean HTML exported!');
  });

  render();
});
