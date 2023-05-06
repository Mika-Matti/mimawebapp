const originalEnv = process.env;

describe("Load config depending on enviroment", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should load environment env.test variables", () => {
    process.env.NODE_ENV = "test";
    const { config: testConfig } = require("../src/config");
    expect(testConfig.envMode).toBe("test");
    expect(testConfig.port).toBeDefined();
    expect(testConfig.database).toBeDefined();
    expect(testConfig.database.host).toBeDefined();
    expect(testConfig.database.user).toBeDefined();
    expect(testConfig.database.password).toBeDefined();
  });

  it("should load environment env.production variables", () => {
    process.env.NODE_ENV = "production";
    const { config: prodConfig } = require("../src/config");
    expect(prodConfig.envMode).toBe("production");
    expect(prodConfig.port).toBeDefined();
    expect(prodConfig.database).toBeDefined();
    expect(prodConfig.database.host).toBeDefined();
    expect(prodConfig.database.user).toBeDefined();
    expect(prodConfig.database.password).toBeDefined();
  });

  it("should throw an error for an invalid NODE_ENV", () => {
    process.env.NODE_ENV = "invalid";
    expect(() => require("../src/config")).toThrowError("Invalid NODE_ENV");
  });
});
