const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cadastramentoController = require('../controllers/cadastramentoController');
const estoqueController = require('../controllers/estoqueController');
const relatorioController = require('../controllers/relatorioController');
const loginController = require('../controllers/loginController');
const dashboardRoutes = require('../routes/dashboardRoutes');
const funcionariosRoutes = require('./funcionariosRoutes');

//cadastro de usuarios
router.post('/cadastrar', authController.register);
// cadastro de peças 
router.post('/cadastrar-pecas', cadastramentoController.cadastrar);
//rota de dados
router.get('/dados', estoqueController.listar);
router.put('/dados/:codigo', estoqueController.atualizar);
router.delete('/dados/:codigo', estoqueController.deletar);
//rotas de relatorios
router.get('/relatorio/:tipo', relatorioController.getRelatorio);
router.get('/download/xls/:tipo', relatorioController.downloadXLS);
router.get('/download/pdf/:tipo', relatorioController.downloadPDF);
//Rotas de login

router.post('/login', loginController.login);
//rotas do dashboard
router.use(dashboardRoutes);
//rotas de funcionarios 
router.use('/api/funcionarios', funcionariosRoutes);

module.exports = router;