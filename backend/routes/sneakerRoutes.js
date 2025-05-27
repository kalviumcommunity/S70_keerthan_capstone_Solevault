// backend/routes/sneakerRoutes.js
const express = require('express');
const Sneaker = require('../models/sneakerSchema'); // Adjust path if needed
const authMiddleware = require('../middleware/authMiddleware'); // <<--- 1. Import the middleware

const router = express.Router();

// Create a new sneaker - PROTECTED
router.post('/', authMiddleware, async (req, res) => { // <<--- 2. Apply authMiddleware
  try {
    // Now you have access to req.user if the token was valid
    // console.log('User making request to create sneaker:', req.user.id);

    // You might want to associate the sneaker with the user who created it
    // For example, if your sneakerSchema has a 'createdBy' field:
    // const sneakerData = { ...req.body, createdBy: req.user.id };
    // const sneaker = new Sneaker(sneakerData);

    const sneaker = new Sneaker(req.body); // Using original for now
    await sneaker.save();
    res.status(201).json(sneaker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all sneakers - REMAINS PUBLIC (for this example)
router.get('/', async (req, res) => {
  try {
    const sneakers = await Sneaker.find();
    res.json(sneakers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a sneaker by ID - REMAINS PUBLIC (for this example)
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

// Update a sneaker by ID - PROTECTED
router.put('/:id', authMiddleware, async (req, res) => { // <<--- 2. Apply authMiddleware
  try {
    // console.log('User making request to update sneaker:', req.user.id);
    // **Further Authorization (Important for real apps):**
    // Here, you should also check if the logged-in user (req.user.id)
    // is authorized to update THIS specific sneaker.
    // For example, if the sneaker was created by them or if they are an admin.
    // This usually involves fetching the sneaker first and checking a 'createdBy' field.
    // For now, this middleware just ensures *a* logged-in user is making the request.

    const sneaker = await Sneaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Good practice to run schema validators on update
    });
    if (!sneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    res.json(sneaker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a sneaker by ID - PROTECTED
router.delete('/:id', authMiddleware, async (req, res) => { // <<--- 2. Apply authMiddleware
  try {
    // console.log('User making request to delete sneaker:', req.user.id);
    // **Further Authorization (Important for real apps):**
    // Similar to update, check if req.user.id is authorized to delete this sneaker.

    const sneaker = await Sneaker.findByIdAndDelete(req.params.id);
    if (!sneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    res.json({ message: 'Sneaker deleted successfully' }); // Changed message for clarity
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;