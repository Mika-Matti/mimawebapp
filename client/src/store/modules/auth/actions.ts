import axios, { AxiosResponse } from "axios";
import { ActionContext } from "vuex";
import { API_URLS } from "@/config";
import { RootState, AuthState, DecodedToken } from "@/types";
import { getCookieToken } from "./authHelpers";

axios.defaults.withCredentials = true;

export default {
  // Login
  async login(
    { commit }: ActionContext<AuthState, RootState>,
    { username, password }: { username: string; password: string }
  ): Promise<string | null> {
    try {
      const response: AxiosResponse = await axios.post(API_URLS.login, {
        username,
        password,
      });

      if (response.status === 401) {
        return "Invalid username or password";
      }

      const decodedToken: DecodedToken | null = getCookieToken();
      if (decodedToken) {
        commit("setIsAuthenticated", true);
        commit("setUsername", decodedToken.username);
        commit("setRole", decodedToken.role);
      } else {
        return "A client error occurred during login";
      }
      return null;
    } catch (error: unknown) {
      return "An error occurred during login";
    }
  },
  // Logout
  async logout({
    commit,
  }: ActionContext<AuthState, RootState>): Promise<string | null> {
    try {
      const response: AxiosResponse = await axios.post(API_URLS.logout);

      if (response.status === 400) {
        return "Invalid Token Error";
      }

      commit("setIsAuthenticated", false);
      commit("setToken", null);
      return null;
    } catch (error: unknown) {
      return "Internal Server Error";
    }
  },
};
