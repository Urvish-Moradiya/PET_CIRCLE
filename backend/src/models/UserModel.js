// models/UserModel.js
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["PetOwner", "PetExpert"], default: "PetOwner" },
// });
// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["PetOwner", "PetExpert"], default: "PetOwner" },
    bio: { type: String, default: "" },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);