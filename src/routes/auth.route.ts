import { Router } from 'express';
import { check } from 'express-validator';

import authController from '../controllers/auth.controller';
import { validRole, validEmail, validateFields, validNickname } from '../helpers';

const routes = Router();

routes
	.post(
		'/register',
		[
			check('email', 'The email is not valid.').isEmail(),
			check('nickname', 'The nickname is required').not().isEmpty(),
			check('password', 'The password must have more than 8 characters').isLength({ min: 8 }),

			check('nickname').custom(validNickname),
			
			check('role').custom(validRole),
			check('email').custom(validEmail),
			validateFields,
		],
		authController.register,
	)

	.post(
		'/login',
		[
			check('email', 'Mail is required.').isEmail(),
			check('password', 'Password is required').not().isEmpty(),
			validateFields,
		],
		authController.login,
	);

export default routes;
