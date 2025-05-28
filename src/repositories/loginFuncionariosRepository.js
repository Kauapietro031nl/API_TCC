const pool = require('../config/db');

const findByEmail = async (email) => {
  try {
    const [results] = await pool.query(
      'SELECT id, nome, email, senha FROM funcionarios WHERE email = ?',
      [email]
    );
    return results[0] || null;
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    throw new Error('Erro ao buscar usuário');
  }
};

module.exports = {
  findByEmail,
};
