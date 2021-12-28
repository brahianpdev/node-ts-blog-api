import { Router } from 'express';
const routes = Router();

import uploadFile from '../services/uploadFilesCLOUD';
import uploadController from '../controllers/uploadController';

routes.post('/', uploadFile.single('file'));
routes.post('/', uploadController.uploadFile)

export default routes;
