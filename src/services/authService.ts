import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

class AuthService {
    findUserByUsername(username: any) {
        throw new Error('Method not implemented.');
    }
    async authenticate(username: string, password: string) {
        const user = await UserModel.findByUsername(username);

        if (!user) {
            return null;
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.senha); // <-- aqui!
        if (!isPasswordValid) {
            return null;
        }

        // Gera um token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        return token;
    }

    async register(
        username: string,
        password: string,
        genero: string,
        cpf: string,
        telefone: string,
        cep: string,
        rua: string,
        bairro: string,
        complemento: string,
        cidade: string,
        estado: string,
        fotoPerfil: string
    ) {
        const existingUser = await UserModel.findByUsername(username);

        if (existingUser) {
            throw new Error('User already exists.');
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário
        const newUser = await UserModel.create({
    username,
    senha: hashedPassword,
    genero,
    cpf,
    telefone,
    cep,
    rua,
    bairro,
    complemento,
    cidade,
    estado,
    fotoPerfil
     });

        return newUser;
    }


    async updateFotoPerfil(username: string, fotoPerfil: string) {
        return await UserModel.updateFotoPerfil(username, fotoPerfil);
    }

    async recoverPassword(username: string, newPassword: string) {
        const user = await UserModel.findByUsername(username);
        if (!user) {
            return false;
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.updatePassword(username, hashedPassword);
        return true;
    }
}

export default new AuthService();