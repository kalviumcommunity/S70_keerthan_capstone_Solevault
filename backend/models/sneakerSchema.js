const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketValue: {
    type: Number,
    required: true,
  },
});

const Sneaker = mongoose.model('Sneaker', sneakerSchema);

module.exports = Sneaker;