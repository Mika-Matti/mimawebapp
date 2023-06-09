import { Module } from "vuex";
import { RootState, ProjectsState } from "@/types";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const projectsModule: Module<ProjectsState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default projectsModule;
