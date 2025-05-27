const dashboardRepository = require('../repositories/dashboardRepository');

async function getEstatisticas() {
  const total_valor = await dashboardRepository.getTotalValor();
  const total_pecas = await dashboardRepository.getTotalPecas();
  const media_valor = await dashboardRepository.getMediaValor();

  return { total_valor, total_pecas, media_valor };
}

module.exports = { getEstatisticas };
