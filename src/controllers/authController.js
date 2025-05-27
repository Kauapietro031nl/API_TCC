const authService = require('../services/authService');

const register = async (req, res, next) => {
  console.log('Dados recebidos:', req.body); 
  
  const { nome, email, senha } = req.body;

  try {
    const response = await authService.registerUser(nome, email, senha);
    res.status(200).json(response);
  } catch (error) {
    console.error('Erro no controller:', error); 
    next(error);
  }
};

module.exports = { register };