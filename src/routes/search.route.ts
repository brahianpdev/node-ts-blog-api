import Router from 'express';
const routes = Router();

import searchController from '../controllers/search.controller';

routes.get('/:collection/:term', searchController.search);

export default routes;