import * as fs from "fs";

class Cache {
  private static cacheFilePath: string = "invalidatedTokens.json";
  private static invalidatedTokens: Set<string> = new Set();

  static getCacheFilePath(): string {
    return Cache.cacheFilePath;
  }

  static setCacheFilePath(path: string) {
    Cache.cacheFilePath = path;
  }

  static initializeCache(): void {
    if (fs.existsSync(Cache.cacheFilePath)) {
      const data: string = fs.readFileSync(Cache.cacheFilePath, "utf8");
      Cache.invalidatedTokens = new Set(JSON.parse(data));
    }
  }

  static clearCache(): void {
    this.invalidatedTokens = new Set(); // Clear cache data from memory

    // Remove cache file
    try {
      if (fs.existsSync(Cache.cacheFilePath)) {
        fs.unlinkSync(Cache.cacheFilePath);
      }
    } catch (error) {
      console.error("Error while clearing cache:", error);
    }
  }

  static addInvalidToken(token: string) {
    Cache.invalidatedTokens.add(token);
    Cache.saveCacheToFile();
  }

  static isTokenInvalid(token: string): boolean {
    return Cache.invalidatedTokens.has(token);
  }

  private static saveCacheToFile(): void {
    fs.writeFileSync(
      Cache.cacheFilePath,
      JSON.stringify([...Cache.invalidatedTokens]),
      "utf8"
    );
  }
}

export { Cache };
