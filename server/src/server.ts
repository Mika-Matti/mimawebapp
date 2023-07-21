import express = require("express");
import cors = require("cors");
import cookieParser = require("cookie-parser");
import projectRouter from "./routes/project.routes";
import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";
import { config } from "./config";

export function createServer() {
  const app: express.Express = express();

  app.use(cookieParser());

  // Cors setup
  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    })
  );

  // Middleware setup
  app.use(express.json());

  // Route setup
  app.get("/", (req, res) => {
    res.send("Hello");
  });

  // use the project router for all routes starting with '/projects'
  app.use("/projects", projectRouter);

  // use the auth router for all routes starting with '/auth'
  app.use("/auth", authRouter);

  // use the post router for all routes starting with '/posts'
  app.use("/posts", postRouter);

  return app;
}
