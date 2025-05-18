
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api', userRoutes);
app.use('/api', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
