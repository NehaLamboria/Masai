require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const vehicleRoutes = require('./routes/vehicleRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

app.use(express.json());

app.use('/api', vehicleRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
