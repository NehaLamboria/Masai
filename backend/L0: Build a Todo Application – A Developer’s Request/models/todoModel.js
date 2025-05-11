import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '../db.json');

// Initialize database
const adapter = new JSONFile(file);
const defaultData = { todos: [] }; // Default data structure
const db = new Low(adapter, defaultData); // Provide default data here

// Read and initialize database
await db.read();
await db.write(); // Ensure file exists with default structure

// Generate ID for new todos
const generateId = () => {
  const lastTodo = db.data.todos[db.data.todos.length - 1];
  return lastTodo ? lastTodo.id + 1 : 1;
};

const todoModel = {
  getAll: async () => {
    await db.read();
    return db.data.todos;
  },

  getById: async (id) => {
    await db.read();
    return db.data.todos.find(todo => todo.id === Number(id));
  },

  search: async (query) => {
    await db.read();
    const searchTerm = query.toLowerCase();
    return db.data.todos.filter(todo => 
      todo.title.toLowerCase().includes(searchTerm)
    );
  },

  create: async (title) => {
    await db.read();
    const newTodo = {
      id: generateId(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    db.data.todos.push(newTodo);
    await db.write();
    return newTodo;
  },

  update: async (id, updates) => {
    await db.read();
    const todoIndex = db.data.todos.findIndex(todo => todo.id === Number(id));
    if (todoIndex === -1) return null;
    
    db.data.todos[todoIndex] = {
      ...db.data.todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.write();
    return db.data.todos[todoIndex];
  },

  delete: async (id) => {
    await db.read();
    const todoIndex = db.data.todos.findIndex(todo => todo.id === Number(id));
    if (todoIndex === -1) return null;
    
    const [deletedTodo] = db.data.todos.splice(todoIndex, 1);
    await db.write();
    return deletedTodo;
  }
};

export default todoModel;
