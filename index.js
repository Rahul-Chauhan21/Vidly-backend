const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers.js");
const home = require("./routes/home");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB..");
  })
  .catch((err) => console.error("Could not connect to MongoDB..", err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/", home);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
