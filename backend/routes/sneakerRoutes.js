// backend/routes/sneakerRoutes.js
const express = require('express');
const Sneaker = require('../models/sneakerSchema'); // Adjust path

const router = express.Router();

// Create a new sneaker
router.post('/', async (req, res) => {
  try {
    const sneaker = new Sneaker(req.body);
    await sneaker.save();
    res.status(201).json(sneaker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all sneakers
router.get('/', async (req, res) => {
  try {
    const sneakers = await Sneaker.find();
    res.json(sneakers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Get a sneaker by ID
router.get('/:id', async (req, res) => {
  try {
    const sneaker = await Sneaker.findById(req.params.id);
    if (!sneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    res.json(sneaker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Update a sneaker by ID
router.put('/:id', async (req, res) => {
  try {
    const sneaker = await Sneaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    res.json(sneaker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Delete a sneaker by ID
router.delete('/:id', async (req, res) => {
  try {
    const sneaker = await Sneaker.findByIdAndDelete(req.params.id);
    if (!sneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    res.json({ message: 'Sneaker deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;