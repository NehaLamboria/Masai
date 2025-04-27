import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const addTask = () => {
    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    sortAndSetTasks(updatedTasks);
    setTitle('');
    setPriority('Medium');
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    sortAndSetTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    sortAndSetTasks(updatedTasks);
  };

  const sortAndSetTasks = (tasksArray) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTasks = [...tasksArray].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    setTasks(sortedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    const statusMatch =
      filterStatus === 'All' ||
      (filterStatus === 'Completed' && task.completed) ||
      (filterStatus === 'Incomplete' && !task.completed);
    return priorityMatch && statusMatch;
  });

  return (
    <div>
      <h2>Advanced Task Manager</h2>

      {/* Task Input Section */}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filter Section */}
      <div style={{ marginTop: "20px" }}>
        <label>Filter by Priority: </label>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Filter by Status: </label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task List Section */}
      <ul style={{ marginTop: "20px" }}>
        {filteredTasks.length === 0 && <p>No tasks to display.</p>}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "10px",
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.priority === 'High' ? 'red' : 'black',
            }}
          >
            <span onClick={() => toggleCompletion(task.id)} style={{ cursor: "pointer" }}>
              {task.title} ({task.priority})
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px", backgroundColor: "red", color: "white", border: "none" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
