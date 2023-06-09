import { Request, Response } from "express";
import { Project } from "../../src/models/project.model";
import { db } from "../../src/utils/db";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../../src/controllers/project.controller";

const mockQuery = db.query as jest.Mock;
jest.mock("../../src/utils/db", () => ({
  db: {
    query: jest.fn(),
  },
}));

describe("POST /projects", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        const expectedQuery: string = "INSERT INTO projects SET ?";
        const expectedProject: Project = {
          project_title: "test_title",
          project_description: "test_desc",
          project_content: "test_content",
          project_link: "test_link",
        };
        const testProject: Project =
          values && values.length > 0 ? values[0] : null;

        for (const [key, value] of Object.entries(expectedProject)) {
          if (testProject[key] != value) {
            reject(
              `Error: Given test value: ${key}:${testProject[key]} for insert doesn't match expected: ${key}:${value}`
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

  it("should return the inserted Project-object", async () => {
    const req: Request = {
      body: {
        project_title: "test_title",
        project_description: "test_desc",
        project_content: "test_content",
        project_link: "test_link",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createProject(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      project_id: 1,
      project_title: "test_title",
      project_description: "test_desc",
      project_content: "test_content",
      project_link: "test_link",
    });
  });
}); // End of POST /projects

describe("GET /projects", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        if (sql === "SELECT * FROM projects ORDER BY project_id DESC") {
          resolve([
            {
              project_id: 3,
              project_title: "Project C",
              project_description: "A website redesign for Company C",
              project_content: "Lorem ipsum dolor sit amet...",
              project_link: "https://www.exampleC.com",
            },
            {
              project_id: 2,
              project_title: "Project B",
              project_description: "A website redesign for Company B",
              project_content: "Lorem ipsum dolor sit amet...",
              project_link: "https://www.exampleB.com",
            },
            {
              project_id: 1,
              project_title: "Project A",
              project_description: "A website redesign for Company A",
              project_content: "Lorem ipsum dolor sit amet...",
              project_link: "https://www.exampleA.com",
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

  it("should return an array of Project-objects", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getProjects(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        project_id: 3,
        project_title: "Project C",
        project_description: "A website redesign for Company C",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleC.com",
      },
      {
        project_id: 2,
        project_title: "Project B",
        project_description: "A website redesign for Company B",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleB.com",
      },
      {
        project_id: 1,
        project_title: "Project A",
        project_description: "A website redesign for Company A",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleA.com",
      },
    ]);
  });
}); // End of GET /projects

describe("GET /projects/:id", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        const expectedId: string = "1";
        const expectedQuery: string =
          "SELECT * FROM projects WHERE project_id = ?";
        const testId: string = values && values.length > 0 ? values[0] : "-1";

        if (sql === expectedQuery && testId === expectedId) {
          resolve([
            {
              project_id: 1,
              project_title: "Project A",
              project_description: "A website redesign for Company A",
              project_content: "Lorem ipsum dolor sit amet...",
              project_link: "https://www.exampleA.com",
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

  it("should return a Project-object of the same id as was given (1)", async () => {
    const req: Request = {
      params: {
        id: "1",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getProjectById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      project_id: 1,
      project_title: "Project A",
      project_description: "A website redesign for Company A",
      project_content: "Lorem ipsum dolor sit amet...",
      project_link: "https://www.exampleA.com",
    });
  });
}); // End of GET /projects/:id

describe("PUT /projects/:id", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        let testProject: Project;
        let testId: string;

        const expectedProject: Project = {
          project_title: "test_title",
          project_description: "test_desc",
          project_content: "test_content",
          project_link: "test_link",
        };
        const expectedId: string = "1";
        const expectedQuery: string =
          "UPDATE projects SET ? WHERE project_id = ?";

        if (values && values.length >= 2) {
          [testProject, testId] = values;

          for (const [key, value] of Object.entries(expectedProject)) {
            if (testProject[key] != value) {
              reject(
                `Error: Given test value: ${key}:${testProject[key]} for update doesn't match expected: ${key}:${value}`
              );
            }
          }

          if (sql === expectedQuery && expectedId === testId) {
            resolve({ affectedRows: 1 });
          } else {
            reject("Error: Mock function got wrong query");
          }
        }
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the updated Project-object", async () => {
    const req: Request = {
      params: {
        id: "1",
      },
      body: {
        project_title: "test_title",
        project_description: "test_desc",
        project_content: "test_content",
        project_link: "test_link",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateProject(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      project_id: 1,
      project_title: "test_title",
      project_description: "test_desc",
      project_content: "test_content",
      project_link: "test_link",
    });
  });
}); // End of PUT /projects/:id

describe("DELETE /projects/:id", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        const expectedId: string = "1";
        const expectedQuery: string =
          "DELETE FROM projects WHERE project_id = ?";
        const testId: string = values && values.length > 0 ? values[0] : "-1";

        if (sql === expectedQuery && testId === expectedId) {
          resolve({ affectedRows: 1 });
        } else {
          reject("Error: Mock function got wrong query");
        }
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the Project with given id and return 204 message", async () => {
    const req: Request = {
      params: {
        id: "1",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    await deleteProject(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });
}); // End of DELETE /projects
