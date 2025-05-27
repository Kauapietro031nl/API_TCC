const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const routes = require('./src/routes/routes');
const movimentacoesRoutes = require('./src/routes/movimentacoesRoutes');
const loginRoutes = require('./src/routes/loginFuncionariosRoutes');
const movimentacoesFuncionariosRoutes = require('./src/routes/movimentacoesfuncionariosRoutes');


const app = express();

app.use(cors());
app.use(express.json());


app.use('/auth', loginRoutes); 

app.use('/', routes); 
app.use('/api', movimentacoesRoutes);

app.use('/api', movimentacoesFuncionariosRoutes);

app.use(errorMiddleware);

module.exports = app;