import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { crmJwtSecretKey } from "../configs/environment";
import { logger } from "../configs/logger";
import url from "url";

export async function validateJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const path = url.parse(req.originalUrl).path;
  logger.debug(`validateJwt request path is: ${path}`);
  if (path.includes("health") || path.includes("swagger")) {
    return next();
  }

  if (typeof req.headers.authorization !== "undefined") {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(
      token,
      crmJwtSecretKey,
      { algorithms: ["HS256"], complete: false },
      function (err: any, user: any) {
        if (err) {
          logger.info("Invalid authorization token!");
          return res
            .status(401)
            .json({ error: "Invalid authorization token!" });
        } else {
          logger.debug(`PersonUUID from CRM JWT claim: ${user?.person_uuid}`);
          req.personUuid = user?.person_uuid;
          logger.debug(`PersonID from CRM JWT claim: ${user?.sub}`);
          req.personId = user?.sub;
          req.isBrivityGo = true;
          return next();
        }
      }
    );
  } else {
    // No authorization header exists on the incoming request
    logger.warn("Missing authorization header!");
    return res.status(403).json({ error: "Invalid authorization token!" });
  }
}
