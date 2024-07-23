// Imports
const { Schema } = require("mongoose");

// The reaction model
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Schema.Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, maxLenght: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), get: formatDate },
});

// Formats the given date
function formatDate(date) {
  return date.toDateString();
}

// Exports
module.exports = reactionSchema;
