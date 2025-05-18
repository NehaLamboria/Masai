const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const app = express();
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes

// POST /users ➤ Create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /users/:userId/address ➤ Add new address
app.post('/users/:userId/address', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.addresses.push(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /users/summary
app.get('/users/summary', async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const totalAddresses = users.reduce((acc, u) => acc + u.addresses.length, 0);
    const userSummary = users.map(u => ({
      name: u.name,
      addressCount: u.addresses.length
    }));
    res.json({ totalUsers, totalAddresses, userSummary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:userId
app.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:userId/address/:index ➤ Delete a specific address
app.delete('/users/:userId/address/:index', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.addresses.splice(req.params.index, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
