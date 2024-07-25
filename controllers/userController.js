// Imports
const { User } = require("../models");

// Gets all the users from the database and returns them as a json
async function getAllUsers(req, res) {
  try {
    const users = await User.find().populate("friends").populate("thoughts");
    res.status(200).json(users);
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Gets a user from the database which matches the given id, and returns it as a json
async function getUserById(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate("friends")
      .populate("thoughts");

    // If no user was found with that given id, send a message as a json
    if (!user) {
      return res.status(404).json("No user was found with that ID");
    }

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
    res.json("User was created successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Updates a user from the database
async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true }
    );

    // If no user was found with that given id, send a message as a json
    if (!user) {
      return res.status(404).json("No user was found with that ID");
    }

    res.json("User was updated successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Deletes a user from the database
async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    // If no user was found with that given id, send a message as a json
    if (!user) {
      return res.status(404).json("No user was found with that ID");
    }

    res.json("User was deleted successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Adds a friend to the friend list of the user which matches the given id
async function createFriend(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true }
    );

    // If no user was found with that given id, send a message as a json
    if (!user) {
      return res.status(404).json("No user was found with that ID");
    }

    res.json("Friend was added successfully!");
  } catch (err) {
    // If something goes wrong, send the error as a json
    res.status(500).json(err);
  }
}

// Deletes a friend from the friend list of the user which matches the given id
async function deleteFriend(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true }
    );

    // If no user was found with that given id, send a message as a json
    if (!user) {
      return res.status(404).json("No user was found with that ID");
    }

    res.json("Friend was deleted successfully!");
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
  createFriend,
  deleteFriend,
};
