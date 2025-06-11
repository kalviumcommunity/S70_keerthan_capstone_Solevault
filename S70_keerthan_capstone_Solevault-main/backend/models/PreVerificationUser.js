// backend/models/PreVerificationUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const preVerificationUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store the hashed password
    otp: { type: String, required: true },
    // This field will automatically delete the document after 10 minutes (600 seconds)
    createdAt: { type: Date, default: Date.now, expires: 600 }
});

// Hash password before saving (important!)
preVerificationUserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('PreVerificationUser', preVerificationUserSchema);