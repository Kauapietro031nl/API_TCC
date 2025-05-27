const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../repositories/loginRepository');

let failedAttempts = {};
const LOCK_TIME = 30 * 1000; // 30 segundos

const login = (email, senha, callback) => {
  if (failedAttempts[email] && failedAttempts[email].blockedUntil > Date.now()) {
    const remainingTime = Math.ceil((failedAttempts[email].blockedUntil - Date.now()) / 1000);
    return callback(null, {
      status: 403,
      success: false,
      message: `Muitas tentativas falhadas. Tente novamente em ${remainingTime} segundos.`,
    });
  }

  findUserByEmail(email, (err, results) => {
    if (err) return callback(err);

    if (results.length === 0) {
      return callback(null, { status: 404, success: false, message: 'Usuário não encontrado.' });
    }

    const user = results[0];

    bcrypt.compare(senha, user.senha, (err, match) => {
      if (err) return callback(err);

      if (match) {
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

        if (failedAttempts[email].attempts >= 3) {
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
          message: `Senha incorreta. Tentativas restantes: ${3 - failedAttempts[email].attempts}`,
        });
      }
    });
  });
};

module.exports = { login };
