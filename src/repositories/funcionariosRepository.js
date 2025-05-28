const pool = require('../config/db');

const findAll = async (searchTerm) => {
  const query = searchTerm
    ? 'SELECT id, nome, email FROM funcionarios WHERE nome LIKE ?'
    : 'SELECT id, nome, email FROM funcionarios';

  const values = searchTerm ? [`%${searchTerm}%`] : [];

  try {
    const [results] = await pool.query(query, values);
    return results;
  } catch (err) {
    throw err;
  }
};

const findById = async (id) => {
  try {
    const [results] = await pool.query('SELECT id, nome, email FROM funcionarios WHERE id = ?', [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

const create = async ({ nome, email, senha }) => {
  try {
    const query = 'INSERT INTO funcionarios (nome, email, senha) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [nome, email, senha]);
    return result;
  } catch (err) {
    throw err;
  }
};

const update = async (id, { nome, email, senha }) => {
  try {
    let query, values;

    if (senha) {
      query = 'UPDATE funcionarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
      values = [nome, email, senha, id];
    } else {
      query = 'UPDATE funcionarios SET nome = ?, email = ? WHERE id = ?';
      values = [nome, email, id];
    }

    await pool.query(query, values);
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    await pool.query('DELETE FROM funcionarios WHERE id = ?', [id]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
