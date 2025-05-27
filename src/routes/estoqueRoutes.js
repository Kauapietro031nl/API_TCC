const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.get('/dados', estoqueController.listar);
router.put('/dados/:codigo', estoqueController.atualizar);
router.delete('/dados/:codigo', estoqueController.deletar);

module.exports = router;
