import { Router } from 'express';
const routes = Router();

import commentsController from '../controllers/commentsController';

routes.post('/', commentsController.createComment)
      .get('/', commentsController.getAllComments)
      .get('/:id', commentsController.getComment)
      .put('/:id', commentsController.updateComment)
      .delete('/:id', commentsController.deleteComment);

export default routes;