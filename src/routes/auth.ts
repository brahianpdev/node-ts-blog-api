import { Router } from 'express';
const routes = Router();

import authController from '../controllers/authController';

routes.post('/register', authController.register)
      .post('/login', authController.login);

export default routes;
