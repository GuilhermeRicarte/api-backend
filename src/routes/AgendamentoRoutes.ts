import { Router } from 'express';
import AgendamentoController from '../controllers/AgendamentoController';

const router = Router();

router.post('/', (req, res, next) => AgendamentoController.create(req, res).catch(next));
router.get('/:uuid', (req, res, next) => AgendamentoController.getByUuid(req, res).catch(next));
router.patch('/:uuid/status', (req, res, next) => AgendamentoController.updateStatus(req, res).catch(next));
router.get('/', (req, res, next) => AgendamentoController.listAll(req, res).catch(next));

export default router;