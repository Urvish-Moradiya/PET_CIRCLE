const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// models/Session.js
const SessionSchema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date },
});
module.exports = mongoose.model("Session", SessionSchema);