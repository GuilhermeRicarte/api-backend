import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import MedicoRoutes from './routes/MedicoRoutes';
import videoCallRoutes from './routes/videoCallRoutes';
import cors from 'cors';
import prontuarioRoutes from './routes/ProntuarioRoutes';
import agendamentoRoutes from './routes/AgendamentoRoutes';

// Configuração do dotenv
dotenv.config();
const app = express();

// Chamada de video
app.use('/api', videoCallRoutes);

// Middleware
app.use(bodyParser.json());

//Cors
app.use(cors());

// Rotas
app.use('/api', authRoutes);
app.use('/api', MedicoRoutes);
app.use('/api/prontuarios', prontuarioRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});