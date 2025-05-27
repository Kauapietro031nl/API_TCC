const movimentacoesService = require('../services/movimentacoesFuncionariosService');

const getMovimentacoes = async (req, res) => {
    try {
        const dados = await movimentacoesService.fetchMovimentacoes();
        res.json(dados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar movimentações' });
    }
};

module.exports = {
    getMovimentacoes
};
