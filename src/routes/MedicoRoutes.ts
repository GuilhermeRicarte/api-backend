import { Router } from 'express';
import MedicoController from '../controllers/medicoController';

const router = Router();

router.post('/register', (req, res, next) => {
	MedicoController.register(req, res).catch(next);
});
router.post('/recover-password', (req, res, next) => {
	MedicoController.recoverPassword(req, res).catch(next);
});
router.put('/foto-perfil', (req, res, next) => {
	MedicoController.updateFotoPerfil(req, res).catch(next);
});

export default router;