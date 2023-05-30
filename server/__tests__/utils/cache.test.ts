import { Cache } from "../../src/utils/cache";

describe("Test Cache class", () => {
  const testCacheFilePath: string = "testCache.json";

  beforeAll(() => {
    // Set a different filepath for testCache file.
    Cache.setCacheFilePath(testCacheFilePath);
  });

  beforeEach(() => {
    // Remove the test cache file before each test
    Cache.clearCache();
  });

  afterAll(() => {
    // Remove the test cache file after all tests
    Cache.clearCache();
  });

  it("should add tokens to the cache", () => {
    const token1: string = "token1";
    const token2: string = "token2";

    Cache.addInvalidToken(token1);
    Cache.addInvalidToken(token2);

    expect(Cache.isTokenInvalid(token1)).toBe(true);
    expect(Cache.isTokenInvalid(token2)).toBe(true);
  });

  it("should check any token found in the cache as invalid token", () => {
    const validToken: string = "validToken";
    const invalidToken: string = "invalidatedToken";

    Cache.addInvalidToken(invalidToken);

    expect(Cache.isTokenInvalid(validToken)).toBe(false);
    expect(Cache.isTokenInvalid(invalidToken)).toBe(true);
  });

  it("should persist and load cache from file", () => {
    const token1 = "token1";
    const token2 = "token2";

    Cache.addInvalidToken(token1);
    Cache.addInvalidToken(token2);

    // Reload cache
    Cache.initializeCache();

    expect(Cache.isTokenInvalid(token1)).toBe(true);
    expect(Cache.isTokenInvalid(token2)).toBe(true);
  });

  it("should clear the cache", () => {
    const token = "token";

    Cache.addInvalidToken(token);
    Cache.clearCache();

    expect(Cache.isTokenInvalid(token)).toBe(false);
  });
});
