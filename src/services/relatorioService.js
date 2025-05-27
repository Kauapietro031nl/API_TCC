const relatorioRepository = require('../repositories/relatorioRepository');
const xlsx = require('xlsx');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const getRelatorio = async (tipo) => {
  return await relatorioRepository.buscarPorTipo(tipo);
};

const gerarXLS = async (tipo) => {
  const dados = await getRelatorio(tipo);
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(dados);
  xlsx.utils.book_append_sheet(wb, ws, 'Estoque');
  const filePath = path.join(__dirname, '../../relatorio.xlsx');
  xlsx.writeFile(wb, filePath);
  return filePath;
};

const gerarPDF = async (tipo, res) => {
  const dados = await getRelatorio(tipo);
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
  doc.pipe(res);

  doc.fontSize(18).text('Relatório de Estoque', { align: 'center' });
  doc.moveDown();

  const table = {
    headers: ['Código', 'Nome', 'Quantidade', 'Descrição', 'Localização', 'Valor'],
    rows: dados.map(item => [item.codigo, item.nome, item.quantidade, item.descricao, item.localizacao, item.valor])
  };

  const columnWidth = [80, 120, 80, 180, 120, 80];
  const rowHeight = 20;
  const headerHeight = 25;

  doc.fontSize(12).font('Helvetica-Bold');
  for (let i = 0; i < table.headers.length; i++) {
    doc.rect(50 + i * columnWidth[i], doc.y, columnWidth[i], headerHeight).stroke();
    doc.text(table.headers[i], 50 + i * columnWidth[i] + 5, doc.y + 5);
  }
  doc.moveDown();

  doc.fontSize(12).font('Helvetica');
  table.rows.forEach(row => {
    for (let i = 0; i < row.length; i++) {
      doc.rect(50 + i * columnWidth[i], doc.y, columnWidth[i], rowHeight).stroke();
      doc.text(row[i], 50 + i * columnWidth[i] + 5, doc.y + 5);
    }
    doc.moveDown();
  });

  doc.end();
};

module.exports = {
  getRelatorio,
  gerarXLS,
  gerarPDF,
};
