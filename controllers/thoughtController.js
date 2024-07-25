// Imports
const { Thought } = require("../models");

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
async function createThought(req, res) {
  try {
    await Thought.create(req.body);
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

    // If no user was found with that given id, send a message as a json
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
    const user = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    // If no user was found with that given id, send a message as a json
    if (!user) {
      return res.status(404).json("No thought was found with that ID");
    }

    res.json("Thought was deleted successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Adds a reaction to the reaction list of the thought with the given id
async function createReaction(req, res) {}

// Deletes a reaction from the reaction list of the thought with the given id
async function deleteReaction(req, res) {}

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
