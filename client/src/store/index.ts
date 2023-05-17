import { createStore } from "vuex";
import axios from "axios";
import { API_URLS } from "@/config";

export default createStore({
  state: {
    projects: [],
  },
  getters: {
    getProjects: (state) => state.projects,
  },
  mutations: {
    setProjects: (state, projects) => {
      state.projects = projects;
    },
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const response = await axios.get(API_URLS.projects);
        commit("setProjects", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  },
  modules: {},
});
