// Required to connect
const dns = require('dns');
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Dependencies
require("dotenv").config();
require("./config/db-connection");
const cors = require("cors")
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL
}))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("dev"));

// Router
const userRouter = require("./routes/user-routes");
const projectRouter = require("./routes/project-routes");
const taskRouter = require("./routes/task-routes");

// Routes
app.use("/api/user", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/projects/:projectId/tasks", taskRouter);

// Port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});