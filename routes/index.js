// Imports
const router = require("express").Router();
const apiRoutes = require("./api");

// Routes
router.use("/api", apiRoutes);

// If an invalid route is given
router.use((req, res) => res.send("Wrong route!"));

// Exports
module.exports = router;
