import { MutationTree } from "vuex";
import { ProjectsState, Project } from "@/types";

const mutations: MutationTree<ProjectsState> = {
  setProjects: (state: ProjectsState, projects: Project[]) => {
    state.projects = projects;
  },
  setProject: (state: ProjectsState, project: Project) => {
    state.project = project;
  },
};

export default mutations;
