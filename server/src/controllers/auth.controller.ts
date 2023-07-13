import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { config } from "../config";
import { db } from "../utils/db";
import { validateInput } from "../utils/formatUtils";

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

    if (!config.jwtSecret || !config.corsOrigin) {
      return res.status(401).json({ message: "User authentication failed" });
    }

    const isSecure: boolean = config.cookieSecure === "true" ? true : false;
    const token: string = jwt.sign(
      {
        userId: user.user_id,
        username: user.user_name,
        role: user.user_role,
      },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    const domain = new URL(config.corsOrigin).hostname;

    res.cookie("authToken", token, {
      httpOnly: false,
      secure: isSecure, // Using HTTPS
      maxAge: 3600000, // 1 hour in milliseconds
      domain: domain,
    });

    res.status(200).json({
      message: "User authentication successful",
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route POST '/auth/logout'
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
