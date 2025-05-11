import db from '../models/bookModel.js';

export const addBook = async (req, res) => {
  await db.read();
  const newBook = {
    id: Date.now(),
    ...req.body,
    status: 'available'
  };
  db.data.books.push(newBook);
  await db.write();
  res.status(201).json(newBook);
};

export const getAllBooks = async (req, res) => {
  await db.read();
  res.json(db.data.books);
};

export const updateBook = async (req, res) => {
  await db.read();
  const index = db.data.books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  db.data.books[index] = { ...db.data.books[index], ...req.body };
  await db.write();
  res.json(db.data.books[index]);
};

export const deleteBook = async (req, res) => {
  await db.read();
  const index = db.data.books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  db.data.books.splice(index, 1);
  await db.write();
  res.json({ message: 'Book deleted' });
};
