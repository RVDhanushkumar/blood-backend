const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const dbConnection = require('./database/db');
const userRoutes = require('./routes/user-routes');

app.use(express.json());
app.use(cors());

// db connect
dbConnection()

app.use("/user", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});