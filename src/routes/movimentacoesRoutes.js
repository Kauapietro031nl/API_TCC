const express = require('express');
const movimentacoesController = require('../controllers/movimentacoesController');
const router = express.Router();

// Rota para buscar produto
router.get('/produtos/:codigo', movimentacoesController.buscarProduto);

// Rota para registrar movimentação
router.post('/movimentacao', movimentacoesController.registrarMovimentacao);

module.exports = router;