const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const routes = require('./src/routes/routes');
const movimentacoesRoutes = require('./src/routes/movimentacoes.routes.js');
const loginRoutes = require('./src/routes/loginFuncionarios.routes.js');
const movimentacoesFuncionariosRoutes = require('./src/routes/movimentacoesFuncionarios.routes.js');
const recaptchaRoutes = require('./src/routes/recaptcha.routes');
const rateLimit = require('express-rate-limit');
const fornecedoresRoutes = require('./src/routes/fornecedores.routes');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Muitas requisições deste IP. Tente novamente mais tarde.'
});

app.use(cors());
app.use(express.json());
app.use(limiter); 

app.use('/auth', loginRoutes); 
app.use('/', routes); 
app.use('/api', movimentacoesRoutes);
app.use('/api', movimentacoesFuncionariosRoutes);
app.use('/api/recaptcha', recaptchaRoutes);
app.use('/api', fornecedoresRoutes);

app.use(errorMiddleware);

module.exports = app;