// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // Make it not strictly required if Google sign-up might not provide it separately
    // or if you plan to use a combined 'name' field from Google.
    // For now, let's assume Google provides given_name which we map to firstName.
    required: [function() { return !this.googleId; }, 'First name is required for standard signup.'],
    trim: true,
  },
  lastName: {
    type: String,
    // Similar to firstName, make it conditionally required.
    required: [function() { return !this.googleId; }, 'Last name is required for standard signup.'],
    trim: true,
  },
  // Optional: Add a full name field if you prefer, especially for Google users
  name: { // This can store the full name from Google if firstName/lastName aren't distinctly available
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    index: true,
  },
  password: {
    type: String,
    // Password is NOT required if the user signs up/in with Google
    required: [function() { return !this.googleId; }, 'Password is required for standard signup.'],
    minlength: [function() { return this.googleId ? 0 : 6; }, 'Password must be at least 6 characters long for standard signup.'],
  },
  googleId: { // Field to store Google's unique user ID
    type: String,
    unique: true,
    sparse: true, // Allows multiple documents to have a null value for googleId, but if a value is present, it must be unique.
    index: true,
  },
  // Optional: Store profile picture URL from Google
  // profilePicture: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // Using timestamps option is cleaner for createdAt/updatedAt

// Password Hashing - only hash if password is provided and modified (for standard signup/password change)
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new) AND it exists
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password in DB
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) { // User signed up with Google, no password to compare
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;