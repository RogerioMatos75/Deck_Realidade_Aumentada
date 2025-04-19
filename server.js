const express = require('express');
const path = require('path');
const uploadRouter = require('./api/upload');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/marker', express.static(path.join(__dirname, 'marker')));

// Rotas da API
app.use('/api', uploadRouter);

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'deck-admin/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});