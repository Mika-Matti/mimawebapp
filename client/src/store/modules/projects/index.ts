import { Module } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { RootState, ProjectsState } from "@/types";

const projectsModule: Module<ProjectsState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default projectsModule;
