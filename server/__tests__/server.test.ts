import { Express } from "express";
import { createServer } from "../src/server";
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
