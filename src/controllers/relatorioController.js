const relatorioService = require('../services/relatorioService');

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

module.exports = {
  getRelatorio,
  downloadXLS,
  downloadPDF,
};
