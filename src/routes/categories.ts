import { Router } from 'express';
const routes = Router();

import categoriesController from '../controllers/categoriesController';

routes.post('/', categoriesController.createCategory)
      .get('/', categoriesController.getAllCategories)
      .get('/id', categoriesController.getCategory)
      .delete('/:id', categoriesController.deleteCategory);

export default routes;