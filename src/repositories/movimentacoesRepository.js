const pool = require('../config/db');

const buscarProdutoPorCodigo = async (codigo) => {
  try {
    const [results] = await pool.query('SELECT * FROM estoque WHERE codigo = ?', [codigo]);
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

const atualizarQuantidadeProduto = async (produtoId, novaQuantidade) => {
  try {
    await pool.query('UPDATE estoque SET quantidade = ? WHERE id = ?', [novaQuantidade, produtoId]);
  } catch (err) {
    throw err;
  }
};

const inserirMovimentacao = async ({ produto, funcionarioEmail, quantidade, tipoMovimentacao, observacao }) => {
  try {
    const query = `
      INSERT INTO movimentacoes (
        produto_id, produto_codigo, produto_nome, produto_descricao,
        quantidade, funcionario_email, observacao, tipo, data_movimentacao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      produto.id,
      produto.codigo,
      produto.nome,
      produto.descricao,
      quantidade,
      funcionarioEmail,
      observacao,
      tipoMovimentacao,
      new Date()
    ];
    const [result] = await pool.query(query, params);
    return { id: result.insertId };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  buscarProdutoPorCodigo,
  atualizarQuantidadeProduto,
  inserirMovimentacao
};
