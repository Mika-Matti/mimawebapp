import axios from "axios";
import { ProjectsState, RootState } from "@/types";
import { API_URLS } from "@/config";
import actions from "@/store/modules/projects/actions";

// Mock axios.post function to avoid actual API requests
jest.mock("axios");

describe("Projects module fetchProjects action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should fetch projects and call commit setProjects if successful", async () => {
    const commit = jest.fn();
    const response = {
      status: 200,
      data: [
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
      ],
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.fetchProjects(context);

    //Assertions
    expect(axios.get).toHaveBeenCalledWith(API_URLS.projects);
    expect(commit).toHaveBeenCalledWith("setProjects", response.data);
  }); // Test case ends

  it("should not commit if fetch request to server unsuccessful", async () => {
    const commit = jest.fn();
    // Create a mock error object
    const error = new Error("Failed to fetch projects");

    jest.spyOn(axios, "get").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.fetchProjects(context);

    //Assertions
    expect(axios.get).toHaveBeenCalledWith(API_URLS.projects);
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});

describe("Projects module fetchProjectById action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should commit project from store module state if exists", async () => {
    const commit = jest.fn();
    const expectedProject = {
      project_id: 3,
      project_title: "Project C",
      project_description: "A website redesign for Company C",
      project_content: "Lorem ipsum dolor sit amet...",
      project_link: "https://www.exampleC.com",
    };

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [expectedProject],
        project: null,
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.fetchProjectById(context, "3");

    //Assertions
    expect(commit).toHaveBeenCalledWith("setProject", expectedProject);
    expect(axios.get).not.toHaveBeenCalled();
  }); // Test case ends

  it("should call request project from server when not available in store state", async () => {
    const commit = jest.fn();
    const response = {
      status: 200,
      data: {
        project_id: 3,
        project_title: "Project C",
        project_description: "A website redesign for Company C",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleC.com",
      },
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: null,
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.fetchProjectById(context, "3");

    // Assertions
    expect(commit).toHaveBeenCalledWith("setProject", response.data);
    expect(axios.get).toHaveBeenCalledWith(API_URLS.project("3"));
  }); // Test case ends

  it("should not commit when fetching project from server if request unsuccessful", async () => {
    const commit = jest.fn();
    const error = new Error("Failed to fetch project");
    jest.spyOn(axios, "get").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: null,
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.fetchProjectById(context, "3");

    // Assertions
    expect(commit).not.toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(API_URLS.project("3"));
  });
});

describe("Projects module createProject action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should send created project to server and then add it to projects state", async () => {
    const commit = jest.fn();
    const project = {
      project_title: "Project C",
      project_description: "A website redesign for Company C",
      project_content: "Lorem ipsum dolor sit amet...",
      project_link: "https://www.exampleC.com",
    };

    const response = {
      status: 200,
      data: {
        project_id: 3,
        project_title: "Project C",
        project_description: "A website redesign for Company C",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleC.com",
      },
    };

    jest.spyOn(axios, "post").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: null,
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.createProject(context, project);

    // Assertions
    expect(commit).toHaveBeenCalledWith("addProject", response.data);
    expect(axios.post).toHaveBeenCalledWith(API_URLS.projects, project);
  }); // Test case ends

  it("should not commit if request to server is unsuccessful", async () => {
    const commit = jest.fn();
    const project = {
      project_title: "Project C",
      project_description: "A website redesign for Company C",
      project_content: "Lorem ipsum dolor sit amet...",
      project_link: "https://www.exampleC.com",
    };

    const error = new Error("Failed to create project");
    jest.spyOn(axios, "post").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: null,
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.createProject(context, project);

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.projects, project);
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});

describe("Projects module editProject action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should send edited project to server and then set it to projects state", async () => {
    const commit = jest.fn();
    const project = {
      project_id: 3,
      project_title: "Project C",
      project_description: "A website redesign for Company C",
      project_content: "Lorem ipsum dolor sit amet...",
      project_link: "https://www.exampleC.com",
    };

    const response = {
      status: 200,
      data: {
        project_id: 3,
        project_title: "Project C",
        project_description: "A website redesign for Company C",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleC.com",
      },
    };

    jest.spyOn(axios, "put").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: {
          project_id: 3,
          project_title: "Old Project C",
          project_description: "Old A website redesign for Company C",
          project_content: "Old Lorem ipsum dolor sit amet...",
          project_link: "https://www.OldexampleC.com",
        },
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.editProject(context, project);

    // Assertions
    expect(commit).toHaveBeenCalledWith("setProject", project);
    expect(axios.put).toHaveBeenCalledWith(API_URLS.project("3"), project);
  }); // Test case ends

  it("should not commit if edit request to server is unsuccessful", async () => {
    const commit = jest.fn();
    const project = {
      project_id: 3,
      project_title: "Project C",
      project_description: "A website redesign for Company C",
      project_content: "Lorem ipsum dolor sit amet...",
      project_link: "https://www.exampleC.com",
    };

    const error = new Error("Failed to edit project");
    jest.spyOn(axios, "put").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: {
          project_id: 3,
          project_title: "Old Project C",
          project_description: "Old A website redesign for Company C",
          project_content: "Old Lorem ipsum dolor sit amet...",
          project_link: "https://www.OldexampleC.com",
        },
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.editProject(context, project);

    // Assertions
    expect(axios.put).toHaveBeenCalledWith(API_URLS.project("3"), project);
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});

describe("Projects module deleteProjectById action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should send delete project request to server and remove project from state", async () => {
    const commit = jest.fn();
    const response = {
      status: 204,
    };

    jest.spyOn(axios, "delete").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: {
          project_id: 3,
          project_title: "Old Project C",
          project_description: "Old A website redesign for Company C",
          project_content: "Old Lorem ipsum dolor sit amet...",
          project_link: "https://www.OldexampleC.com",
        },
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.deleteProjectById(context, "3");

    // Assertions
    expect(commit).toHaveBeenCalledWith("removeProject", 3);
    expect(axios.delete).toHaveBeenCalledWith(API_URLS.project("3"));
  }); // Test case ends

  it("should not commit if delete request to server is unsuccessful", async () => {
    const commit = jest.fn();

    const error = new Error("Failed to delete project");
    jest.spyOn(axios, "delete").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        projects: [],
        project: null,
      } as ProjectsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    await actions.deleteProjectById(context, "3");

    // Assertions
    expect(axios.delete).toHaveBeenCalledWith(API_URLS.project("3"));
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});
