const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
  name: { // Added
    type: String,
    required: [true, 'Sneaker name is required.'], // Added custom error message
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required.'],
    trim: true
  },
  model: { // Corresponds to "Model/Colorway" on frontend
    type: String,
    required: [true, 'Model/Colorway is required.'],
    trim: true
  },
  // Consistently using 'releaseDate' as it appears in your frontend object structure
  // The form field label "Purchase Date" in AddPairModal/EditPairModal might need
  // to be re-evaluated if this schema field is meant to be the sneaker's official release date.
  // If it's truly the date the user bought it, then schema and frontend object should both use 'purchaseDate'.
  releaseDate: { // Changed from 'purchaseDate' for consistency with frontend object
    type: Date,
    required: [true, 'Release or Purchase date is required.'] 
  },
  retailPrice: { // Changed from 'price' for consistency
    type: Number,
    required: [true, 'Retail/Purchase price is required.'],
    min: [0, 'Price cannot be negative.']
  },
  marketValue: {
    type: Number,
    required: [true, 'Market value is required.'],
    min: [0, 'Market value cannot be negative.']
  },
  image: { // Added
    type: String,
    trim: true,
    default: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80' // Optional default
  },
  // IMPORTANT: For a multi-user application, you'll need to associate sneakers with a user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    // required: true, // Uncomment if a sneaker must belong to a user
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Optional: Index for fields commonly queried, e.g., if users search by name or brand
sneakerSchema.index({ name: 'text', brand: 'text' }); 
// If you have userId, you'd likely index it:
// sneakerSchema.index({ userId: 1 });


const Sneaker = mongoose.model('Sneaker', sneakerSchema);

module.exports = Sneaker;