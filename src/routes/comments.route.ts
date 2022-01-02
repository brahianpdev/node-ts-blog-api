import { check } from 'express-validator';
import { Router } from 'express';
const routes = Router();

import { validateJWT, validateFields, isAdmin, existCommentById } from '../helpers';
import commentsController from '../controllers/comments.controller';

routes.post('/', 
      [
            validateJWT,
            check('description', 'The description is required').not().isEmpty(),
            validateFields,
      ],
      commentsController.createComment)
      .get('/',
      [
            validateJWT,
            validateFields
      ], 
      commentsController.getAllComments)
      .get('/:id', 
      [
            check('id', 'This is not a valid Mongo ID').isMongoId(), 
            check('id').custom(existCommentById),  
            validateFields
      ],
      commentsController.getComment)
      .put('/:id', 
      [
            validateJWT,
            check('id').custom( existCommentById ), 
            validateFields
      ],
      commentsController.updateComment)
      .delete('/:id', 
      [
            validateJWT,
            check('id', 'This is not a valid Mongo ID').isMongoId(),
            check('id').custom( existCommentById ),
            validateFields,
      ],
      commentsController.deleteComment);

export default routes;