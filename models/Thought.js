// Imports
const mongoose = require("mongoose");

// The thought model
const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String },
  createdAt: { type: String },
  username: { type: String },
  reactions: { type: String },
});

// Exports
module.exports = thoughtSchema;
