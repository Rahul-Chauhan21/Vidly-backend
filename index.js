const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const users = require("./routes/users");
const genres = require("./routes/genres");
const customers = require("./routes/customers.js");
const auth = require("./routes/auth");
const home = require("./routes/home");
const rentals = require("./routes/rentals");
const movies = require("./routes/movies");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB..");
  })
  .catch((err) => console.error("Could not connect to MongoDB..", err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/", home);
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
