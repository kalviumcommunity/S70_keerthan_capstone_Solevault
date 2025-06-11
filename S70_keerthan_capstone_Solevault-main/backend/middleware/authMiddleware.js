// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// REMOVE these lines from the top:
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('CRITICAL: JWT_SECRET not available when authMiddleware.js was loaded.');
    // Some might even throw an error here to stop the app from starting with a misconfiguration
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided or token is malformed.' });
    }

    const token = authHeader.split(' ')[1];
    const currentJwtSecret = process.env.JWT_SECRET; // <<--- Access JWT_SECRET here

    if (!currentJwtSecret) {
        console.error('CRITICAL: JWT_SECRET is missing at time of token verification in authMiddleware.');
        return res.status(500).json({ message: 'Server configuration error: Cannot verify authentication.' });
    }

    try {
        const decoded = jwt.verify(token, currentJwtSecret); // <<--- Use currentJwtSecret
        req.user = decoded.user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access denied. Token has expired.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Access denied. Invalid token.' });
        }
        console.error("Error during token verification:", error);
        return res.status(401).json({ message: 'Access denied. Token verification failed.' });
    }
};

module.exports = authMiddleware;