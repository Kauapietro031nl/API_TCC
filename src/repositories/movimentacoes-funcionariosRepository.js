const pool = require('../config/db');

const getAllMovimentacoes = async () => {
  try {
    const query = 'SELECT * FROM movimentacoes ORDER BY data_movimentacao DESC';
    const [results] = await pool.query(query);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllMovimentacoes
};
