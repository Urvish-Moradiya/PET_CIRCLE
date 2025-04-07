const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Training', 'Behavior', 'Nutrition', 'Health'], required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  redirectUrl: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);