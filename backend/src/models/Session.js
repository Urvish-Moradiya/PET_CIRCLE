const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// models/Session.js
const SessionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });
module.exports = mongoose.model("Session", SessionSchema);