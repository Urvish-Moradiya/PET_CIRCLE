const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ['Pet Care', 'Training', 'Nutrition', 'Emergency'], required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    duration: { type: String, required: true },
    author: { type: String, default: 'Anonymous' }, // Changed from expert to author
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('petSession', sessionSchema);