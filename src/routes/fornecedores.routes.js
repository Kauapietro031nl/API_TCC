const express = require('express');
const router = express.Router();
const controller = require('../controllers/fornecedores.controller');

router.get('/fornecedores', controller.getFornecedores);

module.exports = router;
