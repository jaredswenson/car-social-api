import express, { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { loginUserValidator, registerUserValidator } from "../validators/Auth";

export const router = express.Router();

router.post(
  "/register",
  registerUserValidator,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const registerUser = await AuthService.registerUser(
        firstName,
        lastName,
        email,
        password
      );

      res.status(201).json({
        message: "User registered successfully",
        user: registerUser.user,
      });
    } catch (err: any) {
      console.error("Register error:", err.message);

      if (err.message === "User already exists") {
        return res.status(409).json({ message: err.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  loginUserValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const { token, user } = await AuthService.loginUser(email, password);

      res.status(200).json({ token, user });
    } catch (error: any) {
      console.error("Login error:", error.message);

      if (
        error.message === "User not found" ||
        error.message === "Password not found"
      ) {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Invalid credentials") {
        return res.status(401).json({ message: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }
);
