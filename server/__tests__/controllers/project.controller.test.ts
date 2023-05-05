import { Request, Response } from "express";
import { db } from "../../src/utils/db";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../../src/controllers/project.controller";
//const mockQuery = db.query as jest.MockedFunction<typeof db.query>;
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
    //const res = { status: jest.fn().mockReturnValue(jest.fn()) };
    //const results = getProjects(res as any, jest.fn() as any);
    //console.log(results, res);
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
});
