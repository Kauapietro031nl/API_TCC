const service = require('../services/fornecedores.service');

async function getFornecedores(req, res) {
    try {
        const fornecedores = await service.listarFornecedores();
        res.status(200).json({ success: true, fornecedores });
    } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
}

module.exports = {
    getFornecedores,
};
