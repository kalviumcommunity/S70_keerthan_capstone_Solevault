// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sneakerRoutes = require('./routes/sneakerRoutes'); // Import routes
const authRoutes = require('./routes/auth'); // This is your router from auth.js



const app = express();


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err)); // Added more detail to catch

  // Apply to all auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 login/signup requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});



// Use defined routes
app.use('/sneakers', sneakerRoutes); // For sneaker-related routes
app.use('/auth', authLimiter,authRoutes);      // CORRECTED: Mount authRoutes under /auth

// Your root route
app.get('/', (req, res) => {
  res.send(`Hello, my backend server is running`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));