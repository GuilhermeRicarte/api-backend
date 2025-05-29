import { Router } from 'express';
import authController from '../controllers/authController';
import multer from 'multer';

const router = Router();

const upload = multer({ dest: 'uploads/' });


const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/login', asyncHandler(authController.login));
router.post('/register', asyncHandler(authController.register));
router.post('/recover-password', asyncHandler(authController.recoverPassword));
router.post('/register', upload.single('fotoPerfil'), authController.register);
router.put('/perfil/foto', upload.single('fotoPerfil'), authController.updateFotoPerfil);

export default router;