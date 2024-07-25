// Imports
const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Routes
router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

// Exports
module.exports = router;
