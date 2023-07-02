import { MutationTree } from "vuex";
import { ProjectsState, Project } from "@/types";

const mutations: MutationTree<ProjectsState> = {
  setProjects: (state: ProjectsState, projects: Project[]) => {
    state.projects = projects.map((project: Project) => {
      if (project.project_start_date) {
        project.project_start_date = new Date(project.project_start_date);
      }
      return project;
    });
  },
  setProject: (state: ProjectsState, project: Project) => {
    state.project = project;
  },
  addProject: (state: ProjectsState, project: Project) => {
    if (project.project_start_date) {
      project.project_start_date = new Date(project.project_start_date);
    }
    state.projects.push(project);
  },
  removeProject: (state: ProjectsState, id: number) => {
    const index = state.projects.findIndex(
      (project) => project.project_id === id
    );

    if (index !== -1) {
      state.projects.splice(index, 1);
    }

    if (state.project && state.project.project_id === id) {
      state.project = null;
    }
  },
};

export default mutations;
