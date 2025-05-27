const movimentacoesRepository = require('../repositories/movimentacoesRepository');

exports.registrarMovimentacao = async ({ funcionarioEmail, produtoCodigo, quantidade, tipoMovimentacao, observacao }) => {
    const produto = await movimentacoesRepository.buscarProdutoPorCodigo(produtoCodigo);

    if (!produto) {
        throw new Error('Produto não encontrado.');
    }

    if (tipoMovimentacao === 'saida' && quantidade > produto.quantidade) {
        throw new Error('Quantidade insuficiente em estoque.');
    }

    let novaQuantidade = produto.quantidade;
    if (tipoMovimentacao === 'entrada') {
        novaQuantidade += quantidade;
    } else if (tipoMovimentacao === 'saida') {
        novaQuantidade -= quantidade;
    }

    await movimentacoesRepository.atualizarQuantidadeProduto(produto.id, novaQuantidade);

    const result = await movimentacoesRepository.inserirMovimentacao({
        produto,
        funcionarioEmail,
        quantidade,
        tipoMovimentacao,
        observacao
    });

    return result;
};

exports.buscarProdutoPorCodigo = async (codigo) => {
    return movimentacoesRepository.buscarProdutoPorCodigo(codigo);
};
