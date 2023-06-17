const originalEnv = process.env;

describe("Load config", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should load the API URLs based on the enviroment variables", () => {
    process.env.VUE_APP_BASE_URL = "http://example.com";
    const { API_URLS } = require("@/config");

    expect(API_URLS.projects).toBe("http://example.com/projects");
    expect(API_URLS.projects).toBe("http://example.com/projects");
    expect(API_URLS.project("123")).toBe("http://example.com/projects/123");
    expect(API_URLS.login).toBe("http://example.com/auth/login");
    expect(API_URLS.logout).toBe("http://example.com/auth/logout");
  });
});
