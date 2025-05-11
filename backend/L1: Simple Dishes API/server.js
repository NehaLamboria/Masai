import express from 'express';
import bodyParser from 'body-parser';
import { Low, JSONFile } from 'lowdb';

// Set up express and body parser
const app = express();
app.use(bodyParser.json());

// Set up the database
const db = new Low(new JSONFile('db.json'));
await db.read();  // Read the database

// Set default values if db is empty
db.data ||= { dishes: [] };
await db.write(); // Write initial data if it's empty

// GET /dishes: Retrieve all dishes
app.get('/dishes', (req, res) => {
  const dishes = db.data.dishes;
  res.status(200).json(dishes);
});

// GET /dishes/:id: Retrieve a dish by ID
app.get('/dishes/:id', (req, res) => {
  const dish = db.data.dishes.find(d => d.id === parseInt(req.params.id));
  if (dish) {
    res.status(200).json(dish);
  } else {
    res.status(404).json({ error: 'Dish not found' });
  }
});

// POST /dishes: Add a new dish
app.post('/dishes', async (req, res) => {
  const newDish = req.body;
  newDish.id = db.data.dishes.length + 1; // Incrementing id
  db.data.dishes.push(newDish);
  await db.write();
  res.status(201).json(newDish);
});

// PUT /dishes/:id: Update a dish by ID
app.put('/dishes/:id', async (req, res) => {
  const dish = db.data.dishes.find(d => d.id === parseInt(req.params.id));
  if (dish) {
    const updatedDish = { ...dish, ...req.body };
    const index = db.data.dishes.findIndex(d => d.id === parseInt(req.params.id));
    db.data.dishes[index] = updatedDish;
    await db.write();
    res.status(200).json(updatedDish);
  } else {
    res.status(404).json({ error: 'Dish not found' });
  }
});

// DELETE /dishes/:id: Delete a dish by ID
app.delete('/dishes/:id', async (req, res) => {
  const index = db.data.dishes.findIndex(d => d.id === parseInt(req.params.id));
  if (index !== -1) {
    db.data.dishes.splice(index, 1);
    await db.write();
    res.status(200).json({ message: 'Dish deleted' });
  } else {
    res.status(404).json({ error: 'Dish not found' });
  }
});

// GET /dishes/get: Search for dishes by name (partial match)
app.get('/dishes/get', (req, res) => {
  const name = req.query.name;
  const matchedDishes = db.data.dishes.filter(dish => dish.name.toLowerCase().includes(name.toLowerCase()));
  if (matchedDishes.length > 0) {
    res.status(200).json(matchedDishes);
  } else {
    res.status(404).json({ message: 'No dishes found' });
  }
});

// Catch-all route for undefined paths
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
