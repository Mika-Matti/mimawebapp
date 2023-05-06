import * as dotenv from "dotenv";
const path = require("path");

let envPath: string = "";

// Check enviroment server is running in
if (process.env.NODE_ENV === "test") {
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
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
