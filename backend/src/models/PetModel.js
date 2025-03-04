const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
    animalType: {
        type: String,
        required: true,
      },
      breed: {
        type: String,
        required: true,
      },
      petName: {
        type: String,
        required: true,
      },
      petAge: {
        type: Number,
        required: true,
      },
      petWeight: {
        type: Number,
        required: true,
      },
      petGender: {
        type: String,
        required: true,
      },

    }, { timestamps: true });

    module.exports = mongoose.model("pet",petSchema);
