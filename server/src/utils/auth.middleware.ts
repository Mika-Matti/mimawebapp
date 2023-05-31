import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { Cache } from "./cache";

export interface ExtendedRequest extends Request {
  decodedToken?: JwtPayload;
}

export const verifyAuthentication = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1] || "";

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    if (config.jwtSecret) {
      try {
        const decoded: string | JwtPayload | undefined = jwt.verify(
          token,
          config.jwtSecret
        );

        if (Cache.isTokenInvalid(token)) {
          return res.status(401).json({ message: "Invalid token" });
        }

        // Add decoded token to the request object for possible future use
        if (typeof decoded === "object") {
          req.decodedToken = decoded;
        }

        // Call next middleware or route handler
        next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  } catch (error) {
    console.error("Error verifying authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
