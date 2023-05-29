import { Module } from "vuex";
import { RootState, AuthState } from "@/types";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const authModule: Module<AuthState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default authModule;
