import { Request, Response } from "express";
import { Post } from "../../src/models/post.model";
import { db } from "../../src/utils/db";
import { getTimeStamp } from "../../src/utils/formatUtils";
import {
  createPost,
  getPublicPosts,
  getAllPosts,
  getPublicPostById,
  getAnyPostById,
  updatePost,
  deletePost,
} from "../../src/controllers/post.controller";

const mockQuery = db.query as jest.Mock;
jest.mock("../../src/utils/db", () => ({
  db: {
    query: jest.fn(),
  },
}));

describe("POST /posts", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        const expectedQuery: string = "INSERT INTO posts SET ?";
        const expectedPost: Post = {
          post_title: "test_title",
          post_content: "test_content",
          post_date: getTimeStamp(),
          post_is_public: true,
          user_id: 1,
        };
        const testPost: Post = values && values.length > 0 ? values[0] : null;

        for (const [key, value] of Object.entries(expectedPost)) {
          if (testPost[key] != value) {
            reject(
              `Error: Given test value: ${key}:${testPost[key]} for insert doesn't match expected: ${key}:${value}`
            );
          }
        }

        if (sql === expectedQuery) {
          resolve({ insertId: 1 });
        } else {
          reject("Error: Mock function got wrong query");
        }
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the inserted Post-object", async () => {
    const req: Request = {
      body: {
        post_title: "test_title",
        post_content: "test_content",
        post_date: getTimeStamp(),
        post_is_public: true,
      },
      decodedToken: {
        userId: 1,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      post_title: "test_title",
      post_content: "test_content",
      post_date: getTimeStamp(),
      post_is_public: true,
      post_id: 1,
      user_id: 1,
    });
  });
}); // End of POST /posts

describe("GET /posts/public", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        if (
          sql ===
          "SELECT * FROM posts WHERE post_is_public = true ORDER BY post_date DESC"
        ) {
          resolve([
            {
              post_id: 2,
              post_title: "Post B",
              post_content: "Lorem ipsum dolor sit amet...",
              post_date: "2023-01-22 21:22:00",
              post_is_public: true,
              user_id: 1,
            },
            {
              post_id: 1,
              post_title: "Post A",
              post_content: "Lorem ipsum dolor sit amet...",
              post_date: "2023-01-21 21:22:00",
              post_is_public: true,
              user_id: 1,
            },
          ]);
        } else {
          reject("Error: Mock function got wrong query");
        }
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of Post-objects", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getPublicPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        post_id: 2,
        post_title: "Post B",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: "2023-01-22 21:22:00",
        post_is_public: true,
        user_id: 1,
      },
      {
        post_id: 1,
        post_title: "Post A",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: "2023-01-21 21:22:00",
        post_is_public: true,
        user_id: 1,
      },
    ]);
  });
}); // End of GET /posts/public

describe("GET /posts/all", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        if (sql === "SELECT * FROM posts ORDER BY post_date DESC") {
          resolve([
            {
              post_id: 3,
              post_title: "Post C",
              post_content: "Lorem ipsum dolor sit amet...",
              post_date: "2023-01-23 21:22:00",
              post_is_public: false,
              user_id: 1,
            },
            {
              post_id: 2,
              post_title: "Post B",
              post_content: "Lorem ipsum dolor sit amet...",
              post_date: "2023-01-22 21:22:00",
              post_is_public: true,
              user_id: 1,
            },
            {
              post_id: 1,
              post_title: "Post A",
              post_content: "Lorem ipsum dolor sit amet...",
              post_date: "2023-01-21 21:22:00",
              post_is_public: true,
              user_id: 1,
            },
          ]);
        } else {
          reject("Error: Mock function got wrong query");
        }
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of Post-objects", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        post_id: 3,
        post_title: "Post C",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: "2023-01-23 21:22:00",
        post_is_public: false,
        user_id: 1,
      },
      {
        post_id: 2,
        post_title: "Post B",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: "2023-01-22 21:22:00",
        post_is_public: true,
        user_id: 1,
      },
      {
        post_id: 1,
        post_title: "Post A",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: "2023-01-21 21:22:00",
        post_is_public: true,
        user_id: 1,
      },
    ]);
  });
}); // End of GET /posts/all
