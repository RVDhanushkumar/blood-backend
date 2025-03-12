const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// CORS Configuration: Allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"], // Allowed headers
};

app.use(cors(corsOptions));

// Your other middleware
app.use(express.json()); 

// DB connection
const dbConnection = require('./database/db');
dbConnection(); // Connect to the database

// User routes
const userRoutes = require('./routes/user-routes');
app.use("/user", userRoutes);

// Setting up the server port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
