// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron'); // 1. Import node-cron
const Sneaker = require('./models/sneakerSchema'); // 2. Import your Sneaker model
const sneakerRoutes = require('./routes/sneakerRoutes'); // Import routes
const authMiddleware = require('./middleware/authMiddleware');
const aiRoutes = require('./routes/aiRoutes');
const authRoutes = require('./routes/auth'); // This is your router from auth.js
const http = require('http'); // 1. Import the http module
const { WebSocketServer } = require('ws'); // 2. Import the WebSocketServer



const app = express();


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

const server = http.createServer(app);

const wss = new WebSocketServer({ server });


// 5. Set up the WebSocket connection logic
wss.on('connection', (ws) => {
  console.log('A new client connected!');

  // When a message is received from a client...
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client has disconnected.');
  });
});

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



// NEW: Stricter rate limiter for AI routes
const aiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 15, // Limit each IP to 15 AI requests per 10 minutes
    message: { message: 'Too many AI requests from this IP, please try again after 10 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});



// Use defined routes
app.use('/sneakers', authMiddleware,sneakerRoutes); // For sneaker-related routes
app.use('/api/ai', authMiddleware,aiLimiter, aiRoutes);
app.use('/auth', authLimiter,authRoutes);      // CORRECTED: Mount authRoutes under /auth

// Your root route
app.get('/', (req, res) => {
  res.send(`Hello, my backend server is running`);
});



// --- SCHEDULED CRON JOB ---
// This schedule ('*/2 * * * *') runs every 2 minutes for easy demonstration.
// In a real app, you might run it once a day ('0 0 * * *').
console.log('Scheduling the sneaker market value update job...');

cron.schedule('*/2 * * * *', async () => {
    console.log('--- Running cron job: Updating market values ---');
    try {
        const sneakers = await Sneaker.find({});
        if (sneakers.length === 0) {
            console.log('No sneakers in the database to update.');
            return;
        }

        let updatedCount = 0;
        // In a real app, you would call an external API for each sneaker.
        // Here, we'll just simulate a market value change.
        for (const sneaker of sneakers) {
            // Simulate a random +/- 5% change in market value
            const changeFactor = 1 + (Math.random() - 0.5) / 10; // e.g., a number between 0.95 and 1.05
            const newMarketValue = sneaker.marketValue * changeFactor;
            
            sneaker.marketValue = parseFloat(newMarketValue.toFixed(2));
            await sneaker.save();
            updatedCount++;
        }
        
        console.log(`Cron job finished: Updated ${updatedCount} sneakers.`);

    } catch (error) {
        console.error('Error during cron job execution:', error);
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server (HTTP and WebSocket) is running on port http://localhost:${PORT}`));
