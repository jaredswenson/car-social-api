import express, { Request, Response } from "express";
import { getUser } from "../services/userService";
import { logger } from "../configs/logger";

export const router = express.Router();
