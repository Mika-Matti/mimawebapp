import * as dotenv from "dotenv";

const path = require("path");

// Check enviroment server is running in
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.production") });
} else {
  throw new Error("Invalid NODE_ENV");
}

export const config = {
  envMode: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
