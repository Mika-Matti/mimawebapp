import { Express } from "express";
import { Connection } from "mysql";
import { createServer, createDatabaseConnection } from "../src/server";
const request = require("supertest");

describe("Test creating a server", () => {
  let server: Express;
  let connection: Connection;

  beforeAll(() => {
    server = createServer();
    connection = createDatabaseConnection();
  });

  afterAll(() => {
    connection.end();
  });

  it('should return "Hello" when GET /', async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello");
  });
});
