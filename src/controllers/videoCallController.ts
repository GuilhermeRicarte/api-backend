import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

class VideoCallController {
    async createRoom(req: Request, res: Response) {
        try {
            // Gera um ID único para a sala de vídeo
            const roomId = uuidv4();
            // Aqui você pode salvar a sala no banco de dados, se necessário

            return res.status(201).json({ roomId });
        } catch (error) {
            console.error('Erro ao criar sala de vídeo:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}

export default new VideoCallController();

export function createRoom(arg0: string, createRoom: any) {
    throw new Error('Function not implemented.');
}
