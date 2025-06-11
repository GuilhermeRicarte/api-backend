import prisma from '../prisma';
import { Prisma, StatusAgendamento } from '@prisma/client';

class AgendamentoModel {
    static async create(data: Prisma.AgendamentoCreateInput) {
        return prisma.agendamento.create({ data });
    }

    static async findByUuid(uuid: string) {
        return prisma.agendamento.findUnique({ where: { uuid } });
    }

    static async updateStatus(uuid: string, status: StatusAgendamento) {
        return prisma.agendamento.update({
            where: { uuid },
            data: { status }
        });
    }

    static async listAll() {
        return prisma.agendamento.findMany();
    }
}

export default AgendamentoModel;