// Dependencies
require("dotenv").config();
const mongoose = require ("mongoose");

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.once("open", () => {
  console.log(`Connected to MongoDB: ${db.name}`);
});

db.on("error", (error) => {
  console.log("MongoDB connection error: ", error);
});

db.once("close", () => {
  console.log("Connection to MongoDB has closed.");
});

