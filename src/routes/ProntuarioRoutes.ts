import { Router } from 'express';
import ProntuarioController from '../controllers/ProntuarioController';

const router = Router();

router.post('/', (req, res, next) => ProntuarioController.create(req, res).catch(next));
router.get('/:id', (req, res, next) => ProntuarioController.getById(req, res).catch(next));
router.get('/', (req, res, next) => ProntuarioController.listAll(req, res).catch(next));

export default router;