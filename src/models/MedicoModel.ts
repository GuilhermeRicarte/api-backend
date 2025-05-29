import prisma from '../prisma';
import { Prisma } from '@prisma/client';

class MedicoModel {
    static async findByEmail(email: string) {
        return prisma.medico.findUnique({ where: { email } });
    }

    static async create(medico: Prisma.MedicoCreateInput) {
    return prisma.medico.create({ data: medico });
    }

    static async updateFotoPerfil(email: string, fotoPerfil: string) {
        return prisma.medico.update({
            where: { email },
            data: { fotoPerfil }
        });
    }

    static async updatePassword(email: string, hashedPassword: string) {
        return prisma.medico.update({
            where: { email },
            data: { senha: hashedPassword }
        });
    }
}

export default MedicoModel;