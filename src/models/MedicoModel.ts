type Medico = {
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
    crm: string;
    especialidade: string;
    rqe: string;
    universidade: string;
    anoFormatura: string;
    resumoCurriculo: string;
    fotoCrm: string;
    documentoIdentidade: string;
    certificadoEspecializacao: string;
    valorPadraoConsulta: number;
    tempoMedioConsulta: number;
    fotoPerfil?: string;
};

const medicos: Medico[] = [];

class MedicoModel {
    static updatePassword(username: string, newPassword: string) {
        throw new Error('Method not implemented.');
    }
    static async findByUsername(username: string): Promise<Medico | null> {
        return medicos.find(medico => medico.username === username) || null;
    }

    static async create(medico: Omit<Medico, 'id'>): Promise<Medico> {
        const newMedico = { id: medicos.length + 1, ...medico };
        medicos.push(newMedico);
        return newMedico;
    }

    static async updateFotoPerfil(username: string, fotoPerfil: string): Promise<Medico | null> {
        const medico = medicos.find(m => m.username === username);
        if (medico) {
            medico.fotoPerfil = fotoPerfil;
            return medico;
        }
        return null;
    }
}

export default MedicoModel;