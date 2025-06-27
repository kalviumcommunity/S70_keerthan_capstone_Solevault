// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [function() { return !this.googleId; }, 'First name is required for standard signup.'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [function() { return !this.googleId; }, 'Last name is required for standard signup.'],
        trim: true,
    },
    name: {
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
        // Password is NOT required if the user signs up/in with Google. This is correct.
        required: [function() { return !this.googleId; }, 'Password is required for standard signup.'],
        // --- CORRECTED ---
        // The minlength validator has been REMOVED.
        // Password length validation should be done in your route handler BEFORE hashing.
    },

     passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
    },
    // The 'createdAt' field below is redundant because the 'timestamps: true' option handles it automatically.
    // I've removed it for clarity.
}, { timestamps: true }); // This automatically adds `createdAt` and `updatedAt` fields.


// --- CORRECTED PASSWORD HASHING LOGIC ---
userSchema.pre('save', async function (next) {
    // We only need to hash the password if it has been modified (or is new).
    if (!this.isModified('password')) {
        return next();
    }
    
    // This new check prevents hashing a password that is ALREADY a hash.
    // This is crucial for your OTP flow where you save an already-hashed password.
    if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) {
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