const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const app = express();

// Configura o JSON Server
const router = jsonServer.router('db/db.json');
const middlewares = jsonServer.defaults();

// Configura middlewares
app.use(middlewares);
app.use('/api', router);

// Servir arquivos estáticos do diretório public
app.use(express.static(path.join(__dirname, 'public')));

// Redireciona todas as outras rotas para index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Define a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
