import { MutationTree } from "vuex";
import { AuthState } from "@/types";

const mutations: MutationTree<AuthState> = {
  setIsAuthenticated: (state: AuthState, isAuthenticated: boolean) => {
    state.isAuthenticated = isAuthenticated;
  },
  setToken: (state: AuthState, token: string) => {
    state.token = token;
  },
};

export default mutations;
