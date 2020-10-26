const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Horror" },
  { id: 4, name: "Scifi" },
];

// api routes
app.get("/", (req, res) => {
  res.send("Vidly Backend");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Add a new genre to the list
app.post("/api/genres", (req, res) => {
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
app.put("/api/genres/:id", (req, res) => {
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
app.delete("/api/genres/:id", (req, res) => {
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
app.get("/api/genres/:id", (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
