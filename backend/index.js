// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const sneakerRoutes = require('./routes/sneakerRoutes'); // Import routes

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Use sneaker routes
app.use('/sneakers', sneakerRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));