const pool = require('../config/db');

const listarPecas = async () => {
  const [rows] = await pool.query('SELECT * FROM estoque');
  return rows;
};

const atualizarPeca = async (codigo, dados) => {
  const { nome, quantidade, descricao, localizacao, valor } = dados;
  const sql = `
    UPDATE estoque SET 
      nome = ?, 
      quantidade = ?, 
      descricao = ?, 
      localizacao = ?, 
      valor = ?
    WHERE codigo = ?`;

  const [result] = await pool.query(sql, [nome, quantidade, descricao, localizacao, valor, codigo]);
  return result;
};

const deletarPeca = async (codigo) => {
  const sql = 'DELETE FROM estoque WHERE codigo = ?';
  const [result] = await pool.query(sql, [codigo]);
  return result;
};

module.exports = {
  listarPecas,
  atualizarPeca,
  deletarPeca
};
