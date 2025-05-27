const estoqueService = require('../services/estoqueService');

const listar = async (req, res, next) => {
  try {
    const pecas = await estoqueService.listarEstoque();
    res.status(200).json(pecas);
  } catch (error) {
    next(error);
  }
};

const atualizar = async (req, res, next) => {
  try {
    const { codigo } = req.params;
    const dados = req.body;
    await estoqueService.atualizarEstoque(codigo, dados);
    res.status(200).json({ message: 'Peça atualizada com sucesso' });
  } catch (error) {
    next(error);
  }
};

const deletar = async (req, res, next) => {
  try {
    const { codigo } = req.params;
    await estoqueService.deletarEstoque(codigo);
    res.status(200).json({ message: 'Peça removida com sucesso' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listar,
  atualizar,
  deletar
};