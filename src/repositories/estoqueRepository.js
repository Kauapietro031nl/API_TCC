const db = require('../config/db');

const listarPecas = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM estoque';
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const atualizarPeca = (codigo, dados) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE estoque SET ? WHERE codigo = ?';
    db.query(query, [dados, codigo], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deletarPeca = (codigo) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM estoque WHERE codigo = ?';
    db.query(query, [codigo], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  listarPecas,
  atualizarPeca,
  deletarPeca
};