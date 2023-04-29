import express = require("express");
import { config } from "./config";
import mysql = require("mysql");

export function createServer() {
  const app = express();

  // Middleware setup
  app.use(express.json());

  // Route setup
  app.get("/", (req, res) => {
    res.send("Hello");
  });

  return app;
}

export function createDatabaseConnection() {
  const connection = mysql.createConnection(config.database);

  connection.connect((err: any) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + connection.threadId);
  });
  return connection;
}
