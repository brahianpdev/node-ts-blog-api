import { Router } from 'express';

import authRoutes from './auth';
import userRoutes from '../routes/user';
import postsRoutes from '../routes/post';
import categoriesRoutes from '../routes/categories';
import uploadRoutes from '../routes/upload';
import commentsRotes from '../routes/comments';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/posts', postsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/files', uploadRoutes); 
routes.use('/comments', commentsRotes);

export default routes;
