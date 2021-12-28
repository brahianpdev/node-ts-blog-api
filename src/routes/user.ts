import { Router } from 'express';
import { check } from 'express-validator';
const routes = Router();

import validatorFields from '../middlewares/validatorFields';
import { validUserByID, validRole } from '../middlewares/dbValidator';
import userController from '../controllers/usersController';
import validateJWT from '../middlewares/validateJWT';
import { isAdmin, haveRole } from '../middlewares/validateRoles';

routes
	.put(
		'/:id',
		[
			check('id', 'This is not a valid ID').isMongoId(),
			check('id').custom(validUserByID),
			check('role').custom(validRole),
			validatorFields,
		],
		userController.updateUser,
	)
	.delete(
		'/:id',
		[
			// validateJWT,
			// isAdmin,
			// haveRole('ADMIN_ROLE', 'USER_ROLE'),
			check('id', 'This is not a valid ID').isMongoId(),
			check('id').custom(validUserByID),
			validatorFields,
		],
		userController.deleteUser,
	)
	.get('/:id', [
		// isAdmin,
		// haveRole('ADMIN_ROLE', 'USER_ROLE'),
		validatorFields
	],userController.getUser)
	.get('/', [
		// isAdmin,
		// haveRole('ADMIN_ROLE', 'USER_ROLE'),
		validatorFields
	],userController.getAllUsers);

export default routes;
