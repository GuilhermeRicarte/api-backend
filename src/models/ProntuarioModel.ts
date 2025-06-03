import prisma from '../prisma';
import { Prisma } from '@prisma/client';

class ProntuarioModel {
    static async create(data: Prisma.ProntuarioCreateInput) {
        return prisma.prontuario.create({ data });
    }

    static async findById(id: number) {
        return prisma.prontuario.findUnique({ where: { id } });
    }

    static async listAll() {
        return prisma.prontuario.findMany();
    }
}

export default ProntuarioModel;