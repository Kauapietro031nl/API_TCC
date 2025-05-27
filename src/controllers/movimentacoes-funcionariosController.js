const movimentacoesService = require('../services/movimentacoes-funcionariosService');

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
