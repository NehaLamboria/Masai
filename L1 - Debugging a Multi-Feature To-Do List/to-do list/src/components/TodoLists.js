import React, { useState } from 'react';

function ToDoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Handle adding a task
  const addTask = () => {
    if (!task.trim()) {
      alert('Please enter a valid task.');
      return;
    }
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
  };

  // Handle toggling task completion
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>To-Do List</h2>

      {/* Input for task */}
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task list */}
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            <span onClick={() => toggleComplete(index)}>{task.text}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
