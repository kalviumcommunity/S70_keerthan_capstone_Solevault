// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REMOVE these lines from the top if they were there, JWT_SECRET is accessed inside functions
// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) { ... }

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Input validations
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide firstName, lastName, email, and password.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    if (!User || typeof User.findOne !== 'function') {
      console.error('CRITICAL ERROR in /signup: User model or User.findOne is not correctly defined.');
      return res.status(500).json({ message: 'Server configuration error: User model not available.' });
    }
    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const newUser = new User({ 
      firstName,
      lastName,
      email: email.toLowerCase(),
      password
    });
    await newUser.save();

    const payload = {
      user: { id: newUser.id }
    };

    const currentJwtSecret = process.env.JWT_SECRET; 

    if (!currentJwtSecret) {
      console.error('CRITICAL: JWT_SECRET is missing at time of token signing in /signup.');
      return res.status(500).json({ message: 'Server configuration error: Cannot create user session.' });
    }

    const token = jwt.sign(payload, currentJwtSecret, { expiresIn: '1h' }); 
    
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
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: "Validation Error", errors });
    }
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    console.error('Signup error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error during signup.', error: err.message });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Input validations
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  try {
    if (!User || typeof User.findOne !== 'function') {
      console.error('CRITICAL ERROR in /signin: User model or User.findOne is not correctly defined.');
      return res.status(500).json({ message: 'Server configuration error: User model not available.' });
    }
    
    const foundUser = await User.findOne({ email: email.toLowerCase() });
    
    // --- THIS IS THE CRITICAL CHECK ---
    if (!foundUser) {
      // If no user is found with that email, send a 400 response and stop.
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }
    // --- END CRITICAL CHECK ---

    // If code reaches here, foundUser is an object (not null).
    const isMatch = await foundUser.comparePassword(password);
    if (!isMatch) {
      // If passwords don't match, send a 400 response and stop.
      return res.status(400).json({ message: 'Invalid credentials. Password incorrect.' });
    }
    
    // If passwords match, proceed to generate token
    const payload = {
      user: { id: foundUser.id }
    };

    const currentJwtSecret = process.env.JWT_SECRET; 

    if (!currentJwtSecret) {
      console.error('CRITICAL: JWT_SECRET is missing at time of token signing in /signin.');
      return res.status(500).json({ message: 'Server configuration error: Cannot create user session.' });
    }

    const token = jwt.sign(payload, currentJwtSecret, { expiresIn: '1h' }); 

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
    console.error('Signin error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error during signin.', error: err.message });
  }
});

module.exports = router;