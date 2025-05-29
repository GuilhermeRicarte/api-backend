import { Router } from 'express';
import MedicoController from '../controllers/MedicoController';
import authController from '../controllers/authController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post('/register', (req, res, next) => {
	MedicoController.register(req, res).catch(next);
});
router.post('/recover-password', (req, res, next) => {
	MedicoController.recoverPassword(req, res).catch(next);
});
router.post('/register', upload.single('fotoPerfil'), authController.register);
router.put('/perfil/foto', upload.single('fotoPerfil'), authController.updateFotoPerfil);

export default router;