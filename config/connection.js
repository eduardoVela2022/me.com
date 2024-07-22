// Imports
const mongoose = require("mongoose");

// Connects to the database
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB");

// Exports
module.exports = mongoose.connection;
