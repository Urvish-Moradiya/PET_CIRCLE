const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensure custom IDs are unique
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: {
    type: Number,
    default: 0,
  },
  posts: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  joinedUsers: [{ type: String }], // Store user IDs as strings for simplicity
}, { timestamps: true });

module.exports = mongoose.model("Community", CommunitySchema);