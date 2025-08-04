const loginService = require('../services/login.service');
const { verificarScore } = require('../services/recaptcha.service');

exports.login = async (req, res) => {
  const { email, senha, recaptchaToken } = req.body;
  
  try {

    const recaptchaResult = await verificarScore(
      recaptchaToken, 
      req.ip, 
      req.headers['x-recaptcha-action']
    );
    
    if (!recaptchaResult.success) {
      return res.status(401).json({ 
        success: false, 
        message: 'Falha na verificação de segurança. Tente novamente.' 
      });
    }
    
    loginService.login(email, senha, (err, result) => {
      if (err) {
        console.error('Erro no serviço de login:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Erro no servidor.' 
        });
      }
      res.status(result.status).json(result);
    });
  } catch (err) {
    console.error('Erro no controller de login:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Erro no servidor.' 
    });
  }
};