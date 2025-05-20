import MedicoModel from '../models/MedicoModel';

class MedicoService {
    authenticateMedico(username: any, password: any) {
        throw new Error('Method not implemented.');
    }
      async register(
        username: string, password: string, genero: string, cpf: string, telefone: string,
        cep: string, rua: string, bairro: string, complemento: string, cidade: string, estado: string,
        crm: string, especialidade: string, rqe: string, universidade: string, anoFormatura: string, resumoCurriculo: string,
        fotoCrm: string, documentoIdentidade: string, certificadoEspecializacao: string,
        valorPadraoConsulta: number, tempoMedioConsulta: number
    ) {
        const existingMedico = await MedicoModel.findByUsername(username);
        if (existingMedico) {
            throw new Error('Medico already exists.');
        }

        const newMedico = await MedicoModel.create({
            username, password, genero, cpf, telefone,
            cep, rua, bairro, complemento, cidade, estado,
            crm, especialidade, rqe, universidade, anoFormatura, resumoCurriculo,
            fotoCrm, documentoIdentidade, certificadoEspecializacao,
            fotoPerfil: '',
            valorPadraoConsulta: 0,
            tempoMedioConsulta: 0
        });

        return newMedico;
    }
    async recoverPassword(username: string, newPassword: string) {
        const medico = await MedicoModel.findByUsername(username);
        if (!medico) {
            throw new Error('Medico not found.');
        }

        const updatedMedico = await MedicoModel.updatePassword(username, newPassword);
        return updatedMedico;
    }

       async updateFotoPerfil(username: string, fotoPerfil: string) {
        return await MedicoModel.updateFotoPerfil(username, fotoPerfil);
    }
}

export default new MedicoService();