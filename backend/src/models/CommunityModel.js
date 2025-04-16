
// models/CommunityModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommunitySchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  members: { type: Number, default: 0 },
  posts: { type: Number, default: 0 },
  joinedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  image: String,
});
module.exports = mongoose.model("Community", CommunitySchema);