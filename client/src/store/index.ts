import { createStore } from "vuex";
import axios from "axios";
import { API_URLS } from "@/config";
import { Project } from "@/types";

export default createStore({
  state: {
    projects: [] as Project[],
    project: null as Project | null,
  },
  getters: {
    getProjects: (state) => state.projects,
    getProject: (state) => state.project,
  },
  mutations: {
    setProjects: (state, projects: Project[]) => {
      state.projects = projects;
    },
    setProject: (state, project) => {
      state.project = project;
    },
  },
  actions: {
    // Fetch projects
    async fetchProjects({ commit }) {
      try {
        const response = await axios.get(API_URLS.projects);
        commit("setProjects", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    // Fetch project by id
    async fetchProjectById({ commit, state }, id) {
      const existingProject = state.projects.find(
        (project) => project.project_id === id
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
  },
  modules: {},
});
