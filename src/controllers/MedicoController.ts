import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import MedicoService from '../services/MedicoService';

class MedicoController {
    async register(req: Request, res: Response) {
        try {
            const {
                nome, crm, especialidade, telefone, email, senha
            } = req.body;

            // Pega o nome do arquivo enviado (ex: fotoPerfil ou documento)
            const fotoPerfil = req.file ? req.file.filename : '';

            if (
                !nome || !crm || !especialidade || !telefone || !email || !senha
            ) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Map request body fields to service arguments, provide defaults for missing fields
            const {
                username = email,
                password = senha,
                genero = '',
                cpf = '',
                cep = '',
                rua = '',
                bairro = '',
                complemento = '',
                cidade = '',
                estado = '',
                rqe = '',
                universidade = '',
                anoFormatura = '',
                resumoCurriculo = '',
                fotoCrm = '',
                documentoIdentidade = '',
                certificadoEspecializacao = '',
                valorPadraoConsulta = 0,
                tempoMedioConsulta = 0
            } = req.body;

            const medico = await MedicoService.register(
                username,
                password,
                genero,
                cpf,
                telefone,
                cep,
                rua,
                bairro,
                complemento,
                cidade,
                estado,
                crm,
                especialidade,
                rqe,
                universidade,
                anoFormatura,
                resumoCurriculo,
                fotoCrm,
                documentoIdentidade,
                certificadoEspecializacao,
                valorPadraoConsulta,
                tempoMedioConsulta
            );

            if (!medico) {
                return res.status(400).json({ message: 'Erro ao cadastrar médico.' });
            }

            return res.status(201).json({ message: 'Médico cadastrado com sucesso.', medico });
        } catch (error) {
            console.error('Erro no cadastro do médico:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    async loginMedico(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required.' });
            }

            // Autentica normalmente
            const token = await MedicoService.authenticateMedico(username, password);

            if (typeof token !== 'string' || !token) {
                return res.status(401).json({ message: 'Invalid credentials or not a medico.' });
            }

            return res.status(200).json({ message: 'Login médico realizado com sucesso.', token });
        } catch (error) {
            console.error('Erro no login do médico:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

// ...existing code...

    async recoverPassword(req: Request, res: Response) {
        try {
            const { username, newPassword } = req.body;

            if (!username || !newPassword) {
                return res.status(400).json({ message: 'Username and newPassword are required.' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await MedicoService.recoverPassword(username, hashedPassword);

            return res.status(200).json({ message: 'Password updated successfully.' });
        } catch (error) {
            console.error('Error during medico password recovery:', error instanceof Error ? error.message : error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async updateFotoPerfil(req: Request, res: Response) {
        try {
            const { username, fotoPerfil } = req.body;
            if (!username || !fotoPerfil) {
                return res.status(400).json({ message: 'Username and fotoPerfil are required.' });
            }
            const medico = await MedicoService.updateFotoPerfil(username, fotoPerfil);
            if (!medico) {
                return res.status(404).json({ message: 'Medico not found.' });
            }
            return res.status(200).json({ message: 'Foto de perfil atualizada com sucesso.', medico });
        } catch (error) {
            console.error('Error updating profile photo:', error instanceof Error ? error.message : error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export default new MedicoController();