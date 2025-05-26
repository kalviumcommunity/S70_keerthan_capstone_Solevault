// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
    // WARNING: Storing plain text passwords. This is NOT secure for production.
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Crucial part: Define the model
const User = mongoose.model('User', userSchema);

// Crucial part: Export the model
module.exports = User;