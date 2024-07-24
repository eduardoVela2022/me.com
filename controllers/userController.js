// Imports
const { User } = require("../models");

// Gets all the users from the database and returns them as a json
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Gets a user from the database which matches the given id, and return it as a json
async function getUserById(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Creates a user and saves it to the database
async function createUser(req, res) {
  try {
    await User.create(req.body);
    res.json("User created successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Updates a user from the database
async function updateUser(req, res) {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true }
    );
    res.json("User updated successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Deletes a user from the database
async function deleteUser(req, res) {
  try {
    await User.findOneAndDelete({ _id: req.params.userId });
    res.json("User deleted successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Exports
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
