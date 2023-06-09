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

const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("verifyAuthentication middleware", () => {
  beforeAll(() => {
    mockVerify.mockImplementation((token: string, jwtSecret: string) => {
      if (token === "validToken" || token === "validAdminToken") {
        if (token === "validToken") {
          const decoded: JwtPayload = {
            userId: 1,
            username: "validUsername",
            role: "guest",
          };
          return decoded;
        } else {
          const decoded: JwtPayload = {
            userId: 2,
            username: "validAdmin",
            role: "admin",
          };
          return decoded;
        }
      } else {
        throw new Error("Token verification failed");
      }
    }); // Mock verify ends
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("should return 500 with expected message if request was empty", async () => {
    const req: ExtendedRequest = {} as unknown as ExtendedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    const expectedMessage: string = "Internal server error";

    await verifyAuthentication(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
    expect(next).toHaveBeenCalledTimes(0);
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

  it("should return 403 with expected message if user valid but role not", async () => {
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

    const expectedMessage: string = "Unauthorized user";

    await verifyAuthentication(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
    expect(next).toHaveBeenCalledTimes(0);
    expect(req.decodedToken).toEqual({
      userId: 1,
      username: "validUsername",
      role: "guest",
    });
  });

  it("should call next(); once if token is valid and role is admin", async () => {
    const req: ExtendedRequest = {
      cookies: {
        authToken: "validAdminToken",
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
    expect(req.decodedToken).toEqual({
      userId: 2,
      username: "validAdmin",
      role: "admin",
    });
  });
});
