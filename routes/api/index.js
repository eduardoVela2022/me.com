// Imports
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtsRoutes");

// Routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

// Exports
module.exports = router;
