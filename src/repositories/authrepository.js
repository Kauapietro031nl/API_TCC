const db = require('../config/db');

const createUser = (nome, email, hashedSenha) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO login (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [nome, email, hashedSenha], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createUser
};
