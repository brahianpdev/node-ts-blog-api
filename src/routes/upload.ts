import { Router } from 'express';
const routes = Router();

import uploadFile from '../services/multer';
import uploadController from '../controllers/uploadController';

routes.post('/', uploadFile.single('filePost'));
routes.post('/', uploadController.upload)

export default routes;
