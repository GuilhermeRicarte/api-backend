import { Router } from 'express';
import * as videoCallController from '../controllers/videoCallController';
const router = Router();

router.post('/video-call/create', videoCallController.createRoom);

export default router;