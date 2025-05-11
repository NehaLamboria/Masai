const express = require('express');
const app = express();
const PORT = 5000;

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  { id: 3, name: "Bob Smith", email: "bob@example.com" }
];

// Route: GET /users/get
app.get('/users/get', (req, res) => {
  res.status(200).json(users[0]);
});

// Route: GET /users/list
app.get('/users/list', (req, res) => {
  res.status(200).json(users);
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
