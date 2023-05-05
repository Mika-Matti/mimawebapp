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

describe("GET /projects", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        console.log("Calling mocked GET /projects");
        if (sql === "SELECT * FROM projects") {
          resolve([
            {
              project_id: 1,
              project_title: "Project A",
              project_description: "A website redesign for Company A",
              project_content: "Lorem ipsum dolor sit amet...",
              project_link: "https://www.exampleA.com",
            },
            {
              project_id: 2,
              project_title: "Project B",
              project_description: "A website redesign for Company B",
              project_content: "Lorem ipsum dolor sit amet...",
              project_link: "https://www.exampleB.com",
            },
            {
              project_id: 3,
              project_title: "Project C",
              project_description: "A website redesign for Company C",
              project_content: "Lorem ipsum dolor sit amet...",
              project_link: "https://www.exampleC.com",
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
        project_id: 1,
        project_title: "Project A",
        project_description: "A website redesign for Company A",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleA.com",
      },
      {
        project_id: 2,
        project_title: "Project B",
        project_description: "A website redesign for Company B",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleB.com",
      },
      {
        project_id: 3,
        project_title: "Project C",
        project_description: "A website redesign for Company C",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleC.com",
      },
    ]);
  });
}); // End of GET /projects

describe("PUT /projects/id", () => {
  beforeAll(() => {
    mockQuery.mockImplementation((sql: string, values?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        console.log("Calling mocked PUT /projects/id");

        let testProject: Project;
        let testId: string;

        const expectedProject: Project = {
          project_title: "test_title",
          project_description: "test_desc",
          project_content: "test_content",
          project_link: "test_link",
        };
        const expectedId: string = "1";
        const expectedQuery = "UPDATE projects SET ? WHERE project_id = ?";

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
            resolve([
              {
                project_id: 1,
                project_title: "test_title",
                project_description: "test_desc",
                project_content: "test_content",
                project_link: "test_link",
              },
            ]);
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
}); // End of PUT /projects/id
