import express from "express";
import { connect } from "../config/database";
import { validateAuthorization } from "../middleware/auth";
import bodyParser from "body-parser";
import cors from "cors";
import { Logger } from "winston";
import routes from "../routes/routers";

export const expressServer = function () {
  const server = express();

  const create = (hostname: string, port: string, logger: Logger) => {
    connect().then((r) => {
      logger.info("Connected to the database successfully.");
    });
    server.set("hostname", hostname);
    server.set("port", port);
    server.use(cors());
    server.use(validateAuthorization);

    // parse application/json
    server.use(
      bodyParser.json({
        limit: "10mb",
      })
    );

    // Set up routes
    routes.init(server, logger);
  };

  const start = async (logger: Logger) => {
    const hostname = server.get("hostname");
    const port = server.get("port");

    server.listen(port, function () {
      logger.info("Server listening on http://" + hostname + ":" + port);
    });
  };

  return {
    create: create,
    start: start,
  };
};
