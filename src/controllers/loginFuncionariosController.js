const service = require('../services/loginFuncionariosService');

module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({ 
          success: false, 
          message: 'Por favor, preencha todos os campos' 
        });
      }

      const user = await service.login(email, senha);
      
      return res.json({ 
        success: true,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email
        }
      });
      
    } catch (err) {
   
      
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciais inválidas' 
      });
    }
  },
};