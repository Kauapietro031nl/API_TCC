const pool = require('../config/db');

const getTotalValor = async () => {
  try {
    const [rows] = await pool.query("SELECT SUM(valor * quantidade) AS total_valor FROM estoque");
    return rows[0].total_valor || 0;
  } catch (err) {
    throw err;
  }
};

const getTotalPecas = async () => {
  try {
    const [rows] = await pool.query("SELECT SUM(quantidade) AS total_pecas FROM estoque");
    return rows[0].total_pecas || 0;
  } catch (err) {
    throw err;
  }
};

const getMediaValor = async () => {
  try {
    const [rows] = await pool.query("SELECT AVG(valor) AS media_valor FROM estoque");
    return rows[0].media_valor || 0;
  } catch (err) {
    throw err;
  }
};

module.exports = { getTotalValor, getTotalPecas, getMediaValor };
