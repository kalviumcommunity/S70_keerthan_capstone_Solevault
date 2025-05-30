// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if necessary
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const JWT_APP_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Standard Signup
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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
    if (!JWT_APP_SECRET) {
      console.error('CRITICAL: JWT_SECRET is not configured for /signup.');
      return res.status(500).json({ message: 'Server configuration error: Cannot create user session.' });
    }

    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const newUser = new User({ firstName, lastName, email: email.toLowerCase(), password });
    await newUser.save();

    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, JWT_APP_SECRET, { expiresIn: '1d' }); 
    
    res.status(201).json({
      message: 'User registered successfully!',
      token: token,
      user: { id: newUser.id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email }
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup.'});
  }
});

// Standard Signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  try {
    if (!JWT_APP_SECRET) {
      console.error('CRITICAL: JWT_SECRET is not configured for /signin.');
      return res.status(500).json({ message: 'Server configuration error: Cannot create user session.' });
    }

    const foundUser = await User.findOne({ email: email.toLowerCase() });
    if (!foundUser) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    if (!foundUser.password) {
        return res.status(400).json({ message: 'This account was registered using an external provider (e.g., Google). Please use that sign-in method.' });
    }

    const isMatch = await foundUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    const payload = { user: { id: foundUser.id } };
    const token = jwt.sign(payload, JWT_APP_SECRET, { expiresIn: '1d' }); 

    res.status(200).json({
      message: 'Logged in successfully!',
      token: token,
      user: { id: foundUser.id, firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email }
    });

  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Server error during signin.'});
  }
});

// Google Sign-In/Sign-Up Route
const googleAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const { token: googleIdToken } = req.body;

  if (!googleIdToken) {
    return res.status(400).json({ message: "Google ID token is required." });
  }
  if (!GOOGLE_CLIENT_ID || !JWT_APP_SECRET) {
    console.error("CRITICAL: GOOGLE_CLIENT_ID or JWT_SECRET is not configured for /google-login.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    const ticket = await googleAuthClient.verifyIdToken({
        idToken: googleIdToken,
        audience: GOOGLE_CLIENT_ID, 
    });
    const googlePayload = ticket.getPayload();
    
    const { 
        sub: googleId, 
        email, 
        name: googleFullName,
        given_name: googleFirstName,
        family_name: googleLastName,
        // picture: googleProfilePicture 
    } = googlePayload;

    if (!email) {
        return res.status(400).json({ message: "Email not provided by Google token." });
    }

    let user = await User.findOne({ googleId: googleId });

    if (!user) {
      user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        user.googleId = googleId;
        if (!user.name && googleFullName) user.name = googleFullName;
        if (!user.firstName && googleFirstName) user.firstName = googleFirstName;
        if (!user.lastName && googleLastName) user.lastName = googleLastName;
        await user.save();
      } else {
        user = new User({
          googleId: googleId,
          email: email.toLowerCase(),
          name: googleFullName,
          firstName: googleFirstName,
          lastName: googleLastName,
        });
        await user.save();
      }
    }

    const appTokenPayload = { user: { id: user.id } };
    const soleVaultToken = jwt.sign(appTokenPayload, JWT_APP_SECRET, { expiresIn: '1d' });

    res.json({ 
      token: soleVaultToken,
      user: { 
        id: user.id,
        name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });

  } catch (error) {
    console.error('Error during Google authentication processing:', error);
    if (error.message && (error.message.includes("Invalid token signature") || error.message.includes("Token used too late") || error.message.includes("Invalid value for \"audience\""))) {
        return res.status(401).json({ message: 'Invalid or expired Google token. Please try signing in again.' });
    }
    res.status(500).json({ message: 'Google authentication failed on server.'});
  }
});

module.exports = router;