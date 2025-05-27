// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REMOVE these lines from the top:
// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) { ... }

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // ... (your input validations remain the same) ...
  if (!firstName || !lastName || !email || !password) { /* ... */ }
  if (password.length < 6) { /* ... */ }
  if (!/\S+@\S+\.\S+/.test(email)) { /* ... */ }

  try {
    // ... (your User.findOne and newUser creation logic remains the same) ...
    if (!User || typeof User.findOne !== 'function') { /* ... */ }
    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) { /* ... */ }
    const newUser = new User({ /* ... */ });
    await newUser.save();

    const payload = {
      user: { id: newUser.id }
    };

    const currentJwtSecret = process.env.JWT_SECRET; // <<--- Access JWT_SECRET here

    if (!currentJwtSecret) {
        console.error('CRITICAL: JWT_SECRET is missing at time of token signing in /signup.');
        return res.status(500).json({ message: 'Server configuration error: Cannot create user session.' });
    }

    const token = jwt.sign(payload, currentJwtSecret, { expiresIn: '1h' }); // <<--- Use currentJwtSecret
    
    res.status(201).json({
      message: 'User registered successfully!',
      token: token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });

  } catch (err) {
    // ... (your error handling remains the same) ...
    if (err.name === 'ValidationError') { /* ... */ }
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) { /* ... */ }
    console.error('Signup error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error during signup.', error: err.message });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // ... (your input validations remain the same) ...
  if (!email || !password) { /* ... */ }

  try {
    // ... (your User.findOne and password comparison logic remains the same) ...
    if (!User || typeof User.findOne !== 'function') { /* ... */ }
    const foundUser = await User.findOne({ email: email.toLowerCase() });
    if (!foundUser) { /* ... */ }
    const isMatch = await foundUser.comparePassword(password);
    if (!isMatch) { /* ... */ }
    
    const payload = {
      user: { id: foundUser.id }
    };

    const currentJwtSecret = process.env.JWT_SECRET; // <<--- Access JWT_SECRET here

    if (!currentJwtSecret) {
        console.error('CRITICAL: JWT_SECRET is missing at time of token signing in /signin.');
        return res.status(500).json({ message: 'Server configuration error: Cannot create user session.' });
    }

    const token = jwt.sign(payload, currentJwtSecret, { expiresIn: '1h' }); // <<--- Use currentJwtSecret

    res.status(200).json({
      message: 'Logged in successfully!',
      token: token,
      user: {
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email
      }
    });

  } catch (err) {
    // ... (your error handling remains the same) ...
    console.error('Signin error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error during signin.', error: err.message });
  }
});

module.exports = router;