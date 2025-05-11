import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import errorHandler from './utils/errorHandler.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' });
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
