import { router as healthController } from "../../controllers/health";
<<<<<<< Updated upstream
=======
import { router as authController } from "../../controllers/auth";
>>>>>>> Stashed changes
import express from "express";

export const router = express.Router();

router.use("/health", healthController);
<<<<<<< Updated upstream
=======
router.use("/auth", authController);
>>>>>>> Stashed changes
