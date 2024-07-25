// Imports
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Server port
const PORT = process.env.PORT || 3001;
// Express server
const app = express();

// Middleware
// The type of data the server accepts
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Starts server with the database connection
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
