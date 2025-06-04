// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const {addBook,getAllBooks,getBookById,searchBooks} = require('../controllers/bookController');
const {protect} = require('../middleware/authMiddleware');

// Add a new book (authenticated users only)
router.post('/books', protect, addBook);

// Get all books with optional filters
router.get('/books', getAllBooks);

// Get single book with reviews and avg rating
router.get('/books/:id', getBookById);

router.get('/search', searchBooks);

module.exports = router;
