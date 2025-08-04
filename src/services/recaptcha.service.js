const fetch = require('node-fetch');
const { secretKey } = require('../config/recaptcha');
const { salvarLogRecaptcha } = require('../repositories/recaptcha.repository');

async function verificarScore(token, ip, expectedAction = null) {
    
    const resposta = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${token}&remoteip=${ip}`
    });

    const dados = await resposta.json();

    await salvarLogRecaptcha({
        ip,
        score: dados.score || 0,
        sucesso: dados.success || false,
        action: dados.action || null
    });

    if (expectedAction && dados.action !== expectedAction) {
        return {
            success: false,
            message: `Ação inválida. Esperado: ${expectedAction}, recebido: ${dados.action}`
        };
    }
    
    if (dados.score < 0.5) {
        return {
            success: false,
            message: 'Comportamento suspeito detectado'
        };
    }

    return dados;
}

module.exports = { verificarScore };