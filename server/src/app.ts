import { Express } from "express";
import { createServer } from "./server";
import { config } from "./config";

const server: Express = createServer();

server.listen(config.port, () => {
  console.log(
    `Server listening on port ${config.port}. Running enviroment set to "${config.envMode}"`
  );
});
