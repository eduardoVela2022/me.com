// Imports
const { Schema, model } = require("mongoose");

// The user model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        // Regex pattern to check if the email is a valid email
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
      },
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    // Enables virtuals
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual that returns the number of friends the user has
userSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

// Initialize user model
const User = model("user", userSchema);

// Exports
module.exports = User;
