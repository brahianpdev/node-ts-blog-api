import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';

import { config } from './config';
import indexRoutes from './routes';

mongoose
	.connect(config.db.mongo)
	.then((res) => {
		const app = express();
		app.use(
			express.urlencoded({
				extended: true,
			}),
		);

		app.use(express.json());

		app.use(helmet());
		app.use(morgan('dev'));
		app.use(cors());

		app.use('/api', indexRoutes);

		app.listen(config.app.port, () => {
			console.log(`🔥 Server is running at port ${config.app.port}`);
		});

		console.log('Connected to MongoDB');
	})
	.catch((error) => console.log(error));
