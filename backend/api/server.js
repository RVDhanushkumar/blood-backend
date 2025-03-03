const express = require("express");
const cors = require("cors");
require("dotenv").config();
const vercelExpress = require('vercel-express');
const dbConnection = require('./database/db');
const userRoutes = require('./routes/user-routes');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// DB connection
dbConnection();

// Routes setup
app.use("/user", userRoutes);

// Export the app wrapped by vercelExpress for serverless handling
module.exports = vercelExpress(app);
