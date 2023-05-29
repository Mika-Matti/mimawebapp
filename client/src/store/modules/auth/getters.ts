import { GetterTree } from "vuex";
import { AuthState, RootState } from "@/types";

const getters: GetterTree<AuthState, RootState> = {
  getIsAuthenticated: (state) => state.isAuthenticated,
};

export default getters;
