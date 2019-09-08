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

// Production deployment

if (process.env.NODE_ENV === "production") {
  // Setting Static Folder
  app.use(express.static(__dirname + "/public/"));

  // Single Paged APPs
  app.get(/.*/, (request, response) =>
    response.sendFile(__dirname + "/public/index.html")
  );
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} mode, and port ${port}`
  );
});
