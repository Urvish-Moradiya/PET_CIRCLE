const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  birthday: { type: Date, required: true },
  weight: { type: Number, required: true },
  allergies: { type: String, default: 'None' },
  favoriteFood: { type: String, default: 'Not specified' },
  activities: { type: [String], default: [] },
  profileImage: { type: String, default: 'https://via.placeholder.com/300' },
  gallery: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);