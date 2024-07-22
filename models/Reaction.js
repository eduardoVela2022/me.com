// Imports
const mongoose = require("mongoose");

// The reaction model
const reactionSchema = new mongoose.Schema({
  reactionId: { type: String },
  reactionBody: { type: String },
  username: { type: String },
  createdAt: { type: String },
});

// Exports
module.exports = reactionSchema;
