const express = require('express');
const router = express.Router();
const {addReview,updateReview,deleteReview} = require('../controllers/reviewController');
const {protect} = require('../middleware/authMiddleware');

router.post('/books/:id/reviews',  addReview);

router.put('/reviews/:id',  updateReview);

router.delete('/reviews/:id', protect, deleteReview);

module.exports = router;
