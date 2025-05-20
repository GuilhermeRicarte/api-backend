import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';


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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });

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
        estado: string
    ) {
        const existingUser = await UserModel.findByUsername(username);

        if (existingUser) {
            throw new Error('User already exists.');
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário
         const newUser = await UserModel.create({
             username, password: hashedPassword, genero, cpf, telefone, cep, rua, bairro, complemento, cidade, estado,
             fotoPerfil: ''
         });

        return newUser;
    }

    async updateFotoPerfil(username: string, fotoPerfil: string) {
        return await UserModel.updateFotoPerfil(username, fotoPerfil);
    }

    async recoverPassword(username: string, newHashedPassword: string) {
        const user = await UserModel.findByUsername(username);
        if (!user) {
            return false;
        }
        await UserModel.updatePassword(username, newHashedPassword);
        return true;
    }
}

export default new AuthService();

function updateFotoPerfil(username: any, string: any, fotoPerfil: any, string1: any) {
    throw new Error('Function not implemented.');
}
