const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../../controllers/userController");

// Imports
const router = require("express").Router();

// Routes
router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// Exports
module.exports = router;
