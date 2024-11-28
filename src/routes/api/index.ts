import { router as healthController } from "../../controllers/health";
import { router as authController } from "../../controllers/auth";
import express from "express";

export const router = express.Router();

router.use("/health", healthController);
router.use("/auth", authController);
