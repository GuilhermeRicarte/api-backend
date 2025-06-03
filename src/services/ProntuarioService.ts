import ProntuarioModel from '../models/ProntuarioModel';

class ProntuarioService {
    async create(pacienteId: number, medicoId: number, descricao: string, observacoes?: string) {
        return ProntuarioModel.create({
            pacienteId,
            medicoId,
            descricao,
            observacoes,
        });
    }

    async findById(id: number) {
        return ProntuarioModel.findById(id);
    }

    async listAll() {
        return ProntuarioModel.listAll();
    }
}

export default new ProntuarioService();