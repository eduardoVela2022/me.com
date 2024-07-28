// Imports
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// The thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now(), get: formatDate },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    // Enables virtuals
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Formats the given date
function formatDate(date) {
  return date.toDateString();
}

// Virtual that returns the number of reactions the post has
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize thought model
const Thought = model("thought", thoughtSchema);

// Exports
module.exports = Thought;
