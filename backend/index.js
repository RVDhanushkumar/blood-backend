require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();


const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || "*", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"], 
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev")); 
app.use(express.json()); 

const dbConnection = require("./database/db");
dbConnection();

const userRoutes = require("./routes/user-routes");
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("It's just blood backend happy coding :)");
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
