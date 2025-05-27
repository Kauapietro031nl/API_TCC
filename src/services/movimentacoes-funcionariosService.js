const movimentacoesRepository = require('../repositories/movimentacoes-funcionariosRepository');

const fetchMovimentacoes = async () => {
    try {
        const movimentacoes = await movimentacoesRepository.getAllMovimentacoes();
        return movimentacoes;
    } catch (error) {
        throw new Error('Erro ao buscar movimentações');
    }
};

module.exports = {
    fetchMovimentacoes
};
