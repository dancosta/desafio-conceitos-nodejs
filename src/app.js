const express = require("express");
const cors = require("cors");

 const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


//defining middleware

function validateRepositoryId(request, response, next){
  const { id } = request.params;

  if (! isUuid(id) ) {
    return response.status(400).json({error: `Not valid repository id: ${id}`});
  }

  next();
}

function isExistingRepositoryId(request, response, next){
  const { id } = request.params;

  if ( repositories.findIndex(repo => repo.id === id) < 0) {
    return response.status(404).json({error: `Repository id ${id} does not exist`});
  }

  next();
}

app.use('/repositories/:id', validateRepositoryId);

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

//update repositry 
app.put("/repositories/:id", isExistingRepositoryId, (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repoIdx = repositories.findIndex(repo => repo.id = id);

  if (repoIdx >= 0){

    const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[repoIdx].likes
    }

    repositories[repoIdx] = repository;

    return response.json(repository);
  }
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

//increment the like num of a given repo id
app.post("/repositories/:id/like", isExistingRepositoryId, (request, response) => {
  const { id } = request.params;

  const repo = repositories.find(repo => repo.id === id);
  repo.likes++;

  return response.json(repo);
});

module.exports = app;
