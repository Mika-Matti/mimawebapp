import { createServer } from "./server";
import { config } from "./config";

const server = createServer();

server.listen(config.port, () => {
  console.log(
    `Server listening on port ${config.port}. Running enviroment set to "${config.envMode}"`
  );
});
