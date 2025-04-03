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
  bio: {
    type: String, // New field for user bio
    default: "", // Optional: default empty string
  },
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);