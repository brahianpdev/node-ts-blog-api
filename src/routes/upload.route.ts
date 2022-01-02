import { Router } from 'express';
import { check } from 'express-validator';

import { validateJWT, validateFields } from '../helpers';
import { multerUpload } from '../middlewares';

const routes = Router();

import uploadController from '../controllers/upload.controller';

routes.post('/', 
    [   
        validateJWT, 
        validateFields,
        multerUpload.single('file')

    ],
    uploadController.uploadFile);

export default routes;
