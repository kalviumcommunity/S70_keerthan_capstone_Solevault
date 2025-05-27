// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const sneakerRoutes = require('./routes/sneakerRoutes'); // Import routes
const authRoutes = require('./routes/auth'); // This is your router from auth.js

dotenv.config();

const app = express();


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err)); // Added more detail to catch

// Use defined routes
app.use('/sneakers', sneakerRoutes); // For sneaker-related routes
app.use('/auth', authRoutes);      // CORRECTED: Mount authRoutes under /auth

// Your root route
app.get('/', (req, res) => {
  res.send(`Hello, my backend server is running`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));