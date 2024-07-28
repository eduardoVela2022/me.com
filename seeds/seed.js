const connection = require("../config/connection");
const { User, Thought } = require("../models");

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
    thoughtText: "Which are some renowned backpack brands? 🎒",
    username: "Emily Brown",
    reactions: [
      {
        reactionBody: "Chenson is pretty popular where I live.",
        username: "Lily Turner",
      },
    ],
  },
  {
    thoughtText:
      "Should I go to Barbados or Costa Rica for a summer vacation? What do you say? 🇧🇧🇨🇷",
    username: "Amelia Roberts",
    reactions: [
      {
        reactionBody: "Costa Rica is great if you like surfing.",
        username: "James Smith",
      },
      {
        reactionBody: "Barbados has great beaches and rum.",
        username: "Thomas Walker",
      },
    ],
  },
  {
    thoughtText: "Does anyone know how to play Dungeons and Dragons?",
    username: "George Evans",
  },
  {
    thoughtText: "Are chihuahuas good pets?",
    username: "Lily Turner",
    reactions: [
      {
        reactionBody:
          "Yes, they are pretty active and smart, and they make good company.",
        username: "Emily Brown",
      },
    ],
  },
  {
    thoughtText:
      "I cannot wait for summer to start. I want to surf the waves of Portugal so bad. 🇵🇹",
    username: "Emily Brown",
    reactions: [
      {
        reactionBody:
          "Neither do I, I will surf the waives of Mexico this coming summer. 🇲🇽",
        username: "Olivia Wilson",
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
  const thoughts = await Thought.create(thoughtSampleData);

  // Adds sample thoughts to the thoughts list of their respective user
  for (const thought of thoughts) {
    await User.findOneAndUpdate(
      { username: thought.username },
      { $addToSet: { thoughts: thought._id.toString() } },
      { runValidators: true }
    );
  }

  console.log("\n--- Created thoughts data collection ---\n");

  // End process
  console.log("\n--- Finished the process ---\n");
  process.exit(0);
});
