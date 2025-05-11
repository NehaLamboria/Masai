import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const port = 3002;

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

await db.read();
db.data ||= { books: [] }; // ← this prevents the "missing default data" error
await db.write();

app.use(express.json());

// POST /books - Add a new book
app.post('/books', async (req, res) => {
  const newBook = req.body;
  db.data.books.push(newBook);
  await db.write();
  res.status(201).json(newBook);
});

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json(db.data.books);
});

// GET /books/:id - Get book by ID
app.get('/books/:id', (req, res) => {
  const book = db.data.books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// PUT /books/:id - Update book by ID
app.put('/books/:id', async (req, res) => {
  const index = db.data.books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  db.data.books[index] = { ...db.data.books[index], ...req.body };
  await db.write();
  res.json(db.data.books[index]);
});

// DELETE /books/:id - Delete book by ID
app.delete('/books/:id', async (req, res) => {
  const index = db.data.books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deleted = db.data.books.splice(index, 1);
  await db.write();
  res.json(deleted[0]);
});

// GET /books/search?author=...&title=...
app.get('/books/search', (req, res) => {
  const { author, title } = req.query;

  let results = db.data.books;

  if (author) {
    results = results.filter(b =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    results = results.filter(b =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (results.length === 0) {
    return res.status(404).json({ message: 'No books found' });
  }

  res.json(results);
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
