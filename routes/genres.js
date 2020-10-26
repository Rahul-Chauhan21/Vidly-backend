const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Horror" },
  { id: 4, name: "Scifi" },
];

// api routes
router.get("/", (req, res) => {
  res.send(genres);
});

// Add a new genre to the list
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //send added genre back
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// update a genre
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res
      .status(404)
      .send(
        `The genre with the given ID ${req.params.id} doesn't exist within the list of  genres`
      );
  }
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //update genre
  genre.name = req.body.name;
  res.send(genres);
});

// delete an existing genre
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res
      .status(404)
      .send(
        `The genre with the given ID ${req.params.id} doesn't exist within the list of  genres`
      );
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

// Searching for a genre
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
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
