const loginService = require('../services/loginService');

exports.login = (req, res) => {
  const { email, senha } = req.body;

  loginService.login(email, senha, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    res.status(result.status).json(result);
  });
};
