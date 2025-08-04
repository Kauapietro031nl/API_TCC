const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

const gerarPDF = async (data) => {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(16).text(data.title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(data.subtitle, { align: 'center' });
  doc.moveDown();

  const headers = data.columns.map(col => col.header);
  const rows = data.rows.map(row => data.columns.map(col => row[col.dataKey]));

  // Cabeçalhos
  doc.font('Helvetica-Bold');
  headers.forEach((header, i) => {
    doc.text(header, 50 + i * 70, doc.y, { continued: i !== headers.length - 1 });
  });
  doc.moveDown();

  // Dados
  doc.font('Helvetica');
  rows.forEach(row => {
    row.forEach((val, i) => {
      doc.text(val, 50 + i * 70, doc.y, { continued: i !== row.length - 1 });
    });
    doc.moveDown();
  });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on('error', reject);
  });
};

const gerarXLS = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(data.worksheet || 'Movimentações');

  sheet.addRow([data.title]);
  sheet.addRow([data.subtitle]);
  sheet.addRow([]);

  sheet.addRow(data.headers);

  data.rows.forEach(row => {
    sheet.addRow(row);
  });

  return await workbook.xlsx.writeBuffer();
};

module.exports = {
  gerarPDF,
  gerarXLS
};
