import axios, { AxiosError } from "axios";
import { API_URLS } from "@/config";
import { ActionContext } from "vuex";
import { RootState, AuthState } from "@/types";

export default {
  //Login
  async login(
    { commit }: ActionContext<AuthState, RootState>,
    { username, password }: { username: string; password: string }
  ): Promise<string | null> {
    try {
      const response = await axios.post(API_URLS.login, { username, password });
      const token = response.data.token;
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
};
