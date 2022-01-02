import { Router } from 'express';

import authRoutes from './auth.route';
import userRoutes from './user.route';
import postsRoutes from './post.route';
import categoriesRoutes from './categories.route';
import uploadRoutes from './upload.route';
import commentsRoutes from './comments.route';
import searchRoutes from './search.route';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/posts', postsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/files', uploadRoutes); 
routes.use('/comments', commentsRoutes);
routes.use('/search', searchRoutes);

export default routes;
