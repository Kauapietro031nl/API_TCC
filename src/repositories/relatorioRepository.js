const pool = require('../config/db');

const buscarPorTipo = async (tipo) => {
  try {
    let query = 'SELECT codigo, nome, quantidade, descricao, localizacao, valor FROM estoque';

    if (tipo === 'baixa') {
      query += ' WHERE quantidade < 100';
    } else if (tipo === 'excesso') {
      query += ' WHERE quantidade > 1000';
    }

    const [results] = await pool.query(query);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  buscarPorTipo,
};
