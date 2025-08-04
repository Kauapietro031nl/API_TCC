const express = require('express');
const router = express.Router();
const movimentacoesController = require('../controllers/movimentacoesFuncionarios.controller');

router.get('/movimentacoes-funcionarios', movimentacoesController.getMovimentacoes);

module.exports = router;
