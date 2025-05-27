const db = require('../config/db');

function findByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, nome, email, senha FROM funcionarios WHERE email = ?', 
      [email], 
      (err, results) => {
        if (err) {
          console.error('Erro ao buscar usuário:', err);
          return reject(new Error('Erro ao buscar usuário'));
        }
        resolve(results[0] || null);
      }
    );
  });
}

module.exports = {
  findByEmail,
};