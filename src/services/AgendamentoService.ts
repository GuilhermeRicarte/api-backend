import AgendamentoModel from '../models/AgendamentoModel';
import { StatusAgendamento } from '@prisma/client';

class AgendamentoService {
    async create(pacienteId: number, medicoId: number, dataHora: Date, observacao?: string) {
        return AgendamentoModel.create({
            pacienteId,
            medicoId,
            dataHora,
            observacao
        });
    }

    async findByUuid(uuid: string) {
        return AgendamentoModel.findByUuid(uuid);
    }

    async updateStatus(uuid: string, status: StatusAgendamento) {
        return AgendamentoModel.updateStatus(uuid, status);
    }

    async listAll() {
        return AgendamentoModel.listAll();
    }
}

export default new AgendamentoService();