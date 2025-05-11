import express from 'express';
import todoController from '../controllers/todoController.js';

const router = express.Router();

// CRUD Routes
router.get('/', todoController.getAllTodos);
router.get('/search', todoController.searchTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
