// Imports
const { Thought, User } = require("../models");

// Gets all thoughts from the database and returns them as a json
async function getAllThoughts(req, res) {
  try {
    const thoughts = await Thought.find().populate("reactions");
    res.status(200).json(thoughts);
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Gets a thought from the database which matches the given id, and returns it as a json
async function getThoughtById(req, res) {
  try {
    const thought = await Thought.findOne({
      _id: req.params.thoughtId,
    }).populate("reactions");

    // If no thought was found with that given id, send a message as a json
    if (!thought) {
      return res.status(404).json("No thought was found with that ID");
    }

    res.status(200).json(thought);
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Creates a thought and saves it to the database
// And adds it to the thought list of the user which matches the given id
async function createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);

    const user = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id.toString() } },
      { runValidators: true }
    );

    // If no user was found with that given id, send a message as a json
    if (!user) {
      return res.status(404).json("No user was found with that ID");
    }

    res.json("Thought was created successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Updates a thought from the database
async function updateThought(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true }
    );

    // If no thought was found with that given id, send a message as a json
    if (!thought) {
      return res.status(404).json("No thought was found with that ID");
    }

    res.json("Thought was updated successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Deletes a thought from the database
async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    // If no thought was found with that given id, send a message as a json
    if (!thought) {
      return res.status(404).json("No thought was found with that ID");
    }

    res.json("Thought was deleted successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Adds a reaction to the reaction list of the thought with the given id
async function createReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true }
    );

    // If no thought was found with that given id, send a message as a json
    if (!thought) {
      return res.status(404).json("No thought was found with that ID");
    }

    res.json("Reaction was added successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Deletes a reaction from the reaction list of the thought with the given id
async function deleteReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { runValidators: true }
    );

    // If no thought was found with that given id, send a message as a json
    if (!thought) {
      return res.status(404).json("No thought was found with that ID");
    }

    res.json("Reaction was deleted successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.statu;
  }
}

// Exports
module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
