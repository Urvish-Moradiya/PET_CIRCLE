const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdoptionSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  address: { type: String, required: true },
  number: { type: String, required: true },
  time: { type: String, required: true }, 
  feature: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Adoption', AdoptionSchema);