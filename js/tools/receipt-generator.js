document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Free PDF Receipt Maker', 'receipt-generator.html', '🧾');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Free PDF Receipt Maker');
  }

  const recDate = document.getElementById('recDate');
  if (recDate) recDate.value = new Date().toISOString().split('T')[0];

  const recNumber = document.getElementById('recNumber');
  const recMethod = document.getElementById('recMethod');
  const recCurrency = document.getElementById('recCurrency');
  const recMerchant = document.getElementById('recMerchant');
  const recCustomer = document.getElementById('recCustomer');
  const recDesc = document.getElementById('recDesc');
  const recAmount = document.getElementById('recAmount');
  const recTax = document.getElementById('recTax');
  const recTotalOut = document.getElementById('recTotalOut');
  const btnDownloadRec = document.getElementById('btnDownloadReceiptPdf');

  function updateSummary() {
    const cur = recCurrency.value || '$';
    const amt = Math.max(0, parseFloat(recAmount.value) || 0);
    const tax = Math.max(0, parseFloat(recTax.value) || 0);
    recTotalOut.textContent = `${cur}${(amt + tax).toFixed(2)}`;
  }

  [recCurrency, recAmount, recTax].forEach(el => {
    if (el) el.addEventListener('input', updateSummary);
    if (el) el.addEventListener('change', updateSummary);
  });

  btnDownloadRec.addEventListener('click', async () => {
    try {
      const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 700]);
      const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const cur = recCurrency.value || '$';
      const num = (recNumber.value || 'REC-2026-101').replace(/[^\x00-\x7F]/g, '');
      const dt = recDate.value || '';
      const method = (recMethod.value || 'Credit Card').replace(/[^\x00-\x7F]/g, '');
      const merchant = (recMerchant.value || 'Smart Business LLC').replace(/[^\x00-\x7F]/g, '');
      const customer = (recCustomer.value || 'Valued Customer').replace(/[^\x00-\x7F]/g, '');
      const desc = (recDesc.value || 'Professional Services Rendered').replace(/[^\x00-\x7F]/g, '');
      const amt = Math.max(0, parseFloat(recAmount.value) || 0);
      const tax = Math.max(0, parseFloat(recTax.value) || 0);
      const total = amt + tax;

      page.drawRectangle({ x: 0, y: 620, width: 595.28, height: 80, color: rgb(0.06, 0.55, 0.38) });
      page.drawText('PAYMENT RECEIPT', { x: 45, y: 652, size: 24, font: fontBold, color: rgb(1, 1, 1) });
      page.drawText(`Receipt #: ${num}  |  Date: ${dt}`, { x: 340, y: 655, size: 10.5, font: fontBold, color: rgb(1, 1, 1) });

      page.drawText('MERCHANT / ISSUED BY:', { x: 45, y: 575, size: 10, font: fontBold, color: rgb(0.35, 0.35, 0.45) });
      page.drawText(merchant, { x: 45, y: 557, size: 12, font: fontBold, color: rgb(0.1, 0.1, 0.15) });

      page.drawText('PAID BY (CUSTOMER):', { x: 320, y: 575, size: 10, font: fontBold, color: rgb(0.35, 0.35, 0.45) });
      page.drawText(customer, { x: 320, y: 557, size: 12, font: fontBold, color: rgb(0.1, 0.1, 0.15) });

      page.drawRectangle({ x: 45, y: 485, width: 505, height: 26, color: rgb(0.93, 0.96, 0.95) });
      page.drawText('DESCRIPTION', { x: 55, y: 494, size: 10, font: fontBold, color: rgb(0.15, 0.25, 0.2) });
      page.drawText('PAYMENT METHOD', { x: 340, y: 494, size: 10, font: fontBold, color: rgb(0.15, 0.25, 0.2) });
      page.drawText('AMOUNT', { x: 480, y: 494, size: 10, font: fontBold, color: rgb(0.15, 0.25, 0.2) });

      page.drawText(desc.slice(0, 48), { x: 55, y: 458, size: 10.5, font: fontReg, color: rgb(0.15, 0.15, 0.2) });
      page.drawText(method, { x: 340, y: 458, size: 10.5, font: fontReg, color: rgb(0.15, 0.15, 0.2) });
      page.drawText(`${cur}${amt.toFixed(2)}`, { x: 480, y: 458, size: 10.5, font: fontBold, color: rgb(0.15, 0.15, 0.2) });

      page.drawText(`Subtotal: ${cur}${amt.toFixed(2)}`, { x: 420, y: 405, size: 10.5, font: fontReg, color: rgb(0.25, 0.25, 0.3) });
      page.drawText(`Tax: ${cur}${tax.toFixed(2)}`, { x: 420, y: 387, size: 10.5, font: fontReg, color: rgb(0.25, 0.25, 0.3) });
      page.drawText(`TOTAL PAID: ${cur}${total.toFixed(2)}`, { x: 395, y: 362, size: 13.5, font: fontBold, color: rgb(0.06, 0.55, 0.38) });

      // Official PAID IN FULL stamp box
      page.drawRectangle({ x: 45, y: 355, width: 145, height: 36, borderColor: rgb(0.06, 0.55, 0.38), borderWidth: 2 });
      page.drawText('PAID IN FULL', { x: 64, y: 368, size: 14, font: fontBold, color: rgb(0.06, 0.55, 0.38) });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${num || 'Receipt'}.pdf`;
      a.click();
      SmartToolzAI.showToast('Official PDF Receipt downloaded!');
    } catch (e) {
      SmartToolzAI.showToast('Error generating receipt PDF', 'error');
    }
  });

  updateSummary();
});
