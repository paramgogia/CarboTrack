// server/models/footprint.model.js
const mongoose = require('mongoose');

const footprintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['transport', 'energy', 'food', 'shopping'],
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  carbonEmission: {
    type: Number,
    required: true
  },
  details: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

footprintSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Footprint', footprintSchema);