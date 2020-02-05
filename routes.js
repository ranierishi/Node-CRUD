const { Router } = require("express");

const routes = Router();

const projects = [
  {
    id: 0,
    title: "test",
    tasks: []
  }
];
let count = 0;

function isIdReal(req, res, next) {
  const { id } = req.params;
  project = projects.find(p => p.id === parseInt(id));
  if (!project) {
    return res.status(400).json({ err: "Project not found" });
  }
  return next();
}

function callCount(req, res, next) {
  console.count("Número de requisiçoes");
  return next();
}

//Listar Projetos
routes.get("/projects", callCount, (req, res) => {
  return res.json(projects);
});

//Criar Projeto
routes.post("/projects", callCount, (req, res) => {
  const { id, title, tasks } = req.body;
  const project = {
    id: id,
    title: title,
    tasks: tasks
  };
  projects.push(project);
  return res.json(projects);
});

//Alterar Projeto
routes.put("/projects/:id", callCount, isIdReal, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(project => project.id === parseInt(id));

  projects[index].title = title;

  return res.json(projects);
});

routes.delete("/projects/:id", callCount, isIdReal, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(project => project.id === parseInt(id));
  projects.splice(index, 1);

  return res.json(projects);
});

routes.post("/projects/:id/tasks", callCount, isIdReal, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(project => project.id === parseInt(id));

  projects[index].tasks.push(title);
  return res.json(projects);
});

module.exports = routes;
