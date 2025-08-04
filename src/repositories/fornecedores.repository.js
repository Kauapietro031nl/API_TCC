const db = require('../config/db');

async function buscarFornecedoresComProdutos() {
    const [rows] = await db.query(`
        SELECT 
            f.id AS fornecedor_id, f.nome_empresa, f.cnpj, f.email, f.celular,
            p.id AS produto_id, p.codigo_produto, p.nome_produto, p.descricao, p.foto_url, p.valor
        FROM fornecedores f
        LEFT JOIN produtos p ON f.id = p.id_fornecedor
        WHERE f.ativo = 1 AND (p.ativo = 1 OR p.id IS NULL)
    `);

    return rows;
}

module.exports = {
    buscarFornecedoresComProdutos,
};
