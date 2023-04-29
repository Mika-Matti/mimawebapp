import { config } from "../src/config";

describe("config", () => {
  it("should load environment variables correctly", () => {
    expect(config.envMode).toBeDefined();
    expect(config.port).toBeDefined();
    expect(config.database).toBeDefined();
    expect(config.database.host).toBeDefined();
    expect(config.database.user).toBeDefined();
    expect(config.database.password).toBeDefined();
  });
});
