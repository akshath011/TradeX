// const { Schema } = require("mongoose");
// const bcrypt = require("bcryptjs");

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     lowercase: true,
//     trim: true,
//   },
//   username: {
//     type: String,
//     required: [true, "Username is required"],
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//     minlength: [6, "Password must be at least 6 characters"],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Hash the password only when it is new or changed
// UserSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 12);
// });

// module.exports = { UserSchema };

const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  commodityAccount: {
    opened: { type: Boolean, default: false },
    accountId: { type: String },
    openedAt: { type: Date },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password only when it is new or changed
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = { UserSchema };