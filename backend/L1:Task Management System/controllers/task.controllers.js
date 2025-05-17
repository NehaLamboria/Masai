const Task = require('../models/task.model');

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const existing = await Task.findOne({ title });
    if (existing) return res.status(400).json({ message: "Title must be unique" });

    const task = new Task({ title, description, priority: priority.toLowerCase(), dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const filters = {};
    if (req.query.priority) filters.priority = req.query.priority.toLowerCase();
    if (req.query.status === 'completed') filters.isCompleted = true;
    if (req.query.status === 'pending') filters.isCompleted = false;

    const tasks = await Task.find(filters);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const updates = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (updates.title) task.title = updates.title;
    if (updates.description) task.description = updates.description;
    if (updates.priority) task.priority = updates.priority.toLowerCase();

    if (updates.isCompleted === true && task.isCompleted === false) {
      task.isCompleted = true;
      task.completionDate = new Date();
    }

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { priority } = req.query;
    if (!priority) return res.status(400).json({ message: "Priority filter required" });

    const deleted = await Task.deleteMany({ priority: priority.toLowerCase() });
    res.status(200).json({ message: `Deleted ${deleted.deletedCount} task(s)` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTasks
};
