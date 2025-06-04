// controllers/bookController.js
const Book = require('../models/book');
const Review = require('../models/review');

// POST /books - Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    const newBook = new Book({ title, author, genre });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books - Get all books (with pagination & filtering)
const getAllBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (author) filter.author = new RegExp(author, 'i'); // case-insensitive
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/:id - Get book by ID with avg rating & paginated reviews
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const avg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: '$book', avgRating: { $avg: '$rating' } } },
    ]);

    const averageRating = avg[0]?.avgRating || 0;

    res.json({
      book,
      averageRating: averageRating.toFixed(2),
      reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchBooks = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Query is required' });

  const regex = new RegExp(query, 'i'); // case-insensitive
  const books = await Book.find({
    $or: [{ title: regex }, { author: regex }],
  });

  res.json(books);
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  searchBooks,
};