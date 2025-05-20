import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import MedicoRoutes from './routes/medicoRoutes';

// Configuração do dotenv
dotenv.config();
const app = express();

app.use('/medico', MedicoRoutes);

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});