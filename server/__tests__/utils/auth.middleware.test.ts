import { NextFunction, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import {
  ExtendedRequest,
  verifyAuthentication,
} from "../../src/utils/auth.middleware";

const mockVerify = verify as jest.Mock;
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("verifyAuthentication middleware", () => {
  beforeAll(() => {
    mockVerify.mockImplementation((token: string, jwtSecret: string) => {
      if (token === "validToken") {
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
      cookies: {},
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
      cookies: {
        authToken: "invalidToken",
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

  it("should call next(); once if token is valid", async () => {
    const req: ExtendedRequest = {
      cookies: {
        authToken: "validToken",
      },
    } as unknown as ExtendedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    await verifyAuthentication(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
