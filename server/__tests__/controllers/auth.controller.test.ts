import { Request, Response } from "express";
import { hashSync } from "bcrypt";
import { User } from "../../src/models/user.model";
import { db } from "../../src/utils/db";
import {
  authenticateUser,
  logoutUser,
} from "../../src/controllers/auth.controller";

const mockQuery = db.query as jest.Mock;
jest.mock("../../src/utils/db", () => ({
  db: {
    query: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("validToken"),
}));

// test authenticateUser
describe("POST /auth/login", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        const expectedQuery: string = "SELECT * FROM users WHERE user_name = ?";
        const passwordHash: string = hashSync("validPassword", 10);
        const expectedUser: User = {
          user_id: 1,
          user_name: "validUsername",
          user_password: passwordHash,
          user_email: "valid@email.com",
          user_role: "validRole",
        };
        const testUsername: string =
          values && values.length > 0 ? values[0] : "";

        if (sql !== expectedQuery) {
          reject("Error: Mock function got wrong query");
        }

        if (expectedUser.user_name === testUsername) {
          resolve([
            {
              user_id: expectedUser.user_id,
              user_name: expectedUser.user_name,
              user_password: expectedUser.user_password,
              user_email: expectedUser.user_email,
              user_role: expectedUser.user_role,
            },
          ]);
        } else {
          resolve([]);
        }
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return code 400 with expected message if username is invalid", async () => {
    const req: Request = {
      body: {
        username: "invalidUserName<script>evilcode</script>",
        password: "validPassword",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedMessage: string = "Invalid username or password";

    await authenticateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });

  it("should return code 400 with expected message if password is invalid", async () => {
    const req: Request = {
      body: {
        username: "validUsername",
        password: "invalidPassword<script>evilcode</script>",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedMessage: string = "Invalid username or password";

    await authenticateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });

  it("should return code 401 with expected message if valid username is not found", async () => {
    const req: Request = {
      body: {
        username: "validButWrongUsername",
        password: "validPassword",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedMessage: string = "Invalid username or password";

    await authenticateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });

  it("should return code 401 with expected message if valid user, but password doesn't match", async () => {
    const req: Request = {
      body: {
        username: "validUsername",
        password: "invalidPassword",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedMessage: string = "Invalid username or password";

    await authenticateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });

  it("should return 200 with expected message and token if valid user and password match", async () => {
    const req: Request = {
      body: {
        username: "validUsername",
        password: "validPassword",
      },
    } as unknown as Request;
    const res = {
      cookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedMessage: string = "User authentication successful";
    const expectedToken: string = "validToken";

    await authenticateUser(req, res);

    expect(res.cookie).toHaveBeenCalledWith("authToken", expectedToken, {
      httpOnly: false,
      secure: false,
      maxAge: 3600000,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });
});

// test logoutUser
describe("POST /auth/logout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return code 200 with expected message", async () => {
    const req: Request = {} as unknown as Request;
    const res = {
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedMessage: string = "User logged out successfully";

    await logoutUser(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith("authToken");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: expectedMessage,
    });
  });
});
