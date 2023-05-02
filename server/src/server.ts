import express = require("express");
import projectRouter from "./routes/project.routes";

export function createServer() {
  const app = express();

  // Middleware setup
  app.use(express.json());

  // Route setup
  app.get("/", (req, res) => {
    res.send("Hello");
  });

  // use the project router for all routes starting with '/projects'
  app.use("/projects", projectRouter);

  return app;
}
