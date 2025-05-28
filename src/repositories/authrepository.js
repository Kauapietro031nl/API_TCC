const pool = require('../config/db');  

const createUser = async (nome, email, hashedSenha) => {
  const query = 'INSERT INTO login (nome, email, senha) VALUES (?, ?, ?)';
  try {
    const [result] = await pool.query(query, [nome, email, hashedSenha]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser
};
