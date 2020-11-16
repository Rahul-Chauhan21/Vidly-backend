const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { validateGenre, Genre } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// api routes
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Add a new genre to the list
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //send added genre back
  const genre = new Genre({
    name: req.body.name,
  });
  try {
    await genre.validate();
    await genre.save();
    res.send(genre);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
});

// update a genre
router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    return res
      .status(404)
      .send(
        `The genre with the given ID ${req.params.id} doesn't exist within the list of  genres`
      );
  }

  res.send(genre);
});

// delete an existing genre
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res
      .status(404)
      .send(
        `The genre with the given ID ${req.params.id} doesn't exist within the list of  genres`
      );
  }

  res.send(genre);
});

// Searching for a genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res
      .status(404)
      .send(
        `The genre with the given ID ${req.params.id} doesn't exist within the list of  genres`
      );
  }
  res.send(genre);
});

module.exports = router;
