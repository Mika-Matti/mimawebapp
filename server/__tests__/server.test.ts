import { Express } from "express";
import { createServer } from "../src/server";
import { db } from "../src/utils/db";
const request = require("supertest");

describe("Test createServer", () => {
  let server: Express;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  it('should return "Hello" when GET /', async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello");
  });
});
