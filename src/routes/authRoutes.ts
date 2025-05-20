import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/login', asyncHandler(AuthController.login));
router.post('/register', asyncHandler(AuthController.register));
router.post('/recover-password', asyncHandler(AuthController.recoverPassword));

export default router;