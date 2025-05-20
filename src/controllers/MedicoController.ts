import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import MedicoService from '../services/medicoService';

class MedicoController {
    async register(req: Request, res: Response) {
        try {
            const {
                username, password, genero, cpf, telefone,
                cep, rua, bairro, complemento, cidade, estado,
                crm, especialidade, rqe, universidade, anoFormatura, resumoCurriculo,
                fotoCrm, documentoIdentidade, certificadoEspecializacao,
                valorPadraoConsulta, tempoMedioConsulta
            } = req.body;

            if (
                !username || !password || !genero || !cpf || !telefone ||
                !cep || !rua || !bairro || !complemento || !cidade || !estado ||
                !crm || !especialidade || !rqe || !universidade || !anoFormatura || !resumoCurriculo ||
                !fotoCrm || !documentoIdentidade || !certificadoEspecializacao ||
                valorPadraoConsulta === undefined || tempoMedioConsulta === undefined
            ) {
                return res.status(400).json({
                    message: 'All fields are required: username, password, genero, cpf, telefone, cep, rua, bairro, complemento, cidade, estado, crm, especialidade, rqe, universidade, anoFormatura, resumoCurriculo, fotoCrm, documentoIdentidade, certificadoEspecializacao, valorPadraoConsulta, tempoMedioConsulta.'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const medico = await MedicoService.register(
                username, hashedPassword, genero, cpf, telefone,
                cep, rua, bairro, complemento, cidade, estado,
                crm, especialidade, rqe, universidade, anoFormatura, resumoCurriculo,
                fotoCrm, documentoIdentidade, certificadoEspecializacao,
                valorPadraoConsulta, tempoMedioConsulta
            );

            if (!medico) {
                return res.status(400).json({ message: 'Registration failed. Medico may already exist.' });
            }

            return res.status(201).json({ message: 'Medico registered successfully.', medico });
        } catch (error) {
            console.error('Error during medico registration:', error instanceof Error ? error.message : error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

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