import { MutationTree } from "vuex";
import { ProjectsState, Project } from "@/types";
import mutations from "@/store/modules/projects/mutations";

describe("Projects store module removeProject mutation", () => {
  it("should find the project from state projects and remove it", () => {
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
      project: {
        project_id: 2,
        project_title: "Project B",
        project_description: "A website redesign for Company B",
        project_content: "Lorem ipsum dolor sit amet...",
        project_link: "https://www.exampleB.com",
      } as Project,
    };
    mutations.removeProject(state, 2);

    expect(
      state.projects.findIndex((project) => project.project_id === 2)
    ).toBe(-1);
    expect(state.project).toBe(null);
  });
});
