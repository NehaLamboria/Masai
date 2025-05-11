import db from '../models/bookModel.js';
import { transactionLogger } from '../middlewares/transactionLogger.js';

export const getAvailableBooks = async (req, res) => {
  await db.read();
  const books = db.data.books.filter(b => b.status === 'available');
  res.json(books);
};

export const borrowBook = async (req, res) => {
  await db.read();
  const book = db.data.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.status === 'borrowed') return res.status(400).json({ error: 'Book already borrowed' });

  book.status = 'borrowed';
  book.borrowedBy = req.body.readerName;
  book.borrowedDate = new Date().toISOString().split('T')[0];
  await db.write();

  transactionLogger(`${book.borrowedBy} borrowed "${book.title}"`);
  res.json(book);
};

export const returnBook = async (req, res) => {
  await db.read();
  const book = db.data.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const reader = book.borrowedBy;
  book.status = 'available';
  delete book.borrowedBy;
  delete book.borrowedDate;
  await db.write();

  transactionLogger(`${reader} returned "${book.title}"`);
  res.json({ message: 'Book returned successfully' });
};
