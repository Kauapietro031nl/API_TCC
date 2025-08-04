const express = require('express');
const router = express.Router();

const { verificarToken } = require('../controllers/recaptcha.controller');

router.post('/verificar', verificarToken);

module.exports = router;
