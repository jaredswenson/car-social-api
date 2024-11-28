import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../configs/logger";

export async function validateAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const url = new URL(req.originalUrl, `https://${req.headers.host}`);
  const path = url.pathname + url.search;
  logger.debug(`validateAuthorization request path is: ${path}`);
  if (path?.includes("health") || path?.includes("auth")) {
    return next();
  }

  if (typeof req.headers.authorization !== "undefined") {
    const authorizationHeader = req?.headers?.authorization;
    if (!authorizationHeader) {
      logger.info("Missing authorization header!");
      return res.status(403).json({ error: "Missing authorization header!" });
    }

    const headerComponents = authorizationHeader.split(" ");
    if (headerComponents.length !== 2) {
      logger.info("Invalid authorization header!");
      return res.status(401).json({ error: "Invalid authorization header!" });
    }

    switch (headerComponents[0].toLowerCase()) {
      case "bearer":
        const appToken = headerComponents[1];
        jwt.verify(
          appToken as string,
          "secretKey",
          { algorithms: ["HS256"], complete: false },
          function (err: any, user: any) {
            if (err) {
              logger.info("Invalid authorization token!");
              return res
                .status(401)
                .json({ error: "Invalid authorization token!" });
            } else {
              logger.debug(`Id from CRM JWT claim: ${user?.personId}`);
              req.personId = user?.personId;
              return next();
            }
          }
        );
        break;
      default:
        logger.info("Invalid authorization header!");
        return res.status(401).json({ error: "Invalid authorization header!" });
    }
  } else {
    // No authorization header exists on the incoming request
    logger.warn("Missing authorization header!");
    return res.status(403).json({ error: "Missing authorization header!" });
  }
}
