import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { config } from "../config";

export interface ExtendedRequest extends Request {
  decodedToken?: JwtPayload;
}

export const verifyAuthentication = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    if (config.jwtSecret) {
      try {
        const decoded = verify(token, config.jwtSecret) as JwtPayload;

        // Add decoded token to the request object for possible future use
        if (typeof decoded === "object") {
          req.decodedToken = decoded;
        }

        // Call next middleware or route handler if user is authorized
        if (decoded.role === "admin") {
          next();
        } else {
          return res.status(403).json({ message: "Unauthorized user" });
        }
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  } catch (error) {
    console.error("Error verifying authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
