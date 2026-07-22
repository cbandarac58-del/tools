document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Widget Generator');
  }
  SmartToolzAI.addRecentTool('Widget Generator', 'tools/embed-widget.html', '🧩');

  const selectTool = document.getElementById('selectTool');
  const widgetWidth = document.getElementById('widgetWidth');
  const widgetHeight = document.getElementById('widgetHeight');
  const codeOutput = document.getElementById('codeOutput');
  const btnCopyCode = document.getElementById('btnCopyCode');
  const previewContainer = document.getElementById('previewContainer');

  function updateWidgetCode() {
    const selectedPath = selectTool.value;
    const width = widgetWidth.value.trim() || '100%';
    const height = widgetHeight.value.trim() || '650';
    const fullUrl = `https://smarttoolzai.com/${selectedPath}`;

    const embedHtml = `<iframe src="${fullUrl}" width="${width}" height="${height}" style="border:none;border-radius:12px;overflow:hidden;" loading="lazy"></iframe>\n<div style="font-size:12px;text-align:right;margin-top:4px;font-family:sans-serif;"><a href="https://smarttoolzai.com/" target="_blank" rel="noopener" style="color:#6366f1;text-decoration:none;">Powered by SmartToolzAI - Free Online Tools</a></div>`;

    codeOutput.textContent = embedHtml;

    // Update preview iframe
    previewContainer.innerHTML = `<iframe src="../${selectedPath}" width="${width}" height="${height}" style="border:none;border-radius:12px;overflow:hidden;width:100%;"></iframe>`;
  }

  selectTool.addEventListener('change', updateWidgetCode);
  widgetWidth.addEventListener('input', updateWidgetCode);
  widgetHeight.addEventListener('input', updateWidgetCode);

  btnCopyCode.addEventListener('click', () => {
    navigator.clipboard.writeText(codeOutput.textContent).then(() => {
      SmartToolzAI.showToast('Embed code copied to clipboard!');
    }).catch(err => {
      SmartToolzAI.showToast('Failed to copy. Please copy manually.');
    });
  });

  // Initial calculation
  updateWidgetCode();
});
