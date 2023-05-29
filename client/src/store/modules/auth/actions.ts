import axios from "axios";
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
    } catch (error) {
      console.error("Error authenticating user: ", error);
    }
  },
};
