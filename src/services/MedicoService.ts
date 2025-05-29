import bcrypt from 'bcrypt';
import MedicoModel from '../models/MedicoModel';

class MedicoService {
    async authenticateMedico(email: string, senha: string) {
        const medico = await MedicoModel.findByEmail(email);
        if (!medico) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(senha, medico.senha);
        if (!isPasswordValid) {
            return null;
        }
        // Gere e retorne um token JWT se desejar
        return medico;
    }

    async register(
        email: string,
        senha: string,
        crm: string,
        especialidade: string,
        telefone: string,
        rqe: string,
        universidade: string,
        anoFormatura: string,
        resumoCurriculo: string,
        fotoPerfil: string,
        fotoCrm: string,
        documentoIdentidade: string,
        certificadoEspecializacao: string,
        valorPadraoConsulta: number,
        tempoMedioConsulta: number
    ) {
        const existingMedico = await MedicoModel.findByEmail(email);
        if (existingMedico) {
            throw new Error('Medico already exists.');
        }
        const hashedPassword = await bcrypt.hash(senha, 10);

        const newMedico = await MedicoModel.create({
              email,
              senha: hashedPassword,
              crm,
              especialidade,
              telefone,
              rqe,
              universidade,
              anoFormatura,
              resumoCurriculo,
              fotoPerfil,
              fotoCrm,
              documentoIdentidade,
              certificadoEspecializacao,
              valorPadraoConsulta,
              tempoMedioConsulta
});

        return newMedico;
    }

    async recoverPassword(email: string, newPassword: string) {
        const medico = await MedicoModel.findByEmail(email);
        if (!medico) {
            throw new Error('Medico not found.');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedMedico = await MedicoModel.updatePassword(email, hashedPassword);
        return updatedMedico;
    }

    async updateFotoPerfil(email: string, fotoPerfil: string) {
        return await MedicoModel.updateFotoPerfil(email, fotoPerfil);
    }
}

export default new MedicoService();