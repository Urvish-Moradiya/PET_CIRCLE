const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const PostSchema = new Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   communityId: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   role: {
//     type: String,
//     default: "PetOwner",
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Post", PostSchema);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const CommunityPostSchema = new Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   communityId: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   role: {
//     type: String,
//     default: "PetOwner",
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("CommunityPost", CommunityPostSchema);


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