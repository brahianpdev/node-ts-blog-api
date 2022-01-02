import { Router } from 'express';
import { check } from 'express-validator';
const routes = Router();


import { validUserByID, validRole, validateFields, isAdmin, validateJWT, haveRole } from '../helpers';
import userController from '../controllers/users.controller';

routes
	.put(
		'/:id',
		[
			check('id', 'This is not a valid ID').isMongoId(),
			check('id').custom(validUserByID),
			check('role').custom(validRole),
			validateFields,
		],
		userController.updateUser,
	)
	.delete(
		'/:id',
		[
			validateJWT,
			isAdmin,
			// haveRole('ADMIN_ROLE', 'USER_ROLE'),
			check('id', 'This is not a valid ID').isMongoId(),
			check('id').custom(validUserByID),
			validateFields,
		],
		userController.deleteUser,
	)
	.get('/:id', [
		validateJWT,
		isAdmin,
		// haveRole('ADMIN_ROLE', 'USER_ROLE'),
		validateFields
	],userController.getUser)
	.get('/', [
		validateJWT,
		isAdmin,
		// haveRole('ADMIN_ROLE', 'USER_ROLE'),
		validateFields
	],userController.getAllUsers);

export default routes;
