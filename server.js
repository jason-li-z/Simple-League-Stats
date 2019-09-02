// Entry Point
const express = require("express"); // For dealing with servers
const morgan = require("morgan"); // For logging
const dotenv = require("dotenv"); // For dealing with environment passwords

// Load config

dotenv.config({
  path: "./config.env"
});

const app = express();

// Logs during development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Summoner's Routes
app.use("/api/v1/summoner/", require("./routes/summoner"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} mode, and port ${port}`
  );
});
