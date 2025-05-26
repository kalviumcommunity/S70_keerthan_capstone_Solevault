// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// --- Debugging Log ---
console.log("Imported User model in auth.js:", User);
if (User && typeof User.findOne === 'function') {
  console.log("User.findOne IS a function. Type:", typeof User.findOne);
} else {
  console.error("User.findOne IS NOT a function or User is not what's expected. User value:", User);
}
// --- End Debugging Log ---


// If you were using bcryptjs for password hashing (recommended):
// const bcrypt = require('bcryptjs');
// If you were using JWT for tokens (recommended):
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key'; // Get from .env

/**
 * @route   POST /auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) { // Basic email format check
      return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    // Ensure User and User.findOne are valid before calling
    if (!User || typeof User.findOne !== 'function') {
        console.error('CRITICAL ERROR in /signup: User model or User.findOne is not correctly defined.', User);
        return res.status(500).json({ message: 'Server configuration error: User model not available.' });
    }

    // Check if user already exists (by email or username)
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'User with this username already exists.' });
      }
    }

    // Create new user instance
    // WARNING: Storing password in plain text. This is NOT secure for production.
    const newUser = new User({
      username,
      email,
      password // Storing plain text password
    });

    await newUser.save(); // Mongoose pre-save hook for hashing would trigger here if implemented

    // If using JWT, you would generate and send a token here
    // const payload = { user: { id: newUser.id, username: newUser.username } };
    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully!',
      // token: token, // if using JWT
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        return res.status(400).json({ message: "Validation Error", errors });
    }
    console.error('Signup error:', err.message, err.stack); // Log the full stack
    res.status(500).json({ message: 'Server error during signup.', error: err.message });
  }
});

/**
 * @route   POST /auth/signin
 * @desc    Authenticate user
 * @access  Public
 */
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  try {
    // Ensure User and User.findOne are valid before calling
    if (!User || typeof User.findOne !== 'function') {
        console.error('CRITICAL ERROR in /signin: User model or User.findOne is not correctly defined.', User);
        return res.status(500).json({ message: 'Server configuration error: User model not available.' });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    // WARNING: Comparing plain text passwords. This is NOT secure.
    // If using bcrypt, you would use: const isMatch = await foundUser.comparePassword(password);
    const isMatch = (password === foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    // If using JWT, you would generate and send a token here
    // const payload = { user: { id: foundUser.id, username: foundUser.username } };
    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Logged in successfully!',
      // token: token, // if using JWT
      user: {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      }
    });

  } catch (err) {
    console.error('Signin error:', err.message, err.stack); // Log the full stack
    res.status(500).json({ message: 'Server error during signin.', error: err.message });
  }
});

module.exports = router;
