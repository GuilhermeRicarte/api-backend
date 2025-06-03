import { Request, Response } from 'express';
import ProntuarioService from '../services/ProntuarioService';

class ProntuarioController {
    async create(req: Request, res: Response) {
        try {
            const { pacienteId, medicoId, descricao, observacoes } = req.body;
            const prontuario = await ProntuarioService.create(
                Number(pacienteId),
                Number(medicoId),
                descricao,
                observacoes
            );
            return res.status(201).json(prontuario);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao criar prontuário.' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const prontuario = await ProntuarioService.findById(Number(id));
            if (!prontuario) {
                return res.status(404).json({ message: 'Prontuário não encontrado.' });
            }
            return res.json(prontuario);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao buscar prontuário.' });
        }
    }

    async listAll(req: Request, res: Response) {
        try {
            const prontuarios = await ProntuarioService.listAll();
            return res.json(prontuarios);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao listar prontuários.' });
        }
    }
}

export default new ProntuarioController();