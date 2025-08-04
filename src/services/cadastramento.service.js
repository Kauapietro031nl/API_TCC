const cadastramentoRepository = require('../repositories/cadastramentoRepository');

const cadastrarPecas = async (pecas) => {
    try {
       
        const result = await cadastramentoRepository.cadastrarPecas(pecas);
        return { success: true, message: 'Peças cadastradas com sucesso!', data: result };
    } catch (error) {
        console.error('Erro no service:', error);
        throw error;
    }
};

module.exports = {
    cadastrarPecas
};