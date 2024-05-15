import express from 'express';
import { list, createTodo, checked, notChecked } from './todo.controller';
import { TodoQueryDTO } from './todo.dto';
import { validate } from '../../utils/validation-middleware';

const router = express.Router();

router.get('/', list);
router.post('/', validate(TodoQueryDTO), createTodo);
router.patch('/:id/check', checked);
router.patch('/:id/uncheck', notChecked);

export default router;