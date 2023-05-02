import mysql = require("mysql2");
import { config } from "../config";

// create a connection pool to the database
const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

// define a function for executing SQL queries
export const query = (sql: string, values?: any[]) => {
  return new Promise<any>((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// define an object for exporting database-related functions
export const db = {
  query,
};
