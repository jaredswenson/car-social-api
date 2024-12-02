import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User/User";
import Password from "../models/Auth/Password";
import ResetCode from "../models/Auth/ResetCode";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export class AuthService {
  static async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    try {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        throw new Error("User already exists");
      }

      const newUser = await User.create({ firstName, lastName, email });

      const hashedPassword = await bcrypt.hash(password, 10);

      await Password.create({
        userUuid: newUser.dataValues.uuid,
        password: hashedPassword,
      });

      return { message: "User registered successfully", user: newUser };
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }

      const userPassword = await Password.findOne({
        where: { userUuid: user.dataValues.uuid },
      });
      if (!userPassword) {
        throw new Error("Password not found");
      }

      const isMatch = await bcrypt.compare(
        password,
        userPassword.dataValues.password
      );
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const payload = {
        user: {
          id: user.dataValues.uuid,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      return { token, user };
    } catch (error) {
      throw error;
    }
  }

  static async forgotPassword(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }

      const userPassword = await Password.findOne({
        where: { userUuid: user.dataValues.uuid },
      });
      if (!userPassword) {
        throw new Error("Password not found");
      }
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      // leaving this until I set up email
      console.log("RANDOM CODE", randomCode);
      await ResetCode.create({
        userId: user.dataValues.uuid,
        code: randomCode,
      });

      // Send email with reset password link
      return { message: "Reset password link sent to email" };
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword(password: string, code: string) {
    try {
      const resetCodeData = await ResetCode.findOne({
        where: { code: code },
      });
      if (!resetCodeData) {
        throw new Error("Invalid reset code");
      }

      const userPassword = await Password.findOne({
        where: { userUuid: resetCodeData.dataValues.userId },
      });
      if (!userPassword) {
        throw new Error("Password not found");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await userPassword.update({ password: hashedPassword });
      await ResetCode.destroy({ where: { code: code } });

      return { message: "Password reset successfully" };
    } catch (error) {
      throw error;
    }
  }
}
