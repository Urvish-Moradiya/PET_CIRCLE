const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
});

const petregistrationSchema = new mongoose.Schema({
  eventId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  petCount: { type: Number, required: true },
  pets: [petSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Registration', petregistrationSchema);