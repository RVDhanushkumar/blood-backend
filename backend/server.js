const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./database/db');  // Your DB connection
const userRoutes = require('./routes/user-routes');  // Your routes

const app = express();
app.use(express.json());
app.use(cors());

// DB connection
dbConnection();

// Your routes
app.use('/user', userRoutes);

// Export the Express app to Vercel
module.exports = (req, res) => {
  app(req, res);
};
