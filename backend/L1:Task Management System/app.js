const express = require('express');
const app = express();
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task.routes');

app.use(express.json());
app.use('/', taskRoutes);

mongoose.connect('mongodb://localhost:27017/TaskDB')
  .then(() => {
    console.log("MongoDB connected");
    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  })
  .catch(err => console.error("Mongo connection failed:", err));
