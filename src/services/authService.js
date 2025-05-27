const bcrypt = require('bcrypt');
const authRepository = require('../repositories/authRepository');

const registerUser = async (nome, email, senha) => {
  console.log('Dados no service:', { nome, email, senha }); 
  
  if (!nome || !email || !senha) {
    console.log('Campos faltando:', { nome, email, senha });
    throw { status: 400, message: 'Todos os campos são obrigatórios.' };
  }

  try {
    const hashedSenha = await bcrypt.hash(senha, 8);
    await authRepository.createUser(nome, email, hashedSenha);
    return { message: 'Cadastro realizado com sucesso!' };
  } catch (error) {
    console.error('Erro no service:', error);
    throw { 
      status: 500, 
      message: 'Erro ao realizar o cadastro',
      details: error.message 
    };
  }
};

module.exports = { registerUser };