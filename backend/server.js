const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// CORS Configuration: Allow only your frontend's URL
const corsOptions = {
  origin: "https://anesblood.vercel.app", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions)); // Apply CORS configuration

// Your other middleware and routes...
app.use(express.json());
const dbConnection = require('./database/db');
const userRoutes = require('./routes/user-routes');

// DB connection
dbConnection();

// User routes
app.use("/user", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
