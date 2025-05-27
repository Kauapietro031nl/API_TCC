const db = require('../config/db');

const getTotalValor = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT SUM(valor * quantidade) AS total_valor FROM estoque", (err, result) => {
      if (err) return reject(err);
      resolve(result[0].total_valor || 0);
    });
  });
};

const getTotalPecas = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT SUM(quantidade) AS total_pecas FROM estoque", (err, result) => {
      if (err) return reject(err);
      resolve(result[0].total_pecas || 0);
    });
  });
};

const getMediaValor = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT AVG(valor) AS media_valor FROM estoque", (err, result) => {
      if (err) return reject(err);
      resolve(result[0].media_valor || 0);
    });
  });
};

module.exports = { getTotalValor, getTotalPecas, getMediaValor };
