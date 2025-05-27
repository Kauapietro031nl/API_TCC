const movimentacoesService = require('../services/movimentacoesService');

exports.registrarMovimentacao = async (req, res, next) => {
    try {
        const { funcionarioEmail, produtoCodigo, quantidade, tipoMovimentacao, observacao } = req.body;

        if (!funcionarioEmail || !produtoCodigo || !quantidade || !tipoMovimentacao) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const movimentacao = await movimentacoesService.registrarMovimentacao({
            funcionarioEmail,
            produtoCodigo,
            quantidade,
            tipoMovimentacao,
            observacao
        });

        return res.status(201).json({ success: true, movimentacao });
    } catch (error) {
        next(error);
    }
};

exports.buscarProduto = async (req, res, next) => {
    try {
        const { codigo } = req.params;

        if (!codigo) {
            return res.status(400).json({ error: 'Código do produto é obrigatório.' });
        }

        const produto = await movimentacoesService.buscarProdutoPorCodigo(codigo);

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        return res.json({ produto });
    } catch (error) {
        next(error);
    }
};
