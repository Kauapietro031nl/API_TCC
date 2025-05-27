const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginFuncionariosController');

router.post('/', controller.login);

module.exports = router;