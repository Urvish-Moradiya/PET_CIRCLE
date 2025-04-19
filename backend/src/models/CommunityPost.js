const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// models/CommunityPost.js
const PostSchema = new Schema({
  id: { type: Number, required: true },
  communityId: { type: String, required: true },
  content: String,
  author: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  role: String,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Post", PostSchema);