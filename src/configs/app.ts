import express from "express";
<<<<<<< Updated upstream
import * as db from "../db";
import { validateJwt } from "../middleware/jwtAuth";
=======
import { connect } from "../config/database";
import { validateAuthorization } from "../middleware/auth";
>>>>>>> Stashed changes
import bodyParser from "body-parser";
import cors from "cors";
import { Logger } from "winston";
import routes from "../routes/routers";
import swaggerUi from "swagger-ui-express";

export const expressServer = function () {
  const server = express();

  const create = (hostname: string, port: string, logger: Logger) => {
<<<<<<< Updated upstream
    // db.connect();
=======
    connect().then((r) => {
      logger.info("Connected to the database successfully.");
    });
>>>>>>> Stashed changes
    server.set("hostname", hostname);
    server.set("port", port);
    server.use(cors());
    server.use(validateJwt);

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
