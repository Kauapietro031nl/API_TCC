const relatorioService = require('../services/relatorio.service');

const getRelatorio = async (req, res) => {
  const tipo = req.params.tipo || 'todos';
  try {
    const dados = await relatorioService.getRelatorio(tipo);
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar os dados.' });
  }
};

const downloadXLS = async (req, res) => {
  const tipo = req.params.tipo || 'todos';
  try {
    const filePath = await relatorioService.gerarXLS(tipo);
    res.download(filePath, 'relatorio.xlsx', () => {
      const fs = require('fs');
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    res.status(500).send('Erro ao gerar o XLS.');
  }
};

const downloadPDF = async (req, res) => {
  const tipo = req.params.tipo || 'todos';
  try {
    const stream = await relatorioService.gerarPDF(tipo, res);
    return stream;
  } catch (err) {
    res.status(500).send('Erro ao gerar o PDF.');
  }
};


const gerarRelatorioMovimentacoesService = require('../services/movimentacoesRelatorio.service');

const downloadMovimentacoesPDF = async (req, res) => {
  try {
    const { body } = req;
    const buffer = await gerarRelatorioMovimentacoesService.gerarPDF(body);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio_movimentacoes.pdf');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar PDF de movimentações.');
  }
};

const downloadMovimentacoesXLS = async (req, res) => {
  try {
    const { body } = req;
    const buffer = await gerarRelatorioMovimentacoesService.gerarXLS(body);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio_movimentacoes.xlsx');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar Excel de movimentações.');
  }
};

module.exports = {
  getRelatorio,
  downloadXLS,
  downloadPDF,
  downloadMovimentacoesPDF,
  downloadMovimentacoesXLS
};

