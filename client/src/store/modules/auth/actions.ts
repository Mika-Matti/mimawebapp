import axios, { AxiosError } from "axios";
import { API_URLS } from "@/config";
import { ActionContext } from "vuex";
import { RootState, AuthState } from "@/types";

export default {
  //Login
  async login(
    { commit }: ActionContext<AuthState, RootState>,
    { username, password }: { username: string; password: string }
  ) {
    try {
      const response = await axios.post(API_URLS.login, { username, password });
      const token = response.data.token;
      commit("setIsAuthenticated", true);
      commit("setToken", token);
      //TODO change the loginpage if logged in
      console.log("Welcome, ", username);
    } catch (error: unknown) {
      if ((error as AxiosError)?.response?.status === 401) {
        console.log("Invalid username or password");
      } else {
        console.log("An error occurred during login");
      }
    }
  },
};
