const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const cadastramentoController = require('../controllers/cadastramento.controller');
const estoqueController = require('../controllers/estoque.controller');
const relatorioController = require('../controllers/relatorio.controller');
const loginController = require('../controllers/login.controller');
const dashboardRoutes = require('../routes/dashboard.routes');
const funcionariosRoutes = require('./funcionarios.routes');

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

router.post('/api/generate-pdf', relatorioController.downloadMovimentacoesPDF);
router.post('/api/generate-excel', relatorioController.downloadMovimentacoesXLS);

module.exports = router;