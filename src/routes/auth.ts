import { Router } from 'express';
import { check } from 'express-validator';

import authController from '../controllers/authController';
import validatorFields from '../middlewares/validatorFields';
import { validRole, validEmail } from '../middlewares/dbValidator';

const routes = Router();

routes
	.post(
		'/register',
		[
			check('email', 'The email is not valid.').isEmail(),
			check('nickname', 'The nickname is required').not().isEmpty(),
			check('password', 'The password must have more than 8 characters').isLength({ min: 8 }),
			check('role').custom(validRole),
			check('email').custom(validEmail),
			validatorFields,
		],
		authController.register,
	)

	.post(
		'/login',
		[
			check('email', 'Mail is required.').isEmail(),
			check('password', 'Password is required').not().isEmpty(),
			validatorFields,
		],
		authController.login,
	);

export default routes;
