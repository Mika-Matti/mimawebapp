import * as dotenv from "dotenv";
const path = require("path");

let envPath: string = "";

// Check enviroment server is running in
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  envPath = path.resolve(__dirname, "../../.env.test");
  dotenv.config({ path: envPath });
} else if (process.env.NODE_ENV === "production") {
  envPath = path.resolve(__dirname, "../../.env.production");
  dotenv.config({ path: envPath });
} else {
  throw new Error("Invalid NODE_ENV");
}

export const config = {
  path: envPath,
  envMode: process.env.NODE_ENV,
  port: process.env.PORT,
  corsOrigin: process.env.CORS_ORIGIN,
  jwtSecret: process.env.JWT_SECRET,
  cookieSecure: process.env.COOKIE_SECURE,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
