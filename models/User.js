// Imports
const mongoose = require("mongoose");

// The user model
const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  thoughts: { type: String },
  friends: { type: String },
});

// Exports
module.exports = userSchema;
