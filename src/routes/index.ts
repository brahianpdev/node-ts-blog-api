import { Router } from 'express';

import authRoutes from './auth';
import userRoutes from '../routes/user';
import postRoutes from '../routes/post';
import categoriesRoutes from '../routes/categories';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/post', postRoutes);
routes.use('/categories', categoriesRoutes);

export default routes;
