const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String, // e.g., 'user', 'admin'
  },
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }], // Reference to Pet model
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);