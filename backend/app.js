const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const candidatoRoutes = require('./Routes/candidatoRoutes');
app.use('/candidatos', candidatoRoutes);

// ... resto do código
