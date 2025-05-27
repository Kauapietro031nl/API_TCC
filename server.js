const http = require('http');
const app = require('./app');

let port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});

process.on('SIGINT', () => {
  console.log('Encerrando servidor...');
  server.close(() => {
    console.log('Servidor fechado.');
    process.exit(0);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Porta ${port} em uso. Tentando a porta 3002...`);
    port = 3002;
    server.listen(port);
  } else {
    console.error('Erro no servidor:', err);
  }
});
