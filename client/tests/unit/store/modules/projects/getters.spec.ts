import { GetterTree } from "vuex";
import getters from "@/store/modules/projects/getters";
import { ProjectsState, RootState } from "@/types";

describe("Projects module getters", () => {
  it("should return projects from state", () => {
    // Prepare the state
    const state: ProjectsState = {
      projects: [
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
      project: null,
    };

    // Call the getter
    const result = getters.getProjects(state, null, {} as RootState, null);

    // Assertions
    expect(result).toEqual(state.projects);
  });

  it("should return project from state", () => {
    // Prepare the state
    const state: ProjectsState = {
      projects: [],
      project: {
        project_id: 3,
        project_title: "Project C",
        project_description: "A website redesign for Company C",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleC.com",
      },
    };

    // Call the getter
    const result = getters.getProject(state, null, {} as RootState, null);

    // Assertions
    expect(result).toEqual(state.project);
  });
});
