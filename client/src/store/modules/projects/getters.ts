import { GetterTree } from "vuex";
import { ProjectsState, RootState } from "@/types";

const getters: GetterTree<ProjectsState, RootState> = {
  getProjects: (state) => state.projects,
  getProject: (state) => state.project,
};

export default getters;
