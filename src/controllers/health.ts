import express, { Request, Response } from "express";

export const router = express.Router();

router.get("/", function (req: Request, res: Response) {
  res.status(200).send();
});
