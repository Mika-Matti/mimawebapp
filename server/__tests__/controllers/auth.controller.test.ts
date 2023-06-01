import { Request, Response } from "express";
import {
  authenticateUser,
  logoutUser,
} from "../../src/controllers/auth.controller";

//TODO test authenticateUser POST /auth/login
//TODO it should return code 400 with message "Invalid username or password" if username is invalid
//TODO it should return code 400 with message "Invalid username or password" if password is invalid
//TODO It should return code 401 with message "Invalid username or password" if user is not found
//TODO It should return code 401 with message "Invalid username or password" if password doesn't match
//TODO It should return code 200 with message "User authentication successful" if user is valid

// test logoutUser
describe("POST /auth/logout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return code 200 with expected message if token exists", async () => {
    const req: Request = {
      headers: {
        authorization: "bearer validToken",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedMessage: string = "User logged out successfully";

    await logoutUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });

  it("should return code 400 with expected message if token doesn't exist", async () => {
    const req: Request = {
      headers: {
        authorization: "",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const expectedMessage: string = "Invalid token";

    await logoutUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });

  it("should return code 500 with expected message if request has invalid arguments", async () => {
    const req: Request = {} as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const expectedMessage: string = "Internal server error";

    // Mock console.error to prevent output
    jest.spyOn(console, "error").mockImplementation(() => {});

    await logoutUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
    expect(console.error).toHaveBeenCalledWith(
      "Error logging out user:",
      expect.any(Error)
    );
  });
});
