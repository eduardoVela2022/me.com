const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

// User sample data
const userSampleData = [
  {
    username: "James Smith",
    email: "James.Smith@example.com",
  },
  {
    username: "Emily Brown",
    email: "Emily.Brown@example.com",
  },
  {
    username: "Olivia Wilson",
    email: "Olivia.Wilson@example.com",
  },
  {
    username: "Amelia Roberts",
    email: "Amelia.Roberts@example.com",
  },
  {
    username: "George Evans",
    email: "George.Evans@example.com",
  },
  {
    username: "Thomas Walker",
    email: "Thomas.Walker@example.com",
  },
  {
    username: "Lily Turner",
    email: "Lily.Turner@example.com",
  },
];

// Thought sample data
const thoughtSampleData = [
  {
    thoughtText: "Thought #1",
    username: "Emily Brown",
    reactions: [
      {
        reactionBody: "Reaction #1",
        username: "Lily Turner",
      },
    ],
  },
  {
    thoughtText: "Thought #2",
    username: "Amelia Roberts",
    reactions: [
      {
        reactionBody: "Reaction #2",
        username: "James Smith",
      },
      {
        reactionBody: "Reaction #3",
        username: "Thomas Walker",
      },
    ],
  },
  {
    thoughtText: "Thought #3",
    username: "George Evans",
  },
  {
    thoughtText: "Thought #4",
    username: "Lily Turner",
    reactions: [
      {
        reactionBody: "Reaction #4",
        username: "Emily Brown",
      },
    ],
  },
];

// If an error appears log it to the console
connection.on("error", (err) => console.log(err));

// Resets the database and creates its sample data
connection.once("open", async () => {
  // Delete users if they exist
  let checkUsers = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (checkUsers.length) {
    await connection.dropCollection("users");
    console.log("\n--- Deleted users data collection ---\n");
  }

  // Delete thoughts if they exist
  let checkThoughts = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (checkThoughts.length) {
    await connection.dropCollection("thoughts");
    console.log("\n--- Deleted thoughts data collection ---\n");
  }

  // Create sample users
  await User.create(userSampleData);
  console.log("\n--- Created users data collection ---\n");

  // Create sample thoughts
  await Thought.create(thoughtSampleData);
  console.log("\n--- Created thoughts data collection ---\n");

  // End process
  console.log("\n--- Finished the process ---\n");
  process.exit(0);
});
