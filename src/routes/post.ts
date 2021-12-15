import { Router } from 'express';
const routes = Router();

import postController from '../controllers/postController';

routes.post('/', postController.createPost)
      .get('/', postController.getAllPost)
      .get('/:id', postController.getPost)
      .put('/:id', postController.updatePost)
      .delete('/:id', postController.deletePost);

export default routes;