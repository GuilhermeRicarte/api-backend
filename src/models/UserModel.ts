import prisma from '../prisma';
import { Prisma } from '@prisma/client';
type User = {
    id: number;
    username: string;
    password: string;
    genero: string;
    cpf: string;
    telefone: string;
    cep: string;
    rua: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    fotoPerfil: string;
};


const users: User[] = [];

class UserModel {
    static async findByUsername(username: string) {
        return prisma.user.findUnique({ where: { username } });
    }
    static async create(user: Prisma.UserCreateInput) {
    return prisma.user.create({ data: user });
    }

    static async updateFotoPerfil(username: string, fotoPerfil: string) {
        return prisma.user.update({
            where: { username },
            data: { fotoPerfil }
        });
    }

    static async updatePassword(username: string, newHashedPassword: string) {
        return prisma.user.update({
            where: { username },
            data: { senha: newHashedPassword }
        });
    }
}

export default UserModel;