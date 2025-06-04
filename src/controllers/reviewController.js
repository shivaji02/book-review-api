// controllers/reviewController.js
const Review = require('../models/review');

// POST /books/:id/reviews
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user._id;

    const existing = await Review.findOne({ user: userId, book: bookId });
    if (existing) return res.status(400).json({ message: 'You already reviewed this book' });

    const review = new Review({ user: userId, book: bookId, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /reviews/:id
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (!review.user.equals(userId)) return res.status(403).json({ message: 'Access denied' });

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /reviews/:id
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (!review.user.equals(userId)) return res.status(403).json({ message: 'Access denied' });

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addReview,
  updateReview,
  deleteReview,
};
