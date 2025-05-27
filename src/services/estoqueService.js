const estoqueRepository = require('../repositories/estoqueRepository');

const listarEstoque = async () => {
  try {
    return await estoqueRepository.listarPecas();
  } catch (error) {
    throw error;
  }
};

const atualizarEstoque = async (codigo, dados) => {
  try {
    return await estoqueRepository.atualizarPeca(codigo, dados);
  } catch (error) {
    throw error;
  }
};

const deletarEstoque = async (codigo) => {
  try {
    return await estoqueRepository.deletarPeca(codigo);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listarEstoque,
  atualizarEstoque,
  deletarEstoque
};