// backend/routes/sneakerRoutes.js
const express = require('express');
const Sneaker = require('../models/sneakerSchema'); // Adjust path if needed
const authMiddleware = require('../middleware/authMiddleware'); 
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// === CREATE A NEW SNEAKER - PROTECTED ===
// This route now correctly associates the sneaker with the logged-in user.
router.post('/', authMiddleware, async (req, res) => {
  try {
    // req.user should be populated by authMiddleware and contain the user's ID
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated or user ID missing' });
    }

    // Create the sneaker data, ensuring the userId is included
    const sneakerData = {
      ...req.body, // Spread the data from the request body (name, brand, model, etc.)
      userId: req.user.id // Add the ID of the currently authenticated user
    };

    const sneaker = new Sneaker(sneakerData);
    await sneaker.save();
    res.status(201).json(sneaker);
  } catch (err) {
    // More specific error handling for validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error("Error creating sneaker:", err); // Log the full error for server-side debugging
    res.status(400).json({ message: err.message || 'Error creating sneaker' });
  }
});

// === GET ALL SNEAKERS FOR THE AUTHENTICATED USER - PROTECTED & FILTERED ===
// This route is now protected and only returns sneakers belonging to the logged-in user.
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated or user ID missing' });
    }
    // Find only sneakers where the userId matches the ID of the authenticated user
    const sneakers = await Sneaker.find({ userId: req.user.id });
    res.json(sneakers);
  } catch (err) {
    console.error("Error fetching user's sneakers:", err);
    res.status(500).json({ message: err.message || 'Error fetching sneakers' });
  }
});

// === GET A SPECIFIC SNEAKER BY ID - PROTECTED & AUTHORIZED ===
// Ensures a user can only get their own sneaker by ID.
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated or user ID missing' });
    }
    const sneaker = await Sneaker.findById(req.params.id);
    if (!sneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    // Authorization check: Does this sneaker belong to the logged-in user?
    if (sneaker.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to view this sneaker' });
    }
    res.json(sneaker);
  } catch (err) {
    console.error("Error fetching sneaker by ID:", err);
    if (err.kind === 'ObjectId') { // Handle invalid ObjectId format for ID
        return res.status(400).json({ message: 'Invalid sneaker ID format' });
    }
    res.status(500).json({ message: err.message || 'Error fetching sneaker' });
  }
});

// === UPDATE A SNEAKER BY ID - PROTECTED & AUTHORIZED ===
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated or user ID missing' });
    }

    const sneakerToUpdate = await Sneaker.findById(req.params.id);
    if (!sneakerToUpdate) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }

    // Authorization check
    if (sneakerToUpdate.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to update this sneaker' });
    }

    // Update the sneaker with new data from req.body
    // Ensure userId is not accidentally changed by req.body
    const updateData = { ...req.body, userId: req.user.id }; 

    const updatedSneaker = await Sneaker.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Ensure schema validations are run on update
    });
    res.json(updatedSneaker);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error("Error updating sneaker:", err);
    res.status(400).json({ message: err.message || 'Error updating sneaker' });
  }
});

// === DELETE A SNEAKER BY ID - PROTECTED & AUTHORIZED ===
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated or user ID missing' });
    }

    const sneakerToDelete = await Sneaker.findById(req.params.id);
    if (!sneakerToDelete) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }

    // Authorization check
    if (sneakerToDelete.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to delete this sneaker' });
    }

    await Sneaker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sneaker deleted successfully' });
  } catch (err) {
    console.error("Error deleting sneaker:", err);
    res.status(500).json({ message: err.message || 'Error deleting sneaker' });
  }
});

// === UPLOAD IMAGE FROM URL - PROTECTED ===
router.post('/upload-from-url', authMiddleware, async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image URL is required.' });
    }


    // --- NEW VALIDATION LOGIC ---
    try {
        // 1. Check if it's a valid URL format
        const url = new URL(imageUrl);

        // 2. Ensure it's using HTTP or HTTPS protocol
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            throw new Error('Invalid URL protocol.');
        }
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or disallowed Image URL.' });
    }
    // --- END VALIDATION ---

    try {
        // Use Cloudinary SDK to upload the image from the provided URL
        const result = await cloudinary.uploader.upload(imageUrl, {
            // You can add options here, like the folder to save to in Cloudinary
            // folder: "solevault_sneakers", 
        });

        // Send the new, permanent Cloudinary URL back to the frontend
        res.status(200).json({ secure_url: result.secure_url });

    } catch (error) {
        console.error("Cloudinary URL upload error:", error);
        res.status(500).json({ message: 'Failed to upload image from URL.' });
    }
});

module.exports = router;