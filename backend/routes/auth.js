// backend/routes/auth.js
const express = require('express');
const nodemailer=require('nodemailer');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User'); // Adjust path if necessary
const PreVerificationUser = require('../models/PreVerificationUser');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');



const JWT_APP_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SENDGRID_API_KEY=process.env.SENDGRID_API_KEY;
const EMAIL_FROM=process.env.EMAIL_FROM;

//================================================================
// --- OTP-Based Signup: Step 1 (Send OTP) ---
// This replaces the old '/signup' route
//================================================================
router.post('/send-otp', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // --- Validation ---
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
        // Check if essential environment variables are configured
        if (!SENDGRID_API_KEY || !EMAIL_FROM) {
            console.error('CRITICAL: Email service is not configured.');
            return res.status(500).json({ message: 'Server configuration error: Cannot send email.' });
        }

        // Check if user already exists in the main collection
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }
        
        // Clear any previous OTP attempts for the same email
        await PreVerificationUser.deleteOne({ email: email.toLowerCase() });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new temporary user record (password will be hashed by the model's pre-save hook)
        const newPreUser = new PreVerificationUser({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            otp
        });
        await newPreUser.save();

        // Configure Nodemailer with SendGrid
        const transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey', // This is the literal string 'apikey' for SendGrid
                pass: SENDGRID_API_KEY
            }
        });

        // Send the OTP email
        await transporter.sendMail({
            from: `"SoleVault" <${EMAIL_FROM}>`,
            replyTo:EMAIL_FROM,
            to: email,
            subject: 'Your SoleVault Verification Code',
            html: `<h1>Welcome to SoleVault!</h1><p>Your One-Time Password (OTP) is:</p><h2>${otp}</h2><p>This code will expire in 10 minutes.</p>`
        });

        res.status(200).json({ message: 'OTP has been sent to your email. Please verify to complete signup.' });

    } catch (error) {
        console.error('Error during OTP sending:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


//================================================================
// --- OTP-Based Signup: Step 2 (Verify OTP & Create User) ---
//================================================================
router.post('/verify-signup', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
        if (!JWT_APP_SECRET) {
            console.error('CRITICAL: JWT_SECRET is not configured for /verify-signup.');
            return res.status(500).json({ message: 'Server configuration error: Cannot create user session.' });
        }

        const preUser = await PreVerificationUser.findOne({ email: email.toLowerCase() });
        if (!preUser) {
            return res.status(400).json({ message: 'Verification data not found or has expired. Please sign up again.' });
        }

        if (preUser.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP. Please check the code and try again.' });
        }

        // OTP is correct, create the final user
        const newUser = new User({
            firstName: preUser.firstName,
            lastName: preUser.lastName,
            email: preUser.email,
            password: preUser.password // Password is ALREADY HASHED from the temporary record
        });
        await newUser.save();
        
        // Clean up the temporary record
        await PreVerificationUser.deleteOne({ email: email.toLowerCase() });
        

         res.status(201).json({
        message: 'Account verified successfully. Please log in.'
    });

    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


//================================================================
// --- Standard Email & Password Signin (Unchanged) ---
//================================================================
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
            return res.status(400).json({ message: 'This account was registered using a social provider (e.g., Google). Please use that sign-in method.' });
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


//================================================================
// --- Google Sign-In/Sign-Up Route (Unchanged) ---
//================================================================
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


//=========================================================
// --- FORGOT PASSWORD ENDPOINT ---
//=========================================================
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        // IMPORTANT: Always send a success message, even if the user is not found.
        // This prevents attackers from figuring out which emails are registered.
        if (!user) {
            return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        // 1. Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // 2. Hash the token and set it on the user object
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

        await user.save();

        // 3. Create the reset URL and send the email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        
        const transporter = nodemailer.createTransport({ 
             host: 'smtp.sendgrid.net',
    port: 587, // or 465
    auth: {
        user: 'apikey', // This is the literal string 'apikey' for SendGrid
        pass: process.env.SENDGRID_API_KEY // Your secret key from .env
    }
        });

        await transporter.sendMail({
            from: `"SoleVault" <${process.env.EMAIL_FROM}>`,
            to: user.email,
            subject: 'Your SoleVault Password Reset Link',
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                   <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>
                   <p>This link will expire in 10 minutes.</p>
                   <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
        });

        res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: 'Server error.' });
    }
});


//=========================================================
// --- RESET PASSWORD ENDPOINT ---
//=========================================================
router.post('/reset-password/:token', async (req, res) => {
    try {
        // 1. Hash the incoming token from the URL so we can find it in the database
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // 2. Find the user by the hashed token and check if it has not expired
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } // $gt means "greater than"
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        // 3. Set the new password
        user.password = req.body.password; // The pre-save hook in your User model will automatically hash this new password
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.json({ message: 'Password has been reset successfully. Please log in.' });

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;