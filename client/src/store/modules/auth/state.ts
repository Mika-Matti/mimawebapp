import { AuthState } from "@/types";

const state: AuthState = {
  isAuthenticated: false,
  username: "",
  role: "guest",
  expiration: 0,
};

export default state;
