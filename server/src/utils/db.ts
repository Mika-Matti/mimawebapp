import mysql = require("mysql2");
import { config } from "../config";

// create a connection pool to the database
const pool: mysql.Pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

// log a message when the pool gets connected
pool.on("connect", () => {
  console.log(`Connected to database '${config.database.database}'`);
});

export const closeConnection = (): void => {
  pool.end((err) => {
    if (err) throw err;
    console.log("Database connection closed");
  });
};

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
  closeConnection,
  query,
};
