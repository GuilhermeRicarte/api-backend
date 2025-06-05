import prisma from '../prisma';
import { Prisma } from '@prisma/client';

class AgendamentoModel {
    static async create(data: Prisma.AgendamentosCreateInput) {
        return prisma.agendamentos.create({ data });
    }

    static async findByUuid(uuid: string) {
        return prisma.agendamentos.findUnique({ where: { uuid } });
    }

    static async updateStatus(uuid: string, status: StatusAgendamento) {
        return prisma.agendamentos.update({
            where: { uuid },
            data: { status }
        });
    }

    static async listAll() {
        return prisma.agendamentos.findMany();
    }
}

export default AgendamentoModel;