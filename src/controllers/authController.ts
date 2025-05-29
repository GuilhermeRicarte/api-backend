import { Request, Response } from 'express';
import AuthService from '../services/authService';
import bcrypt from 'bcrypt';

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required.' });
            }

            const token = await AuthService.authenticate(username, password);

            if (!token) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            return res.status(200).json({ message: 'Login successful.', token });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const {
                username, password, genero, cpf, telefone,
                cep, rua, bairro, complemento, cidade, estado
            } = req.body;

            // Pega o nome do arquivo enviado (se houver)
            const fotoPerfil = req.file ? req.file.filename : '';

            if (
                !username || !password || !genero || !cpf || !telefone ||
                !cep || !rua || !bairro || !complemento || !cidade || !estado
            ) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const user = await AuthService.register(
                username, password, genero, cpf, telefone,
                cep, rua, bairro, complemento, cidade, estado, fotoPerfil
            );

            if (!user) {
                return res.status(400).json({ message: 'Erro ao cadastrar usuário.' });
            }

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', user });
        } catch (error) {
            console.error('Erro no cadastro:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    async updateFotoPerfil(req: Request, res: Response) {
        try {
            const { username, fotoPerfil } = req.body;
            if (!username || !fotoPerfil) {
                return res.status(400).json({ message: 'Username and fotoPerfil are required.' });
            }
            await AuthService.updateFotoPerfil(username, fotoPerfil);
            return res.status(200).json({ message: 'Foto de perfil atualizada com sucesso.' });
        } catch (error) {
            console.error('Error updating profile photo:', error instanceof Error ? error.message : error);
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
            const user = await AuthService.findUserByUsername(username);

            if (user === null || user === undefined) {
                return res.status(404).json({ message: 'User not found.' });
            }

            await AuthService.recoverPassword(username, hashedPassword);

            return res.status(200).json({ message: 'Password updated successfully.' });
        } catch (error) {
            console.error('Error during password recovery:', error instanceof Error ? error.message : String(error));
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export default new AuthController();