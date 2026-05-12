import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { routeHandler } from "./routes/route";
import config from "./config";



const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);

server.listen(config.prot, () => {
  console.log(`Server is running on the port ${config.prot}`);
});
