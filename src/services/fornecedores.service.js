const repository = require('../repositories/fornecedores.repository');

async function listarFornecedores() {
    const dados = await repository.buscarFornecedoresComProdutos();

    const fornecedoresMap = {};

    dados.forEach(row => {
        if (!fornecedoresMap[row.fornecedor_id]) {
            fornecedoresMap[row.fornecedor_id] = {
                id: row.fornecedor_id,
                name: row.nome_empresa,
                cnpj: row.cnpj,
                email: row.email,
                phone: row.celular,
                products: [],
            };
        }

        if (row.produto_id) {
            fornecedoresMap[row.fornecedor_id].products.push({
                id: row.produto_id,
                code: row.codigo_produto,
                name: row.nome_produto,
                description: row.descricao,
                image: row.foto_url,
                price: parseFloat(row.valor),
            });
        }
    });

    return Object.values(fornecedoresMap);
}

module.exports = {
    listarFornecedores,
};
