import { Router } from 'express';
import MedicoController from '../controllers/MedicoController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = Router();

// Cadastro de médico com múltiplos arquivos
router.post(
    '/register',
    upload.fields([
        { name: 'fotoPerfil', maxCount: 1 },
        { name: 'fotoCrm', maxCount: 1 }
    ]),
    (req, res, next) => {
        MedicoController.register(req, res).catch(next);
    }
);

// Recuperação de senha do médico
router.post('/recover-password', (req, res, next) => {
    try {
        MedicoController.recoverPassword(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;