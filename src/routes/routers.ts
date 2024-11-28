import { Express, NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { router } from "./api/index";
import url from "url";

const init = (server: Express, logger: Logger) => {
  server.get("*", function (req: Request, res: Response, next: NextFunction) {
    const path = url.parse(req.url).path;
    if (path === "/health" || path?.startsWith("/swagger")) {
      return next();
    }
    logger.info("Request was made to: " + req.url);
    return next();
  });

  server.use("/", router);
};

export default { init };
