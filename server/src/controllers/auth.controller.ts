import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { config } from "../config";
import { db } from "../utils/db";
import { validateInput } from "../utils/formatUtils";
import { Cache } from "../utils/cache";

// route POST '/auth/login'
export const authenticateUser = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!validateInput(username) || !validateInput(password)) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  try {
    const result: User[] = await db.query(
      "SELECT * FROM users WHERE user_name = ?",
      [username]
    );

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user: User = result[0];

    const passWordMatch: boolean = await bcrypt.compare(
      password,
      user.user_password
    );

    if (!passWordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (config.jwtSecret) {
      // Authentication successful
      const token: string = jwt.sign(
        { userId: user.user_id },
        config.jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ message: "User authentication successful", token });
    } else {
      // Authentication failed
      res.status(401).json({ message: "User authentication failed" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route POST '/auth/logout'
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Invalidate Token
    const token: string = req.headers.authorization?.split(" ")[1] || "";

    if (token.length > 0) {
      Cache.addInvalidToken(token);
      res.status(200).json({ message: "User logged out successfully" });
    } else {
      res.status(400).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
