const pool = require('../config/db');

const cadastrarPecas = async (pecas) => {
  const query = 'INSERT INTO estoque (codigo, nome, quantidade, descricao, localizacao, valor) VALUES ?';
  const values = pecas.map(peca => [
    peca.codigo,
    peca.nome,
    peca.quantidade,
    peca.descricao,
    peca.localizacao,
    peca.valor
  ]);
  try {
    const [result] = await pool.query(query, [values]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  cadastrarPecas
};
