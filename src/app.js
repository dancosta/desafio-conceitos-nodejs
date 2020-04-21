const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//list repositories
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

//create new reopsitory
app.post("/repositories", (request, response) => {
  const {  title, url,  techs } = request.body;

  const repository = { 
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0 
  };
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

//increment the like num of a given repo id
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repo = repositories.find(repo => repo.id === id);
  repo.likes++;

  return response.json(repo);
});

module.exports = app;
