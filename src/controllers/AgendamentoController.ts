import { Request, Response } from 'express';
import AgendamentoService from '../services/AgendamentoService';
import { StatusAgendamento } from '@prisma/client';

class AgendamentoController {
    async create(req: Request, res: Response) {
        try {
            const { pacienteId, medicoId, dataHora, observacao } = req.body;
            const agendamento = await AgendamentoService.create(
                Number(pacienteId),
                Number(medicoId),
                new Date(dataHora),
                observacao
            );
            return res.status(201).json(agendamento);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao criar agendamento.' });
        }
    }

    async getByUuid(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            const agendamento = await AgendamentoService.findByUuid(uuid);
            if (!agendamento) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }
            return res.json(agendamento);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao buscar agendamento.' });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            const { status } = req.body;
            if (!Object.values(StatusAgendamento).includes(status)) {
                return res.status(400).json({ message: 'Status inválido.' });
            }
            const agendamento = await AgendamentoService.updateStatus(uuid, status);
            return res.json(agendamento);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao atualizar status.' });
        }
    }

    async listAll(req: Request, res: Response) {
        try {
            const agendamentos = await AgendamentoService.listAll();
            return res.json(agendamentos);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao listar agendamentos.' });
        }
    }
}

export default new AgendamentoController();