document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Free ATS Resume / CV Builder', 'ats-resume-builder.html', '📄');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Free ATS Resume / CV Builder');
  }

  const downloadBtn = document.getElementById('btnDownloadAtsPdf');

  function wrapLines(text, maxChars) {
    const out = [];
    text.split('\n').forEach(para => {
      const words = para.split(' ');
      let line = '';
      words.forEach(w => {
        if ((line + ' ' + w).trim().length > maxChars) {
          if (line) out.push(line.trim());
          line = w;
        } else {
          line = (line + ' ' + w).trim();
        }
      });
      if (line) out.push(line.trim());
    });
    return out;
  }

  downloadBtn.addEventListener('click', async () => {
    try {
      const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]);
      const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const clean = id => (document.getElementById(id).value || '').replace(/[^\x00-\x7F]/g, '').trim();
      const fullName = clean('cvName') || 'Alex Morgan';
      const roleTitle = clean('cvTitle') || 'Senior Software Engineer';
      const contact = clean('cvContact') || 'alex@example.com | +1 (555) 123-4567 | New York, NY';
      const summary = clean('cvSummary');
      const exp = clean('cvExperience');
      const skills = clean('cvSkills');
      const edu = clean('cvEducation');

      let y = 795;
      page.drawText(fullName.toUpperCase(), { x: 45, y, size: 22, font: fontBold, color: rgb(0.1, 0.14, 0.25) });
      y -= 20;
      page.drawText(roleTitle, { x: 45, y, size: 12.5, font: fontBold, color: rgb(0.31, 0.27, 0.9) });
      y -= 16;
      page.drawText(contact, { x: 45, y, size: 9.5, font: fontReg, color: rgb(0.35, 0.35, 0.4) });
      y -= 14;
      page.drawRectangle({ x: 45, y, width: 505, height: 1.5, color: rgb(0.31, 0.27, 0.9) });

      function drawSection(heading, bodyText, maxChars = 88) {
        if (!bodyText || y < 80) return;
        y -= 24;
        page.drawText(heading.toUpperCase(), { x: 45, y, size: 11, font: fontBold, color: rgb(0.1, 0.14, 0.25) });
        y -= 6;
        page.drawRectangle({ x: 45, y, width: 505, height: 0.6, color: rgb(0.8, 0.82, 0.88) });
        y -= 14;
        wrapLines(bodyText, maxChars).forEach(line => {
          if (y < 45) return;
          const isHeaderLine = line.startsWith('##');
          const txt = isHeaderLine ? line.replace(/^##\s*/, '') : line;
          page.drawText(txt, {
            x: 45,
            y,
            size: isHeaderLine ? 10.5 : 9.8,
            font: isHeaderLine ? fontBold : fontReg,
            color: rgb(0.15, 0.15, 0.2)
          });
          y -= 14;
        });
      }

      drawSection('Professional Summary', summary);
      drawSection('Work Experience', exp);
      drawSection('Core Technical & Professional Skills', skills);
      drawSection('Education & Certifications', edu);

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${fullName.replace(/\s+/g, '_')}_ATS_Resume.pdf`;
      a.click();
      SmartToolzAI.showToast('ATS-Friendly PDF Resume downloaded!');
    } catch {
      SmartToolzAI.showToast('Error generating resume PDF', 'error');
    }
  });
});
