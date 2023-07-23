import { Module } from "vuex";
import { RootState, PostsState } from "@/types";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const postsModule: Module<PostsState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default postsModule;
