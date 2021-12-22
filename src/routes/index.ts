import { Router } from 'express';

import authRoutes from './auth';
import userRoutes from '../routes/user';
import postsRoutes from '../routes/post';
import categoriesRoutes from '../routes/categories';
import uploadRoutes from '../routes/upload';

const routes = Router();

routes.use('/', authRoutes);
routes.use('/users', userRoutes);
routes.use('/posts', postsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/files', uploadRoutes); 

export default routes;
