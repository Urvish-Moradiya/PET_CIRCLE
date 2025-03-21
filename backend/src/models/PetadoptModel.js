const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetadoptSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true }, 
    description: { type: String, required: true }, 
}, {timestamps: true });

module.exports = mongoose.model('Petadopt',PetadoptSchema);