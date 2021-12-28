import { check } from 'express-validator';
import { Router } from 'express';
const routes = Router();

import categoriesController from '../controllers/categoriesController';
import validateJWT from '../middlewares/validateJWT';
import validateFields from '../middlewares/validatorFields';
import { existsCategoryById } from '../middlewares/dbValidator';
import { isAdmin } from '../middlewares/validateRoles';

routes
	.post(
		'/',
		[
			validateJWT,
			check('name', 'The name is required').not().isEmpty(),
			validateFields,
		],
		categoriesController.createCategory,
	)
	.get('/', categoriesController.getAllCategories)
	.get(
		'/id',
		[check('id', 'Not a valid Mongo ID').isMongoId(), check('id').custom(existsCategoryById), validateFields],
		categoriesController.getCategory,
	)
	.put(
		'/:id',
		[
			validateJWT,
			check('name', 'The name is required').not().isEmpty(),
			check('id').custom(existsCategoryById),
			validateFields,
		],
		categoriesController.updateCategory,
	)
	.delete(
		'/:id',
		[
			// validateJWT,
			// isAdmin,
			check('id', 'Not a valid Mongo ID').isMongoId(),
			check('id').custom(existsCategoryById),
			validateFields,
		],
		categoriesController.deleteCategory,
	);

export default routes;
