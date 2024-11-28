import { expressServer } from "./configs/app";
import { hostname, port } from "./configs/environment";
import { logger } from "./configs/logger";

const server = expressServer();
server.create(hostname, port, logger);
server.start(logger);
