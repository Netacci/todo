import { Router } from 'express';
import {
  addTodo,
  getTodos,
  getTodo,
  deleteTodo,
  deleteAllTodos,
  updateTodo,
  toggleTodo,
} from './todoController.js';

const router = Router();

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.patch('/:id', toggleTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteAllTodos);

export default router;
