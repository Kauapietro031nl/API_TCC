const cadastramentoService = require('../services/cadastramentoService');

const cadastrar = async (req, res, next) => {
    try {
        console.log('Dados recebidos:', req.body);
        const response = await cadastramentoService.cadastrarPecas(req.body.pecas);
        res.status(200).json(response);
    } catch (error) {
        console.error('Erro no controller:', error);
        next(error);
    }
};

module.exports = {
    cadastrar
};