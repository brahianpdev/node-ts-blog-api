import { check } from 'express-validator';
import { Router } from 'express';
const routes = Router();

import postController from '../controllers/post.controller';
import { existsCategoryById, existPostById, validateJWT, validateFields, isAdmin } from '../helpers';

routes
	.post(
		'/',
		[
			validateJWT,
			check('title', 'The title is required').not().isEmpty(),
            check('description', 'The description is required').not().isEmpty(),
			check('category', 'This is not a valid Mongo ID').isMongoId(),
			check('category').custom(existsCategoryById),
			validateFields,
		],
		postController.createPost,
	)

	.get('/',	
		[	
		// validateJWT,
		validateFields
		], 
		postController.getAllPost)

	.get(
		'/:id',
		[
                  check('id', 'This is not a valid Mongo ID').isMongoId(), 
                  check('id').custom(existPostById), 
                  validateFields
        ],
		postController.getPost,
	)
	.put('/:id', 
      [           validateJWT,
                  check('id').custom( existPostById ),
                  validateFields
      ],
        postController.updatePost)
	.delete('/:id', 
      [
            validateJWT,
            check('id', 'This is not a valid Mongo ID').isMongoId(),
            check('id').custom( existPostById ),
            validateFields,

      ],
	  	postController.deletePost);

export default routes;
