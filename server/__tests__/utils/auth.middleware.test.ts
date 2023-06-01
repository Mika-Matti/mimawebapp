import { NextFunction, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { Cache } from "../../src/utils/cache";
import {
  ExtendedRequest,
  verifyAuthentication,
} from "../../src/utils/auth.middleware";

const mockVerify = verify as jest.Mock;
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

jest.mock("../../src/utils/cache", () => ({
  Cache: {
    isTokenInvalid: jest.fn(),
  },
}));

describe("verifyAuthentication middleware", () => {
  beforeAll(() => {
    mockVerify.mockImplementation((token: string, jwtSecret: string) => {
      if (token === "validToken" || token === "validButBlacklistedToken") {
        const decoded: JwtPayload = {
          userId: 1,
        };
        return decoded;
      } else {
        throw new Error("Token verification failed");
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 with expected message if token was not provided", async () => {
    const req: ExtendedRequest = {
      headers: {},
    } as unknown as ExtendedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    const expectedMessage: string = "No token provided";

    await verifyAuthentication(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should return 401 with expected message if token isn't valid", async () => {
    const req: ExtendedRequest = {
      headers: {
        authorization: "bearer invalidToken",
      },
    } as unknown as ExtendedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    const expectedMessage: string = "Invalid token";

    await verifyAuthentication(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should return 401 with expected message if token is blacklisted", async () => {
    const req: ExtendedRequest = {
      headers: {
        authorization: "bearer validButBlacklistedToken",
      },
    } as unknown as ExtendedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    const expectedMessage: string = "Invalid token";

    const mockIsTokenInvalid = Cache.isTokenInvalid as jest.Mock;
    mockIsTokenInvalid.mockReturnValue(true);

    await verifyAuthentication(req, res, next);

    expect(mockIsTokenInvalid).toHaveBeenCalledWith("validButBlacklistedToken");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should call next(); once if token is valid and not blacklisted", async () => {
    const req: ExtendedRequest = {
      headers: {
        authorization: "bearer validToken",
      },
    } as unknown as ExtendedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    const mockIsTokenInvalid = Cache.isTokenInvalid as jest.Mock;
    mockIsTokenInvalid.mockReturnValue(false);

    await verifyAuthentication(req, res, next);

    expect(mockIsTokenInvalid).toHaveBeenCalledWith("validToken");
    expect(next).toHaveBeenCalledTimes(1);
  });
});
