document.addEventListener('DOMContentLoaded', () => {
  SmartToolzAI.addRecentTool('Free Invoice Generator (PDF)', 'invoice-generator.html', '🧾');
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('Free Invoice Generator (PDF)');
  }

  const invDate = document.getElementById('invDate');
  const invDueDate = document.getElementById('invDueDate');
  const today = new Date();
  const due = new Date(today.getTime() + 14 * 86400000);
  if (invDate) invDate.value = today.toISOString().split('T')[0];
  if (invDueDate) invDueDate.value = due.toISOString().split('T')[0];

  const invItemsList = document.getElementById('invItemsList');
  const addInvItemBtn = document.getElementById('addInvItemBtn');
  const invCurrency = document.getElementById('invCurrency');
  const invTaxRate = document.getElementById('invTaxRate');
  const invDiscount = document.getElementById('invDiscount');
  const invSubtotalOut = document.getElementById('invSubtotalOut');
  const invTaxOut = document.getElementById('invTaxOut');
  const invTotalOut = document.getElementById('invTotalOut');
  const downloadPdfInvoiceBtn = document.getElementById('downloadPdfInvoiceBtn');

  let items = [
    { desc: 'Web Application Design & Development', qty: 1, price: 850 },
    { desc: 'Technical SEO Audit & Performance Optimization', qty: 1, price: 350 }
  ];

  function renderItems() {
    invItemsList.innerHTML = '';
    items.forEach((item, idx) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:grid;grid-template-columns:2fr 90px 120px 44px;gap:0.5rem;align-items:center;';
      row.innerHTML = `
        <input type="text" class="form-input item-desc" value="${item.desc}" placeholder="Item description">
        <input type="number" class="form-input item-qty" value="${item.qty}" min="1" step="1" placeholder="Qty">
        <input type="number" class="form-input item-price" value="${item.price}" min="0" step="0.01" placeholder="Price">
        <button type="button" class="btn btn-ghost btn-sm item-del" title="Remove">✕</button>
      `;
      row.querySelector('.item-desc').addEventListener('input', e => { items[idx].desc = e.target.value; updateTotals(); });
      row.querySelector('.item-qty').addEventListener('input', e => { items[idx].qty = parseFloat(e.target.value) || 0; updateTotals(); });
      row.querySelector('.item-price').addEventListener('input', e => { items[idx].price = parseFloat(e.target.value) || 0; updateTotals(); });
      row.querySelector('.item-del').addEventListener('click', () => {
        if (items.length > 1) {
          items.splice(idx, 1);
          renderItems();
          updateTotals();
        }
      });
      invItemsList.appendChild(row);
    });
  }

  function getTotals() {
    const cur = invCurrency.value;
    const subtotal = items.reduce((acc, it) => acc + (it.qty * it.price), 0);
    const discount = Math.max(0, parseFloat(invDiscount.value) || 0);
    const taxable = Math.max(0, subtotal - discount);
    const taxRate = Math.max(0, parseFloat(invTaxRate.value) || 0);
    const tax = taxable * (taxRate / 100);
    const total = taxable + tax;
    return { cur, subtotal, discount, taxRate, tax, total };
  }

  function updateTotals() {
    const { cur, subtotal, tax, total } = getTotals();
    invSubtotalOut.textContent = `${cur}${subtotal.toFixed(2)}`;
    invTaxOut.textContent = `${cur}${tax.toFixed(2)}`;
    invTotalOut.textContent = `${cur}${total.toFixed(2)}`;
  }

  addInvItemBtn.addEventListener('click', () => {
    items.push({ desc: 'Consulting Services', qty: 1, price: 150 });
    renderItems();
    updateTotals();
  });

  [invCurrency, invTaxRate, invDiscount].forEach(el => {
    if (el) el.addEventListener('input', updateTotals);
    if (el) el.addEventListener('change', updateTotals);
  });

  downloadPdfInvoiceBtn.addEventListener('click', async () => {
    try {
      const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const { cur, subtotal, discount, taxRate, tax, total } = getTotals();
      const invNum = (document.getElementById('invNumber').value || 'INV-001').replace(/[^\x00-\x7F]/g, '');
      const issueDt = document.getElementById('invDate').value || '';
      const dueDt = document.getElementById('invDueDate').value || '';
      const fromLines = (document.getElementById('invFrom').value || '').replace(/[^\x00-\x7F]/g, '').split('\n');
      const toLines = (document.getElementById('invTo').value || '').replace(/[^\x00-\x7F]/g, '').split('\n');
      const notes = (document.getElementById('invNotes').value || '').replace(/[^\x00-\x7F]/g, '');

      // Header Banner
      page.drawRectangle({ x: 0, y: 760, width: 595.28, height: 82, color: rgb(0.19, 0.18, 0.51) });
      page.drawText('INVOICE', { x: 45, y: 792, size: 26, font: fontBold, color: rgb(1, 1, 1) });
      page.drawText(`#${invNum}`, { x: 430, y: 800, size: 13, font: fontBold, color: rgb(0.85, 0.87, 1) });
      page.drawText(`Issued: ${issueDt}  |  Due: ${dueDt}`, { x: 360, y: 778, size: 9.5, font: fontRegular, color: rgb(0.9, 0.9, 0.95) });

      // From / Bill To
      page.drawText('FROM:', { x: 45, y: 720, size: 10, font: fontBold, color: rgb(0.35, 0.35, 0.45) });
      fromLines.slice(0, 4).forEach((l, i) => {
        page.drawText(l, { x: 45, y: 703 - (i * 15), size: 10.5, font: i === 0 ? fontBold : fontRegular, color: rgb(0.1, 0.1, 0.15) });
      });

      page.drawText('BILL TO:', { x: 320, y: 720, size: 10, font: fontBold, color: rgb(0.35, 0.35, 0.45) });
      toLines.slice(0, 4).forEach((l, i) => {
        page.drawText(l, { x: 320, y: 703 - (i * 15), size: 10.5, font: i === 0 ? fontBold : fontRegular, color: rgb(0.1, 0.1, 0.15) });
      });

      // Table Header
      let y = 610;
      page.drawRectangle({ x: 45, y: y - 6, width: 505, height: 24, color: rgb(0.94, 0.95, 0.98) });
      page.drawText('DESCRIPTION', { x: 55, y: y + 2, size: 9.5, font: fontBold, color: rgb(0.2, 0.2, 0.3) });
      page.drawText('QTY', { x: 350, y: y + 2, size: 9.5, font: fontBold, color: rgb(0.2, 0.2, 0.3) });
      page.drawText('UNIT PRICE', { x: 405, y: y + 2, size: 9.5, font: fontBold, color: rgb(0.2, 0.2, 0.3) });
      page.drawText('AMOUNT', { x: 485, y: y + 2, size: 9.5, font: fontBold, color: rgb(0.2, 0.2, 0.3) });

      y -= 28;
      items.forEach(it => {
        const cleanDesc = (it.desc || 'Item').replace(/[^\x00-\x7F]/g, '').slice(0, 52);
        const lineTotal = it.qty * it.price;
        page.drawText(cleanDesc, { x: 55, y, size: 10, font: fontRegular, color: rgb(0.15, 0.15, 0.2) });
        page.drawText(String(it.qty), { x: 355, y, size: 10, font: fontRegular, color: rgb(0.15, 0.15, 0.2) });
        page.drawText(`${cur}${it.price.toFixed(2)}`, { x: 405, y, size: 10, font: fontRegular, color: rgb(0.15, 0.15, 0.2) });
        page.drawText(`${cur}${lineTotal.toFixed(2)}`, { x: 485, y, size: 10, font: fontBold, color: rgb(0.15, 0.15, 0.2) });
        y -= 22;
      });

      y -= 15;
      page.drawText(`Subtotal: ${cur}${subtotal.toFixed(2)}`, { x: 410, y, size: 10.5, font: fontRegular, color: rgb(0.25, 0.25, 0.3) });
      if (discount > 0) {
        y -= 18;
        page.drawText(`Discount: -${cur}${discount.toFixed(2)}`, { x: 410, y, size: 10.5, font: fontRegular, color: rgb(0.25, 0.25, 0.3) });
      }
      if (tax > 0) {
        y -= 18;
        page.drawText(`Tax (${taxRate}%): ${cur}${tax.toFixed(2)}`, { x: 410, y, size: 10.5, font: fontRegular, color: rgb(0.25, 0.25, 0.3) });
      }
      y -= 24;
      page.drawText(`TOTAL DUE: ${cur}${total.toFixed(2)}`, { x: 390, y, size: 13, font: fontBold, color: rgb(0.19, 0.18, 0.51) });

      if (notes) {
        page.drawText('Notes / Payment Instructions:', { x: 45, y: 120, size: 9.5, font: fontBold, color: rgb(0.35, 0.35, 0.45) });
        page.drawText(notes.slice(0, 95), { x: 45, y: 104, size: 9.5, font: fontRegular, color: rgb(0.3, 0.3, 0.35) });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${invNum || 'Invoice'}.pdf`;
      link.click();
      SmartToolzAI.showToast('PDF Invoice downloaded!');
    } catch (e) {
      SmartToolzAI.showToast('Error generating PDF invoice', 'error');
    }
  });

  renderItems();
  updateTotals();
});
