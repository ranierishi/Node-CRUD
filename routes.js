const { Router } = require("express");

const routes = Router();

const projects = [
  {
    id: 0,
    title: "test",
    tasks: []
  }
];

//Listar Projetos
routes.get("/projects", (req, res) => {
  return res.json(projects);
});

//Criar Projeto
routes.post("/projects", (req, res) => {
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
routes.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(project => project.id === parseInt(id));

  projects[index].title = title;

  return res.json(projects);
});

module.exports = routes;
