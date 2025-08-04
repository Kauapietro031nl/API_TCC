const { verificarScore } = require('../services/recaptcha.service');

async function verificarToken(req, res) {
    const token = req.body.recaptchaToken;
    const ip = req.ip;
    const expectedAction = req.headers['x-recaptcha-action']; 

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token ausente' });
    }

    try {
        const resultado = await verificarScore(token, ip);

        if (!resultado.success || resultado.score < 0.5) {
            return res.status(401).json({
                success: false,
                score: resultado.score || 0,
                reasons: resultado['error-codes'],
                message: 'Falha no recaptcha - comportamento suspeito detectado'
            });
        }

        if (expectedAction && resultado.action !== expectedAction) {
            return res.status(403).json({
                success: false,
                message: `Ação inválida detectada. Esperado: ${expectedAction}, recebido: ${resultado.action}`
            });
        }

        res.json({
            success: true,
            score: resultado.score,
            action: resultado.action,
            message: 'Verificado com sucesso'
        });

    } catch (erro) {
        console.error('Erro na verificação do reCAPTCHA:', erro);
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno na verificação de segurança' 
        });
    }
}


module.exports = { verificarToken };