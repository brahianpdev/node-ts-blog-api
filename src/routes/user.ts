import { Router } from 'express';
const routes = Router();

import userController from '../controllers/usersController';

routes.put('/:id', userController.updateUser)
      .delete('/:id', userController.deleteUser)
      .get('/:id', userController.getUser);

export default routes;
