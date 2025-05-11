import todoModel from '../models/todoModel.js';

const todoController = {
  getAllTodos: async (req, res, next) => {
    try {
      const todos = await todoModel.getAll();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  },

  getTodoById: async (req, res, next) => {
    try {
      const todo = await todoModel.getById(Number(req.params.id));
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      next(error);
    }
  },

  searchTodos: async (req, res, next) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ message: 'Search query is required' });
      }
      const results = await todoModel.search(q);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },

  createTodo: async (req, res, next) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
      const newTodo = await todoModel.create(title);
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  },

  updateTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      if (!Object.keys(updates).length) {
        return res.status(400).json({ message: 'No updates provided' });
      }
      
      const updatedTodo = await todoModel.update(Number(id), updates);
      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  },

  deleteTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedTodo = await todoModel.delete(Number(id));
      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

export default todoController;
