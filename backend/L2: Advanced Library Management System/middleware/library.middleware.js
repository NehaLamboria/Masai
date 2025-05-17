const Library = require('../models/library.model');

// Validation Middleware
const validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Incomplete Data' });
  }
  next();
};

// Borrowing Limit Middleware
const checkBorrowLimit = async (req, res, next) => {
  const borrowerName = req.body.borrowerName;
  if (!borrowerName) {
    return res.status(400).json({ message: 'Borrower name required' });
  }
  const borrowedBooksCount = await Library.countDocuments({
    borrowerName,
    status: 'borrowed',
  });

  if (borrowedBooksCount >= 3) {
    return res.status(409).json({ message: 'Borrowing limit exceeded (3 books max)' });
  }
  next();
};

module.exports = {
  validateBookData,
  checkBorrowLimit,
};
