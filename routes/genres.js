const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

// api routes
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Add a new genre to the list
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //send added genre back
  let genre = new Genre({
    name: req.body.name,
  });
  try {
    await genre.validate();
    genre = await genre.save();
    res.send(genre);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
});

// update a genre
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
  });
  return schema.validate(genre);
};

module.exports = router;
