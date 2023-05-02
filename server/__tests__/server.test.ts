import { Express } from "express";
import { createConnection, Connection } from "mysql";
import { createServer, createDatabaseConnection } from "../src/server";
const request = require("supertest");

describe("Test createServer", () => {
  let server: Express;

  beforeAll(() => {
    server = createServer();
  });

  it('should return "Hello" when GET /', async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello");
  });
});

describe("Test createDataBaseConnection", () => {
  let connection: Connection;

  beforeAll(() => {
    connection = createDatabaseConnection();
  });

  afterAll((done) => {
    connection.end((err) => {
      if (err) {
        done.fail(err);
      }
      done();
    });
  });

  it("should connect to the database", (done) => {
    connection.on("error", (err) => {
      done.fail(err);
    });

    connection.on("connect", () => {
      expect(connection.state).toBe("connected");
      done();
    });
  });
});
