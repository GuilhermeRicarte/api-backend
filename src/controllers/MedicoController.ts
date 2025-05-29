import { Request, Response } from 'express';
import MedicoService from '../services/MedicoService';
import { ParsedQs } from 'qs';

class MedicoController {
    recoverPassword(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
        throw new Error('Method not implemented.');
    }
    async register(req: Request, res: Response) {
        try {
            const {
                nome,
                crm,
                especialidade,
                telefone,
                email,
                senha,
                rqe,
                universidade,
                anoFormatura,
                resumoCurriculo,
                valorPadraoConsulta,
                tempoMedioConsulta,
                documentoIdentidade,
                certificadoEspecializacao
            } = req.body;

            // Tratamento seguro para arquivos enviados via multer.fields
            let fotoPerfil = '';
            let fotoCrm = '';
            if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
                const files = req.files as { [fieldname: string]: Express.Multer.File[] };
                fotoPerfil = files['fotoPerfil']?.[0]?.filename || '';
                fotoCrm = files['fotoCrm']?.[0]?.filename || '';
            }

            const medico = await MedicoService.register(
                email,
                senha,
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
                Number(valorPadraoConsulta),
                Number(tempoMedioConsulta)
            );

            return res.status(201).json({ message: 'Médico cadastrado com sucesso.', medico });
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Erro ao cadastrar médico.' });
        }
    }
}

export default new MedicoController();