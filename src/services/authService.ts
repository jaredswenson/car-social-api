import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Password from "../models/Password";

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
}
