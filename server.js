// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const chalk = require("chalk");

const PORT = process.env.PORT || 3000;

const app = express();

// Morgan for colored response status for dev use
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// routes
app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(chalk.bold.green(`App running on port ${PORT}!`));
});