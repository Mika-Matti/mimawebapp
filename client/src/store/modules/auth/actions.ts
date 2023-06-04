import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { API_URLS } from "@/config";
import { ActionContext } from "vuex";
import { RootState, AuthState } from "@/types";

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
      const token: string = response.data.token;
      commit("setIsAuthenticated", true);
      commit("setToken", token);
      return null;
    } catch (error: unknown) {
      if ((error as AxiosError)?.response?.status === 401) {
        return "Invalid username or password";
      } else {
        return "An error occurred during login";
      }
    }
  },
  // Logout
  async logout({
    commit,
    state,
  }: ActionContext<AuthState, RootState>): Promise<string | null> {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      const response: AxiosResponse = await axios.post(
        API_URLS.logout,
        null,
        config
      );

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
