const db = require('../config/db');

const buscarPorTipo = (tipo) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT codigo, nome, quantidade, descricao, localizacao, valor FROM estoque';

    if (tipo === 'baixa') {
      query += ' WHERE quantidade < 100';
    } else if (tipo === 'excesso') {
      query += ' WHERE quantidade > 1000';
    }

    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  buscarPorTipo,
};
