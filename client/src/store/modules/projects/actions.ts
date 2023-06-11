import axios from "axios";
import { API_URLS } from "@/config";
import { ActionContext } from "vuex";
import { RootState, ProjectsState } from "@/types";

axios.defaults.withCredentials = true;

export default {
  // Fetch projects
  async fetchProjects({ commit }: ActionContext<ProjectsState, RootState>) {
    try {
      const response = await axios.get(API_URLS.projects);
      commit("setProjects", response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  },
  // Fetch project by id
  async fetchProjectById(
    { commit, state }: ActionContext<ProjectsState, RootState>,
    id: string
  ) {
    const existingProject = state.projects.find(
      (project) => String(project.project_id) === id
    );

    if (existingProject) {
      commit("setProject", existingProject);
    } else {
      try {
        const response = await axios.get(API_URLS.project(id));
        commit("setProject", response.data);
      } catch (error) {
        console.error("Error fetching project by id:", error);
      }
    }
  },

  // Delete project by id
  async deleteProjectById(
    { commit }: ActionContext<ProjectsState, RootState>,
    id: string
  ) {
    try {
      await axios.delete(API_URLS.project(id));
      commit("removeProject", parseInt(id, 10));
    } catch (error) {
      console.error("Error fetching project by id:", error);
    }
  },
};
