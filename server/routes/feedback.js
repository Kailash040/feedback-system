const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback.js');

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message, category } = req.body;
    
    const newFeedback = new Feedback({
      name,
      email,
      message,
      category: category || 'general'
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const { category, sort } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const feedback = await Feedback.find(query).sort(sortOption);
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;