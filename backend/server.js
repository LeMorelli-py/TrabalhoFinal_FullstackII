const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const port = process.env.PORT || 4000; // Permite configuração via .env


// Configuração do dotenv
dotenv.config();

// Importação das rotas
const candidatoRoutes = require('./Routes/candidatoRoutes'); 
const vagaRoutes = require('./Routes/vagaRoutes'); 
const inscricaoRoutes = require('./Routes/inscricaoRoutes'); 

// Importação do middleware de autenticação
/*const { verificarAutenticacao } = require('./middleware/autenticacao');*/ 

const app = express();
app.use(cors());

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Substitua pelo domínio do seu frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'] // Adicione outros cabeçalhos se necessário
}));

app.use(express.json());


// Rotas que requerem autenticação
app.use('/candidatos', candidatoRoutes);
app.use('/vagas', vagaRoutes);
app.use('/inscricoes', inscricaoRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro
    res.status(500).json({ message: 'Algo deu errado!', error: err.message }); // Resposta JSON
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Executando na porta ${port}!`);
});