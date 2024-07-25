// Imports
const router = require("express").Router();
const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

// Routes
router.route("/").get(getAllThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Exports
module.exports = router;
