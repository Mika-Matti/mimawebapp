import express from "express";
import { config } from "./config";

export function createServer() {
  const app = express();

  // Middleware setup
  app.use(express.json());

  // Route setup
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  // Database setup
  const mysql = require("mysql");
  const connection = mysql.createConnection(config.database);

  connection.connect((err: any) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connection.threadId);
  });

  return app;
}
