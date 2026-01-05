const mongoose = require('mongoose');

// models/State.js

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  country: { type: String, default: 'India' }
}, { timestamps: true });

module.exports = mongoose.model('State', StateSchema);
