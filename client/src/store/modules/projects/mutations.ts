import { MutationTree } from "vuex";
import { ProjectsState, Project } from "@/types";

const mutations: MutationTree<ProjectsState> = {
  setProjects: (state: ProjectsState, projects: Project[]) => {
    state.projects = projects;
  },
  setProject: (state: ProjectsState, project: Project) => {
    state.project = project;
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
