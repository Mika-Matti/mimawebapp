import { GetterTree } from "vuex";
import { AuthState, RootState } from "@/types";

const getters: GetterTree<AuthState, RootState> = {
  getIsAuthenticated: (state) => state.isAuthenticated,
  getToken: (state) => state.token,
  getUsername: (state) => state.username,
  getRole: (state) => state.role,
};

export default getters;
