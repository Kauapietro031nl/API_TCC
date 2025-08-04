const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../repositories/loginRepository');

const failedAttempts = {};
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 30 * 1000;

const login = async (email, senha, callback) => {
  try {

    if (failedAttempts[email] && failedAttempts[email].blockedUntil > Date.now()) {
      const remainingTime = Math.ceil((failedAttempts[email].blockedUntil - Date.now()) / 1000);
      return callback(null, {
        status: 403,
        success: false,
        message: `Muitas tentativas falhadas. Tente novamente em ${remainingTime} segundos.`,
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return callback(null, { 
        status: 401,
        success: false, 
        message: 'Credenciais inválidas.' 
      });
    }

    const match = await bcrypt.compare(senha, user.senha);

    if (match) {
      // Resetar tentativas falhadas
      delete failedAttempts[email];
      return callback(null, {
        status: 200,
        success: true,
        message: 'Login realizado com sucesso!',
        name: user.nome,
      });
    } else {
    
      failedAttempts[email] = failedAttempts[email] || { attempts: 0, blockedUntil: null };
      failedAttempts[email].attempts++;

      if (failedAttempts[email].attempts >= MAX_ATTEMPTS) {
        failedAttempts[email].blockedUntil = Date.now() + LOCK_TIME;
        return callback(null, {
          status: 403,
          success: false,
          message: 'Muitas tentativas falhadas. Você está bloqueado por 30 segundos.',
        });
      }

      return callback(null, {
        status: 401,
        success: false,
        message: 'Credenciais inválidas.',
    
      });
    }
  } catch (err) {
    console.error('Erro no serviço de login:', err);
    return callback(err);
  }
};

module.exports = { login };