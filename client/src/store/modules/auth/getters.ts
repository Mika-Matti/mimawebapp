import { GetterTree } from "vuex";
import { AuthState, RootState, DecodedToken } from "@/types";
import { getCookieToken } from "./authHelpers";

const getters: GetterTree<AuthState, RootState> = {
  getIsAuthenticated: (state) => {
    if (state.isAuthenticated) {
      return true;
    } else {
      const decodedToken: DecodedToken | null = getCookieToken();

      if (decodedToken) {
        const expirationDate: Date = new Date(decodedToken.exp * 1000);

        if (expirationDate > new Date()) {
          state.isAuthenticated;
          state.username = decodedToken.username;
          state.role = decodedToken.role;
          state.expiration = decodedToken.exp;
          return true;
        }
      } else {
        return false;
      }
    }
  },
  getUsername: (state) => state.username,
  getRole: (state) => state.role,
  getExpiration: (state) => state.expiration,
};

export default getters;
