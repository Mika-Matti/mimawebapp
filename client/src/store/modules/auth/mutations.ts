import { MutationTree } from "vuex";
import { AuthState } from "@/types";

const mutations: MutationTree<AuthState> = {
  setIsAuthenticated: (state: AuthState, isAuthenticated: boolean) => {
    state.isAuthenticated = isAuthenticated;
  },
  setToken: (state: AuthState, token: string) => {
    state.token = token;
  },

  setUsername: (state: AuthState, username: string) => {
    state.username = username;
  },

  setRole: (state: AuthState, role: string) => {
    state.role = role;
  },
};

export default mutations;
