const db = require('../config/db');

function findAll(searchTerm) {
  return new Promise((resolve, reject) => {
    const query = searchTerm
      ? 'SELECT id, nome, email FROM funcionarios WHERE nome LIKE ?'
      : 'SELECT id, nome, email FROM funcionarios';

    const values = searchTerm ? [`%${searchTerm}%`] : [];

    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT id, nome, email FROM funcionarios WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}

function create({ nome, email, senha }) {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO funcionarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha],
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

function update(id, { nome, email, senha }) {
  return new Promise((resolve, reject) => {
    const query = senha
      ? 'UPDATE funcionarios SET nome = ?, email = ?, senha = ? WHERE id = ?'
      : 'UPDATE funcionarios SET nome = ?, email = ? WHERE id = ?';

    const values = senha
      ? [nome, email, senha, id]
      : [nome, email, id];

    db.query(query, values, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM funcionarios WHERE id = ?', [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
