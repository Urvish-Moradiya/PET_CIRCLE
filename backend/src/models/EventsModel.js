const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
    type: String,
    required: true,
  },
  attendees: {
    type: Number,
    default: 0,
  },
});

// Auto-generate numeric ID
eventSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastEvent = await mongoose.model('Event').findOne().sort({ id: -1 });
    this.id = lastEvent ? lastEvent.id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);