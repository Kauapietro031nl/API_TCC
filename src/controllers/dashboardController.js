const dashboardService = require('../services/dashboardService');

async function estatisticas(req, res) {
  try {
    const dados = await dashboardService.getEstatisticas();
    res.json(dados);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
}

module.exports = { estatisticas };
