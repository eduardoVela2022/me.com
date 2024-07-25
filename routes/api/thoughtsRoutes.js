// Imports
const router = require("express").Router();
const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Routes
router.route("/").get(getAllThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

// Exports
module.exports = router;
