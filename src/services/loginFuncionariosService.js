const bcrypt = require('bcrypt');
const repository = require('../repositories/loginFuncionariosRepositories');

module.exports = {
  async login(email, senha) {
    if (!email || !senha) {
      throw new Error('Campos obrigatórios faltando');
    }

    const user = await repository.findByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      throw new Error('Credenciais inválidas');
    }

    delete user.senha;
    return user;
  }
};